export enum TaskState {
    Inbox = 'TASK_INBOX',
    Pinned = 'TASK_PINNED',
    Archived = 'TASK_ARCHIVED',
}

export interface Task {
    id: string;
    title: string;
    state: TaskState;
}

export enum TaskStateModelStatus {
    Idle = 'idle',
    Loading = 'loading',
    Success = 'success',
    Error = 'error',
}

export interface TaskStateModel {
    tasks: Task[];
    status: TaskStateModelStatus;
    error: boolean;
}
