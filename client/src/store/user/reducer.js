import constats from '../../constants';

const { SET_USER, SET_USER_FETCH_STATE } = constats.actionTypes;

const defaultState = {
  user: null,
  userFetchState: null // Can be: pending/error/success
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    // Set user data object from action.payload
    case SET_USER:
      return { ...state, user: action.payload };

    // Set fetch state from action.payload
    case SET_USER_FETCH_STATE:
      return { ...state, userFetchState: action.payload };

    default:
      return state;
  }
};

export default reducer;
