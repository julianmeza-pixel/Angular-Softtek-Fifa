import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild, ElementRef} from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-modal-details',
  imports: [UpperCasePipe, MatTabsModule],
  templateUrl: './modal-details.html',
  styleUrl: './modal-details.scss'
})
export class ModalDetails implements AfterViewInit{
  constructor(private el: ElementRef){}
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @Input() profile: any;
  @Output() closeModal = new EventEmitter<void>();
  
  close() {
    this.closeModal.emit();
  }
  taxonomias = [
    '010-AppDev',
    '020-DigDev',
    '021-DevOps',
    '022-RPA',
    '023-DigComm',
    '030-QA&V',
    '051-Cloud',
    '060-CyberSec',
    '080-D&A'
  ];
  certifications: string[] = [];
  skills: string[] = [];
  idiomas: string[] = [];
  tax: any;

  ngOnChanges() {
    
    if(this.profile){
      const randomIndex = Math.floor(Math.random() * this.taxonomias.length);
      this.tax = this.taxonomias[randomIndex];
    }
    
    if (this.profile?.CERTIFICACIONES) {
      this.certifications = this.profile.CERTIFICACIONES
        .split(',')
        .map((c: string) => c.trim()) 
        .filter((c: string) => c.length > 0); 
    }
    if (this.profile?.SKILLS) {
        this.skills = this.profile.SKILLS
          .split(',')
          .map((c: string) => c.trim()) 
          .filter((c: string) => c.length > 0); 
    }
    if (this.profile?.IDIOMAS) {
        this.idiomas = this.profile.IDIOMAS
          .split(',')
          .map((c: string) => c.trim()) 
          .filter((c: string) => c.length > 0); 
    }
  }

  ngAfterViewInit() {
    
  }
  
  

}

