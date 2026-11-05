import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "@/config/api";

export type ItemSacola = {
  id_produto: number;
  nome_produto: string;
  descricao_produto: string;
  foto_produto: string | null;
  valor_produto: number;
  quantidade: number;
};

async function chaveSacola(): Promise<string> {
  const token = await AsyncStorage.getItem("token");
  if (!token) {
    throw new Error("Sessão não encontrada. Faça login novamente.");
  }

  const resposta = await fetch(`${API}/cliente`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resposta.ok) {
    throw new Error(
      "Não foi possível identificar o cliente. Faça login novamente.",
    );
  }

  const json = await resposta.json();
  const idCliente = Number(json.data?.id_cliente);
  if (!Number.isInteger(idCliente) || idCliente <= 0) {
    throw new Error("A API não retornou um identificador válido do cliente.");
  }

  return `sacola_cliente_${idCliente}`;
}

export async function carregarSacola(): Promise<ItemSacola[]> {
  const dados = await AsyncStorage.getItem(await chaveSacola());
  return dados ? (JSON.parse(dados) as ItemSacola[]) : [];
}

async function salvarSacola(itens: ItemSacola[]): Promise<void> {
  await AsyncStorage.setItem(await chaveSacola(), JSON.stringify(itens));
}

export async function adicionarNaSacola(
  produto: any,
  quantidade: number,
): Promise<void> {
  const id = Number(produto.id_produto);
  const valor = Number(produto.valor_produto);
  if (
    !Number.isInteger(id) ||
    id <= 0 ||
    !Number.isInteger(quantidade) ||
    quantidade < 1 ||
    quantidade > 99 ||
    !Number.isFinite(valor) ||
    valor < 0
  ) {
    throw new Error("Produto ou quantidade inválidos.");
  }

  const itens = await carregarSacola();
  const existente = itens.find((item) => item.id_produto === id);
  if (existente) {
    if (existente.quantidade + quantidade > 99) {
      throw new Error("O limite é de 99 unidades por produto.");
    }
    existente.quantidade += quantidade;
  } else {
    itens.push({
      id_produto: id,
      nome_produto: String(produto.nome_produto ?? ""),
      descricao_produto: String(produto.descricao_produto ?? ""),
      foto_produto: produto.foto_produto ?? null,
      valor_produto: valor,
      quantidade,
    });
  }
  await salvarSacola(itens);
}

export async function alterarQuantidadeSacola(
  idProduto: number,
  quantidade: number,
): Promise<void> {
  if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > 99) {
    throw new Error("A quantidade deve estar entre 1 e 99.");
  }
  const itens = await carregarSacola();
  await salvarSacola(
    itens.map((item) =>
      item.id_produto === idProduto ? { ...item, quantidade } : item,
    ),
  );
}

export async function removerDaSacola(idProduto: number): Promise<void> {
  const itens = await carregarSacola();
  await salvarSacola(itens.filter((item) => item.id_produto !== idProduto));
}

export async function limparSacola(): Promise<void> {
  await AsyncStorage.removeItem(await chaveSacola());
}
