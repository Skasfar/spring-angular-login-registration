import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesrqService } from '../servicesrq.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

// import * as bcrypt from 'bcryptjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any;
  @Input() condition!:boolean;
  constructor(private formBuilder: FormBuilder, private routing: Router, private rqService: ServicesrqService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userEmail: '',
      userPassword: ''
    });
  }


   


  login() {
//  let  password =this.form.getRawValue().userPassword //this.form.getRawValue().password;
// const saltRounds = 10; // You can adjust the number of rounds as needed

//     bcrypt.hash(password, saltRounds, (err, hash) => {
//       if (err) {
//         console.error('Error hashing password:', err);
//       } else {
//         console.log("the hash :",hash)

//         // this.rqService.userValiation(this.form.getRawValue()).subscribe(
//         this.rqService.userValiation({ "passwordHash": hash, "userEmail":this.form.getRawValue().userEmail }).subscribe(
//           (value: any) => {
            
//             console.log("Response from service:", value);
//           },
//           (error: any) => {
//             console.error('Failed to fetch user validation:', error);
//           }
//         );
//         // Send the 'hash' to the server
//         // this.service.userValidation({ passwordHash: hash }).subscribe(/* Handle the response */);
//       }
//     });

this.rqService.userValiation(this.form.getRawValue()).subscribe(
  (value: any) => {
    console.log("Response from service:", value);
    localStorage.setItem("JWT",value.jwt)
    this.condition=true;
    this.showSweetAlert("Login Successfull","success");

    this.routing.navigate(['/home'])

  },
  (error: any) => {
    console.error('Failed to login:', error);
    this.showSweetAlert("Invaild Credentials!!","error");
    // Log the status code and error message
    // console.error('Status:', error.status);
    // console.error('Error message:', error.message);
  }
);

  }



  showSweetAlert(message: string, type: string) {
    let sweetAlertIcon: SweetAlertIcon;
  
    // Map your custom 'type' string to a valid SweetAlertIcon
    switch (type) {
      case 'success':
        sweetAlertIcon = 'success';
        break;
      case 'error':
        sweetAlertIcon = 'error';
        break;
 
      // Add more cases as needed
      default:
        sweetAlertIcon =  'warning'; // Set a default value if the type is not recognized
    }
  
    Swal.fire({
      icon: sweetAlertIcon, // Use the mapped SweetAlertIcon
      title: 'Sweet Message!',
      text: message,
      showConfirmButton: false,
      timer: 3000
    });
  }


}
