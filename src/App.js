import './App.css';

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Switch, Route, useHistory } from "react-router-dom";
import Header from './components/Header/Header'
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from './pages/Home';

function App() {
  
  let history = useHistory();
 
  const [session, setSession] = useState(null);

  useEffect(() => {
    // supabase.auth.session() returns session data if there is an active session
    setSession(supabase.auth.session());

    // supabase.auth.onAuthStateChange((_event, session) => {
    //   console.log('auth event', _event, session);
    //   setSession(session);
    // })
    
  }, []);
  
  console.log('App.js ---- session ----',session);

  return (
    <div className="App">
      {session ? 
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
          <Header session={session} setSession={setSession} history={history}/>
          <Switch>
              <Route path="/home" exact render={()=><Home/>}/>
          </Switch>
        </div>
        :
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
        
            <Header session={session} setSession={setSession} history={history}/>
            <Switch>
              <Route path="/" exact render={()=><LandingPage/>}/>
              <Route path="/signin" exact render={()=><SignIn setSession={setSession} history={history}/>}/>
              <Route path="/signup" exact render={()=><SignUp/>}/>
            </Switch>
          
        </div>
      }
    </div>
  );
}

export default App;
