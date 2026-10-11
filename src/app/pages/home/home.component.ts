import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

/** Página de inicio: hero, 4 destacadas (desde JSON), testimonios y CTA. */
@Component({
  selector: 'app-home',
  imports: [RouterLink, NoticiaCardComponent],
  template: `
  <section class="hero"><div class="wrap"><div>
    <small>Bienvenido a Bitácora</small><h1>Un solo lugar para descubrir experiencias que importan</h1>
    <p>Noticias y experiencias educativas, tecnológicas, turísticas y comerciales, seleccionadas y contadas con detalle.</p>
    <div class="acts"><a class="btn" routerLink="/explorar">Explorar noticias</a><a class="btn o" routerLink="/contacto">Contactar</a></div></div>
    <svg viewBox="0 0 400 240" role="img" aria-label="Imagen destacada de la edición" style="border:1px solid #d4cdb9;border-radius:8px"><rect width="400" height="240" fill="#0F6B5C" opacity=".2"/><circle cx="310" cy="70" r="20" fill="#0F6B5C" opacity=".6"/><path d="M0 240V140l90-70 60 50 90-80 160 90v110z" fill="#0F6B5C" opacity=".5"/></svg>
  </div></section>
  <section class="sec"><div class="wrap">
    <div class="sech"><h2>Noticias destacadas</h2><a routerLink="/explorar">Ver todas →</a></div>
    <div class="grid">@for (n of destacadas(); track n.id) { <app-noticia-card [noticia]="n" /> }</div>
  </div></section>
  <section class="tst"><div class="wrap"><h2>Lo que dicen nuestros lectores</h2><div class="grid">
    @for (t of testimonios; track t.autor) { <blockquote>“{{ t.texto }}”<cite>— {{ t.autor }}</cite></blockquote> }
  </div></div></section>
  <section class="sec"><div class="wrap"><div class="cta"><div><h2>¿Tienes una experiencia para compartir?</h2><p>Escríbenos a hola&#64;bitacora.app o completa el formulario de contacto.</p></div><a class="btn" routerLink="/contacto">Ir a contacto</a></div></div></section>`,
})
export class HomeComponent {
  private svc = inject(NoticiasService);
  destacadas = computed(() => this.svc.todas().slice(0, 4));
  testimonios = [
    { texto: 'Encontré la ruta de senderismo perfecta gracias a Bitácora.', autor: 'Camila R., lectora frecuente' },
    { texto: 'Guardo en favoritos las noticias de tecnología para leerlas con calma.', autor: 'Julián P., estudiante' },
    { texto: 'El formulario de contacto me conectó con el organizador en un día.', autor: 'Marta G., emprendedora' },
  ];
}
