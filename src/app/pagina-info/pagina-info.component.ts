import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'pagina-info',
  imports: [CommonModule],
  templateUrl: './pagina-info.component.html',
  styleUrls: ['./pagina-info.component.css'],
})
export class PaginaInfoComponent {
  idPeliculaSeleccionada = signal<number | null>(null);
  http = inject(HttpClient);
  route = inject(ActivatedRoute);
  peliculasService = inject(PeliculasService);
  datosPelicula = this.peliculasService.datosPelicula;
  datosSerie = this.peliculasService.datosSerie;
  tipo = signal<'pelicula' | 'serie'>('pelicula');
  datos = signal<any>(null);
  constructor() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      const tipo = params['tipo'];
      if (id && tipo) {
        this.tipo.set(tipo as 'pelicula' | 'serie');
        this.peliculasService.idPeliculaSeleccionada.set(
          tipo === 'pelicula' ? id : null
        );
        this.peliculasService.idSerieSeleccionada.set(
          tipo === 'serie' ? id : null
        );
        this.obtenerInfo();
      }
    });

    effect(() => {
      if (this.datosPelicula()) {
        console.log('Datos de película actualizados:', this.datosPelicula());
      }
    });

    effect(() => {
      if (this.datosSerie()) {
        console.log('Datos de serie actualizados:', this.datosSerie());
      }
    });

    effect(() => {
      const datos =
        this.tipo() === 'pelicula' ? this.datosPelicula() : this.datosSerie();
      if (datos) {
        console.log('Datos recibidos en página-info:', datos);
        this.datos.set(datos);
      } else {
        console.log('No hay datos');
      }
    });
  }

  obtenerInfo() {
    if (this.tipo() === 'pelicula') {
      this.peliculasService.obtenerInfoPelicula();
    } else if (this.tipo() === 'serie') {
      this.peliculasService.obtenerInfoSerie();
    }
  }
}
