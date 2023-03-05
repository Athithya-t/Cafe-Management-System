import React from 'react';
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import  InputGroup  from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Alert, ProgressBar } from "react-bootstrap";
import Cafe from 'static/Cafe.jpg';
import Image from "next/image";
import 'animate.css';

const Login:React.FC=()=>{
    const [Name,setName] = useState("");
    const [MobileNo,setMobileNo] = useState("");
    const [ComponentRendered,setComponentRendered] = useState(false);
    const [sendError,setsendError] = useState(false);
    const submitHandler =()=>{
        if((MobileNo!="")&&(Name!="")){
        localStorage.setItem('user',JSON.stringify({Name,MobileNo}));
        window.location.href='/home';}
        else{
            setsendError(prev=>!prev);
        }
    }
    function Loader(){
        const [time,setTime] = useState(90);
        setTimeout(()=>{setTime(time+100)},5)
        return(<ProgressBar now={time}/>)
    }
    useEffect(()=>{
        setTimeout(()=>{setComponentRendered(true)},600);
        let UserSession = localStorage.getItem('user');
        console.log(UserSession);  
        if(UserSession !=null){window.location.href = `/home`}
    },[])
    return( 
        <>
            {ComponentRendered ?
            <> 
            <Form>
                <Image src={Cafe} alt="Cafe Image" style={{width:'95%',height:'50%'}}/>
                {sendError&&<div className="animate__animated animate__flash"><Alert variant="danger" style={{width:'100%'}} className="animate__animated animate__headShake">Please enter your Name and Mobile No to proceed</Alert></div>}
                <InputGroup className="d-flex flex-column align-items-center gap-2" hasValidation>
                    <h1>Scan! Order! Chill!</h1>
                    <Form.Label>Enter Name</Form.Label>
                    <Form.Control placeholder="Name" className="w-75 rounded-pill p-3" required onChange={(e)=>{setName(e.target.value)}}></Form.Control>
                    <Form.Label>Enter Mobile No</Form.Label>
                    <Form.Control placeholder="Mobile No" className="w-75 rounded-pill p-3" required onChange={(e)=>{setMobileNo(e.target.value)}}></Form.Control>
                    {MobileNo.match(/[a-z]/)&&<Form.Text style={{color:"red"}}>Mobile Number must contain numbers from 0-9</Form.Text>}
                    <Button className="rounded-pill p-2" variant="success" onClick={submitHandler}>Submit</Button>
                </InputGroup>
            </Form>
            </>:<div>
                <h1>Loading</h1>
                <Loader/>
                </div>}
        </>
    )
}


export default Login;