import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TitleTextService {
  private messageSource = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
}
