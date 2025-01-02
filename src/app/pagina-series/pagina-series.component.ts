import { Component, inject, signal } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pagina-series',
  imports: [CommonModule],
  templateUrl: './pagina-series.component.html',
  styleUrl: './pagina-series.component.css',
})
export class PaginaSeriesComponent {
  peliculasService = inject(PeliculasService);
  series = signal<any>([]);

  constructor() {
    this.obtenerSerie();
  }

  obtenerSerie() {
    this.peliculasService.getSeriesPopulares().subscribe({
      next: (series) => this.series.set(series),
      error: (error: HttpErrorResponse) =>
        console.error(`Error obteniendo series: `, error),
    });
  }

  serieSeleccionada(id: number) {
    this.peliculasService.serieSeleccionada(id);
  }
}
