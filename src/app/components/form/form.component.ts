import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/common/interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private users: UserService
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
        Validators.required
      ]),
      phone: new FormControl("", [
        Validators.required
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
      this.users.create(user).subscribe(() => {})
      this.form.reset()
  }
}
}
