import { Component, inject, Inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  // Sahi tarika: lowercase inject function use karein
  protected accountService = inject(AccountService); 
  private toastService = inject(ToastService);
  protected router = inject(Router);
  protected creds: any = {};

  login() {
    this.accountService.login(this.creds).subscribe({
      next: (response: any) => {
        this.router.navigateByUrl('/members');
        console.log(response);
        
      },

      error: (error: any) => {
        console.error(error);
        this.toastService.error(error.error || error.message);
      }
    });
  }
  logout() {
    this.creds = {};
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}