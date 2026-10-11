import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/** Encabezado con barra superior, logo y navegación principal. */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
  <div class="top"><div class="wrap"><span>Edición digital</span><span>{{ hoy }}</span><span>Bogotá, Colombia</span></div></div>
  <header class="mast">
    <a class="logo" routerLink="/">Bitácora</a>
    <em>Explora historias que valen la pena vivir</em>
    <nav aria-label="Principal">
      <a routerLink="/" routerLinkActive="on" [routerLinkActiveOptions]="{exact:true}">Inicio</a>
      <a routerLink="/explorar" routerLinkActive="on">Explorar</a>
      <a routerLink="/favoritos" routerLinkActive="on">Favoritos</a>
      <a routerLink="/contacto" routerLinkActive="on">Contacto</a>
    </nav>
  </header>`,
})
export class HeaderComponent {
  hoy = new Date().toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
