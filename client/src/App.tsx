import "./App.css";
import "./index.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./themes/theme";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/useAuthContext";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import Navbar from "./components/Navbar/NavBar";
import Divers from "./pages/Divers/Divers";
import Analytics from "./pages/Analytics/Analytics";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/AdminTest/Admin";
import RegisterDiver from "./pages/Admin/RegisterDiver/RegisterDiver";
import DiverDetails from "./pages/DiverDetails/DiverDetails";
import UpdateProfile from "./pages/UpdateProfile/UpdateProfile";
import UpdateDiver from "./pages/Admin/UpdateDiver/UpdateDiver";

function App(): JSX.Element {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AuthProvider>
                    <CssBaseline />
                    {/* <Navbar /> */}
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route element={<ProtectedRoute />}>
                            <Route path="/divers" element={<Divers />} />
                            <Route path="/diver-details/:diverId" element={<DiverDetails />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/update-profile" element={<UpdateProfile />} />
                        </Route>
                        <Route element={<AdminRoute />}>
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/register" element={<RegisterDiver />} />
                            <Route path="/update-diver/:diverId" element={<UpdateDiver />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
