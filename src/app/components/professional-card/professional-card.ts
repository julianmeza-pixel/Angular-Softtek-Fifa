import { Component, EventEmitter, Input, Output,OnInit  } from '@angular/core';
import { ProfessionalProfile, Formation} from '../../models/professional.interface';
import { ProfessionalService } from '../../services/professional.service';
import { NgClass, NgStyle, NgFor  } from '@angular/common';
interface Skill {
  name: string;
  level: number;
}
@Component({
  selector: 'app-professional-card',
  imports: [NgStyle,NgClass,NgFor],
  templateUrl: './professional-card.html',
  styleUrl: './professional-card.scss'
})


export class ProfessionalCard {
  constructor(private professionalService:ProfessionalService) { }
  @Input() profile!: ProfessionalProfile;
  professionals: ProfessionalProfile[] = [];
  formation: Formation[] = [];
  playerName = 'Juan Pérez';
  position = 'Full Stack Developer';
  level = 'senior';
  experience = 'JavaScript';
  photoUrl: string | null = null;

  // Mapping de nivel → número
  levelMapping: Record<string, number> = {
    'trainee': 65,
    'junior': 72,
    'semi-senior': 79,
    'senior': 85,
    'lead': 91,
    'architect': 96
  };

  // Stats
  stats = {
    coding: 85,
    problemSolving: 88,
    communication: 82,
    leadership: 75,
    creativity: 90,
    teamwork: 87
  };

  // Skills traseros
  backTitle = 'SKILLS PRINCIPALES';
  backSkills: Skill[] = [
    { name: 'React', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'TypeScript', level: 88 },
    { name: 'MongoDB', level: 82 }
  ];

  // Flip de la carta
  flipped = false;
  ngOnInit(){
    this.formation = this.professionalService.getFormation();
   // this.professionals = this.professionalService.getProfessionals();
  }
  

  toggleFlip() {
    this.flipped = !this.flipped;
  }

  updatePhoto(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const reader = new FileReader();
      reader.onload = e => this.photoUrl = e.target?.result as string;
      reader.readAsDataURL(input.files[0]);
    }
  }

  addBackSkill() {
    this.backSkills.push({ name: '', level: 50 });
  }

  removeBackSkill(index: number) {
    this.backSkills.splice(index, 1);
  }
}

