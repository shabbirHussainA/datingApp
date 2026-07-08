import { Component, inject, input, output, Output } from '@angular/core';
import { RegisterCreds, User } from '../../../types/user';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  protected accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds
  register() {
    this.accountService.registeration(this.creds).subscribe({
      next: (user) => {
        console.log('Registration successful:', user);
      },
      error: (error) => {
        console.error('Registration failed:', error);
      }
    });
  }
  cancel() {
    console.log('Registration canceled');
    this.cancelRegister.emit(false);
  }
}
