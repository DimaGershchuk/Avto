
import { BASE_URL } from "../../utils/constants";
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

app.use(express.json());

app.post('/send-email', (req, res) => {
  const { mark, model } = req.body;

  // Налаштування транспорту для надсилання листа на пошту
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'dimagersuk30@gmail.com',
      pass: 'Dima_280104'
    }
  });

  // Налаштування даних листа
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'dimagersuk30@gmail.com',
    subject: 'New Car Details',
    text: `Mark: ${mark}\nModel: ${model}`
  };

  // Відправлення листа
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Error sending email' });
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
