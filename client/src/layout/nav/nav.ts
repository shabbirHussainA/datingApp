import { Component, inject, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  // Sahi tarika: lowercase inject function use karein
  protected accountService = inject(AccountService); 
  protected creds: any = {};

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (response: any) => {
        console.log(response);
        
      },

      error: (error: any) => {
        console.error(error);
        alert(error.error || error.message); // Production best practice
      }
    });
  }
  logout() {
    this.creds = {};
    this.accountService.logout();
  }
}