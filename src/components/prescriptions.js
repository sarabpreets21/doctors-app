import styled from "styled-components";
import { useEffect ,useState} from "react";
import { useAuth } from "../context/AuthContext";
import { database } from "../firebase";
import { useNavigate } from 'react-router-dom';


export default function Prescriptions(){

let dataa;
    const {currentUser} = useAuth()
    const [data,setData] = useState([])
    const [state,setState] = useState(false)
    const navigate = useNavigate()

    useEffect(async()=>{
        
        if(currentUser){

        
            let user ;
            
                user = await database.Users.doc(currentUser.uid).get();
                dataa = user.data().prescriptions
                await setData(user.data().appointments)
                console.log(dataa);
                console.log(data);
            
            
            
        }
        else{
            navigate("/")
        }
    },[])


    return(

        <Container>
            {data.length==0?<h3>No Prescriptions</h3>:data.map(function(data){
                return(
                    <Divi>
                        
                <span>Doctor : {data.DrName}</span>
                <span>Prescription: {data.message}</span>
                
                
            </Divi>
                )
            })}
            

        </Container>
    )

}


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