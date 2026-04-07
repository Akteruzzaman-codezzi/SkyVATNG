// core/api/interceptors/error.interceptor.ts
import { HttpInterceptorFn, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Auth } from '../../service/auth';



export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  // const notificationService = inject(ToastService);
  const authService = inject(Auth);
  const router = inject(Router);

  return next(req).pipe(
    retry(1), // Retry failed requests once
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An error occurred';

      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        console.log(error.error.message)
        switch (error.status) {
          case 400:
            errorMessage = 'Bad Request: ' + (error.error?.message || 'Invalid request');
            break;
          case 401:
            errorMessage = 'Unauthorized: Please log in';
            handleUnauthorized(authService, router);
            break;
          case 403:
            errorMessage = 'Forbidden: You don\'t have permission';
            router.navigate(['/unauthorized']);
            break;
          case 404:
            errorMessage = error.error.message;
            break;
          case 409:
            errorMessage = 'Conflict: ' + (error.error?.message || 'Data conflict');
            break;
          case 422:
            errorMessage = handleValidationErrors(error.error);
            break;
          case 429:
            errorMessage = 'Too Many Requests: Please wait before trying again';
            break;
          case 500:
            errorMessage = 'Server Error: Something went wrong on our end';
            break;
          case 503:
            errorMessage = 'Service Unavailable: Please try again later';
            break;
          default:
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }

      // Show user-friendly error message
      // notificationService.showMessage('error', errorMessage);

      // Log error for debugging
      console.error('HTTP Error:', {
        message: errorMessage,
        status: error.status,
        url: req.url,
        method: req.method,
        error: error
      });

      // Track errors for analytics
      trackError(error, req);

      return throwError(() => new Error(errorMessage));
    })
  );
};

// Helper functions
function handleUnauthorized(authService: Auth, router: Router): void {
  authService.logout();
  const returnUrl = router.url;
  router.navigate(['/auth/login'], { 
    queryParams: { returnUrl } 
  });
}

function handleValidationErrors(errorResponse: any): string {
  if(errorResponse.message) return errorResponse.message;
  if (errorResponse.errors && typeof errorResponse.errors === 'object') {
    const errors = Object.values(errorResponse.errors).flat();
    return errors.join(', ');
  }
  return errorResponse.message || 'Validation failed';
}

function trackError(error: HttpErrorResponse, req: HttpRequest<any>): void {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'exception', {
      description: `${error.status} ${error.statusText}`,
      fatal: false,
      custom_map: {
        url: req.url,
        method: req.method
      }
    });
  }
}