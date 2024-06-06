export interface Developer {
    id: number;
    nivel_id: number;
    nome: string;
    sexo: string;
    data_nascimento: string;
    idade: number;
    hobby: string;
    level: Level;
}

export interface Level {
    id: number;
    nivel: string;
}