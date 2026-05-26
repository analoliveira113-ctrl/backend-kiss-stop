const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase');

// Postar Mensagem
router.post('/postar', async (req, res) => {
    const { conteudo, autor, destinatario } = req.body;
    try {
        let idDestinatario = null;

        if (destinatario && destinatario.toLowerCase() !== 'todos') {
            // Busca o id do destinatário pelo nome
            const { data: perfil, error: perfilError } = await supabase
                .from('perfis')
                .select('id')
                .ilike('nome_completo', `%${destinatario}%`)
                .maybeSingle();

            if (!perfilError && perfil) {
                idDestinatario = perfil.id;
            }
        }

        const { data, error } = await supabase
            .from('mensagens')
            .insert([{ 
                conteudo, 
                id_remetente: null, 
                id_destinatario: idDestinatario 
            }]);

        if (error) throw error;
        res.status(201).json({ message: "Mensagem salva no baú!" });
    } catch (error) {
        res.status(400).json({ error: error.message || error });
    }
});

// Buscar todas as mensagens
router.get('/todas', async (req, res) => {
    const { data, error } = await supabase
        .from('mensagens')
        .select('*')
        .order('criado_em', { ascending: false });

    if (error) return res.status(400).json(error);
    res.json(data);
});

module.exports = router;