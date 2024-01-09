import { configureStore } from '@reduxjs/toolkit';
import homeSlice  from './homeslice';
// import { composeWithDevTools } from 'redux-devtools-extension';
 
export const store = configureStore({
  reducer: {   
    home:homeSlice,
 },
//   enhancers: [composeWithDevTools()], 
})