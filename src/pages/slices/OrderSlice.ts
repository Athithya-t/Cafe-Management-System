import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../Store';

export type ItemsType = {
    title:string,
    price:number
}
interface OrderState {
  Total:number,
  NoofItems:number,
  Items:ItemsType[]
}

const initialState: OrderState = {
  Total:0,
  NoofItems:0,
  Items:[]
}

export const OrderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    addTotal: (state,action:PayloadAction<number>) => {
      state.Total = action.payload
    },
    addNoofItems: (state,action:PayloadAction<number>) => {
      state.NoofItems = action.payload
    },
    addItems: (state, action: PayloadAction<ItemsType>) => {
      state.Items = [...state.Items,action.payload]
    }
  }
})

export const { addItems,addNoofItems,addTotal } = OrderSlice.actions

export const selectOrder = (state: RootState) => state.Order

export default OrderSlice.reducer