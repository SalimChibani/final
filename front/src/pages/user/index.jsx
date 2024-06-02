import Sidebar from './components/global/Sidebar';
import Topbar from './components/global/Topbar';
import { Outlet } from 'react-router-dom';
import { useState } from "react";
import { ColorModeContext, useMode } from "../../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

const User = () => {
    const [theme, colorMode] = useMode();

    const [isSidebar, setIsSidebar] = useState(true);
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app" style={{ height: "100vh", display: "flex" }}>
                    <Sidebar isSidebar={isSidebar}  style={{ height: "100vh" }}  />
                    <main className="content">
                        <Topbar setIsSidebar={setIsSidebar} />
                        <Outlet />
                    </main>
                </div>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default User;