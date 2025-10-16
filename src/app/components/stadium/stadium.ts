import { Component, AfterViewInit, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as THREE from 'three';
import { FiltersComponent } from "../../shared/components/filters-component/filters-component";
import { ButtonFiltersComponent } from "../../shared/components/button-filters-component/button-filters-component";


@Component({
  selector: 'app-stadium',
  standalone: true,
  templateUrl: './stadium.html',
  styleUrls: ['./stadium.scss'],
  imports: [FiltersComponent, ButtonFiltersComponent]
})
export class Stadium implements AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; 
    }

    // Escena
    this.scene = new THREE.Scene();

    // Cámara
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.5,
      1000
    );
    this.camera.position.set(70, 30, 0);
    this.camera.lookAt(10, 0, 0);

    

    // Renderizador
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.nativeElement,
      antialias: true,
      alpha: true
      
    });
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Luces
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(50, 100, 50);
    this.scene.add(light);
    this.scene.add(new THREE.AmbientLight(0x404040, 1.2));

    // Césped
    
    const grassTexture = new THREE.TextureLoader().load('assets/textures/Grass005_1K-JPG_Color.jpg');
    grassTexture.wrapS = grassTexture.wrapT = THREE.RepeatWrapping;
    grassTexture.repeat.set(4, 4);

    const field = new THREE.Mesh(
      new THREE.PlaneGeometry(150, 68),
      new THREE.MeshStandardMaterial({ map: grassTexture })
    );
    field.rotation.x = -Math.PI / 2.0;
    field.scale.set(1, 1.5, 1);
    this.scene.add(field);


    // Líneas de la cancha
    const linesTexture = new THREE.TextureLoader().load('assets/textures/lines_stadium_transparent.png');
    const lines = new THREE.Mesh(
      new THREE.PlaneGeometry(150, 90),
      new THREE.MeshBasicMaterial({ map: linesTexture, transparent: true, depthWrite: false })
    );
    lines.rotation.x = -Math.PI / 2.0;
    field.scale.set(1, 1.5, 1);
    lines.position.y = 0.1;
    this.scene.add(lines);
    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      this.renderer.render(this.scene, this.camera);
    };
    animate();

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  categoryOptions = [
  { value: 'admin', label: 'Administrador' },
  { value: 'client', label: 'Cliente' },
];

statusOptions = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
];

typeOptions = [
  { value: 'premium', label: 'Premium' },
  { value: 'standard', label: 'Estándar' },
];

onCategoryFilter(value: string) {
  console.log('Filtro categoría:', value);
  }

  onStatusFilter(value: string) {
    console.log('Filtro estado:', value);
  }

  onTypeFilter(value: string) {
    console.log('Filtro tipo:', value);
  }

}
