import fs from 'fs';

let data = fs.readFileSync('prisma/schema.prisma', 'utf8');
data = data.replace(/@db\.LongText/g, '');
data = data.replace(/@db\.Text/g, '');
data = data.replace(/provider = "mysql"/, 'provider = "sqlite"');

fs.writeFileSync('prisma/schema.prisma', data);
console.log('Fixed Prisma Schema');
