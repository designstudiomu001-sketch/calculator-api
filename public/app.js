document.addEventListener('DOMContentLoaded', () => {
  const el = id => document.getElementById(id);
  const aEl = el('a');
  const bEl = el('b');
  const opEl = el('op');
  const calcBtn = el('calc');
  const clearBtn = el('clear');
  const resultEl = el('result');

  function show(text){ resultEl.textContent = 'Hasil: ' + text }

  calcBtn.addEventListener('click', async () => {
    const a = aEl.value;
    const b = bEl.value;
    const op = opEl.value;
    if (a === '' || b === ''){ show('Isi kedua angka'); return }
    try{
      const res = await fetch('/api/calculate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ op, a: Number(a), b: Number(b) })
      });
      const data = await res.json();
      if (!res.ok) show('Error: ' + (data.error || res.statusText));
      else show(data.result);
    } catch(e){ show('Network error') }
  });

  clearBtn.addEventListener('click', () => { aEl.value=''; bEl.value=''; show('—') });
});
