const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase'); 

// Cadastro de Perfil
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const { data, error } = await supabase
            .from('perfis')
            .insert([{ nome, email, senha }]);

        if (error) throw error;
        res.status(201).json({ message: "Usuário criado com sucesso!" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Listar Perfis
router.get('/', async (req, res) => {
    const { data, error } = await supabase.from('perfis').select('*');
    if (error) return res.status(400).json(error);
    res.json(data);
});

module.exports = router;