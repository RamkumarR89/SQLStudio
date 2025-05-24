import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './services/theme.service';
import { Observable } from 'rxjs';
import { QueryResult } from './services/query.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { WelcomePanelComponent } from './components/welcome-panel/welcome-panel.component';
import { StatusBarComponent } from './components/status-bar/status-bar.component';
import { QueryEditorComponent } from './components/query-editor/query-editor.component';
import { QueryResultsComponent } from './components/query-results/query-results.component';
import { ConnectionInfo } from './services/connection.service';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ConnectionPanelComponent } from './components/connection-panel/connection-panel.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    WelcomePanelComponent,
    StatusBarComponent,
    QueryEditorComponent,
    QueryResultsComponent,
    MatSidenavModule,
    MatListModule,
    ConnectionPanelComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'AI SQL Studio';
  isDarkTheme$: Observable<boolean>;
  currentQueryResult?: QueryResult;
  isConnectionPanelOpen = false;
  activeConnection: ConnectionInfo | null = null;
  
  constructor(private themeService: ThemeService) {
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }
  
  ngOnInit(): void {}
  
  handleQueryExecuted(result: QueryResult): void {
    this.currentQueryResult = result;
  }

  onConnectionSelected(conn: ConnectionInfo) {
    this.activeConnection = conn;
    this.isConnectionPanelOpen = false;
  }
}
