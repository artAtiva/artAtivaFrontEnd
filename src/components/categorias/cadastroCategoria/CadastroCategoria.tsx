import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@material-ui/core"
import {useNavigate, useParams } from 'react-router-dom'
import './CadastroTema.css';
import useLocalStorage from 'react-use-localstorage';
import Tema from '../../../models/Categoria';
import { buscaId, post, put } from '../../../services/Service';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';


function CadastroCategoria() {
    let navigate = useNavigate();
    const { id } = useParams<{id: string}>();
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
    const [tema, setCategoria] = useState<Categoria>({
            id: 0,
            nome: '',
            descricao: ''
    })

    useEffect(() => {
        if (token == "") {
            alert("Você precisa estar logado")
            navigate("/login")
    
        }
    }, [token])

    useEffect(() =>{
        if(id !== undefined){
            findById(id)
        }
    }, [id])

    async function findById(id: string) {
        buscaId(`/categorias/${id}`, setCategoria, {
            headers: {
              'Authorization': token
            }
          })
        }

        function updatedCategoria(e: ChangeEvent<HTMLInputElement>) {

            setCategoria({
                ...categoria,
                [e.target.name]: e.target.value,
            })
    
        }
        
        async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
            e.preventDefault()
            console.log("categoria" + JSON.stringify(categoria))
    
            if (id !== undefined) {
                console.log(categoria)
                put(`/categorias`, tema, setCategoria, {
                    headers: {
                        'Authorization': token
                    }
                })
                alert('Categoria atualizado com sucesso');
            } else {
                post(`/categorias`, categoria, setCategoria, {
                    headers: {
                        'Authorization': token
                    }
                })
                alert('Categoria cadastrado com sucesso');
            }
            back()
    
        }

    
        function back() {
            navigate('/categorias')
        }
  
    return (
        <Container maxWidth="sm" className="topo">
            <form onSubmit={onSubmit}>
                <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)} id="descricao" label="nome" variant="outlined" name="descricao" margin="normal" fullWidth />
                <TextField value={tema.nome} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedCategoria(e)} id="nome" label="descrição" variant="outlined" name="nome" margin="normal" fullWidth />
                
                <Button type="submit" variant="contained" color="primary">
                    Finalizar
                </Button>
            </form>
        </Container>
    )
}

export default CadastroTema;