import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ConnectionDialogComponent } from '../connection-dialog/connection-dialog.component';
import { ConnectionService, ConnectionInfo, ConnectionRequest } from '../../services/connection.service';
import { MatListModule } from '@angular/material/list';

export type SidebarTab = 'connect' | 'explorer' | 'search' | 'notebook' | 'sourceControl' | 'extensions' | 'account' | 'settings';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule, MatListModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Input() activeTab: SidebarTab = 'connect';
  @Output() tabChanged = new EventEmitter<SidebarTab>();
  @Output() connectionsClicked = new EventEmitter<void>();
  activeTab$: Observable<SidebarTab>;
  tabs = [
    { id: 'connect' as SidebarTab, icon: 'link', tooltip: 'Connect' },
    { id: 'explorer' as SidebarTab, icon: 'storage', tooltip: 'Explorer' },
    { id: 'search' as SidebarTab, icon: 'search', tooltip: 'Search' },
    { id: 'notebook' as SidebarTab, icon: 'book', tooltip: 'Notebook' },
    { id: 'sourceControl' as SidebarTab, icon: 'source', tooltip: 'Source Control' },
    { id: 'extensions' as SidebarTab, icon: 'extension', tooltip: 'Extensions' },
    { id: 'account' as SidebarTab, icon: 'person', tooltip: 'Account' },
    { id: 'settings' as SidebarTab, icon: 'settings', tooltip: 'Settings' }
  ];
  connections: ConnectionInfo[] = [];

  constructor(
    private sidebarService: SidebarService,
    private dialog: MatDialog,
    private connectionService: ConnectionService
  ) {
    this.activeTab$ = this.sidebarService.activeTab$;
  }

  ngOnInit(): void {
    this.loadConnections();
  }

  loadConnections(): void {
    this.connectionService.getConnections().subscribe(conns => this.connections = conns);
  }

  onTabClick(tab: SidebarTab) {
    this.tabChanged.emit(tab);
    if (tab === 'connections' as SidebarTab) {
      this.connectionsClicked.emit();
    }
  }

  openConnectionDialog(conn?: ConnectionInfo): void {
    const dialogRef = this.dialog.open(ConnectionDialogComponent, {
      width: '500px',
      data: conn || {}
    });
    dialogRef.afterClosed().subscribe((result: ConnectionRequest) => {
      if (result) {
        if (conn) {
          // For edit: delete and re-add (or implement update endpoint)
          this.connectionService.deleteConnection(conn.id).subscribe(() => {
            this.connectionService.createConnection(result).subscribe(() => this.loadConnections());
          });
        } else {
          this.connectionService.createConnection(result).subscribe(() => this.loadConnections());
        }
      }
    });
  }

  editConnection(conn: ConnectionInfo): void {
    this.openConnectionDialog(conn);
  }

  deleteConnection(conn: ConnectionInfo): void {
    if (confirm('Delete this connection?')) {
      this.connectionService.deleteConnection(conn.id).subscribe(() => this.loadConnections());
    }
  }
}
