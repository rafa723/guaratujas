fetch(request)
Função principal do servidor, roda toda vez que chega uma requisição.

new URL(request.url)
Separa a URL pra pegar rota, método e parâmetros.

pathname
Caminho da rota (ex: /items)

method
Tipo da requisição (GET, POST, etc)

searchParams.get("...")
Pega valores da URL (query string)

filter()
Usado pra buscar itens:
filtra pela descrição usando includes()

toLowerCase()
Evita erro com maiúscula/minúscula

includes()
Verifica se o texto existe dentro de outro

slice(start, end)
Usado na paginação, pega só uma parte do array

(page - 1) * limit
Cálculo pra saber de onde começa a página

request.json()
Lê o corpo da requisição (dados enviados)

if (!description || description.trim() === "")
Validação pra não aceitar vazio ou espaço

new Item(description)
Cria um novo item

todo.addItem(item)
Adiciona na lista (provavelmente salva no JSON)

Number(...)
Converte string pra número (usado no index, page, limit)

isNaN()
Verifica se não é número válido

todo.updateItem(index, item)
Atualiza um item existente

todo.removeItem(index)
Remove um item



