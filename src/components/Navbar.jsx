import React, { useContext } from "react";
import { Badge, Box, Button, Typography, useMediaQuery } from "@mui/material";
import { Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { AppState } from "../App";
import Cookies from 'js-cookie'
export default function Navbar() {
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const { login,userInfo,updateAuth } = useContext(AppState);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.clear();
    Cookies.remove('user');
    updateAuth();
    navigate("/login");
    window.location.reload();
  }
  return (
    <>
      {login && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#efefef",
            width: isSmallScreen ? "94.5%" : "96.05vw",
            padding: isSmallScreen ? "8px 8px " : "8px 22px",
          }}
        >
          {" "}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <TemporaryDrawer /> */}
            <Link to="/" style={{ margin: "0 4", color: "grey" }}>
              <Button
                variant="contained"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor: "#efefef",
                  color: "black",
                  paddingRight: "0px",
                  paddingTop: "4px",
                  paddingBottom: "4px",
                  paddingLeft: "6px",
                  minWidth: 0,
                  marginRight: "8px",
                }}
                startIcon={
                  <HomeOutlinedIcon
                    sx={{ width: "24px", height: "24px", ml: "6px", mt: "2px" }}
                  />
                }
              />
            </Link>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: "6px",
                marginRight: "18px",
              }}
            >
            </Box>
            <Avatar
              alt="Avatar"
              src="https://t3.ftcdn.net/jpg/03/62/56/24/360_F_362562495_Gau0POzcwR8JCfQuikVUTqzMFTo78vkF.jpg"
            />

            <Typography
              sx={{ alignSelf: "center", marginLeft: "4px", cursor: "pointer" }}
              onClick={() => handleLogout()}
            >
              Logout
            </Typography>
          </Box>
        </Box>
      )}
      {!login && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#efefef",
            width: isSmallScreen ? "94.5%" : "96.05vw",
            padding: isSmallScreen ? "8px 8px " : "8px 22px",
          }}
        >
          <Link to="/" style={{ margin: "0 4", color: "grey" }}>
            <Button
              variant="contained"
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "#efefef",
                color: "black",
                paddingRight: "0px",
                paddingTop: "4px",
                paddingBottom: "4px",
                paddingLeft: "6px",
                minWidth: 0,
                marginRight: "8px",
              }}
              startIcon={
                <HomeOutlinedIcon
                  sx={{ width: "24px", height: "24px", ml: "6px", mt: "2px" }}
                />
              }
            />
          </Link>
          <Typography
            sx={{ alignSelf: "center", marginLeft: "4px", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </Typography>
        </Box>
      )}
    </>
  );
}
