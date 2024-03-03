import { Injectable } from '@angular/core';
import { Observable, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataResolverService {
  constructor() {}

  resolve(): Observable<any> | Promise<any> | any {
    // Replace with your data-fetching logic from a service here instead of the below code
    
      // Simulate a 3-second delay using setTimeout
      return new Observable(observer => {
        setTimeout(() => {
          // Replace with your mocked static data
          const mockedData = { id: 1, name: 'Mocked Data' };
  
          // You can use 'of' to create an observable from the static data
          observer.next(mockedData);
          observer.complete();
        }, 3000);
      }).pipe(delay(0)); // Ensure that the observable is returned immediately
      
  }
}
