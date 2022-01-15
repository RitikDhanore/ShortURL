import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Account from "./components/Account";
import Home from "./components/Home";
import { ThemeProvider, CircularProgress, Box } from "@material-ui/core";
import theme from "./theme";
import { auth } from "./firebase";
import LinkRedirect from "./components/LinkRedirect";

const App = () => {

  const [user, setUser] = useState(null);
  const {pathname} = useLocation();
  const [initialLoad, setInitialLoad] = useState(
    pathname === "/" || pathname === "/account" ? true : false
  );
  

  useEffect(() => {
    auth.onAuthStateChanged((user) =>{
      setUser(user);
      setInitialLoad(false);
    });
  }, []);

  // console.log(user);

  if(initialLoad) return(
    <Box mt={5} display="flex" justifyContent="center">
      <CircularProgress />
    </Box>
  );

  return (
    <ThemeProvider theme={theme}>
      
        <Routes>  
         <Route exact path="/" element={ user ? <Navigate to="/account" /> : <Home/>} />  
         <Route path="/account" element={user ? <Account/> : <Navigate to="/" />} /> 
         <Route path="/:shortCode" element={<LinkRedirect />}/> 
        </Routes>  
    
    </ThemeProvider>
  );
};

export default App;
