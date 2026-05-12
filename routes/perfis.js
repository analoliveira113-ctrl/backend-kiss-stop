const express = require('express');
const router = express.Router();
// Importe o seu cliente do supabase (verifique se o caminho ../supabaseClient está correto)
const supabase = require('../data/supabase'); 

/**
 * ROTA PARA LISTAR PERFIS
 * Endereço: GET http://localhost:3000/api/perfis
 */
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('perfis')
            .select('*');

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Erro interno no servidor" });
    }
});

/**
 * ROTA PARA CADASTRAR PERFIL
 * Endereço: POST http://localhost:3000/api/perfis/cadastro
 */
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const { data, error } = await supabase
            .from('perfis')
            .insert([{ nome, email, senha }]);

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        res.status(201).json({ message: "Usuário criado com sucesso!", data });
    } catch (error) {
        res.status(500).json({ error: "Erro ao processar cadastro" });
    }
});

module.exports = router;