import { Component, effect, EventEmitter, inject, Output, signal } from '@angular/core';
import { FiltersComponent } from "../filters-component/filters-component";
import { FiltersServices } from '../../../services/filters-services';
import { ProfessionalService } from '../../../services/professional.service';

@Component({
  selector: 'app-button-filters-component',
  imports: [FiltersComponent],
  standalone: true,
  templateUrl: './button-filters-component.html',
  styleUrl: './button-filters-component.scss'
})
export class ButtonFiltersComponent {
  @Output() filterChange = new EventEmitter<string | null>();
  showFilters = signal(false);
  private filtersService = inject(FiltersServices);
  private professionalService = inject(ProfessionalService);

  constructor() {
    effect(() => {
      if (this.showFilters()) {
        this.filtersService.loadFilters();
      }
    });
  }

  toggleFilterPopup() {
    this.showFilters.update(value => !value);
  }

  clearFilters() {
    this.filtersService.setRoles(null);
    this.filtersService.setSeniority(null);
    this.filtersService.setTechnology(null);
    this.filtersService.resetFilters();
    this.showFilters.set(false);
  }

 

  onRolChange(value: string) {
    this.filtersService.setRoles(value || null);
  }

  onSeniorityChange(value: string) {
    this.filtersService.setSeniority(value || null);
  }

  onTechnologyChange(value: string) {
    this.filtersService.setTechnology(value || null);
  }


  get rolesList() {
    return this.filtersService.rolesList();
  }

  get seniorityList() {
    return this.filtersService.seniorityList();
  }

  get technologyList() {
    return this.filtersService.technologyList();
  }

}
