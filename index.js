var express = require('express');
var app = express();
var pool = require('./queries.js');
var router = express.Router();

pool.connect((err, res) => {
    console.log(err);
    console.log('connected')
});

app.listen(3000);


app.get('/film', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM film');
        client.release();
        res.json(result.rows);
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data film.' });
    }
});

app.get('/film/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM film WHERE id = $1', [id]);
        client.release();
        res.json(result.rows);
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data film.' });
    }
});

app.get('/category', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM category');
        client.release();
        res.json(result.rows);
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data kategori.' });
    }
});

app.get('/film/category/:category', async (req, res) => {
    const { category } = req.params;
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM film WHERE category = $1', [category]);
        client.release();
        res.json(result.rows);
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil data film.' });
    }
});

