const { createClient } = require('@supabase/supabase-js');
const path = require('path');
// Isso garante que ele ache o .env na raiz, não importa de onde você chame o arquivo
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Log para você conferir no terminal se as chaves estão sendo lidas
if (!supabaseUrl || !supabaseKey) {
    console.log("⚠️ Alerta: Chaves do Supabase não encontradas! Verifique o arquivo .env na raiz.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;c