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
        <Box sx={(theme) => ({ width: 200, outline: "1px solid" })}>
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
    title: "title",
    description: "description",
    uploadDate: "uploadDate",
    tags: [],
    videoUrl: "videoUrl",
    imageUrl: "imageUrl",
    statsId: 0,
  },
};
