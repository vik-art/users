import { CurrencyPipe } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from 'src/app/common/interface';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  unSubscriber!: Subscription;
  removeUnsubscriber!: Subscription;
  showEditWindow: boolean = false;
  form!: FormGroup;
  id!: string;
  @Input() users!: Array<User>;

  constructor(
    private userService: UserService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
  this.getUsers()
  }
  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
    this.removeUnsubscriber.unsubscribe();
  }

  getUsers() {
this.unSubscriber = this.userService.getAll().subscribe((users) => {
      if (users) {
      this.users = users;
      } else {
        return;
      }
    })
  }

  removeItem(id: string) {
 this.removeUnsubscriber = this.userService.remove(id).subscribe(() => {
   this.alertService.delete("The user data has been removed")
   this.users = this.users.filter(user => user.id !== id);
  })
  }

  editItem(id: string) {
    let [user] = this.users.filter(user => user.id === id);
    this.id = id;
    this.showEditWindow = true;
    this.form = new FormGroup({
      name: new FormControl(user.name, [Validators.required]),
      surname: new FormControl(user.surname, [Validators.required]),
      birthday: new FormControl(user.birthday, [Validators.required]),
      phone: new FormControl(user.phone, [Validators.required]),
      email: new FormControl(user.email, [Validators.required, Validators.email])
    })
  }

  save() {
    this.userService.updateItem({
      ...this.form.value,
      id: this.id,
      date: new Date()
    }).subscribe(() => {
    })
    this.showEditWindow = false;
  }
}
