
const nodemailer = require("nodemailer");

// 1. A DEFINIÇÃO DA VARIÁVEL
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 465,
    secure: true, 
    auth: {
        user: process.env.BREVO_USER, 
        pass: process.env.BREVO_PASS  
    }
});

// 2. CRIAÇÃO DA FUNÇÃO ESPECIALIZADA
const sendContactEmail = (name, email, company, companyType, message) => {
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        replyTo: email,
        subject: `Novo Contato de ${name} (Empresa: ${company || 'N/A'})`,
        html: `
            <h2>Nova mensagem de contato do site:</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Empresa:</strong> ${company || 'Não informado'}</p>
            <p><strong>Tipo de Empresa:</strong> ${companyType || 'Não informado'}</p>
            <hr>
            <h3>Mensagem:</h3>
            <p>${message.replace(/\n/g, "<br>")}</p>
        `
    };

    // 3. O USO DA VARIÁVEL
    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendContactEmail
};