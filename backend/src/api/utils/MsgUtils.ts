const fs = require('fs');

// configure for Slack
const { IncomingWebhook } = require('@slack/client');
const User = require("../models/user.model")
let incomingWebhook: any = null;


// configure for emailing
const { EMAIL_TEMPLATE_BASE, EMAIL_NODEMAILER, PASSWORD_EMAIL, EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE } = require('../../config/vars');

const handlebars = require('handlebars');

// load template file & inject data => return content with injected data.
const template = (fileName: string, data: any) => {
  const content = fs.readFileSync(EMAIL_TEMPLATE_BASE + fileName).toString();
  const inject = handlebars.compile(content);
  return inject(data);
};

// --------- Email Templates --------- //

export function welcomeEmail({ name, email }: { name: string; email: string }) {
  return {
    from: EMAIL_NODEMAILER,
    to: `${name} <${email}>`,
    subject: `Welcome!`,
    text: template('welcome.txt', { name, email }),
    html: template('welcome.html', { name, email })
  };
}

export function forgotPasswordEmail({ name, email, tempPass }: { name: string; email: string; tempPass: string }) {
  return {
    from: EMAIL_NODEMAILER,
    to: email,
    subject: `Your one-time temporary password`,
    text: template('forgot-password.txt', { name, email, tempPass }),
    html: template('forgot-password.html', { name, email, tempPass })
  };
}
export function customEmail({ name, email, content, object }: { name: string; email: string; content: string; object: string }) {
  return {
    from: EMAIL_NODEMAILER,
    to: `${name} <${email}>`,
    subject: object,
    text: template('custom.txt', { name, email, content }),
    html: template('custom.html', { name, email, content })
  };
}

export function CertifEmail({ name, email, image, object }: { name: string; email: string; image: string; object: string }) {
  return {
    from: EMAIL_NODEMAILER,
    to: `${name} <${email}>`,
    subject: object,
    text: template('certif.txt', { name, email, image }),
    html: template('certif.html', { name, email, image }),
    attachments: [{
      filename: 'certif.jpg',
      content: image,
      cid: 'image1' // Use the same CID to reference the image in the HTML
    }]
  };
}

export function verifyYourAccount({ firstName, email, tempPass }: { firstName: string; email: string; tempPass: string }) {
  console.log("acc verification -------------------------");
  return {
    from: EMAIL_NODEMAILER,
    to: `${firstName} <${email}>`,
    subject: `verify Your Account`,
    // text: template('verify-account.txt', { name, email, token, url: process.env.FRONT_URL }),
    html: template('verify-account.html', { firstName, email, tempPass, url: process.env.FRONT_URL })
  };
}

export function GetPassAndVerAcc({ firstName, email, token, tempPass }: { firstName: string; email: string; token: string; tempPass: string }) {

  return {
    from: EMAIL_NODEMAILER,
    to: `${firstName} <${email}>`,
    subject: `verify Your Account and temp pass`,
    // text: template('verify-account.txt', { name, email, token, url: process.env.FRONT_URL }),
    html: template('passandverif.html', { firstName, email, token, tempPass, url: process.env.FRONT_URL })
  };
}
export function DemandeEmail({ UniName }: { UniName: string }) {

  return {
    from: EMAIL_NODEMAILER,
    to: EMAIL_NODEMAILER,
    subject: `A university wants to join the platform`,
    // text: template('verify-account.txt', { name, email, token, url: process.env.FRONT_URL }),
    html: template('Unidemande.html', { UniName })
  };
}
export function multipleMails({ users, content, object }: { users: any[]; content: string; object: string }) {
  const emailAddresses = users.map(e => e.email);
  return {
    from: EMAIL_NODEMAILER,
    to: emailAddresses.join(', '),
    subject: object,
    // text: template('custom.txt', { content }),
    // html: template('customMultiple.html', { content })
    html: content
  };
}

// resetPswEmail, forgotPswEmail, etc.

// --------- Nodemailer and Mailgun setup --------- //
const nodemailer = require('nodemailer');
let emailClient = nodemailer.createTransport({

  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: EMAIL_SECURE,
  auth: {
    user: EMAIL_NODEMAILER,
    pass: PASSWORD_EMAIL
  }
});

export function sendEmail(data: any) {
  if (!emailClient) {
    console.log("not sending mail_________________________________to ", data);
    return;
  }
  console.log("sending mail_________________________________to ", data);
  return new Promise((resolve, reject) => {
    emailClient
      ? emailClient.sendMail(data, (err: any, info: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      })
      : '';
  });
}

// send slack message using incoming webhook url
// @example: slackWebhook('message')
export function slackWebhook(message: string) {
  incomingWebhook ? incomingWebhook.send(message) : '';
}
