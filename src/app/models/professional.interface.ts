export interface ProfessionalProfile {
  id: number;
  name: string;
  role: string;
  skills: string;
  languages: string;
  certifications: string;
  photo?: string;
  rating: number;
}

export interface Formation {
  x: number;
  y: number;
}