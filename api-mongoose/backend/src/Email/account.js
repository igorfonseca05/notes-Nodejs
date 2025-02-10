const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)


// função para enviar email

async function sendEmail(to, subject, text) {
    try {

        sgMail.send({
            to: '',
            from: '',
            subject: '',
            text: ''
        })

    } catch (error) {

    }
}