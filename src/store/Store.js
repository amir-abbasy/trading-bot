import  { languageSlice } from "./Slices";
import * as Slices from "./Slices";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const reducer = combineReducers({
    language: Slices.languageSlice.reducer,
    currency: Slices.currencySlice.reducer,
  })

const store = configureStore({ reducer})

export default store;