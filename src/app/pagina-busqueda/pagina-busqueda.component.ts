/*
import { Component, effect, inject, input, signal } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pagina-busqueda',
  imports: [CommonModule],
  templateUrl: './pagina-busqueda.component.html',
  styleUrl: './pagina-busqueda.component.css',
})
export class PaginaBusquedaComponent {
  //idSeleccionada = signal<number | null>(null);
  peliculasService = inject(PeliculasService);
  idPeliculaSeleccionada = signal<number | null>(null);
  route = inject(ActivatedRoute);
  datosPelicula = this.peliculasService.datosPelicula;
  datosSerie = this.peliculasService.datosSerie;
  tipo = signal<'pelicula' | 'serie'>('pelicula');
  datos = signal<any>(null);

  //tipoSeleccionado = signal<'pelicula' | 'serie' | null>(null);
  router = inject(Router);
  http = inject(HttpClient);
  peliculas = signal<any>([]);
  search = input('');
  busquedaUrlPeliculas = '';
  busquedaUrlSeries = '';

  constructor() {
    // Observa el cambio en el campo de búsqueda
    effect(() => console.log('Búsqueda:', this.search()));

    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      const tipo = params['tipo']; // "pelicula" o "serie"
      if (id && tipo) {
        this.tipo.set(tipo as 'pelicula' | 'serie');
        this.peliculasService.idPeliculaSeleccionada.set(
          tipo === 'pelicula' ? id : null
        );
        this.peliculasService.idSerieSeleccionada.set(
          tipo === 'serie' ? id : null
        );
        this.obtenerInfo(); // Solicitar los datos necesarios
      }
    });

    // Actualiza las URLs de búsqueda cuando cambia el término de búsqueda
    effect(() => {
      const query = this.search();
      if (query) {
        this.busquedaUrlPeliculas = `https://api.themoviedb.org/3/search/movie?api_key=5d48284b0da7b73548042d5c51a4c07a&query=${query}&language=es&page=1`;
        this.busquedaUrlSeries = `https://api.themoviedb.org/3/search/tv?api_key=5d48284b0da7b73548042d5c51a4c07a&query=${query}&language=es&page=1`;

        this.obtenerBusqueda();
      }
    });
  }

  obtenerBusqueda() {
    // Realiza ambas búsquedas (películas y series) en paralelo
    const peliculas$ = this.getBusqueda(this.busquedaUrlPeliculas);
    const series$ = this.getBusqueda(this.busquedaUrlSeries);

    peliculas$.subscribe({
      next: (peliculas) => {
        this.peliculas.update((actual) => [...actual, ...peliculas]);
      },
      error: (error: HttpErrorResponse) =>
        console.error('Error obteniendo películas:', error),
    });

    series$.subscribe({
      next: (series) => {
        this.peliculas.update((actual) => [...actual, ...series]);
      },
      error: (error: HttpErrorResponse) =>
        console.error('Error obteniendo series:', error),
    });
  }

  getBusqueda(url: string) {
    return this.http.get<any>(url).pipe(map((resp) => resp.results || []));
  }

  seleccionarElemento(id: number, tipo: 'pelicula' | 'serie') {
    this.idSeleccionada.set(id);
    this.tipoSeleccionado.set(tipo);

    if (tipo === 'pelicula') {
      this.peliculasService.peliculaSeleccionada(id);
    } else if (tipo === 'serie') {
      this.peliculasService.serieSeleccionada(id);
    }

    // Navega a la página de detalles
    this.router.navigate(['/pagina-info'], {
      queryParams: { id, tipo },
    });
  }

  peliculaSeleccionada(id: number) {
    this.peliculasService.peliculaSeleccionada(id);
  }
}
*/

import { Component, effect, inject, input, signal } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pagina-busqueda',
  imports: [CommonModule],
  templateUrl: './pagina-busqueda.component.html',
  styleUrl: './pagina-busqueda.component.css',
})
export class PaginaBusquedaComponent {
  idSeleccionada = signal<number | null>(null);
  tipoSeleccionado = signal<'pelicula' | 'serie' | null>(null);
  router = inject(Router);
  peliculasService = inject(PeliculasService);
  http = inject(HttpClient);
  peliculas = signal<any>([]);
  search = input('');
  busquedaUrlPeliculas = '';
  busquedaUrlSeries = '';

  constructor() {
    effect(() => console.log('Búsqueda:', this.search()));

    effect(() => {
      const query = this.search();
      if (query) {
        this.busquedaUrlPeliculas = `https://api.themoviedb.org/3/search/movie?api_key=5d48284b0da7b73548042d5c51a4c07a&query=${query}&language=es&page=1`;
        this.busquedaUrlSeries = `https://api.themoviedb.org/3/search/tv?api_key=5d48284b0da7b73548042d5c51a4c07a&query=${query}&language=es&page=1`;

        this.obtenerBusqueda();
      }
    });
  }

  obtenerBusqueda() {
    const peliculas$ = this.getBusqueda(this.busquedaUrlPeliculas);
    const series$ = this.getBusqueda(this.busquedaUrlSeries);

    peliculas$.subscribe({
      next: (peliculas) => {
        this.peliculas.update((actual) => [...actual, ...peliculas]);
      },
      error: (error: HttpErrorResponse) =>
        console.error('Error obteniendo películas:', error),
    });

    series$.subscribe({
      next: (series) => {
        this.peliculas.update((actual) => [...actual, ...series]);
      },
      error: (error: HttpErrorResponse) =>
        console.error('Error obteniendo series:', error),
    });
  }

  getBusqueda(url: string) {
    return this.http.get<any>(url).pipe(map((resp) => resp.results || []));
  }

  seleccionarElemento(item: any) {
    const tipo = item.title ? 'pelicula' : 'serie';
    const id = item.id;

    if (tipo === 'pelicula') {
      this.peliculasService.idPeliculaSeleccionada.set(id);
      this.peliculasService.obtenerInfoPelicula();
    } else if (tipo === 'serie') {
      this.peliculasService.idSerieSeleccionada.set(id);
      this.peliculasService.obtenerInfoSerie();
    }

    this.router.navigate(['/pagina-info'], {
      queryParams: { id, tipo },
    });
  }

  peliculaSeleccionada(id: number) {
    this.peliculasService.peliculaSeleccionada(id);
  }
}
