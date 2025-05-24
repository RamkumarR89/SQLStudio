import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { Observable } from 'rxjs';
import { QueryResult } from './services/query.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent, SidebarTab } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { WelcomePanelComponent } from './components/welcome-panel/welcome-panel.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { QueryEditorComponent } from './components/query-editor/query-editor.component';
import { QueryResultsComponent } from './components/query-results/query-results.component';
import { ConnectionInfo } from './services/connection.service';
import { ConnectionsPanelComponent } from './components/connections-panel/connections-panel.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    WelcomePanelComponent,
    StatusBarComponent,
    QueryEditorComponent,
    QueryResultsComponent,
    ConnectionsPanelComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'AI SQL Studio';
  showConnectionsPanel = true;
  currentQueryResult?: QueryResult;
  isDarkTheme$: Observable<boolean>;
  activeTab: SidebarTab | null = 'explorer';
  
  constructor(private themeService: ThemeService) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }
  
  ngOnInit(): void {}
  
  handleQueryExecuted(result: QueryResult): void {
    this.currentQueryResult = result;
  }

  onConnectionSelected(conn: ConnectionInfo) {
    this.showConnectionsPanel = false;
  }

  toggleConnectionsPanel() {
    this.showConnectionsPanel = !this.showConnectionsPanel;
  }

  onSidebarTabChanged(tab: SidebarTab) {
    this.activeTab = (this.activeTab === tab) ? null : tab;
  }
}
