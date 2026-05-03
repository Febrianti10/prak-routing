const server = Bun.serve({
  port: 3001,
  fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    console.log(`[${new Date().toLocaleTimeString()}] ${method} ${path}`);

    if (path === '/' && method === 'GET') {
      return new Response('<h1>🏠 Halaman Utama (Bun)</h1>', {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
    else if (path === '/about' && method === 'GET') {
      return new Response('<h1>📄 Tentang Kami (Bun)</h1>', {
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
    else if (path === '/api/users' && method === 'GET') {
      return new Response(JSON.stringify([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ]), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
    else if (path === '/api/users' && method === 'POST') {
      return new Response(JSON.stringify({ message: 'User berhasil dibuat' }), {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    else {
      return new Response('<h1>❌ 404 - Tidak Ditemukan</h1>', {
        status: 404,
        headers: { 'Content-Type': 'text/html; charset=utf-8' },
      });
    }
  },
});

console.log(`🚀 Server Bun berjalan di http://localhost:${server.port}`);
