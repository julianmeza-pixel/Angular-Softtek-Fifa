import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Formation, ProfessionalProfile } from './models/professional.interface';
import { ProfessionalService } from './services/professional.service';
import { ProfessionalCard } from './components/professional-card/professional-card';
import { CommonModule, NgClass, NgForOf, NgIf } from '@angular/common';
import { FifaFieldComponent } from './components/fifa-field/fifa-field';
import { Stadium } from "./components/stadium/stadium";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProfessionalCard, NgClass , CommonModule, Stadium],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  professionals: ProfessionalProfile[] = [];
  formation: Formation[] = [];
  hoveredProfile: ProfessionalProfile | null = null;
  protected readonly title = signal('SofttekFifa');

  constructor(private professionalService: ProfessionalService) { }
  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.professionalService.getProfessionals().subscribe(
      (profiles: ProfessionalProfile[]) => {
        this.professionals = profiles.slice(0, 11);
      }
    );
    this.formation = this.professionalService.getFormation();
  }

  onProfileHover(profile: ProfessionalProfile): void {
    this.hoveredProfile = profile;
  }

  onProfileLeave(): void {
    this.hoveredProfile = null;
  }

  getRatingColorClass(rating: number): string {
    const colorType = this.professionalService.getRatingColor(rating);
    return `rating-${colorType}`;
  }

  parseSkills(skillsText: string): string[] {
    return this.professionalService.parseSkills(skillsText).slice(0, 6);
  }

  getLanguagesText(languages: string): string {
    return languages.replace('IDIOMAS\n', '');
  }
}
