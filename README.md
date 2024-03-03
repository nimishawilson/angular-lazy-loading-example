
## Lazy loading
Lazy loading is a programming technique that defers the loading of certain resources or modules until they are actually needed. This approach can help improve the initial loading time of an application by loading only the essential components and delaying the loading of non-essential or less frequently used ones.

In the context of web development and Angular, lazy loading refers to loading Angular modules or components only when they are requested, typically based on user interactions such as navigating to a specific route. This is achieved through the Angular Router, which allows you to define routes and load modules on demand.

### Benefits of Lazy Loading in Angular:

Faster Initial Load Time: Lazy loading helps reduce the initial bundle size of your application. Users will only download the code necessary for the features they are currently accessing, leading to faster load times.

Improved Performance: Smaller initial bundles result in quicker loading, especially beneficial for users with slower internet connections or on mobile devices.

Optimized Resource Usage: Resources are loaded on demand, which means that the application uses fewer resources upfront. This can be critical for large-scale applications with numerous features.

Enhanced User Experience: Users can start interacting with the core features of the application more quickly, providing a better overall user experience.

Simplified Development and Maintenance: Lazy loading allows for modularization of your code, making it easier to manage, develop, and maintain different sections of your application independently.

***route configuration***
import the feature module which needs to implement the lazy loading functionality, against loadChildren key.

```
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule) },
  // Other routes...
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes) //use forRoot in root routing module
],
  exports: [RouterModule],
})

```


Add the component in declarations array of the feature module

```
@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule
  ]
})
```


In feature routing module, add the components and route paths. Use forChild in imports to pass the routes in feature modules.

```
const routes: Routes = [{ path: '', component: OrdersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

```



### Resolvers
Resolvers are used to fetch data before a route is activated. They help ensure that the necessary data is available before rendering the component associated with a route. This can be particularly useful when working with lazy-loaded modules, where you want to load the module and its data only when the associated route is accessed.

**1. Create a Resolver:**

First, create a resolver service that implements the Resolve interface provided by Angular. This interface requires you to implement the resolve method, where you can fetch the necessary data.

```

// example-resolver.service.ts

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service'; // Replace with your actual data service

@Injectable({
  providedIn: 'root'
})
export class ExampleResolver implements Resolve<any> {
  constructor(private dataService: DataService) {}

  resolve(): Observable<any> | Promise<any> | any {
    // Replace with your data-fetching logic
    return this.dataService.getData();
  }
}


```

**2. Update your Routing Configuration:**

In your routing configuration, associate the resolver with the route where you want to apply lazy loading.

```
// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExampleComponent } from './example/example.component'; // Replace with your actual component
import { ExampleResolver } from './example-resolver.service'; // Replace with the actual resolver

const routes: Routes = [
  {
    path: 'lazy-loaded-route',
    component: ExampleComponent,
    resolve: {
      data: ExampleResolver
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

```
***3. Access Data in the Component:***
In your component, you can access the resolved data through the ActivatedRoute.

```
// example.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css'],
})
export class ExampleComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Access resolved data
    const resolvedData = this.route.snapshot.data['data'];
    console.log(resolvedData);
  }
}

```

With this setup, when a user navigates to the 'lazy-loaded-route', Angular will automatically execute the resolver (ExampleResolver), fetch the data, and only then proceed to load and render the associated component (ExampleComponent).