import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material'
import { Box } from '@mui/material'
import * as React from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import Produto from '../../../models/Produto';
import { busca } from '../../../services/Service';
import { TokenState } from '../../../store/tokens/tokensReduce';
import {toast} from 'react-toastify';
import './listaProduto.css'

function ListaProduto() {
  const [produtos, setProduto] = React.useState<Produto[]>([]);
  const token = useSelector<TokenState, TokenState["tokens"]>(
    (state) => state.tokens
  );
  let navigate = useNavigate();


  React.useEffect(() => {
    if(token === ''){
      toast.error("Você precisa estar logado", {
        position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover:false,
            draggable: false,
            theme: "colored",
            progress: undefined,
      });
      navigate('/login');
    }
  }, [token]);

  const getProdutos = async () => {
    //adicionar try catch
    await busca("/produtos", setProduto, {
    headers: {
      'Authorization':  token
    }
  });
}
  React.useEffect(() => {
    getProdutos();
  } , [produtos.length]);

  



  return (
    <>
    <Grid container spacing={3} className='container-produto'> 
    {
      produtos.map(produto => (
      <Box className='box-produto' m={2} > 
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2">
              {produto.nome}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {produto.descricao}
            </Typography>
          </CardContent>
          <CardActions>
            <Box className='box-produto-botoes' mb={1.5} >
              <Link to={`/cadastroprodutos/${produto.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="botao-tema botao-atualizar" size='small' color="primary" >
                    atualizar
                  </Button>
                </Box>
              </Link>
              <Link to={`/deletarprodutos/${produto.id}`} className="text-decorator-none">
                <Box mx={1}>
                  <Button variant="contained" className="botao-tema " size='small' color="secondary">
                    deletar
                  </Button>
                </Box>
              </Link>
            </Box>
          </CardActions>
        </Card>
      </Box>
      ))
      }
    </Grid> 
    </>
  )
}

export default ListaProduto