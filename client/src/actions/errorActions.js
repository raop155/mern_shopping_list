import { GET_ERROS, CLEAR_ERROS, GET_ERRORS, CLEAR_ERRORS } from './types';

// Return ERRORS

export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: {
      msg,
      status,
      id,
    },
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
