import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactInformation } from 'src/app/models/contact-information';
import { ContactService } from 'src/app/services/contact.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {


  constructor(private fb: FormBuilder,
    private contactService: ContactService,
    private toastr: ToastrService) { }
  contactForm: any;
  errorFlag = false;
  errorMessage = '';

  objectToSend = {
    name: '',
    phoneNumber: 0
  }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  onSubmit(data) {

    let check = data.phoneNumber.match(/^\d+$/);
    if (data.name != "" && data.number != "") {
      if (check != null) {
        this.objectToSend['name'] = data.name;
        this.objectToSend['phoneNumber'] = data.phoneNumber;
        this.contactService.create(this.objectToSend);
        this.toastr.success('Dear ' + data.name + ', you\'ll receive a callback soon.');
        this.contactForm.reset();
      } else {
        this.toastr.error('Please enter a valid Phone number.')
      }
    } else {
      this.toastr.error('All fields are required!')

    }
  }
}
