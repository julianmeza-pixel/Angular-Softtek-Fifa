import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProfessionalProfile, Formation } from '../models/professional.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalService {
  
  private mockProfiles: ProfessionalProfile[] = [
     {
    id: 1,
    name: "Carlos Rodríguez",
    role: "Gerente de Proyectos",
    skills: "SKILLS\n· Gestión de Proyectos\n· ITIL\n· Liderazgo\n· Gestión de Servicios\n· Análisis de Información\n· Gestión de Relaciones",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B1 - Intermedio",
    certifications: "PMP, ITIL Foundation",
    rating: 92,
    photo: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    name: "María López",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 3,
    name: "María López",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 4,
    name: "María López",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 4,
    name: "María López",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 4,
    name: "María López",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  }
    // ... resto de perfiles del mockProfiles
  ];

  private formation: Formation[] = [
    { x: 50, y: 82 }, // GK
    { x: 15, y: 68 }, // LB
    { x: 35, y: 70 }, // CB
    { x: 65, y: 70 }, // CB
    { x: 85, y: 68 }, // RB
    { x: 20, y: 48 }, // LM
    { x: 50, y: 50 }, // CM
    { x: 80, y: 48 }, // RM
    { x: 20, y: 22 }, // LW
    { x: 50, y: 20 }, // ST
    { x: 80, y: 22 }, // RW
  ];

  getProfessionals(): Observable<ProfessionalProfile[]> {
    return of(this.mockProfiles);
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

  private mapApiProfile(apiData: any, index: number): ProfessionalProfile {
  return {
    id: index + 1,
    name: apiData.NOMBRE || `Profesional ${index + 1}`, // ⚡ si la API no trae nombre
    role: apiData.ROL?.replace(/\n/g, ' ') || 'Sin Rol',
    skills: apiData.SKILLS || '',
    languages: apiData.IDIOMAS || '',
    certifications: apiData.CERTIFICACIONES || '',
    photo: apiData.PHOTO || undefined, // si más adelante la API lo trae
    rating: Math.floor(Math.random() * 20) + 80 // ⚡ 80–100 hasta que la API mande rating
  };
}
}