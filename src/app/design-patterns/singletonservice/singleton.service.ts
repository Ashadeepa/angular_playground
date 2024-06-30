import { Injectable } from '@angular/core';
import { refCount } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SingletonService {

  public static refCount = 0;

  constructor() {
    SingletonService.refCount += 1;
    console.log("Number of instances: ", SingletonService.refCount);
   }

   getMessage(msg: string) {
    return "Message from " + msg;
   }
}
