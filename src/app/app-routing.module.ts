import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ScreenWithSidenavComponent } from './layout';

const routes: Routes = [
  {
    path: '',
    component: ScreenWithSidenavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'estabelecimentos',
        loadChildren: () =>
          import('./modules/establishment').then((m) => m.EstablishmentModule),
      },
      {
        path: 'importar-dados',
        loadChildren: () =>
          import('./modules/import-data').then((m) => m.ImportDataModule),
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./modules/user').then((m) => m.UserModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
