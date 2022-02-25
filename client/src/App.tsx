import './App.css';
import './index.css';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './themes/theme';

import Navbar from './components/Navbar/NavBar'
import SignUp from './pages/SignUp/SignUp';

function App(): JSX.Element {
  return(
    <ThemeProvider theme={theme}>
    <Navbar />
    <SignUp />
    </ThemeProvider>
  );
};


export default App;
