import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'navbar',
  imports: [RouterModule, FormsModule, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  generoId = signal<number | null>(null);
  generoName = signal<string | null>(null);

  isNavbarCollapsed = true;
  isDropdownOpen = false;
  parametroBusqueda = '';
  router = inject(Router);
  peliculasService = inject(PeliculasService);
  generos = signal<any>([]);

  constructor() {
    this.obtenerGeneros();
  }
  obtenerGeneros() {
    this.peliculasService.getGeneros().subscribe({
      next: (generos) => this.generos.set(generos),
      error: (error: HttpErrorResponse) =>
        console.error(`Error obteniendo peliculas: `, error),
    });
  }

  buscar() {
    this.router.navigate(['/pagina-busqueda'], {
      queryParams: {
        search: this.parametroBusqueda,
      },
    });
  }

  generoSeleccionado(id: number, name: string) {
    this.generoName.set(name);
    this.generoId.set(id);
    console.log('Genero seleccionado:', this.generoId());
    this.router.navigate(['/pagina-generos'], {
      queryParams: {
        id: this.generoId(),
        name: this.generoName(),
      },
    });
  }
}
