import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/common/interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  unSubscriber!: Subscription;
  removeUnsubscriber!: Subscription;
  @Input() users!: Array<User>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.unSubscriber = this.userService.getAll().subscribe((users) => {
      if (users) {
      this.users = users;
      } else {
        return;
      }
    })
  }
  ngOnDestroy(): void {
    this.unSubscriber.unsubscribe();
    this.removeUnsubscriber.unsubscribe();
  }

  removeItem(id: string) {
 this.removeUnsubscriber = this.userService.remove(id).subscribe(() => {
   this.users = this.users.filter(user => user.id !== id);
  })
}
}
