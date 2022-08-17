import { useState } from "react"

import styled from "styled-components"
import {  useNavigate } from "react-router-dom";




const formData={
    givenName:"",
    surname:"",
    email:""
}
const SignUp = () => {
    const navigate = useNavigate();

    const [fname, setFname] = useState({...formData})  

    const [currentUser, setCurrentUser]= useState(JSON.parse(sessionStorage.getItem('user')))
    const handleChange = (name,value) => {
        // setFname(e.target.value)
        setFname({...fname,[name]:value })
    } 



    const  PostUser = (ev) => {
        ev.preventDefault()
        setFname(formData)
        fetch("/api/add-user", {
            
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...fname})})
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.status===201){
                    setCurrentUser(data.data)
                    sessionStorage.setItem('user', JSON.stringify(data));
                    navigate("/signin")
                }else{
                window.alert("User already signed up!")
            }
            })
        } 

        //online import useHistory history.push (/)
        return (<div>
            <Div>
            <form onSubmit={PostUser}>
            
                <Input type="text" 
                placeholder="First name" 
                value={fname.givenName} 
                onChange={(e)=> handleChange("givenName" , e.target.value)} /><br></br>
                <Input type="text" 
                placeholder="Last name" 
                value={fname.surname} 
                onChange={(e)=> handleChange("surname" , e.target.value)} /><br></br>
                <Input type="email" 
                placeholder="Email" 
                value={fname.email} 
                onChange={(e)=> handleChange("email" , e.target.value)} /><br></br>
                <Input type="password" 
                placeholder="Password" 
                value={fname.password} 
                onChange={(e)=> handleChange("password" , e.target.value)} /><br></br>
                <Button>Sign Up</Button>
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

    export default SignUp