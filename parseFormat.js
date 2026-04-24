import fs from 'fs';
let code = fs.readFileSync('src/data.ts', 'utf8');

// Use regex to locate elements in LISTA_NEGRA and inject id/status
// We'll just replace all raw items
const match = code.match(/export const LISTA_NEGRA: CompanyRecord\[\] = \[([\s\S]*?)\];/);
if (match) {
    const itemsRaw = match[1];
    let nextId = 0;
    const lines = itemsRaw.split('\n');
    const processed = lines.map(line => {
        if (!line.trim().startsWith('{')) return line;
        
        let ruc, empresa, infracoes;
        const rMatch = line.match(/ruc:\s*"([^"]+)"/);
        const eMatch = line.match(/empresa:\s*"([^"]+)"/);
        const iMatch = line.match(/infracoes:\s*(\d+)/);
        
        if (rMatch) ruc = rMatch[1];
        if (eMatch) empresa = eMatch[1];
        if (iMatch) infracoes = parseInt(iMatch[1]);
        
        if (ruc && empresa && infracoes !== undefined) {
             if (infracoes === 0) return ''; // Remove 0 infraction items
             const status = infracoes >= 500 ? 'Risco Crítico' : 'Sob Investigação';
             return `  { id: 'n${++nextId}', ruc: "${ruc}", empresa: "${empresa}", infracoes: ${infracoes}, status: '${status}' },`;
        }
        return line;
    }).filter(l => l !== '');
    
    code = code.replace(match[1], '\n' + processed.join('\n') + '\n');
    fs.writeFileSync('src/data.ts', code);
    console.log('Processed');
}
