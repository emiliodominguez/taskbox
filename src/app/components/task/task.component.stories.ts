import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { TaskComponent } from './task.component';
import { TaskState } from 'src/app/models/task.model';

export default {
    component: TaskComponent,
    title: 'Components/Task',
    excludeStories: /.*Data$/,
} as Meta;

export const actionsData = {
    onPinTask: action('onPinTask'),
    onArchiveTask: action('onArchiveTask'),
};

const Template: Story = (args) => ({
    props: {
        ...args,
        onPinTask: actionsData.onPinTask,
        onArchiveTask: actionsData.onArchiveTask,
    },
});

export const Default = Template.bind({});
Default.args = {
    task: { id: '1', title: 'Test Task', state: TaskState.Inbox },
};

export const Pinned = Template.bind({});
Pinned.args = {
    task: { ...Default.args['task'], state: TaskState.Pinned },
};

export const Archived = Template.bind({});
Archived.args = {
    task: { ...Default.args['task'], state: TaskState.Archived },
};

export const LongTitle = Template.bind({});
LongTitle.args = {
    task: {
        ...Default.args['task'],
        title: `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`,
    },
};
