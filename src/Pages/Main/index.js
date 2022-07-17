import Logo from '../../assets/Logo.svg'
import ProfileIcon from '../../assets/profile_avatar_icon.svg'
import LogoutIcon from '../../assets/logout_icon.svg'
import ModalEditarPerfil from '../../components/ModalEditarPerfil'
import Tabela from '../../components/Tabela'
import {useEffect ,useState} from 'react'
import {useNavigate} from 'react-router-dom'
import './styles.css';
import { detalharUsuario } from '../../services/api'

function App() {
  const navigate = useNavigate()
  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha:'',
    confirmarSenha:''
  })
  const [mostrarModalPerfil, setMostrarModalPerfil] = useState(false)
  

  

  useEffect(()=>{
    async function handlePegarUsuario(token){
      const response = await detalharUsuario(token)
      setUsuario({...usuario, nome: response.message.nome, email: response.message.email})
    }
    const token = localStorage.getItem('token')
    handlePegarUsuario(token)
  },[mostrarModalPerfil])

  return (
    <div className="container-home">
      <header className='header__home'>
        <img src={Logo} alt='Logo Dindin' />

        <div className='container-header'>
          <img src={ProfileIcon} onClick={()=>setMostrarModalPerfil(true)} alt='Icone Perfil' />


          {usuario.nome&& <p className='header__nomeUsuario'>{usuario.nome}</p>}
          
          <img src={LogoutIcon} onClick={()=>{localStorage.clear(); navigate('/')}} alt='Icone Deslogar' />
        </div>
      </header>
      
      <main className='main__home'>
        <Tabela/>
      </main>

      {mostrarModalPerfil && <ModalEditarPerfil 
        usuario={usuario} 
        setUsuario={setUsuario} 
        setMostrarModalPerfil={setMostrarModalPerfil}
        token = {localStorage.getItem('token')}
      />}
    </div>
  );
}

export default App;
