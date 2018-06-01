import { Entity } from "./Entity";
import { Estabelecimento } from './Estabelecimento';
import { Categoria } from './Categoria';

export class Produto extends Entity {
    id: number;
    nome: string;
    preco: number;
    acessos: number;
    descricao: string;
    caminhoImage: string;
    dataCadastro: string;
    estabelecimento: Estabelecimento;
    estabelecimentoId: number;
    categoria: Categoria;
    categoriaId: number;
}