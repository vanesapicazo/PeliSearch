import { Component, inject, signal } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pagina-tendencias',
  imports: [CommonModule],
  templateUrl: './pagina-tendencias.component.html',
  styleUrl: './pagina-tendencias.component.css',
})
export class PaginaTendenciasComponent {
  peliculasService = inject(PeliculasService);
  peliculas = signal<any>([]);

  constructor() {
    this.obtenerPelicula();
  }

  obtenerPelicula() {
    this.peliculasService.getTendencias().subscribe({
      next: (peliculas) => this.peliculas.set(peliculas),
      error: (error: HttpErrorResponse) =>
        console.error(`Error obteniendo peliculas: `, error),
    });
  }

  peliculaSeleccionada(id: number) {
    this.peliculasService.peliculaSeleccionada(id);
  }
}
