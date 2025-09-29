import {
  Card,
  CardActionArea,
  CardMedia,
  Typography,
  Box,
  Fade,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import { useCallback, useState } from "react";

type CardProps = {
  id: number;
  title: string;
  description: string;
  uploadDate: string;
  tags: number[];
  videoUrl: string;
  imageUrl: string;
  statsId: number;
};

export const CardComp = (props: CardProps) => {
  const [fadeIn, setFadeIn] = useState<false | true>(false);

  const onCardMouseLeave = useCallback(() => {
    setFadeIn(false);
  }, []);
  const onCardMouseEnter = useCallback(() => {
    setFadeIn(true);
  }, []);

  return (
    <div>
      <Box sx={{ maxwidth: 360 }}>
        <Card onMouseEnter={onCardMouseEnter} onMouseLeave={onCardMouseLeave}>
          <CardActionArea onClick={() => {}} sx={{ position: "relative" }}>
            <CardMedia
              component="img"
              height="160"
              image={props.imageUrl}
              alt="City"
            />
            <Fade in={fadeIn} timeout={300}>
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pointerEvents: "none",
                  zIndex: 1,
                }}
              >
                <PlayArrow sx={{ width: 60, height: 60, color: "white" }} />
              </Box>
            </Fade>
          </CardActionArea>
        </Card>
        <Typography variant="body2" color="text.secondary">
          {props.title}
        </Typography>
      </Box>
    </div>
  );
};
