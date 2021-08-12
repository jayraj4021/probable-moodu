import './App.css';

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { authProtectedRoutes, publicRoutes} from './routes';
import Header from './components/Header/Header'

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
            {authProtectedRoutes.map((apr,index)=>(<Route key={index} {...apr}></Route>))}
          </Switch>
        </Router>
        :
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
          <Router>
            <Header session={session}/>
            <Switch>
              {publicRoutes.map((pr,index)=>(<Route key={index} {...pr}></Route>))}
            </Switch>
          </Router>
        </div>
      }
    </div>
  );
}

export default App;
