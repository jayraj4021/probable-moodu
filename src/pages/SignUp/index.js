import { useState } from 'react'
import { supabase } from '../../supabaseClient'
import './signup.css';
import Button from '@material-ui/core/Button';

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSignUp = async (email,password) => {
    try {
      setLoading(true)
      const { user, session, error } = await supabase.auth.signUp({
        email,
        password
      })
      if (error) throw error
      alert('Check your email for the verification link!')
      console.log('try block',user,session)
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="signupContainer">
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

        <p>Confirm Password</p>
        <input
            type="password"
            placeholder="Your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{width:'100%', height:'30px',marginBottom:'25px', paddingLeft:'10px'}}
        />
      
        <div style={{width:'100%'}}>
            <Button 
                variant="contained" 
                color="secondary"
                size='small' 
                onClick={(e) => {
                    e.preventDefault()
                    handleSignUp(email,password)
                }}
                disabled={loading}
                style={{color:'white', width:'100%'}}>
                    {loading ? <span>Loading</span> : <span>Sign me up</span>}
            </Button>
        </div>
    </div>
  )
}

export default SignUp;