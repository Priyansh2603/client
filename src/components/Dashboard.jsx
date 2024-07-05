import React, { useState, useEffect, useContext } from 'react';
import Sidebar from './Sidebar';
import { Box, useMediaQuery, IconButton, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserScreen from './Users';
import { AppState } from '../App';
import { PiFunctionDuotone } from 'react-icons/pi';
import axios from 'axios';

export default function Dashboard() {
  const isLargeScreen = useMediaQuery('(min-width:800px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const {setUserDetails,login} = useContext(AppState);
  useEffect(() => {
    if (isLargeScreen) {
      setDrawerOpen(false); // Close drawer if the screen is resized to large
    }
  }, [isLargeScreen]);
  async function fetchUser(){
    try{
        const {data} = await axios.post("http://localhost:8000/auth/getUser",{
            headers: {
                Authorization: `Bearer ${login}`,
              }
        })
        setUserDetails({userId:data._id,name:data.firstname,email:data.email,role: data.role});
    }
    catch(e){
        console.log(e);
    }
  }
  useEffect(()=>{
    fetchUser();
  },[])
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box display={'flex'}>
      {isLargeScreen ? (
        <Box minWidth={isLargeScreen?'18%':'40%'}>
          <Sidebar variant={'sidebar'} />
        </Box>
      ) : (
        <>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ position: 'absolute', top: 10, left: 10 }}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            open={drawerOpen}
            onClose={handleDrawerToggle}
            variant="temporary"
          >
            <Sidebar variant={'sidebar'} />
          </Drawer>
        </>
      )}
      <Box width={isLargeScreen ? '100vw' : '100%'}>
        <UserScreen />
      </Box>
    </Box>
  );
}
