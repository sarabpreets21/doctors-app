import "./style.css"
import { useEffect, useState } from "react"
import { database, storage} from "../../firebase"
import { useAuth } from "../../context/AuthContext"
import uuid from "react-uuid"
import styled from "styled-components"

export default function Signup(){


    const  {signup}  = useAuth();


    const [email,setEmail] = useState("")
    const [password,setPass] = useState("")
    const [name,setName] = useState("")
    const [age,setAge] = useState("")
    const [gender,setg]  = useState("")
    const [time,setTime] = useState("")
    const [image,setImage] = useState("")
    


    const handleSubmit=async(e)=>{
        
        try{
            let userCredential = await signup(email, password);
            console.log(userCredential)

            let uid = userCredential.user.uid
            let ruid = uuid();
        const uploadListener = storage.ref("/users/"+ruid).put(image);
            uploadListener.on("state_changed",onprogress,onerror,onsucess);
            function onprogress(snapshot){
                let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                console.log(progress);
            }

            function onerror(err){
                console.log(err)
            }
            

            async function onsucess(){
                let downloadUrl = await uploadListener.snapshot.ref.getDownloadURL()
                

            if(document.getElementById("choice").value=="patient"){
                database.Users.doc(uid).set({
                    email: email,
                    name:name,
                    age:age,
                    gender:gender,
                    appointments:[],
                    Patient:true,
                    imageUrl:downloadUrl,
                    prescriptions:[]


                    

                    
                    
                })
                alert("User Signed Up!")
                setEmail("")
                    setName("")
                    setAge("")
                    setg("")
                    setImage("")
                    setPass("")
            }
            else{

                database.Doctors.doc(uid).set({
                    email: email,
                    name:name,
                    age:age,
                    gender:gender,
                    appointments:[],
                    Doctor:true,
                    imageUrl:downloadUrl
                    
                    
                })

                alert("User Signed Up!")
                setEmail("")
                    setName("")
                    setAge("")
                    setg("")
                    setImage("")
                    setPass("")
                    

            }

        }
        
    }
    catch(error) {
        // console.log(error);
        console.log(error.message.replace('Firebase: ', ''));
    }
}
    const handleImage =(e)=>{
        
        let file = e?.target?.files[0];
        if(file!=null){
            setImage(file)
        }
    }

    const handlePass =(e)=>{
        setPass(e.target.value)
    }
    const handleAge =(e)=>{
        setAge(e.target.value)
    }
    const handleName =(e)=>{
        setName(e.target.value)
    }
    const handleEmail =(e)=>{
        setEmail(e.target.value)
    }

    const handleGender =(e)=>{
        setg(e.target.value)
    }
    



    return(
        <Container>

                
            <Divi>
                <input onChange={handleName} value={name} placeholder="FullName" style={{width:"45%",height:"40px",border:"1px solid lightgray",paddingLeft:'10px'}}></input>
                <input onChange={handleEmail} value={email} placeholder="Email" style={{paddingLeft:'10px',width:"45%",height:"40px",border:"1px solid lightgray"}}></input>
            </Divi>

            <Divi>
                <input value={password} onChange={handlePass} placeholder="Password"  style={{width:"45%",height:"40px",border:"1px solid lightgray",paddingLeft:'10px'}}></input>
                <input onChange={handleAge} value={age} placeholder="age" style={{paddingLeft:'10px',width:"45%",height:"40px",border:"1px solid lightgray"}}></input>
            </Divi>

            <Divi>
                <input value={gender} onChange={handleGender} placeholder="Gender"  style={{width:"45%",height:"40px",border:"1px solid lightgray",paddingLeft:'10px'}}></input>
               
            </Divi>

                {/* <label for="lname">Password</label>
                <input type="password" id="password" onChange={handleAll} value={password} name="lastname" />

                <label for="lname">Name</label>
                <input type="text" id="name" onChange={handleAll} value={name} name="lastname" />

                <label for="lname">Age</label>
                <input type="text" id="age" onChange={handleAll} value={age} name="lastname" />

                <label for="lname">Gender</label>
                <input type="text" id="gender" onChange={handleAll} value={gender} name="lastname" /> */}

                <Divi>
                <label for="choice">Choose an option:</label>

                <select id="choice">
                    <option value="doctor">Doctor</option>
                    <option value="patient">Patient</option>
                
                </select>
                </Divi>
                <Divi>
                <label for="lname">Profile Pic</label>
                <input type="button" type="file" accept="image/*" onChange={handleImage} />

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