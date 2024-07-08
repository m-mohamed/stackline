import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store'

interface ProductData {
  id: string
  title: string
  image: string
  subtitle: string
  brand: string
  tags: string[]
}

interface ProductState {
  data: ProductData | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: ProductState = {
  data: null,
  status: 'idle',
  error: null
}

export const fetchProductData = createAsyncThunk(
  'product/fetchProductData',
  async () => {
    const response = await fetch('/data.json')
    if (!response.ok) {
      throw new Error('Failed to fetch product data')
    }
    const data = await response.json()
    return data[0] // Assuming the first item in the array is the product we want
  }
)

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProductData.fulfilled, (state, action: PayloadAction<ProductData>) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch product data'
      })
  }
})

export const selectProductData = (state: RootState) => state.product.data
export const selectProductStatus = (state: RootState) => state.product.status
export const selectProductError = (state: RootState) => state.product.error

export default productSlice.reducer
