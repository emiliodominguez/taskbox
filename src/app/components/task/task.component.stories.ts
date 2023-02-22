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
