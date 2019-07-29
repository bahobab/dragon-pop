import { combineReducers } from "redux";

import generationReducer from "./generation";
import dragonReducer from "./dragon";
import accountReducer from "./account";
import accountDragonsReducer from "./accountDagons";

const rootReducer = combineReducers({
  generation: generationReducer,
  dragon: dragonReducer,
  account: accountReducer,
  accountDragons: accountDragonsReducer
});

export default rootReducer;
