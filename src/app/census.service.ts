import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Census {
  _id?: string;
  year: number;
  censusTaker: string;
  peopleInHousehold: number;
  address: Address;
}

@Injectable({
  providedIn: 'root'
})
export class CensusService {
  private apiUrl = 'http://localhost:3000/api/census';

  constructor(private http: HttpClient) {}

  getCensusRecords(): Observable<Census[]> {
    return this.http.get<Census[]>(this.apiUrl);
  }

  addCensusRecord(census: Census): Observable<Census> {
    return this.http.post<Census>(this.apiUrl, census);
  }

  updateCensusRecord(id: string, census: Census): Observable<Census> {
    return this.http.put<Census>(`${this.apiUrl}/${id}`, census);
  }

  deleteCensusRecord(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
