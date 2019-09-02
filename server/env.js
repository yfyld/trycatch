const fs = require('fs');
const path = require('path');
const environment = process.env.NODE_ENV || 'development';

const config = fs.readFileSync(
  path.join(__dirname, `src/app.${environment}.config.ts`)
);

fs.writeFileSync(path.join(__dirname, `src/app.config.ts`), config);
