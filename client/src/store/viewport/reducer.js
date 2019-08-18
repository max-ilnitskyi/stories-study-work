import constants from '../../constants';

const { SET_VIEWPORT_WIDTH } = constants.actionTypes;

const defaultStore = {
  width: window.innerWidth // set current viewport width
};

const reducer = (store = defaultStore, action) => {
  switch (action.type) {
    case SET_VIEWPORT_WIDTH:
      return { ...store, width: action.payload };

    default:
      return store;
  }
};

export default reducer;
