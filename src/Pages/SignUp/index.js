import Logo from '../../assets/Logo.svg'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { cadastro } from '../../services/api';
import './styles.css';

function App() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nome: '',
    email:'',
    senha:'',
    confirmarSenha:'',
  })
  const [alerta, setAlerta] = useState({mensagem: '', aparecer: false})


  function onChange(e) {
    const value = e.target.value;
    const key = e.target.name;

    setForm({...form, [key]: value})
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(!form.nome || !form.email || !form.senha || !form.confirmarSenha ){
      setAlerta({mensagem: 'Você deve preencher todos os campos!', aparecer: true})
      setTimeout(()=> setAlerta({mensagem: '', aparecer: false}),5000)
      return
    }

    if(form.senha !== form.confirmarSenha){
      setAlerta({mensagem: 'Senhas não coincidem!', aparecer: true})
      setTimeout(()=> setAlerta({mensagem: '', aparecer: false}), 5000)
      return
    }

    const response = await cadastro({nome : form.nome, email: form.email, senha: form.senha});
    if (!response.error) {
      navigate('/');
    } else {
      setAlerta({
          mensagem: response.message,
          aparecer: true
      });
      setTimeout(() => setAlerta({ mensagem: '', aparecer: false }), 5000)
    }
  }


  return (
    <div className="container-signup">
      <img className='logo-signup' src={Logo} alt='Logo Dindin' />
      <form onSubmit={handleSubmit} className='card__formSignup'>
        <h2 className='form__titulo'>Cadastre-se</h2>

        <div className='container-form'>
          <label for='nome' className='form__label'>Nome</label>
          <input id='nome' className='form__input' type='text' name='nome' value={form.nome} onChange={onChange}/>
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

        {alerta.aparecer && <span className='form__alerta'>{alerta.mensagem}</span>}

        <button className='form-signup__button' type='submit'>Cadastrar</button>

        <p className='link-signin' onClick={()=>navigate('/')}>Já tem cadastro? Clique aqui!</p>
      </form>
    </div>
  );
}

export default App;
