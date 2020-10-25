import { Component, ViewChild, OnInit, Input, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { CreatetaskComponent } from '../createtask/createtask.component';
import { CreatetaskService } from "../createtask.service";
import { LoginService } from '../login.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnChanges {

  constructor(public dialog: MatDialog,
    private _taskService: CreatetaskService,
    private _loginService: LoginService) { }

  ngOnInit() {
    this.fetchTasks();
  }

  displayedColumns: string[] = ['tID', 'taskName', 'estimation', 'status', 'rating'];
  dataSource = new MatTableDataSource<any>();

  @Input() selectedTaskState: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges() {
    if (this.selectedTaskState === "All") {
      this.fetchTasks();
    } else if (this.selectedTaskState) {
      this.fetchTaskBasedOnState();
    }
  }

  onRowSelect(rowData) {
    console.log(rowData);
      this.dialog.open(CreatetaskComponent, {
        width: '550px',
        height: '550px',
        data: {
          taskDetails: rowData,
          userRole: "manager"
        }
      });
  }

  fetchTasks() {
    const userToken = this._loginService.userToken;
    const pagination = {
      limit: 10,
      skip: 0
    }
    this._taskService.fetchAllTasks(pagination, userToken)
    .subscribe( (response: any) => {
      this.dataSource = response;
    });
  }

  fetchTaskBasedOnState() {
    const userToken = this._loginService.userToken;
    const payLoad = {
      limit: 10,
      skip: 0,
      state: this.selectedTaskState
    }
    this._taskService.taskBasedOnState(payLoad, userToken)
    .subscribe( (response: any) => {
      this.dataSource = response;
    });
  }

}
