const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
//carregando as variaveis de ambiente no diretorio, .env.
//se dentro voce tivesse criado uma pasta para o .env fica dentro, no dotenv.config();
//voce tem que coloca o path: ''

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors({ methods: '*', origin: '*', allowedHeaders: '*' })); //configurando o a api para funcionar em url diferente da aplicação

const transporter = nodemailer.createTransport({
  //configuração SMTP do email que voce vai usar
  host: 'smtp.gmail.com',
  port: 587,
  auth: { user: process.env.USER, pass: process.env.PASS },
});

app.post('/send', (req, res) => {

  const {nome, email, assunto, mensagem} = req.body

  transporter
    .sendMail({
      from: process.env.USER,
      to: process.env.USERPESSOAL,
      replyTo: email,
      subject: assunto,
      text: `Oi, sou ${nome}, ${mensagem}.`,
      })
      .then(info => {
      res.send(info);
    })
    .catch(error => {
      res.send(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
