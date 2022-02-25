import "./App.css";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/NavBar";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";

function App(): JSX.Element {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
