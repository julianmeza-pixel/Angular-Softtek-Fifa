import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { ProfessionalProfile, Formation } from '../models/professional.interface';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
   private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  
 


  private formation: Formation[]= [
  { x: 51, y: 80 }, // Portero
  { x: 30, y: 65 }, // Defensa izquierdo
  { x: 42, y: 65 }, // Defensa central izq
  { x: 60, y: 65 }, // Defensa central der
  { x: 72, y: 65 }, // Defensa derecho
  { x: 36, y: 50 }, // Mediocentro izq
  { x: 51, y: 50 }, // Mediocentro
  { x: 66, y: 50 }, // Mediocentro der
  { x: 42, y: 30 }, // Delantero izq
  { x: 51, y: 25 }, // Delantero centro
  { x: 60, y: 30 }  // Delantero der
  
];

  

  getProfessionals(): Observable<ProfessionalProfile[]> {
    return this.http.get<{ candidates: ProfessionalProfile[] }>(this.apiUrl).pipe(
      
      map(response => response.candidates),
      catchError(this.handleError)
    );
  }

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

  private mapApiProfile(apiData: any, index: number): ProfessionalProfile {
  return {
    
    IS: apiData.IS,
    ROL: apiData.ROL?.replace(/\n/g, ' ') || 'Sin Rol',
    SKILLS: apiData.SKILLS || '',
    IDIOMAS: apiData.IDIOMAS || '',
    CERTIFICACIONES: apiData.CERTIFICACIONES || '',
    rating: Math.floor(Math.random() * 20) + 80 // ⚡ 80–100 hasta que la API mande rating
  };
}
}