import {combineReducers} from 'redux';

import generationReducer from './generation';
import dragonReducer from './dragon';
import accountReducer from './account';

const rootReducer = combineReducers({generation: generationReducer, dragon: dragonReducer, account: accountReducer});

export default rootReducer;