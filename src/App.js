import './App.css';

import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { authProtectedRoutes, publicRoutes} from './routes';
import Header from './components/Header/Header'

function App() {
  
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, []);
  
  console.log('App.js ---- session ----',session);

  return (
    <div className="App">
      {session ? 
        <Router>
          <Switch>
            {authProtectedRoutes.map((apr,index)=>(<Route key={index} {...apr}></Route>))}
          </Switch>
        </Router>
        :
        <div style={{display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column'}}>
          <Router>
            <Header/>
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
