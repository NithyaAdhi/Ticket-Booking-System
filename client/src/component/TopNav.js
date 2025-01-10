import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "#001F3D", // Dark blue color
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Adding a subtle box shadow
}));

const Title = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textAlign: "center",
  color: "#ffffff", // White color
}));

export default function TopNav() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Navbar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Title variant="h5" noWrap>
            Sri Lankan Railway Department
          </Title>
        </Toolbar>
      </Navbar>
    </Box>
  );
}
