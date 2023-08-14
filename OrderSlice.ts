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
  MovedfromCart:boolean,
  NoofItems:number[],
  Items:string[],
  Prices:number[],
  ItemsObj:ItemsType[],
  clickedAdd:boolean[],
  opencart:boolean,
  opencartIn:boolean
}

const initialState: OrderState = {
  Total:0,
  MovedfromCart:false,
  NoofItems:[],
  Items:[],
  Prices:[],
  ItemsObj:[],
  clickedAdd:[],
  opencart:false,
  opencartIn:false
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
    },
    opencartaction:(state,action:PayloadAction<boolean>)=>{
      state.opencart = action.payload
    },
    opencartInaction:(state,action:PayloadAction<boolean>)=>{
      state.opencartIn = action.payload
    },
    movedtfromcart:(state,action:PayloadAction<boolean>)=>{
      state.MovedfromCart = action.payload
    }
  }
})

export const { movedtfromcart,addItems,addNoofItems,addTotal,addPrices,addItemsObj,addButtonClick,opencartaction,opencartInaction } = OrderSlice.actions

export const selectOrder = (state: RootState) => state.Order

export default OrderSlice.reducer