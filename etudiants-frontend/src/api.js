import axios from 'axios';

const API_URL = 'http://localhost:8080';

const axiosPlain = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'text/plain',
    },
});

const axiosJson = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
});


export const getEtudiants = () => axiosJson.get('/etudiants');
export const getEtudiant = (id) => axiosJson.get(`/etudiants/${id}`);
export const addEtudiant = (nom) => axiosPlain.post('/etudiants', nom);
export const getNotes = (idEtudiant) => axiosJson.get(`/etudiants/${idEtudiant}/notes`);
export const addNote = (idEtudiant, note) => axiosJson.post(`etudiants/${idEtudiant}/notes`, note);
