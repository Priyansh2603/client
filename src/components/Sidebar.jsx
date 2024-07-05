import React, { Children, useContext, useState } from 'react';
import {
    Box,
    Button,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Link,
    IconButton,
    useMediaQuery,
    Typography,
    Modal
} from '@mui/material';
import { MdAdd, MdPayments } from "react-icons/md";
import { RiSendPlaneLine } from 'react-icons/ri';
import { AiOutlineSound } from "react-icons/ai";
import { LuClipboardList } from "react-icons/lu";
import { FiTruck } from "react-icons/fi";
import { FiGrid } from "react-icons/fi";
import { PiChartBar } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { LuBadgePercent } from "react-icons/lu";
import { GoPeople } from "react-icons/go";
import { MdOutlineColorLens } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import MenuIcon from '@mui/icons-material/Menu';
import AddUser from './AddUser';
// import Header from './Header';
// import Footer from './Footer';
import Cookies from 'js-cookie';
import { AppState } from '../App';
const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
const SidebarContent = ({ onClick }) => (
    <List>
        <ListItem Button onClick={onClick} cursor='pointer'>
            <ListItemIcon><GoHome size={24} color={'white'} mr={0}/></ListItemIcon>
            <ListItemText primary="Home" />
        </ListItem>
        <ListItem Button onClick={onClick} style={{cursor:'pointer'}}>
            <ListItemIcon><MdAdd size={24} color={'white'}/></ListItemIcon>
            <AddUser/>
        </ListItem>
        <ListItem Button onClick={onClick}>
            <ListItemIcon><FiGrid size={24} color={'white'}/></ListItemIcon>
            <ListItemText primary="Products" />
        </ListItem>
        <ListItem Button onClick={onClick}>
            <ListItemIcon><FiTruck size={24} color={'white'}/></ListItemIcon>
            <ListItemText primary="Delivery" />
        </ListItem>
        {/* <ListItem Button onClick={onClick}>
            <ListItemIcon><AiOutlineSound size={24} color={'white'}/></ListItemIcon>
            <ListItemText primary="Marketing" />
        </ListItem>
        <ListItem Button onClick={onClick}>
            <ListItemIcon><PiChartBar size={24} color={'white'}/></ListItemIcon>
            <ListItemText primary="Analytics" />
        </ListItem>
        <ListItem Button onClick={onClick} >
            <ListItemIcon><MdPayments style={{ transform: 'scaleX(-1) scaleY(-1)' }} /></ListItemIcon>
            <ListItemText primary="Payments" />
        </ListItem> */}
        {/* <ListItem Button onClick={onClick}>
            <ListItemIcon><RiSendPlaneLine style={{ transform: 'scaleX(-1)' }} /></ListItemIcon>
            <ListItemText primary="Tools" />
        </ListItem>
        <ListItem Button onClick={onClick}>
            <ListItemIcon><LuBadgePercent /></ListItemIcon>
            <ListItemText primary="Discounts" />
        </ListItem>
        <ListItem Button onClick={onClick}>
            <ListItemIcon><GoPeople /></ListItemIcon>
            <ListItemText primary="Audience" />
        </ListItem>
        <ListItem Button onClick={onClick}>
            <ListItemIcon><MdOutlineColorLens /></ListItemIcon>
            <ListItemText primary="Appearance" />
        </ListItem>
        <ListItem Button onClick={onClick}>
            <ListItemIcon><BsLightningCharge /></ListItemIcon>
            <ListItemText primary="Plugins" />
        </ListItem> */}
    </List>
);

const Sidebar = ({ isOpen, variant, onClose }) => {
    const smallScreen = useMediaQuery('(max-width:800px)');
    const [drawerOpen, setDrawerOpen] = React.useState(isOpen);
    const {updateAuth,userInfo} = useContext(AppState);
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
        if (onClose) onClose();
    };
    const [isModal,setIsModal] = useState(false);
    function handleOpen(){
        setIsModal(true);
    }
    function handleClose(){
        setIsModal(false);
    }
    return variant==='sidebar' ? (
        <Box
            sx={{
                // position: 'fixed',
                // zIndex: 1000,
                px: 3,
                py:2,
                width: 'auto',
                top: 0,
                height: '100vh',
                bgcolor: 'rgb(29,40,60)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* <Header /> */}
            <h4>Welcome {userInfo.name},</h4>
            <SidebarContent onClick={handleDrawerToggle} />
            <Box sx={{ mt: '30px' ,background: 'rgba(128, 128, 128, 0.2)',p:2 }} >
               <LogOutModal updateAuth={updateAuth} isOpen={isModal} handleOpen={handleOpen} handleClose={handleClose}>Logout</LogOutModal>
            </Box>
        </Box>
    ) : (
        <Box>
            <IconButton 
                
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerToggle}
                edge="start"
                sx={{ mr: 2, display:  'flex',pt:'3em'  }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true
                }}
            >
                <Box
                    sx={{
                        width: 250
                    }}
                >
                    <SidebarContent onClick={handleDrawerToggle} />
                </Box>
            </Drawer>
        </Box>
    );
};
const LogOutModal = ({children,updateAuth,isOpen,handleOpen,handleClose})=>{
    return (
        <>
        <Button style={{color:'white'}} onClick={handleOpen}>{children}</Button>
        <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography>Are you sure want to logout?</Typography>
            <Box display={'flex'} justifyContent={'flex-end'}><Button onClick={handleClose}>Cancel</Button>
            <Button  onClick={()=>{Cookies.remove('user');
                    updateAuth();
                }}>Logout</Button></Box>
        </Box>
        </Modal>
        </>
    )
}
export default Sidebar;
