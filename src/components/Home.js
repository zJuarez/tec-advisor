import '../App.css';
import Navbar from './Navbar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Place from './Place';
import categories from '../data/categories';
import Divider from '@mui/material/Divider';

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

function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar></Navbar>
        <div className="feed">
          {categories.map(category => <div style={{ marginTop: 10, fontSize: 12, color: "gray" }}> <Divider> {category.toUpperCase()}</Divider> <Place></Place>
            <Place></Place> </div>)}
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Home;
