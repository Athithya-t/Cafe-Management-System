import React, { useEffect } from 'react'
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
import { addItems, addNoofItems, addTotal } from '../../OrderSlice';
import 'animate.css';

const Home:React.FC = () => {
  const sum:number=0;
  type Food_Item={Title:string,Price:number,Image:StaticImageData}
  type Button_Item={IconName:string,BText:string|null,action:Function|null|void}
  const Food_Details:Food_Item[] = [{Title:"Ice cream",Price:120,Image:IceCream},{Title:"Burger",Price:240,Image:Burger},{Title:"Pizza",Price:300,Image:Pizza}]
  const [clickedAdd,setClickedAdd] = useState(Array(Food_Details.length).fill(false));
  const [quantity,setQuantity] = useState(Array(Food_Details.length).fill(0));
  const [displayMenu,setdisplayMenu] = useState(false);
  const [openCartin,setOpenCartin] = useState(false);
  const [openCart,setOpenCart] = useState(false);
  const [total,settotal] = useState(0);
  const [noofitems,setnoofitems] = useState(0);
  const [searchbar,setsearchbar] = useState(false);
  const Items = useSelector((state:RootState)=>state.Order);
  console.log(Items);
  const dispatch = useDispatch();
  const handleButtonClick = (index:number,Carddata:any) =>{
    const newButtonState = [...clickedAdd];
    newButtonState[index]=true;
    setClickedAdd(prev=>newButtonState);
    console.log(clickedAdd);
    const newQuantityState = [...quantity];
    newQuantityState[index]++;
    settotal(prev=>prev+Carddata.Price);
    setnoofitems(prev=>prev+1);
    setQuantity(newQuantityState);
    setOpenCart(true);
    setOpenCartin(true);  
  }
  const IncreaseQuantity = (index:number,Price:number) =>{
    const newQuantityState = [...quantity];
    newQuantityState[index]++;
    setQuantity(newQuantityState);
    setOpenCartin(true);
    setnoofitems(prev=>prev+1);
    settotal(prev=>prev+Price);
  }

  const DecreaseQuantity = (index:number,Price:number) =>{
    const newQuantityState = [...quantity];
    const newButtonState = [...clickedAdd];
    newQuantityState[index]--;
    setnoofitems(prev=>prev-1);
    settotal(prev=>prev-Price); 
    if(noofitems==1){setOpenCartin(prev=>!prev);setClickedAdd(prev=>[!newButtonState[index],...prev])};
    setQuantity(newQuantityState);
  }
  
  const Headers:React.FC<{name:string,mt:string}> = (name)=>{
    return(
      <div style={{marginTop:name.mt}}>
        <div className='rounded' style={{backgroundColor:"violet",borderRadius:"5",display:"block",width:"2%",height:"3%",position:"absolute"}}></div>
        <h2 className='ms-3'>{name.name}</h2>
      </div>
    )
  }
  const CardComponent:React.FC<{Title:string,Price:number,id:number,Image:StaticImageData,Width:string,Imgdim:string[],ml:string,mt:string,pos:any,bodyheight:string}> = (Carddata)=>{
    return(
      <Card style={{width:Carddata.Width,overflowX:'scroll',flexShrink:0,scrollbarWidth:'none'}} className='ms-3 mt-4 p-2' id={Carddata.Title}>
       <Image src={Carddata.Image} alt="Food Image" style={{height:Carddata.Imgdim[0],width:Carddata.Imgdim[1],borderRadius:'5px 5px 0 0',marginLeft:Carddata.ml,marginTop:Carddata.mt,position:Carddata.pos}}/>
        <Card.Body style={{display:'block',paddingBottom:'1px',height:Carddata.bodyheight}}>  
         <Card.Title>{Carddata.Title}</Card.Title>
          <Card.Text>Rs.{Carddata.Price}</Card.Text>
        </Card.Body>
        {(quantity[Carddata.id]!=0&&clickedAdd[Carddata.id])?
            <div className='d-flex flex-row rounded-pill justify-content-center gap-3 shadow-lg animate__animated animate__pulse' style={{width:'35%',backgroundColor:'#BA68C8CC',marginLeft:'60%',display:'inline',fontWeight:"bold"}}>
              <button className='rounded-circle ms-2' style={{width:'20px',fontSize:'15px',height:'20px',display:'contents'}} onClick={()=>{IncreaseQuantity(Carddata.id,Carddata.Price)}}>+</button>
              <div style={{display:'inline',fontSize:'20px'}}>{quantity[Carddata.id]}</div>
            <button className='rounded-circle' onClick={()=>{DecreaseQuantity(Carddata.id,Carddata.Price)}} style={{width:'20px',fontSize:'15px',height:'20px',display:'contents'}}>-</button></div>
            :<Button size='sm' variant='none' onClick={()=>{handleButtonClick(Carddata.id,Carddata)}} className='rounded-pill  shadow-lg' style={{width:'35%',backgroundColor:'#BA68C8CC',marginLeft:'60%',fontWeight:"bold",marginTop:0}}>ADD</Button>}
      </Card>
    )
  }
  const SearchBar:React.FC=()=>{
    return(
      <Form className='w-100'>
      <FormControl placeholder='Search for your favorite food here' className='rounded-pill shadow' style={{zIndex:'200',position:'fixed',width:'90%',marginLeft:'3%',marginTop:'20%',borderColor:'black'}}/>
      {/* <div className='rounded' style={{position:'fixed',backgroundColor:'white',zIndex:'200',marginTop:'10%',marginLeft:'3%',width:'80%'}}>
        <ul>
          <li>Pizza</li>
          <li>Burger</li>
          <li>Ice Cream</li>
        </ul>
      </div> */}
    </Form>
    )
  }

  return (
    <div>
      {searchbar&&<div className='position-relative'><div className='animate__animated animate__zoomIn' style={{backgroundColor:'gray',width:'100%',height:'100%',position:'fixed',zIndex:'50',opacity:0.5}} onClick={()=>{setsearchbar(prev=>!prev)}}></div>
      <SearchBar/></div>}
    <Container className="d-flex flex-column align-items-center h-100">
    {openCart&& <div className={openCartin?"animate__animated animate__fadeInUp rounded-pill shadow-lg":"animate__animated animate__slideOutDown rounded-pill shadow-lg"} style={{backgroundColor:'pink',position:'fixed',bottom:6,zIndex:'20',width:'93%',marginLeft:'4%',height:'5%',animationDuration:'1s'}}>
      <p className='ms-2 fw-bold ms-5 mt-2'>Total:{total}</p>
    </div>}
    
    <ButtonGroup className='gap-5 position-fixed'>
         <Button variant="outline-dark" className='rounded-4 mt-3' onClick={()=>{setsearchbar(prev=>!prev)}}>{<i className="material-icons">search</i>}</Button>
        <Button variant='outline-dark' className='rounded-4 mt-3' onClick={()=>{setdisplayMenu(!displayMenu)}}>{<i className="material-icons">restaurant_menu</i>}Menu</Button>
        <Button variant="outline-dark" className='rounded-4 mt-3'>{<i className="material-icons">shopping_cart</i>}Cart</Button> 
        <Button onClick={()=>{dispatch(addNoofItems(noofitems));dispatch(addTotal(total))}}>Dispatch</Button> 
    </ButtonGroup>

    </Container>
    <Headers name="BestSellers" mt="20%"/>
    <div className='d-flex flex-row align-items-stretch overflow-scroll' style={{scrollbarWidth:'none'}}>
      {Food_Details.map((food_item,index)=>{return(<CardComponent Title={food_item.Title} bodyheight='20%' Price={food_item.Price} id={index} Image={food_item.Image} key={index} Width='50%' Imgdim={['50%','100%']} ml="0" mt="0" pos='relative'/>)})}
    </div>
    <Headers name="Starters" mt="10%"/>
    {Food_Details.map((food_item,index)=>{return(<CardComponent Title={food_item.Title} bodyheight='20%' Price={food_item.Price} id={index} Image={food_item.Image} key={index} Width='100%' Imgdim={['50%','45%']} ml="50%" mt="0%" pos='absolute'/>)})}
    </div>
  )
}

export default Home