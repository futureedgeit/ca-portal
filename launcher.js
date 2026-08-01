import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('============================================');
console.log('  CA Portal - Accounting and Finance Hub');
console.log('============================================');
console.log('');

// Start backend
const backend = spawn('npx', ['tsx', 'index.ts'], { cwd: join(__dirname, 'server'), stdio: 'pipe', shell: true });
backend.stdout.on('data', d => process.stdout.write(`[BACKEND] ${d}`));
backend.stderr.on('data', d => process.stdout.write(`[BACKEND] ${d}`));

// Give backend time to start
setTimeout(() => {
  console.log('\nBackend:  http://localhost:3001');
  console.log('Admin:    http://localhost:3001/admin');

  // Start frontend
  const frontend = spawn('npx', ['vite', '--host'], { cwd: __dirname, stdio: 'pipe', shell: true });
  frontend.stdout.on('data', d => process.stdout.write(`[FRONTEND] ${d}`));
  frontend.stderr.on('data', d => process.stdout.write(`[FRONTEND] ${d}`));

  // Open browser after frontend is ready
  setTimeout(() => {
    console.log('\nOpening browser...');
    spawn('start', ['http://localhost:5173'], { shell: true });
  }, 3000);

  // Cleanup on exit — kill both servers
  const cleanup = () => {
    backend.kill();
    frontend.kill();
  };

  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('exit', cleanup);

  // Also handle frontend or backend crashing
  frontend.on('close', (code) => {
    console.log(`\nFrontend exited (code ${code}). Shutting down...`);
    backend.kill();
    process.exit();
  });
  backend.on('close', (code) => {
    console.log(`\nBackend exited (code ${code}). Shutting down...`);
    frontend.kill();
    process.exit();
  });
}, 2000);

// If backend fails to start
backend.on('error', (err) => {
  console.error('Failed to start backend:', err.message);
  process.exit(1);
});
