
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
} from "@mui/material";
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

export const VideoCard = ({imageUrl, title}: VideoCardProps) => {
  return (
    <div>
      <Box sx={{ width: 360 }}>
        <Card >
          <CardActionArea onClick={() => {}}>
            <CardMedia
              component="img"
              height="200"
              image={imageUrl}
              alt="City"
            />
          </CardActionArea>
        </Card>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
      </Box>
    </div>
  );
};
