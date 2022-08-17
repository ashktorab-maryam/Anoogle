import { useContext, useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { useHistory } from "react-router-dom";
import styled from "styled-components"
import { UserContext } from "../../UserContext"




// const formData={
//     givenName:"",
//     surname:"",
//     email:""
// }
const Profile = () => {
    // const history = useHistory();
    const {
        fname,
        setFname,
        currentUser,
        setCurrentUser,
        logOut,
        handleChange} = useContext(UserContext)
        const navigate = useNavigate();

    // const [fname, setFname] = useState({...formData})  

    // const [currentUser, setCurrentUser]= useState(JSON.parse(sessionStorage.getItem('user')))
    // const handleChange = (name,value) => {
    //     // setFname(e.target.value)
    //     setFname({...fname,[name]:value })
    // } 

    useEffect(() => {
       setFname(currentUser)
    }, [])

    const  UpdateUser = (ev) => {
        ev.preventDefault()
        // setFname(formData)
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
                // history.push("/confirmed")
            })
        } 

        const  DeleteUser = (ev) => {
            ev.preventDefault()
            // setFname(formData)
            fetch(`/api/delete-user/${currentUser._id}`, {
                
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    logOut()
                    navigate("/")
                    // setCurrentUser(data.data)
                    // sessionStorage.setItem('user', JSON.stringify(data));
                    // history.push("/confirmed")
                })
            }
        if (!currentUser) return <p>loading</p>
        //online import useHistory history.push (/)
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
/* width:100px; */
/* margin-left:50%; */
display:block;
font-size:30px;
/* background-color:rgba(204, 85, 0, 0.3);
font-weight:bold;
position:absolute;
text-align:center;
bottom:0;
left:0;
padding-bottom:10px;
border:1px solid var(--color-alabama-crimson);
border-radius:10px; */
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