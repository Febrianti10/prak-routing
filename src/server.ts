import * as http from 'http';

const server = http.createServer((req, res) => {
    const url = req.url || "";
    const method = req.method;

    if (url === "/" && method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Selamat datang di halaman home" }));
    } 
    else if (url === "/about" && method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Halaman About" }));
    } 
    else if (url.startsWith("/users/") && method === "GET") {
        // Mengambil ID dari URL (misal: /users/123 -> 123)
        const id = url.split("/")[2]; 
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: `User ID: ${id}` }));
    } 
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Router tidak ditemukan" }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});