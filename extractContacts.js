import fs from 'fs';

const rawText = fs.readFileSync('pdf_data.txt', 'utf8');

// The lines look like:
// EMPRESA RUC RESOL. N° AÑO FECHA VIGENCIA CONTACTO
// ASOCIACION DE TRANSPORTISTAS DE GUAJAYBI 80115895-8 773 2021 19/06/2021 19/06/2026 0982 854409

const contactMap = new Map();
const lines = rawText.split('\n').filter(l => l.trim().length > 0);

for (const line of lines) {
    if (line.startsWith('EMPRESA RUC') || line.startsWith('Registro de') || line.startsWith('Dirección ') || line.startsWith('Página')) continue;

    // Pattern to grab RUC and everything after it.
    // Example line: G-3 TRANSPORTES S.A. 80045490-1 664 2021 25/06/2021 25/06/2026 067 320273
    const match = line.match(/^(.*?)\s+([\d\.-]+)\s+\d+\s+\d{4}\s+[\d\/]+\s+[\d\/]+\s+(.*)$/);
    
    if (match) {
        let ruc = match[2].trim();
        let contact = match[3].trim();
        
        // Fix some multiline mis-alignments in OCR where contact falls on next line by accident
        // For simplicity, we just take the RUC and Contact
        
        contactMap.set(ruc, contact);
    }
}

// Read current data.ts
let dataTs = fs.readFileSync('src/data.ts', 'utf8');

// Unfortunately, it is not simple to update JS AST cleanly with regex, but we can do a naive replace if we string replace each object block

const linesTs = dataTs.split('\n');

for (let i = 0; i < linesTs.length; i++) {
    const line = linesTs[i];
    
    // Look for ruc: "XXXXX-X"
    const rucMatch = line.match(/ruc:\s*"([^"]+)"/);
    if (rucMatch) {
       let ruc = rucMatch[1];
       if (contactMap.has(ruc)) {
          let contact = contactMap.get(ruc);
          // if the line already has contato
          if (!line.includes('contato:')) {
             if (line.includes('}')) {
                 linesTs[i] = line.replace(/\s*\}\s*,?$/, `, contato: "${contact}" },`);
             }
          }
       }
    }
}

fs.writeFileSync('src/data.ts', linesTs.join('\n'));
console.log('Contacts populated!');
