import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActiveModuleService {
  currentModule = signal('');
  currentPageName = new BehaviorSubject<string>('');
  sidebarExpanded = new BehaviorSubject<boolean>(true);

  setPageName(pageName: string): void {
    setTimeout(() => {
      this.currentPageName.next(pageName); // Update page name
    }, 0);
  }
  
  updateSideBar(value: boolean) {
    this.sidebarExpanded.next(value);
  }
}
