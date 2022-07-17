import { useEffect, useState } from 'react';
import FiltroIcon from '../../assets/filtro_icon.svg'
import DataIcon from '../../assets/data_icon.svg'
import ModalRegistro from '../ModalRegistro';
import Registro from '../Registro';
import { aplicarFiltro, extratoRegistros, listarCategorias, listarRegistros } from '../../services/api';
import './styles.css';
import BotaoCategoria from '../BotoesCategoria';

export default function Tabela(){
    const [mostrarFiltro, setMostrarFiltro] = useState(false)
    const [categorias, setCategorias] = useState([{}])
    const [categoriasFilter, setCategoriasFilter]= useState([])
    const [registros, setRegistros] = useState(false)
    const [extrato, setExtrato] = useState({})
    const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false)
    const [atualizarEffect, setAtualizarEffect] = useState(false)
    const [ordenarData, setOrdenarData] = useState(false)
    const [registrosAux, setRegistrosAux] = useState(false)
    const [iconeOrdenarDec, setIconeOrdenarDec] = useState(false)
    const [ordem, setOrdem] = useState(false)
    const [limparFiltro, setLimparFiltro] = useState(false)

    async function handlePegarCategorias(token){
        const response = await listarCategorias(token)
        setCategorias(response.message)
    }
    async function handlePegarRegistros(token){
        const response = await listarRegistros(token)
        setRegistros(response.message)
        setRegistrosAux(response.message)
    }

    async function handleExtrato(token){
        const response = await extratoRegistros(token)
        setExtrato(response.message)
    }

    function handleOrdenarData(){
        setOrdenarData(true)
        if(ordem === "cres"){
            const registrosOrdenados = registrosAux.sort((a,b)=>{
                return +(new Date(b.data)) - +(new Date(a.data))
            })
            setRegistrosAux(registrosOrdenados)
            setIconeOrdenarDec(!iconeOrdenarDec)
            setOrdem("dec")
        }else{
            const registrosOrdenados = registrosAux.sort((a,b)=>{
                return +(new Date(a.data)) - +(new Date(b.data))
            })
            setRegistrosAux(registrosOrdenados)
            setIconeOrdenarDec(true)
            setOrdem("cres")
        }
    }

    async function handleAplicarFiltro(){
        if(categoriasFilter.length >= 1){
            const token = localStorage.getItem('token')
            const response = await aplicarFiltro(categoriasFilter, token)
            setRegistrosAux(response.message)
            setCategoriasFilter([])
        }else{
            setRegistrosAux(registros)
        }
    }

    function handleLimparFiltro(){
        setRegistrosAux(registros)
        setLimparFiltro(!limparFiltro)
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        handlePegarRegistros(token)
        handleExtrato(token)
    },[atualizarEffect])

    useEffect(()=>{
        const token = localStorage.getItem('token')
        handlePegarCategorias(token)
    },[])
    return(
        <div className='container-tabela'>
            <button onClick={()=>setMostrarFiltro(!mostrarFiltro)} className='filtro'>
                <img src={FiltroIcon} alt='Filtro' /> Filtrar
            </button>
            {mostrarFiltro && 
                <div className='container-filtro'>
                    <h3 className='filtro__titulo'>Categoria</h3>

                    <div className='filtros'>
                        {categorias.map((categoria)=>{
                            return(
                                <BotaoCategoria
                                    categoria={categoria}
                                    categoriasFilter={categoriasFilter}
                                    setCategoriasFilter={setCategoriasFilter}
                                    limparFiltro={limparFiltro}
                                />
                            )
                        })}
                    </div>

                    <div className='container-btns'>
                        <button onClick={()=>handleLimparFiltro()} className='btn__limparFiltro'>Limpar Filtros</button>

                        <button onClick={()=>handleAplicarFiltro()} className='btn__aplicarFiltro'>Aplicar Filtros</button>
                    </div>
                </div>
            }

            <div className='container-listaRegistros'>
                <div className='header__listaRegistros'>
                    <div className='container-registroDiv'>
                        <h3 onClick={()=>handleOrdenarData()}>
                            Data {ordenarData&&<img className={iconeOrdenarDec && 'icone-dataDec'} src={DataIcon} alt="Ordenar data" />}
                        </h3>
                    </div>
                    <div className='container-registroDiv'><h3>Dia da semana</h3></div>
                    <div className='container-registroDiv'><h3>Descrição</h3></div>
                    <div className='container-registroDiv'><h3>Categoria</h3></div>
                    <div className='container-registroDiv'><h3>Valor</h3></div>
                    <div className='container-registroIcon'></div>
                </div>

                <div className='listaRegistros'>
                    {registrosAux && registrosAux.map((registro)=>{
                        return(
                            <Registro
                            atualizarEffect={atualizarEffect}
                            setAtualizarEffect={setAtualizarEffect}
                            registro={registro}
                            categorias={categorias}                            
                            />
                        )
                    })}
                </div>
            </div>

            <div className='container-registro'>
                <div className='card-registros'>
                    <h1 className='registros__titulo'>Resumo</h1>

                    <div className='container-entrada'>
                        <h2 className='entrada__titulo'>Entradas</h2>
                        <h2 className='entrada__valor'>R$ {(extrato.entrada/100).toFixed(2).toString().replace('.',',')}</h2>
                    </div>
                    <div className='container-saida'>
                        <h2 className='saida__titulo'>Saídas</h2>
                        <h2 className='saida__valor'>R$ {(extrato.saida/100).toFixed(2).toString().replace('.',',')}</h2>
                    </div>

                    <div className='container-saldo'>
                        <h2 className='saldo__titulo'>Saldo</h2>
                        <h2 className='saldo__valor'>R$ {((extrato.entrada - extrato.saida)/100).toFixed(2).toString().replace('.',',')}</h2>
                    </div>
                </div>
                    <button className='btn-registro' onClick={()=>setMostrarModalRegistro(true)}>Adicionar Registro</button>
            </div>
            {mostrarModalRegistro && <ModalRegistro 
                atualizarEffect={atualizarEffect}
                setAtualizarEffect={setAtualizarEffect}
                setMostrarModalRegistro={setMostrarModalRegistro} 
                categorias={categorias}
                />
            }
        </div>
        
    )
}