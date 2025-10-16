import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ProfessionalProfile, Formation } from '../shared/interfaces/professional.interface';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FiltersServices } from './filters-services';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  private http = inject(HttpClient);
  private filterService = inject(FiltersServices);
  private apiUrl = environment.apiUrl;
  professionals = signal<ProfessionalProfile[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  constructor() { 
    effect(() => {
      const filters = this.filterService.filters();
      this.loadProfessionals(filters);
    });
  }

  private loadProfessionals(filters: any): void {
    this.loading.set(true);
    this.error.set(null);
    this.professionals.set([]);
    
    let params = new HttpParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params = params.set(key, value.toString());
    });

    this.http
      .get<{ candidates: ProfessionalProfile[] }>(this.apiUrl, { params })
      .pipe(
        map(response => response.candidates ?? []),
        catchError(err => this.handleError(err))
      )
      .subscribe({
        next: (profiles) => {
          this.professionals.set(profiles);
          this.loading.set(false);
        },
        error: () => {
          this.professionals.set([]);
          this.loading.set(false);
        }
      });
  }


  private formation: Formation[]= [
  { x: 51, y: 85 }, // Portero
  { x: 20, y: 70 }, // Defensa izquierdo
  { x: 38, y: 70 }, // Defensa central izq
  { x: 63, y: 70 }, // Defensa central der
  { x: 81, y: 70 }, // Defensa derecho
  { x: 29, y: 50 }, // Mediocentro izq
  { x: 51, y: 50 }, // Mediocentro
  { x: 72, y: 50 }, // Mediocentro der
  { x: 38, y: 25 }, // Delantero izq
  { x: 51, y: 20 }, // Delantero centro
  { x: 64, y: 25 }  // Delantero der
];

  

  getFormation(): Formation[] {
    return this.formation;
  }

  getRatingColor(rating: number): string {
    if (rating >= 90) return 'gold';
    if (rating >= 85) return 'silver';
    return 'bronze';
  }

  parseSkills(skillsText: string): string[] {
    return skillsText
      .split('\n')
      .filter(line => line.startsWith('·'))
      .map(line => line.replace('·', '').trim());
  }

  

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la API:', error);
    return throwError(() => new Error('Error al obtener los candidatos.'));
  }


}