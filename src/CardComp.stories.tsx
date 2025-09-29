import type { Meta, StoryObj } from "@storybook/react";
import { CardComp } from "./CardComp";

const meta = {
  title: "CardComp",
  component: CardComp,
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
} satisfies Meta<typeof CardComp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => {
    return <CardComp {...props} />;
  },
  args: {
    id: 1,
    title: "Street Food Tour in Bangkok",
    description: "Sampling the most delicious and unique street food in Bangkok.",
    uploadDate: "2024-08-02",
    tags: [2, 6],
    videoUrl: "https://www.youtube.com/watch?v=3p8G3M4bqDs",
    imageUrl: "images/1.jpg",
    statsId: 102,
  },
};
