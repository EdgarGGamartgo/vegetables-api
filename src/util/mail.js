import nodemailer from 'nodemailer'

export const mail = async(to, subject, html) => {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            requireTLS: true,
            port: 587,
            secure: false, // true for 465, false for other ports
            service: process.env.mail_provider,
            auth: {
                user: process.env.mail_auth_user,
                pass: process.env.mail_auth_password
            }
        });
        var mailOptions = {
            from: process.env.mail_auth_user,
            to,
            subject,
            html,
            attachments: [{
                filename: 'pedido_aceptado.pdf',
                path: './assets/pedido_aceptado.pdf',
                contentType: 'application/pdf'
            }],
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Mail error: ", error)
                resolve(false)
            } else {
                resolve(true)
            }
        });
    })
}
