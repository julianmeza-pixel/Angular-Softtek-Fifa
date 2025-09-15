import { Component, EventEmitter, Input, Output,OnInit  } from '@angular/core';
import { ProfessionalProfile, Formation} from '../../models/professional.interface';
import { ProfessionalService } from '../../services/professional.service';
import { NgClass, NgStyle, NgFor, UpperCasePipe } from '@angular/common';
interface Skill {
  name: string;
  level: number;
}
@Component({
  selector: 'app-professional-card',
  imports: [NgStyle,NgClass,NgFor, UpperCasePipe],
  templateUrl: './professional-card.html',
  styleUrl: './professional-card.scss'
})


export class ProfessionalCard {
  constructor(private professionalService:ProfessionalService) { }
  @Input() profile!: ProfessionalProfile;
   @Output() showDetails = new EventEmitter<any>();
  professionals: ProfessionalProfile[] = [];
  formation: Formation[] = [];
  playerName = 'Juan Pérez';
  position = 'Full Stack Developer';
  level = 'senior';
  experience = 'JavaScript';
  photoUrl: string | null = null;
  loading = true;
  error = '';


  // Mapping de nivel → número
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

  updatePhoto(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const reader = new FileReader();
      reader.onload = e => this.photoUrl = e.target?.result as string;
      reader.readAsDataURL(input.files[0]);
    }
  }

 
  openModal() {
    this.showDetails.emit(this.profile);
  }
}

