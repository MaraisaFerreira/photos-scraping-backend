const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const scraping = require('./web-scraping');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.listen(9090, () => {
	console.log('WebServer funcionando na porta 9090...');
});

app.get('/nasa-photos', async (req, res) => {
	await scraping.scraping();
	fs.readFile('imgs_source.json', 'utf8', (err, data) => {
		if (err) {
			let response = { status: 'Erro!', result: err };
			res.json(response);
		} else {
			let obj = JSON.parse(data);

			let result = obj ? obj : 'Nada encontrado.';

			let response = { status: 'Sucesso!', result: result };
			res.json(response);
		}
	});
});
