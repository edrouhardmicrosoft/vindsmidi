import type { Meta, StoryObj } from '@storybook/react'
import { Select, SelectOption } from './select'
import React, { useState } from 'react'

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <Select {...args} value={value} onValueChange={setValue} label="Default Select">
        <SelectOption value="option1">Option 1</SelectOption>
        <SelectOption value="option2">Option 2</SelectOption>
        <SelectOption value="option3">Option 3</SelectOption>
      </Select>
    )
  },
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    required: false,
    message: '',
    state: undefined,
    placeholder: 'Select an option',
  },
}

export const WithError: Story = {
  args: {
    state: 'error',
    label: 'Select with Error',
    message: 'This field is required.',
    placeholder: 'Select an option',
  },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="option1">Option 1</SelectOption>
      <SelectOption value="option2">Option 2</SelectOption>
      <SelectOption value="option3">Option 3</SelectOption>
    </Select>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Select',
    message: 'This select is disabled.',
    placeholder: 'Select an option',
  },
  render: (args) => (
    <Select {...args}>
      <SelectOption value="option1">Option 1</SelectOption>
      <SelectOption value="option2">Option 2</SelectOption>
      <SelectOption value="option3">Option 3</SelectOption>
    </Select>
  ),
}
