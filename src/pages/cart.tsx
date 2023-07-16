import Link from 'next/link';
import { ItemsType, addButtonClick, addItemsObj, addNoofItems, addPrices, addTotal, movedtfromcart, opencartInaction, opencartaction } from 'OrderSlice';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from 'Store';

const Cart:React.FC = () => {
    const dispatch = useDispatch();
    const [cartempty,setcartempty] = useState(true);
    const Items = useSelector((state:RootState)=>state.Order);
    const [carttotal,setcarttotal] = useState(0);
    const [cartui,setcartui] = useState<boolean[]>([]);
    const [cartitems,setcartitems] = useState<ItemsType[]>([]);
    let Index:number[] = [];
    let UIState:boolean[] = [];
    useEffect(()=>{
        dispatch(movedtfromcart(true));
        dispatch(addItemsObj(cartitems));
        dispatch(addTotal(carttotal));
        Index = cartitems.filter((i)=> i.Quantity==0).map((i)=>{return i.Index});
        UIState = [...cartui];
        Index.forEach((i)=>{UIState[i] = false});
        dispatch(addButtonClick(UIState));
        if(carttotal!=0)
        {dispatch(opencartaction(true));
        dispatch(opencartInaction(true));
        }
        else{dispatch(opencartInaction(false));dispatch(opencartaction(false));setcartempty(true)}
    },[cartitems]);
    useEffect(()=>{
        Items.ItemsObj.length==0?null:setcartempty(false);
        setcartui(Items.clickedAdd);
        setcarttotal(Items.Total);
        setcartitems(Items.ItemsObj.filter((i)=>{return i.Quantity!=0}));
    },[])
    
    const IncreaseCartQuantity=(index:number)=>{
        setcartitems(prev=>prev.map((i,ind)=>{
            if(index===ind){
              return {...i,Quantity:i.Quantity+1};
            }
            return i;
          }))
        setcarttotal(prev=>prev+cartitems[index].Price);
    }
    const DecreaseCartQuantity = (index:number)=>{
        setcartitems(prev => prev.map((i, ind) => {
            if ((ind === index)) {
              return { ...i, Quantity: i.Quantity - 1 };
            }
            return i;
          }));
        setcarttotal(prev=>prev-cartitems[index].Price);
    }
    return(
        <>
        <Link href='/home'><Button variant='none' style={{display:"inline"}}>{<img src="./static/arrowback.svg"></img>}</Button></Link>
        <div className='d-flex flex-column align-items-center'>
          <h1 style={{display:"inline",fontWeight:'bold',fontSize:'30px'}}>Cart</h1>
          {cartempty?<>
            <h1 style={{marginTop:'50%',color:'purple'}} className='animate__animated animate__zoomIn'>Seems to be empty</h1>
            <p style={{color:'violet'}} className='animate__animated animate__zoomIn'>Order your favorite food now!</p>
          </>:
          <><Card className='shadow-lg animate__animated animate__zoomIn rounded-lg' style={{width:'90%',paddingBottom:'15px'}}>
          {cartitems.map((item,i)=>{
            if(item.Quantity!=0){
              return<> 
              <div style={{padding:"10px",display:"inline"}}>
                  <div className='fs-5 fw-bold d-inline'>{item.Name}</div>
                  <div>Rs.{item.Price}</div>
              </div>
              <div className='d-flex flex-row rounded-3 justify-content-center gap-2 shadow-lg d-inline' style={{width:'35%',backgroundColor:'#EFCDF4',marginLeft:'60%',display:'inline',fontWeight:"bold"}}>
              <button className='rounded-circle' style={{width:'20px',fontSize:'20px',height:'20px',display:'contents'}} onClick={()=>{DecreaseCartQuantity(i)}}>-</button>
              <div style={{display:'inline',fontSize:'20px'}}>{item.Quantity}</div>
              <button className='rounded ms-2' style={{width:'20px',fontSize:'20px',height:'20px',display:'contents'}} onClick={()=>{IncreaseCartQuantity(i)}}>+</button>
              </div>
              </>
            }})}
            </Card>
          <div className='d-flex flex-column align-items-center shadow-lg' style={{position:'fixed',width:'100%',bottom:6}}>
            <Card style={{width:'90%',padding:'2%'}}>
                <p style={{display:'inline',marginLeft:'5%',fontSize:'20px',fontWeight:'bold'}}>Total: <span className='' style={{marginLeft:'50%',fontWeight:'bolder'}}>Rs {carttotal}</span></p>
                <Button variant='none' size='sm' className='rounded-lg' style={{backgroundColor:'#EFCDF4',width:'100%',height:'50px',fontWeight:'bolder',marginLeft:'0%'}}>Proceed to Pay</Button>
            </Card>
          </div>
          </>
          }
        </div>
        </>
    )
}

export default Cart
