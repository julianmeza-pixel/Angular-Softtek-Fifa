import { Component, EventEmitter, Input, Output,OnInit , } from '@angular/core';
import { ProfessionalProfile, Formation} from '../../shared/interfaces/professional.interface';
import { AvatarComponent } from '../../shared/components/avatar-component/avatar-component'
import { ProfessionalService } from '../../services/professional.service';
import { UserRolComponent } from "../../shared/components/user-rol-component/user-rol-component";
import { UserIsComponent } from "../../shared/components/user-is-component/user-is-component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-professional-card',
  imports: [AvatarComponent, UserRolComponent, UserIsComponent, CommonModule],
  templateUrl: './professional-card.html',
  styleUrl: './professional-card.scss'
})


export class ProfessionalCard {
  constructor(private professionalService:ProfessionalService, ) { }

  @Input() profile!: ProfessionalProfile;
  @Output() showDetails = new EventEmitter<any>();
  professionals: ProfessionalProfile[] = [];
  formation: Formation[] = [];
  loading = true;
  error = '';

  levelMapping: Record<string, number> = {
    'trainee': 65,
    'junior': 72,
    'semi-senior': 79,
    'senior': 85,
    'lead': 91,
    'architect': 96
  };

  
  ngOnInit(){
    this.formation = this.professionalService.getFormation();
  }

 
  openModal() {
    this.showDetails.emit(this.profile);
  }
}

