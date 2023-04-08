import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./tableSlice";



export default configureStore({
  reducer: {
    tables: tableReducer
  }
});

