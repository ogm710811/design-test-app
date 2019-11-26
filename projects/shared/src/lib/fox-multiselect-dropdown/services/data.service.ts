import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  getPlans(): Observable<Data[]> {
    const items = getMockPlan();
    return of(items).pipe(delay(500));
  }
}

function getMockPlan(): Data[] {
  return [
    {
      'id': '0',
      'name': 'Value 0'
    },
    {
      'id': '1',
      'name': 'Value 1'
    },
    {
      'id': '2',
      'name': 'Value 2'
    },
    {
      'id': '3',
      'name': 'Value 3'
    },
    {
      'id': '4',
      'name': 'Value 4'
    },
    {
      'id': '5',
      'name': 'Value 5'
    }
  ];
}
