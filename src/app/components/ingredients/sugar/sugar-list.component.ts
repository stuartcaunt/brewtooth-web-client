
import {merge as observableMerge, fromEvent as observableFromEvent, Observable, BehaviorSubject} from 'rxjs';

import {map, distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Sugar } from 'models';
import { SugarService } from 'services';
import {DataSource} from '@angular/cdk';
import {MatDialog} from '@angular/material/dialog';
import {SugarEditModalComponent} from 'components';
import {YesNoDialogComponent} from 'components';

@Component({
  selector: 'bt-sugar-list',
  templateUrl: './sugar-list.component.html',
  styleUrls: ['./sugar-list.component.scss']
})
export class SugarListComponent implements OnInit {
  displayedColumns = ['name', 'delete'];
  dataSource: SugarsDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor (private sugarService: SugarService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource = new SugarsDataSource(this.sugarService);
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

  openEditModal(sugar: Sugar): void {
    let dialogRef = this.dialog.open(SugarEditModalComponent);
    dialogRef.afterClosed().subscribe(returnedSugar => {
      if (returnedSugar != null) {
        this.dataSource.reloadData();
      }
    });

    if (sugar == null) {
      sugar = new Sugar();
    }
    dialogRef.componentInstance.sugar = sugar;
  }

  deleteSugarWithConfirm(sugar: Sugar): void {
    let dialogRef = this.dialog.open(YesNoDialogComponent);
    dialogRef.componentInstance.message = ('Are you sure you want to delete the sugar \"' + sugar.name + '\"');
    dialogRef.afterClosed().subscribe(doDelete => {
      if (doDelete) {
        this.deleteSugar(sugar);
      }
    });
  }

  deleteSugar(sugar: Sugar): void {
    this.sugarService.delete(sugar).then(() => {
      this.dataSource.reloadData();
    });
  }
}

export class SugarsDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  sugarsSubject: BehaviorSubject<Sugar[]> = new BehaviorSubject<Sugar[]>([]);
  sugars: Sugar[] = new Array<Sugar>();

  constructor(private sugarService: SugarService) {
    super();

    this.reloadData();
  }

  reloadData(): void {
    this.sugarService.getSugars().subscribe(sugars => {
      this.sugars = sugars;
      this.sugarsSubject.next(sugars);
    });
  }

  connect(): Observable<Sugar[]> {
    const displayDataChanges = [
      this.sugarsSubject,
      this._filterChange,
    ];

    return observableMerge(...displayDataChanges).pipe(map(() => {
      return this.sugars.slice().filter((sugar: Sugar) => {
        let searchStr = (sugar.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
    }));
  }

  disconnect() {}
}
