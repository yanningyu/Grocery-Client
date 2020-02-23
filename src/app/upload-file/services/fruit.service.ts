import { FileService } from './../../shared/services/file.service';
import { environment } from './../../../environments/environment';

import { IFruit } from './../../interface/i-fruit';
import { Injectable } from '@angular/core';
import { Subject, Observable, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import * as _ from 'underscore';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FruitService {

constructor(
  private fileService: FileService,
  private httpClient: HttpClient) { }

  private fruitSubject = new Subject<IFruit[]>();
  fruits$ = this.fruitSubject as Observable<IFruit[]>;

  merge = (fruits: IFruit[]): Observable<IFruit[]> => {
    const url = `${environment.groceryAPI}/api/fruit`;
    const request = {} as any;
    request.fruits = fruits;
    return this.httpClient.post<IFruit[]>(url, request).pipe(
      map((fruitsTemp: IFruit[]) => {
        fruitsTemp = _.sortBy(fruitsTemp, 'updatedDate');
        this.fruitSubject.next(fruitsTemp);
        return fruitsTemp;
      }),
      catchError(this.handleError )
    );
  }

  private handleError(err: any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
