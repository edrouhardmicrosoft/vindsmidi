import type { Meta, StoryObj } from '@storybook/react'
import { Radio, RadioGroup } from './radio'
import React, { useState } from 'react'

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof RadioGroup>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('option1')
    return (
      <RadioGroup {...args} value={value} onValueChange={setValue}>
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    )
  },
  args: {
    orientation: 'vertical',
    disabled: false,
  },
}

export const Horizontal: Story = {
  render: (args) => {
    const [value, setValue] = useState('option1')
    return (
      <RadioGroup {...args} value={value} onValueChange={setValue} orientation="horizontal">
        <Radio value="option1" label="Option 1" />
        <Radio value="option2" label="Option 2" />
        <Radio value="option3" label="Option 3" />
      </RadioGroup>
    )
  },
  args: {
    orientation: 'horizontal',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    orientation: 'vertical',
  },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="option1" label="Option 1" />
      <Radio value="option2" label="Option 2" />
      <Radio value="option3" label="Option 3" />
    </RadioGroup>
  ),
}
