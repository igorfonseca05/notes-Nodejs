const sgMail = require('@sendgrid/mail')

const { MailerSend, EmailParams, Recipient, Sender } = require('mailersend')


const mailersend = new MailerSend({
    apiKey: process.env.API_KEY
})


async function sendEmail(to, name, subject, text) {

    try {

        const recipients = [new Recipient(to, name)]

        const sentFrom = new Sender('igorfondev@gmail.com', 'Igor')

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setSubject(subject)
            .setText(text)

        const msg = await mailersend.email.send(emailParams)

        console.log(msg)

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