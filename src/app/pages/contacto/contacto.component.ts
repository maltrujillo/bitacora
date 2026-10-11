import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

/** Formulario de contacto con validación reactiva. */
@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule],
  template: `
  <section class="ph-head" style="text-align:center"><div class="wrap"><h1>Hablemos</h1><p>¿Tienes dudas, sugerencias o quieres compartir una experiencia? Escríbenos.</p></div></section>
  <div class="wrap cgrid">
    <div class="formbox"><form [formGroup]="f" (ngSubmit)="enviar()" novalidate>
      <label for="nombre">Nombre completo <i>*</i></label>
      <input id="nombre" formControlName="nombre" placeholder="Ej. Laura Gómez" autocomplete="name" [class.bad]="malo('nombre')">
      <div class="err" aria-live="polite">{{ malo('nombre') ? 'Escribe tu nombre completo.' : '' }}</div>
      <label for="correo">Correo electrónico <i>*</i></label>
      <input id="correo" type="email" formControlName="correo" placeholder="correo@ejemplo.com" autocomplete="email" [class.bad]="malo('correo')">
      <div class="err" aria-live="polite">{{ malo('correo') ? 'Ingresa un correo electrónico válido.' : '' }}</div>
      <label for="asunto">Asunto</label><input id="asunto" formControlName="asunto" placeholder="¿En qué podemos ayudarte?">
      <label for="mensaje">Mensaje <i>*</i></label>
      <textarea id="mensaje" formControlName="mensaje" placeholder="Cuéntanos brevemente tu mensaje..." [class.bad]="malo('mensaje')"></textarea>
      <div class="err" aria-live="polite">{{ malo('mensaje') ? 'Cuéntanos tu mensaje (mínimo 10 caracteres).' : '' }}</div>
      <p style="margin-top:20px"><button class="btn" type="submit">Enviar mensaje</button><span class="note">Los campos marcados con * son obligatorios</span></p>
      <div class="ok" [class.show]="enviado()" role="status"><b>¡Mensaje enviado con éxito!</b><br>Te responderemos dentro de las próximas 24 horas.</div>
    </form></div>
    <div>
      <div class="info"><h2>Información de contacto</h2><small>Correo</small><b>hola&#64;bitacora.app</b><small>Teléfono</small><b>+57 300 000 0000</b><small>Oficina</small><b>Cra. 7 # 45-12, Bogotá</b><small>Horario</small><b>Lun. a Vie. 8:00 a.m. – 6:00 p.m.</b></div>
      <div class="faq"><h3>Preguntas frecuentes</h3>
        @for (q of faq; track q[0]) { <details><summary>{{ q[0] }}</summary>{{ q[1] }}</details> }
      </div>
    </div>
  </div>`,
})
export class ContactoComponent {
  private fb = inject(FormBuilder);
  enviado = signal(false);
  f = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(/\S/)]],
    correo: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
    asunto: [''],
    mensaje: ['', [Validators.required, Validators.minLength(10)]],
  });
  faq = [
    ['¿Cómo guardo una noticia en favoritos?', 'Abre la noticia y toca “Agregar a favoritos”, o el corazón de la tarjeta.'],
    ['¿Puedo publicar mi propia experiencia?', 'Sí. Escríbenos por este formulario o usa la sección de administración.'],
    ['¿Cuánto tardan en responder?', 'Respondemos dentro de las próximas 24 horas hábiles.'],
  ];
  malo(c: string) { const x = this.f.get(c)!; return x.invalid && (x.touched || this.intentado); }
  private intentado = false;
  enviar() {
    this.intentado = true; this.f.markAllAsTouched();
    this.enviado.set(this.f.valid);
    if (this.f.valid) { this.f.reset(); this.intentado = false; }
  }
}
