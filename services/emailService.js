const sendContactEmail = (name, email, company, companyType, message) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_RECEIVER,
        replyTo: email,
        subject: `Novo contato de ${name} (Empresa: ${company || 'N/A'})`,
        html: `
        <h2>Nova mensagem de contato do site: </h2>
        <p><strong>Nome:</strong>${name}</p>
        <p><strong>Email:</strong>${email}</p>
        <p><strong>Empresa:</strong>${company || 'Não informado'}</p>
        <p><strong>Tipo de Empresa</strong> ${companyType || 'Não informado'}
        <hr>
        <h3>Mensagem:</h3>
        <p>${message.replace(/\n/g, '<br>')}</p>
        `
    };

    return transporter.sendMail(mailOptions);
}

module.exports = {
    sendContactEmail
};