import Swal from 'sweetalert2';
import { GridOptions } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/client.service';
import { AddUpdateClientDialogComponent } from './add-update-client-dialog/add-update-client-dialog.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  public rowData: any;
  private gridApi: any;
  public showDeleteButton = false;
  public gridOptions!: GridOptions;

  constructor(private dialog: MatDialog, private clientService: ClientService) {
    this.gridOptions = {
      context: { thisConmponent: this },
    };
    this.loadData();
  }

  ngOnInit() {}

  loadData() {
    this.clientService.getClient().subscribe((res) => {
      this.rowData = res;
    });
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  getRowsSelected() {
    if (this.gridApi.getSelectedRows().length < 1) return;

    let ids: any = [];
    this.gridApi.getSelectedRows().forEach((clt: any) => {
      ids.push(clt.client_id);
    });
    this.removeClient(ids);
  }

  onRowSelect() {
    this.showDeleteButton = this.gridApi.getSelectedRows().length > 0;
  }

  public columnDefs: any = [
    {
      width: 80,
      rowDrag: true,
      checkboxSelection: true,
      headerCheckboxSelection: true,
      cellRenderer: 'agGroupCellRenderer',
      headerCheckboxSelectionFilteredOnly: true,
    },
    { headerName: 'Id', field: 'client_id', hide: true },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Mail', field: 'mail' },
    { headerName: 'DateNaissance', field: 'dateNaissance' },
    { headerName: 'Discount', field: 'discount' },
    { headerName: 'Satisfaction', field: 'Satisfaction' },
    { headerName: 'Image', field: 'image', hide: true },
  ];

  getContext(params: any): any {
    return [
      {
        name: 'edit...',
        action: () => {
          params.context.thisConmponent.openClientDialog(
            params.node.data,
            false,
            'update client'
          );
        },
        icon: '<i class="material-icons">update</i>',
      },
      'separator',
      'export',
    ];
  }

  public defaultColDef: any = {
    filter: true,
    sortable: true,
    resizable: true,
    editable: false,
  };

  public openClientDialog(
    objet: any = null,
    option: boolean = true,
    title: string = 'Add new Client'
  ) {
    const clientDialog = this.dialog.open(AddUpdateClientDialogComponent, {
      data: {
        objet: objet,
        title: title,
        option: option,
      },
      width: '820px',
    });

    clientDialog.afterClosed().subscribe((result) => {
      if (result) {
        if (result.meth == 'add') {
          this.clientService.addClient(result.form).subscribe(
            (res) => {
              this.loadData();
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Success',
                showConfirmButton: false,
                timer: 1000,
              });
            },
            (err) => {
              Swal.fire('Error', err, 'error');
            }
          );
        }
        if (result.meth == 'update') {
          this.clientService
            .updateClient(result.form.client_id, result.form)
            .subscribe(
              (res) => {
                this.loadData();
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Success',
                  showConfirmButton: false,
                  timer: 1500,
                });
              },
              (err) => {
                Swal.fire('Error', err, 'error');
              }
            );
        }
      }
    });
  }

  removeClient(ids: any) {
    this.clientService.deleteClient(ids).subscribe(
      (res: any) => {
        this.loadData();
        this.showDeleteButton = false;
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (err) => {
        Swal.fire('Error', err, 'error');
      }
    );
  }
}
