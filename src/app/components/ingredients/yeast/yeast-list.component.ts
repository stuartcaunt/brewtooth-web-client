
import {merge as observableMerge, fromEvent as observableFromEvent, Observable, BehaviorSubject} from 'rxjs';

import {map, distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Yeast } from 'models';
import { YeastService } from 'services';
import {DataSource} from '@angular/cdk';
import {MatDialog} from '@angular/material/dialog';
import {YeastEditModalComponent} from 'components';
import {YesNoDialogComponent} from 'components';

@Component({
  selector: 'bt-yeast-list',
  templateUrl: './yeast-list.component.html',
  styleUrls: [ './yeast-list.component.scss']
})
export class YeastListComponent implements OnInit {
  displayedColumns = ['manufacturer', 'name', 'attenuation', 'delete'];
  dataSource: YeastsDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor (private yeastService: YeastService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource = new YeastsDataSource(this.yeastService);
    observableFromEvent(this.filter.nativeElement, 'keyup').pipe(
      debounceTime(100),
      distinctUntilChanged(),)
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  openEditModal(yeast: Yeast): void {
    let dialogRef = this.dialog.open(YeastEditModalComponent);
    dialogRef.afterClosed().subscribe(returnedYeast => {
      if (returnedYeast != null) {
        this.dataSource.reloadData();
      }
    });

    if (yeast == null) {
      yeast = new Yeast();
    }
    dialogRef.componentInstance.yeast = yeast;
  }

  deleteYeastWithConfirm(yeast: Yeast): void {
    let dialogRef = this.dialog.open(YesNoDialogComponent);
    dialogRef.componentInstance.message = ('Are you sure you want to delete the yeast \"' + yeast.name + '\"');
    dialogRef.afterClosed().subscribe(doDelete => {
      if (doDelete) {
        this.deleteYeast(yeast);
      }
    });
  }

  deleteYeast(yeast: Yeast): void {
    this.yeastService.delete(yeast).then(() => {
      this.dataSource.reloadData();
    });
  }
}

export class YeastsDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  yeastsSubject: BehaviorSubject<Yeast[]> = new BehaviorSubject<Yeast[]>([]);
  yeasts: Yeast[] = new Array<Yeast>();

  constructor(private yeastService: YeastService) {
    super();

    this.reloadData();
  }

  reloadData(): void {
    this.yeastService.getYeasts().subscribe(yeasts => {
      this.yeasts = yeasts;
      this.yeastsSubject.next(yeasts);
    });
  }

  connect(): Observable<Yeast[]> {
    const displayDataChanges = [
      this.yeastsSubject,
      this._filterChange,
    ];

    return observableMerge(...displayDataChanges).pipe(map(() => {
      return this.yeasts.slice().filter((yeast: Yeast) => {
        let searchStr = (yeast.name + yeast.manufacturer).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
    }));
  }

  disconnect() {}
}
