import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

/**
 * Send email
 */
export const sendEmail = async (options) => {
  const transporter = createTransporter();

  const message = {
    from: process.env.EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(message);
};

/**
 * Send verification email
 */
export const sendVerificationEmail = async (user, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="color: #333; border-bottom: 3px solid #f59e0b; padding-bottom: 10px;">
        Welcome to BookedUp! 🎭
      </h1>
      <p style="font-size: 16px; line-height: 1.6;">
        Hi ${user.firstName},
      </p>
      <p style="font-size: 16px; line-height: 1.6;">
        Thanks for signing up! Please verify your email address by clicking the button below:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}"
           style="background: linear-gradient(135deg, #f59e0b 0%, #ec4899 100%);
                  color: white;
                  padding: 15px 30px;
                  text-decoration: none;
                  border-radius: 5px;
                  display: inline-block;
                  font-weight: bold;">
          Verify Email Address
        </a>
      </div>
      <p style="font-size: 14px; color: #666;">
        Or copy and paste this link into your browser:<br>
        <a href="${verificationUrl}" style="color: #f59e0b;">${verificationUrl}</a>
      </p>
      <p style="font-size: 14px; color: #666; margin-top: 30px;">
        This link will expire in 24 hours.
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="font-size: 12px; color: #999;">
        If you didn't create an account, please ignore this email.
      </p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Verify Your BookedUp Account',
    html
  });
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (user, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

  const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="color: #333; border-bottom: 3px solid #f59e0b; padding-bottom: 10px;">
        Password Reset Request 🔐
      </h1>
      <p style="font-size: 16px; line-height: 1.6;">
        Hi ${user.firstName},
      </p>
      <p style="font-size: 16px; line-height: 1.6;">
        You requested to reset your password. Click the button below to proceed:
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}"
           style="background: linear-gradient(135deg, #f59e0b 0%, #ec4899 100%);
                  color: white;
                  padding: 15px 30px;
                  text-decoration: none;
                  border-radius: 5px;
                  display: inline-block;
                  font-weight: bold;">
          Reset Password
        </a>
      </div>
      <p style="font-size: 14px; color: #666;">
        Or copy and paste this link into your browser:<br>
        <a href="${resetUrl}" style="color: #f59e0b;">${resetUrl}</a>
      </p>
      <p style="font-size: 14px; color: #666; margin-top: 30px;">
        This link will expire in 1 hour.
      </p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
      <p style="font-size: 12px; color: #999;">
        If you didn't request a password reset, please ignore this email or contact support if you're concerned.
      </p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Password Reset - BookedUp',
    html
  });
};

/**
 * Send booking notification
 */
export const sendBookingNotification = async (booking, performer, client) => {
  const html = `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
      <h1 style="color: #333; border-bottom: 3px solid #f59e0b; padding-bottom: 10px;">
        New Booking Request! 🎉
      </h1>
      <p style="font-size: 16px; line-height: 1.6;">
        Hi ${performer.stageName},
      </p>
      <p style="font-size: 16px; line-height: 1.6;">
        You have a new booking request from <strong>${client.firstName} ${client.lastName}</strong>:
      </p>
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Event Date:</strong> ${new Date(booking.eventDate).toLocaleDateString()}</p>
        <p style="margin: 5px 0;"><strong>Event Type:</strong> ${booking.eventType || 'Not specified'}</p>
        <p style="margin: 5px 0;"><strong>Venue:</strong> ${booking.venue}</p>
        <p style="margin: 5px 0;"><strong>Amount:</strong> £${booking.amount}</p>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL}/dashboard/bookings"
           style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                  color: white;
                  padding: 15px 30px;
                  text-decoration: none;
                  border-radius: 5px;
                  display: inline-block;
                  font-weight: bold;
                  margin: 5px;">
          View & Respond
        </a>
      </div>
    </div>
  `;

  await sendEmail({
    email: performer.user.email,
    subject: 'New Booking Request - BookedUp',
    html
  });
};
