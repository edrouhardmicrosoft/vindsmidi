import type { Meta, StoryObj } from '@storybook/react'
import { Checkbox } from './checkbox'
import React, { useState } from 'react'

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} label="Default Checkbox" />
  },
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
  },
}

export const Circular: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} label="Circular Checkbox" />
  },
  args: {
    variant: 'circular',
  },
}

export const Indeterminate: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false)
    const [indeterminate, setIndeterminate] = useState(true)
    return (
      <Checkbox
        {...args}
        checked={checked}
        indeterminate={indeterminate}
        onCheckedChange={(val) => {
          setChecked(val)
          setIndeterminate(false)
        }}
        label="Indeterminate Checkbox"
      />
    )
  },
  args: {
    variant: 'default',
    indeterminate: true,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Checkbox',
  },
}
