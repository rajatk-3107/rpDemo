import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css']
})
export class PaymentModalComponent implements OnInit {

  paymentStatus: string;

  constructor(
    private dialogRef: MatDialogRef<PaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data)
    this.paymentStatus = this.data.paymentStatus;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
