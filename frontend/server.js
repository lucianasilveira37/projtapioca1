const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

// Inicializando o servidor e o banco de dados
const app = express();
const port = 3000;

const client = new Client({
    user: 'postgres',  // Substitua pelo seu usuário do PostgreSQL
    host: 'localhost',
    database: 'tapioca',  // Substitua pelo nome do seu banco de dados
    password: '140595',  // Substitua pela sua senha
    port: 5432,
});

// Conectar ao banco de dados
client.connect().catch(err => console.error('Erro ao conectar ao banco de dados:', err));

app.use(bodyParser.json());  // Para lidar com JSON
app.use(express.static('public'));  // Serve arquivos estáticos como HTML, CSS e JS

// Rota para o envio de contatos
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validação dos dados
    if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        // Inserir dados na tabela 'contatos'
        const result = await client.query(
            'INSERT INTO contatos (nome, email, telefone, mensagem) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, email, phone, message]
        );

        // Resposta de sucesso
        res.status(200).json({
            message: 'Mensagem recebida com sucesso!',
            contact: result.rows[0]
        });
    } catch (error) {
        console.error('Erro ao salvar no banco de dados:', error);
        res.status(500).json({ message: 'Erro ao salvar a mensagem no banco de dados.' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
