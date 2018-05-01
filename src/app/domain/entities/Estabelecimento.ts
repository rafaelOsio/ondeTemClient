import { Entity } from './Entity';
import { Produto } from './Produto';

export class Estabelecimento extends Entity {
    email: string;
    password: string;
    passwordRepeat: string;
    isAdmin: boolean;
    isComplete: boolean;
    nome: string;
    rua: string;
    bairro: string;
    numero: string;
    complemento: string;
    latitude: number;
    longitude: number;
    telefonePrincipal: string;
    telefoneSecundario: string;
    desativado: boolean;
    mensagemParaClientes: string;
    produtos: Produto[] = [];
    imageHash?: string;

    rememberEmail: boolean;
}