import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import categories from './data/categories';
import Category from './components/Category';
import Navbar from './components/Navbar';
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
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="dark"
      />
      <ThemeProvider theme={theme}>
        <Navbar></Navbar>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {categories.map(category => <Route path={"/" + category} element={<Category name={category} ></Category>} ></Route>)}
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
