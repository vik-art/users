import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/common/interface';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;
  users: Array<User> = []

  constructor(
    private userService: UserService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.form = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.maxLength(60)
      ]),
      surname: new FormControl("", [
        Validators.required,
        Validators.maxLength(60)
      ]),
      birthday: new FormControl("", [
        Validators.required,
        Validators.pattern("(^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[012])[.](19|20)[0-9]{2}$)")
      ]),
      phone: new FormControl("", [
        Validators.required,
        Validators.pattern("(^[0-9]{3}[-\s\.]?[0-9]{3}[0-9]{4,6}$)")
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email
      ])
    })
  }
  submit() {
    const user: User = {
      ...this.form.value,
      date: new Date()
    }
    if (this.form.invalid) {
      return;
    } else {
      this.alert.create('The new user was added')
      this.form.reset()
      return this.userService.create(user).subscribe((user) => {
        this.users.push(user)
      })
    }
}
}
