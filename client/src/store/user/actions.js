import constats from '../../constants';
import fetchJSON from '../../utils/fetchJSON';
import { remountApp } from '../../index';
import { resetState } from '../reset/actions';

const { SET_USER, SET_USER_FETCH_STATE } = constats.actionTypes;

// // For page reloading in some cases
// const reload = window.location.reload.bind(window.location);

// Main action creator, set user data object
export const setUser = user => ({
  type: SET_USER,
  payload: user
});

// Main action creator
export const setUserFetchState = fetchState => ({
  type: SET_USER_FETCH_STATE,
  payload: fetchState
});

// Fetch user from server if logged in
export const fetchUser = () => {
  return dispatch => {
    dispatch(setUserFetchState('pending')); // Set pending

    return fetchJSON.get(`/api/user`).then(data => {
      if (data.ok) {
        dispatch(setUser(data.user)); // Set receved user data object
        dispatch(setUserFetchState('success')); // Set success
        remountApp(); // Remount all App
      } else {
        dispatch(setUserFetchState('error')); // Set error
      }

      return data; // Send data further
    });
  };
};

// Registrates new user, if successfully, page will be reloaded
export const registrateUser = newUser => {
  return dispatch => {
    dispatch(setUserFetchState('pending')); // Set pending

    return fetchJSON.post(`/api/user/registrate`, newUser).then(data => {
      if (data.ok) {
        dispatch(setUser(data.user)); // Set receved user data object
        dispatch(setUserFetchState('success')); // Set success
        remountApp(); // Remount all App
      } else {
        dispatch(setUserFetchState('error')); // Set error
      }

      return data; // Send data further
    });
  };
};

// Log in user, if successfully, page will be reloaded
export const loginUser = userToLogin => {
  return dispatch => {
    dispatch(setUserFetchState('pending')); // Set pending

    return fetchJSON.post(`/api/user/login`, userToLogin).then(data => {
      if (data.ok) {
        dispatch(setUser(data.user)); // Set receved user data object
        dispatch(setUserFetchState('success')); // Set success
        remountApp(); // Remount all App
      } else {
        dispatch(setUserFetchState('error')); // Set error
      }

      return data; // Send data further
    });
  };
};

// Log out user, if successfully, page will be reloaded
export const logoutUser = () => {
  return dispatch => {
    dispatch(setUserFetchState('pending')); // Set pending

    return fetchJSON.post(`/api/user/logout`, {}).then(data => {
      if (data.ok) {
        dispatch(setUser(null)); // Reset user data object if logout successfull
        dispatch(setUserFetchState('success')); // Set success
        dispatch(resetState()); // Reset redux state
        remountApp(); // Remount all App
      } else {
        dispatch(setUserFetchState('error')); // Set error
      }

      return data; // Send data further
    });
  };
};
