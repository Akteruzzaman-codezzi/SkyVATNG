import {
  HttpClient,
  HttpResponse,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, filter, throwError, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { API_CONFIG } from '../api.config';
import { ApiResponseDto } from '../../models/ApiResponseDto';


interface RequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?: HttpParams | { [param: string]: string | string[] };
  observe?: any;
  reportProgress?: boolean;
  responseType?: any;
  withCredentials?: boolean;
  version?: ApiVersion;
}

export type ApiVersion = 'v1' | 'v2';

@Injectable({
  providedIn: 'root',
})
export class BaseApi  {
  protected apiUrl = environment.apiBaseUrl;
  protected readonly timeout = environment.apiTimeout || 30000;
  protected readonly defaultVersion: ApiVersion = API_CONFIG.DEFAULT_VERSION as ApiVersion;
  constructor(protected http: HttpClient) {}

  // ================================
  // PROTECTED HTTP METHODS
  // ================================
  /**
   * GET request with automatic response unwrapping
   */
  protected get<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint, options?.version);
    // const httpOptions: any = this.buildHttpOptions(options);
    // console.log(httpOptions);
    return this.http.get<ApiResponseDto<T>>(url, options).pipe(
      map((response) => this.extractData<T>(response.data as T | ApiResponseDto<T>)),
      catchError((error) => this.handleError(error, 'GET', endpoint)),
    );
  }

  protected Get<T>(endpoint: string, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint, options?.version);
    return this.http.get<ApiResponseDto<T>>(url, options).pipe(
      map((response: any) => response.data), // Directly return the data part of the response
      catchError((error) => this.handleError(error, 'GET', endpoint)),
    );
  }
  /**
   * POST request with automatic response unwrapping
   */
  protected post<T>(endpoint: string, body: any, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint, options?.version);
    //const httpOptions = this.buildHttpOptions(options);

    return this.http.post<ApiResponseDto<T>>(url, body).pipe(
      map((response) => this.extractData<T>(response.data as T | ApiResponseDto<T>)),
      catchError((error) => this.handleError(error, 'POST', endpoint)),
    );
  }

  protected Post<T>(endpoint: string, body: any, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint, options?.version);
    return this.http.post<ApiResponseDto<T>>(url, body, options).pipe(
      map((response: any) => response.data), // Directly return the data part of the response
      catchError((error) => this.handleError(error, 'POST', endpoint)),
    );
  }

  /**
   * PUT request with automatic response unwrapping
   */
  protected put<T>(endpoint: string, body: any, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint, options?.version);
    //const httpOptions = this.buildHttpOptions(options);

    return this.http.put<ApiResponseDto<T>>(url, body).pipe(
      map((response) => this.extractData<T>(response.data as T | ApiResponseDto<T>)),
      catchError((error) => this.handleError(error, 'PUT', endpoint)),
    );
  }

  /**
   * PATCH request with automatic response unwrapping
   */
  protected patch<T>(endpoint: string, body: any, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint, options?.version);
    const httpOptions = this.buildHttpOptions(options);

    return this.http.patch<ApiResponseDto<any>>(url, body, httpOptions).pipe(
      filter((event): event is HttpResponse<ApiResponseDto<T>> => event instanceof HttpResponse),
      map((response) => this.extractData<T>(response.body as T | ApiResponseDto<T>)),
      catchError((error) => this.handleError(error, 'PATCH', endpoint)),
    );
  }

  /**
   * DELETE request
   */
  protected delete<T = void>(endpoint: string, options?: RequestOptions): Observable<T> {
    const url = this.buildUrl(endpoint, options?.version);
    //const httpOptions = this.buildHttpOptions(options);

    return this.http.delete<ApiResponseDto<T>>(url).pipe(
      map((response) => this.extractData<T>(response.data as T | ApiResponseDto<T>)),
      catchError((error) => this.handleError(error, 'DELETE', endpoint)),
    );
  }

  /**
   * Upload file with progress tracking
   */
  protected uploadFile<T>(
    endpoint: string,
    file: File,
    additionalData?: { [key: string]: any },
    progressCallback?: (progress: number) => void,
  ): Observable<T> {
    const url = this.buildUrl(endpoint);
    const formData = new FormData();

    formData.append('file', file);

    // Add additional data to form
    if (additionalData) {
      Object.keys(additionalData).forEach((key) => {
        formData.append(key, additionalData[key]);
      });
    }

    const options = {
      reportProgress: true,
      observe: 'events' as const,
    };

    return this.http.post(url, formData, options).pipe(
      map((event) => {
        if (event.type === 1 && progressCallback) {
          // Upload progress
          const progress = Math.round((100 * event.loaded) / (event.total || 1));
          progressCallback(progress);
        } else if (event.type === 4) {
          // Response received
          return this.extractData<T>(event.body as ApiResponseDto<T>);
        }
        return null;
      }),
      filter((result) => result !== null),
      catchError((error) => this.handleError(error, 'UPLOAD', endpoint)),
    );
  }

  /**
   * Download file
   */
  protected downloadFile(endpoint: string, filename?: string): Observable<Blob> {
    const url = this.buildUrl(endpoint);
    const options = {
      responseType: 'blob' as const,
      observe: 'response' as const,
    };

    return this.http.get(url, options).pipe(
      map((response) => {
        // Auto-download file if filename provided
        if (filename && response.body) {
          this.saveFile(response.body, filename);
        }
        return response.body as Blob;
      }),
      catchError((error) => this.handleError(error, 'DOWNLOAD', endpoint)),
    );
  }

  // ================================
  // UTILITY METHODS
  // ================================

  /**
   * Build full URL from endpoint
   */
  private buildUrl(endpoint: string, version?: ApiVersion): string {
    // Remove leading slash if present
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;

    // Ensure apiUrl doesn't end with slash
    const cleanApiUrl = this.apiUrl.endsWith('/')
      ? this.apiUrl.substring(0, this.apiUrl.length - 1)
      : this.apiUrl;

    const selectedVersion = version || this.defaultVersion;
    return `${cleanApiUrl}/${selectedVersion}/${cleanEndpoint}`;
  }

  /**
   * Build HTTP options with default headers
   */
  private buildHttpOptions(options?: RequestOptions): any {
    //return null
    const defaultHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    });

    let headers = defaultHeaders;

    if (options?.headers) {
      if (options.headers instanceof HttpHeaders) {
        headers = options.headers;
      } else {
        headers = new HttpHeaders(options.headers);
      }
    }

    return {
      headers,
      params: options?.params,
      observe: options?.observe || 'body',
      reportProgress: options?.reportProgress || false,
      responseType: options?.responseType || 'json',
      withCredentials: options?.withCredentials || false,
    };
  }

  /**
   * Extract data from API response wrapper
   */
  private extractData<T>(response: ApiResponseDto<T> | T): T {
    // Handle wrapped responses
    if (response && typeof response === 'object' && 'data' in response) {
      return (response as ApiResponseDto<T>).data as T;
    }

    // Handle direct responses
    return response as T;
  }

  /**
   * Handle HTTP errors
   */
  private handleError(
    error: HttpErrorResponse,
    method: string,
    endpoint: string,
  ): Observable<never> {
    console.error(`${method} ${endpoint} failed:`, error);

    // You can add custom error handling logic here
    // The error interceptor will handle user notifications

    return throwError(() => error);
  }

  /**
   * Save blob as file
   */
  private saveFile(blob: Blob, filename: string): void {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  // ================================
  // PUBLIC UTILITY METHODS
  // ================================

  /**
   * Build query parameters from object
   */
  protected buildParams(params: { [key: string]: any }): HttpParams {
    let httpParams = new HttpParams();

    Object.keys(params).forEach((key) => {
      const value = params[key];
      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            httpParams = httpParams.append(`${key}[]`, item.toString());
          });
        } else {
          httpParams = httpParams.append(key, value.toString());
        }
      }
    });

    return httpParams;
  }

  /**
   * GET request with automatic response unwrapping
   */
  protected GetHttp<T>(endpoint: string, options?: RequestOptions): Observable<any> {
    return this.http.get<any>('', options).pipe(
      map((response) => this.extractData<T>(response.data as any)),
      catchError((error) => this.handleError(error, 'GET', endpoint)),
    );
  }

  /**
   * Handle API response with custom success/error callbacks
   */
  protected handleResponse<T>(
    request: Observable<T>,
    onSuccess?: (data: T) => void,
    onError?: (error: any) => void,
  ): Observable<T> {
    return request.pipe(
      tap((data) => {
        if (onSuccess) {
          onSuccess(data);
        }
      }),
      catchError((error) => {
        if (onError) {
          onError(error);
        }
        return throwError(() => error);
      }),
    );
  }
}
