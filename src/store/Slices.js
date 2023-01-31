const {createSlice} = require('@reduxjs/toolkit');

export const languageSlice = createSlice({
  name: 'language',
  initialState: {code:'en',title:'English'},
  reducers: {
    setLanguage: (state,action)=> action.payload
    ,
  },
});

export const currencySlice = createSlice({
  name: 'currency',
  initialState:  {
    "title": "United States Dollar",
    "symbol_left": "$",
    "symbol_right": "",
    "code": "USD",
    "id": "150",
    "value": 1,
    "default": true,
    "precision": 2
    },
  reducers: {
    setCurrency: (state,action)=> action.payload
    ,
  },
});

export const counterSlice = createSlice({
    name: 'counter',
    initialState: 1,
    reducers: {
      setCount: (state,action)=> state+1
    },
  });
