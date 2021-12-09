import styled from "styled-components";
import { useEffect ,useState} from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function Appointments(){


    const {currentUser} = useAuth()
    const [data,setData] = useState([])
    const [state,setState] = useState(false)
    const navigate = useNavigate()

    let dataa;

    const handlePres =async (e)=>{
        let duser = await database.Doctors.doc(currentUser.uid).get()
        let response = prompt("Enter prescription")
        let obj = {}
        obj.DrName = duser.data().name
        obj.message = response

        let uuser = await database.Users.doc(e.target.id).get()
        let prescriptions = uuser.data().prescriptions;
        prescriptions.push(obj)
        await database.Users.doc(e.target.id).update({
            prescriptions:prescriptions
        })
        alert("Prescription added")
    }
    
    useEffect(async()=>{

        if(currentUser){

        
        let user = await database.Doctors.doc(currentUser.uid).get();
        if(!user.exists){
            user = await database.Users.doc(currentUser.uid).get();
            dataa = user.data().appointments
            await setData(user.data().appointments)
            console.log(dataa);
            console.log(data);
        }
        else{
            setState(true)
            dataa = user.data().appointments
            await setData(user.data().appointments)
            console.log(dataa);
            console.log(data);   
        }
        
    }
    else{
        navigate("/")
    }
    },[])
    
    return(
        <Container>
            {!state?<Link style={{textDecoration:"none",color:"white"}} to="/prescriptions" ><Pres>View Prescriptions</Pres></Link>:""}
            {data.length==0?<h3>No Appointments</h3>:data.map(function(data){
                return(
                    <Divi>
                        {state?<Button onClick={handlePres} id={data.uid}>Add Prescription</Button>:""}
                <span>Doctor : {data.doctor}</span>
                <span>Patient: {data.name}</span>
                <span>Patient Email: {data.email}</span>
                <span>Patient Number: {data.number}</span>
                <span style={{maxWidth:"100%",}}>Patient Problem: {data.message}</span>
                
            </Divi>
                )
            })}
            

        </Container>
    )

}
const Pres = styled.button`
width: 150px;
    border-radius: 15px;
    background: #00D9AD;
    color:white;
    height: 50px;
    border:none;
    position: fixed;
    top: 100px;
    right: 35px;
`
const Button = styled.button`
    width: 150px;
    border-radius: 15px;
    background: #00D9AD;
    color:white;
    height: 50px;
    border:none;
    position: absolute;
    top: 10px;
    right: 15px;


`

const Container = styled.div`
width: 95%;
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

const Divi = styled.div`
    width: 60%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    padding: 25px;
    background: lightgray;
    justify-content: space-between;
    margin-bottom: 25px;
    min-height: 30vh;
    position: relative;
`