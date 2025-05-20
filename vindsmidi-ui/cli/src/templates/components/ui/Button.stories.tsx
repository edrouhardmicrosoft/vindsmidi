import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonProps } from "./Button";

const meta: Meta<ButtonProps> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "subtle", "transparent"],
      description: "Visual variant of the button",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Size of the button",
    },
    fullWidth: {
      control: "boolean",
      description: "Makes the button take full width of its container",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
    children: {
      control: "text",
      description: "Button content",
    },
  },
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary Button",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline Button",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    children: "Subtle Button",
  },
};

export const Transparent: Story = {
  args: {
    variant: "transparent",
    children: "Transparent Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    children: "Small Button",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
    children: "Medium Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    children: "Large Button",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Button",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Full Width Button",
  },
  parameters: {
    layout: "padded",
  },
};
