import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
import { ArchiveTask, PinTask } from 'src/app/store/task.store';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent {
    tasks$?: Observable<any>;

    constructor(private readonly store: Store) {
        this.tasks$ = store.select((state) => state.taskbox.tasks);
    }

    /**
     * Component method to trigger the archiveTask event
     */
    archiveTask(id: Task['id']): void {
        this.store.dispatch(new ArchiveTask(id));
    }

    /**
     * Component method to trigger the pinTask event
     */
    pinTask(id: Task['id']): void {
        this.store.dispatch(new PinTask(id));
    }
}
