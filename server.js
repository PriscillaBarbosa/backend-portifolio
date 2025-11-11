require('dotenv').config();

const express = require('express');
const cors = require('cors');

//importa as rotas
const contactRoutes = require('./routes/contactRoutes');

//inicializa o express
const app = express();
const PORT = process.env.PORT || 3001;

//configuração dos plugins
app.use(cors());
app.use(express.json());

//config das rotas
app.use('/api', contactRoutes);

//inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor bacnkend rodando na porta ${PORT}`);
});
