import { TaskIke } from '../../../enum/TaskIke';
import { TaskPriority } from '../../../enum/TaskPriority';
import { TaskStatus } from '../../../enum/TaskStatus';
import { TaskType } from '../../../enum/TaskType';

export class TaskModel {
    id: number;
    description: string;
    assigner_id: number;
    assigner_name: string;
    assignee_id: number;
    assignee_name: string;
    project_id: number;
    project_name: string;
    due_date: any;
    priority: TaskPriority;
    status: TaskStatus;
    type: TaskType;
    task_reply: TaskModel;
    created_time: any;
    updated_time: any;
    is_hidden: boolean;
    ike: TaskIke;
    attachmentList: Object[];
}