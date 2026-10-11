import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CATEGORIAS } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';

/** Administración: crear y eliminar noticias (se guardan en el navegador). */
@Component({
  selector: 'app-admin',
  imports: [FormsModule],
  template: `
  <section class="ph-head"><div class="wrap"><h1>Administrar noticias</h1><p>Crea o elimina noticias. Los cambios se guardan en este navegador.</p></div></section>
  <div class="wrap two">
    <form class="formbox" (ngSubmit)="crear()" novalidate><h2>Nueva noticia</h2>
      <label for="imagen">Imagen</label><input id="imagen" type="file" accept="image/*" (change)="cargarImagen($event)">
      <label for="titulo">Nombre <i>*</i></label><input id="titulo" name="titulo" [(ngModel)]="titulo">
      <label for="descripcion">Descripción breve <i>*</i></label><input id="descripcion" name="descripcion" [(ngModel)]="descripcion">
      <label for="cats">Categoría</label><select id="cats" name="categoria" [(ngModel)]="categoria">@for (c of categorias; track c) { <option>{{ c }}</option> }</select>
      <label for="contenido">Contenido <i>*</i></label><textarea id="contenido" name="contenido" [(ngModel)]="contenido" placeholder="Separa los párrafos con una línea en blanco."></textarea>
      <div class="err" aria-live="polite">{{ error() }}</div>
      <p><button class="btn" type="submit">Crear noticia</button></p>
    </form>
    <div>
      <div class="sech"><h2 style="font-size:22px;border:0;padding:0">Noticias publicadas</h2><button class="del" type="button" (click)="restaurar()">Restaurar ejemplo</button></div>
      <p role="status" style="color:#0F6B5C">{{ msg() }}</p>
      <table class="tbl"><thead><tr><th>Título</th><th>Categoría</th><th></th></tr></thead>
        <tbody>@for (n of svc.todas(); track n.id) { <tr><td>{{ n.titulo }}</td><td>{{ n.categoria }}</td><td><button class="del" (click)="borrar(n.id)" [attr.aria-label]="'Eliminar ' + n.titulo">Eliminar</button></td></tr> }</tbody></table>
    </div>
  </div>`,
})
export class AdminComponent {
  svc = inject(NoticiasService);
  categorias = CATEGORIAS;
  titulo = ''; descripcion = ''; contenido = ''; categoria = CATEGORIAS[0];
  imagen = '';
  error = signal(''); msg = signal('');

  /** Redimensiona la imagen a 800px y la guarda como data URL. */
  cargarImagen(e: Event) {
    const fl = (e.target as HTMLInputElement).files?.[0]; if (!fl) return;
    const r = new FileReader();
    r.onload = () => {
      const im = new Image();
      im.onload = () => {
        const s = Math.min(1, 800 / im.width), c = document.createElement('canvas');
        c.width = im.width * s; c.height = im.height * s;
        c.getContext('2d')!.drawImage(im, 0, 0, c.width, c.height);
        this.imagen = c.toDataURL('image/jpeg', .7);
      };
      im.src = r.result as string;
    };
    r.readAsDataURL(fl);
  }
  crear() {
    const t = this.titulo.trim(), d = this.descripcion.trim(), c = this.contenido.trim();
    if (!t || !d || !c) { this.error.set('Completa nombre, descripción y contenido.'); return; }
    this.error.set('');
    if (this.svc.agregar({ categoria: this.categoria, titulo: t, descripcion: d, contenido: c.split(/\n+/),
        fecha: new Date().toISOString().slice(0, 10), autor: 'Redacción Bitácora', datos: null, imagen: this.imagen || undefined })) {
      this.titulo = this.descripcion = this.contenido = ''; this.imagen = ''; this.msg.set('Noticia creada.');
    }
  }
  borrar(id: number) { if (confirm('¿Eliminar esta noticia?')) { this.svc.eliminar(id); this.msg.set('Noticia eliminada.'); } }
  restaurar() { if (confirm('¿Restaurar las noticias de ejemplo? Se perderán los cambios.')) { this.svc.restaurar(); this.msg.set(''); } }
}
