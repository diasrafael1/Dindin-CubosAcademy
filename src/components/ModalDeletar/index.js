import { deletarRegistro } from '../../services/api';
import './styles.css';

export default function ModalDeletar({atualizarEffect,setAtualizarEffect,id,setMotrarModalDelete}){

    async function handleDeletar(){
        const token = localStorage.getItem('token')
        await deletarRegistro(id,token)
        setMotrarModalDelete(false)
        setAtualizarEffect(!atualizarEffect)
    }

    return(
        <div className='modal-deletar'>
            <span>Apagar item?</span>
            <div className='container-btnDeletar'>
                <button className='btnDeletar__sim' onClick={()=>{handleDeletar()}}>Sim</button>
                <button className='btnDeletar__nao' onClick={()=>{setMotrarModalDelete(false)}}>Não</button>
            </div>
        </div>
        
    )
}