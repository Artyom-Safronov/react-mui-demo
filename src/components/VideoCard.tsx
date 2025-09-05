import { PlayCircleFilledOutlined } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
import { useCallback } from "react";
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

export const VideoCard = ({ title, imageUrl }: VideoCardProps) => {
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
        }}
        elevation={1}
      >
        <Typography variant={"overline"}>{title}</Typography>
        <PlayCircleFilledOutlined color={"primary"} sx={(theme) => ({width: 60, height: 60})} />
      </Paper>
    </div>
  );
};
