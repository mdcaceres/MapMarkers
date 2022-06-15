import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { Marcador } from "../interfaces/Marcador";

@Injectable()
export class MarcadorProvider {

  constructor( private http : HttpClient ){

  }

  handleError(error : HttpErrorResponse) {
    if(error.status === 0) {
      console.log("error : " + error.message)
    } else {
      console.log("Status code : " + error.status);
      console.log(error);
    }
    return throwError(() => new Error(error.error));
  }

  getMarcadores() : Observable<any>{
    const url = environment.urlBase + 'api/geolocalizacion/GetMarcadores';
    return this.http.get<Marcador[]>(url).pipe(catchError(this.handleError));
  }

}
