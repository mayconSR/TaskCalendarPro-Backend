const Express = require('express');
const app = Express();
require('dotenv').config();
const db = require('./config/db');

// Importe seus arquivos de rota
const taskRoutes = require('./api/routes/taskRoutes');
const userRoutes = require('./api/routes/userRoutes');

const PORT = process.env.PORT || 3000;

// Middleware para analisar o corpo da requisição JSON
app.use(Express.json());

// Definindo as rotas
app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

// Inicializa a conexão com o banco de dados
db();
