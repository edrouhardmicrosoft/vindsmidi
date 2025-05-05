import React from "react";
import { Text } from "../vindsmidi-css/components/ui/text";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../vindsmidi-css/components/ui/card";
import { Checkbox } from "../vindsmidi-css/components/ui/checkbox";
import { Radio, RadioGroup } from "../vindsmidi-css/components/ui/radio";
import { Switch } from "../vindsmidi-css/components/ui/switch";
import { Input } from "../vindsmidi-css/components/ui/input";
import { Select } from "../vindsmidi-css/components/ui/select";
import { Button } from "../vindsmidi-css/components/ui/button";

export default function ComponentShowcase() {
  const [radioValue, setRadioValue] = React.useState("option1");
  const [switchValue, setSwitchValue] = React.useState(false);
  const [selectValue, setSelectValue] = React.useState("");

  return (
    <div className="p-6 max-w-4xl mx-auto bg-[var(--colorNeutralBackground1)]">
      <Text variant="heroDisplay" className="mb-8">
        Vindsmidi UI Component Showcase
      </Text>
      <Text variant="subtitle" className="mb-6">
        Phase 1: Foundation Components
      </Text>

      {/* Typography */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Typography (Text)</CardTitle>
            <CardDescription>
              Various text styles with semantic HTML elements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Text variant="heroDisplay">Hero Display</Text>
              <Text variant="largeDisplay">Large Display</Text>
              <Text variant="display">Display</Text>
              <Text variant="titleLarge">Title Large</Text>
              <Text variant="title">Title</Text>
              <Text variant="subtitle">Subtitle</Text>
              <Text variant="bodyLarge">Body Large</Text>
              <Text variant="body">Body</Text>
              <Text variant="bodySmall">Body Small</Text>
              <Text variant="caption">Caption</Text>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Button */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Button</CardTitle>
            <CardDescription>
              Interactive button component with various styles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="subtle">Subtle</Button>
              <Button variant="transparent">Transparent</Button>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button size="sm">Small</Button>
              <Button>Default</Button>
              <Button size="lg">Large</Button>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Card */}
      <section className="mb-12">
        <Text variant="title" className="mb-4">
          Card
        </Text>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
              <CardDescription>Card description text</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Standard card content goes here.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>

          <Card variant="filled">
            <CardHeader variant="filled">
              <CardTitle>Filled Card</CardTitle>
              <CardDescription>With filled background</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Filled card content goes here.</p>
            </CardContent>
            <CardFooter variant="filled">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>

          <Card variant="outline">
            <CardHeader variant="outline">
              <CardTitle>Outline Card</CardTitle>
              <CardDescription>With outline styling</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Outline card content goes here.</p>
            </CardContent>
            <CardFooter variant="outline">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>

          <Card variant="branded">
            <CardHeader variant="branded">
              <CardTitle>Branded Card</CardTitle>
              <CardDescription>With brand styling</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Branded card content goes here.</p>
            </CardContent>
            <CardFooter variant="branded">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Form Controls */}
      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle>Form Controls</CardTitle>
            <CardDescription>
              Input, Checkbox, Radio, Switch and Select components
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Checkbox */}
            <div className="space-y-4">
              <Text variant="subtitle">Checkbox</Text>
              <div className="space-y-2">
                <Checkbox label="Default checkbox" />
                <Checkbox label="Checked checkbox" defaultChecked />
                <Checkbox label="Indeterminate checkbox" indeterminate />
                <Checkbox label="Disabled checkbox" disabled />
                <div className="flex gap-4">
                  <Checkbox variant="circular" label="Circular" />
                  <Checkbox variant="subtle" label="Subtle" />
                </div>
              </div>
            </div>

            {/* Radio */}
            <div className="space-y-4">
              <Text variant="subtitle">Radio</Text>
              <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                <Radio value="option1" label="Option 1" />
                <Radio value="option2" label="Option 2" />
                <Radio value="option3" label="Option 3" />
                <Radio value="disabled" label="Disabled option" disabled />
              </RadioGroup>

              <div className="mt-4">
                <Text variant="body">Selected: {radioValue}</Text>
              </div>
            </div>

            {/* Switch */}
            <div className="space-y-4">
              <Text variant="subtitle">Switch</Text>
              <div className="space-y-2">
                <Switch
                  label="Default switch"
                  checked={switchValue}
                  onCheckedChange={setSwitchValue}
                />
                <Switch label="Default checked" defaultChecked />
                <Switch label="Disabled switch" disabled />
                <div className="flex gap-4">
                  <Switch variant="subtle" label="Subtle" />
                </div>
              </div>
            </div>

            {/* Input */}
            <div className="space-y-4">
              <Text variant="subtitle">Input</Text>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Default input" placeholder="Enter text" />
                <Input label="Disabled input" disabled value="Disabled value" />
                <Input
                  label="Required input"
                  required
                  placeholder="Required field"
                />
                <Input
                  label="Password input"
                  type="password"
                  placeholder="Enter password"
                />
                <Input
                  label="Success state"
                  state="success"
                  message="Looks good!"
                />
                <Input
                  label="Error state"
                  state="error"
                  message="This field is required"
                />
              </div>
            </div>

            {/* Select */}
            <div className="space-y-4">
              <Text variant="subtitle">Select</Text>
              <div className="grid md:grid-cols-2 gap-4">
                <Select
                  label="Basic select"
                  placeholder="Choose an option"
                  value={selectValue}
                  onValueChange={setSelectValue}
                >
                  <Select.Option value="option1">Option 1</Select.Option>
                  <Select.Option value="option2">Option 2</Select.Option>
                  <Select.Option value="option3">Option 3</Select.Option>
                </Select>

                <Select label="With groups" placeholder="Select category">
                  <Select.OptionGroup label="Group 1">
                    <Select.Option value="group1-option1">
                      Group 1 - Option 1
                    </Select.Option>
                    <Select.Option value="group1-option2">
                      Group 1 - Option 2
                    </Select.Option>
                  </Select.OptionGroup>
                  <Select.OptionGroup label="Group 2">
                    <Select.Option value="group2-option1">
                      Group 2 - Option 1
                    </Select.Option>
                    <Select.Option value="group2-option2">
                      Group 2 - Option 2
                    </Select.Option>
                  </Select.OptionGroup>
                </Select>

                <Select
                  label="Required select"
                  required
                  placeholder="Required field"
                >
                  <Select.Option value="option1">Option 1</Select.Option>
                  <Select.Option value="option2">Option 2</Select.Option>
                  <Select.Option value="option3">Option 3</Select.Option>
                </Select>

                <Select
                  label="Error state"
                  state="error"
                  message="Please select an option"
                  placeholder="Select an option"
                >
                  <Select.Option value="option1">Option 1</Select.Option>
                  <Select.Option value="option2">Option 2</Select.Option>
                  <Select.Option value="option3">Option 3</Select.Option>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
