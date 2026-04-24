import fs from 'fs';
let data = fs.readFileSync("src/data.ts", "utf8");
// Let's replace any instances of empresa: "\", with empresa: "UNKNOWN COMPANY"
data = data.replace(/empresa:\s*("\\"),/g, 'empresa: "COMPANY_REPLACED",');
fs.writeFileSync("src/data.ts", data);
console.log('Fixed');
