import {Injectable} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollTopService {

  constructor(private router: Router) {
  }

  setScrollTop(): void {
    this.router.events.subscribe((event: NavigationEnd) => {
      window.scroll(0, 0);
    });
  }
}
