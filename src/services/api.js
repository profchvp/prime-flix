//Base da URL https://api.themoviedb.org/3/
//URL da API: https://api.themoviedb.org/3/movie/now_playing?api_key=52e3b68b365d21091ebf5b135682f968
import axios from 'axios';
//
const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});
export default api;