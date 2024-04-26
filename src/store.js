import { createStore, combineReducers } from 'redux';
import rootReducer from './reducers'; // Import your root reducer

// Create the root reducer by combining all reducers
const rootReducer = combineReducers({
  // Add your reducers here
});

// Create and export the Redux store
const store = createStore(rootReducer); // You can pass initial state or middleware here if needed

export default store;