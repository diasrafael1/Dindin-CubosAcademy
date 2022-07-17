import {useEffect, useState} from 'react'
import CloseIcon from '../../assets/closeicon.svg'
import { atualizarUsuario } from '../../services/api';
import './styles.css';

export default function ModalEditarPerfil({usuario, setUsuario, setMostrarModalPerfil, token}){
    const [form, setForm] = useState({
        nome: '',
        email: '',
        senha:'',
        confirmarSenha:''
      })

    function onChange(e) {
        const value = e.target.value;
        const key = e.target.name;

        setForm({...form,[key]: value})
    }
    const [alerta, setAlerta] = useState({mensagem: '', aparecer: false})

    async function handleSubmit(e){
        e.preventDefault()
        
        const response = await atualizarUsuario({
            nome: form.nome,
            email: form.email,
            senha: form.senha
        }, token)
        
        if (!response.error) {
            setUsuario({form})
            setMostrarModalPerfil(false)
        } else {
            setAlerta({
                mensagem: response.message,
                aparecer: true
            });
            setTimeout(() => setAlerta({ mensagem: '', aparecer: false }), 1000)
        }
    }

    useEffect(()=>{
        setForm({...form, ...usuario})
    },[])

    return(
        <div className='modal-body'>
            <div className='modal-editarPerfil'>
                <div className='container-modal'>
                    <h1 className='modal__titulo'>Editar Perfil</h1>
                    <img src={CloseIcon} onClick={()=>setMostrarModalPerfil(false)} alt='Fechar Modal' />
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className='container-form'>
                        <label for='nome' className='form__label'>Nome</label>
                        <input id='nome' className='form__input' type='text' name='nome' value={form.nome} onChange={onChange} />
                    </div>

                    <div className='container-form'>
                        <label for='email' className='form__label'>E-mail</label>
                        <input id='email' className='form__input' type='email' name='email' value={form.email} onChange={onChange} />
                    </div>

                    <div className='container-form'>
                        <label for='senha' className='form__label'>Senha</label>
                        <input id='senha' className='form__input' type='password' name='senha' value={form.senha} onChange={onChange} />
                    </div>

                    <div className='container-form'>
                        <label for='confirmarSenha' className='form__label'>Confirmação de senha</label>
                        <input id='confirmarSenha' className='form__input' type='password' name='confirmarSenha' value={form.confirmarSenha} onChange={onChange} />
                    </div>    
                    <span className='form__alerta'>{alerta.mensagem}</span>
                    <button className='form__button' type='submit'>Confirmar</button>
                </form>
            </div>
        </div>
    )
}