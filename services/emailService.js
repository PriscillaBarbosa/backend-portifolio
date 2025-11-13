

const SibApiV3Sdk = require('@sendinblue/client');

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// Configura a autenticação
const apiClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = apiClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY; // Pega a chave do Render

// função de envio
const sendContactEmail = async (name, email, company, companyType, message) => {
    
    const sender = {
        email: 'priscillabarbosa2014@gmail.com', 
        name: name 
    };

    const to = [{
        email: process.env.EMAIL_RECEIVER 
    }];

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = sender;
    sendSmtpEmail.to = to;
    sendSmtpEmail.replyTo = { email: email, name: name }; 
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
        console.log('API da Brevo enviou com sucesso.', data);
        return data; 
    } catch (error) {
        console.error('Erro ao enviar e-mail pela API da Brevo:', error);
        throw error; 
    }
};

module.exports = {
    sendContactEmail
};