const jsonFilePath = __dirname + '/data.temp.json'; // Caminho do arquivo JSON onde os dados serão salvos

const list: string[] = await loadFromFile(); // Cria a lista e carrega os dados do arquivo


async function loadFromFile() { // Função para ler os dados do arquivo 
  try {

    const file = Bun.file(jsonFilePath); // Pega o arquivo pelo caminho informado

    const content = await file.text(); // Lê o conteúdo do arquivo em texto

    return JSON.parse(content) as string[]; // Converte o texto em lista e retorna

  } catch (error: any) { // Captura erros

    if (error.code === 'ENOENT') // Verifica se o arquivo não existe

      return []; // Retorna lista vazia caso o arquivo não exista

    throw error; // Mostra outro erro caso aconteça
  }
}


async function saveToFile() { // Função para salvar os dados no arquivo
  try {

    await Bun.write(jsonFilePath, JSON.stringify(list)); // Salva a lista no arquivo em formato JSON

  } catch (error: any) {

   throw new Error("Erro ao salvar os dados no arquivo: " + error.message); // Mostra erro personalizado
  }
}


async function addItem(item: string) { // Função para adicionar um item

  list.push(item); // Adiciona o item no final da lista

  await saveToFile(); // Salva a lista atualizada
}


async function getItems() { // Função para pegar todos os itens

  return list; // Retorna a lista completa
}


async function updateItem(index: number, newItem: string) { // Função para atualizar um item

  if (index < 0 || index >= list.length) // Verifica se o índice é válido

    throw new Error("Index fora dos limites"); // Mostra erro se o índice for inválido

  list[index] = newItem; // Atualiza o item da posição informada

  await saveToFile(); // Salva as alterações
}


async function removeItem(index: number) { // Função para remover um item

  if (index < 0 || index >= list.length) // Verifica se o índice é válido

    throw new Error("Index fora dos limites"); // Mostra erro se o índice for inválido

  list.splice(index, 1); // Remove 1 item da posição informada

  await saveToFile(); // Salva a lista atualizada
}


export default { addItem, getItems, updateItem, removeItem }; // Exporta as funções para usar em outros arquivos