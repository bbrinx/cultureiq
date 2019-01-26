import { APPEND_TRANSLATION } from "../actionTypes";

const initialState = {
  history: []
}

const history = (state = initialState, action) => {
  switch (action.type) {
    case APPEND_TRANSLATION: {
      const { translation } = action.payload;
      return {
        ...state,
        history: [...state.history, translation]
      };
    }
    default:
      return state;
  }
}

export default history
