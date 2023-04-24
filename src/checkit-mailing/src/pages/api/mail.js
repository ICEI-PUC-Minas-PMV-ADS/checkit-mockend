/* eslint-disable import/no-anonymous-default-export */
const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY)


export default (req, res) => {

  // const body = JSON.parse(req.body);
  const data = {
    to: 'checkit.app.help@gmail.com',
    from: 'checkit.app.help@gmail.com',
    subject: 'O prazo do seu projeto está chegando ao fim!'
  };

  mail.send(data)

  res.status(200).json({ status: 'OK' });

}
