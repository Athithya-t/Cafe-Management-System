import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './Store';

export type ItemsType = {
  Index:number,  
  Name:string,
  Quantity:number,
  Price:number,
}
interface OrderState {
  Total:number,
  NoofItems:number[],
  Items:string[],//ItemsType[]//{title:string,no:number}[]
  Prices:number[],
  ItemsObj:ItemsType[],
  clickedAdd:boolean[]
}

const initialState: OrderState = {
  Total:0,
  NoofItems:[],
  Items:[],
  Prices:[],
  ItemsObj:[],
  clickedAdd:[]
}

export const OrderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    addTotal: (state,action:PayloadAction<number>) => {
      state.Total = action.payload
    },
    addNoofItems: (state,action:PayloadAction<number[]>) => {
      state.NoofItems = action.payload
    },
    addItems: (state, action: PayloadAction<string[]>) => {
      state.Items = action.payload
    },
    addPrices:(state,action: PayloadAction<number[]>)=>{
      state.Prices = action.payload
    },
    addItemsObj:(state,action:PayloadAction<ItemsType[]>)=>{
      state.ItemsObj = action.payload
    },
    addButtonClick:(state,action:PayloadAction<boolean[]>)=>{
      state.clickedAdd = action.payload
    }
  }
})

export const { addItems,addNoofItems,addTotal,addPrices,addItemsObj,addButtonClick } = OrderSlice.actions

export const selectOrder = (state: RootState) => state.Order

export default OrderSlice.reducer