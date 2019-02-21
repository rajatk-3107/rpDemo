import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaymentModalComponent } from './payment-modal/payment-modal.component';
import { MatFormFieldModule, MatDialogModule, MatSnackBarModule, MatInputModule, MatButtonModule } from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PaymentModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [],
  entryComponents: [PaymentModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
