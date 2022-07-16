import {useEffect,useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'; //Acessar parâmetros passados na página
import './filme-info.css'; 
import api from '../../services/api';
import {toast} from 'react-toastify';
//
function Filme(){
    const {idFilme} = useParams();
    const [filme,setFilme]=useState({});
    const [loading,setLoading]=useState(true);
    const navigate = useNavigate();
    //
    useEffect(()=>{
        async function loadFilme(){
           await api.get(`/movie/${idFilme}`,{
               params:{
                api_key:'52e3b68b365d21091ebf5b135682f968',
                language:'pt-BR',
               }
           }) //Veja que get é uma "Promises", portanto ".then..."
           .then((response)=>{
              //console.log(response.data.title);
              setFilme(response.data);
              setLoading(false);
           })
           .catch(()=>{
            //console.log("Filme não encontrado");
            navigate('/',{replace:true});//Aqui: Faz voltar para ágina de filmes(Home)
           })
        }
        loadFilme();
        return()=>{
            console.log("Componente foi desmontado");
        }
      },[navigate,idFilme])
    //
    function salvarFilmes(){
        const minhaLista=localStorage.getItem('@primeFlix');
        let filmesSalvos = JSON.parse(minhaLista) || [];//se não exisitr, cria lista vazia

        const hasFilme = filmesSalvos.some((filmesSalvos)=>filmesSalvos.id===filme.id);

        if(hasFilme){
            toast.warn('Este Filme já consta em sua Lista');
            return;
        }else{
            filmesSalvos.push(filme);
            localStorage.setItem('@primeFlix',JSON.stringify(filmesSalvos));
            //alert("Filme Salvo na Lista");
            toast.success('Filme Salvo Com Sucesso');
        }
    }
    //
    if (loading){
       return(
        <div className='filme-info'>
            <h3>Filme Carregando...</h3>
        </div>
       )
    }
    return (
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`http://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}  />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} /10 </strong>
            <div className='area-button'>
                <button onClick={salvarFilmes}>Salvar</button>
                <button>
                    <a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>

        </div>

    )
}
export default Filme;