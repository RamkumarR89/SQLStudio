import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-connections-panel',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatListModule, MatCardModule],
  templateUrl: './connections-panel.component.html',
  styleUrl: './connections-panel.component.scss'
})
export class ConnectionsPanelComponent {
  connections = [
    { id: 1, name: 'frc-sh-stg-db01.database...', status: 'disconnected' },
    { id: 2, name: 'prod-db02.database...', status: 'connected' }
  ];
  showNewConnectionForm = false;

  toggleNewConnectionForm() {
    this.showNewConnectionForm = !this.showNewConnectionForm;
  }
} 