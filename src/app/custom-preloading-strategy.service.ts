import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomPreloadingStrategy implements PreloadingStrategy {
  preload(route: Route, load: () => Observable<any>): Observable<any> {
    // Check if the route has a 'preload' data property set to true
    if (route.data && route.data['preload']) {
      // If true, preload the module
      return load();
    } else {
      // If false, do not preload the module
      return of(null);
    }
  }
}
