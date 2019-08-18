import constats from '../../constants';

const {
  SET_MY_STORIES,
  SET_ALL_STORIES,
  SET_MY_STORIES_FETCH_STATE,
  SET_ALL_STORIES_FETCH_STATE
} = constats.actionTypes;

const defaultState = {
  myStoriesList: null,
  myStoriesFetchState: null,
  allStoriesList: null,
  allStoriesFetchState: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    // Set user's stories
    case SET_MY_STORIES:
      return { ...state, myStoriesList: action.payload };

    // Set user's stories fetch state
    case SET_MY_STORIES_FETCH_STATE:
      return { ...state, myStoriesFetchState: action.payload };

    // Set common stories
    case SET_ALL_STORIES:
      return { ...state, allStoriesList: action.payload };

    // Set common stories fetch state
    case SET_ALL_STORIES_FETCH_STATE:
      return { ...state, allStoriesFetchState: action.payload };

    default:
      return state;
  }
};

export default reducer;
