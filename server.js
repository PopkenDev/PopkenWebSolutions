// !imports
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.static('src'));
app.use('/css', express.static(__dirname + 'src/css'));
app.use('/js', express.static(__dirname + 'src/js'));
app.use('/img', express.static(__dirname + 'src/img'));
app.use(express.json());

// Set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('', (req, res) => {
  res.render('index');
});

app.get('/:page', (req, res) => {
  const page = req.params.page;
  res.render(page);
});

app.post('/contact', (req, res) => {
  console.log(req.body);

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject: `Offerteaanvraag van ${req.body.firstName}`,
    text: req.body.message,
    html: `Hoi Herman,<br><br>
    ${req.body.message}<br><br>
    Met vriendelijke groet,<br><br>
    <b>${req.body.firstName} ${req.body.lastName}</b><br>
    ${req.body.company}<br>
    ${req.body.email}<br>
    ${req.body.phoneNumber}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('success');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
