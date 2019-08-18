import constats from '../../constants';
import fetchJSON from '../../utils/fetchJSON';

const {
  SET_MY_STORIES,
  SET_ALL_STORIES,
  SET_MY_STORIES_FETCH_STATE,
  SET_ALL_STORIES_FETCH_STATE
} = constats.actionTypes;

// Set user's stories
export const setMyStories = stories => ({
  type: SET_MY_STORIES,
  payload: stories
});
// Set user's stories fetch state
export const setMyStoriesFetchState = fetchState => ({
  type: SET_MY_STORIES_FETCH_STATE,
  payload: fetchState
});

// Set common stories
export const setAllStories = stories => ({
  type: SET_ALL_STORIES,
  payload: stories
});

// Set common stories fetch state
export const setAllStoriesFetchState = fetchState => ({
  type: SET_ALL_STORIES_FETCH_STATE,
  payload: fetchState
});

// Fetch user's stories
export const fetchMyStories = () => {
  return dispatch => {
    dispatch(setMyStoriesFetchState('pending')); // Set pending

    return fetchJSON.get(`/api/stories`).then(data => {
      if (data.ok) {
        dispatch(setMyStories(data.stories)); // Set receved stories
        dispatch(setMyStoriesFetchState('success')); // Set success
      } else {
        dispatch(setMyStoriesFetchState('error')); // Set error
      }

      return data; // Send data further
    });
  };
};

// Post user's story
export const postMyStory = story => {
  return dispatch => {
    return fetchJSON.post(`/api/stories`, story).then(data => {
      if (data.ok) {
        dispatch(fetchMyStories()); // When successfully posted, fetch stories
      }

      return data; // Send data further
    });
  };
};

// Delete user's story
export const deleteMyStory = storyId => {
  return dispatch => {
    return fetchJSON.delete(`/api/stories/${storyId}`).then(data => {
      if (data.ok) {
        dispatch(fetchMyStories()); // When successfully deleted, fetch stories
      }

      return data; // Send data further
    });
  };
};

// Fetch common stories
export const fetchAllStories = () => {
  return dispatch => {
    dispatch(setAllStoriesFetchState('pending')); // Set pending

    return fetchJSON.get(`/api/stories/all`).then(data => {
      if (data.ok) {
        dispatch(setAllStories(data.stories)); // Set receved stories
        dispatch(setAllStoriesFetchState('success')); // Set success
      } else {
        dispatch(setAllStoriesFetchState('error')); // Set error
      }

      return data; // Send data further
    });
  };
};

// Fetch single story
export const fetchSingleStory = storyId => {
  return dispatch => {
    return fetchJSON.get(`/api/stories/${storyId}`);
  };
};
