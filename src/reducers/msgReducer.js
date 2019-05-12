import {

    GET_MSG,
    SEND_MSG
  } from '../actions/actionTypes';
  
  const initialState = {
    allMsg: [],
    msg: {},
  };
  
  export default function (state = initialState, action) {
    switch (action.type) {
      case GET_MSG:
        return {
          ...state,
          allMsg: action.payload
        };
      case SEND_MSG:
      return {
        ...state,
        msg: 
          {
            contenu: action.payload.contenu,
            expediteur: action.payload.expediteur,
            destinataire: action.payload.destinataire,
            
          }
      };
      default:
        return state;
    }
  }
  