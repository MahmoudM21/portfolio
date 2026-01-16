import nodemailer from 'nodemailer'

/**
 * Create email transporter
 * Uses environment variables for configuration
 */
const createTransporter = () => {
  // For development/testing, use ethereal email or similar
  if (process.env.NODE_ENV !== 'production' && !process.env.EMAIL_HOST) {
    // Return a mock transporter for development
    return {
      sendMail: async (options) => {
        console.log('📧 Email would be sent (dev mode):')
        console.log('   To:', options.to)
        console.log('   Subject:', options.subject)
        return { messageId: 'mock-message-id' }
      },
    }
  }

  // Production transporter
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

/**
 * Send email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 * @param {string} [options.text] - Plain text content
 * @returns {Promise<Object>} - Nodemailer response
 */
export const sendEmail = async ({ to, subject, html, text }) => {
  const transporter = createTransporter()

  const mailOptions = {
    from: process.env.EMAIL_FROM || '"Portfolio" <noreply@example.com>',
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for plain text
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('✓ Email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('✗ Email error:', error.message)
    throw error
  }
}

/**
 * Verify email configuration
 * @returns {Promise<boolean>}
 */
export const verifyEmailConfig = async () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('⚠ Email verification skipped in development mode')
    return true
  }

  try {
    const transporter = createTransporter()
    await transporter.verify()
    console.log('✓ Email configuration verified')
    return true
  } catch (error) {
    console.error('✗ Email configuration error:', error.message)
    return false
  }
}

