import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';

import { get } from 'scriptjs';
declare var Razorpay: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'razorpay-angular-integration';

  paymentForm: FormGroup;


  constructor(
    private snackbar: MatSnackBar,
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
    let options = {
      "key": "rzp_test_ci1GxgtQgJTbfh",
      "amount": "2000", // 2000 paise = INR 20
      "name": "Merchant Name",
      "description": "Purchase Description",
      "image": "https://angular.io/assets/images/support/angular-404.svg",
      "handler": function (response) {
        alert(response.razorpay_payment_id);
      },
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "test@test.com"
      },
      "notes": {
        "address": "Hello World"
      },
      "theme": {
        "color": "#F37254"
      },
      "order_id": ''
    };
    var rzp = new Razorpay(options);
    rzp.open();
  }


  getDeductableAmount() {
    console.log('Value', this.paymentForm.value)
    // this.openModal()

    this.http.post('/api/generateId', this.paymentForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          console.log(res)
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


