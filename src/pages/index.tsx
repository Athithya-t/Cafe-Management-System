import React from 'react';
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import  InputGroup  from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Alert, ProgressBar } from "react-bootstrap";
import Cafe from 'static/Cafe.jpg';
import Image from "next/image";
import 'animate.css';
import { TailSpin } from 'react-loader-spinner';

export const Loader:React.FC = ()=>{
    return(
        <div className='d-flex flex-column align-items-center'>
            <h1 style={{marginTop:'40%'}}>Loading</h1>
            <TailSpin height="30%" width="30%" color="purple" radius="1" visible={true} wrapperStyle={{marginLeft:'40%'}}/>  
        </div>
    )
}

const Login:React.FC=()=>{
    const [Name,setName] = useState("");
    const [MobileNo,setMobileNo] = useState("");
    const [ComponentRendered,setComponentRendered] = useState(false);
    const [sendError,setsendError] = useState(false);
    const Formlabel = {fontWeight:'bold',fontSize:'20px',marginTop:'3%'}
    const submitHandler =async()=>{
        if((MobileNo!="")&&(Name!="")){
        localStorage.setItem('user',JSON.stringify({Name,MobileNo}));
        window.location.href='/home';}
        else{
            setsendError(prev=>!prev);
        }
        /*try {
            console.log(Name,MobileNo);
            const response = await fetch('http://127.0.0.1:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'name': Name, 'mobileno': MobileNo})
            });
            const resdata = await response.json();
            console.log(resdata);
        } catch (err) {
            console.log(err);
        } */       
    }
    useEffect(()=>{
        const fetchdata = async()=>{
            try{
                const response = await fetch('http://127.0.0.1:8000/kitchen/category');
                const jsondata = await response.json();
                console.log(jsondata);
            }
            catch(err){
                console.log(err); 
            }
        };
        fetchdata();
        setTimeout(()=>{setComponentRendered(true)},600);
        let UserSession = localStorage.getItem('user');
        console.log(UserSession);  
        if(UserSession !=null){window.location.href = `/home`}
    },[])
    return( 
        <>
            {ComponentRendered ?
            <> 
            <Form className='d-flex flex-column align-items-center'>
                <Image src={Cafe} alt="Cafe Image" style={{width:'75%',height:'30%'}}/>
                {sendError&&<div className="animate__animated animate__flash"><Alert variant="danger" style={{width:'100%'}} className="animate__animated animate__headShake">Please enter your Name and Mobile Number to proceed</Alert></div>}
                <InputGroup className="d-flex flex-column align-items-center gap-2" hasValidation>
                    <h1>Scan! Order! Chill!</h1>
                    <Form.Label style={Formlabel}>Enter Name</Form.Label>
                    <Form.Control placeholder="Name" className="w-75 rounded-4 p-3" required onChange={(e)=>{setName(e.target.value)}}></Form.Control>
                    <Form.Label style={Formlabel}>Enter Mobile No</Form.Label>
                    <Form.Control placeholder="Mobile No" className="w-75 rounded-4 p-3" required onChange={(e)=>{setMobileNo(e.target.value)}}></Form.Control>
                    {MobileNo.match(/[a-z]/)&&<Form.Text style={{color:"red"}}>Mobile Number must contain numbers from 0-9</Form.Text>}
                    <Button className="rounded-4" variant='none' style={{backgroundColor:'purple',color:'white',marginTop:'3%',padding:'10px'}} onClick={submitHandler}>Submit</Button>
                </InputGroup>
            </Form>
            </>:<Loader/>}
        </>
    )
}


export default Login;