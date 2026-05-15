const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase');

// Postar Mensagem
router.post('/postar', async (req, res) => {
    const { conteudo, autor, destinatario } = req.body;
    try {
        const { data, error } = await supabase
            .from('mensagens')
            .insert([{ conteudo, autor, destinatario }]);

        if (error) throw error;
        res.status(201).json({ message: "Mensagem salva no baú!" });
    } catch (error) {
        res.status(400).json(error);
    }
});

// Buscar todas as mensagens
router.get('/todas', async (req, res) => {
    const { data, error } = await supabase
        .from('mensagens')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) return res.status(400).json(error);
    res.json(data);
});

module.exports = router;