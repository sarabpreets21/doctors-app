import styled from "styled-components";
import lgo from "../images/Untitled.png"
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar(){


    const {currentUser} = useAuth()
    const {logout } = useAuth()
    return(
        <Navbarr>
             <Link to="/" style={{textDecoration:"none",color:"lightgreen"}}><img src={lgo} /></Link>

        <Sdiv>
           <Link to="/" style={{textDecoration:"none",color:"lightgreen"}}> <Title>Home</Title></Link>
           <Link to="/doctors" style={{textDecoration:"none",color:"lightgreen"}}> <Title>Doctors</Title></Link>
           {currentUser?<div style={{padding:"0",margin:"0",height:"100%",background:"transparent",display:"flex",alignItems:"center"}}><Link to="/appointments" style={{textDecoration:"none",color:"lightgreen",marginRight:"15px"}}><Button>Appointments</Button></Link> <Button onClick={logout}>Logout</Button></div>
          
           :<Link to="/login" style={{textDecoration:"none",color:"lightgreen"}}><Button>Login/Signup</Button></Link>}
        </Sdiv>
            </Navbarr>
    )
}
const Button = styled.button`
    width: 150px;
    border-radius: 15px;
    background: lightgreen;
    color:black;
    height: 40px;
    border:none;
    font-size: 18px;


`
const Title = styled.span`
    color: lightgreen;
    margin-right: 25px;
    height: 100%;
    padding: 0;
    font-size: 22px;
    display: flex;
    align-items: center;

`
const Sdiv  =styled.div`
    height:100%;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: transparent;

`

const Navbarr = styled.div`
position: fixed;
top: 0;
left: 0;
width:100%;
height:75px;
background-color: white;
display: flex;
padding: 0;
margin: 0;
justify-content: space-around;
align-items: center;
z-index:55;

`