import {React, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { supabase } from '../../supabaseClient';
import { Link} from 'react-router-dom';
import './Header.css'

export default function Header({session,setSession,history,homeCompToShow,setHomeCompToShow,menuItems}) {

  const widthCheckQuery = useMediaQuery('(min-width:600px)');
  
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (menuItemId) => {
    setAnchorEl(null);
    setHomeCompToShow(menuItemId);
  };

  const StyledMenu = withStyles({
    paper: {
      backgroundColor: '#00ADB5',
      color:'white'
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));
  
  const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  }))(MenuItem);

  let toolBarClass = 'toolBar';
  if(widthCheckQuery){
    toolBarClass += ' bigScreenPadding'
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      //alert('SignOut successful!!!!')
      if (error) throw error;
      setSession(null)
      history.push('/');
    } catch (error) {
      alert(error.error_description || error.message)
    }
  }

  return (
    <div style={{width:'100%'}}>
        <div className={toolBarClass}>
          <Link to='/' style={{color:'white', textDecoration:'none'}}>
            <Typography variant="h6" >
              Moodu
            </Typography>
          </Link>
         {session ? 
            <div style={{display:'flex'}}>
              <div style={{marginRight:'20px'}}>
                <Button aria-controls="simple-menu" aria-haspopup="true"
                  onClick={handleClick} 
                  variant="contained"
                  color="secondary" 
                  size='small'
                  style={{color:'white'}}
                  >
                  Menu
                </Button>
                <StyledMenu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                    {menuItems.map((el,index)=>(
                        <StyledMenuItem key={index} onClick={()=>{handleClose(el.id)}} 
                        selected={el.id===homeCompToShow}>
                          {el.name}
                        </StyledMenuItem>
                    ))}
                </StyledMenu> 
              </div>
            <Button variant="contained" 
                    color="secondary" 
                    size='small' 
                    onClick={(e)=>{
                        e.preventDefault();
                        handleLogout()
                      }}
                    style={{color:'white'}} >
                      Sign Out
            </Button>
          </div>
         :
          <Link to="/signin">
            <Button variant="contained" 
                    color="secondary" 
                    size='small' 
                    style={{color:'white'}} >
                      Sign In
            </Button>
          </Link>
        }
        </div>
    </div>
  );
}
