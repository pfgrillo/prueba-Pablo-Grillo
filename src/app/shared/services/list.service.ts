import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IPosition} from '../models/position.interface';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getPositionsList(): Observable<{data: IPosition[], meta: any}> {
    // I mock an API call to request the json file with positions to be listed using HttpClient
    return this.http.get<{data: IPosition[], meta: any}>('assets/positions.json').pipe(
      catchError((error) => throwError(error))
    );
  }
  savePositions(positionsList: IPosition[]): Observable<any> {
    // I mock an API call to save edited positions using HttpClient
    return this.http.post('urlToMicroservice', positionsList).pipe(
      catchError((error) => throwError(error))
    );
  }
}
