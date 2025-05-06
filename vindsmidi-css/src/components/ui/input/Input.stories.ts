import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'
import React, { useState } from 'react'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} label="Default Input" />
  },
  args: {
    variant: 'default',
    size: 'default',
    disabled: false,
    required: false,
    message: '',
    state: undefined,
  },
}

export const WithError: Story = {
  args: {
    state: 'error',
    label: 'Input with Error',
    message: 'This field is required.',
  },
}

export const WithSuccess: Story = {
  args: {
    state: 'success',
    label: 'Input with Success',
    message: 'Looks good!',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled Input',
    message: 'This input is disabled.',
  },
}
