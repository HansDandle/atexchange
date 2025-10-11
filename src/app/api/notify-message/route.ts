import nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { to, subject, text, html } = body

    if (!to) return NextResponse.json({ error: 'Missing to' }, { status: 400 })

    const host = process.env.SMTP_HOST
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const from = process.env.SMTP_FROM || (user || 'no-reply@localhost')

    if (!host || !port || !user || !pass) {
      console.warn('SMTP not configured, skipping email')
      return NextResponse.json({ ok: false, warning: 'SMTP not configured' })
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    })

    await transporter.sendMail({
      from,
      to,
      subject: subject || 'New message on Austin Talent Exchange',
      text: text || '',
      html: html || text
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('notify-message error', err)
    return NextResponse.json({ error: (err as any).message || String(err) }, { status: 500 })
  }
}
