import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BackendInterceptor implements HttpInterceptor {
  apiUrl = 'http://localhost:4200';

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, body } = request;

    const regex = /http:\/\/localhost:4200\/users\/\d*/gi;

    if (method === 'GET' && url.match(regex)) {
      const urlParts = url.split('/');
      const userId = urlParts[urlParts.length - 1];

      return of(
        new HttpResponse({
          status: 200,
          body: JSON.parse(localStorage.getItem('users')).find(
            (user) => user.id === +userId
          ),
          statusText: 'Get the user',
          url: `${this.apiUrl}/users/:id`,
        })
      );
    }

    if (method === 'GET') {
      return of(
        new HttpResponse({
          status: 200,
          body: JSON.parse(localStorage.getItem('users')),
          statusText: 'Get all users',
          url: `${this.apiUrl}/users`,
        })
      );
    }

    if (method === 'POST') {
      return of(
        new HttpResponse({
          status: 200,
          body,
          statusText: 'Registered with success',
          url: `${this.apiUrl}/users`,
        })
      );
    }
    if (method === 'PUT') {
      const urlParts = url.split('/');
      const userId = urlParts[urlParts.length - 1];

      const users = JSON.parse(localStorage.getItem('users'));
      const userIndex = users.findIndex((user) => user.id === +userId);

      users[userIndex] = body;
      localStorage.setItem('users', JSON.stringify(users));

      return of(
        new HttpResponse({
          status: 200,
          body: users[userIndex],
          statusText: 'Updated with success',
          url: `${this.apiUrl}/users/:id`,
        })
      );
    }
    if (method === 'DELETE') {
      const users = JSON.parse(localStorage.getItem('users'));

      const userDeleted = users.filter((user) => user.id !== body);

      localStorage.setItem('users', JSON.stringify(userDeleted));

      return of(
        new HttpResponse({
          status: 200,
          body: userDeleted,
          url: `${this.apiUrl}/users`,
          statusText: 'Deleted with success',
        })
      );
    }
    next.handle(request);
  }
}
