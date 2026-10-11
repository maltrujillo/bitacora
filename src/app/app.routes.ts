import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExplorarComponent } from './pages/explorar/explorar.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { FavoritosComponent } from './pages/favoritos/favoritos.component';
import { ContactoComponent } from './pages/contacto/contacto.component';
import { AdminComponent } from './pages/admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio · Bitácora' },
  { path: 'explorar', component: ExplorarComponent, title: 'Explorar · Bitácora' },
  { path: 'noticia/:id', component: DetalleComponent, title: 'Detalle · Bitácora' },
  { path: 'favoritos', component: FavoritosComponent, title: 'Favoritos · Bitácora' },
  { path: 'contacto', component: ContactoComponent, title: 'Contacto · Bitácora' },
  { path: 'admin', component: AdminComponent, title: 'Administrar · Bitácora' },
  { path: '**', redirectTo: '' },
];
