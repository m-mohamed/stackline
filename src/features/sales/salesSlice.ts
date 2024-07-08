import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

interface SalesData {
  weekEnding: string
  retailSales: number
  wholesaleSales: number
  unitsSold: number
  retailerMargin: number
}

interface SalesState {
  data: SalesData[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: SalesState = {
  data: [],
  status: 'idle',
  error: null
}

export const fetchSalesData = createAsyncThunk('sales/fetchSalesData', async () => {
  const response = await fetch('/data.json')
  const data = await response.json()
  return data[0].sales
})

const salesSlice = createSlice({
  name: 'sales',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalesData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSalesData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchSalesData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || null
      })
  }
})

export const selectSalesData = (state: RootState) => state.sales.data
export const selectSalesStatus = (state: RootState) => state.sales.status
export const selectSalesError = (state: RootState) => state.sales.error

export default salesSlice.reducer
