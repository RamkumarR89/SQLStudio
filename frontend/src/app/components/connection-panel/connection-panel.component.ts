import { Component, EventEmitter, Output } from '@angular/core';
import { ConnectionService, ConnectionInfo, ConnectionRequest } from '../../services/connection.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatNavList, MatListItem } from '@angular/material/list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-connection-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './connection-panel.component.html',
  styleUrls: ['./connection-panel.component.scss']
})
export class ConnectionPanelComponent {
  connections: ConnectionInfo[] = [];
  selectedConnection: ConnectionInfo | null = null;
  showForm = false;
  isEdit = false;
  connectionForm: FormGroup;

  @Output() connectionSelected = new EventEmitter<ConnectionInfo>();

  constructor(private connectionService: ConnectionService, private fb: FormBuilder) {
    this.connectionForm = this.fb.group({
      type: ['mssql', Validators.required],
      inputType: ['parameters', Validators.required],
      server: ['', Validators.required],
      authType: ['windows', Validators.required],
      database: [''],
      encrypt: ['mandatory'],
      trustServerCertificate: [false],
      serverGroup: [''],
      name: [''],
      username: [''],
      password: [''],
      connectionString: ['']
    });
    this.loadConnections();
  }

  loadConnections(): void {
    this.connectionService.getConnections().subscribe(conns => this.connections = conns);
  }

  openNewConnection(): void {
    this.showForm = true;
    this.isEdit = false;
    this.selectedConnection = null;
    this.connectionForm.reset({
      type: 'mssql',
      inputType: 'parameters',
      authType: 'windows',
      encrypt: 'mandatory',
      trustServerCertificate: false
    });
  }

  editConnection(conn: ConnectionInfo): void {
    this.showForm = true;
    this.isEdit = true;
    this.selectedConnection = conn;
    this.connectionForm.patchValue(conn);
  }

  deleteConnection(conn: ConnectionInfo): void {
    if (confirm('Delete this connection?')) {
      this.connectionService.deleteConnection(conn.id).subscribe(() => this.loadConnections());
    }
  }

  selectConnection(conn: ConnectionInfo): void {
    this.connectionSelected.emit(conn);
  }

  onSubmit(): void {
    if (this.connectionForm.valid) {
      const req: ConnectionRequest = this.connectionForm.value;
      if (this.isEdit && this.selectedConnection) {
        // For now, just delete and re-add (or implement update endpoint)
        this.connectionService.deleteConnection(this.selectedConnection.id).subscribe(() => {
          this.connectionService.createConnection(req).subscribe(() => this.loadConnections());
        });
      } else {
        this.connectionService.createConnection(req).subscribe(() => this.loadConnections());
      }
      this.showForm = false;
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.selectedConnection = null;
  }
} 