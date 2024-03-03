import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';
import { CustomPreloadingStrategy } from './custom-preloading-strategy.service';
import { DataResolverService } from './data-resolver.service';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
      data: { preload: true }
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
      resolve: {
        data: DataResolverService
      },
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules // Angular provides a PreloadAllModules strategy, which preloads all lazy-loaded modules
       preloadingStrategy: CustomPreloadingStrategy 
    })
],
  exports: [RouterModule],
})
export class AppRoutingModule {}
