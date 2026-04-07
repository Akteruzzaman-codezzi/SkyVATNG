import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  // Generic method for showing toaster messages
  showMessage(type: 'success' | 'error' | 'info' | 'warning', message: string, title?: string, options?: Partial<IndividualConfig<any>> | undefined) {
    switch (type) {
      case 'success':
        this.toastr.success(message, title, options);
        break;
      case 'error':
        this.toastr.error(message, title, options);
        break;
      case 'info':
        this.toastr.info(message, title, options);
        break;
      case 'warning':
        this.toastr.warning(message, title, options);
        break;
      default:
        console.error('Invalid message type');
    }
  }
  
}
