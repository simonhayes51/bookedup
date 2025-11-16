import { Op } from 'sequelize';
import { Message, Conversation, User } from '../models/index.js';
import { AppError, asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Get all conversations for current user
 * @route   GET /api/messages/conversations
 * @access  Private
 */
export const getConversations = asyncHandler(async (req, res, next) => {
  const conversations = await Conversation.findAll({
    where: {
      [Op.or]: [
        { participant1Id: req.user.id },
        { participant2Id: req.user.id }
      ]
    },
    include: [
      {
        model: User,
        as: 'participant1',
        attributes: ['id', 'firstName', 'lastName', 'avatar']
      },
      {
        model: User,
        as: 'participant2',
        attributes: ['id', 'firstName', 'lastName', 'avatar']
      }
    ],
    order: [['lastMessageAt', 'DESC']]
  });

  res.json({
    success: true,
    count: conversations.length,
    data: conversations
  });
});

/**
 * @desc    Get or create conversation
 * @route   POST /api/messages/conversations
 * @access  Private
 */
export const getOrCreateConversation = asyncHandler(async (req, res, next) => {
  const { participantId } = req.body;

  if (participantId === req.user.id) {
    return next(new AppError('Cannot create conversation with yourself', 400));
  }

  // Check if conversation exists
  let conversation = await Conversation.findOne({
    where: {
      [Op.or]: [
        {
          participant1Id: req.user.id,
          participant2Id: participantId
        },
        {
          participant1Id: participantId,
          participant2Id: req.user.id
        }
      ]
    },
    include: [
      {
        model: User,
        as: 'participant1',
        attributes: ['id', 'firstName', 'lastName', 'avatar']
      },
      {
        model: User,
        as: 'participant2',
        attributes: ['id', 'firstName', 'lastName', 'avatar']
      }
    ]
  });

  if (!conversation) {
    // Create new conversation
    conversation = await Conversation.create({
      participant1Id: req.user.id,
      participant2Id: participantId
    });

    // Reload with associations
    conversation = await Conversation.findByPk(conversation.id, {
      include: [
        {
          model: User,
          as: 'participant1',
          attributes: ['id', 'firstName', 'lastName', 'avatar']
        },
        {
          model: User,
          as: 'participant2',
          attributes: ['id', 'firstName', 'lastName', 'avatar']
        }
      ]
    });
  }

  res.json({
    success: true,
    data: conversation
  });
});

/**
 * @desc    Get messages in a conversation
 * @route   GET /api/messages/conversations/:id
 * @access  Private
 */
export const getMessages = asyncHandler(async (req, res, next) => {
  const { page = 1, limit = 50 } = req.query;
  const offset = (page - 1) * limit;

  // Verify user is part of conversation
  const conversation = await Conversation.findByPk(req.params.id);

  if (!conversation) {
    return next(new AppError('Conversation not found', 404));
  }

  if (conversation.participant1Id !== req.user.id && conversation.participant2Id !== req.user.id) {
    return next(new AppError('Not authorized to view this conversation', 403));
  }

  const { count, rows: messages } = await Message.findAndCountAll({
    where: { conversationId: req.params.id },
    include: [
      {
        model: User,
        as: 'sender',
        attributes: ['id', 'firstName', 'lastName', 'avatar']
      }
    ],
    order: [['createdAt', 'DESC']],
    limit: parseInt(limit),
    offset: parseInt(offset)
  });

  res.json({
    success: true,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: parseInt(page),
    data: messages.reverse() // Return in chronological order
  });
});

/**
 * @desc    Send message
 * @route   POST /api/messages
 * @access  Private
 */
export const sendMessage = asyncHandler(async (req, res, next) => {
  const { conversationId, content, attachments } = req.body;

  // Verify user is part of conversation
  const conversation = await Conversation.findByPk(conversationId);

  if (!conversation) {
    return next(new AppError('Conversation not found', 404));
  }

  if (conversation.participant1Id !== req.user.id && conversation.participant2Id !== req.user.id) {
    return next(new AppError('Not authorized to send messages in this conversation', 403));
  }

  // Create message
  const message = await Message.create({
    conversationId,
    senderId: req.user.id,
    content,
    attachments: attachments || []
  });

  // Update conversation
  conversation.lastMessageAt = new Date();
  conversation.lastMessage = content;
  await conversation.save();

  // Reload message with sender info
  const fullMessage = await Message.findByPk(message.id, {
    include: [
      {
        model: User,
        as: 'sender',
        attributes: ['id', 'firstName', 'lastName', 'avatar']
      }
    ]
  });

  // Emit socket event to recipient
  const io = req.app.get('io');
  const recipientId = conversation.participant1Id === req.user.id
    ? conversation.participant2Id
    : conversation.participant1Id;

  io.to(`user-${recipientId}`).emit('new-message', {
    message: fullMessage,
    conversationId
  });

  res.status(201).json({
    success: true,
    data: fullMessage
  });
});

/**
 * @desc    Mark messages as read
 * @route   PUT /api/messages/conversations/:id/read
 * @access  Private
 */
export const markAsRead = asyncHandler(async (req, res, next) => {
  const conversation = await Conversation.findByPk(req.params.id);

  if (!conversation) {
    return next(new AppError('Conversation not found', 404));
  }

  if (conversation.participant1Id !== req.user.id && conversation.participant2Id !== req.user.id) {
    return next(new AppError('Not authorized', 403));
  }

  // Mark all unread messages from the other participant as read
  await Message.update(
    {
      isRead: true,
      readAt: new Date()
    },
    {
      where: {
        conversationId: req.params.id,
        senderId: { [Op.ne]: req.user.id },
        isRead: false
      }
    }
  );

  res.json({
    success: true,
    message: 'Messages marked as read'
  });
});

/**
 * @desc    Delete message
 * @route   DELETE /api/messages/:id
 * @access  Private
 */
export const deleteMessage = asyncHandler(async (req, res, next) => {
  const message = await Message.findByPk(req.params.id);

  if (!message) {
    return next(new AppError('Message not found', 404));
  }

  if (message.senderId !== req.user.id) {
    return next(new AppError('Not authorized to delete this message', 403));
  }

  await message.destroy();

  res.json({
    success: true,
    data: {}
  });
});
