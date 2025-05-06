import type { Meta, StoryObj } from '@storybook/react'
import { Component } from './component'
import React from 'react'

const meta: Meta<typeof Component> = {
  title: 'Components/ComponentTemplate',
  component: Component,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Component>

export const Default: Story = {
  args: {
    // Add default props here if needed
  },
  render: (args) => <Component {...args}>Component Template Example</Component>,
}
