import {combineReducers} from 'redux';

import generationReducer from './generation';
import dragonReducer from './dragon';

const rootReducer = combineReducers({generation: generationReducer, dragon: dragonReducer});

export default rootReducer;