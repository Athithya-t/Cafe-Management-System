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
import { addItems, addNoofItems, addTotal, addPrices, addItemsObj, addButtonClick, opencartaction, opencartInaction } from '../../OrderSlice';
import 'animate.css';
import Link from 'next/link';
import {Food_Item,ItemsData} from 'types';
import { Loader } from '.';

export async function getServerSideProps() {
  const Home = 'Home';
  const Menu:string[] = ['BestSellers','Starters'];
  const Food_Details:Food_Item[] = [{Title:"Ice cream",Price:120,Image:IceCream},{Title:"Burger",Price:240,Image:Burger},{Title:"Pizza",Price:300,Image:Pizza},{Title:"P1",Price:300,Image:IceCream},{Title:"P2",Price:300,Image:Burger},{Title:"P3",Price:300,Image:Pizza}];
  return {
    props: {
      Menu,
      Home,
      Food_Details,
    },
  };
}

const Home: React.FC<{Home:string,Menu:string[],Food_Details:Food_Item[]}> = ({Home,Menu,Food_Details}) => {
  type ObjectFit = 'contain'|'fill';
  type Position = 'relative'|'absolute'|'static'|'fixed';
  const [ComponentRendered,setComponentRendered] = useState(false);
  const [clickedAdd,setClickedAdd] = useState(Array(Food_Details.length).fill(false));
  const [prices,setprices] = useState<number[]>(Array(Food_Details.length).fill(0));
  const [quantity,setQuantity] = useState<number[]>(Array(Food_Details.length).fill(0));
  const [openCartin,setOpenCartin] = useState(false);
  const [animate,setanimate] = useState(false);
  const [openCart,setOpenCart] = useState(false);
  const [total,settotal] = useState(0);
  const [openmenu,setopenmenu] = useState(false);
  const [searchbar,setsearchbar] = useState(false);
  const [searchquery,setsearchquery] = useState("");
  const [filtereddata,setfiltereddata] = useState('');
  const [items,setitems] = useState(Array(Food_Details.length).fill(''));
  const [marginTop,setmarginTop] = useState('25%');
  const [isSticky,setisSticky] = useState(false);
  const [itemdata,setitemdata] = useState<ItemsData[]>([]);
  const dispatch = useDispatch();
  let newQuantityState:number[] = [];
  let newButtonState:Boolean[]= [];
  let newQuantityStateL:number[] = [];
  let newItemsState:string[] = [];
  let newIndex:number[]=[];
  let newItemsData:ItemsData[] = [];
  let newPriceState:number[] = [];
  const Items = useSelector((state:RootState)=>state.Order);
  const Titles = Food_Details.map((food)=>{return food.Title});
  useEffect(()=>{
    let UserSession = localStorage.getItem('user');
    if(UserSession==null){window.location.href = `/`}else{setComponentRendered(true)};
    if(Items.MovedfromCart){
    setClickedAdd(Items.clickedAdd);
    settotal(Items.Total);
    setitemdata(Items.ItemsObj);
    setOpenCart(Items.opencart);
    setOpenCartin(Items.opencartIn);
    newQuantityStateL = [...quantity];
    newQuantityState = Items.ItemsObj.map((i)=>{return i.Quantity});
    newIndex = Items.ItemsObj.map((i)=>{return i.Index});
    newIndex.forEach((i,index)=>{newQuantityStateL[i] = newQuantityState[index]})
    setQuantity(newQuantityStateL);}
    const handleScroll = ()=>{
      if(window.scrollY>45){setisSticky(true);setmarginTop('13%');}else{setisSticky(false);setmarginTop('25%')}
    }
    window.addEventListener('scroll',handleScroll);
  },[]);

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
    dispatch(addPrices(prices));
    dispatch(addItemsObj(itemdata.filter(i=>{return i.Quantity!=0})));
    dispatch(addButtonClick(clickedAdd));
    dispatch(opencartaction(openCart));
    dispatch(opencartInaction(openCartin));
  }

  const handleButtonClick = (index:number,Carddata:any) =>{
    setanimate(true);
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
  const IncreaseQuantity = (index:number,Price:number) =>{
    newItemsState = [...items];
    newQuantityState = [...quantity];
    newQuantityState[index]+=1;
    setQuantity(newQuantityState);
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
    const FilteredState = newQuantityState.filter((i)=>{return i!=(undefined||null)})
    let totalitems = FilteredState.reduce((itemq,c)=>{return itemq+c});
    settotal(prev=>prev-Price);
    setitemdata(prev=>prev.map((i)=>{
      if(i.Index===index){
        return {...i,Quantity:i.Quantity-1}
      }
      return i;
    }))
    if(totalitems==0){setOpenCartin(false);}
  }
  
  const Headers:React.FC<{name:string,mt:string,id:string}> = (name)=>{
    return(
      <div style={{marginTop:name.mt}} id={name.id}>
        <div className='rounded' style={{backgroundColor:"violet",borderRadius:"5",display:"block",width:"2%",height:"3%",position:"absolute"}}></div>
        <h2 className='ms-3' style={{fontWeight:'bolder'}}>{name.name}</h2>
      </div>
    )
  }
  const CardComponent:React.FC<{Title:string,Price:number,id:number,Image?:StaticImageData|null,Width:string,Imgdim?:string[],ml?:string,mt?:string,pos?:Position,bodyheight?:string,br:string,objectFit:ObjectFit}> = (Carddata)=>{
      return(
      <Card style={{width:Carddata.Width,overflowX:'scroll',flexShrink:0,scrollbarWidth:'none',paddingBottom:'2%',borderRadius:Carddata.br}} className='ms-2 mt-4' id={Carddata.Title}>
       <Image src={Carddata.Image!} alt="Food Image" style={{height:Carddata.Imgdim![0],width:Carddata.Imgdim![1],marginLeft:Carddata.ml,marginTop:Carddata.mt,position:Carddata.pos,objectFit:Carddata.objectFit}}/>
        <Card.Body style={{display:'block',paddingBottom:'1px',height:Carddata.bodyheight}}>  
         <Card.Title style={{fontWeight:'bold'}}>{Carddata.Title}</Card.Title>
          <Card.Text>Rs.{Carddata.Price}</Card.Text>
        </Card.Body>
        {clickedAdd[Carddata.id]? 
            <div className={`d-flex flex-row rounded-3 justify-content-center gap-2 shadow-lg ${animate?'animate__animated animate__pulse':''}`} style={{width:'35%',backgroundColor:'#EFCDF4',marginLeft:'60%',border:'1px solid purple',display:'inline',fontWeight:"bold",marginBottom:'5px',borderColor:'purple',borderWidth:'1px',zIndex:'100'}}>
              <button className='rounded' onClick={()=>{DecreaseQuantity(Carddata.id,Carddata.Price)}} style={{width:'20px',fontSize:'20px',height:'20px',display:'contents',fontWeight:'bold'}}>-</button>
              <div style={{display:'inline',fontSize:'20px'}}>{quantity[Carddata.id]}</div>
              <button className='rounded-lg ms-2' style={{width:'20px',fontSize:'20px',height:'20px',display:'contents',fontWeight:'bold'}} onClick={()=>{IncreaseQuantity(Carddata.id,Carddata.Price)}}>+</button></div>
            :<Button size='sm' variant='none' onClick={()=>{handleButtonClick(Carddata.id,Carddata)}} className='rounded-3 shadow-lg' style={{width:'35%',backgroundColor:'#EFCDF4',borderColor:'purple',borderWidth:'1px',marginLeft:'60%',marginBottom:'5px',zIndex:'100',fontWeight:'bolder'}}>ADD</Button>}
      </Card>
    )
  }
  
  const MenuComponent:React.FC<{Name:string,index:number}>=(Name)=>{
    return(
      <div key={Name.index} style={{backgroundColor:'black',color:'white',width:'100%',padding:'5px',marginTop:'0%',textDecoration:'none',zIndex:'999'}} className={`rounded animate__animated animate__slideInDown`}>
        <div className='ms-3' onClick={()=>{setopenmenu(false);}}><a href={`#${Name.Name}`} style={{textDecoration:'none',color:'white'}}><option>{Name.Name}</option></a></div>
      </div>
    )
  }

  return (
    <>{ComponentRendered?
      <div style={{height:"10vh"}}>
      {searchbar&&<div className='position-relative'><div className='animate__animated animate__zoomIn' style={{backgroundColor:'gray',width:'100%',height:'100%',position:'fixed',zIndex:'120',opacity:0.5}} onClick={()=>{setsearchbar(prev=>!prev);setsearchquery("")}}></div>
      <Form className='w-100'>
        <FormControl autoFocus placeholder='Search for your favorite food here' value={searchquery} onChange={(e)=>{searchHandler(e.target.value)}} className='rounded-pill shadow' style={{zIndex:'200',position:'fixed',width:'90%',marginLeft:'3%',marginTop:'25%',borderColor:'black'}}/> 
        <div className='rounded' style={{position:'fixed',backgroundColor:'white',zIndex:'200',marginTop:'35%',marginLeft:'5%',width:'80%'}}>
          <a href={`#${filtereddata}`} onClick={()=>{setsearchbar(prev=>!prev);setsearchquery("")}} style={{textDecoration:"none",color:'black'}}>
            <div>{searchquery!=""&&filtereddata}</div>
          </a>
        </div>
      </Form>
      </div>}
      <Container className="d-flex flex-column align-items-center h-100">
      {openCart&&<div className={openCartin?"animate__animated animate__fadeInUp rounded-3 shadow-lg":"animate__animated animate__slideOutDown rounded-3 shadow-lg"} style={{backgroundColor:'lightgreen',position:'fixed',bottom:6,zIndex:'110',width:'93%',height:'5%',animationDuration:'1s'}}>
        <p className='ms-2 fw-bold ms-5 mt-2'>Total:<span className='' style={{marginLeft:'50%'}}>Rs {total}</span></p>
      </div> }
      <h1  style={{ margin: '1%', fontWeight: 'bolder', fontSize: '30px', position: 'absolute' }}>{Home}</h1>
      <button style={{position:'absolute',display:'contents'}} onClick={()=>{localStorage.removeItem('user');window.location.href = '/'}}>{<Image src="./static/logout.svg" alt="logout" width="30" height="40" style={{marginLeft:'80%',marginTop:'1%',position:'absolute'}}/>}</button>
      <ButtonGroup className={`gap-5 ${isSticky?'position-fixed mt-0':'mt-5'}`} style={{width:'100%',backgroundColor:'#EFCDF4',padding:'5px',border:'1px solid purple',borderColor:'purple',zIndex:'999'}}>
        <Button variant="outline-dark" className='rounded-3' onClick={()=>{setsearchbar(prev=>!prev)}}>{<Image src="./static/search.svg" alt="search" width="50" height="50" style={{width:"70%",height:"50%"}}/>}</Button>
        <Button variant='outline-dark' className='rounded-3' id="menu-button" onClick={()=>{setopenmenu(prev=>!prev)}}>{<Image alt="menu" src="./static/menu.svg" width="50" height="50" style={{width:"50%",height:"70%",position:'relative'}}/>}Menu</Button>
        <Link href='/cart'><Button variant="outline-dark" className='rounded-3' onClick={()=>{MoveToCartPage()}}>{<Image alt="cart" src="./static/cart.svg" width="50" height="50" style={{width:"50%",height:"50%",fontWeight:'bold'}}/>}Cart</Button></Link>
      </ButtonGroup>
      {openmenu&&<div style={{position:'fixed',marginTop,zIndex:'999'}}>{Menu.map((i,index)=>{return (<MenuComponent Name={i} index={index}/>)})}</div>}
      </Container>
      <Headers name={Menu[0]} mt="8%" id={Menu[0]}/>
      <div className='d-flex flex-row align-items-stretch overflow-scroll' style={{scrollbarWidth:'none'}}>
        {Food_Details.map((food_item,index)=>{return(<CardComponent Title={food_item.Title} bodyheight='20%' Price={food_item.Price} id={index} Image={food_item.Image} key={index} Width='50%' Imgdim={['50%','100%']} ml="0" mt="0" pos='relative' br="0 0 15px 15px" objectFit="fill"/>)})}
      </div>
      <Headers name={Menu[1]} mt="10%" id={Menu[1]}/>
      <div style={{paddingBottom:'15%'}}>
      {Food_Details.map((food_item,index)=>{return(<CardComponent Title={food_item.Title} bodyheight='20%' Price={food_item.Price} id={index} Image={food_item.Image} key={index} Width='96%' Imgdim={['50%','48%']} ml="53%" mt="5%" pos='absolute' br="15px" objectFit="contain"/>)})}
      </div>
    </div>:<Loader/>}</>
  )
}

export default Home;