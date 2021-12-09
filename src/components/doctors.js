import styled from "styled-components";
import { useEffect,useState } from "react";
import { database } from "../firebase";
import Makeappointment from "./makeAppointment";

export default function Doctors(){


    let  Docs=[]
    const [array,set] = useState([])

    useEffect(async()=>{

        let doctors =await database.Doctors.get()
        doctors.forEach((entry)=>{
            let dat = entry.data()
            Docs.push(dat)

        })
        set(Docs)
        console.log(array);
    },[])

    return(
        <div style={{width:"100%",padding:"0",margin:"0"}}>
        <Container>
            {array.map(function(data){
                return(
                    <Modal>
                        <img style={{width:"100%",height:"80%"}} src={data.imageUrl}></img>
                        <span style={{display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"25px",fontSize:"20px",}}>{data.name}</span>
                    </Modal>
            )
            })}

        </Container>
        <Makeappointment>
            
        </Makeappointment>

        </div>

    )
    


}


const Modal = styled.div`
    max-width: 240px;
    aspect-ratio: 16/18;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background: white;
    padding: 0;
    border-radius: 10px;
    

`
const Container = styled.div`
    width: 80%;
    background-color: transparent;
    display: grid;
    grid-gap:25px;
    gap: 25px;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    min-height: 60vh;
    position: relative;
    margin-left: auto;
    margin-right: auto;
    margin-top: 75px;

`