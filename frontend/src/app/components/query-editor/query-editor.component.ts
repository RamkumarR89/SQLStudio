import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConnectionService, ConnectionInfo } from '../../services/connection.service';
import { QueryService, QueryRequest } from '../../services/query.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionDialogComponent } from '../connection-dialog/connection-dialog.component';

@Component({
  selector: 'app-query-editor',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './query-editor.component.html',
  styleUrl: './query-editor.component.scss'
})
export class QueryEditorComponent implements OnInit {
  @Output() queryExecuted = new EventEmitter<any>();
  @Input() activeConnection: ConnectionInfo | null = null;
  
  queryForm: FormGroup;
  connections: ConnectionInfo[] = [];
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private connectionService: ConnectionService,
    private queryService: QueryService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.queryForm = this.fb.group({
      connectionId: [''],
      sql: ['SELECT * FROM employees ORDER BY salary DESC;']
    });
  }

  ngOnInit(): void {
    this.loadConnections();
  }

  loadConnections(): void {
    this.connectionService.getConnections().subscribe({
      next: (connections) => {
        this.connections = connections;
        if (connections.length > 0) {
          this.queryForm.patchValue({ connectionId: connections[0].id });
        }
      },
      error: (error) => {
        this.snackBar.open('Failed to load connections', 'Close', { duration: 3000 });
        console.error('Error loading connections:', error);
      }
    });
  }

  executeQuery(): void {
    if (!this.queryForm.value.connectionId) {
      this.snackBar.open('Please select a connection', 'Close', { duration: 3000 });
      return;
    }

    const queryRequest: QueryRequest = {
      connectionId: this.queryForm.value.connectionId,
      sql: this.queryForm.value.sql
    };

    this.isLoading = true;
    
    this.queryService.executeQuery(queryRequest).subscribe({
      next: (result) => {
        this.isLoading = false;
        this.queryExecuted.emit(result);
        
        if (result.error) {
          this.snackBar.open(`Error: ${result.error}`, 'Close', { duration: 5000 });
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.snackBar.open('Failed to execute query', 'Close', { duration: 3000 });
        console.error('Error executing query:', error);      }
    });
  }

  setQuery(sql: string): void {
    this.queryForm.patchValue({ sql });
  }

  openNewConnectionDialog(): void {
    const dialogRef = this.dialog.open(ConnectionDialogComponent, {
      width: '500px',
      data: {}
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.connectionService.createConnection(result).subscribe({
          next: () => this.loadConnections(),
          error: (error) => {
            this.snackBar.open('Failed to create connection', 'Close', { duration: 3000 });
            console.error('Error creating connection:', error);
          }
        });
      }
    });
  }
}
