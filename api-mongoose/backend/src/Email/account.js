const sgMail = require('@sendgrid/mail')
const path = require('path')
const fs = require('fs')


const { MailerSend, EmailParams, Recipient, Sender } = require('mailersend')


const mailersend = new MailerSend({
    apiKey: process.env.API_KEY
})


// Obtendo templete HTML para enviar no corpo da requisição 
function getHTML(name, message, title) {

    const templete = path.join(__dirname, 'index.html')
    let html = fs.readFileSync(templete, 'utf8')

    html = html.replace('{{name}}', name)
        .replace('{{message}}', message)
        .replace('{{title}}', title)

    return html
}


async function sendEmail(to, name, title, text) {
    try {
        const recipients = [new Recipient(to, name)]

        const sentFrom = new Sender('igor@trial-3zxk54vexdzljy6v.mlsender.net', 'Igor')

        const html = getHTML(name, text)

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setSubject(title)
            .setHtml(html)

        const msg = await mailersend.email.send(emailParams)
    } catch (error) {
        console.log(error)

    }
}

module.exports = sendEmail

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)


// função para enviar email

// async function sendEmail(to, subject, text) {
//     try {

//         const msg = await sgMail.send({
//             to,
//             from: 'igorfondev@gmail.com',
//             subject,
//             text
//         })

//         console.log(msg)
//         res.status(200).json({ message: 'Email enviado com sucesso!' })
//     } catch (error) {
//         console.log(error)
//         res.status(404).json({ message: 'Error ao enviar email', error })
//     }
// }

// sendEmail('igorfonseca@hotmail.com', 'Denuncia gravissima', 'Estou testando como enviar email usando sendGrid')