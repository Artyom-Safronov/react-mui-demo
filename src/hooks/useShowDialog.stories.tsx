import type { Meta, StoryObj } from "@storybook/react";
import { useShowDialog } from "./useShowDialog";
import { Button } from "@mui/material";
import {
  eventHandler,
  GenerationInstructions,
} from "@amplicode/storybook-extensions";
import React, { useCallback } from "react";
import { DialogProvider } from "../DialogProvider";

const meta = {
  title: "useShowDialog",
  // component: useShowDialog,
  parameters: {
    layout: "centered",
    studioMeta: {
      kind: "eventHandler",
    },
  },
  argTypes: {},
  args: {},
  decorators: [
    (Story) => {
      return <DialogProvider>{Story()}</DialogProvider>;
    },
  ],
} satisfies Meta<typeof useShowDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UseInformationDialog: Story = {
  render: () => {
    const showDialog = useShowDialog();

    const handleEvent = eventHandler(
      useCallback((_event: React.MouseEvent<HTMLButtonElement>) => {
        showDialog({
          title: "Info",
          description: "Please keep in mind this",
          actions: [{ label: "Accept", value: true, color: "primary" }],
        });
      }, [])
    );

    return (
      <GenerationInstructions.Exclude>
        <Button onClick={handleEvent}>Open dialog</Button>
      </GenerationInstructions.Exclude>
    );
  },
  args: {},
};

export const UseConfirmationDialog: Story = {
  render: () => {
    const showDialog = useShowDialog();

    const handleEvent = eventHandler(
      useCallback((_event: React.MouseEvent<HTMLButtonElement>) => {
        showDialog({
          title: "Delete",
          description: "Are you sure you want to delete entity?",
          actions: [
            { label: "Cancel", value: false, color: "primary" },
            { label: "Delete", value: true, color: "error", variant: 'contained' },
          ],
        });
      }, [])
    );

    return (
      <GenerationInstructions.Exclude>
        <Button onClick={handleEvent}>Open dialog</Button>
      </GenerationInstructions.Exclude>
    );
  },
  args: {},
};
