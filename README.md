<<<<<<< HEAD
# Calculator Backend (Lightweight)

Simple Express-based calculator API with a minimal web UI.

Run locally:

```powershell
npm install
npm start
```

Open the UI at `http://localhost:3000/`.

API endpoints:

- `GET /api` — service info
- `GET /api/calc?op=add|sub|mul|div|pow|mod&a=NUM&b=NUM` — query calculator
- `POST /api/calculate` — JSON body `{ "op": "add", "a": 1, "b": 2 }`

Examples:

```powershell
# GET example
curl "http://localhost:3000/api/calc?op=add&a=5&b=3"

# POST example
curl -H "Content-Type: application/json" -d '{"op":"mul","a":6,"b":7}' http://localhost:3000/api/calculate
```
=======
# calculator-api
>>>>>>> c8f908af9eb6eaec7a5393b193cd6cf3892d4a2d
