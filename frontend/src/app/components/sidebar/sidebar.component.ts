import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SidebarService, SidebarTab } from '../../services/sidebar.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  @Output() openConnections = new EventEmitter<void>();
  activeTab$: Observable<SidebarTab>;
  tabs = [
    { id: 'explorer' as SidebarTab, icon: 'folder', tooltip: 'Explorer' },
    { id: 'search' as SidebarTab, icon: 'search', tooltip: 'Search' },
    { id: 'notebook' as SidebarTab, icon: 'article', tooltip: 'Notebook' },
    { id: 'sourceControl' as SidebarTab, icon: 'source', tooltip: 'Source Control' },
    { id: 'extensions' as SidebarTab, icon: 'extension', tooltip: 'Extensions' },
    { id: 'account' as SidebarTab, icon: 'account_circle', tooltip: 'Account' },
    { id: 'settings' as SidebarTab, icon: 'settings', tooltip: 'Settings' }
  ];

  constructor(private sidebarService: SidebarService) {
    this.activeTab$ = this.sidebarService.activeTab$;
  }

  ngOnInit(): void {}

  setActiveTab(tab: string): void {
    this.sidebarService.setActiveTab(tab as SidebarTab);
  }

  openConnectionsPanel(): void {
    this.openConnections.emit();
  }
}
