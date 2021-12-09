import './App.css';
import { BrowserRouter } from "react-router-dom"
import { Routes as Switch } from "react-router-dom"
import { Route } from 'react-router-dom';
import Dashboard from './components/dash';
import Signup from './components/signup/signup';
import { AuthProvider } from './context/AuthContext';
import Doctors from './components/doctors';
import Makeappointment from './components/makeAppointment';
import Login from './components/login';
import Navbar from './components/navbar';
import Appointments from './components/appointments';
import Prescriptions from './components/prescriptions';

function App() {
  return (
    <div className="App" style={{height:"100%",padding:"0",margin:"0"}}>
      <AuthProvider>
        
      <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route exact path="/"  element={<Dashboard/>}/>
          <Route exact path="/signup"  element={<Signup/>}/>
          <Route exact path="/doctors"  element={<Doctors/>}/>
          <Route exact path="/appointment"  element={<Makeappointment/>}/>
          <Route exact path="/login"  element={<Login/>}/>
          <Route exact path="appointments"  element={<Appointments/>}/>
          <Route exact path="prescriptions"  element={<Prescriptions/>}/>
        </Switch>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
