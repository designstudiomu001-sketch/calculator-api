const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend from /public
app.use(express.static(path.join(__dirname, 'public')));

function toNumber(v){
	if (v === undefined || v === null) return NaN;
	return Number(v);
}

function calculate(op, a, b){
	switch(op){
		case 'add': return a + b;
		case 'sub': return a - b;
		case 'mul': return a * b;
		case 'div':
			if (b === 0) throw new Error('Division by zero');
			return a / b;
		case 'pow': return Math.pow(a, b);
		case 'mod': return a % b;
		default: throw new Error('Unsupported operation');
	}
}

// API info
app.get('/api', (req, res) => {
	res.json({
		service: 'Calculator API',
		endpoints: [
			'GET /api/calc?op=add|sub|mul|div|pow|mod&a=NUM&b=NUM',
			'POST /api/calculate { op, a, b }',
			'GET / (UI)'
		]
	});
});

// Query-based calculator
app.get('/api/calc', (req, res) => {
	const { op } = req.query;
	const a = toNumber(req.query.a);
	const b = toNumber(req.query.b);
	if (!op) return res.status(400).json({ error: 'op query param required' });
	if (Number.isNaN(a) || Number.isNaN(b)) return res.status(400).json({ error: 'a and b must be numbers' });
	try{
		const result = calculate(op, a, b);
		res.json({ op, a, b, result });
	} catch(err){
		res.status(400).json({ error: err.message });
	}
});

// JSON body calculator
app.post('/api/calculate', (req, res) => {
	const { op, a: ra, b: rb } = req.body || {};
	const a = toNumber(ra);
	const b = toNumber(rb);
	if (!op) return res.status(400).json({ error: 'op required in body' });
	if (Number.isNaN(a) || Number.isNaN(b)) return res.status(400).json({ error: 'a and b must be numbers' });
	try{
		const result = calculate(op, a, b);
		res.json({ op, a, b, result });
	} catch(err){
		res.status(400).json({ error: err.message });
	}
});

// Fallback 404 for unknown API routes
app.use('/api', (req, res) => res.status(404).json({ error: 'API route not found' }));

app.listen(port, () => console.log(`Calculator API listening on port ${port}`));
