import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';

import { get } from 'scriptjs';

//global variable
declare var Razorpay: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'razorpay-angular-integration';

  paymentForm: FormGroup;
  options = {
    "key": "rzp_test_ci1GxgtQgJTbfh",
    "name": "ShippiGo",
    "description": "Wallet Recharge",
    "image": "https://angular.io/assets/images/support/angular-404.svg",
    "handler": function (response) {
      console.log('rzp res', response)
    },
    "prefill": {
      "name": "Ankur Atri",
      "email": "ankur@zenways.io"
    },
    "notes": {
      "address": "Gurgaon"
    },
    "theme": {
      "color": "#4dd0e1"
    }
  };

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private fb: FormBuilder
  ) { }

  createForm() {
    this.paymentForm = this.fb.group({
      amount: ['', [Validators.required]]
    })
  }

  openRazorpayBox() {
    var rzp = new Razorpay(this.options);
    rzp.open();
  }

  getDeductableAmount() {
    this.http.post('/api/generateId', this.paymentForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          console.log('res', res)
          this.options['amount'] = res.totalAmount;
          this.options['order_id'] = res.razorPayId
          this.openRazorpayBox()
        } else {
          console.log(res.msg)
        }
      }, () => {
        console.log('Something went wrong.')
      })
  }

  openModal() {
    this.dialog.open(PaymentModalComponent, {
      width: '60vw',
      data: {
        paymentStatus: 'success'
      }
    })
  }

  ngOnInit() {
    this.createForm()

    get('https://checkout.razorpay.com/v1/checkout.js', () => {
      console.log('script loaded')
    });

  }

}


