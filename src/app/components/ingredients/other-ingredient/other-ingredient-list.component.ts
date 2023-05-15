import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { OtherIngredient } from 'models';
import { OtherIngredientService } from 'services';
import {Observable, BehaviorSubject, fromEvent, merge} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {OtherIngredientEditModalComponent} from 'components';
import {YesNoDialogComponent} from 'components';
import {DataSource} from '@angular/cdk/table';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'bt-other-ingredient-list',
  templateUrl: './other-ingredient-list.component.html',
  styleUrls: ['./other-ingredient-list.component.scss']
})
export class OtherIngredientListComponent implements OnInit {
  displayedColumns = ['name', 'delete'];
  dataSource: OtherIngredientsDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor (private otherIngredientService: OtherIngredientService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource = new OtherIngredientsDataSource(this.otherIngredientService);
    fromEvent(this.filter.nativeElement, 'keyup').pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  openEditModal(otherIngredient: OtherIngredient): void {
    let dialogRef = this.dialog.open(OtherIngredientEditModalComponent);
    dialogRef.afterClosed().subscribe(returnedOtherIngredient => {
      if (returnedOtherIngredient != null) {
        this.dataSource.reloadData();
      }
    });

    if (otherIngredient == null) {
      otherIngredient = new OtherIngredient();
    }
    dialogRef.componentInstance.otherIngredient = otherIngredient;
  }

  deleteOtherIngredientWithConfirm(otherIngredient: OtherIngredient): void {
    let dialogRef = this.dialog.open(YesNoDialogComponent);
    dialogRef.componentInstance.message = ('Are you sure you want to delete the otherIngredient \"' + otherIngredient.name + '\"');
    dialogRef.afterClosed().subscribe(doDelete => {
      if (doDelete) {
        this.deleteOtherIngredient(otherIngredient);
      }
    });
  }

  deleteOtherIngredient(otherIngredient: OtherIngredient): void {
    this.otherIngredientService.delete(otherIngredient).subscribe(() => {
      this.dataSource.reloadData();
    });
  }
}

export class OtherIngredientsDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  otherIngredientsSubject: BehaviorSubject<OtherIngredient[]> = new BehaviorSubject<OtherIngredient[]>([]);
  otherIngredients: OtherIngredient[] = new Array<OtherIngredient>();

  constructor(private otherIngredientService: OtherIngredientService) {
    super();

    this.reloadData();
  }

  reloadData(): void {
    this.otherIngredientService.getOtherIngredients().subscribe(otherIngredients => {
      this.otherIngredients = otherIngredients;
      this.otherIngredientsSubject.next(otherIngredients);
    });
  }

  connect(): Observable<OtherIngredient[]> {
    const displayDataChanges = [
      this.otherIngredientsSubject,
      this._filterChange,
    ];

    return merge(...displayDataChanges).pipe(
      map(() => {
      return this.otherIngredients.slice().filter((otherIngredient: OtherIngredient) => {
        let searchStr = (otherIngredient.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
    }));
  }

  disconnect() {
  }
}
