const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config(); 
//carregando as variaveis de ambiente no diretorio, .env.
//se dentro voce tivesse criado uma pasta para o .env fica dentro, no dotenv.config();
//voce tem que coloca o path: ''

const app = express()
const port = 3000

app.use(express.json());
app.use(cors({ methods: "*", origin: "*", allowedHeaders:"*"})); //configurando o a api para funcionar em url diferente da aplicação
  app.post('/send', (req, res) =>{
    
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: { user: process.env.USER, pass: process.env.PASS }
      })

      transporter.sendMail({
        from: process.env.USER,
        to: process.env.USERPESSOAL,
        replyTo: req.body.email,
        subject: req.body.assunto,
        text: `Oi, sou ${req.body.nome}, ${req.body.mensagem}.`,

      }).then(info=>{
          res.send(info);
      }).catch(error=>{
        res.send(error)
      })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})