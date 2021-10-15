import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScreenWithSidenavComponent } from './layout';

const routes: Routes = [
  {
    path: '',
    component: ScreenWithSidenavComponent,
    children: [
      {
        path: 'importar-dados',
        loadChildren: () =>
          import('./modules/import-data').then((m) => m.ImportDataModule),
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
