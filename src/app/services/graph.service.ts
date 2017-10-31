import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';

@Injectable()
export class GraphService {
    public version = 'v1.0';
    private readonly graphUrl = `https://graph.microsoft.com/${this.version}`;

    constructor (private http: HttpClient) {

    }

    public getUserInfo(token: string) {
      return this.makeJsonRequest(token, `${this.graphUrl}/me`)
            .catch(response => Observable.throw(response.text()));
    }

    public getDrive(token: string) {
      return this.makeJsonRequest(token, `${this.graphUrl}/drive`)
          .catch(response => Observable.throw(response.text()));
    }

    public getPhoto(token: string): Observable<Blob> {
      // Set the responseType to get the Blob returned.
      return this.http.get(`${this.graphUrl}/me/photo/$value`, { headers: this.buildHeaders(token), responseType: 'blob' })
            .catch(response => Observable.throw(response.text()));
    }

    private makeJsonRequest(token: string, endpoint: string) {
      return this.http.get(endpoint, { headers: this.buildHeaders(token) });
    }

    private buildHeaders(token: string) {
      return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
};
