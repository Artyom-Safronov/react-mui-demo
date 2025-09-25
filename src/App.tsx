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
  Grid,
  Chip,
  Paper,
} from "@mui/material";
import React, { useState, useEffect, MouseEvent, useCallback } from "react";
import { unstable_getScrollbarSize } from "@mui/utils";
import {
  Menu,
  PersonAdd,
  Settings,
  Logout,
  Search,
  ArrowForward,
} from "@mui/icons-material";
import { tags, videos } from "./mock/videos";
import { VideoCard } from "./components/VideoCard";
import { BarChartPro } from "@mui/x-charts-pro/BarChartPro";
import { useShowDialog } from "./hooks/useShowDialog";
import { useParams, useNavigate } from "react-router-dom";
type SidebarProps = CommonProps & {
  // toggleOpenDrawer: () => void;
};

type CommonProps = {
  open: boolean;
  openedDrawerWidth: number;
  closedDrawerWidth: number;
};
function App() {
  const params = useParams();
  const open = Boolean(params?.id);
  const scrollBarSize = useTakeScrollWidth(open);
  const openedDrawerWidth = 400 + scrollBarSize;
  const closedDrawerWidth = 0;
  
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header {...{ open, openedDrawerWidth, closedDrawerWidth }} />
        <Content {...{ open, openedDrawerWidth, closedDrawerWidth }} />
        <Sidebar
          {...{ open, openedDrawerWidth, closedDrawerWidth }}
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
}: SidebarProps) {
  const navigate = useNavigate();
  const onIconButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      navigate('/')
    },
    [],
  );
  const params = useParams();
  const showDialog = useShowDialog();
  const handleEvent = useCallback(
    (_event: React.MouseEvent<HTMLButtonElement>) => {
      showDialog({
        title: "Delete",
        description: "Are you sure you want to delete entity?",
        actions: [
          { label: "Cancel", value: false, color: "primary" },
          {
            label: "Delete",
            value: true,
            color: "error",
            variant: "contained",
          },
        ],
      });
    },
    [],
  );
  const scrollBarSize = useTakeScrollWidth(open);

  const video = videos[Number(params.id)];

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
          onClick={onIconButtonClick}
          sx={(theme) => ({
            position: "absolute",
            left: theme.spacing(1.5),
          })}
        >
          {/* <Menu /> */}
          <ArrowForward />
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
      >
        {video && open ? (
          <>
            <VideoCard {...video} />
            <Box mt={2}>
              <Typography variant={"subtitle1"}>Tags</Typography>
              <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                {tags
                  .filter((tag) => video.tags.includes(tag.id))
                  .map((chip) => {
                    return (
                      <Chip
                        variant="filled"
                        size="medium"
                        color="primary"
                        label={chip.label}
                        onDelete={handleEvent}
                      />
                    );
                  })}
              </Stack>
            </Box>
            <Typography variant={"subtitle1"} mt={2}>
              Views
            </Typography>
            <Paper
              sx={{
                width: "100%",
                height: "100%",
                p: 1,
                boxSizing: "border-box",
              }}
              elevation={1}
            >
              <BarChartPro
                height={300}
                series={[
                  { data: allViews, label: "All", stack: "total" },
                  { data: uniqueViews, label: "Unique", stack: "total" },
                ]}
                xAxis={[{ data: xLabels, zoom: true }]}
                yAxis={[{ width: 50 }]}
                showToolbar
              />
            </Paper>
          </>
        ) : null}
      </Box>
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

      <Grid container spacing={2}>
        {videos.map((video) => {
          return (
            <Grid size={{ xs: 12, lg: 3 }} key={video.id}>
              <VideoCard {...video} />
            </Grid>
          );
        })}
      </Grid>
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
          <Stack direction="row" spacing={2} alignItems={"center"}>
            <Button
              startIcon={<Search />}
              variant={"outlined"}
              disabled={false}
              color="primary"
              size={"small"}
              sx={(theme) => ({
                height: 32,
                paddingRight: 8,
                textTransform: "capitalize",
              })}
            >
              Search...
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

const xLabels = [
  "Google",
  "Youtube",
  "Instagram",
  "Facebook",
  "TikTok",
  "Snapchat",
];

const uniqueViews = [2400, 1398, 9800, 3908, 4800, 3800];

const allViews = [4000, 3000, 2000, 2780, 1890, 2390];
