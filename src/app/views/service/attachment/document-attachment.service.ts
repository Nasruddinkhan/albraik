import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class DocumentAttachmentService {
  private baseUrl = environment.attachmentUrl + 'attachment';

  constructor(private http: HttpClient) { }

  getPresignedUrlForDocUpload(projectId: number): Observable<any> {
    return this.http.get(this.baseUrl+`/presigned-url/project/${projectId}/upload`);
  }

  uploadDocToS3(url: string, doc: File): Observable<any> {
    let body = new FormData();
    body.append('document', doc);
    let header = new HttpHeaders({ 'Content-Type': doc.type });
    let req = new HttpRequest(
      'PUT',
      url,
      doc,
      { headers: header }
    );
    return this.http.request(req);
  }

  getPresignedUrlForDocDownload(projectId: number, s3key: string): Observable<any> {
    return this.http.get(this.baseUrl+`/presigned-url/project/${projectId}/download/${s3key}`);
  }

  downloadDocFromS3(url: string): Observable<any> {
    // let req = new HttpRequest(
    //   'GET',
    //   url,
    // );
    return this.http.get(url, {responseType: 'blob'});
  }
  
}
