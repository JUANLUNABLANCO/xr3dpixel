export interface ContactMessage {
  name: string;
  company: string;
  telephone: string;
  email: string;
  subject: string;
  message: string;
  urgent: string;
  captcha?: string;
}
