import React from 'react'

function Test() {


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


    /**Aqui usamos o Set para buscar os tipos de generos
     * que os jogos possui
     */
    steamGames.forEach((item, i) => {
        item.genero.filter(type => {
            genero.add(type)
        })
    })

    /** Aqui ordemos os dados obtidos em ordem alfabetica usando o metodo
     * de array sort juntamente com o metodo localCompare
     */
    const alinhados = Array.from(genero).sort((a, b) => a.localeCompare(b))


    /**Nessa função busco game com base no genero e 
     * retorno os games encontrados com os precos ordenados
     * do mais barato para o mais caro
     */

    function getGames(genreSearched) {

        let gamesFound = []

        steamGames.forEach((game) => {
            const gameGenre = game.genero

            gameGenre.filter((genre) => {
                if (genre === genreSearched) {
                    gamesFound.push(game)
                }
            })
        })

        return gamesFound

    }

    const data = getGames('Aventura').sort((a, b) => a.preco - b.preco)

    function getLeapYear(year) {
        if (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)) {
            console.log('É Bissexto')
        } else {
            console.log('Não é bissexto')
        }
    }

    // getLeapYear(2024)


    /* Classes são moldes que usamos para podermos criar objetos e metodos de classe
    são funções que manipulam as informações dos objetos */


    class Pessoa {
        constructor(nome, sobrenome) {
            // console.log(this)
            this._nome = nome // usamos _name para diferencias propriedades internas
            this.sobrenome = sobrenome
        }

        get nome() {
            return this.sobrenome
        }

        /** Igor repare que aqui usamos o this para podermos manipular os dados dentro da classe. Como 
         * vc pode reparar no nome colocado em letra maiscula.Ou seja, internalize que métodos de classe são
         * utilizados para manipulações dos dados da classe/Objeto instanciados
         */
        // getFullName() {
        //     console.log((this.nome.charAt(0).toUpperCase() + this.nome.slice(1)) + ' ' + this.sobrenome)
        // }
    }

    const fullName = new Pessoa('igor', 'Fonseca')

    console.log(fullName.nome)

    // const pessoa1 = new Pessoa('igor', 'Fonseca')
    // const pessoa2 = new Pessoa('edu', 'Fonseca')

    // console.log(pessoa1)

    // pessoa1.getFullName()


    // console.log(data)


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
        <ul>
            {alinhados.map((item, i) => (
                <div key={i}>
                    <h2>{item}</h2>
                    <p>lorem</p>
                </div>
            ))}
        </ul>
    )
}

export default Test