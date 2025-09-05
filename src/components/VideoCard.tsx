
import { PlayCircleFilledOutlined } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";
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

export const VideoCard = ({title}: VideoCardProps) => {
  return (
    <div>
      <Paper
        sx={{ width: "100%", height: "200px", p: 1, boxSizing: "border-box" }}
        elevation={1}
      >
        <Typography variant={"overline"}>{title}</Typography>
        <PlayCircleFilledOutlined />
      </Paper>
    </div>
  );
};
