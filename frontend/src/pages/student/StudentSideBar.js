import * as React from "react";
import {
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Tooltip,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from "@mui/icons-material/AnnouncementOutlined";
import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";

const StudentSideBar = () => {
  const location = useLocation();
  return (
    <>
      <React.Fragment>
        <ListItemButton component={Link} to="/">
          <Tooltip title={"Home"}>
            <ListItemIcon>
              <HomeIcon
                color={
                  location.pathname === ("/" || "/Student/dashboard")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Student/subjects">
          <Tooltip title={"Subject Marks"}>
            <ListItemIcon>
              <AssignmentIcon
                color={
                  location.pathname.startsWith("/Student/subjects")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Subjects" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Student/attendance">
          <Tooltip title={"Attendance"}>
            <ListItemIcon>
              <ClassOutlinedIcon
                color={
                  location.pathname.startsWith("/Student/attendance")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Attendance" />
        </ListItemButton>
        <ListItemButton component={Link} to="/Student/complain">
          <Tooltip title={"Register Complain"}>
            <ListItemIcon>
              <AnnouncementOutlinedIcon
                color={
                  location.pathname.startsWith("/Student/complain")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Complain" />
        </ListItemButton>
      </React.Fragment>
      <Divider sx={{ my: 1 }} />
      <React.Fragment>
        <ListSubheader component="div" inset>
          User
        </ListSubheader>
        <ListItemButton component={Link} to="/Student/profile">
          <Tooltip title={"Student's profile"}>
            <ListItemIcon>
              <AccountCircleOutlinedIcon
                color={
                  location.pathname.startsWith("/Student/profile")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Profile" />
        </ListItemButton>
        <ListItemButton component={Link} to="/logout">
          <Tooltip title={"Logout"}>
            <ListItemIcon>
              <ExitToAppIcon
                color={
                  location.pathname.startsWith("/logout")
                    ? "primary"
                    : "inherit"
                }
              />
            </ListItemIcon>
          </Tooltip>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </React.Fragment>
    </>
  );
};

export default StudentSideBar;
