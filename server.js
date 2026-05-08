const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Importar as rotas que vamos criar
const perfisRoutes = require('./routes/perfis');

// Usar as rotas
app.use('/api/perfis', perfisRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor a rodar na porta ${PORT}`));