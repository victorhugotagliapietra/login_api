const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

// Habilita o CORS para todas as origens
app.use(cors());

// O resto do seu código de servidor...

app.use(bodyParser.json());

const users = []; // Simulação de banco de dados de usuários

app.post('/register', (req, res) => {
    console.log('Entrou register');
    const { email, password } = req.body;
    const user = { email, password };
    users.push(user); // Simples "banco de dados" em memória
    res.status(201).send({ message: "User registered successfully" });
});

app.post('/login', (req, res) => {
    console.log('Entrou login');
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).send({ message: "Invalid credentials" });

    const token = jwt.sign({ email: user.email }, 'process.env.JWT_SECRET', { expiresIn: '60' });
    res.status(200).send({ token });
});

app.get('/', (req, res) => {
  console.log('Entrou get');

  res.status(201).send({ message: "User registered successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
