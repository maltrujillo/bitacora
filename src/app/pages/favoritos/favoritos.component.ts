import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

/** Noticias marcadas como favoritas (guardadas en localStorage). */
@Component({
  selector: 'app-favoritos',
  imports: [RouterLink, NoticiaCardComponent],
  template: `
  <section class="ph-head"><div class="wrap"><h1>Mis favoritos</h1><p>Las noticias que guardaste en este navegador.</p></div></section>
  <section class="sec"><div class="wrap"><div class="grid">
    @for (n of lista(); track n.id) { <app-noticia-card [noticia]="n" /> }
    @empty { <p class="empty" style="grid-column:1/-1">Aún no tienes favoritos. Toca el corazón de una noticia para guardarla aquí. <a class="more" routerLink="/explorar">Explorar noticias</a></p> }
  </div></div></section>`,
})
export class FavoritosComponent {
  private svc = inject(NoticiasService);
  lista = computed(() => this.svc.todas().filter(n => this.svc.favoritos().includes(n.id)));
}
