const { sendContactEmail } = require('../services/emailService');

const handleContactForm = async (req, res) => {
    const { name, email, company, companyType, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({message: 'Nome, email e mensagem são obrigatórios.' });
    }

    try {
        await sendContactEmail(name, email, company, companyType, message);

        res.status(200).json({ message: 'Mensagem enviada com sucesso.' });

    } catch (error) {

        console.error('Erro no controlador ao enviar e-mail:', error);

        res.status(500).json({ message: 'Falha ao enviar e-mail. Tente novamente.'})
    }
};

module.exports = {
    handleContactForm
}

