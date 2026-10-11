import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COLORES, Noticia } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

/** Tarjeta reutilizable de noticia. Recibe la noticia por @Input (input signal). */
@Component({
  selector: 'app-noticia-card',
  imports: [RouterLink],
  template: `
  <article class="card" [style.--c]="color()">
    <a class="thumb" [routerLink]="['/noticia', noticia().id]" tabindex="-1" aria-hidden="true">
      @if (noticia().imagen) { <img [src]="noticia().imagen" [alt]="noticia().titulo"> }
      @else {
        <svg class="ph" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" role="img" [attr.aria-label]="'Imagen de ' + noticia().categoria">
          <rect width="400" height="240" [attr.fill]="color()" opacity=".2"/><circle cx="310" cy="70" r="20" [attr.fill]="color()" opacity=".6"/>
          <path d="M0 240V140l90-70 60 50 90-80 160 90v110z" [attr.fill]="color()" opacity=".5"/>
        </svg>
      }
    </a>
    <span class="cat">{{ noticia().categoria }}</span>
    <h3><a [routerLink]="['/noticia', noticia().id]">{{ noticia().titulo }}</a></h3>
    <p>{{ noticia().descripcion }}</p>
    <div class="row">
      <a class="more" [routerLink]="['/noticia', noticia().id]">Ver más →</a>
      <button class="fav" [attr.aria-pressed]="esFav()" (click)="svc.alternarFavorito(noticia().id)"
              [attr.aria-label]="'Guardar en favoritos: ' + noticia().titulo">♥</button>
    </div>
  </article>`,
})
export class NoticiaCardComponent {
  svc = inject(NoticiasService);
  noticia = input.required<Noticia>();
  color = computed(() => COLORES[this.noticia().categoria] ?? '#0F6B5C');
  esFav = computed(() => this.svc.favoritos().includes(this.noticia().id));
}
