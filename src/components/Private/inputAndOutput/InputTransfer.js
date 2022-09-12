import './inputAndOutput.css'
import { useState } from 'react'
import { postTransferenceAccount } from '../../Data/dataService'
import { useParams, useNavigate } from 'react-router-dom';

export default function InputTransfer (){
    const [value, setValue] = useState('')
    const [description, setDescription] = useState('')
    const {userId} = useParams()
    const navigate = useNavigate()

    async function handleForm(e){
        e.preventDefault();
        
        try {
            await postTransferenceAccount(userId, {
                value,
                description,
                type: 'input'
            })
            navigate(`/private/accounts/${userId}`)
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className="inputAndOutput">
            <header>
                <h1>Nova Entrada</h1>
            </header>

            <form onSubmit={handleForm}>
                <input type="number" placeholder="Valor" required
                value={value} onChange={inValue => setValue(inValue.target.value)}/>
                <input type="text" placeholder="Descrição" required
                value={description} onChange={inValue => setDescription(inValue.target.value)}/>
                <button>Salvar entrada</button>
            </form>
        </div>
    )
}