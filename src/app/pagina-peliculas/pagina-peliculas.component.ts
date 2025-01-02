import { Component, inject, signal } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pagina-peliculas',
  imports: [CommonModule],
  templateUrl: './pagina-peliculas.component.html',
  styleUrl: './pagina-peliculas.component.css',
})
export class PaginaPeliculasComponent {
  peliculasService = inject(PeliculasService);
  peliculas = signal<any>([]);

  constructor() {
    this.obtenerPelicula();
  }

  obtenerPelicula() {
    this.peliculasService.getMejorValoradas().subscribe({
      next: (peliculas) => this.peliculas.set(peliculas),
      error: (error: HttpErrorResponse) =>
        console.error(`Error obteniendo peliculas: `, error),
    });
  }

  peliculaSeleccionada(id: number) {
    this.peliculasService.peliculaSeleccionada(id);
  }
}
