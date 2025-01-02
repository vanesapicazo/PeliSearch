import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { PaginaHomeComponent } from './pagina-home/pagina-home.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, PaginaHomeComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'PeliSearch';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/pagina-home']);
  }
}
