import { Menu, Search } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Button,
  Avatar,
  Stack,
  Paper,
} from "@mui/material";
import { useState } from "react";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";

export type CommonProps = {
  open: boolean;
  openedDrawerWidth: number;
  closedDrawerWidth: number;
};

export type SidebarProps = CommonProps & {
  toggleOpenDrawer: () => void;
};

function App() {
  const [open, setOpen] = useState<false | true>(true);
  const openedDrawerWidth = 400;
  const closedDrawerWidth = 0;
  const toggleOpenDrawer = () => {
    setOpen((prevState) => !prevState);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header {...{ open, openedDrawerWidth, closedDrawerWidth }} />
        <Content {...{ open, openedDrawerWidth, closedDrawerWidth }} />
        <Sidebar
          {...{ open, openedDrawerWidth, closedDrawerWidth, toggleOpenDrawer }}
        />
      </Box>
    </>
  );
}

export function Header({
  open,
  openedDrawerWidth,
  closedDrawerWidth,
}: CommonProps) {
  const name = "John Doe";
  const stringToColor = (string: string) => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  };
  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        width: open
          ? `calc(100% - ${openedDrawerWidth}px)`
          : `calc(100% - ${closedDrawerWidth}px)`,
        marginRight: open ? `${openedDrawerWidth}px` : `${closedDrawerWidth}px`,
        background: theme.palette.background.default,
        boxShadow: "none",
        border: "none",
        borderBottom: `1px solid ${theme.palette.divider}`,
        transition: "all 225ms",
      })}
    >
      <Toolbar>
        <Stack direction="row" spacing={2} alignItems="center">
          <img src="vite.svg" alt="" />
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              startIcon={<Search />}
              variant={"outlined"}
              disabled={false}
              color="primary"
              size={"small"}
            >
              Search...
            </Button>
            <Avatar
              sx={{ bgcolor: stringToColor(name), width: 40, height: 40 }}
            >
              {name[0]}
            </Avatar>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

export const Content = ({
  open,
  openedDrawerWidth,
  closedDrawerWidth,
}: CommonProps) => {
  return (
    <Box
      component="main"
      sx={{
        width: open
          ? `calc(100% - ${openedDrawerWidth}px)`
          : `calc(100% - ${closedDrawerWidth}px)`,
        flexGrow: 1,
        bgcolor: "#fff",
        padding: 2,
        boxSizing: "border-box",
        minHeight: "100vh",
      }}
    >
      <Toolbar />
      {<div>Content</div>}
    </Box>
  );
};

export function Sidebar({
  open,
  openedDrawerWidth,
  closedDrawerWidth,
  toggleOpenDrawer,
}: SidebarProps) {
  return (
    <Drawer
      sx={(theme) => ({
        width: open ? openedDrawerWidth : closedDrawerWidth,
        flexShrink: 0,
        transition: "all 225ms",
        overflowX: "hidden",
        "& .MuiDrawer-paper": {
          width: open ? openedDrawerWidth : closedDrawerWidth,
          boxSizing: "border-box",
          transition: "all 225ms",
          background: theme.palette.background.default,
        },
      })}
      variant="permanent"
      open={open}
      anchor="right"
    >
      <Toolbar>
        <IconButton
          color="primary"
          size="medium"
          onClick={toggleOpenDrawer}
          sx={(theme) => ({
            position: "absolute",
            left: theme.spacing(1.5),
          })}
        >
          <Menu />
        </IconButton>
      </Toolbar>
      <Divider />
      <Box
        sx={(theme) => ({
          my: theme.spacing(2.5),
          py: 3,
          px: 2,
          overflowX: "hidden",
        })}
      ></Box>
    </Drawer>
  );
}

export default App;
