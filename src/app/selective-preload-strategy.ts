import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PreloadSelectedModules implements PreloadingStrategy {
  preloadedModules: string[] = [];

  preload(route: Route, load: Function): Observable<any> {
    if (route.data && route.data['preload']) {
      // add the route path to our preloaded module array
      this.preloadedModules.push(route.path);

      // log the route path to the console
      console.log('Preloaded: ' + route.path);

      return load();
    } else {
      return Observable.of(null);
    }
  }
}
