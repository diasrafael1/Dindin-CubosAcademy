import { useEffect, useState } from 'react';
import BtnIcon from '../../assets/btn_icon.svg'
import BtnIconSelected from '../../assets/btn_iconSelected.svg'
import './styles.css';

export default function BotaoCategoria({categoria,categoriasFilter, setCategoriasFilter, limparFiltro}){
    const [colorBtnSelecionado, setColorBtnSelecionado] = useState(false)

    function botaoSelecionado(){
        setColorBtnSelecionado(!colorBtnSelecionado)
        if(!colorBtnSelecionado){
            setCategoriasFilter([...categoriasFilter, categoria.descricao.toLowerCase()])
        }else{
            const removerCategoria = categoriasFilter.filter((nomeCategoria)=>{
                return nomeCategoria !== categoria.descricao.toLowerCase()
            })
            setCategoriasFilter(removerCategoria)
        }

    }

    useEffect(()=>{
        setColorBtnSelecionado(false)
    },[limparFiltro])

    return(
        <>
            <button 
            onClick={()=>botaoSelecionado()} 
            className={colorBtnSelecionado ? 'btn__filtro-selecionado':'btn__filtro'}>
                {categoria.descricao} <img src={colorBtnSelecionado ? BtnIconSelected:BtnIcon} alt='icon'/>
            </button>
        </>       
    )
}