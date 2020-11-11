import { v4 as uuidv4 } from 'uuid';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM } from '../actions/types';

const initialState = {
  items: [
    {
      id: uuidv4(),
      name: 'Redux 1',
    },
    {
      id: uuidv4(),
      name: 'Redux 2',
    },
    {
      id: uuidv4(),
      name: 'Redux 3',
    },
    {
      id: uuidv4(),
      name: 'Redux 4',
    },
  ],
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
      };
    case ADD_ITEM:
      return {
        ...state,
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => {
          console.log(item.id, '===', action.payload);
          return item.id !== action.payload;
        }),
      };

    default:
      return state;
  }
};

export default itemReducer;
