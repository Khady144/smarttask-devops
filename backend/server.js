const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.POSTGRES_USER || 'smarttask_user',
  password: process.env.POSTGRES_PASSWORD || 'smarttask_pass',
  database: process.env.POSTGRES_DB || 'smarttask_db',
  port: 5432,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL
  )
`).catch(err => console.error('Erreur DB Init:', err));

app.get('/api/health', (req, res) => res.json({ status: 'OK', service: 'SmartTask Backend' }));

app.get('/api/tasks', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title } = req.body;
    const { rows } = await pool.query('INSERT INTO tasks(title) VALUES($1) RETURNING *', [title]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend connecté sur le port ${PORT}`));
