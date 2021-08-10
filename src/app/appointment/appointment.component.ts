import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointments.service';
import { Appointment } from '../Appointment';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css'],
})
export class AppointmentComponent implements OnInit {
  appointmentDate!: string;
  name!: string;
  email!: string;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private appointmentService: AppointmentService,
    private snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: duration,
    });
  }

  ngOnInit() {}

  createAppointment() {
    this.appointmentService
      .createAppointment(this.appointmentDate, this.name, this.email)
      .subscribe(
        (createdAppointment: Appointment) => {
          this.appointmentDate = '';
          this.name = '';
          this.email = '';
          const appointmentDate = new Date(
            createdAppointment.appointmentDate
          ).toDateString();
          this.openSnackBar('Appointment booked', 'Great!', 3000);
        },
        (error: ErrorEvent) => {
          this.openSnackBar(error.error.message, 'OK', 15000);
        }
      );
  }
}
