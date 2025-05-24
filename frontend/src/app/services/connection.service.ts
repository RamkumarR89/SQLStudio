import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ConnectionRequest {
  type: string;
  inputType: string;
  server: string;
  authType: string;
  database: string;
  encrypt: string;
  trustServerCertificate: boolean;
  serverGroup: string;
  name?: string;
  username?: string;
  password?: string;
  connectionString?: string;
}

export interface ConnectionInfo {
  id: number;
  name: string;
  server: string;
  database: string;
  username: string;
  connected: boolean;
  created_at: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private apiUrl = 'http://localhost:8000/api/connections';

  constructor(private http: HttpClient) { }

  getConnections(): Observable<ConnectionInfo[]> {
    return this.http.get<ConnectionInfo[]>(this.apiUrl);
  }

  createConnection(connection: ConnectionRequest): Observable<ConnectionInfo> {
    return this.http.post<ConnectionInfo>(this.apiUrl, connection);
  }

  deleteConnection(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
