import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import './Home.css';
import Carrosel from "../../components/carrosel/Carousel";
import CardProduto from "../../components/cardproduto/CardProduto";
import { busca } from "../../services/Service";
import Produto from "../../models/Produto";
import { useSelector } from "react-redux";
import { TokenState } from "../../store/tokens/tokensReduce";
import { Link } from "react-router-dom";


function Home() {

  const [produtos, setProduto] = useState<Produto[]>([]);
  const token = "Basic ZmVsaXBlMkBlbWFpbC5jb206MTIzNDU2Nzg5";
  // const token = useSelector<TokenState, TokenState["tokens"]>(
  //   (state) => state.tokens
  // );

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
    
      <Grid container spacing={3} columns={12} className="home-container">
        <Grid item xs={12} className='marginCarrossel'>
          <Carrosel/>
        </Grid>
        <Grid item xs={12} className="title-container">
          <hr className="linhaHome" /> 
          <Typography variant="h5" component="h1" className="title-produtos tituloInicialHome" >
                Destaques
          </Typography>
          <hr className="linhaHome" />
        </Grid>
        {produtos.map(produto => (
        <Grid item xs={3} key={produto.id}>
            <CardProduto 
            nome={produto.nome} 
            descricao={produto.descricao} 
            preco={produto.preco}
            imagem={produto.foto}
            id={produto.id}
            /> 
        </Grid>
        ))}
        <div className="quemSomos">
          <div className="quemSomosTopo">
            <h1 className="titleQuemSomosHome">Sobre nós</h1>
            <h4 className="subTitleQuemSomosHome">Vem dar uma olhada na nossa equipe</h4>
            
            <button className="saibaMais"><Link to="/sobrenos" className="text-decorator-none cursor linkSaiba" >Saiba Mais</Link></button>
            
          </div>
          <div className="talvezVoceGoste">
          <hr className="linha" />
          <div className="tituloInicialHome2">Ongs Parceiras</div>
          <hr className="linha" />
        </div>
          <div className="quemSomosBottom">
            <div className="quemSomosCard">
              <img src="https://imgur.com/2gsGcyY.png" alt="" />
              <div className="cardBottomQuemSomos">
                <button className="saibaMaisBottom">Saiba Mais</button>
              </div>
            </div>
            <div className="quemSomosCard">
              <img src="https://imgur.com/dO598Ss.png" alt="" />
              <div className="cardBottomQuemSomos">
                <button className="saibaMaisBottom">Saiba Mais</button>
              </div>
            </div>
            <div className="quemSomosCard">
              <img src="https://imgur.com/p3Iqz5r.png" alt="" />
              <div className="cardBottomQuemSomos">
                <button className="saibaMaisBottom">Saiba Mais</button>
              </div>
            </div>
          </div>
        </div>
        <div className="talvezVoceGoste talvezVoceGosteHome">
          <hr className="linha" />
          <div className="tituloInicialHome3">Recomendados</div>
          <hr className="linha" />
        </div>
        <div className="produtosRecomendados produtosRecomendadosHome">
            <CardProduto imagem={"https://imgur.com/Q7RrLv0.png"} nome={"Almofada Nuvem"} descricao={"Almofada para quarto de bebê"} preco={20} />
            <CardProduto imagem={"https://imgur.com/9Wj9UCb.png"} nome={"Manta de Tricô"} descricao={"Manta fofinha de tricô para o inverno"} preco={49} />
            <CardProduto imagem={"https://imgur.com/VhuuSkK.png"} nome={"Quadro Passarinho Bordado"} descricao={"Feito à mão, este quadro foi bordado em uma folha seca"} preco={35} />
            <CardProduto imagem={"https://imgur.com/4oVxOiC.png"} nome={"Quadro Brasil"} descricao={"Quadro com moldura de madeira"} preco={15} />
        </div>
      </Grid>
      
    </>
  );
}

export default Home;
