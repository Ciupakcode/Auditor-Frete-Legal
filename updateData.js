import fs from 'fs';

const text = fs.readFileSync('parsed.txt', 'utf8');
const lines = text.split('\n').filter(l => l.trim().length > 0);

const vigentes = lines.map((line, index) => {
    const match = line.match(/^(.*?)\s+([\d\.-]+)$/);
    if (match) {
        return {
            id: String(index + 200),
            empresa: match[1].trim(),
            ruc: match[2].trim(),
            infracoes: 0,
            status: 'REGULAR'
        };
    }
    return null;
}).filter(Boolean);

let dataTs = fs.readFileSync('src/data.ts', 'utf8');

// replace Status type
dataTs = dataTs.replace(
    /export type Status = 'Risco Crítico' \| 'Sob Investigação';/,
    `export type Status = 'Risco Crítico' | 'Sob Investigação' | 'Regular';`
);

// We keep LISTA_NEGRA, but maybe we rename the export or just add TRANSPORTADORAS_VIGENTES
const exportInsert = `
export const TRANSPORTADORAS_VIGENTES: CompanyRecord[] = ${JSON.stringify(vigentes, null, 2)};
`;

dataTs += exportInsert;

fs.writeFileSync('src/data.ts', dataTs);
console.log('Done!');
