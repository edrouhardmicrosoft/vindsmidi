import type { Meta, StoryObj } from '@storybook/react'
import { Switch } from './switch'
import React, { useState } from 'react'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Switch>

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} label="Default Switch" />
  },
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
  },
}

export const Subtle: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Switch {...args} checked={checked} onCheckedChange={setChecked} label="Subtle Switch" />
  },
  args: {
    variant: 'subtle',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Switch',
  },
}
