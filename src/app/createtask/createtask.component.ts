import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';


import { CreatetaskService } from "../createtask.service";
import { AlertComponent } from "../alert/alert.component";
import { LoginService } from '../login.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-createtask',
  templateUrl: './createtask.component.html',
})
export class CreatetaskComponent implements OnInit {

  public taskForm: FormGroup;
  public users: Observable<string[]>;
  public userNames: string[] = [];
  public disableRewards = true;
  public status = ["Assigned", "Pending", "Submitted", "Done"];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    public dialogRef: MatDialogRef<CreatetaskComponent>,
    private _taskService: CreatetaskService,
    private alerts: AlertComponent,
    private _loginService: LoginService) { }

  ngOnInit() {
    this.taskForm = new FormGroup({
      taskName: new FormControl(),
      estimation: new FormControl(),
      rating: new FormControl(),
      status: new FormControl('NEW'),
      assignedTo: new FormControl(),
      rewards: new FormControl(''),
      comments: new FormControl(''),
    });
    this.getAllUsers();
    this.populateTaskDetails();
    this.users = this.taskForm.get("assignedTo").valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.userNames.filter(option => option.toLowerCase().includes(filterValue));
  }

  getAllUsers() {
    const userToken = this._loginService.userToken;
    this._loginService.getAllUsers(userToken)
      .subscribe( (response: any) => {
        this.userNames = response.map(user => user.username);
      });
  }

  taskcreateupdate() {
    const userToken = this._loginService.userToken;
    let message;
    if (this.data.invokedFrom === "create") {
      this.taskForm.value.status = this.taskForm.value.status.toLowerCase();
      this._taskService.createTask(this.taskForm.value, userToken)
      .subscribe( () => {
        message = "Task Created Successfully";
        this.alerts.openSnackBar(message, "CLOSE");
      });
    } else {
      const payLoad = {tID: this.data.taskDetails.tID, ...this.taskForm.value }
      this._taskService.updateTask(payLoad, userToken)
      .subscribe( () => {
        message = "Task Updated Successfully";
        this.alerts.openSnackBar(message, "CLOSE");
      });
    }
    this.closeDialog();
  }

  populateTaskDetails() {
    if (this.data.invokedFrom === "create") {
      return;
    }
    this.taskForm.patchValue(
      {
        taskName: this.data.taskDetails.taskName,
        estimation: this.data.taskDetails.estimation,
        rating: this.data.taskDetails.rating,
        status: this.data.taskDetails.status,
        rewards: this.data.taskDetails.rewards,
        assignedTo: this.data.taskDetails.assignedTo,
        comments: this.data.taskDetails.comments
      }
    )
    if (this.data.taskDetails.status === "submitted") {
      this.disableRewards = false;
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
