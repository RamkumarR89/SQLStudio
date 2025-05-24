import { NgModule } from '@angular/core';
import { ConnectionDialogComponent } from './components/connection-dialog/connection-dialog.component';
import { ConnectionPanelComponent } from './components/connection-panel/connection-panel.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ConnectionDialogComponent,
    ConnectionPanelComponent
  ],
  imports: [
    MatDialogModule,
    MatSidenavModule,
    MatListModule,
    ReactiveFormsModule,
    FormsModule
  ],
})
export class AppModule { } 