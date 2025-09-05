import { PlayCircleFilledOutlined } from "@mui/icons-material";
import { Paper, Typography, Box, Fade } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
type VideoCardProps = {
  id: number;
  title: string;
  description: string;
  uploadDate: string;
  tags: number[];
  videoUrl: string;
  imageUrl: string;
  statsId: number;
};

export const VideoCard = ({ title, imageUrl, id }: VideoCardProps) => {
const onPaperClick = useCallback(
  (event: React.MouseEvent<HTMLDivElement>) => {
    navigate(`/${id}`)
  },
  [],
);
  const [fadeIn, setFadeIn] = useState<false | true>(false);
  
  const navigate = useNavigate();
  
  const onFadeMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setFadeIn(true);
    },
    [],
  );

  const onFadeMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setFadeIn(false);
    },
    []
  );

  return (
    <div>
      <Paper
        sx={{
          width: "100%",
          height: "200px",
          p: 1,
          boxSizing: "border-box",
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: "white",
          position: "relative",
          cursor: "pointer",
        }}
        elevation={1}
        onMouseLeave={onFadeMouseLeave}
        onMouseEnter={onFadeMouseEnter}
        onClick={onPaperClick}
      >
        <Fade in={fadeIn} timeout={200}>
          <Typography variant={"overline"}>{title}</Typography>
        </Fade>
        <Box
          sx={{
            width: "60px",
            height: "60px",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            margin: "auto",
          }}
        >
          <PlayCircleFilledOutlined
            sx={(theme) => ({ width: 60, height: 60 })}
          />
        </Box>
      </Paper>
    </div>
  );
};
