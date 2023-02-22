import { moduleMetadata, Meta, Story } from '@storybook/angular';
import { fireEvent, within } from '@storybook/testing-library';
import { CommonModule } from '@angular/common';
import { NgxsModule, Store } from '@ngxs/store';
import { PureInboxScreenComponent } from './pure-inbox-screen.component';
import { TaskModule } from 'src/app/modules/task-module/task-module.module';
import { TasksState } from 'src/app/store/task.store';

export default {
    component: PureInboxScreenComponent,
    decorators: [
        moduleMetadata({
            declarations: [PureInboxScreenComponent],
            imports: [
                CommonModule,
                TaskModule,
                NgxsModule.forRoot([TasksState]),
            ],
            providers: [Store],
        }),
    ],
    title: 'Components/PureInboxScreen',
} as Meta;

const Template: Story = (args) => ({ props: args });

export const Default = Template.bind({});

export const Error = Template.bind({});
Error.args = { error: true };

export const WithInteractions = Template.bind({});
WithInteractions.play = ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Simulates pinning the first task
    fireEvent.click(canvas.getByLabelText('pinTask-1'));
    // Simulates pinning the third task
    fireEvent.click(canvas.getByLabelText('pinTask-3'));
};
