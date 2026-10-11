import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../models/noticia.model';

const K_PROPIAS = 'bt_propias', K_BORRADAS = 'bt_borradas', K_FAVS = 'bt_favs';

/**
 * Servicio central. Carga las noticias base desde assets (JSON) con HttpClient
 * y les suma las creadas en /admin (localStorage). Expone señales para el binding.
 */
@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private http = inject(HttpClient);
  private base = signal<Noticia[]>([]);
  private propias = signal<Noticia[]>(this.leer(K_PROPIAS, []));
  private borradas = signal<number[]>(this.leer(K_BORRADAS, []));
  favoritos = signal<number[]>(this.leer(K_FAVS, []));
  cargando = signal(true);

  /** Lista final visible: (propias + base) menos las eliminadas. */
  todas = computed(() => [...this.propias(), ...this.base()].filter(n => !this.borradas().includes(n.id)));

  constructor() {
    this.http.get<Noticia[]>('data/noticias.json').subscribe({
      next: d => { this.base.set(d); this.cargando.set(false); },
      error: () => this.cargando.set(false),
    });
  }

  porId(id: number) { return this.todas().find(n => n.id === id); }
  esFavorita(id: number) { return this.favoritos().includes(id); }

  alternarFavorito(id: number) {
    this.favoritos.update(f => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
    this.guardar(K_FAVS, this.favoritos());
  }

  agregar(n: Omit<Noticia, 'id'>): boolean {
    this.propias.update(p => [{ ...n, id: Date.now() }, ...p]);
    return this.guardar(K_PROPIAS, this.propias());
  }

  eliminar(id: number) {
    if (this.propias().some(n => n.id === id)) {
      this.propias.update(p => p.filter(n => n.id !== id));
      this.guardar(K_PROPIAS, this.propias());
    } else {
      this.borradas.update(b => [...b, id]);
      this.guardar(K_BORRADAS, this.borradas());
    }
  }

  restaurar() {
    this.propias.set([]); this.borradas.set([]);
    this.guardar(K_PROPIAS, []); this.guardar(K_BORRADAS, []);
  }

  private leer<T>(k: string, def: T): T {
    try { const v = JSON.parse(localStorage.getItem(k) ?? 'null'); return v ?? def; } catch { return def; }
  }
  private guardar(k: string, v: unknown): boolean {
    try { localStorage.setItem(k, JSON.stringify(v)); return true; }
    catch { alert('No se pudo guardar. Prueba con una imagen más pequeña.'); return false; }
  }
}
