const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase'); // Importa a ligação que já tens pronta

// ROTA PARA GUARDAR UMA MENSAGEM
router.post('/postar', async (req, res) => {
    const { conteudo, autor, destinatario } = req.body;

    // "mensagens" deve ser o nome da tabela que criaste no Supabase
    const { data, error } = await supabase
        .from('mensagens')
        .insert([{ 
            conteudo: conteudo, 
            autor: autor, 
            destinatario: destinatario 
        }]);

    if (error) return res.status(400).json(error);
    res.status(201).json({ message: "Mensagem salva!" });
});

// ROTA PARA BUSCAR AS MENSAGENS (Para o Feed aparecer sempre cheio)
router.get('/todas', async (req, res) => {
    const { data, error } = await supabase
        .from('mensagens')
        .select('*')
        .order('created_at', { ascending: false }); // Mostra as mais recentes primeiro

    if (error) return res.status(400).json(error);
    res.json(data);
});

module.exports = router;