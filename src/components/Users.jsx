// import Navbar from "../Dashboard/sections/Navbar";
import {
    Container,
    IconButton,
    Box,
    Pagination,
    Typography,
    Button,
    TextField,
    MenuItem,
    InputAdornment,
    useMediaQuery,
    CircularProgress,
  } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
  import { toast } from "react-hot-toast";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
  import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import * as React from "react";
  import { styled } from "@mui/material/styles";
  import Table from "@mui/material/Table";
  import TableBody from "@mui/material/TableBody";
  import TableCell, { tableCellClasses } from "@mui/material/TableCell";
  import TableContainer from "@mui/material/TableContainer";
  import TableHead from "@mui/material/TableHead";
  import TableRow from "@mui/material/TableRow";
  import Paper from "@mui/material/Paper";
  // import Footer from "../Dashboard/Footer";
  import axios from "axios";
  import { useState } from "react";
  import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
  } from "@mui/material";
import { AppState } from "../App";
import { PiSpinner } from "react-icons/pi";
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "rgb(29,40,60)",
      color: "white",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      backgroundColor:'#efefef'
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  
  const UserScreen = () => {
    const [totalCount, setTotalCount] = React.useState(0);
    const [totaluserCount, settotaluserCount] = React.useState(0);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [editedUser, setEditedUser] = useState(false);
    const [editedUserId, setEditedUserId] = useState("");
    const [loading,setLoading] = useState(false);
    const {EditUser,setUserListUpdated,userlistUpdated,login,userInfo} = React.useContext(AppState);
    const userId = localStorage.getItem("isloggedIn");
    const [searchString, setSearchString] = useState('');
    const userDataString = localStorage.getItem("userData");
  
    const userDataObject = JSON.parse(userDataString);
    const handleSearch = async (string) => {
        try {
          if(!string) return;
            setLoading(true);
            
          const {data} = await axios.post('http://localhost:8000/users/search', { searchString:string });
          setUsers(data);
          console.log(data);
          setLoading(false);
        } catch (error) {
          console.error('Error searching for users', error);
          setLoading(false);
        }
      };
    const fetchData = async () => {
      try {
        const url = `http://localhost:8000/users/getUsers?page=${currentPage}`;
        axios.interceptors.request.use(function (config) {
          config.headers.Authorization = `Bearer ${login}`;
          return config;
        });
  
        const response = await axios.get(url);
        setCurrentPage(response.data.currentPage);
        setUsers(response.data.users);
        setTotalCount(response.data.totalPages);
        settotaluserCount(response.data.totalUserCount-1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    React.useEffect(() => {
      if (userId) {
        fetchData();
      }
    }, [userId, currentPage]);
    React.useEffect(()=>{
        fetchData();
    },[userlistUpdated])
    const handleDeleteUser = async () => {
      try {
        // Prepare the URL for the delete request
        const url = `http://localhost:8000/users/delete/${selectedUser._id}`;
  
        // Make a DELETE request to the API endpoint
        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${userId}`,
          },
        });
  
        // Check if the request was successful
        if (response.status === 200) {
          toast.success(response.data.message, {
            style: { backgroundColor: "green", color: "white" },
            position: "bottom-left",
          });
          // Close the modal after deletion
          setIsModalOpen(false);
          fetchData();
        } else {
          toast.success(response.data.message, {
            style: { backgroundColor: "red", color: "white" },
            position: "bottom-left",
          });
        }
      } catch (error) {
        toast.success("Something went wrong.", {
          style: { backgroundColor: "red", color: "white" },
          position: "bottom-left",
        });
      }
    };
  
    const handleOpenModal = (user) => {
      setSelectedUser(user);
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setSelectedUser(null);
      setIsModalOpen(false);
    };
  
    const handlePageChange = (event, page) => {
      setCurrentPage(page);
    };
    const handleEditUser = (user) => {
      console.log(user);
      EditUser(user,true);
      setEditedUserId(user._id);
    };
    const smallScreen = useMediaQuery('(max-width:800px)');
    return (
      <>
        {/* <Navbar /> */}
        <Box sx={{ display:'flex',flexDirection:'column', pb: 2 , overflowX:'none'}}>
          
        <div style={{ display: 'flex',padding:'0.2vw 1vw', justifyContent:'space-between', alignItems: 'center', gap: '10px' }}>
        <a></a>
      <h3>List of users</h3>
      <div>
      <TextField
        label="Search"
        value={searchString}
        maxWidth={'25%'}
        onChange={(e) => {setSearchString(e.target.value)
            handleSearch(e.target.value);
        }}
        
        
      />
      <IconButton  sx={{ borderRadius:'5%',flexDirection:"row",mt:'10px'}}  onClick={handleSearch}><SearchIcon />
      </IconButton>
      </div>
        
    </div>
      <TableContainer component={Paper}>
        <Table sx={{width:'100%'}} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell  >Name</StyledTableCell>
              <StyledTableCell  >Email</StyledTableCell>
              <StyledTableCell  >Role</StyledTableCell>
              {userInfo.role === "admin"||userInfo.role === "Admin" && (
                <StyledTableCell  >Action</StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            
            {users && users.map((user) => ( 
              userInfo.userId != user._id && <StyledTableRow key={user._id}>
                <StyledTableCell  >{user.firstname}</StyledTableCell>
                <StyledTableCell  >{user.email}</StyledTableCell>
                <StyledTableCell  >{user.role}</StyledTableCell>
                {userInfo.role === "admin"||userInfo.role === "Admin" && (
                  <StyledTableCell>
                    <IconButton
                      color="primary"
                      aria-label="edit"
                      onClick={() => handleEditUser(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="delete"
                      onClick={() => handleOpenModal(user)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
          {loading?<Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'} height={'100%'}><CircularProgress alignSelf="center" size={60}/></Box>:<></>}
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Pagination
          count={totalCount}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </Box>
        {/* <Footer /> */}
        {isModalOpen && (
          <Dialog
            open={isModalOpen}
            fullWidth
            onClose={() => handleCloseModal()}
            PaperProps={{ sx: { borderRadius: "10px" } }}
          >
            <DialogTitle sx={{ fontSize: "25px", textAlign: "center" }}>
              Delete User
            </DialogTitle>
            <DialogContent>
              <Typography textAlign="center">
                Are you sure you want to delete&nbsp;
                <Typography component="span" fontWeight={600}>
                  {selectedUser.name}
                </Typography>
                &nbsp;user?
              </Typography>
            </DialogContent>
            <DialogActions sx={{ alignSelf: "center", padding: "0 20px 20px" }}>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  height: "40px",
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "8px",
                  backgroundColor: "#1E232C",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                  },
                }}
                onClick={() => handleCloseModal()}
              >
                <Typography>Cancel</Typography>
              </Button>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "none",
                  height: "40px",
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "8px",
                  backgroundColor: "#d38ef2",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "#d38ef2",
                    color: "white",
                  },
                }}
                onClick={() => handleDeleteUser()}
              >
                <Typography>Confirm</Typography>
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </>
    );
  };
  export default UserScreen;
  