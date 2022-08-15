import { useState } from "react"
// import { useHistory } from "react-router-dom";
import styled from "styled-components"




const formData={
    givenName:"",
    surname:"",
    email:""
}
const SignIn = () => {
    // const history = useHistory();

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
                setCurrentUser(data.data)
                sessionStorage.setItem('user', JSON.stringify(data));
                // history.push("/confirmed")
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
                <Input type="text" 
                placeholder="Email" 
                value={fname.email} 
                onChange={(e)=> handleChange("email" , e.target.value)} /><br></br>
            <Button >Confirm</Button>
            </form>
            </Div>
        </div>)
    }

const Div = styled.div`
padding:50px;
margin-left:50%;
display:block;
font-size:30px;
background-color:rgba(204, 85, 0, 0.3);
font-weight:bold;
position:absolute;
text-align:center;
bottom:0;
left:0;
padding-bottom:10px;
border:1px solid var(--color-alabama-crimson);
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
background-color:#cc5500;
padding:5px;
color:white;
border:none;
`;

    export default SignIn