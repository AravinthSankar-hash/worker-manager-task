import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatetaskComponent } from  "../createtask/createtask.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public state;
  constructor(public dialog: MatDialog) { }

  onCreateTask() {
    this.dialog.open(CreatetaskComponent, {
      width: '550px',
      height: '550px',
      data: {
        invokedFrom: "create"
      }
    });
  }

  changeTaskState(state) {
    this.state = state;
  }
}
