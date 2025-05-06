import type { Meta, StoryObj } from '@storybook/react'
import { Text } from './text'
import React from 'react'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Text>

export const Body: Story = {
  args: {
    children: 'This is body text.',
    variant: 'body',
  },
}

export const Title: Story = {
  args: {
    children: 'This is a title',
    variant: 'title',
    weight: 'semibold',
  },
}

export const Subtitle: Story = {
  args: {
    children: 'This is a subtitle',
    variant: 'subtitle',
    weight: 'medium',
  },
}

export const Caption: Story = {
  args: {
    children: 'This is a caption',
    variant: 'caption',
    weight: 'regular',
  },
}

export const Truncated: Story = {
  args: {
    children: 'This is a very long text that will be truncated with an ellipsis if it overflows the container.',
    truncate: true,
    variant: 'body',
    style: { maxWidth: 200, display: 'block' },
  },
}
