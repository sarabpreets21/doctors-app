import "./style.css"
import { useEffect, useState } from "react"
import { database, storage} from "../firebase"
import { useAuth } from "../context/AuthContext"
import uuid from "react-uuid"
import { useNavigate } from 'react-router-dom';
import styled from "styled-components"

export default function Login(){


    const  {login}  = useAuth();


    const [email,setEmail] = useState("")
    const [password,setPass] = useState("")
    const [name,setName] = useState("")
    const [age,setAge] = useState("")
    const [gender,setg]  = useState("")
    const [time,setTime] = useState("")
    const [image,setImage] = useState("")
    const navigate = useNavigate()


    const handleSubmit =async(e)=>{

        try {
           
            let t1user = await login(email, password);
    

            navigate("/");
        } catch (error) {
            
            console.log(error.message.replace('Firebase: ', '').replace(/\(.*\)./, '').trim());
            
        }
    }
          

       
    const handleImage =(e)=>{
        
        let file = e?.target?.files[0];
        if(file!=null){
            setImage(file)
        }
    }

    const handleAll =(e)=>{
        
        
        let id = (e.target.id)
        

        if(id=="email"){
            setEmail(e.target.value)
        }

        else if(id=="password"){
            setPass(e.target.value)
        }
        


        
        
        
    }



    return(
        <Container>

                <Divi>
                
                <input type="email" id="email" placeholder="Email" style={{width:"45%",height:"40px",border:"1px solid lightgray",paddingLeft:'10px'}} onChange={handleAll} value={email} name="lastname" />
                
                <input type="password" id="password" placeholder="Password" style={{width:"45%",height:"40px",border:"1px solid lightgray",paddingLeft:'10px'}} onChange={handleAll} value={password} name="lastname" />
                </Divi>

                


               <Divi>
                <input type="submit" onClick={()=>{handleSubmit()}} value="Submit"/>
                </Divi>
                </Container>
    )
}

const Button = styled.button`
    width: 150px;
    border-radius: 15px;
    background: blue;
    color:white;
    height: 50px;
    border:none;


`
const Divi = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    padding: 0;
    background: transparent;
    justify-content: space-between;
    margin-bottom: 25px;
`
const Container = styled.div`
width: 100%;
background: white;
min-height: 40vh;
display: flex;
flex-direction: column;
padding-top: 50px;
position: relative;
margin: 0;
margin-left: auto;
margin-right: auto;
background-color: white;
align-items: center;
margin-top: 75px;
`