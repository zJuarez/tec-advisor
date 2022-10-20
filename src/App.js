import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

// Or Create your Own theme:
const theme = createTheme({
  palette: {
    primary: {
      main: '#5065A8'
    },
    secondary: {
      main: '#C98CA7'
    }
  },
});

function App() {
  return (
    <Router>
    <ToastContainer/>
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/signup" element = {<Signup/>}/>
      </Routes>
      </div>
    </ThemeProvider>
    </Router>
  );
}

export default App;
