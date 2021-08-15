import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import './signin.css';
import Button from '@material-ui/core/Button';

const SignIn = ({setSession,history,setFname,setLname,setHomeCompToShow,setFirstLogin}) => {

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  setHomeCompToShow(1);
  setFirstLogin(false);

  async function fetchData(){
    try {
        let { data: profiles, error } = await supabase
        .from('profiles')
        .select('*');
        if (error) throw error
        console.log(profiles)
        if(profiles.length===0){
          setFirstLogin(true)
          setHomeCompToShow(0)
        } else {
          setFname(profiles[0].firstname)
          setLname(profiles[0].lastname)
        }
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        
    }
  }

  const handleLogin = async (email,password,history) => {
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      })
      if (error) throw error;
      //alert('Signin successful!!!!');
      setSession(session);
      fetchData();
      console.log('test');
      history.push("/home");
      console.log('try block',user,session);
    } catch (error) {
      alert(error.error_description || error.message)
      console.log('catch error block')
      setLoading(false)
    } finally {
      //setLoading(false)
      console.log('finally block')
    }
  }

  return (
    <div className='signinContainer'>
        <p>Enter Email</p>
        <input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{width:'100%', height:'30px',marginBottom:'25px', paddingLeft:'10px'}}
        />
      
        <p>Enter Password</p>
        <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{width:'100%', height:'30px',marginBottom:'25px', paddingLeft:'10px'}}
        />
        <div  style={{width:'100%'}}>       
            <Button 
                variant="contained" 
                color="secondary"
                size='small' 
                onClick={(e) => {
                    e.preventDefault()
                    handleLogin(email,password,history)
                }}
                disabled={loading}
                style={{color:'white', width:'100%'}}>
                    {loading ? <span>Loading</span> : <span>Sign In</span>}
            </Button>
        </div>
        <p style={{color:'#00ADB5', fontSize:'0.8rem', paddingTop:'10px'}}>Reset password</p>
    </div>
  )
}

export default SignIn;