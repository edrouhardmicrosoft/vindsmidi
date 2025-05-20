import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Card, CardProps } from "./Card";

const meta: Meta<CardProps> = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "outline", "subtle", "elevated"],
      description: "Visual variant of the card",
    },
    interactive: {
      control: "boolean",
      description: "Enables interactive hover and focus styles",
    },
    header: {
      control: "text",
      description: "Adds a header section to the card",
    },
    footer: {
      control: "text",
      description: "Adds a footer section to the card",
    },
  },
};

export default meta;
type Story = StoryObj<CardProps>;

export const Filled: Story = {
  args: {
    variant: "filled",
    children: "This is a filled card with sample content.",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "This is an outline card with sample content.",
  },
};

export const Subtle: Story = {
  args: {
    variant: "subtle",
    children: "This is a subtle card with sample content.",
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: "This is an elevated card with sample content.",
  },
};

export const Interactive: Story = {
  args: {
    variant: "filled",
    interactive: true,
    children: "This is an interactive card. Click or focus to see the effect.",
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    variant: "outline",
    header: "Card Header",
    footer: "Card Footer",
    children: (
      <div>
        <p>This card has both a header and footer.</p>
        <p>The main content area can contain any React elements.</p>
      </div>
    ),
  },
};

export const ComplexContent: Story = {
  args: {
    variant: "elevated",
    header: "Featured Article",
    children: (
      <div>
        <h3 style={{ marginTop: 0, fontWeight: 600 }}>
          Designing with Components
        </h3>
        <p>
          Component-driven development helps teams build complex UIs faster by
          breaking the interface into smaller, reusable pieces.
        </p>
        <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
          <button
            style={{
              backgroundColor: "#0f6cbd",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Read More
          </button>
          <button
            style={{
              backgroundColor: "transparent",
              color: "#242424",
              border: "1px solid #d1d1d1",
              padding: "8px 16px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </div>
    ),
    footer: "Published: May 13, 2025",
  },
};
