import { GridOptions } from 'ag-grid-community';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUpdateClientDialogComponent } from './add-update-client-dialog/add-update-client-dialog.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  public gridOptions!: GridOptions;

  constructor(private dialog: MatDialog) {
    this.gridOptions = {
      context: { thisConmponent: this },
    };
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
    { headerName: 'Id', field: 'id' },
    { headerName: 'Name', field: 'name' },
    { headerName: 'Mail', field: 'mail' },
    { headerName: 'Birthday', field: 'birthday' },
    { headerName: 'Gender', field: 'gender' },
    { headerName: 'Discount', field: 'discount' },
    { headerName: 'Satisfaction', field: 'satisfaction' },
    { headerName: 'Image', field: 'image', hide: true },
  ];

  public rowData: any = [
    {
      gender: 'H',
      id: 'A37047U',
      name: 'houmada',
      image: 'assets/images/av1.png',
      birthday: '2000/09/15',
      mail: 'oussama@mail.com',
    },
    {
      gender: 'H',
      id: 'SDE467987',
      name: 'benaissa',
      image: 'assets/images/av2.jpeg',
      birthday: '1998/08/30',
      mail: 'sidahmed@mail.com',
    },
    {
      gender: 'H',
      id: 'JG367HY',
      name: 'berkane',
      image: 'assets/images/av3.jpeg',
      birthday: '2000/12/12',
      mail: 'samy@mail.com',
    },
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
        console.log(result);
      }
    });
  }
}
