import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-topbar',
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  menuItems = ['File', 'Edit', 'View', 'Help'];
  
  constructor(public themeService: ThemeService) {}
  
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
