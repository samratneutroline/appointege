// import { Resend } from "resend"

// const resend = new Resend(process.env.RESEND_API_KEY)

// export const sendVerificationEmail = async (email: string, token: string) => {
//   const confirmLink = `http://localhost:3000/auth/verify-email?token=${token}`

//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: email,
//     subject: "Confirm your email",
//     html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email</p>`,
//   })
// }

import nodemailer from "nodemailer"
import { getBaseUrl } from "./baseUrl"
import { getPasswordResetEmail } from "./email-templates"

// Configuration
const senderEmail = process.env.SENDER_EMAIL // Replace with your email
const senderPassword = process.env.SENDER_PASSWORD // Replace with your Gmail App Password

enum EmailType {
  Verification = "Verification",
  Reset = "Reset",
  TwoFactor = "TwoFactor",
}

const getEmailRedirectUrl = (type: EmailType, token: string) => {
  const baseUrl = getBaseUrl()
  return `${baseUrl}/${
    type === EmailType.Verification ? "verify-email" : "new-password"
  }?token=${token}`
}

/**
 *Sends email, either confirm or reset
 * @param email - Sends email to given address
 * @param token - Token is used to create link
 * @param type - Check either email is verify or reset
 * @returns - returns info of email sent
 */

const sendEmail = async (
  email: string,
  token: string,
  type: EmailType = EmailType.Verification,
  template: string = ""
) => {
  try {
    // Construct the confirmation link
    const confirmLink = `${getEmailRedirectUrl(type, token)}`

    // Step 1: Create the transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Gmail SMTP server
      port: 587, // Port for TLS
      secure: false, // Use TLS
      auth: {
        user: senderEmail, // Your email
        pass: senderPassword, // Your app password
      },
    })

    // Step 2: Email content
    const mailOptions = {
      from: `Appointege <${senderEmail}>`, // Sender address
      to: email, // Recipient address
      subject: `${
        type === EmailType.Verification
          ? "Verify Your Email"
          : "Reset your password"
      }`, // Subject line
      text: `Your ${type} token is: ${token}`, // Plain text
      html:
        template ||
        `<p> Click <a href="${confirmLink}">here</a> to ${
          type === EmailType.Verification
            ? "verify your email"
            : "change your password"
        }</p>`, // HTML content
    }

    // Step 3: Send the email
    const info = await transporter.sendMail(mailOptions)

    console.log("Email sent successfully!")
    console.log("Message ID:", info.messageId)
    return info
  } catch (error) {
    console.error("Error sending email:", error)
    return
  }
}

// Verification Email
export async function sendVerificationEmail(email: string, token: string) {
  const info = await sendEmail(email, token)
}

// Reset Email
export async function sendResetEmail(
  email: string,
  token: string,
  userName: string
) {
  const resetLink = `${getEmailRedirectUrl(EmailType.Reset, token)}`
  const template = getPasswordResetEmail(userName, resetLink)
  const info = await sendEmail(email, token, EmailType.Reset, template)
}

// Two factor email
export const sendTwoFactorEmail = async (email: string, token: string) => {
  try {
    // Step 1: Create the transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // Gmail SMTP server
      port: 587, // Port for TLS
      secure: false, // Use TLS
      auth: {
        user: senderEmail, // Your email
        pass: senderPassword, // Your app password
      },
    })

    // Step 2: Email content
    const mailOptions = {
      from: `Appintege <${senderEmail}>`, // Sender address
      to: email, // Recipient address
      subject: "Appiontege Two Factor Code", // Subject line
      html: `<p>Your two factor code: ${token}</p>`, // HTML content
    }

    // Step 3: Send the email
    const info = await transporter.sendMail(mailOptions)

    console.log("Email sent successfully!")
    console.log(info)
    console.log("Message ID:", info.messageId)
    return info
  } catch (error) {
    console.error("Error sending email:", error)
    return
  }
}
