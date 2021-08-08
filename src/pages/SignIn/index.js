import { useState } from 'react';
import { supabase } from '../../supabaseClient';
import './signin.css';
import Button from '@material-ui/core/Button';

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (email,password) => {
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signIn({
        email,
        password,
      })
      if (error) throw error
      alert('Signin successful!!!!')
      console.log('try block',user,session)
    } catch (error) {
      alert(error.error_description || error.message)
      console.log('catch error block')
    } finally {
      setLoading(false)
      console.log('finally block')
    }
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      alert('SignOut successful!!!!')
    } catch (error) {
      alert(error.error_description || error.message)
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
                    handleLogin(email,password)
                }}
                disabled={loading}
                style={{color:'white', width:'100%'}}>
                    {loading ? <span>Loading</span> : <span>Sign In</span>}
            </Button>
        </div>
    </div>
  )
}

export default SignIn;