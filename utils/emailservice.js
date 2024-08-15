require('dotenv').config();
let nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY); //dummy key 

// Email service
const sendEmail = async (to, subject , text ,  retries = 3) => {

  try {
    //nodeMailer transporter
      const transporter = nodemailer.createTransport({
        host: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.NODEMAILE_EMAIL,
          pass: password.env.PASSWORD, 
        },
      });
     
    //send mail using nodeMailer
      await transporter.sendMail({
          from:process.env.NODEMAILE_EMAIL,
          to,
          bcc: bcc,
          subject: subject,
          text :text
      })
      .then((data)=>{
        return true
      })
      .catch((err)=>{
        if (retries > 0) {
          console.log(`retry... attempts left -  ${retries}`);
          return sendEmail(to, subject ,text , retries - 1);
        } else {
          console.log("Trying  backup service...");
          return sendWithBackupEmail(to, subject , text );
        }
      })
    
  } catch (error) {
     console.log('error occured while sending email')
      return false;
  }
};


// backup email service function

const sendWithBackupEmail = async (to, subject , text )=>{
  const msg = {
    to,
    from: process.env.SMTP_USER, // verified sender
    subject,
    text,
  };
  await sgMail.send(msg)
  .then((data)=>{
    console.log("Email sent successfully using backup service");
    return true
  })
  .catch((err)=>{
    console.error(`Backup service failed: ${err.message}`);
    return false
  })
}



module.exports = sendEmail;