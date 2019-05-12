import axios from 'axios';
import {
    SEND_MSG,
    GET_MSG
} from './actionTypes';

export const sengMsg = (contenu, expediteur, destinataire) => dispatch =>
    axios
        .post('/sengMsg', {
            contenu,
            expediteur: expediteur.id,
            destinataire: destinataire.id,
        })
        .then(res =>
            dispatch({
                type: SEND_MSG,
                payload: res.data
            }));

export const getMsgUser = (expediteur,destinataire) => async (dispatch) => {
    console.log('ici action msg')
    const result = await axios.get(`/msg/${expediteur}&${destinataire}`).then(res =>
        dispatch({
            type: GET_MSG,
            payload: result.data
        }));
    // return dispatch({
    //     type: GET_MSG,
    //     payload: result.data
    // });
};