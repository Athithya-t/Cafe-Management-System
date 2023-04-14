import React, { useCallback, useEffect } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import FormControl from 'react-bootstrap/FormControl';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Image, { StaticImageData } from 'next/image';
import IceCream from 'static/icecream.jpg';
import Burger from 'static/Burger.jpg';
import Pizza from 'static/Pizza.jpg';
import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '../../Store';
import { addItems, addNoofItems, addTotal, addPrices, addItemsObj, addButtonClick } from '../../OrderSlice';
import 'animate.css';
import Link from 'next/link';
import { ItemsType } from '../../OrderSlice';

const Home:React.FC = () => {
  const sum:number=0;
  type Food_Item={Title:string,Price:number,Image:StaticImageData|null}
  type Button_Item={IconName:string,BText:string|null,action:Function|null|void}
  type ItemsData = {Index:number,Name:string,Quantity:number,Price:number};
  const MenuItems:string[] = ['BestSellers','Starters'];
  const Food_Details:Food_Item[] = [{Title:"Ice cream",Price:120,Image:IceCream},{Title:"Burger",Price:240,Image:Burger},{Title:"Pizza",Price:300,Image:Pizza},{Title:"P1",Price:300,Image:IceCream},{Title:"P2",Price:300,Image:Burger},{Title:"P3",Price:300,Image:Pizza}]
  const [clickedAdd,setClickedAdd] = useState(Array());
  const [prices,setprices] = useState<number[]>(Array());
  const [quantity,setQuantity] = useState<number[]>(Array());
  const [openCartin,setOpenCartin] = useState(false);
  const [openCart,setOpenCart] = useState(false);
  const [total,settotal] = useState(0);
  const [openmenu,setopenmenu] = useState(false);
  const [searchbar,setsearchbar] = useState(false);
  const [searchquery,setsearchquery] = useState("");
  const [filtereddata,setfiltereddata] = useState('');
  const [items,setitems] = useState(Array());
  const [itemdata,setitemdata] = useState<ItemsData[]>([]);
  const dispatch = useDispatch();
  let newQuantityState:number[] = [];
  let newButtonState:Boolean[]= [];
  let newQuantityStateL:number[] = [];
  let newQuantityStateCard:number[]|void[] = [];
  let newItemsState:string[] = [];
  let newIndex:number[]=[];
  let newItemsData:ItemsData[] = [];
  let newPriceState:number[] = [];
  const Items = useSelector((state:RootState)=>state.Order);
  const Titles = Food_Details.map((food)=>{return food.Title});
  useEffect(()=>{
    setClickedAdd(Items.clickedAdd);
    settotal(Items.Total);
    setitemdata(Items.ItemsObj);
    setprices(Items.Prices);
    setitems(Items.ItemsObj);
    setOpenCart(Items.opencart);
    setOpenCartin(true);
    newIndex = Items.ItemsObj.map((i:ItemsType)=>{return i.Index});
    newQuantityStateL = Items.ItemsObj.map((i)=>{return i.Quantity});
    newQuantityStateCard = Items.ItemsObj.map((i:ItemsType,index:number)=>{newQuantityStateL[newIndex[index]]=i.Quantity});
    setQuantity(newQuantityStateL);
  },[])
  const searchHandler:Function=(forminput:string)=>{
    setsearchquery(forminput);
    const filter = Titles.filter((value)=>{return value.toLowerCase().includes(searchquery.toLowerCase())});
    setfiltereddata(filter.length==1?filter[0]:"");
  }

  const MoveToCartPage:Function=()=>{
    newPriceState = [...prices];
    newPriceState = newPriceState.filter(i=>{return i!=undefined||null});
    dispatch(addItems(items));
    dispatch(addNoofItems(quantity));
    dispatch(addTotal(total));
    dispatch(addPrices(newPriceState));
    dispatch(addItemsObj(itemdata.filter(i=>{return i.Quantity!=0})));
    dispatch(addButtonClick(clickedAdd));
    console.log('Button Clicked');
  }

  const handleButtonClick = (index:number,Carddata:any) =>{
    newQuantityState = [...quantity];
    newItemsState = [...items];
    newItemsState[index] = Carddata.Title;
    newQuantityState[index] = 1;
    newPriceState = [...prices];
    newItemsData = [...itemdata];
    newItemsData.push({Index:index,Name:Carddata.Title,Quantity:1,Price:Carddata.Price});
    setitemdata(newItemsData);
    newPriceState[index] = Carddata.Price;
    newButtonState = [...clickedAdd];
    newButtonState[index] = true;
    setQuantity(newQuantityState);
    setprices(newPriceState);
    setitems(newItemsState);
    setClickedAdd(newButtonState);
    settotal(prev=>prev+Carddata.Price);
    setOpenCart(true);
    setOpenCartin(true);  
  }
  const IncreaseQuantity = (index:number,Price:number,Carddata:any) =>{
    newItemsState = [...items];
    console.log(itemdata.filter((item)=>{return item.Index==index}));
    if(!(Carddata.Title in newItemsState)){newItemsState[index] = Carddata.Title;setitems(newItemsState);}
    newQuantityState = [...quantity];
    newQuantityState[index] = newQuantityState[index]+1;
    setQuantity(newQuantityState);
    setOpenCartin(true);
    setitemdata(prev=>prev.map((i)=>{
      if(i.Index===index){
        return {...i,Quantity:i.Quantity+1}
      }
      return i;
    }))
    settotal(prev=>prev+Price);
  }

  const DecreaseQuantity = (index:number,Price:number) =>{
    const newButtonState = [...clickedAdd];
    newQuantityState = [...quantity];
    newQuantityState[index] = newQuantityState[index]-1;
    if(newQuantityState[index]==0){newButtonState[index]=false;newItemsState.splice(index);setClickedAdd(newButtonState);}
    setQuantity(newQuantityState);
    const q = newQuantityState.filter((i)=>{return i!=(undefined||null)})
    let n = q.reduce((itemq,c)=>{return itemq+c});
    settotal(prev=>prev-Price);
    setitemdata(prev=>prev.map((i)=>{
      if(i.Index===index){
        return {...i,Quantity:i.Quantity-1}
      }
      return i;
    }))
    console.log(q); 
    if(n==0){setOpenCartin(false);}
  }
  
  const Headers:React.FC<{name:string,mt:string}> = (name)=>{
    return(
      <div style={{marginTop:name.mt}}>
        <div className='rounded' style={{backgroundColor:"violet",borderRadius:"5",display:"block",width:"2%",height:"3%",position:"absolute"}}></div>
        <h2 className='ms-3'>{name.name}</h2>
      </div>
    )
  }
  const CardComponent:React.FC<{Title:string,Price:number,id:number,Image?:StaticImageData|null,Width:string,Imgdim?:string[],ml?:string,mt?:string,pos?:any,bodyheight?:string}> = (Carddata)=>{
      return(
      <Card style={{width:Carddata.Width,overflowX:'scroll',flexShrink:0,scrollbarWidth:'none',paddingBottom:'2%'}} className='ms-2 mt-4' id={Carddata.Title}>
       <Image src={Carddata.Image!} alt="Food Image" style={{height:Carddata.Imgdim![0],width:Carddata.Imgdim![1],borderRadius:'5px 5px 0 0',marginLeft:Carddata.ml,marginTop:Carddata.mt,position:Carddata.pos,objectFit:'contain'}}/>
        <Card.Body style={{display:'block',paddingBottom:'1px',height:Carddata.bodyheight}}>  
         <Card.Title>{Carddata.Title}</Card.Title>
          <Card.Text>Rs.{Carddata.Price}</Card.Text>
        </Card.Body>
        {clickedAdd[Carddata.id]? 
            <div className='d-flex flex-row rounded-3 justify-content-center gap-2 shadow-lg animate__animated animate__pulse' style={{width:'35%',backgroundColor:'#EFCDF4',marginLeft:'60%',border:'1px solid purple',display:'inline',fontWeight:"bold",borderColor:'purple',borderWidth:'1px'}}>
              <button className='rounded-lg ms-2' style={{width:'20px',fontSize:'15px',height:'20px',display:'contents'}} onClick={()=>{IncreaseQuantity(Carddata.id,Carddata.Price,Carddata)}}>+</button>
              <div style={{display:'inline',fontSize:'20px'}}>{quantity[Carddata.id]}</div>
            <button className='rounded' onClick={()=>{DecreaseQuantity(Carddata.id,Carddata.Price)}} style={{width:'20px',fontSize:'15px',height:'20px',display:'contents'}}>-</button></div>
            :<Button size='sm' variant='none' onClick={()=>{handleButtonClick(Carddata.id,Carddata)}} className='rounded-3 shadow-lg' style={{width:'35%',backgroundColor:'#EFCDF4',borderColor:'purple',borderWidth:'1px',marginLeft:'60%',fontWeight:"bold",marginTop:0}}>ADD</Button>}
      </Card>
    )
  }
  
  const MenuComponent:React.FC<{Name:string,index:number}>=(Name)=>{
    return(
      <div key={Name.index} style={{backgroundColor:'black',color:'white',width:'30%',marginTop:'0%'}} className='rounded'>
      <div className='ms-3'><a href='google.com'><option>{Name.Name}</option></a></div>
      </div>
    )
  }

  return (
    <div style={{height:"10vh"}}>
      {searchbar&&<div className='position-relative'><div className='animate__animated animate__zoomIn' style={{backgroundColor:'gray',width:'100%',height:'100%',position:'fixed',zIndex:'50',opacity:0.5}} onClick={()=>{setsearchbar(prev=>!prev);setsearchquery("")}}></div>
      <Form className='w-100'>
        <FormControl autoFocus placeholder='Search for your favorite food here' value={searchquery} onChange={(e)=>{searchHandler(e.target.value)}} className='rounded-pill shadow' style={{zIndex:'200',position:'fixed',width:'90%',marginLeft:'3%',marginTop:'20%',borderColor:'black'}}/> 
        <div className='rounded' style={{position:'fixed',backgroundColor:'white',zIndex:'200',marginTop:'30%',marginLeft:'5%',width:'80%'}}>
          <a href={`#${filtereddata}`} onClick={()=>{setsearchbar(prev=>!prev);setsearchquery("")}} style={{textDecoration:"none",color:'black'}}>
            <div>{searchquery!=""&&filtereddata}</div>
          </a>
        </div>
      </Form>
      </div>}
      <Container className="d-flex flex-column align-items-center h-100">
      {openCart&& <div className={openCartin?"animate__animated animate__fadeInUp rounded-3 shadow-lg":"animate__animated animate__slideOutDown rounded-pill shadow-lg"} style={{backgroundColor:'lightgreen',position:'fixed',bottom:6,zIndex:'999',width:'93%',height:'5%',animationDuration:'1s'}}>
        <p className='ms-2 fw-bold ms-5 mt-2'>Total:<span className='' style={{marginLeft:'50%'}}>Rs {total}</span></p>
      </div>}
      <ButtonGroup className='gap-5'>
         <Button variant="outline-dark" className='rounded-3 mt-3' onClick={()=>{setsearchbar(prev=>!prev)}}>{<Image src="./static/search.svg" alt="search" width="50" height="50" style={{width:"70%",height:"50%"}}/>}</Button>
        <Button variant='outline-dark' className='rounded-3 mt-3' onClick={()=>{setopenmenu(prev=>!prev)}}>{<Image alt="menu" src="./static/menu.svg" width="50" height="50" style={{width:"50%",height:"70%"}}/>}Menu</Button>
        <Link href='/cart'><Button variant="outline-dark" className='rounded-3 mt-3' onClick={()=>{MoveToCartPage()}}>{<Image alt="cart" src="./static/cart.svg" width="50" height="50" style={{width:"50%",height:"50%"}}/>}Cart</Button></Link>
      </ButtonGroup>
      {openmenu&&MenuItems.map((i,index)=>{return (<MenuComponent Name={i} index={index}/>)})}

      </Container>
      <Headers name="BestSellers" mt="5%"/>
      <div className='d-flex flex-row align-items-stretch overflow-scroll' style={{scrollbarWidth:'none'}}>
        {Food_Details.map((food_item,index)=>{return(<CardComponent Title={food_item.Title} bodyheight='20%' Price={food_item.Price} id={index} Image={food_item.Image} key={index} Width='50%' Imgdim={['50%','100%']} ml="0" mt="0" pos='relative'/>)})}
      </div>
      <Headers name="Starters" mt="10%"/>
      <div style={{paddingBottom:'15%'}}>
      {Food_Details.map((food_item,index)=>{return(<CardComponent Title={food_item.Title} bodyheight='20%' Price={food_item.Price} id={index} Image={food_item.Image} key={index} Width='96%' Imgdim={['50%','48%']} ml="53%" mt="0%" pos='absolute'/>)})}
      </div>
    </div>
  )
}

export default Home;