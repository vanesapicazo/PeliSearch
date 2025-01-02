import { Component, effect, inject, signal } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pagina-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagina-home.component.html',
  styleUrl: './pagina-home.component.css',
})
export class PaginaHomeComponent {
  peliculasService = inject(PeliculasService);
  peliculasPopulares = signal<any>([]);
  peliculasEnEmision = signal<any>([]);
  peliculasProximamente = signal<any>([]);

  constructor() {
    this.obtenerPeliculasPopulares();
    this.obtenerPeliculasEnEmision();
    this.obtenerPeliculasProximamente();
  }

  obtenerPeliculasPopulares() {
    this.peliculasService.getPeliculasPopulares().subscribe({
      next: (peliculasPopulares) =>
        this.peliculasPopulares.set(peliculasPopulares),
      error: (error: HttpErrorResponse) =>
        console.error(`Error obteniendo peliculas populares: `, error),
    });
  }

  obtenerPeliculasEnEmision() {
    this.peliculasService.getPeliculasEnEmision().subscribe({
      next: (peliculasEnEmision) =>
        this.peliculasEnEmision.set(peliculasEnEmision),
      error: (error: HttpErrorResponse) =>
        console.error(`Error obteniendo peliculas populares: `, error),
    });
  }

  obtenerPeliculasProximamente() {
    this.peliculasService.getPeliculasProximamente().subscribe({
      next: (peliculasProximamente) =>
        this.peliculasProximamente.set(peliculasProximamente),
      error: (error: HttpErrorResponse) =>
        console.error(`Error obteniendo peliculas populares: `, error),
    });
  }

  peliculaSeleccionada(id: number) {
    this.peliculasService.peliculaSeleccionada(id);
  }
}
