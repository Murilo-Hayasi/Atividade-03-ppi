import express from "express";

const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }));

const discos = [];

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Locadora de Vinis</title>

      <!-- Bootstrap -->
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    </head>

    <body class="bg-light">

      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div class="container-fluid">
          <a class="navbar-brand fw-bold text-primary" href="#">🎵 Locadora de Vinis</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item"><a class="nav-link active" aria-current="page" href="/">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="#cadastro">Cadastrar Disco</a></li>
              <li class="nav-item"><a class="nav-link" href="#lista">Discos Cadastrados</a></li>
            </ul>
            <form class="d-flex" role="search" onsubmit="buscarDisco(event)">
              <input class="form-control me-2" type="search" placeholder="Buscar título" id="buscaInput" />
              <button class="btn btn-outline-success" type="submit">Buscar</button>
            </form>
          </div>
        </div>
      </nav>

      <div class="container mt-5">
        <h1 class="text-center mb-4">Cadastro de Discos de Vinil</h1>

        <!-- Formulário -->
        <form action="/cadastro" method="POST" class="card p-4 shadow-sm" id="cadastro">
          <div class="mb-3">
            <label for="titulo" class="form-label">Título do Disco</label>
            <input type="text" class="form-control" id="titulo" name="titulo" required />
          </div>

          <div class="mb-3">
            <label for="artista" class="form-label">Artista/Banda</label>
            <input type="text" class="form-control" id="artista" name="artista" required />
          </div>

          <div class="mb-3">
            <label for="ano" class="form-label">Ano de Lançamento</label>
            <input type="number" class="form-control" id="ano" name="ano" required />
          </div>

          <div class="mb-3">
            <label for="genero" class="form-label">Gênero Musical</label>
            <select id="genero" name="genero" class="form-select" required>
              <option value="">Selecione...</option>
              <option>Rock</option>
              <option>Pop</option>
              <option>MPB</option>
              <option>Jazz</option>
              <option>Samba</option>
              <option>Outro</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>

        <!-- Lista -->
        <div id="lista" class="mt-5">
          <h2 class="mb-3">Discos Cadastrados</h2>
          ${
            discos.length > 0
              ? `<ul class="list-group">
                  ${discos.map(d => `<li class="list-group-item">
                    <strong>${d.titulo}</strong> — ${d.artista} (${d.ano}) [${d.genero}]
                  </li>`).join("")}
                 </ul>`
              : `<p class="text-muted">Nenhum disco cadastrado ainda.</p>`
          }
        </div>
      </div>

      <script>
        // Função simples de busca local
        function buscarDisco(e) {
          e.preventDefault();
          const termo = document.getElementById('buscaInput').value.toLowerCase();
          const items = document.querySelectorAll('.list-group-item');
          items.forEach(li => {
            li.style.display = li.textContent.toLowerCase().includes(termo) ? '' : 'none';
          });
        }
      </script>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `);
});

app.post("/cadastro", (req, res) => {
  const { titulo, artista, ano, genero } = req.body;

  if (!titulo || !artista || !ano || !genero) {
    return res.send("<h2>Erro: todos os campos são obrigatórios.</h2><a href='/'>Voltar</a>");
  }

  discos.push({ titulo, artista, ano, genero });

  res.redirect("/");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
