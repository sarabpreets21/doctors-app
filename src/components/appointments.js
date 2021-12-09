import styled from "styled-components";
import { useEffect ,useState} from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
export default function Appointments(){


    const {currentUser} = useAuth()
    const [data,setData] = useState([])

    let dataa;
    useEffect(async()=>{

        console.log(currentUser);
        let user = await database.Doctors.doc(currentUser.uid).get();
        if(!user.exists){
            user = await database.Users.doc(currentUser.uid).get();
            dataa = user.data().appointments
            await setData(user.data().appointments)
            console.log(dataa);
            console.log(data);
        }
        else{
            dataa = user.data().appointments
            await setData(user.data().appointments)
            console.log(dataa);
            console.log(data);   
        }
        
    },[])
    
    return(
        <Container>
            {data.length==0?<h3>No Appointments</h3>:data.map(function(data){
                return(
                    <Divi>
                <span>Doctor : {data.doctor}</span>
                <span>Patient: {data.name}</span>
                <span>Patient Email: {data.email}</span>
                <span>Patient Number: {data.number}</span>
                <span>Patient Problem: {data.message}</span>
                
            </Divi>
                )
            })}
            

        </Container>
    )

}


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
`