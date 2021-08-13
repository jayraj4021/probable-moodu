import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: ['Open Sans', 'sans-serif'].join(',')
  },
  palette:{
    primary:{
      main: '#393E46'
    },
    secondary:{
      main: '#00ADB5'
    }
  }
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
