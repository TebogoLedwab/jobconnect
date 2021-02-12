import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { concatAll } from 'rxjs/operators';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'Signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  modalRef: BsModalRef;
  registerForm: FormGroup;
  submitted= false;

  constructor(
    private modalService: BsModalService,
    public alert: AlertService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void { }


  userRegistrationForm = new FormGroup({
    primaryEmail: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),

    name: new FormControl('', [
      Validators.required]),

    surname: new FormControl('',[
      Validators.required
    ]),

    password: new FormControl('',[
      Validators.required
    ]),
    
    passwordConfirm: new FormControl('',[
      Validators.required
    ]),

  }
  );


// Get form data
  get primEmail() {
    return this.userRegistrationForm.get('primaryEmail')
  }

  get secondEmail() {
    return this.userRegistrationForm.get('name')
  }


  // When user clicks on 'Submit/Register' save and retrieve their data
  onSubmit() {
    let payLoad = this.userRegistrationForm.getRawValue();
    let password  = payLoad.password;
    let passwordConfirm  = payLoad.passwordConfirm;
    let name  = payLoad.name;
    let surname  = payLoad.surname;
    let email  = payLoad.primaryEmail;
  
    // Validate user password match
    if (password !== passwordConfirm) {
         this.alert.error('Password did not match');
        return;
      }

    // Attempt to save/send new user data to back end/db.
    this.userService
      .sign_up({ name, surname, email, password })
      .subscribe((server_data) => {
        
        // If registration failed
        if (
          server_data.message == 'Registration failed, user already exists.'
        ) {
          this.alert.error(server_data.message);
          return;
        }

        // if registration success
        if (server_data.message == 'Successfully registered, Please sign in.') {
          this.alert.success(server_data.message);
          this.close_modal();
        }
      });

  }



  close_modal() {
    this.modalService.hide();
  }

  openModal(template: TemplateRef<any>) {
    this.close_modal();
    setTimeout(() => {
      this.modalRef = this.modalService.show(template);
    }, 200);
  }


}
