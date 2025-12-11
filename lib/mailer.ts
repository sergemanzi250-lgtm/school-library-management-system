import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(
  email: string,
  subject: string,
  message: string
) {
  try {
    const result = await resend.emails.send({
      from: 'noreply@schoollibrary.com',
      to: email,
      subject,
      html: message,
    })
    return result
  } catch (error) {
    console.error('Email sending failed:', error)
    throw error
  }
}

export async function sendBorrowReminder(
  email: string,
  studentName: string,
  bookTitle: string,
  dueDate: string
) {
  const message = `
    <h2>Borrow Reminder</h2>
    <p>Dear ${studentName},</p>
    <p>This is a reminder that you have borrowed <strong>${bookTitle}</strong>.</p>
    <p>Please return it by <strong>${dueDate}</strong>.</p>
    <p>Thank you!</p>
  `
  return sendEmail(email, 'Book Return Reminder', message)
}

export async function sendOverdueAlert(
  email: string,
  studentName: string,
  bookTitle: string,
  daysOverdue: number
) {
  const message = `
    <h2>Overdue Alert</h2>
    <p>Dear ${studentName},</p>
    <p>The book <strong>${bookTitle}</strong> is now <strong>${daysOverdue} days overdue</strong>.</p>
    <p>Please return it as soon as possible.</p>
    <p>Thank you!</p>
  `
  return sendEmail(email, 'Book Overdue Alert', message)
}
