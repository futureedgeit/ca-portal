import { fetchAllNews } from './scrapers/index.js';

console.log('Fetching news items manually...');
const results = await fetchAllNews();
console.log('Done! Summary:');
console.log(JSON.stringify(results, null, 2));
process.exit(0);
