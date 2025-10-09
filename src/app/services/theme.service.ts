import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

export interface Theme {
  id: string;
  name: string;
  properties: { [key: string]: string };
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<string>('light');
  public currentTheme$ = this.currentThemeSubject.asObservable();
  private isBrowser: boolean;

  private themes: Theme[] = [
    {
      id: 'light',
      name: 'Claro',
      properties: {
        '--primary-color': '#007bff',
        '--secondary-color': '#6c757d',
        '--background-color': '#ffffff',
        '--text-color': '#333333',
        '--card-background': '#f8f9fa',
        '--border-color': '#dee2e6'
      }
    },
    {
      id: 'dark',
      name: 'Oscuro',
      properties: {
        '--primary-color': '#4f9eff',
        '--secondary-color': '#adb5bd',
        '--background-color': '#121212',
        '--text-color': '#ffffff',
        '--card-background': '#1e1e1e',
        '--border-color': '#333333'
      }
    },
    {
      id: 'dark-elegant',
      name: 'Dark Elegant',
      properties: {
        '--primary-color': '#667eea',
        '--secondary-color': '#764ba2',
        '--background-color': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
        '--text-color': '#ffffff',
        '--card-background': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
        '--border-color': 'rgba(255, 255, 255, 0.2)'
      }
    },
    {
      id: 'softtek',
      name: 'Softtek Corporate',
      properties: {
        '--primary-color': '#003d82',
        '--secondary-color': '#7ed321',
        '--background-color': 'linear-gradient(135deg, #003d82 0%, #7ed321 100%)',
        '--text-color': '#ffffff',
        '--card-background': '#ffffff',
        '--border-color': '#003d82'
      }
    }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    if (this.isBrowser) {
      this.initializeTheme();
    }
  }

  private initializeTheme(): void {
    const savedTheme = this.getSavedTheme();
    if (savedTheme && this.isValidTheme(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('light');
    }
  }

  getAvailableThemes(): Theme[] {
    return this.themes;
  }

  getCurrentTheme(): string {
    return this.currentThemeSubject.value;
  }

  setTheme(themeId: string): void {
    if (!this.isValidTheme(themeId)) {
      console.warn(`Tema "${themeId}" no encontrado. Usando tema por defecto.`);
      themeId = 'light';
    }

    const theme = this.themes.find(t => t.id === themeId);
    if (theme) {
      if (this.isBrowser) {
        this.applyThemeProperties(theme.properties);
        this.updateBodyClass(themeId);
        this.saveTheme(themeId);
      }
      this.currentThemeSubject.next(themeId);
    }
  }

  toggleTheme(): void {
    const current = this.getCurrentTheme();
    const newTheme = current === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private applyThemeProperties(properties: { [key: string]: string }): void {
    if (!this.isBrowser) return;
    
    try {
      const root = document.documentElement;
      Object.keys(properties).forEach(property => {
        root.style.setProperty(property, properties[property]);
      });
    } catch (error) {
      console.warn('Error aplicando propiedades del tema:', error);
    }
  }

  private updateBodyClass(themeId: string): void {
    if (!this.isBrowser) return;
    
    try {
      document.body.className = document.body.className.replace(/theme-\w+/g, '');
      document.body.classList.add(`theme-${themeId}`);
    } catch (error) {
      console.warn('Error actualizando clase del body:', error);
    }
  }

  private isValidTheme(themeId: string): boolean {
    return this.themes.some(theme => theme.id === themeId);
  }

  private saveTheme(themeId: string): void {
    if (!this.isBrowser) return;
    
    try {
      localStorage.setItem('selected-theme', themeId);
    } catch (error) {
      console.warn('No se pudo guardar el tema:', error);
    }
  }

  private getSavedTheme(): string | null {
    if (!this.isBrowser) return null;
    
    try {
      return localStorage.getItem('selected-theme');
    } catch (error) {
      console.warn('No se pudo cargar el tema guardado:', error);
      return null;
    }
  }
}