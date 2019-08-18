import constats from '../../constants';

const { RESET_STATE } = constats.actionTypes;

// Reset redux state
export const resetState = () => ({
  type: RESET_STATE
});
