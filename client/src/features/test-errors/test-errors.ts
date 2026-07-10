import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  imports: [],
  templateUrl: './test-errors.html',
  styleUrl: './test-errors.css',
})
export class TestErrors {
  private http = inject(HttpClient);
  private apiUrl = 'https://localhost:5001/api/';
  validationError = signal<string[]>([]);
  get404Error() {
    return this.http.get(`${this.apiUrl}buggy/not-found`).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }
  get401Error() {
    return this.http.get(`${this.apiUrl}buggy/auth`).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }
  get400Error() {
    return this.http.get(`${this.apiUrl}buggy/bad-request`).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }
  get500Error() {
    return this.http.get(`${this.apiUrl}buggy/server-error`).subscribe({
      next: (response) => console.log(response),
      error: (error) => console.error(error)
    });
  }
get401ValidationError() {
  return this.http.post(`${this.apiUrl}account/register`, {}).subscribe({
    next: (response) => console.log(response),
    error: (error) => {
      console.log('1. Full Error inside component:', error);
      
      // Interceptor ki wajah se array kahan baitha hai use target karein:
      // Agar error.error direct array hai, ya error khud array hai, ya default fallback []
      let apiErrors: string[] = [];
      if (Array.isArray(error)) {
        apiErrors = error;
      }
      console.log('2. Extracted Array to Set:', apiErrors);
      this.validationError.set(apiErrors);
    }
  });
}
}
