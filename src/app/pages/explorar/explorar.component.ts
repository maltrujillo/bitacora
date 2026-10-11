import { Component, computed, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CATEGORIAS } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { NoticiaCardComponent } from '../../components/noticia-card/noticia-card.component';

/** Listado con búsqueda, filtro por categoría y paginación. */
@Component({
  selector: 'app-explorar',
  imports: [FormsModule, NoticiaCardComponent],
  template: `
  <section class="ph-head"><div class="wrap"><h1>Explorar noticias</h1><p>{{ filtradas().length }} experiencias disponibles</p>
    <div class="tools">
      <input class="search" type="search" placeholder="Buscar por nombre o palabra clave..." aria-label="Buscar noticias" [ngModel]="q()" (ngModelChange)="q.set($event); pagina.set(1)">
      <div class="tools" role="group" aria-label="Filtrar por categoría">
        @for (c of opciones; track c) { <button class="chip" [attr.aria-pressed]="c === cat()" (click)="_cat.set(c); pagina.set(1)">{{ c }}</button> }
      </div>
    </div></div></section>
  <section class="sec"><div class="wrap">
    <div class="grid">
      @for (n of visibles(); track n.id) { <app-noticia-card [noticia]="n" /> }
      @empty { <p class="empty" style="grid-column:1/-1">No encontramos resultados. Prueba con otra palabra o quita el filtro de categoría.</p> }
    </div>
    <div class="pager">
      <button [disabled]="pagina() < 2" (click)="ir(pagina() - 1)" aria-label="Página anterior">‹</button>
      @for (p of paginas(); track p) { <button [attr.aria-current]="p === pagina() ? 'true' : null" (click)="ir(p)">{{ p }}</button> }
      <button [disabled]="pagina() >= paginas().length" (click)="ir(pagina() + 1)" aria-label="Página siguiente">›</button>
    </div>
  </div></section>`,
})
export class ExplorarComponent {
  private svc = inject(NoticiasService);
  /** Query param ?cat=... (withComponentInputBinding). */
  catInicial = input<string>('', { alias: 'cat' });
  opciones = ['Todas', ...CATEGORIAS];
  q = signal('');
  pagina = signal(1);
  _cat = signal<string | null>(null);
  cat = computed(() => this._cat() ?? (CATEGORIAS.includes(this.catInicial()) ? this.catInicial() : 'Todas'));
  porPagina = 6;

  filtradas = computed(() => this.svc.todas().filter(n =>
    (this.cat() === 'Todas' || n.categoria === this.cat()) &&
    (n.titulo + ' ' + n.descripcion).toLowerCase().includes(this.q().toLowerCase())));
  paginas = computed(() => Array.from({ length: Math.max(1, Math.ceil(this.filtradas().length / this.porPagina)) }, (_, i) => i + 1));
  visibles = computed(() => this.filtradas().slice((this.pagina() - 1) * this.porPagina, this.pagina() * this.porPagina));

  ir(p: number) { this.pagina.set(p); scrollTo(0, 0); }
}
