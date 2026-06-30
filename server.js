import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Resolve directories for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Health check API endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'active',
    supabaseConfigured: !!process.env.VITE_SUPABASE_URL,
    timestamp: new Date()
  });
});

// Catch-all route to serve the React index.html for SPA routing compatibility
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://127.0.0.1:${PORT}`);
});
