import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskState } from 'src/app/models/task.model';

@Component({
    selector: 'app-pure-task-list',
    templateUrl: './pure-task-list.component.html',
    styleUrls: ['./pure-task-list.component.css'],
})
export class PureTaskListComponent {
    /** Checks if it's in loading state */
    @Input() loading = false;

    /** Event to change the task to pinned */
    @Output()
    onPinTask = new EventEmitter<Task['id']>();

    /** Event to change the task to archived */
    @Output()
    onArchiveTask = new EventEmitter<Task['id']>();

    @Input()
    set tasks(tasks: Task[]) {
        const initialTasks = [
            ...tasks.filter((task) => task.state === TaskState.Pinned),
            ...tasks.filter((task) => task.state !== TaskState.Pinned),
        ];
        const filteredTasks = initialTasks.filter(
            (task) =>
                task.state === TaskState.Inbox ||
                task.state === TaskState.Pinned
        );

        this.tasksInOrder = filteredTasks.filter(
            (task) =>
                task.state === TaskState.Inbox ||
                task.state === TaskState.Pinned
        );
    }

    /** The list of tasks */
    get tasks(): Task[] {
        return this.tasksInOrder;
    }

    private tasksInOrder: Task[] = [];
}
