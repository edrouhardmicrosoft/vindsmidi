import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './card'
import React from 'react'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Default Card</CardTitle>
      </CardHeader>
      <CardContent>This is a simple card. You can put any content here.</CardContent>
      <CardFooter>
        <button className="px-3 py-1 rounded bg-blue-600 text-white">Action</button>
      </CardFooter>
    </Card>
  ),
  args: {
    variant: 'default',
    size: 'default',
    shadow: 'default',
    interactive: false,
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Filled Card</CardTitle>
      </CardHeader>
      <CardContent>
        This card uses the <b>filled</b> variant.
      </CardContent>
      <CardFooter>
        <button className="px-3 py-1 rounded bg-blue-600 text-white">Action</button>
      </CardFooter>
    </Card>
  ),
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Outline Card</CardTitle>
      </CardHeader>
      <CardContent>
        This card uses the <b>outline</b> variant.
      </CardContent>
      <CardFooter>
        <button className="px-3 py-1 rounded bg-blue-600 text-white">Action</button>
      </CardFooter>
    </Card>
  ),
}

export const Interactive: Story = {
  args: {
    interactive: true,
  },
  render: (args) => (
    <Card {...args}>
      <CardHeader>
        <CardTitle>Interactive Card</CardTitle>
      </CardHeader>
      <CardContent>This card is interactive (focus/hover styles enabled).</CardContent>
      <CardFooter>
        <button className="px-3 py-1 rounded bg-blue-600 text-white">Action</button>
      </CardFooter>
    </Card>
  ),
}
