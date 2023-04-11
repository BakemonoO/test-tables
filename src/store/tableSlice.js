import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getPaginationData } from "../helper";
import { token } from "../API/Token";

// https://cloud.iexapis.com/stable/stock/msft/intraday-prices  -- 400 items
// https://cloud.iexapis.com/stable/stock/aapl/dividends/5y     -- 22  items

export const fetchTables = createAsyncThunk(
  'tables/fetchTables', async () => {
    const response = await axios.get('https://cloud.iexapis.com/stable/stock/aapl/dividends/5y', {
      params: {
        token: token
      }
    })
    return response.data
  }
)

const tableSlice = createSlice({
  name: 'tables',
  initialState: {
    data: [],
    staticKeys: [],
    keys: [],
    page: 1,
    limitPages: 0,
    requestError: false,
    loader: true,
    requestFulfilled: false
  },

  reducers: {
    getTable(state, actions) {
      state.data[state.page - 1] = actions.payload
    },

    changeKeys(state, actions) {
      state.keys = state.staticKeys.filter(x => !actions.payload.includes(x))
    },

    pageUp(state) {
      state.page += 1
    },

    pageDown(state) {
      state.page -= 1
    }
   },

  extraReducers: (builder) => {
    builder
    .addCase(fetchTables.pending, (state) => {
      state.loader = true
    })

    .addCase(fetchTables.fulfilled, (state, actions) => {
      state.limitPages = Math.ceil(actions.payload.length / 10)
      actions.payload.map((x, i) => (
        x['dndId'] = String(i + 1)
        )) 
      state.keys = Object.keys(actions.payload[0])
      state.data = getPaginationData(actions.payload, state.limitPages)
      state.staticKeys = state.keys
      state.loader = false
      state.requestFulfilled = true
    })

    .addCase(fetchTables.rejected, (state, actions) => {
      state.loader = false
      state.requestError = true
      console.log(actions.error)
    })
  }
});


export const { getTable, pageDown, pageUp, changeKeys } = tableSlice.actions

export default tableSlice.reducer