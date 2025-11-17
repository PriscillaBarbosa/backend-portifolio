const brevo = require('@getbrevo/brevo');

const sendContactEmail = async (name, email, company, companyType, message) => {
    
    // Cria instância da API
    const apiInstance = new brevo.TransactionalEmailsApi();
    
    // Configura a chave API
    apiInstance.setApiKey(
        brevo.TransactionalEmailsApiApiKeys.apiKey,
        process.env.BREVO_API_KEY
    );

    // Prepara o email
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    
    sendSmtpEmail.sender = {
        email: 'priscillabarbosa2014@gmail.com',
        name: name
    };
    
    sendSmtpEmail.to = [{
        email: process.env.EMAIL_RECEIVER || 'priscillabarbosa2014@gmail.com'
    }];
    
    sendSmtpEmail.replyTo = { 
        email: email, 
        name: name 
    };
    
    sendSmtpEmail.subject = `Novo Contato de ${name} (Empresa: ${company || 'N/A'})`;
    
    sendSmtpEmail.htmlContent = `
        <h2>Nova mensagem de contato do site:</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company || 'Não informado'}</p>
        <p><strong>Tipo de Empresa:</strong> ${companyType || 'Não informado'}</p>
        <hr>
        <h3>Mensagem:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
    `;

    try {
        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
        console.log('✅ Email enviado com sucesso via Brevo');
        return data;
    } catch (error) {
        console.error('❌ Erro ao enviar email:', error.response ? error.response.body : error);
        throw error;
    }
};

module.exports = {
    sendContactEmail
};