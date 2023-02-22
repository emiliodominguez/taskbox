import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { patch, updateItem } from '@ngxs/store/operators';
import {
    Task,
    TaskState,
    TaskStateModel,
    TaskStateModelStatus,
} from '../models/task.model';

// Defines the actions available to the app
export enum TaskActions {
    Archive = 'ARCHIVE_TASK',
    Pin = 'PIN_TASK',
    Error = 'APP_ERROR',
}

export class ArchiveTask {
    static readonly type = TaskActions.Archive;

    constructor(public payload: Task['id']) {}
}

export class PinTask {
    static readonly type = TaskActions.Pin;

    constructor(public payload: Task['id']) {}
}

// The class definition for our error field
export class AppError {
    static readonly type = TaskActions.Error;

    constructor(public payload: boolean) {}
}

// The initial state of our store when the app loads.
// Usually you would fetch this from a server
const defaultTasks = [
    { id: '1', title: 'Something', state: TaskState.Inbox },
    { id: '2', title: 'Something more', state: TaskState.Inbox },
    { id: '3', title: 'Something else', state: TaskState.Inbox },
    { id: '4', title: 'Something again', state: TaskState.Inbox },
];

// Sets the default state
@State<TaskStateModel>({
    name: 'taskbox',
    defaults: {
        tasks: defaultTasks,
        status: TaskStateModelStatus.Idle,
        error: false,
    },
})
@Injectable()
export class TasksState {
    // Defines a new selector for the error field
    @Selector()
    static getError(state: TaskStateModel): boolean {
        return state.error;
    }

    @Selector()
    static getAllTasks(state: TaskStateModel): Task[] {
        return state.tasks;
    }

    // Triggers the PinTask action, similar to redux
    @Action(PinTask)
    pinTask(
        { getState, setState }: StateContext<TaskStateModel>,
        { payload }: PinTask
    ): void {
        const task = getState().tasks.find((task) => task.id === payload);

        if (task) {
            const updatedTask: Task = { ...task, state: TaskState.Pinned };

            setState(
                patch({
                    tasks: updateItem<Task>(
                        (pinnedTask) => pinnedTask?.id === payload,
                        updatedTask
                    ),
                })
            );
        }
    }
    // Triggers the archiveTask action, similar to redux
    @Action(ArchiveTask)
    archiveTask(
        { getState, setState }: StateContext<TaskStateModel>,
        { payload }: ArchiveTask
    ): void {
        const task = getState().tasks.find((task) => task.id === payload);

        if (task) {
            const updatedTask: Task = { ...task, state: TaskState.Archived };

            setState(
                patch({
                    tasks: updateItem<Task>(
                        (archivedTask) => archivedTask?.id === payload,
                        updatedTask
                    ),
                })
            );
        }
    }

    // Function to handle how the state should be updated when the action is triggered
    @Action(AppError)
    setAppError(
        { patchState, getState }: StateContext<TaskStateModel>,
        { payload }: AppError
    ) {
        const state = getState();
        patchState({ error: !state.error });
    }
}
