import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FeedBackProvider } from './context/FeedBackContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={createTheme()}>
        <AuthProvider>
          <FeedBackProvider>
            <App />
          </FeedBackProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
