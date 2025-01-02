import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'pagina-generos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagina-generos.component.html',
  styleUrl: './pagina-generos.component.css',
})
export class PaginaGenerosComponent {
  idGeneroSeleccionado = signal<number | null>(null);
  nameGeneroSeleccionado = signal<string | null>(null);

  http = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute);
  peliculasPorIdGeneroUrl = '';
  peliculas = signal<any>(null);
  peliculasService = inject(PeliculasService);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      const name = params['name'];
      if (id) {
        this.idGeneroSeleccionado.set(id);
        this.nameGeneroSeleccionado.set(name);
        console.log(
          'Id recibido en PaginaGenerosComponent:',
          this.idGeneroSeleccionado()
        );
      }
    });

    effect(() => {
      this.peliculasPorIdGeneroUrl = `https://api.themoviedb.org/3/discover/movie?api_key=5d48284b0da7b73548042d5c51a4c07a&with_genres=${this.idGeneroSeleccionado()}`;
      console.log(
        'Url de la pelicula con su id: ',
        this.peliculasPorIdGeneroUrl
      );

      this.obtenerPeliculas();
    });
  }

  obtenerPeliculas() {
    this.getPeliculas().subscribe({
      next: (peliculas) => {
        this.peliculas.set(peliculas);
        console.log('Datos de la pelicula: ', this.peliculas());
      },
      error: (error: HttpErrorResponse) =>
        console.error(`Error obteniendo datos de la película: `, error),
    });
  }

  getPeliculas() {
    return this.http.get<any>(this.peliculasPorIdGeneroUrl).pipe(
      map((resp) => {
        return resp.results;
      })
    );
  }

  peliculaSeleccionada(id: number) {
    this.peliculasService.peliculaSeleccionada(id);
  }
}
