import { GridOptions } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateClientDialogComponent } from './add-update-client-dialog/add-update-client-dialog.component';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  public gridOptions!: GridOptions;

  constructor(private dialog: MatDialog, private clientService: ClientService) {
    this.gridOptions = {
      context: { thisConmponent: this },
    };

    this.clientService.getClient().subscribe((res) => {
      this.rowData = res;
    });
  }
  ngOnInit() {}

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

  public rowData: any;

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
          this.clientService
            .addClient(result.form)
            .subscribe((res) => {
              console.log(res);
            });
        }
        if (result.meth == 'update') {
          this.clientService
            .updateClient(result.form.client_id, result.form)
            .subscribe((res) => {
              console.log(res);
            });
        }
      }
    });
  }
}
