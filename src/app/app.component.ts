import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';

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

  getDeductableAmount() {
    console.log('Value', this.paymentForm.value)
    this.openModal()
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
  }

}


