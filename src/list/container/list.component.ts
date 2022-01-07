import { Component, OnInit } from '@angular/core';
import {ListService} from '../../app/shared/services/list.service';
import {IPosition} from '../../app/shared/models/position.interface';
import {MatSelectChange} from '@angular/material/select';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditPositionComponent} from '../components/edit-position/edit-position.component';
import {ECategory} from '../../app/shared/enums/categories.enum';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  positionsList: IPosition[] = [];
  activePositions: IPosition[] = [];
  nonActivePositions: IPosition[]= [];
  newPositions: IPosition[] = [];
  ECategory = ECategory;
  constructor(
    private listService: ListService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Services would be called outside components (for example from a route resolver) to keep them with less logic as
    // possible but for the purpose of simplifying the test I've added them here.
    // @ts-ignore
    this.listService.getPositionsList().subscribe((list: {data: IPosition[], meta: any}) => {
      this.positionsList = list.data;
      list.data.forEach((position, index) => {
        switch(true) {
          case position.category === 1:
            this.newPositions.push(position);
            break;
          case position.category === 2:
            this.activePositions.push(position);
            break;
          case position.category === 3:
            this.nonActivePositions.push(position);
            break;
        }
      })
      this.arraySorting([this.activePositions, this.nonActivePositions, this.newPositions], 'id');
    });
  }

  arraySorting(arrays: any[][], sortingOption: string) {
    arrays.forEach((array) => {
      array.sort((e1, e2) => {
        if (isNaN(e1[sortingOption]) && isNaN(e2[sortingOption])) {
          return e1[sortingOption].localeCompare(e2[sortingOption], undefined, {numeric: true})
        } else {
          return e1[sortingOption] - e2[sortingOption];
        }
      });
    });
  }

  // @ts-ignore
  getCategory(category: string): IPosition[] {
    switch(true) {
      case category === ECategory.NEW:
        return this.newPositions;
      case category === ECategory.ACTIVE:
        return this.activePositions;
      case category === ECategory.NONACTIVE:
        return this.nonActivePositions;
    }
  }
  orderPositions(event: MatSelectChange) {
    const sortingOption = event.value;
    this.arraySorting([this.activePositions, this.nonActivePositions, this.newPositions], sortingOption);
  }

  openDialog(position: IPosition) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '320px';
    dialogConfig.data = position;

    const dialogRef = this.dialog.open(EditPositionComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => this.editPosition(data));
  }

  editPosition(position: IPosition) {
    const editedArray = (positionsList: IPosition[], position: IPosition): IPosition[] => {
      const positionIndex = positionsList.findIndex((pos, i) => pos.id === position.id);
      positionsList[positionIndex] = position;
      return positionsList;
    };
    switch (true) {
      case position.category === 1:
        this.newPositions = [...editedArray(this.newPositions, position)];
        break;
      case position.category === 2:
        this.activePositions = [...editedArray(this.activePositions, position)];
        break;
      case position.category === 3:
        this.nonActivePositions = [...editedArray(this.nonActivePositions, position)];
        break;
    }
    this.listService.savePositions([
      ...this.newPositions,
      ...this.activePositions,
      ...this.nonActivePositions
    ].sort((e1, e2) => e1.id - e2.id));
  }
}
