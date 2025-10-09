import { HttpClient } from '@angular/common/http';
import { Injectable, signal, computed } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltersServices {
  private apiUrlRoles =environment.apiUrlRoles;
  private apiUrlSeniority =environment.apiUrlSeniority;
  private apiUrlTechno = environment.apiUrlTechno;

  roles = signal<string | null>(null);
  seniority = signal<string | null>(null);
  technology = signal<string | null>(null);
  
  rolesList = signal<{ value: string, label: string }[]>([]);
  seniorityList = signal<{ value: string, label: string }[]>([]);
  technologyList = signal<{ value: string, label: string }[]>([]);

  filters = computed(() => ({
    roles: this.roles(),
    seniority: this.seniority(),
    technology: this.technology(),
  }));

  constructor(private http: HttpClient) {}

   loadFilters() {
    this.loadRoles();
    this.loadSeniorities();
    this.loadTechnologies();
  }

  private loadRoles() {
  this.http.get<{ roles: string[] }>(this.apiUrlRoles).pipe(
    map(data =>
      data.roles.map(role => ({
        value: role,
        label: role
      }))
    )
  ).subscribe({
    next: (rolesList) => {
      this.rolesList.set(rolesList);
    },
    error: (err) => {
      console.error('Error cargando roles:', err);
      this.rolesList.set([]);
    }
  });
}

  private loadSeniorities() {
  this.http.get<{ seniorities: string[] }>(this.apiUrlSeniority).pipe(
    map(data =>
      data.seniorities.map(item => ({
        value: item,
        label: item
      }))
    )
  ).subscribe({
    next: (seniorityList) => {
      this.seniorityList.set(seniorityList);
    },
    error: (err) => {
      console.error('Error cargando seniorities:', err);
      this.seniorityList.set([]);
    }
  });
}


  private loadTechnologies() {
  this.http.get<{ technologies: string[] }>(this.apiUrlTechno).pipe(
    map(data =>
      data.technologies.map(tech => ({
        value: tech,
        label: tech
      }))
    )
  ).subscribe({
    next: (technologyList) => {
      this.technologyList.set(technologyList);
    },
    error: (err) => {
      console.error('Error cargando tecnologías:', err);
      this.technologyList.set([]);
    }
  });
}



  setRoles(value: string | null) {
    this.roles.set(value);
  }

  setSeniority(value: string | null) {
    this.seniority.set(value);
  }

  setTechnology(value: string | null) {
    this.technology.set(value);
  }

  resetFilters() {
    this.roles.set(null);
    this.seniority.set(null);
    this.technology.set(null);
  }
  
}
