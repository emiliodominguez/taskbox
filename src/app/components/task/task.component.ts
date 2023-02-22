import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css'],
})
export class TaskComponent {
    @Input() task: Task;

    @Output()
    onPinTask = new EventEmitter<Task['id']>();

    @Output()
    onArchiveTask = new EventEmitter<Task['id']>();

    /**
     * Component method to trigger the onPin event
     * @param id string
     */
    onPin(id: Task['id']): void {
        this.onPinTask.emit(id);
    }

    /**
     * Component method to trigger the onArchive event
     * @param id string
     */
    onArchive(id: Task['id']): void {
        this.onArchiveTask.emit(id);
    }
}
