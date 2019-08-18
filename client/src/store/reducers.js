import { combineReducers } from 'redux';

// Import reset, wrap reducer
import withReset from './reset/withReset';

// Import reducers
import stories from './stories/reducer';
import user from './user/reducer';
import viewport from './viewport/reducer';

// Combine redusers
const reducer = withReset(
  combineReducers({
    stories,
    user,
    viewport
  })
);

export default reducer;
