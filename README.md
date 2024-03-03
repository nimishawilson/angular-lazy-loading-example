
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