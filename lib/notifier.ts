import { sendEmail } from './mailer'
import twilio from 'twilio'

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export type NotificationType = 'email' | 'sms' | 'both'

export async function sendNotification(
  recipient: string,
  type: NotificationType,
  subject: string,
  message: string
) {
  const results = []

  if (type === 'email' || type === 'both') {
    try {
      const emailResult = await sendEmail(recipient, subject, message)
      results.push({ type: 'email', status: 'sent', result: emailResult })
    } catch (error) {
      results.push({ type: 'email', status: 'failed', error })
    }
  }

  if (type === 'sms' || type === 'both') {
    try {
      const smsResult = await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: recipient,
      })
      results.push({ type: 'sms', status: 'sent', result: smsResult })
    } catch (error) {
      results.push({ type: 'sms', status: 'failed', error })
    }
  }

  return results
}

export async function sendBorrowConfirmation(
  email: string,
  phone: string | null,
  studentName: string,
  bookTitle: string,
  dueDate: string,
  notificationType: NotificationType = 'email'
) {
  const emailMessage = `
    <h2>Borrow Confirmation</h2>
    <p>Dear ${studentName},</p>
    <p>You have successfully borrowed <strong>${bookTitle}</strong>.</p>
    <p>Due date: <strong>${dueDate}</strong></p>
    <p>Please return it on time.</p>
  `

  const smsMessage = `Hello ${studentName}, you borrowed "${bookTitle}" from our library. Due date: ${dueDate}`

  if (notificationType === 'both' && phone) {
    return sendNotification(phone, 'both', 'Book Borrowed', smsMessage)
  }

  return sendNotification(email, notificationType, 'Book Borrowed', emailMessage)
}
