const Express = require('express');
const app = Express();
require('dotenv').config();
const db = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
};

app.use(cors(corsOptions));
app.use(cookieParser());

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
