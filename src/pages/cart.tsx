import Link from 'next/link';
import { ItemsType, addButtonClick, addItemsObj, addNoofItems, addTotal, opencartInaction, opencartaction } from 'OrderSlice';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from 'Store';

const Cart:React.FC = () => {
    const dispatch = useDispatch();
    const Items = useSelector((state:RootState)=>state.Order);
    const [cartquantity,setcartquantity] = useState([0]);
    const [carttotal,setcarttotal] = useState(0);
    const [cartui,setcartui] = useState<boolean[]>([]);
    const [prices,setprices] = useState([0]);
    const [cartitems,setcartitems] = useState<ItemsType[]>([{Index:0,Name:"",Quantity:0,Price:0}]);
    let QuantityState = [];
    let ind:number = 0;
    let ItemsState:ItemsType[] = [];
    let UIState:boolean[] = [];
    let pricearray:number[] = [];
    console.log(cartitems);
    useEffect(()=>{
        dispatch(addButtonClick(cartui));
        dispatch(addItemsObj(cartitems));
        dispatch(addTotal(carttotal));
        dispatch(addNoofItems(cartquantity));
        if(cartquantity.length!=0)
        {dispatch(opencartaction(true));
        dispatch(opencartInaction(true));
        }
        else{dispatch(opencartInaction(false));dispatch(opencartaction(false));}
    },[cartquantity,cartui])
    useEffect(()=>{
        setcartui(Items.clickedAdd);
        setcarttotal(Items.Total);
        setprices(Items.Prices);
        setcartquantity(Items.ItemsObj.map(i=>{return i.Quantity}));
        setcartitems(Items.ItemsObj.filter((i)=>{return i.Quantity!=0}));
    },[])
    
    const IncreaseCartQuantity=(index:number)=>{
        ind = index;
        QuantityState = [...cartquantity];
        QuantityState[ind]++;
        setcartitems(prev=>prev.map((i,index)=>{
            if(index===ind){
              return {...i,Quantity:i.Quantity+1};
            }
            return i;
          }))
        setcartquantity(QuantityState);
        setcarttotal(prev=>prev+prices[ind]);
    }
    const DecreaseCartQuantity = (index:number)=>{
        QuantityState = [...cartquantity];
        QuantityState[index]--;
        UIState=[...cartui];
        ItemsState = [...cartitems];
        if(QuantityState[index]==0){
            QuantityState.splice(index,1);
            UIState[ItemsState[index].Index] = false;
            ItemsState.splice(index,1);
            setcartui(UIState);
            setcartquantity(QuantityState);
            setcartitems(ItemsState);
        }
        setcartitems(prev=>prev.map((i)=>{
            if(i.Index===index){
              return {...i,Quantity:i.Quantity-1}
            }
            return i;
          }))
        setcarttotal(prev=>prev-prices[index]);
        pricearray = [...prices];
        pricearray.splice(index,1);
        setprices(pricearray);
        setcartquantity(QuantityState);
    }
    return(
        <>
        <Link href='/home'><Button variant='none' style={{display:"inline"}}>{<img src="./static/arrowback.svg"></img>}</Button></Link>
        <div className='d-flex flex-column align-items-center'>
            <p style={{display:"inline",fontWeight:'bold',fontSize:'20px'}}>Items in your cart</p>
            <Card className='shadow-lg animate__animated animate__zoomIn rounded-lg' style={{width:'90%',paddingBottom:'15px'}}>
            {cartitems.map((item,i)=>{return<> 
                <div style={{padding:"10px",display:"inline"}}>
                    <div className='fs-5 fw-bold d-inline'>{item.Name}</div>
                    <div>Rs.{item.Price}</div>
                </div>
                <div className='d-flex flex-row rounded-3 justify-content-center gap-2 shadow-lg d-inline' style={{width:'35%',backgroundColor:'#EFCDF4',marginLeft:'60%',display:'inline',fontWeight:"bold"}}>
                <button className='rounded ms-2' style={{width:'20px',fontSize:'15px',height:'20px',display:'contents'}} onClick={()=>{IncreaseCartQuantity(i)}}>+</button>
                <div style={{display:'inline',fontSize:'20px'}}>{cartquantity[i]}</div>
                <button className='rounded-circle' style={{width:'20px',fontSize:'15px',height:'20px',display:'contents'}} onClick={()=>{DecreaseCartQuantity(i)}}>-</button></div>
                </>
            })}
            </Card>
        </div>
        <div className='d-flex flex-column align-items-center shadow-lg' style={{position:'fixed',width:'100%',bottom:6}}>
            <Card style={{width:'90%',padding:'2%'}}>
                <p style={{display:'inline',marginLeft:'5%',fontSize:'20px'}}>Total: <span className='' style={{marginLeft:'50%',fontWeight:'bolder'}}>Rs {carttotal}</span></p>
                <Button variant='none' size='sm' className='rounded-lg' style={{backgroundColor:'#EFCDF4',width:'100%',height:'50px',fontWeight:'bolder',marginLeft:'0%'}}>Proceed to Pay</Button>
            </Card>
        </div>
        </>
    )
}

export default Cart
