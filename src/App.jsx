import { useEffect, useState } from 'react';
import axios from "axios";

/*
Consuma a API e liste todos os pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

function App() {

  const [list, setList] = useState([])

  const fetchListaData = () =>{
    axios.get('https://pokeapi.co/api/v2/pokemon')
    .then((response)=> {
    
      const newArray = [...response.data.results]
      newArray.sort((a, b)=> {
        return a.name.localeCompare(b.name)
      })
    
      setList(newArray)
    })
  }
  
  useEffect(()=>{
    fetchListaData()
  }, [])

  return (
    <>
      <h1>consumir api pokémon</h1>
      <hr />
      {list.map((item) =>(
        <Pokemon key ={item.name} data={item} />
      ))}
      </>
  );
}

const Pokemon = ({ data }) => {
  const [details, setDetails] = useState(null)

  const fetchPokemon = () =>{
    axios.get(data.url).then(response => setDetails(response.data))
  }

  useEffect(()=>{
    fetchPokemon()
  }, [])

  if(details === null){
    return <div>Loading...</div>
  }

  return (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <span><img src={details.sprites.front_default} style={{width: 50, marginRight: 30}}/> </span>
      <span><b>{details.name}</b> - EXP {details.base_experience}</span>
    </div>
  )
}

export default App;
