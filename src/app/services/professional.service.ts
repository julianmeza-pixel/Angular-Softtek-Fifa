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
  { x: 51, y: 80 }, // Portero
  { x: 29, y: 65 }, // Defensa izquierdo
  { x: 43, y: 65 }, // Defensa central izq
  { x: 59, y: 65 }, // Defensa central der
  { x: 73, y: 65 }, // Defensa derecho
  { x: 36, y: 50 }, // Mediocentro izq
  { x: 51, y: 50 }, // Mediocentro
  { x: 66, y: 50 }, // Mediocentro der
  { x: 43, y: 30 }, // Delantero izq
  { x: 51, y: 25 }, // Delantero centro
  { x: 59, y: 30 }  // Delantero der
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