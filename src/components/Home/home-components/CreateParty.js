import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { NameUserContext } from '../../../Context/NameUserContext';
import { PartyRequest } from '../../../helpers/PartyRequest';
import { useForm } from '../../../hooks/useForm';

export const CreateParty = () => {

    const { PartyData, setPartyData, dataUser } = useContext(NameUserContext);
    
    const [PartyForm, handlerInputChange] = useForm({
        leader: '',
        typeQuestions: '',
        players: '',
        timeQuestions: ''
    });


    const CreateParty = async(e) => {
        e.preventDefault();
        // console.log(PartyData, dataUser)

        const response = await PartyRequest('new', 
            dataUser.name, 
            PartyForm.typeQuestions, 
            PartyForm.players, 
            PartyForm.timeQuestions,
            dataUser.name,
            dataUser.id,
            dataUser.profileimg,
            dataUser);
        setPartyData(response.body);

        console.log('El response viene asi', response.body)
    }

    if(PartyData.status){
        return <Redirect to={`/lobby/party-${PartyData.PartySave.partycode}`} />
    }

    return (
        <div className='tc--fcontainer'>
            <form onSubmit={CreateParty}>
                <div>
                    <h2>Tipo de preguntas:</h2>
                    <select 
                        name='typeQuestions'
                        className='tc--selection'
                        onChange={handlerInputChange}>
                        <option 
                            onChange={handlerInputChange}
                            value={1}>Al azar</option>
                        <option 
                            onChange={handlerInputChange}
                            value={2}>Deportes</option>
                        <option 
                            onChange={handlerInputChange}
                            value={3}>Cine y Televisión</option>
                        <option 
                            onChange={handlerInputChange}
                            value={4}>Tecnologia</option>
                        <option 
                            onChange={handlerInputChange}
                            value={5}>Historia</option>
                    </select>
                </div>
                <div>
                    <h2>Cantidad de preguntas por ronda:</h2>
                    <select 
                        name='players'
                        className='tc--selection'
                        onChange={handlerInputChange}>
                        <option 
                            onChange={handlerInputChange}
                            value={5}>5</option>
                        <option 
                            onChange={handlerInputChange}
                            value={10}>10</option>
                        <option 
                            onChange={handlerInputChange}
                            value={15}>15</option>
                        <option 
                            onChange={handlerInputChange}
                            value={20}>20</option>
                    </select>
                </div>
                <div>
                    <h2>Tiempo para responder(en segundos):</h2>
                    <input 
                        className='tc--input' 
                        placeholder='Especifica una cantidad en segundos'
                        name='timeQuestions'
                        onChange={handlerInputChange}
                    />
                </div>
                <button 
                    className='tc--button' type='submit'>Buscar jugadores...</button>
            </form>
        </div>
    );
};
