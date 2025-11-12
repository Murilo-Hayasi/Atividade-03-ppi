import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post("/cadastro", (req, res) => {
  const { titulo, artista, ano } = req.body;

  res.send(`
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Disco cadastrado</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <div class="box">
          <h2>Disco cadastrado com sucesso!</h2>
          <p><strong>Título:</strong> ${titulo}</p>
          <p><strong>Artista:</strong> ${artista}</p>
          <p><strong>Ano:</strong> ${ano}</p>
          <a href="/">Cadastrar outro</a>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
