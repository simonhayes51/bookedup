# BookedUp Backend API

> Enterprise-grade backend API for the BookedUp entertainment booking platform

## 🚀 Features

### Core Features
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **OAuth 2.0** - Google & Facebook social login
- ✅ **Real-time Messaging** - WebSocket-based chat with Socket.io
- ✅ **Payment Processing** - Stripe integration with webhooks
- ✅ **File Uploads** - Cloudinary integration for images/videos
- ✅ **Email Notifications** - Nodemailer for transactional emails
- ✅ **Review System** - Ratings & reviews with moderation
- ✅ **Admin Dashboard** - Complete admin panel with analytics
- ✅ **Advanced Search** - Filters, sorting, pagination
- ✅ **Security** - Rate limiting, helmet, input validation

### Technical Features
- PostgreSQL database with Sequelize ORM
- RESTful API architecture
- Comprehensive error handling
- Request validation
- CORS enabled
- Session management
- Password hashing (bcrypt)
- Email verification
- Password reset flow

## 📋 Prerequisites

- Node.js >= 18.0.0
- PostgreSQL >= 13.0
- npm or yarn

## 🛠️ Installation

1. **Install dependencies:**
```bash
cd server
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` and configure:
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bookedup
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password

# OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

3. **Create PostgreSQL database:**
```bash
createdb bookedup
```

4. **Run migrations:**
```bash
npm run migrate
```

5. **Seed database (optional):**
```bash
npm run seed
```

6. **Start development server:**
```bash
npm run dev
```

Server will run at `http://localhost:5000`

## 📁 Project Structure

```
server/
├── config/
│   ├── database.js          # Sequelize configuration
│   ├── cloudinary.js        # Cloudinary setup
│   └── passport.js          # OAuth strategies
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── performerController.js
│   ├── bookingController.js
│   ├── messageController.js
│   ├── reviewController.js
│   ├── paymentController.js
│   ├── adminController.js
│   └── oauthController.js
├── middleware/
│   ├── auth.js              # JWT verification
│   ├── errorHandler.js      # Global error handler
│   └── rateLimiter.js       # Rate limiting
├── models/
│   ├── User.js
│   ├── Performer.js
│   ├── Booking.js
│   ├── Message.js
│   ├── Review.js
│   ├── Favorite.js
│   └── index.js             # Model associations
├── routes/
│   ├── auth.js
│   ├── performers.js
│   ├── bookings.js
│   ├── messages.js
│   ├── reviews.js
│   ├── payments.js
│   ├── admin.js
│   └── users.js
├── socket/
│   └── index.js             # Socket.io setup
├── utils/
│   ├── jwt.js               # JWT helpers
│   └── email.js             # Email templates
├── index.js                 # App entry point
└── package.json
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register          - Register new user
POST   /api/auth/login             - Login user
POST   /api/auth/logout            - Logout user
GET    /api/auth/me                - Get current user
PUT    /api/auth/updatedetails     - Update user details
PUT    /api/auth/updatepassword    - Change password
POST   /api/auth/forgotpassword    - Request password reset
PUT    /api/auth/resetpassword/:token - Reset password
GET    /api/auth/verify/:token     - Verify email
GET    /api/auth/google            - Google OAuth
GET    /api/auth/google/callback   - Google callback
GET    /api/auth/facebook          - Facebook OAuth
GET    /api/auth/facebook/callback - Facebook callback
```

### Performers
```
GET    /api/performers             - Get all performers (with filters)
GET    /api/performers/:id         - Get single performer
POST   /api/performers             - Create performer profile
PUT    /api/performers/:id         - Update performer
DELETE /api/performers/:id         - Delete performer
POST   /api/performers/:id/favorite - Toggle favorite
GET    /api/performers/favorites/me - Get user's favorites
```

### Bookings
```
GET    /api/bookings               - Get user's bookings
POST   /api/bookings               - Create booking
GET    /api/bookings/:id           - Get single booking
PUT    /api/bookings/:id/status    - Update booking status
DELETE /api/bookings/:id           - Delete booking
```

### Messages
```
GET    /api/messages/conversations - Get all conversations
POST   /api/messages/conversations - Get/create conversation
GET    /api/messages/conversations/:id - Get messages
POST   /api/messages               - Send message
PUT    /api/messages/conversations/:id/read - Mark as read
DELETE /api/messages/:id           - Delete message
```

### Reviews
```
GET    /api/reviews/performer/:id  - Get performer reviews
GET    /api/reviews/:id            - Get single review
POST   /api/reviews                - Create review
PUT    /api/reviews/:id            - Update review
DELETE /api/reviews/:id            - Delete review
POST   /api/reviews/:id/respond    - Respond to review
```

### Payments
```
POST   /api/payments/create-intent - Create payment intent
POST   /api/payments/confirm       - Confirm payment
POST   /api/payments/webhook       - Stripe webhook
POST   /api/payments/refund        - Request refund
GET    /api/payments/history       - Get payment history
```

### Admin
```
GET    /api/admin/stats            - Dashboard statistics
GET    /api/admin/users            - Get all users
PUT    /api/admin/users/:id/status - Update user status
GET    /api/admin/performers/pending - Get pending performers
PUT    /api/admin/performers/:id/status - Approve/reject performer
GET    /api/admin/reviews/pending  - Get pending reviews
PUT    /api/admin/reviews/:id/moderate - Moderate review
GET    /api/admin/bookings         - Get all bookings
```

## 🔐 Authentication

### JWT Authentication
Include JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### OAuth Flow
1. Frontend redirects to `/api/auth/google` or `/api/auth/facebook`
2. User authorizes with provider
3. Callback returns JWT token
4. Use token for subsequent requests

## 📊 Database Models

### User
- id (UUID)
- email
- password (hashed)
- firstName, lastName
- role (client/performer/admin)
- avatar
- phone
- isVerified
- isActive
- authProvider (local/google/facebook)

### Performer
- id (UUID)
- userId (FK to User)
- stageName
- genre
- bio
- location
- priceMin, priceMax
- images, videos
- socials (JSON)
- verified, premium
- status (pending/approved/rejected)
- rating, totalReviews

### Booking
- id (UUID)
- clientId, performerId
- eventDate, eventStartTime
- venue, venueAddress
- amount, platformFee
- status (pending/accepted/declined/cancelled/completed)
- paymentStatus
- paymentIntentId

### Message
- id (UUID)
- conversationId
- senderId
- content
- attachments
- isRead

### Review
- id (UUID)
- bookingId
- reviewerId, performerId
- rating (1-5)
- comment
- professionalism, quality, value, communication
- status (pending/approved/rejected)

## 🔄 Real-time Events (Socket.io)

Connect with JWT token:
```javascript
const socket = io('http://localhost:5000', {
  auth: { token: '<jwt_token>' }
});
```

### Events
- `new-message` - New message received
- `new-booking` - New booking request
- `booking-updated` - Booking status changed
- `payment-success` - Payment completed
- `performer-status-updated` - Performer approved/rejected
- `user-typing` - User is typing
- `user-online` - User came online

## 💳 Stripe Integration

### Payment Flow
1. Client creates booking
2. Performer accepts booking
3. Client creates payment intent: `POST /api/payments/create-intent`
4. Frontend processes payment with Stripe.js
5. Webhook confirms payment
6. Booking status updated

### Webhooks
Configure webhook URL in Stripe dashboard:
```
https://your-domain.com/api/payments/webhook
```

Events handled:
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

## 📧 Email Templates

Emails sent for:
- ✉️ Email verification
- 🔑 Password reset
- 📅 New booking notification
- ✅ Booking confirmed
- ❌ Booking cancelled
- ⭐ Review received

## 🛡️ Security

### Implemented
- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 req/15min)
- Helmet for security headers
- Input validation
- XSS protection
- CORS configuration
- SQL injection prevention (Sequelize)

### Best Practices
- Use HTTPS in production
- Rotate JWT secrets regularly
- Enable 2FA for admin accounts
- Regular security audits
- Monitor for suspicious activity

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure production database
3. Set secure JWT_SECRET
4. Enable HTTPS
5. Configure production CORS origins

### Railway Deployment
```bash
railway up
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 Scripts

```bash
npm run dev        # Start dev server with nodemon
npm start          # Start production server
npm run migrate    # Run database migrations
npm run seed       # Seed database with sample data
```

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
pg_isready

# Verify credentials in .env
psql -U postgres -d bookedup
```

### Stripe Webhooks in Development
Use Stripe CLI:
```bash
stripe listen --forward-to localhost:5000/api/payments/webhook
```

### Email Not Sending
- Enable "Less secure apps" for Gmail
- Use App Password instead of regular password
- Check firewall/port 587

## 📚 Additional Resources

- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Socket.io Documentation](https://socket.io/docs/v4/)
- [Passport.js Guide](http://www.passportjs.org/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - see LICENSE file for details

---

**Built with ❤️ for BookedUp**
