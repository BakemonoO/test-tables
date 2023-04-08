import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getFilterFromKeys, getPaginationData } from "../helper";


// ----------- Initial token
const token = 'sk_689f0b9287b64b5fbdd2a9dbe88226ca'

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
    staticData: [],
    staticKeys: [],
    keys: [],
    page: 1,
    limitPages: 0,
    requestError: false,
    loader: true,
  },

  reducers: {
    getTable(state, actions) {
      state.data[state.page - 1] = actions.payload
    },

    getFilteredTable(state, actions) {
      state.data[state.page - 1] = getFilterFromKeys(state.staticData[state.page - 1], actions.payload)
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
      state.staticData = state.data
      state.staticKeys = state.keys
      state.loader = false
    })

    .addCase(fetchTables.rejected, (state, actions) => {
      state.loader = false
      state.requestError = true
      console.log(actions.error)
    })
  }
});


export const { getTable, getFilteredTable, pageDown, pageUp, changeKeys } = tableSlice.actions

export default tableSlice.reducer