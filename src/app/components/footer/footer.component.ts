import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CATEGORIAS } from '../../models/noticia.model';

/** Pie de página; las categorías se generan con @for. */
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  template: `
  <footer><div class="wrap">
    <div><span class="logo">Bitácora</span>Un periódico digital para descubrir experiencias educativas, tecnológicas, turísticas y comerciales.</div>
    <div><b>Navegación</b><a routerLink="/">Inicio</a><a routerLink="/explorar">Explorar noticias</a><a routerLink="/favoritos">Mis favoritos</a><a routerLink="/contacto">Contacto</a><a routerLink="/admin">Administrar noticias</a></div>
    <div><b>Categorías</b>@for (c of categorias; track c) {<a routerLink="/explorar" [queryParams]="{cat: c}">{{ c }}</a>}</div>
    <div><b>Contáctanos</b><a href="mailto:hola&#64;bitacora.app">hola&#64;bitacora.app</a><span>+57 300 000 0000</span><br><span>Bogotá, Colombia</span></div>
  </div></footer>`,
})
export class FooterComponent { categorias = CATEGORIAS; }
