import { Close, Search } from "@mui/icons-material";
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
  Grid,
  Paper,
  Typography,
  Chip,
} from "@mui/material";
import React, { useEffect, useState, useCallback } from "react";
import { tags, videos, views } from "./mock/videos";
import { VideoCard } from "./components/VideoCard";
import { BarChartPro } from "@mui/x-charts-pro/BarChartPro";
import { useParams, useNavigate } from "react-router-dom";

export type CommonProps = {
  open: boolean;
  openedDrawerWidth: number;
  closedDrawerWidth: number;
};

function App() {
  const [open, setOpen] = useState<false | true>(true);
  const openedDrawerWidth = 400;
  const closedDrawerWidth = 0;

  const params = useParams();

  useEffect(() => {
    setOpen(Boolean(params.id));
  }, [params.id]);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Header {...{ open, openedDrawerWidth, closedDrawerWidth }} />
        <Content {...{ open, openedDrawerWidth, closedDrawerWidth }} />
        <Sidebar {...{ open, openedDrawerWidth, closedDrawerWidth }} />
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
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          flex={1}
          justifyContent={"space-between"}
        >
          <img src="vite.svg" alt="" />
          <Stack direction="row" spacing={4} alignItems="center">
            <Button
              startIcon={<Search />}
              variant={"outlined"}
              disabled={false}
              color="primary"
              size={"small"}
              sx={(theme) => ({ width: 160, justifyContent: "flex-start" })}
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
      <Grid container spacing={2} mt={4}>
        {videos.map((video) => {
          return (
            <Grid size={{ xs: 12, lg: 3 }}>
              <VideoCard {...video} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export function Sidebar({
  open,
  openedDrawerWidth,
  closedDrawerWidth,
}: CommonProps) {
  const navigate = useNavigate();

  const onIconButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      navigate("/");
    },
    []
  );

  const params = useParams();

  const video = videos[Number(params.id)];

  const videoTags = tags.filter((tag) => {
    return video?.tags.includes(tag.id);
  });

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
          sx={(theme) => ({
            position: "absolute",
            left: theme.spacing(1.5),
          })}
          onClick={onIconButtonClick}
        >
          <Close />
        </IconButton>
      </Toolbar>
      <Divider />
      {params.id ? (
        <Box
          sx={(theme) => ({
            my: theme.spacing(2.5),
            py: 3,
            px: 2,
            overflowX: "hidden",
          })}
        >
          <VideoCard {...video} />

          <Paper
            sx={{ width: "100%", p: 1, boxSizing: "border-box", mt: 2 }}
            elevation={1}
          >
            <Typography variant="subtitle1">Tags</Typography>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {videoTags.map((tag) => {
                return (
                  <Chip
                    variant="filled"
                    size={"small"}
                    color="primary"
                    label={tag.label}
                    onDelete={() => {}}
                  />
                );
              })}
            </Stack>
          </Paper>
          <Paper
            sx={{
              width: "100%",
              p: 1,
              mt: 4,
              boxSizing: "border-box",
            }}
            elevation={1}
          >
            <Typography variant="subtitle1">Views</Typography>
            <BarChartPro
              height={300}
              series={[
                {
                  data: views[Number(params.id)].map((data) => data.y1),
                  label: "All",
                  stack: "total",
                },
                {
                  data: views[Number(params.id)].map((data) => data.y2),
                  label: "Unique",
                  stack: "total",
                },
              ]}
              xAxis={[{ data: xLabels, zoom: true }]}
              yAxis={[{ width: 50 }]}
              showToolbar
            />
          </Paper>
        </Box>
      ) : null}
    </Drawer>
  );
}

export default App;

const xLabels = [
  "Google",
  "Youtube",
  "Instagram",
  "Facebook",
  "TikTok",
  "Snapchat",
];
