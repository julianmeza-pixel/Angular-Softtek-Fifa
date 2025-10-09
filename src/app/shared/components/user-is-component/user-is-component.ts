import { ChangeDetectionStrategy, Component, Input} from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { environment } from '../../../../../environments/environment';
import { ProfessionalProfile } from '../../interfaces/professional.interface';
import { SeniorityIconPipe } from "../../pipes/seniority-icon-pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-is-component',
  imports: [UpperCasePipe, SeniorityIconPipe,CommonModule],
  templateUrl: './user-is-component.html',
  styleUrl: './user-is-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserIsComponent {
  @Input({ required: true }) is!: ProfessionalProfile;
  @Input() fallbackText: string = environment.defaultUserRoleText;

  get safeIS(): string {
    if (!this.is.IS|| this.is.IS.trim() === '') {
      return this.fallbackText;
    }
    return this.is.IS;
  }

}
