import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskStatus } from '../../../enum/TaskStatus';
import { TaskModel } from '../../modal/task/task-model';
import { TaskService } from '../../service/task/task.service';

@Component({
  selector: 'app-project-task-list',
  templateUrl: './project-task-list.component.html',
  styleUrls: ['./project-task-list.component.css']
})
export class ProjectTaskListComponent implements OnInit {
  loading = true;
  projectId: number;
  projectTasks: TaskModel[];
  displayedColumns: string[] = ['assignerName', 'taskDescription', 'gap', 'assigneeName', 'taskResponse'];

  constructor(private route: ActivatedRoute,
              private taskService: TaskService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.projectId = +params.get('projectId');
    });
    this.loadProjectTasks();
  }

  loadProjectTasks() {
    this.loading = true;
    this.taskService.getProjectTaskList(this.projectId).subscribe((taskList: TaskModel[]) => {
      this.projectTasks = taskList;
      if (this.projectTasks)
        this.processTasks();
      this.loading = false;
    });
  }

  processTasks() {
    this.projectTasks.forEach(task => {
      if (task.status === TaskStatus.IN_PROGRESS)
        task['response_text'] = "-";
      else
        task['response_text'] = task.task_reply.description;
    })
  }

}
