import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-details',
  imports: [],
  templateUrl: './modal-details.html',
  styleUrl: './modal-details.scss'
})
export class ModalDetails {

  @Input() profile: any;
  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

}
