import type { Meta, StoryObj } from "@storybook/react";
import { VideoCard } from "./VideoCard";
import { Box } from "@mui/material";
import { useCallback } from "react";

const meta = {
  title: "VideoCard",
  component: VideoCard,
  parameters: {
    layout: "centered",
  },
  argTypes: {},
  args: {},
  decorators: [
    (Story) => {
      return (
        <Box sx={(theme) => ({ width: 300 })}>
          {Story()}
        </Box>
      );
    },
  ],
} satisfies Meta<typeof VideoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => {
    return <VideoCard {...props} />;
  },
  args: {
    id: 0,
    title: "Exploring the Mountains",
    description: "A breathtaking journey through the rocky landscapes and peaks.",
    uploadDate: "2024-07-15",
    tags: [1, 3, 5],
    videoUrl: "https://www.youtube.com/watch?v=Scxs7L0vhZ4",
    imageUrl: "images/0.jpg",
    statsId: 101,
  },
};
