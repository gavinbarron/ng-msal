
import {throwError as observableThrowError} from 'rxjs';

import {catchError} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable()
export class GraphService {
    public version = 'v1.0';
    private readonly graphUrl = `https://graph.microsoft.com/${this.version}`;

    constructor (private http: HttpClient) {

    }

    public getUserInfo(token: string) {
      return this.makeJsonRequest(token, `${this.graphUrl}/me`).pipe(
            catchError(response => observableThrowError(response.text())));
    }

    public getDrive(token: string) {
      return this.makeJsonRequest(token, `${this.graphUrl}/drive`).pipe(
          catchError(response => observableThrowError(response.text())));
    }

    public getPhoto(token: string): Observable<Blob> {
      // Set the responseType to get the Blob returned.
      return this.http.get(`${this.graphUrl}/me/photo/$value`, { headers: this.buildHeaders(token), responseType: 'blob' }).pipe(
            catchError(response => observableThrowError(response.text())));
    }

    private makeJsonRequest(token: string, endpoint: string) {
      return this.http.get(endpoint, { headers: this.buildHeaders(token) });
    }

    private buildHeaders(token: string) {
      return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    }
};
