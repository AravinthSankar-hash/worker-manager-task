import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { CreatetaskService } from "../createtask.service";
import { LoginService } from '../login.service';
import { AlertComponent } from "../alert/alert.component";
import { CreatetaskComponent } from '../createtask/createtask.component';

@Component({
  selector: 'app-worker',
  templateUrl: './worker.component.html',
  styleUrls: ['./worker.component.css']
})
export class WorkerComponent implements OnInit {

  public isRowNotSelected = true;
  public fileToUpload: File = null;
  public selectedRow;
  public totalRewards = 0;


  constructor(
    private _taskService: CreatetaskService,
    public dialog: MatDialog,
    private _loginService: LoginService,
    private alerts: AlertComponent) { }

  ngOnInit(): void {
    this.fetchMyTasks();
  }

  displayedColumns: string[] = ['checked', 'tID', 'taskName', 'estimation', 'status', 'rating'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  highlight(element: any) {
    element.highlighted = !element.highlighted;
  }

  fetchMyTasks() {
    const userToken = this._loginService.userToken;
    const pagination = {
      limit: 10,
      skip: 0
    }
    this._taskService.fetchWorkerTasks(pagination, userToken)
      .subscribe((response: any) => {
        response.forEach((e, idx) => {
          e.checked = idx;
          this.totalRewards += Number(e.rewards) ? Number(e.rewards) : 0;
        });
        this.dataSource = response;
      });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    const userToken = this._loginService.userToken;
    this._taskService.postFile(this.fileToUpload, userToken, this.selectedRow.tID).subscribe(data => {
      this.alerts.openSnackBar("File uploaded", "CLOSE");
    }, error => {
      console.log(error);
    });
  }

  selectCheckBox(rowData, matData) {
    this.selectedRow = rowData;
    if (rowData && !matData.checked) {
      this.isRowNotSelected = false;
    }
  }

  public searchText = "";
  searchTask() {
    const userToken = this._loginService.userToken;
    const searchObj = {
      searchText: this.searchText
    }
    this._taskService.searchTask(searchObj, userToken)
      .subscribe((response: any) => {
        this.dataSource = response;
      });
  }

  onRowSelect(rowData) {
    console.log(rowData);
      this.dialog.open(CreatetaskComponent, {
        width: '550px',
        height: '550px',
        data: {
          taskDetails: rowData,
          userRole: "worker"
        }
      });
  }
}
