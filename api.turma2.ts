import todo from "./core.ts"; // Importa as funções do arquivo core.ts

const server = Bun.serve({ // Cria o servidor

  port: 3000, // Define a porta do servidor

  routes: { // são as rotas da API
    
    "/api/todo": { // Rota principal do todo

      GET: async () => { // Método GET para listar os itens

        const items = await todo.getItems() // Pega todos os itens

        return Response.json(items) // Retorna os itens em JSON
      },

      POST: async (req) => { // Método POST para adicionar item

        const data = await req.json() as any; // Pega os dados enviados

        const item = data.item || null; // Pega o item enviado

        if (!item) // Verifica se o item existe

          return Response.json('Por favor, forneça um item para adicionar.', { status: 400 }); // Retorna erro

        await todo.addItem(item); // Adiciona o item

        return Response.json(data); // Retorna os dados enviados
      },
    },

    "/api/todo/:index": { // Rota que usa índice

      PUT: async (req) => { // Método PUT para atualizar item

        const index = parseInt(req.params.index); // Converte o índice para número

        if (isNaN(index)) // Verifica se é um número válido

          return Response.json('Índice inválido. um número inteiro é esperado.', { status: 400 }); // Retorna erro

        const data = await req.json() as any; // Pega os dados enviados

        const newItem = data.newItem || null; // Pega o novo item

        if (!newItem) // Verifica se o novo item existe

          return Response.json('Por favor, forneça um novo item para atualizar.', { status: 400 }); // Retorna erro

        try {

          await todo.updateItem(index, newItem); // Atualiza o item

          return Response.json(`Item no índice ${index} atualizado para "${newItem}".`); // Retorna sucesso

        } catch (error: any) {

          return Response.json(error.message, { status: 400 }); // Retorna erro
        }
      },

      DELETE: async (req) => { // Método DELETE para remover item

        const index = parseInt(req.params.index); // Converte o índice para número

        if (isNaN(index)) // Verifica se o índice é válido

          return Response.json('Índice inválido.', { status: 400 }); // Retorna erro

        try {

          await todo.removeItem(index); // Remove o item

          return Response.json(`Item no índice ${index} removido com sucesso.`); // Retorna sucesso

        } catch (error: any) {

          return Response.json(error.message, { status: 400 }); // Retorna erro
        }
      },
    },
  },

  async fetch(req) { // Função para arquivos estáticos

    const url = new URL(req.url); // Pega a URL da requisição

    const path = url.pathname; // Pega o caminho da URL

    const filePath = (path === '/') // Verifica se está na rota inicial

      ? './public/index.html' // Página inicial

      : `./public${path}`; // Outros arquivos da pasta public

    const file = Bun.file(filePath); // Pega o arquivo

    if (await file.exists()) { // Verifica se o arquivo existe

      return new Response(file); // Retorna o arquivo
    }

    return new Response(`Not Found`, { status: 404 }); // Retorna erro 404
  },
});

console.log(`Server running at http://localhost:${server.port}`); // Mostra no terminal que o servidor iniciou