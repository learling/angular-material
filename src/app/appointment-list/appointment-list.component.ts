import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointments.service';
import { Appointment } from '../Appointment';
import { mergeMap } from 'rxjs/operators';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
})
export class AppointmentListComponent implements OnInit {
  public loading = true;
  public appointments!: Appointment[];
  public columns = ['appointmentDate', 'name', 'email', 'cancel'];
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

  ngOnInit() {
    this.appointmentService.getAppointments().subscribe(
      (appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.loading = false;
        this.openSnackBar(error.error.message, 'OK', 15000);
      }
    );
  }

  cancelAppointment(id: string) {
    this.appointmentService
      .cancelAppointment(id)
      .pipe(mergeMap(() => this.appointmentService.getAppointments()))
      .subscribe(
        (appointments: Appointment[]) => {
          this.appointments = appointments;
          this.openSnackBar('Appointment cancelled', 'OK', 15000);
        },
        (error: ErrorEvent) => {
          this.openSnackBar(error.error.message, 'OK', 15000);
        }
      );
  }
}
