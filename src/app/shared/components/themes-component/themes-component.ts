import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThemeService, Theme } from '../../../services/theme.service';

@Component({
  selector: 'app-themes-component',
  imports: [],
  templateUrl: './themes-component.html',
  styleUrl: './themes-component.scss'
})
export class ThemesComponent {

availableThemes: Theme[] = [];
  currentTheme: string = 'light';
  isDropdownOpen: boolean = false;
  showSimpleToggle: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    this.availableThemes = this.themeService.getAvailableThemes();
    this.themeService.currentTheme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.currentTheme = theme;
      });
    document.addEventListener('click', this.handleClickOutside.bind(this));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  selectTheme(themeId: string): void {
    this.themeService.setTheme(themeId);
    this.isDropdownOpen = false;
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getCurrentThemeName(): string {
    const theme = this.availableThemes.find(t => t.id === this.currentTheme);
    return theme ? theme.name : 'Tema';
  }

  getThemePreviewStyle(theme: Theme): { [key: string]: string } {
    return {
      'background': theme.properties['--primary-color'] || '#007bff',
      'border': `2px solid ${theme.properties['--border-color'] || '#ccc'}`
    };
  }

  private handleClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.theme-dropdown')) {
      this.isDropdownOpen = false;
    }
  }
}
