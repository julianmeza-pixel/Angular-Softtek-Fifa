import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Formation, ProfessionalProfile } from './shared/interfaces/professional.interface';
import { ProfessionalService } from './services/professional.service';
import { ProfessionalCard } from './components/professional-card/professional-card';
import { Stadium } from "./components/stadium/stadium";
import { ModalDetails } from "./shared/components/modal-details/modal-details";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProfessionalCard, CommonModule, Stadium, ModalDetails],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private professionalService = inject(ProfessionalService);
  professionals = this.professionalService.professionals;
  loading = this.professionalService.loading;
  error = this.professionalService.error;
  formation: Formation[] = this.professionalService.getFormation();
  selectedProfile = signal<ProfessionalProfile | null>(null);
  hoveredProfile = signal<ProfessionalProfile | null>(null);
  
  
  topProfessionals = computed(() => this.professionals().slice(0, 11));
  title = signal('SofttekFifa');

  constructor() {}
  
  toggleCard(profile: ProfessionalProfile): void {
    const current = this.selectedProfile();
    this.selectedProfile.set(current?.IS === profile.IS ? null : profile);
  }

  openProfileModal(profile: ProfessionalProfile): void {
    this.selectedProfile.set(profile);
  }

  


}
