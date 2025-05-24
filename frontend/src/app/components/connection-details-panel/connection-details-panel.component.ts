import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ConnectionInfo, ConnectionRequest } from '../../services/connection.service';

@Component({
  selector: 'app-connection-details-panel',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule
  ],
  templateUrl: './connection-details-panel.component.html',
  styleUrl: './connection-details-panel.component.scss'
})
export class ConnectionDetailsPanelComponent implements OnChanges {
  @Input() connection: ConnectionInfo | null = null;
  @Input() isEdit = false;
  @Output() save = new EventEmitter<ConnectionRequest>();
  @Output() delete = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  connectionForm: FormGroup;

  connectionTypes = [
    { value: 'mssql', label: 'Microsoft SQL Server' }
  ];
  inputTypes = [
    { value: 'parameters', label: 'Parameters' },
    { value: 'connectionString', label: 'Connection String' }
  ];
  authTypes = [
    { value: 'windows', label: 'Windows Authentication' },
    { value: 'sql', label: 'SQL Login' }
  ];
  encryptOptions = [
    { value: 'mandatory', label: 'Mandatory' },
    { value: 'optional', label: 'Optional' },
    { value: 'disabled', label: 'Disabled' }
  ];
  trustServerCertOptions = [
    { value: true, label: 'True' },
    { value: false, label: 'False' }
  ];

  constructor(private fb: FormBuilder) {
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['connection']) {
      if (this.connection) {
        this.connectionForm.patchValue(this.connection);
      } else {
        this.connectionForm.reset({
          type: 'mssql',
          inputType: 'parameters',
          authType: 'windows',
          encrypt: 'mandatory',
          trustServerCertificate: false
        });
      }
    }
  }

  onSave(): void {
    if (this.connectionForm.valid) {
      this.save.emit(this.connectionForm.value as ConnectionRequest);
    }
  }

  onDelete(): void {
    this.delete.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
} 