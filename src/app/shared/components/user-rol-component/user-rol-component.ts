import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { ProfessionalProfile } from '../../interfaces/professional.interface';
import { CapitalcasePipe } from "../../pipes/capitalcase-pipe";

@Component({
  selector: 'app-user-rol-component',
  imports: [CapitalcasePipe],
  templateUrl: './user-rol-component.html',
  styleUrl: './user-rol-component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRolComponent {
  @Input({ required: true }) rol!: ProfessionalProfile;
  @Input() fallbackText: string = environment.defaultUserRoleText;


  get safeRol(): string {
    if (!this.rol.ROL|| this.rol.ROL.trim() === '') {
      return this.fallbackText;
    }
    return this.rol.ROL;
  }

}
