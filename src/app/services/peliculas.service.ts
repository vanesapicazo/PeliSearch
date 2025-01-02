import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  http = inject(HttpClient);
  idPeliculaSeleccionada = signal<number | null>(null);
  idSerieSeleccionada = signal<number | null>(null);
  router = inject(Router);
  peliculas = signal<any>([]);
  route = inject(ActivatedRoute);
  idUrl = '';
  idSerieUrl = '';
  datosSerie = signal<any>(null);
  datosPelicula = signal<any>(null);
  private apiKey = environment.apiKey;

  constructor() {
    effect(() => {
      const id = this.idPeliculaSeleccionada();
      if (id !== null) {
        this.idUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=es`;
        console.log('Url de la pelicula con su id: ', this.idUrl);
        this.obtenerInfoPelicula();
      }
    });

    effect(() => {
      const idSerie = this.idSerieSeleccionada();
      if (idSerie !== null) {
        this.idSerieUrl = `https://api.themoviedb.org/3/tv/${idSerie}?api_key=${this.apiKey}&language=es`;
        console.log('URL de la serie con su id:', this.idSerieUrl);
        this.obtenerInfoSerie();
      }
    });
  }

  peliculasPopularesUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=es&page=1`;

  getPeliculasPopulares() {
    return this.http.get<any>(this.peliculasPopularesUrl).pipe(
      map((resp) => {
        return resp.results;
      })
    );
  }

  peliculasEnEmisionUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.apiKey}&language=es&page=2`;

  getPeliculasEnEmision() {
    return this.http.get<any>(this.peliculasEnEmisionUrl).pipe(
      map((resp) => {
        return resp.results;
      })
    );
  }

  peliculasProximamenteUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.apiKey}&language=es&page=2`;

  getPeliculasProximamente() {
    return this.http.get<any>(this.peliculasProximamenteUrl).pipe(
      map((resp) => {
        return resp.results;
      })
    );
  }

  generosUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=es&page=1`;

  getGeneros() {
    return this.http.get<any>(this.generosUrl).pipe(
      map((resp) => {
        return resp.genres;
      })
    );
  }

  peliculasUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=es&page=1`;

  getMejorValoradas() {
    return this.http.get<any>(this.peliculasUrl).pipe(
      map((resp) => {
        return resp.results;
      })
    );
  }

  seriesUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${this.apiKey}&language=es&page=1`;

  getSeriesPopulares() {
    return this.http.get<any>(this.seriesUrl).pipe(
      map((resp) => {
        return resp.results;
      })
    );
  }

  tendenciasUrl = `https://api.themoviedb.org/3/trending/all/day?api_key=${this.apiKey}&language=es`;

  getTendencias() {
    return this.http.get<any>(this.tendenciasUrl).pipe(
      map((resp) => {
        return resp.results;
      })
    );
  }

  peliculaSeleccionada(id: number) {
    this.idPeliculaSeleccionada.set(id);
    console.log('Pelicula seleccionada:', this.idPeliculaSeleccionada());
    this.router.navigate(['/pagina-info'], {
      queryParams: {
        id: this.idPeliculaSeleccionada(),
        tipo: 'pelicula',
      },
    });
  }

  getInfoPelicula() {
    return this.http.get<any>(this.idUrl).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  serieSeleccionada(id: number) {
    this.idSerieSeleccionada.set(id);
    console.log('Serie seleccionada:', this.idSerieSeleccionada());
    this.router.navigate(['/pagina-info'], {
      queryParams: {
        id: this.idSerieSeleccionada(),
        tipo: 'serie',
      },
    });
  }

  getInfoSerie() {
    return this.http.get<any>(this.idSerieUrl).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  getInfo(tipo: 'pelicula' | 'serie', id: number) {
    const baseUrl =
      tipo === 'pelicula'
        ? `https://api.themoviedb.org/3/movie/${id}`
        : `https://api.themoviedb.org/3/tv/${id}`;
    return this.http.get<any>(`${baseUrl}?api_key=${this.apiKey}&language=es`);
  }

  obtenerInfoPelicula() {
    const id = this.idPeliculaSeleccionada();
    if (id) {
      this.getInfo('pelicula', id).subscribe({
        next: (datos) => this.datosPelicula.set(datos),
        error: (error: HttpErrorResponse) =>
          console.error(`Error obteniendo datos de la película: `, error),
      });
    }
  }

  obtenerInfoSerie() {
    const id = this.idSerieSeleccionada();
    if (id) {
      this.getInfo('serie', id).subscribe({
        next: (datos) => this.datosSerie.set(datos),
        error: (error: HttpErrorResponse) =>
          console.error(`Error obteniendo datos de la serie: `, error),
      });
    }
  }
}
