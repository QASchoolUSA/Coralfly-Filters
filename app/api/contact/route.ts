import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, subject, message } = await request.json();

        // Check if Titan credentials are provided
        if (!process.env.TITAN_EMAIL_USER || !process.env.TITAN_EMAIL_PASSWORD) {
            console.error('Titan Email credentials are missing in .env.local');
            return NextResponse.json(
                { error: 'Email service is not configured.' },
                { status: 500 }
            );
        }

        // Configure Nodemailer for Titan Email
        const transporter = nodemailer.createTransport({
            host: 'smtp.titan.email', // Titan SMTP server
            port: 465, // SSL port
            secure: true, // Use SSL
            auth: {
                user: process.env.TITAN_EMAIL_USER,
                pass: process.env.TITAN_EMAIL_PASSWORD,
            },
        });

        // Email Data
        const mailOptions = {
            from: `"Contact Form" <${process.env.TITAN_EMAIL_USER}>`, // Must send from the authenticated Titan user
            to: process.env.TITAN_EMAIL_USER, // Send to yourself
            replyTo: email, // If you click "reply", it will go to the user's email
            subject: `New Contact Form Submission: ${subject || 'No Subject'}`,
            html: `
                <h2>New Contact Message</h2>
                <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        };

        // Send Email
        const info = await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error('Failed to send email:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}
