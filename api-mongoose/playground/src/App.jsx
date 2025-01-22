import { useState } from 'react'
import './App.css'

function App() {

  const pessoa = {
    nome: "Leandro",
    idade: 30,
    endereco: {
      rua: "Rua das Flores",
      numero: 123,
      cidade: "Cruzeiro",
      estado: "SP"
    },
    hobbies: ["cozinhar", "ler", "viajar"],
    ativo: true,
    cumprimentar: function () {
      return `Olá, meu nome é ${this.nome}!`;
    }
  };


  const steamGames = [
    {
      id: 1,
      nome: "Counter-Strike: Global Offensive",
      preco: 0, // Gratuito
      desenvolvedor: "Valve",
      genero: ["FPS", "Multiplayer", "Competitivo"],
      avaliacoes: {
        positiva: 95,
        negativa: 5
      },
      plataforma: ["Windows", "Mac", "Linux"],
      lancamento: "2012-08-21"
    },
    {
      id: 2,
      nome: "Dota 2",
      preco: 0, // Gratuito
      desenvolvedor: "Valve",
      genero: ["MOBA", "Estratégia", "Multiplayer"],
      avaliacoes: {
        positiva: 89,
        negativa: 11
      },
      plataforma: ["Windows", "Mac", "Linux"],
      lancamento: "2013-07-09"
    },
    {
      id: 3,
      nome: "The Witcher 3: Wild Hunt",
      preco: 99.99, // Valor fictício
      desenvolvedor: "CD Projekt Red",
      genero: ["RPG", "Mundo Aberto", "Aventura"],
      avaliacoes: {
        positiva: 97,
        negativa: 3
      },
      plataforma: ["Windows", "PlayStation", "Xbox"],
      lancamento: "2015-05-18"
    },
    {
      id: 4,
      nome: "Hollow Knight",
      preco: 39.99, // Valor fictício
      desenvolvedor: "Team Cherry",
      genero: ["Metroidvania", "Aventura", "Plataforma"],
      avaliacoes: {
        positiva: 98,
        negativa: 2
      },
      plataforma: ["Windows", "Mac", "Linux", "Nintendo Switch"],
      lancamento: "2017-02-24"
    },
    {
      id: 5,
      nome: "Cyberpunk 2077",
      preco: 249.99, // Valor fictício
      desenvolvedor: "CD Projekt Red",
      genero: ["RPG", "Mundo Aberto", "Futurista"],
      avaliacoes: {
        positiva: 85,
        negativa: 15
      },
      plataforma: ["Windows", "PlayStation", "Xbox"],
      lancamento: "2020-12-10"
    }
  ];

  const genero = new Set()



  steamGames.forEach((item, i) => {
    item.genero.filter(type => {
      genero.add(type)
    })
  })

  const alinhados = Array.from(genero).sort((a, b) => a.localeCompare(b))

  function getGamesPrice(type) {
    // let games
    return steamGames.forEach((game) => {
      game.genero.filter((item) =>  )
    })

  }

  const data = getGamesPrice('Aventura')

  console.log(data)


  // const prices = steamGames.reduce((acc, game) => {
  //   acc = [...acc, game.preco]
  //   return acc
  // }, [])

  // console.log(prices.sort((a, b) => b - a))



  // // Fazendo a conversão de dados

  // const notas = [8, 6, 10,]
  // const materias = { math: 0, biologia: 0, Fisica: 6, }

  // const novo = notas.reduce((acc, nota, i) => {
  //   acc = { ...acc, [`${Object.keys(materias)[i]}`]: nota }
  //   return acc
  // }, {})


  // console.log(Object.fromEntries([
  //   [0, "Leandro"],
  //   ["idade", 30],
  //   ["cidade", "Cruzeiro"],
  //   ["profissao", "Chef de cozinha"]
  // ]
  // ))


  return (
    <>

      <ul>
        {alinhados.map((item, i) => (
          <div key={i}>
            <h2>{item}</h2>
            <p>lorem</p>
          </div>
        ))}
      </ul>

    </>
  )
}

export default App
