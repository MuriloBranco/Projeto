import axios from "axios";
import { Developer, Level } from "../types/types";

const api = axios.create({
    baseURL: "http://localhost:5005/api",
});


export const getDevelopers = (page: number, pageSize: number, query: string) => {
    return api.get("/desenvolvedores", {
        params: {
            page,
            pageSize,
            query,
        },
    
    });
}

export const getDeveloperById = (id: number) => {
    return api.get(`/desenvolvedores/${id}`);
}

export const createDeveloper = (developer: Omit<Developer, 'id'>) => {
    return api.post("/desenvolvedores", developer);
}

export const updateDeveloper = (id: number, developer: Partial<Omit<Developer, 'id'>>) => {
    return api.put(`/desenvolvedores/${id}`, developer);
}

export const deleteDeveloper = (id: number) => {
    return api.delete(`/desenvolvedores/${id}`);
}


export const getLevels = (page: number, pageSize: number, query: string) => {
    return api.get("/niveis", {
        params: {
            page,
            pageSize,
            query,
        },
    });
}

export const getLevelById = (id: number) => {
    return api.get(`/niveis/${id}`);
}

export const createLevel = (level: Omit<Level, 'id'>) => {
    return api.post("/niveis", level);
}

export const updateLevel = (id: number, level: Partial<Omit<Level, 'id'>>) => {
    return api.put(`/niveis/${id}`, level);
}

export const deleteLevel = (id: number) => {
    return api.delete(`/niveis/${id}`);
}

export default api;