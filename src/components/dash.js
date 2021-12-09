
import styled from "styled-components";
import { useEffect } from "react";
import { database } from "../firebase"
import { Link } from "react-router-dom";
export default function Dashboard(){


    useEffect(async()=>{

        let Doctors = await database.Doctors.get();
        console.log(Doctors);
    },[])
    return(
        <Container>

<Link to="/login" style={{textDecoration:"none",color:"black"}}><Button>Doctor Login</Button></Link>
<Link to="/login" style={{textDecoration:"none",color:"black"}}><Button>Patient Login</Button></Link>
        </Container>
    )
}


const Button = styled.div`
    border-radius: 15px;
    font-size: 20px;
    background: brown;
    width:200px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Container = styled.div`
    display: flex;
    width: 95%;
    height: 70vh;
    align-items: center;
    justify-content: space-around;
    background-color: transparent;
    margin-top: 75px;
`