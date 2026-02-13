const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Fungsi helper
function toNumber(v) {
    if (v === undefined || v === null) return NaN;
    return Number(v);
}

function calculate(op, a, b) {
    switch(op) {
        case 'add': return a + b;
        case 'sub': return a - b;
        case 'mul': return a * b;
        case 'div':
            if (b == 0) throw new Error('Division by zero');
            return a / b;
        case 'pow': return Math.pow(a, b);
        case 'mod': return a % b;
        default: throw new Error('Unsupported operation');
    }
}

// Routes
app.get('/calc', (req, res) => {
    try {
        const { op, a, b } = req.query;
        const numA = toNumber(a);
        const numB = toNumber(b);
        
        if (isNaN(numA) || isNaN(numB)) {
            return res.status(400).json({ error: 'Invalid numbers' });
        }
        
        const result = calculate(op, numA, numB);
        res.json({ op, a: numA, b: numB, result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/calculate', (req, res) => {
    try {
        const { op, a, b } = req.body;
        const numA = toNumber(a);
        const numB = toNumber(b);
        
        if (isNaN(numA) || isNaN(numB)) {
            return res.status(400).json({ error: 'Invalid numbers' });
        }
        
        const result = calculate(op, numA, numB);
        res.json({ op, a: numA, b: numB, result });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/', (req, res) => {
    res.json({ 
        message: 'Calculator API is running',
        endpoints: {
            get: '/calc?op=add|sub|mul|div|pow|mod&a=NUM&b=NUM',
            post: '/calculate { "op": "...", "a": NUM, "b": NUM }'
        }
    });
});

// Untuk local development (opsional)
if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

// ✅ EXPORT INI PENTING UNTUK VERCEL
module.exports = app;