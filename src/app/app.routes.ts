import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [

  { path: '', loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule) },
  { path: 'little-tables-limited-by-task', loadChildren: () => import('./views/multiplication/little-tables/limited-by-task/limited-by-task.module').then(m => m.LittleTablesLimitedByTaskModule) },
  { path: 'little-tables-limited-by-time', loadChildren: () => import('./views/multiplication/little-tables/limited-by-time/limited-by-time.module').then(m => m.LittleTablesLimitedByTimeModule) },

  { path: 'impressum', loadChildren: () => import('./views/impressum/impressum.module').then(m => m.ImpressumModule) },
  { path: '**', redirectTo: '' }
];
export const routing = RouterModule.forRoot(routes, { useHash: true });
