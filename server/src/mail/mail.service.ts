import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';

interface IMailService {
  port: number;
  send(to: string, subject: string, text: string, html?: string): Promise<void>;
}

@Injectable()
export class MailService implements IMailService {
  constructor(private readonly configService: ConfigService) {}

  private host: string = '';
  private secure: boolean = false;
  port: number = 0;
  async send(to: string, subject?: string, text?: string) {
    const transporter = nodemailer.createTransport({
      host: this.configService.getOrThrow<string>('MAILTRAP_SMTP_HOST'),
      port: this.configService.getOrThrow<number>('MAILTRAP_SMTP_PORT'),
      secure: this.secure,
      auth: {
        user: this.configService.getOrThrow<string>('MAILTRAP_SMTP_USER'), // generated ethereal user
        pass: this.configService.getOrThrow<string>('MAILTRAP_SMTP_PASSWORD'), // generated ethereal password
      },
    });
    await transporter.verify();
    console.log('Server is ready to take our messages');
    const info = await transporter.sendMail({
      from: '"MUI" <muyeed@example.com>', // sender address
      to,
      subject: subject || 'Hello ✔', // Subject line
      text: text || 'Hello world?', // plain text body
      html: '<b>Hello world?</b>', // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  }
}
