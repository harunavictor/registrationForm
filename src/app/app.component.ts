import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup,FormArray } from '@angular/forms';
import { forbidenNameValidator } from './shared/user-name.validator';
import { PasswordValidation } from './shared/password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  get email() {
    return this.registrationForm.get('email');
  }
  get userName() {
    return this.registrationForm.get('userName');
  }

  get alternateEmails() {
    return this.registrationForm.get('alternateEmails') as FormArray;
}

  constructor(private fb: FormBuilder) {}
  registrationForm: FormGroup;
    
  addAlternateEmails() {
    this.alternateEmails.push(this.fb.control(''));
     }

  ngOnInit() {
    this.registrationForm = this.fb.group(
      {
        userName: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            forbidenNameValidator(/password/),
          ],
        ],
        password: [''],
        email: [''],
        subscribe: [false],
        confirmPassword: [''],
        address: this.fb.group({
          state: [''],
          city: [''],
          postalCode: [''],
        }),
        alternateEmails:this.fb.array([])
      },
      { validator: PasswordValidation }
    );

    this.registrationForm
      .get('subscribe')
      .valueChanges.subscribe((checkedValues) => {
        const email = this.registrationForm.get('email');
        if (checkedValues) {
          email.setValidators(Validators.required);
        } else {
          email.clearValidators();
        }
        email.updateValueAndValidity();
      });
  }
  onSubmit() {
  console.log(this.registrationForm.value);
  
}
  
}
