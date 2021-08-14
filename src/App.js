import './App.css';

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Switch, Route, useHistory } from "react-router-dom";
import Header from './components/Header/Header'
import LandingPage from "./pages/LandingPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from './pages/Home';
import CreateProfile from './components/CreateProfile/CreateProfile';

function App() {
  
  let history = useHistory();
  const menuItems = [
    {id:0, name:"Profile"},
    {id:1, name:"Today's Note"},
    {id:2, name:"Previous Entries"},
    {id:3, name:"Analytics"},
  ]
 
  const [session, setSession] = useState(null);
  const [homeCompToShow, setHomeCompToShow] = useState(1);
  const [profileReady, setProfileReady] = useState(false);

  useEffect(() => {
    // supabase.auth.session() returns session data if there is an active session
    setSession(supabase.auth.session());
    
  }, []);
  
  // console.log('App.js ---- session ----',session);

  return (
    <div className="App">
      {session ? 
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
          <Header session={session} setSession={setSession} history={history} homeCompToShow={homeCompToShow} setHomeCompToShow={setHomeCompToShow} menuItems={menuItems}/>
          <Switch>
              <Route path="/" exact render={()=><Home homeCompToShow={homeCompToShow}/>}/>
              <Route path="/home" exact render={()=><Home homeCompToShow={homeCompToShow}/>}/>
              <Route path="/profile" exact render={()=><CreateProfile history={history}/>}/>
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
