import './App.css';

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Header from './components/Header/Header'
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from './pages/Home';

function App() {
  
  const [session, setSession] = useState(null);

  useEffect(() => {
    // supabase.auth.session() returns session data if there is an active session
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('auth event', _event, session);
      setSession(session);
    })
    
  }, []);
  
  console.log('App.js ---- session ----',session);

  return (
    <div className="App">
      {session ? 
        <Router>
          <Header session={session}/>
          <Switch>
              <Route path="/home" exact render={()=><Home/>}/>
          </Switch>
        </Router>
        :
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
          <Router>
            <Header session={session}/>
            <Switch>
              <Route path="/" exact render={()=><LandingPage/>}/>
              <Route path="/signin" exact render={()=><SignIn/>}/>
              <Route path="/signup" exact render={()=><SignUp/>}/>
            </Switch>
          </Router>
        </div>
      }
    </div>
  );
}

export default App;
