import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/api';
import './styles.css';

export default function FormSignIn(){
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email:'',
        senha:''
    })
    const [alerta, setAlerta] = useState({mensagem: '', aparecer: false})

    function onChange(e) {
        const value = e.target.value;
        const key = e.target.name;

        setForm({...form, [key]: value})
    }  

    async function handleSubmit(e){
        e.preventDefault()

        const response = await login(form);

        if (!response.error) {
            localStorage.setItem('token', response.message.token)
            localStorage.setItem('userId', response.message.usuario.id)
            navigate('/main');
        } else {
            setAlerta({
                mensagem: response.message,
                aparecer: true
            });
            setTimeout(() => setAlerta({ mensagem: '', aparecer: false }), 1000)
        }
    }

    return(
        <form onSubmit={handleSubmit} className='card__formSignin'>
            <h2 className='form__titulo'>Login</h2>
            <div className='container-form'>
                <label for='email' className='form__label'>E-mail</label>
                <input id='email' className='form__input' type='email' name='email' value={form.email} onChange={onChange} />
            </div>

            <div className='container-form'>
                <label for='senha' className='form__label'>Password</label>
                <input id='senha' className='form__input' type='password' name='senha' value={form.senha} onChange={onChange} />
            </div>
            {alerta.aparecer && <span className='form__alerta'>{alerta.mensagem}</span>}

            <button className='form-signin__button' type='submit'>Entrar</button>
        </form>
    )
}