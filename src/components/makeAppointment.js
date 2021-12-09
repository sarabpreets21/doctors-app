import styled from "styled-components";
import { useEffect,useState } from "react";
import { database } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function Makeappointment(){

    let  Docs=[]
    const [array,set] = useState([])
    const {currentUser} = useAuth()
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [no,setNo] = useState("")
    const [msg,setMsg] = useState("")

    const handleClick =async(e)=>{

        if(currentUser){
            console.log(currentUser.uid);
            let user = await database.Users.doc(currentUser.uid).get();
            console.log(user.exists);
            if(user.exists!= false ){
                let namee = document.getElementById("choice").value;
                
                if(user.data().Patient){
                    let doctor = await database.Doctors.doc(namee.split(" ")[0]).get();
                    console.log(doctor.data());
                     let appointmentsD = doctor.data().appointments;
                     let appointmentsU = user.data().appointments
                     console.log(appointmentsD);
                    console.log(namee.split(" ")[1]);
                    
                    let obj={}
                    obj.name = name
                    obj.email = email
                    obj.number = no
                    obj.doctor = namee.split(" ")[1]
                    obj.message = msg
                    obj.uid= currentUser.uid
                    console.log(obj);
                    appointmentsD.push(obj)
                    appointmentsU.push(obj)
                    await database.Doctors.doc(namee.split(" ")[0]).update({
                        appointments:appointmentsD
                    })

                    await database.Users.doc(currentUser.uid).update({
                        appointments:appointmentsU
                    })
                    console.log("success");
                    setEmail("")
                    setName("")
                    setMsg("")
                    setName("")
                    setNo("")

                    alert("Appointment Added!")


                }

                else{
                    alert("please login as patient or signup")
                }
                
            }
            else{
                alert("please login as patient or signup")
            }
        }
        else{
            alert("please login as patient or signup")
        }
    }

    const handleNo =(e)=>{
        setNo(e.target.value)
    }
    const handleName =(e)=>{
        setName(e.target.value)
    }
    const handleEmail =(e)=>{
        setEmail(e.target.value)
    }

    const handleMsg =(e)=>{
        setMsg(e.target.value)
    }
    useEffect(async()=>{

        let doctors =await database.Doctors.get()
        doctors.forEach(async(entry)=>{
            let dat = await entry.data()
            //console.log(dat.name);
            await Docs.push(dat.name)

        })
        set(Docs)
        console.log(array);
    },[])
    return(
        <Container>

            <span style={{fontSize:"35px",marginBottom:"60px",}}>Make an Appointment</span>
            <Divi>
                <input onChange={handleName} value={name} placeholder="FullName" style={{width:"45%",height:"40px",border:"1px solid lightgray",paddingLeft:'10px'}}></input>
                <input onChange={handleEmail} value={email} placeholder="Email" style={{paddingLeft:'10px',width:"45%",height:"40px",border:"1px solid lightgray"}}></input>
            </Divi>

            <Divi>
                    <select id="choice">
                        {/* {Docs.map(function(name){
                            console.log(name);
                            return(
                                <option value="Dr.Ravi">Ravi</option>
                            )
                        })} */}
                        <option value="XbT44hIt12edvzCoNrOQeEvv3GO2 Dr.Ravi">Dr.Ravi</option>
                        <option value="lQnU8LfffcPfCEcHxQ7cRv8qKAC3 Dr.Michael">Dr.Michael</option>
                        <option value="e2M0PaaKhGfXFnHKZbtWZvaVXCs1 Dr.Shanon">Dr.Shanon</option>
                        <option value="uyBtLBzS3zb1Nrsu0WpnZxfXNTi1 Dr.Franklin">Dr.Franklin</option>
                    
                    
                
                </select>
            </Divi>

            <Divi>
                <input value={no} onChange={handleNo} placeholder="Number" style={{width:"100%",paddingLeft:'10px',height:"40px",border:"1px solid lightgray"}}></input>
               
            </Divi>

            <Divi>
                <input value={msg} onChange={handleMsg} placeholder="Enter Message" style={{width:"100%",paddingLeft:'10px',height:"140px",border:"1px solid lightgray"}}></input>
               
            </Divi>

            <Divi>
                <Button onClick={handleClick}>Book Appointment</Button>
            </Divi>


        </Container>
    )
}

const Button = styled.button`
    width: 150px;
    border-radius: 15px;
    background: #00D9AD;
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
`