import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-status-bar',
  imports: [CommonModule, MatIconModule],
  templateUrl: './status-bar.component.html',
  styleUrl: './status-bar.component.scss'
})
export class StatusBarComponent {
  connectionStatus = 'Disconnected';
  serverInfo = '';
}
