import { useState } from "react"

import styled from "styled-components"
import {  useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext";





const SignIn = () => {
    
    const {SignInUser,
        fname,
        currentUser,
        handleChange} = useContext(UserContext)
        //online import useHistory history.push (/)
        return (<div>
            <Div>
            <form onSubmit={SignInUser}>
                <Input type="email" 
                placeholder="Email" 
                value={fname.email} 
                onChange={(e)=> handleChange("email" , e.target.value)} /><br></br>
                <Input type="password" 
                placeholder="Password" 
                value={fname.password} 
                onChange={(e)=> handleChange("password" , e.target.value)} /><br></br>
                <Button>Sign In</Button>
                </form>
            </Div>
        </div>)
    }

const Div = styled.div`
padding:50px;
margin-left:40%;
/* height: 50vh; */
display:block;
font-size:30px;
background-color:rgba(104, 85, 0, 0.3);
font-weight:bold;
position:absolute;
text-align:center;
bottom:0;
left:0;
padding-bottom:50px;
margin-bottom:200px;
border:1px solid white;
border-radius:10px;
`;

const Input = styled.input`
padding:5px;
margin:5px;
width: 100%;
max-height: 100vh;
border:none;
`;

const Button = styled.button`
width: 100%;
max-height: 100vh;
background-color:blue;
padding:5px;
color:white;
border:none;
`;

    export default SignIn