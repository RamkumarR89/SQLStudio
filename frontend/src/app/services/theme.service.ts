import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isDarkTheme = new BehaviorSubject<boolean>(true);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  constructor() { }

  toggleTheme(): void {
    this.isDarkTheme.next(!this.isDarkTheme.value);
  }

  getCurrentTheme(): boolean {
    return this.isDarkTheme.value;
  }
}
