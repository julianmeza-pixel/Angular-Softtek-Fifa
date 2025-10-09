import { Component, Input, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { ProfessionalProfile } from '../../interfaces/professional.interface';

@Component({
  selector: 'app-avatar-component',
  imports: [],
  templateUrl: './avatar-component.html',
  styleUrl: './avatar-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent {
  @Input() defaultImage = '../../../assets/12225935.png';
  @Input({ required: true }) user!: ProfessionalProfile;
  @Input() altPrefix = 'Avatar de';
  @Input() sizePx?: number;
  @HostBinding('style.--avatar-size-px')

  get avatarSizeCssVar(): string | null {
    return this.sizePx ? `${this.sizePx}px` : null;
  }

  currentSrc?: string | null;

  ngOnInit(): void {
    this.currentSrc = this.user?.fotoUrl ?? this.defaultImage;
  }

  onImgError(event: Event) {
    const img = event.target as HTMLImageElement | null;
    const fallback = this.defaultImage;
    if (!img) return;
    if (img.src === fallback) return;
    this.currentSrc = fallback;
    img.src = fallback;
  }

  get alt(): string {
    return `${this.altPrefix} ${this.user?.IS ?? ''}`.trim();
  }

  onImgLoad() {
    // logica para agregar un loading o animacion minetras se carga la imagen 
  }

}
