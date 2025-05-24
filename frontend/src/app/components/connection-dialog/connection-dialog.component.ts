import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ConnectionRequest } from '../../services/connection.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-connection-dialog',
  templateUrl: './connection-dialog.component.html',
  styleUrls: ['./connection-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ]
})
export class ConnectionDialogComponent {
  connectionForm: FormGroup;
  connectionTypes = [
    { value: 'mssql', label: 'Microsoft SQL Server' },
    // Add more types as needed
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

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ConnectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
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

  onSubmit(): void {
    if (this.connectionForm.valid) {
      this.dialogRef.close(this.connectionForm.value as ConnectionRequest);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  openAdvanced(): void {
    // Implement advanced options if needed
  }
} 