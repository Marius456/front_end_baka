import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import { User, loginUser } from '../entities/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    Url = 'https://localhost:5001/api/users/';
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(
        private http: HttpClient,
        private router: Router,
        private jwtHelper: JwtHelperService
        ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        if(this.currentUserSubject.value){
            localStorage.setItem('access_token', this.currentUserSubject.value.token);
        }
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    public get getAccessToken(): any{
        const token = this.jwtHelper.decodeToken(localStorage.getItem('access_token'));
        return token;
    }

    login(user : loginUser) {
        return this.http.post<User>(this.Url+'login', user)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        localStorage.removeItem('access_token');
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
        window.location.reload();
    }
}