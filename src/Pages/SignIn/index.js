import Logo from '../../assets/Logo.svg'
import FormSignIn from '../../components/FormSignIn';
import { useNavigate } from 'react-router-dom'
import {useEffect} from 'react'
import './styles.css';

function App() {
  const navigate = useNavigate()

  
  useEffect(()=>{
    const token = localStorage.getItem('token')

    if(token) navigate('/main')
  })
  
  return (
    <div className="container-signin">
      <img src={Logo} alt='Logo Dindin' />
      <div className='conteudo'>
        <div className='card'>
           <h1 className='card__titulo'>Controle suas <h1 className='card__titulo titulo--roxo'>finanças</h1>, sem planilha chata.</h1>
           <p className='card__texto'>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>
           <button onClick={()=> navigate('/sign-up')} className='card__btnSignup'>Cadastre-se</button>
        </div>
        <FormSignIn/>
      </div>
    </div>
  );
}

export default App;
