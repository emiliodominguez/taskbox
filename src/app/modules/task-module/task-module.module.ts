import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';

import { TasksState } from 'src/app/store/task.store';
import { TaskComponent } from 'src/app/components/task/task.component';
import { TaskListComponent } from 'src/app/components/task-list/task-list.component';
import { PureTaskListComponent } from 'src/app/components/pure-task-list/pure-task-list.component';

@NgModule({
    imports: [CommonModule, NgxsModule.forFeature([TasksState])],
    exports: [TaskComponent, TaskListComponent],
    declarations: [TaskComponent, TaskListComponent, PureTaskListComponent],
    providers: [],
})
export class TaskModule {}
