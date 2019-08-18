import constats from '../../constants';

const { RESET_STATE } = constats.actionTypes;

const withReset = reducer => {
  return (state, action) => {
    if (action.type === RESET_STATE) {
      state = undefined;
    }

    return reducer(state, action);
  };
};

export default withReset;
