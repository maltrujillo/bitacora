import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { COLORES } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

/** Detalle de una noticia (ruta /noticia/:id) + relacionadas. */
@Component({
  selector: 'app-detalle',
  imports: [RouterLink, NoticiaCardComponent],
  template: `
  @if (noticia(); as n) {
    <div class="wrap art" [style.--c]="color()">
      <nav class="crumb" aria-label="Ruta"><a routerLink="/">Inicio</a><span>›</span><a routerLink="/explorar" [queryParams]="{cat: n.categoria}">{{ n.categoria }}</a><span>›</span><b>{{ n.titulo }}</b></nav>
      <span class="cat">{{ n.categoria }}</span><h1>{{ n.titulo }}</h1>
      <p class="meta">Publicado el {{ fecha() }} · Por {{ n.autor }}</p>
      <div class="big">@if (n.imagen) { <img [src]="n.imagen" [alt]="n.titulo"> }
        @else { <svg class="ph" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" role="img" [attr.aria-label]="'Imagen de ' + n.categoria"><rect width="400" height="240" [attr.fill]="color()" opacity=".2"/><circle cx="310" cy="70" r="20" [attr.fill]="color()" opacity=".6"/><path d="M0 240V140l90-70 60 50 90-80 160 90v110z" [attr.fill]="color()" opacity=".5"/></svg> }</div>
      <div class="acts">
        <button class="btn" [attr.aria-pressed]="esFav()" (click)="svc.alternarFavorito(n.id)">{{ esFav() ? '♥ Quitar de favoritos' : '♥ Agregar a favoritos' }}</button>
        <button class="btn o" (click)="compartir()">{{ copiado ? '¡Enlace copiado!' : 'Compartir' }}</button>
        <a class="btn o" routerLink="/contacto">Contactar</a>
      </div>
      <div class="body">
        <div>@for (p of n.contenido; track $index) { <p>{{ p }}</p> }</div>
        <aside class="side"><h3>Datos de la experiencia</h3>
          <dl>@for (d of datos(); track d[0]) { <div><dt>{{ d[0] }}</dt><dd>{{ d[1] }}</dd></div> }</dl>
          <a class="btn" routerLink="/contacto">Contactar organizador</a></aside>
      </div>
    </div>
    <section class="rel sec"><div class="wrap"><div class="sech"><h2>Te puede interesar</h2></div>
      <div class="grid">@for (r of relacionadas(); track r.id) { <app-noticia-card [noticia]="r" /> }</div></div></section>
  } @else if (!svc.cargando()) {
    <p class="empty">No encontramos esta noticia. <a class="more" routerLink="/explorar">Volver a explorar</a></p>
  }`,
})
export class DetalleComponent {
  svc = inject(NoticiasService);
  /** Parámetro de ruta :id (withComponentInputBinding). */
  id = input.required<string>();
  copiado = false;
  noticia = computed(() => this.svc.porId(+this.id()));
  color = computed(() => COLORES[this.noticia()?.categoria ?? ''] ?? '#0F6B5C');
  esFav = computed(() => this.svc.favoritos().includes(+this.id()));
  fecha = computed(() => new Date(this.noticia()!.fecha + 'T12:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' }));
  datos = computed(() => Object.entries(this.noticia()?.datos ?? { Categoría: this.noticia()?.categoria ?? '' }));
  relacionadas = computed(() => {
    const n = this.noticia(), t = this.svc.todas().filter(x => x.id !== n?.id);
    return [...t.filter(x => x.categoria === n?.categoria), ...t.filter(x => x.categoria !== n?.categoria)].slice(0, 3);
  });
  compartir() {
    const url = location.href;
    if (navigator.share) navigator.share({ title: this.noticia()!.titulo, url }).catch(() => {});
    else navigator.clipboard?.writeText(url).then(() => this.copiado = true);
  }
}
