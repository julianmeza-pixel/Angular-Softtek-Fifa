import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FiltersServices } from '../../../services/filters-services';

@Component({
  selector: 'app-filters-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './filters-component.html',
  styleUrls: ['./filters-component.scss'],
})
export class FiltersComponent implements OnInit {
  @Input() label = '';
  @Input() options: { value: string; label: string }[] = [];
  @Input() type: 'roles' | 'seniority' | 'technology' = 'roles';

  control = new FormControl('');
  private filtersService = inject(FiltersServices);

  ngOnInit() {
    const initial = this.getInitialValue();
    if (initial) this.control.setValue(initial);

    this.control.valueChanges.subscribe((value) => {
      if (value !== null) {
        switch (this.type) {
          case 'roles':
            this.filtersService.setRoles(value);
            break;
          case 'seniority':
            this.filtersService.setSeniority(value);
            break;
          case 'technology':
            this.filtersService.setTechnology(value);
            break;
        }
      }
    });
  }

  private getInitialValue(): string | null {
    switch (this.type) {
      case 'roles':
        return this.filtersService.roles();
      case 'seniority':
        return this.filtersService.seniority();
      case 'technology':
        return this.filtersService.technology();
      default:
        return null;
    }
  }
}
