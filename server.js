const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());

const users = [];

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    const user = { email, password };
    users.push(user);
    res.status(201).send({ message: "User registered successfully" });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return res.status(401).send({ message: "Invalid credentials" });

    const token = jwt.sign({ email: user.email }, 'process.env.JWT_SECRET', { expiresIn: '1h' });
    res.status(200).send({ token });
});

app.get('/', (req, res) => {
  res.status(201).send({ message: "User registered successfully" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
