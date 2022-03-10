import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../common/interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public $alert = new Subject<Alert>()
  create(text: string) {
    this.$alert.next({type: 'create', text})
  }
  update(text: string) {
    this.$alert.next({type: 'update', text})
  }
  delete(text: string) {
    this.$alert.next({type: 'delete', text})
  }
}
