import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

interface ShortcutTip {
  description: string;
  shortcut: string;
}

@Component({
  selector: 'app-welcome-panel',
  imports: [CommonModule, MatButtonModule, MatListModule, MatIconModule],
  templateUrl: './welcome-panel.component.html',
  styleUrl: './welcome-panel.component.scss'
})
export class WelcomePanelComponent {
  shortcutTips: ShortcutTip[] = [
    { description: 'New Query', shortcut: 'Ctrl+N' },
    { description: 'Open File', shortcut: 'Ctrl+O' },
    { description: 'Save', shortcut: 'Ctrl+S' },
    { description: 'Execute Query', shortcut: 'F5' },
    { description: 'Cancel Query', shortcut: 'Alt+F5' }
  ];
}
