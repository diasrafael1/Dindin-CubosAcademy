import { useState } from 'react';
import EditarIcon from '../../assets/editar_icon.svg'
import DeletarIcon from '../../assets/deletar_icon.svg'
import {format, parseISO} from 'date-fns'
import ModalDeletar from '../ModalDeletar';
import './styles.css';
import ModalEditRegistro from '../ModalEditarRegistro';

export default function Registro({atualizarEffect, setAtualizarEffect,registro,categorias}){
    const [mostrarModalDelete, setMotrarModalDelete] = useState(false)
    const [mostrarModalEdit, setMostrarModalEdit] = useState(false)
    const semana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];

    return(
        <div key={registro.id} className='registro'>
            <div className='container-registroDiv'>
                <span>{format(parseISO(registro.data), "dd/MM/yy")}</span>
            </div>
            <div className='container-registroDiv'>
                <span>{semana[parseISO(registro.data).getDay()]}</span>
            </div>
            <div className='container-registroDiv'>
                <span>{registro.descricao}</span>
            </div>
            <div className='container-registroDiv'>
                <span>{registro.categoria_nome}</span>
            </div>
            <div className='container-registroDiv'>
                <h4 className={registro.tipo === 'entrada' ? 'entrada__valor': 'saida__valor'} >R$ {(registro.valor/100).toFixed(2).toString().replace('.',',')}</h4>
            </div>
            <div className='container-registroIcon'>
                <img src={EditarIcon} onClick={()=>{setMostrarModalEdit(true)}} alt='Editar registro'/>
                <img src={DeletarIcon} className='deletar-icon' onClick={()=>{setMotrarModalDelete(true)}} alt='Deletar registro' />
                {mostrarModalDelete && 
                    <ModalDeletar
                        atualizarEffect={atualizarEffect}
                        setAtualizarEffect={setAtualizarEffect}
                        id={registro.id}
                        setMotrarModalDelete={setMotrarModalDelete}
                    />
                }
                {mostrarModalEdit &&
                    <ModalEditRegistro 
                        atualizarEffect={atualizarEffect}
                        setAtualizarEffect={setAtualizarEffect}
                        registro={registro}
                        setMostrarModalEdit={setMostrarModalEdit}
                        categorias={categorias}
                    />
                }
            </div>
                          
        </div>
        
    )
}