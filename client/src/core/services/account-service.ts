import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core'; // Notice: lowercase 'inject'
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  // Sahi tarika: lowercase inject function use karein
  private http = inject(HttpClient); 
  currentUser = signal<User | null>(null);
  baseUrl = 'https://localhost:5001/api/';

  login(creds: LoginCreds) {
    return this.http.post<User>(this.baseUrl + 'account/login', creds).pipe(
      tap((user: User) =>{
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }
setCurrentUser(user: User){
   localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user)
}
  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
  registeration(registerCreds: RegisterCreds){
    return this.http.post<User>(this.baseUrl + 'account/register', registerCreds).pipe(
      tap((user: User) =>{
       if(user){
         this.setCurrentUser(user);
       }
      })
    )
  }
}