import { Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
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
  } from "@mui/material";
  import { toast } from "react-hot-toast";
  import VisibilityIcon from "@mui/icons-material/Visibility";
  import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
  import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
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
import { AppState } from '../App';
export default function AddUser() {
    
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const {isAddModal,setIsAddModal,editedUser,setEditUser,EditUser,login,fetchUserList} = useContext(AppState);
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [editedUserId, setEditedUserId] = useState("");

    useEffect(()=>{
        if(editedUser){
            setName(editedUser.firstname);
            setLastname(editedUser.lastname);
            setEmail(editedUser.email);
            setEditedUserId(editedUser._id);
        }
    },[editedUser])
    const handleCloseAddModal = () => {
        setName("");
        setEmail("");
        setLastname("");
        setPassword("");
        EditUser('',false);
        setIsAddModal(false);
      };
      const handleAddUser = async () => {
        try {
          // Prepare the user object with the details
          const userPayload = {
            name: name,
            lastname: lastname,
            email: email,
            password: password,
          };
    
          let url;
          let method;
          if (editedUser) {
            url = `http://localhost:8000/users/update/${editedUserId}`;
            method = "PUT";
          } else {
            url = `http://localhost:8000/users/add`;
            method = "POST";
            userPayload.password = password;
          }
          const response = await axios({
            method: method,
            url: url,
            data: userPayload,
            headers: {
              Authorization: `Bearer ${login}`,
            },
          });
    
          // Check if the request was successful
          if (response.status === 201 || response.status === 200) {
            toast.success(response.data.message, {
              style: { backgroundColor: "green", color: "white" },
              position: "bottom-left",
            });
            // setIsModalOpen(false);
    
            // Clear input fields
            setName("");
            setLastname("");
            setEmail("");
            setPassword("");
            setIsAddModal(false);
            if(editedUser){
                EditUser('',false);
            }
            // fetchData();
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
  return (
    <div><Typography onClick={() => setIsAddModal(true)}>Add User</Typography>{isAddModal && (
        <Dialog
          open={isAddModal}
          onClose={handleCloseAddModal}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>{editedUser ? "Edit User" : "Add User"}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="LastName"
              type="text"
              fullWidth
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
            <TextField
              margin="dense"
              id="email"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* {!editedUser && ( */}
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            {/* )} */}
            {/* <TextField
              select
              margin="dense"
              id="role"
              label="Role"
              fullWidth
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="subAdmin">Sub Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </TextField> */}
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                marginBottom: "8px",
                backgroundColor: "#1E232C",
                color: "white",
                "&:hover": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
              onClick={handleCloseAddModal}
            >
              <Typography> Cancel</Typography>
            </Button>
            <Button
              onClick={()=>{handleAddUser();
                fetchUserList();
              }}
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "10px",
                marginBottom: "8px",
                backgroundColor: "#d38ef2",
                color: "white",
                "&:hover": {
                  backgroundColor: "#d38ef2",
                  color: "white",
                },
              }}
            >
              <Typography>{editedUser ? "Update" : "Add"}</Typography>
            </Button>
          </DialogActions>
        </Dialog>
      )}</div>
  )
}
