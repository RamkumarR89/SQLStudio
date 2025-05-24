import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ConnectionDetailsPanelComponent } from '../connection-details-panel/connection-details-panel.component';
import { ConnectionService, ConnectionInfo, ConnectionRequest } from '../../services/connection.service';

@Component({
  selector: 'app-connections-panel',
  standalone: true,
  imports: [
    CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, MatListModule, MatCardModule, MatSidenavModule, MatTabsModule, ConnectionDetailsPanelComponent
  ],
  templateUrl: './connections-panel.component.html',
  styleUrl: './connections-panel.component.scss'
})
export class ConnectionsPanelComponent {
  connections: ConnectionInfo[] = [];
  showNewConnectionForm = false;
  drawerOpened = false;
  selectedConnection: ConnectionInfo | null = null;

  constructor(private connectionService: ConnectionService) {
    this.loadConnections();
  }

  loadConnections() {
    this.connectionService.getConnections().subscribe(conns => this.connections = conns);
  }

  openNewConnection() {
    this.selectedConnection = null;
    this.drawerOpened = true;
  }

  editConnection(conn: ConnectionInfo) {
    this.selectedConnection = conn;
    this.drawerOpened = true;
  }

  closeDrawer() {
    this.drawerOpened = false;
    this.selectedConnection = null;
  }

  onSaveConnection(req: ConnectionRequest) {
    if (this.selectedConnection) {
      // Edit: delete and re-add (or implement update endpoint)
      this.connectionService.deleteConnection(this.selectedConnection.id).subscribe(() => {
        this.connectionService.createConnection(req).subscribe(() => {
          this.loadConnections();
          this.closeDrawer();
        });
      });
    } else {
      // New
      this.connectionService.createConnection(req).subscribe(() => {
        this.loadConnections();
        this.closeDrawer();
      });
    }
  }

  deleteConnection(conn: ConnectionInfo) {
    if (confirm('Delete this connection?')) {
      this.connectionService.deleteConnection(conn.id).subscribe(() => this.loadConnections());
    }
  }

  onDeleteConnection() {
    if (this.selectedConnection && confirm('Delete this connection?')) {
      this.connectionService.deleteConnection(this.selectedConnection.id).subscribe(() => {
        this.loadConnections();
        this.closeDrawer();
      });
    }
  }
} 