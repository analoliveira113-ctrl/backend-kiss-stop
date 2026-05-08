const express = require('express');
const router = express.Router();
const supabase = require('../data/supabase'); // Importa a conexão com o banco

// --- ROTA 1: Buscar um perfil pelo ID (O que você já tinha) ---
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await supabase
        .from('perfis')
        .select('*')
        .eq('id', id)
        .single();

    if (error) return res.status(400).json(error);
    res.json(data);
});

// --- ROTA 2: Cadastro de novo usuário (O que você acrescentou agora) ---
router.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    // 1. Cria o usuário no Auth do Supabase (Email e Senha)
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password: senha
    });

    if (authError) return res.status(400).json({ message: authError.message });

    // 2. Se criou o usuário no Auth, salva o Nome na sua tabela 'perfis'
    if (authData.user) {
        const { error: perfilError } = await supabase
            .from('perfis')
            .insert([{ 
                id: authData.user.id, 
                nome_completo: nome,
                nome_usuario: email.split('@')[0] // Cria um username padrão
            }]);

        if (perfilError) return res.status(400).json({ message: perfilError.message });
    }

    res.status(201).json({ message: "Usuário criado com sucesso!" });
});

// No final, você exporta o router UMA ÚNICA VEZ
module.exports = router;

// Rota de Login: POST /api/perfis/login
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha
    });

    if (error) return res.status(400).json({ message: error.message });

    res.status(200).json({ message: "Login ok", user: data.user });
});