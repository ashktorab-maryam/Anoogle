import { createContext,useState } from "react";
import {  useNavigate } from "react-router-dom";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const formData={
        password:"",
        email:""
    }

    const navigate = useNavigate();

    const [fname, setFname] = useState({...formData})  
    const initialState= JSON.parse(localStorage.getItem('user'));

    const [currentUser, setCurrentUser]= useState( initialState!==null ? initialState : null)
    const handleChange = (name,value) => {
        // setFname(e.target.value)
        setFname({...fname,[name]:value })
    } 

    const logOut = () => {
        setCurrentUser(null)
        localStorage.clear()
        navigate("/")
    } 



    const  SignInUser = (ev) => {
        ev.preventDefault()
        setFname(formData)
        fetch("/api/signin", {
            
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...fname})})
            .then(res => res.json())
            .then(data => {

                console.log(data)
                if(data.status===201){   
                    setCurrentUser(data.data)
                    localStorage.setItem('user', JSON.stringify(data.data));
                    navigate("/")
                }else{
                    window.alert("User doesn't exist, you need to sign up first")
                }
            })
        } 


    return  (
        <UserContext.Provider value={{
            SignInUser,
            fname,
            setFname,
            currentUser,
            setCurrentUser,
            handleChange,
            logOut
        }}>
            {children}
        </UserContext.Provider>
    )

}