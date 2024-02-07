import { Inject, Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient, @Inject("baseUrl") private baseUrl: string) { }

  private createUrl(parameters: RequestParameters): string {
    return `${parameters.baseUrl ? parameters.baseUrl : this.baseUrl}/${parameters.controller}${parameters.action ? `/${parameters.action}` : ""}`;

  }

  get<T>(parameters: RequestParameters, id?: string): Observable<T>{
    let url: string = "";

    if (parameters.fullEndPoint)
      url = parameters.fullEndPoint
    else
      url = `${this.createUrl(parameters)}${id ? `/${id}` : ""}${parameters.queryString ? `?${parameters.queryString}`:""}`
    return this.http.get<T>(url, { headers: parameters.headers })
  }
  post<T>(parameters: RequestParameters, body: T): Observable<T> {
    let url: string = "";
    if (parameters.fullEndPoint)
      url = parameters.fullEndPoint
    else
      url = `${this.createUrl(parameters)}`;
    return this.http.post<T>(url, body, { headers: parameters.headers })
  }
  put<T>(parameters: RequestParameters, body: T): Observable<T> {
    let url: string = "";
    if (parameters.fullEndPoint)
      url = parameters.fullEndPoint
    else
      url = `${this.createUrl(parameters)}`;
    return this.http.put<T>(url, body, { headers: parameters.headers })
  }
  delete<T>(parameters: RequestParameters, id: string): Observable<T> {
    let url: string = "";
    if (parameters.fullEndPoint)
      url = parameters.fullEndPoint
    else
      url = `${this.createUrl(parameters)}/${id}`;
    console.log(this.createUrl(parameters))
    return this.http.delete<T>(url,{ headers: parameters.headers })
  }
}

export interface RequestParameters {
  controller?: string;
  queryString?: string;
  action?: string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string

}
