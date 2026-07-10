import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toast-service';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const Toast = inject(ToastService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error)=>{
      if(error){
        switch (error.status) {
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 401:
            Toast.error('Unauthorized');
            break;
          case 400:
            if(error.error.errors){
              let modelStateErrors = []
              for(const key in error.error.errors){
                if(error.error.errors[key]){
                  modelStateErrors.push(error.error.errors[key]);
                }
              }
              throw modelStateErrors.flat();
            }else{
              Toast.error(error.error+' '+error.status)
            }
            break;
          case 500:
            const navigationExtras = {state: {error: error.error}};
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            Toast.error('An unexpected error occurred');
            break;
        }
      }
      throw error;
    })
  )
};
