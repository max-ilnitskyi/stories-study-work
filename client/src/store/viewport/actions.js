import constants from '../../constants';

const { SET_VIEWPORT_WIDTH } = constants.actionTypes;

export const setViewportWidth = width => ({
  type: SET_VIEWPORT_WIDTH,
  payload: width
});

// calls one time for watching window resize
export const watchViewportWidthChange = (delay = 100) => {
  return dispatch => {
    let isThrottled = false;
    let lastDispatchedWidth = 0;
    let currentWidth = 0;

    const handleWindowSize = () => {
      currentWidth = window.innerWidth;
      // check isThrottled and prevent unnecessary dispatch
      // if width the same as last dispatched
      if (isThrottled || currentWidth === lastDispatchedWidth) return;

      // dispatch width immediately
      dispatchCurrentWidth();
      isThrottled = true;

      // delay next width dispatch
      setTimeout(() => {
        dispatchCurrentWidth();
        isThrottled = false;
      }, delay);
    };

    const dispatchCurrentWidth = () => {
      dispatch(setViewportWidth(currentWidth));
      lastDispatchedWidth = currentWidth;
    };

    window.addEventListener('resize', handleWindowSize);
  };
};
