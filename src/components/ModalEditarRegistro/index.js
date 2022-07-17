import { useState } from 'react';
import {format, parseISO} from 'date-fns'
import InputMask from 'react-input-mask'
import SelectIcon from '../../assets/select_icon.svg'
import CloseIcon from '../../assets/closeicon.svg'
import { atualizarRegistro } from '../../services/api';
import './styles.css';

export default function ModalEditRegistro({atualizarEffect, setAtualizarEffect,registro, setMostrarModalEdit,categorias}){
    const data = format(parseISO(registro.data), "dd/MM/yyyy")
    const [form, setForm] = useState({...registro, data})
    const [tipo, setTipo] = useState(registro.tipo)
    const [alerta, setAlerta] = useState({mensagem: '', aparecer: false})  

    function onChange(e) {
        let value = e.target.value;
        const key = e.target.name;  
        setForm({...form,[key]: value})
    }

    async function handleSubmit(e){
        e.preventDefault()
        const ano = form.data.slice(6)
        const mes = form.data.slice(3, 5)
        const dia = form.data.slice(0,2)
        let valorFormatado = form.valor
        if(form.valor.toString().includes(".")){
            valorFormatado = form.valor.replace('.','')
        }
        
        const body = {
            "descricao": form.descricao,
            "valor": Number(valorFormatado),
            "data":new Date(Number(ano), (Number(mes)-1), Number(dia)),
            "categoria_id": Number(form.categoria_id),
            tipo
        }
        const token = localStorage.getItem('token')
        const response = await atualizarRegistro(form.id,body,token)

        if (!response.error) {
            setMostrarModalEdit(false)
            setAtualizarEffect(!atualizarEffect)
        } else {
            setAlerta({
                mensagem: response.message,
                aparecer: true
            });
            setTimeout(() => setAlerta({ mensagem: '', aparecer: false }), 2000)
        }
    }

    return(
        <div className='modal-body'>
            <div className='modal-registro'>
                <div className='container-modal'>
                    <h1 className='modal__titulo'>Editar Registro</h1>
                    <img src={CloseIcon} onClick={()=>setMostrarModalEdit(false)} alt='Fechar Modal' />
                </div>

                <button className={tipo === 'entrada' ? 'btn-entrada' : 'btn-desmarcado'} onClick={()=>setTipo('entrada')}>Entrada</button>
                <button className={tipo === 'saida' ? 'btn-saida' : 'btn-desmarcado'} onClick={()=>setTipo('saida')}>Saída</button>

                <form onSubmit={handleSubmit}>
                    <div className='container-form'>
                        <label for='valor' className='form__label'>Valor</label>
                        <input id='valor' className='form__input' type='number' name='valor' value={form.valor} onChange={onChange}/>
                    </div>

                    <div className='container-form'>
                        <label className='form__label'>Categoria</label>
                        <select name='categoria_id' onChange={onChange} className='form__select'>
                            <option value=""></option>

                            {categorias.map((categoria)=>{
                            return(
                                <option key={categoria.id} selected={categoria.descricao === registro.categoria_nome && true}  value={categoria.id}>{categoria.descricao}</option>
                            )
                        })}
                        </select>
                        <img src={SelectIcon} className='select__icon' alt='Selecione'/>
                    </div>

                    <div className='container-form'>
                        <label for='data' className='form__label'>Data</label>
                        <InputMask mask="99/99/9999" maskPlaceholder={null} id='data' className='form__input'name='data' value={form.data} onChange={onChange} />
                    </div>

                    <div className='container-form'>
                        <label for='descricao' className='form__label'>Descrição</label>
                        <input id='descricao' className='form__input' type='text' name='descricao' value={form.descricao} onChange={onChange} />
                    </div> 
                    {alerta.aparecer && <span className='form__alerta'>{alerta.mensagem}</span>}
                    
                    <button className='btn-formRegistro'>Confirmar</button>  
                </form>
            </div>
        </div>
        
    )
}