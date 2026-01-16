import Contact from '../models/Contact.js'
import { sendEmail } from '../utils/email.js'

/**
 * @desc    Submit contact form
 * @route   POST /api/contact
 * @access  Public
 */
export const submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body

    // Create contact entry
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
      ip: req.ip || req.connection?.remoteAddress,
      userAgent: req.get('User-Agent'),
    })

    // Send notification email (non-blocking)
    sendEmail({
      to: process.env.ADMIN_EMAIL || 'mahmoudhmad411@gmail.com',
      subject: `New Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Submitted at: ${new Date().toISOString()}</small></p>
      `,
    }).catch((err) => {
      console.error('Failed to send notification email:', err.message)
    })

    // Send auto-reply to user (non-blocking)
    sendEmail({
      to: email,
      subject: 'Thanks for reaching out!',
      html: `
        <h2>Hello ${name}!</h2>
        <p>Thank you for getting in touch. I've received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <blockquote style="border-left: 3px solid #00FFE0; padding-left: 15px; margin: 20px 0;">
          <p><strong>Subject:</strong> ${subject}</p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </blockquote>
        <p>Best regards,<br>Mahmoud Hammad 😎 BMawy 😎</p>
      `,
    }).catch((err) => {
      console.error('Failed to send auto-reply:', err.message)
    })

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      data: {
        id: contact._id,
        createdAt: contact.createdAt,
      },
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get all contact messages
 * @route   GET /api/contact
 * @access  Private (would require auth in production)
 */
export const getContacts = async (req, res, next) => {
  try {
    const { status, limit = 20, page = 1 } = req.query

    const query = {}
    if (status) {
      query.status = status
    }

    const skip = (parseInt(page) - 1) * parseInt(limit)

    const [contacts, total] = await Promise.all([
      Contact.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Contact.countDocuments(query),
    ])

    res.status(200).json({
      success: true,
      count: contacts.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: contacts,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get single contact message
 * @route   GET /api/contact/:id
 * @access  Private (would require auth in production)
 */
export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      })
    }

    // Mark as read if it's new
    if (contact.status === 'new') {
      await contact.markAsRead()
    }

    res.status(200).json({
      success: true,
      data: contact,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Update contact status
 * @route   PATCH /api/contact/:id
 * @access  Private (would require auth in production)
 */
export const updateContactStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body

    const contact = await Contact.findById(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      })
    }

    if (status) contact.status = status
    if (notes) contact.notes = notes

    if (status === 'replied') {
      contact.replied = true
      contact.repliedAt = new Date()
    }

    await contact.save()

    res.status(200).json({
      success: true,
      data: contact,
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Delete contact message
 * @route   DELETE /api/contact/:id
 * @access  Private (would require auth in production)
 */
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id)

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully',
    })
  } catch (error) {
    next(error)
  }
}

/**
 * @desc    Get contact statistics
 * @route   GET /api/contact/stats
 * @access  Private (would require auth in production)
 */
export const getContactStats = async (req, res, next) => {
  try {
    const stats = await Contact.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ])

    const totalCount = await Contact.countDocuments()
    const todayCount = await Contact.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
    })

    res.status(200).json({
      success: true,
      data: {
        total: totalCount,
        today: todayCount,
        byStatus: stats.reduce((acc, curr) => {
          acc[curr._id] = curr.count
          return acc
        }, {}),
      },
    })
  } catch (error) {
    next(error)
  }
}

