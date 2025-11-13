require('dotenv').config();

const express = require('express');
const cors = require('cors');

//importa as rotas
const contactRoutes = require('./routes/contactRoutes');

//inicializa o express
const app = express();
const PORT = process.env.PORT || 3001;

//configuração dos plugins
const whitelist = ['https://priscillabarbosa-developer.vercel.app']; 
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido pelo CORS'));
    }
  }
};
app.use(cors(corsOptions)); 
app.use(express.json());

//config das rotas
app.use('/api', contactRoutes);

//inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor bacnkend rodando na porta ${PORT}`);
});




