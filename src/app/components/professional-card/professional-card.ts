import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProfessionalProfile } from '../../models/professional.interface';
import { ProfessionalService } from '../../services/professional.service';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-professional-card',
  imports: [NgStyle,NgClass],
  templateUrl: './professional-card.html',
  styleUrl: './professional-card.scss'
})
export class ProfessionalCard {
  @Input() profile!: ProfessionalProfile;
  @Input() position!: { x: number; y: number };
  @Output() cardHover = new EventEmitter<ProfessionalProfile>();
  @Output() cardLeave = new EventEmitter<void>();

  constructor(private professionalService:ProfessionalService) { }

  onMouseEnter(): void {
    this.cardHover.emit(this.profile);
  }

  onMouseLeave(): void {
    this.cardLeave.emit();
  }

  getRatingColorClass(): string {
    const colorType = this.professionalService.getRatingColor(this.profile.rating);
    return `rating-${colorType}`;
  }

  getPositionStyle(): { [key: string]: string } {
    return {
      left: `${this.position.x}%`,
      top: `${this.position.y}%`
    };
  }

  getRoleAbbreviation(): string {
    return this.profile.role.split(' ')[0].substring(0, 3).toUpperCase();
  }

  getFirstName(): string {
    return this.profile.name.split(' ')[0];
  }
  getLastName(): string {
    return this.profile.name.split(' ')[1] || '';
  }
}
