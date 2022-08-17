import { useContext, useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../../UserContext"


const Profile = () => {
    const {
        fname,
        setFname,
        currentUser,
        setCurrentUser,
        logOut,
        handleChange} = useContext(UserContext)
        const navigate = useNavigate();

    useEffect(() => {
       setFname(currentUser)
    }, [])

    const  UpdateUser = (ev) => {
        ev.preventDefault()
        fetch("/api/update-user", {
            
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...fname})})
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setCurrentUser(data.data)
                localStorage.setItem('user', JSON.stringify(data.data));
                window.alert("success")
            })
        } 

        const  DeleteUser = (ev) => {
            ev.preventDefault()
            fetch(`/api/delete-user/${currentUser._id}`, {
                
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    logOut()
                    navigate("/")
                })
            }
        if (!currentUser) return <p>loading</p>
        return (<div>
            <div>
            <form onSubmit={UpdateUser}>
            
                <Input type="text" 
                placeholder="First name" 
                value={fname.givenName} 
                onChange={(e)=> handleChange("givenName" , e.target.value)} /><br></br>
                <Input type="text" 
                placeholder="Last name" 
                value={fname.surname} 
                onChange={(e)=> handleChange("surname" , e.target.value)} /><br></br>
                <Input type="text" 
                placeholder="Email" 
                disabled={true}
                value={currentUser.email} 
                onChange={(e)=> handleChange("email" , e.target.value)} /><br></br>
            <Button >Edit</Button>
            </form>
            </div>
            <Div>
            <form onSubmit={DeleteUser}>
            <Button >Delete Account</Button>
            </form>
            </Div>
            <Div>
            <form onSubmit={logOut}>
            <Button >Log out</Button>
            </form>
            </Div>
        </div>)
    }

const Div = styled.div`
padding:5px;
display:block;
font-size:30px;
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

    export default Profile