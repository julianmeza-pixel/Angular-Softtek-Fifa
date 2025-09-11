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
    name: "María Juan",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 3,
    name: "María Juan",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 4,
    name: "María Juan",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 5,
    name: "María Juan",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 6,
    name: "María Juan",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 7,
    name: "María Juan",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 8,
    name: "María Juan",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 9,
    name: "María Juan",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 10,
    name: "María Juan",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  },
  {
    id: 11,
    name: "María Juan",
    role: "Analista de Datos",
    skills: "SKILLS\n· SQL\n· Power BI\n· Python\n· Estadística",
    languages: "IDIOMAS\nEspañol Nativo\nInglés B2 - Intermedio",
    certifications: "Azure Data Fundamentals",
    rating: 87,
    photo: "https://randomuser.me/api/portraits/women/45.jpg"
  }
    // ... resto de perfiles del mockProfiles
  ];


  private formation: Formation[]= [
  { x: 50, y: 80 }, // Portero
  { x: 20, y: 65 }, // Defensa izquierdo
  { x: 40, y: 65 }, // Defensa central izq
  { x: 60, y: 65 }, // Defensa central der
  { x: 80, y: 65 }, // Defensa derecho
  { x: 30, y: 50 }, // Mediocentro izq
  { x: 50, y: 50 }, // Mediocentro
  { x: 70, y: 50 }, // Mediocentro der
  { x: 30, y: 30 }, // Delantero izq
  { x: 50, y: 25 }, // Delantero centro
  { x: 70, y: 30 }  // Delantero der
  
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