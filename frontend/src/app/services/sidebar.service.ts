import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SidebarTab = 'explorer' | 'search' | 'notebook' | 'sourceControl' | 'extensions' | 'account' | 'settings';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private activeTab = new BehaviorSubject<SidebarTab>('explorer');
  activeTab$ = this.activeTab.asObservable();

  constructor() { }

  setActiveTab(tab: SidebarTab): void {
    this.activeTab.next(tab);
  }
}
