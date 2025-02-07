import React, { useState, useRef } from 'react'
import './Uploa.css'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


function Uploa() {

    const [file, setFile] = useState(null)
    const [message, setMessage] = useState(null)


    const form = useRef()

    async function handleUpload(e) {
        e.preventDefault()

        if (!file) {
            return setMessage('O arquivo não foi selecionado')
        }

        /**O formData é um objeto javascript que cria uma instancia para podermos
         * anexar arquivos por meio do par chave e valor no metodo append. Com esse 
         * metodo podemos enviar arquivos para o backend de modo que, questões que envolvem
         * configurações, sejam feitas automaticamente. Será o arquivo "formData" que enviaremos
         * no corpo da requisição.
         */

        const formData = new FormData()
        formData.append('upload', file)

        // Aqui fazemos a conexão com o backend

        try {
            const res = await fetch('http://localhost:5000/users/me/avatar', {
                method: 'POST',
                headers: {
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2E2MzU4MzIwMTc5NDM3NmIzYjYyMjkiLCJpYXQiOjE3Mzg5NDU5MjMsImV4cCI6MTczOTU1MDcyM30.kEL6nO51w3ku2YQ3rBb3FZalW8FYw-LUcSrqP_hB_q4"
                },
                body: formData,

            })

            if (!res.ok) {
                throw new Error((await res.json()).message)
            }

            const data = await res.json()
            console.log(data)
            setMessage(data.message)
            form.current.reset()
            setFile(null)

        } catch (error) {
            console.log(error)
            setMessage(error.message)
        }

    }

    // Função para capturar o arquivo
    function handleFileChange(e) {
        setFile(e.target.files[0])
    }



    return (
        <div className="upload-form">
            <h1>Upload de Arquivo</h1>
            <form onSubmit={handleUpload} ref={form}>
                <div>
                    <label htmlFor="file">Escolha um arquivo:</label>
                    <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        accept="image/*" // Apenas imagens (opcional)
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )
}

export default Uploa