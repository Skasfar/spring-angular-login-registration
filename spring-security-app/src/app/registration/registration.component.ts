import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesrqService } from '../servicesrq.service';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})



export class RegistrationComponent {
  form: any;

  constructor(private formBuilder: FormBuilder, private routing: Router, private rqService: ServicesrqService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userEmail: '',
      userPassword: '',
      userDob:'',
      userName:'',
      userPhnNo:''
    });
  }
  register() {
 //let  password =this.form.getRawValue().userPassword //this.form.getRawValue().password; // Replace with the user's actual password
//const saltRounds = 10; // You can adjust the number of rounds as needed
this.rqService.userRegistration(this.form.getRawValue()).subscribe(
  (value: any) => {
    
    console.log("Response from service:", value);
    this.routing.navigate(['/login'])
  },
  (error: any) => {
    console.log('Failed to fetch user validation:', error);
  }
);
    // bcrypt.hash(password, saltRounds, (err, hash) => {
    //   if (err) {
    //     console.error('Error hashing password:', err);
    //   } else {
    //     console.log("the hash :",hash)

    //     // this.rqService.userValiation(this.form.getRawValue()).subscribe(
    //     this.rqService.userValiation({ "passwordHash": hash, "userEmail":this.form.getRawValue().userEmail }).subscribe(
    //       (value: any) => {
            
    //         console.log("Response from service:", value);
    //       },
    //       (error: any) => {
    //         console.error('Failed to fetch user validation:', error);
    //       }
    //     );
    //     // Send the 'hash' to the server
    //     // this.service.userValidation({ passwordHash: hash }).subscribe(/* Handle the response */);
    //   }
    // });

    // this.rqService.userValiation(this.form.getRawValue()).subscribe(
    //   (value: any) => {
        
    //     console.log("Response from service:", value);
    //   },
    //   (error: any) => {
    //     console.error('Failed to fetch user validation:', error);
    //   }
    // );

  }
}
