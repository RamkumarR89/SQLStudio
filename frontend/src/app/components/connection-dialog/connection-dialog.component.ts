import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConnectionRequest } from '../../services/connection.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-connection-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './connection-dialog.component.html',
  styleUrls: ['./connection-dialog.component.scss']
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