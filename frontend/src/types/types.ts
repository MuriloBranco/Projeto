export interface Developer {
    id: number;
    nivel_id: string;
    nome: string;
    sexo: string;
    data_nascimento: string;
    idade: number;
    hobby: string;
}

export interface Level {
    id: number;
    nivel: string;
}