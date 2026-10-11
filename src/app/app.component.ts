import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

/** Componente raíz: estructura fija (header + contenido de la ruta + footer). */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  template: `<app-header /><main><router-outlet /></main><app-footer />`,
})
export class AppComponent {}
