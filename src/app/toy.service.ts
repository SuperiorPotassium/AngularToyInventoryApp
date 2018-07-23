import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Toy } from './toy';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ToyService {

  private toysUrl = 'api/toys';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Toys from the server */
  getToys (): Observable<Toy[]> {
    return this.http.get<Toy[]>(this.toysUrl)
      .pipe(
        tap(toys => this.log(`fetched toys`)),
        catchError(this.handleError('getToys', []))
      );
  }

  /** GET toy by id. Return `undefined` when id not found */
  getToy404<Data>(id: number): Observable<Toy> {
    const url = `${this.toysUrl}/?id=${id}`;
    return this.http.get<Toy[]>(url)
      .pipe(
        map(toys => toys[0]), // returns a {0|1} element array
        tap(t => {
          const outcome = t ? `fetched` : `did not find`;
          this.log(`${outcome} toy id=${id}`);
        }),
        catchError(this.handleError<Toy>(`getToy id=${id}`))
      );
  }

  /** GET toy by id. Will 404 if id not found */
  getToy(id: number): Observable<Toy> {
    const url = `${this.toysUrl}/${id}`;
    return this.http.get<Toy>(url).pipe(
      tap(_ => this.log(`fetched toy id=${id}`)),
      catchError(this.handleError<Toy>(`getToy id=${id}`))
    );
  }

  /* GET toys whose name contains search term */
  searchToys(term: string): Observable<Toy[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Toy[]>(`api/toys/?name=${term}`).pipe(
      tap(_ => this.log(`found toys matching "${term}"`)),
      catchError(this.handleError<Toy[]>('searchToys', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addToy (toy: Toy): Observable<Toy> {
    return this.http.post<Toy>(this.toysUrl, toy, httpOptions).pipe(
      tap((toy: Toy) => this.log(`added toy w/ id=${toy.id}`)),
      catchError(this.handleError<Toy>('addToy'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteToy (toy: Toy | number): Observable<Toy> {
    const id = typeof toy === 'number' ? toy : toy.id;
    const url = `${this.toysUrl}/${id}`;

    return this.http.delete<Toy>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted toy id=${id}`)),
      catchError(this.handleError<Toy>('deleteToy'))
    );
  }

  /** PUT: update the hero on the server */
  updateToy (toy: Toy): Observable<any> {
    return this.http.put(this.toysUrl, toy, httpOptions).pipe(
      tap(_ => this.log(`updated toy id=${toy.id}`)),
      catchError(this.handleError<any>('updateToy'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a ToyService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ToyService: ' + message);
  }
}