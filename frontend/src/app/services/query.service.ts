import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface QueryRequest {
  connectionId: number;
  sql: string;
}

export interface QueryResult {
  columns: string[];
  rows: any[][];
  rowCount: number;
  executionTime: number;
  error?: string;
}

export interface QueryHistory {
  id: number;
  connectionId: number;
  sql: string;
  executed_at: Date;
}

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  private apiUrl = 'http://localhost:8000/api/queries';

  constructor(private http: HttpClient) { }

  executeQuery(query: QueryRequest): Observable<QueryResult> {
    return this.http.post<QueryResult>(`${this.apiUrl}/execute`, query);
  }

  getQueryHistory(): Observable<QueryHistory[]> {
    return this.http.get<QueryHistory[]>(`${this.apiUrl}/history`);
  }
}
