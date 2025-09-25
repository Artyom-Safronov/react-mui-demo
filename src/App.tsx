import {
  Box,
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  Divider,
  Button,
  Tooltip,
  Avatar,
  Menu as MuiMaterialMenu,
  MenuItem,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useEffect, MouseEvent } from "react";
import { unstable_getScrollbarSize } from "@mui/utils";
import { Menu, PersonAdd, Settings, Logout } from "@mui/icons-material";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
type SidebarProps = CommonProps & {
  toggleOpenDrawer: () => void;
};

type CommonProps = {
  open: boolean;
  openedDrawerWidth: number;
  closedDrawerWidth: number;
};
function App() {
  const [open, setOpen] = useState<false | true>(true);
  const scrollBarSize = useTakeScrollWidth(open);
  const openedDrawerWidth = 240 + scrollBarSize;
  const closedDrawerWidth = 64 + scrollBarSize;
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

export default App;

const useTakeScrollWidth = (open: boolean) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const hasScroll =
      document.documentElement.scrollHeight >
      document.documentElement.clientHeight;

    setWidth(hasScroll ? unstable_getScrollbarSize() : 0);
  }, [open]);

  return width;
};

function Sidebar({
  open,
  openedDrawerWidth,
  closedDrawerWidth,
  toggleOpenDrawer,
}: SidebarProps) {
  const scrollBarSize = useTakeScrollWidth(open);
  return (
    <Drawer
      sx={(theme) => ({
        width: open ? openedDrawerWidth : closedDrawerWidth,
        flexShrink: 0,
        transition: "width 225ms",
        overflowX: "hidden",
        "& .MuiDrawer-paper": {
          width: open ? openedDrawerWidth : closedDrawerWidth,
          boxSizing: "border-box",
          transition: "width 225ms",
          background: theme.palette.background.default,
          "[aria-hidden] &": {
            right: scrollBarSize,
          },
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

function Content({ open, openedDrawerWidth, closedDrawerWidth }: CommonProps) {
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
}

function Header({ open, openedDrawerWidth, closedDrawerWidth }: CommonProps) {
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
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <img src="vite.svg" alt="" />
          <Stack direction="row" spacing={2}>
            <Button
              startIcon={<AlarmOnIcon />}
              variant="contained"
              disabled={false}
              color="primary"
              size="medium"
            >
              Button
            </Button>
            <ProfileMenu />
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openMenu = Boolean(anchorEl);
  const handleOpen = (e: MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Box>
        <Tooltip title="Account settings">
          <IconButton onClick={handleOpen} size="small">
            <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
          </IconButton>
        </Tooltip>
        <MuiMaterialMenu
          id="account-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                mt: 1.5,
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Avatar sx={{ width: 24, height: 24, mr: 1 }} /> Profile
          </MenuItem>
          <MenuItem>
            <Avatar sx={{ width: 24, height: 24, mr: 1 }} /> My account
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </MuiMaterialMenu>
      </Box>
    </>
  );
};
