import db from './database.js';
import { cleanAllArticles } from './routes/news.js';

console.log('Cleaning all articles in database...');
const fixed = cleanAllArticles();
console.log(`Clean complete. ${fixed} articles were updated.`);
process.exit(0);
