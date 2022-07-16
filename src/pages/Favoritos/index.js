//
import './favoritos.css';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {toast} from 'react-toastify';

function Favoritos(){
   const [filmes,setFilmes]=useState([]);
   
   useEffect(()=>{
       const minhaLista = localStorage.getItem('@primeFlix');
       setFilmes(JSON.parse(minhaLista)||[]);//Conver de String para Lista; se não tiver nada: [] Array vazio

   },[])
   //
   function excluirFilme(idRecebido){
      //alert("Excluir Filme"+idRecebido);
      /* 1 -filtar todos os filmes que estão dentto da UseState (filmes) 
         2 -Retirar o cod clicado
      */
     let filtroFilmes = filmes.filter((item)=>{
      return (item.id!==idRecebido)

     })
     setFilmes(filtroFilmes)
     localStorage.setItem('@primeFlix',JSON.stringify(filtroFilmes))//Salva novo array no LocalStorage
     toast.success('Filme Removido Com Sucesso!!!');
   }
   //
   return (
    <div className='meus-filmes'>
      <h1>Meus Filmes</h1>
      {filmes.length===0 && <span>Você não possui nenhum filme :(</span>}
        <ul>
         {filmes.map((itemFilme)=>{
            return (
               <li key={itemFilme.id}>
                  <span>{itemFilme.title}</span>
                  <div>
                     <Link to={`/filme/${itemFilme.id}`}>Ver Detalhes</Link>
                     <button onClick={()=>excluirFilme(itemFilme.id)}>Excluir</button>
                  </div>
               </li>
            )
         })}
        </ul>
    </div>
   )
}
export default Favoritos;