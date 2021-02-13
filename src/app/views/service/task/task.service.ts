import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { AttachmentModel } from '../../modal/attachment/attachment';
import { TaskModel } from '../../modal/task/task-model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = environment.taskManagementUrl + 'task-mgmt';

  constructor(private http: HttpClient) { }

  getProjectAttachments(projectId: number): Observable<AttachmentModel[]> {
    return this.http.get<AttachmentModel[]>(this.baseUrl+`/api/project/${projectId}/attachment`);
  }

  getTaskAssignedToMe(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.baseUrl+"/api/project/task/assigned-to-me");
  }

  getTaskAssignedByMe(): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.baseUrl+"/api/project/task/assigned-by-me");
  }

  getProjectTaskList(projectId: number): Observable<TaskModel[]> {
    return this.http.get<TaskModel[]>(this.baseUrl+`/api/project/${projectId}/task`);
  }

  createTask(taskDetails: Object): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.baseUrl+"/api/project/task", taskDetails);
  }

  createTaskReply(taskId: number, replyDetails: Object): Observable<TaskModel> {
    return this.http.post<TaskModel>(this.baseUrl+`/api/project/task/${taskId}/reply`, replyDetails);
  }

  updateTaskReply(taskId: number, replyId: number, updateDetails: Object): Observable<TaskModel> {
    return this.http.put<TaskModel>(this.baseUrl+`/api/project/task/${taskId}/reply/${replyId}`, updateDetails);
  }

  likeTaskReply(taskId: number, replyId: number): Observable<TaskModel> {
    return this.http.put<TaskModel>(this.baseUrl+`/api/project/task/${taskId}/reply/${replyId}/like`, {});
  }

  dislikeTaskReply(taskId: number, replyId: number): Observable<TaskModel> {
    return this.http.put<TaskModel>(this.baseUrl+`/api/project/task/${taskId}/reply/${replyId}/dislike`, {});
  }
}
