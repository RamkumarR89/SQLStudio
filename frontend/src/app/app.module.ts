import { NgModule } from '@angular/core';
import { ConnectionDialogComponent } from './components/connection-dialog/connection-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConnectionDialogComponent
  ],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class AppModule { } 