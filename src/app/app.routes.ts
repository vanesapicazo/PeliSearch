import { Routes } from '@angular/router';
import { PaginaHomeComponent } from './pagina-home/pagina-home.component';
import { PaginaPeliculasComponent } from './pagina-peliculas/pagina-peliculas.component';
import { PaginaSeriesComponent } from './pagina-series/pagina-series.component';
import { PaginaTendenciasComponent } from './pagina-tendencias/pagina-tendencias.component';
import { PaginaGenerosComponent } from './pagina-generos/pagina-generos.component';
import { PaginaBusquedaComponent } from './pagina-busqueda/pagina-busqueda.component';
import { PaginaInfoComponent } from './pagina-info/pagina-info.component';

export const routes: Routes = [
  { path: 'pagina-home', component: PaginaHomeComponent },
  { path: 'pagina-peliculas', component: PaginaPeliculasComponent },
  { path: 'pagina-series', component: PaginaSeriesComponent },
  { path: 'pagina-tendencias', component: PaginaTendenciasComponent },
  { path: 'pagina-generos', component: PaginaGenerosComponent },
  { path: 'pagina-busqueda', component: PaginaBusquedaComponent },
  { path: 'pagina-info', component: PaginaInfoComponent },
  {
    path: '',
    redirectTo: '/pagina-home',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/pagina-home' },
];
