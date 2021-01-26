import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';

import { ApiError } from './api-error';

// This service provides an api to catch specific API errors and
// convert them into meaningful strings for the user

@Injectable({
  providedIn: 'root'
})
export class ApiErrorService {

  isApiError(obj): obj is ApiError {
    return (obj as ApiError).type !== undefined &&
           (obj as ApiError).description !== undefined;
  }

  describe(apiError: ApiError): string {
    let result = apiError.description;
    if (apiError.details) result += apiError.details;
    return result;
  }

  apiErrorHandler(apiErrorHandler?: (err: ApiError) => string | undefined | null)
    : (err: any) => Observable<any>
  {
    return error => {
      if (error instanceof ErrorEvent) {
        // Client-side or network error
        return throwError('Errore client o di rete');
      }
      else if (this.isApiError(error.error)) {
        let description: string;

        if (apiErrorHandler)
          description = apiErrorHandler(error.error);

        if (!description)
          description = this.describe(error.error);

        return throwError(description);
      }
      else {
        return throwError('Errore (vedi console)');
      }
    };
  }
}
