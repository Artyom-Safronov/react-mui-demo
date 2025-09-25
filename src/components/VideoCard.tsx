import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Fade,
} from "@mui/material";
import { PlayCircleRounded } from "@mui/icons-material";
import React, { useState, useCallback } from "react";
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

export const VideoCard = ({ imageUrl, title }: VideoCardProps) => {
  const [fadeIn, setFadeIn] = useState<false | true>(true);

  const onCardMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setFadeIn(false);
    },
    []
  );
  const onCardMouseEnter = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setFadeIn(true);
    },
    []
  );

  return (
    <div>
      <Box sx={{ width: 360 }}>
        <Card onMouseEnter={onCardMouseEnter} onMouseLeave={onCardMouseLeave}>
          <CardActionArea onClick={() => {}} sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="200"
              image={imageUrl}
              alt="City"
            />
            <Fade in={fadeIn} timeout={200}>
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                }}
              >
                <PlayCircleRounded
                  sx={{ width: 60, height: 60, color: "white" }}
                />
              </Box>
            </Fade>
          </CardActionArea>
        </Card>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
    </div>
  );
};
