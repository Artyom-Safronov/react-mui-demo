import type { Meta, StoryObj } from "@storybook/react";
import { VideoCard } from "./VideoCard";

const meta = {
  title: "VideoCard",
  component: VideoCard,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
  args: {},
  decorators: [
    (Story) => {
      return Story();
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
