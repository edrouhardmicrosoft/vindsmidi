import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, Tab } from './tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta

type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('tab1')
    return (
      <Tabs {...args} value={value} onValueChange={setValue}>
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </Tabs>
    )
  },
  args: {
    appearance: 'default',
    orientation: 'horizontal',
    size: 'md',
  },
}

export const Vertical: Story = {
  render: (args) => {
    const [value, setValue] = useState('tab1')
    return (
      <Tabs {...args} value={value} onValueChange={setValue} orientation="vertical">
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </Tabs>
    )
  },
  args: {
    orientation: 'vertical',
  },
}

export const Subtle: Story = {
  render: (args) => {
    const [value, setValue] = useState('tab1')
    return (
      <Tabs {...args} value={value} onValueChange={setValue} appearance="subtle">
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </Tabs>
    )
  },
  args: {
    appearance: 'subtle',
  },
}