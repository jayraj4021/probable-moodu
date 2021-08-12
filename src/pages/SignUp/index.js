import { useState } from 'react'
import { supabase } from '../../supabaseClient'
import './signup.css';
import Button from '@material-ui/core/Button';

const SignUp = () => {

  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showMessage, setShowMessage] = useState(false)

  const handleSignUp = async (email,password,confirmPassword) => {
    if(password===confirmPassword) {
        try {
          setLoading(true)
          const { user, session, error } = await supabase.auth.signUp({
            email,
            password
          })
          if (error) throw error
          // alert('Check your email for the verification link!')
          setShowMessage(true)
          console.log('try block',user,session)
        } catch (error) {
          alert(error.error_description || error.message)
        } finally {
          setLoading(false)
        }
    } else {
      alert('Password does not match re-entered password !!!!')
    } 
  }

  return (
    <>
    {showMessage ? 
      <div className="signupContainer">
        <div>Please check your email for verification Link 🙏</div>
      </div>
    :
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

          <p>Re-enter Password</p>
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
                      handleSignUp(email,password,confirmPassword)
                  }}
                  disabled={loading}
                  style={{color:'white', width:'100%'}}>
                      {loading ? <span>Sending Verification Mail 📧</span> : <span>Sign me up</span>}
              </Button>
          </div>
      </div>
    }
    </>
  )
}

export default SignUp;