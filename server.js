const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Configurações básicas
app.use(cors());
app.use(express.json());

// Importar as rotas (Certifique-se de que os arquivos estão na mesma pasta)
const perfisRoutes = require('./routes/perfis');
const mensagensRoutes = require('./routes/mensagens');

// Usar as rotas
app.use('/api/perfis', perfisRoutes);
app.use('/api/mensagens', mensagensRoutes);

// Rota de teste para saber se o servidor está vivo
app.get('/', (req, res) => {
    res.send('🔥 Servidor Kiss Stop rodando liso!');
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
    });
}

module.exports = app;