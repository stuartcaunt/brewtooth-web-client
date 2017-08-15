import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Malt} from 'models';
import {MaltService} from 'services';
import {DataSource} from '@angular/cdk';
import {Observable} from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MdDialog} from '@angular/material';
import {MaltEditModalComponent} from 'components';
import {YesNoDialogComponent} from '../dialogs/yes-no-dialog.component';

@Component({
  selector: 'bt-malt-list',
  templateUrl: './malt-list.component.html',
  styleUrls: [ './malt-list.component.scss']
})
export class MaltListComponent implements OnInit {
  displayedColumns = ['name', 'grain', 'yield', 'ebc', 'delete'];
  dataSource: MaltsDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor (private maltService: MaltService, public dialog: MdDialog) {
  }

  ngOnInit(): void {
    this.dataSource = new MaltsDataSource(this.maltService);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(100)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  openEditModal(malt: Malt): void {
    let dialogRef = this.dialog.open(MaltEditModalComponent);
    dialogRef.afterClosed().subscribe(returnedMalt => {
      if (returnedMalt != null) {
        this.dataSource.reloadData();
      }
    });

    if (malt == null) {
      malt = new Malt();
    }
    dialogRef.componentInstance.malt = malt;
  }

  deleteMaltWithConfirm(malt: Malt): void {
    let dialogRef = this.dialog.open(YesNoDialogComponent);
    dialogRef.componentInstance.message = ('Are you sure you want to delete the malt \"' + malt.name + '\"');
    dialogRef.afterClosed().subscribe(doDelete => {
      if (doDelete) {
        this.deleteMalt(malt);
      }
    });
  }

  deleteMalt(malt: Malt): void {
    this.maltService.delete(malt).then(() => {
      this.dataSource.reloadData();
    });
  }
}

export class MaltsDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  maltsSubject: BehaviorSubject<Malt[]> = new BehaviorSubject<Malt[]>([]);
  malts: Malt[] = new Array<Malt>();

  constructor(private maltService: MaltService) {
    super();

    this.reloadData();
  }

  reloadData(): void {
    this.maltService.getMalts().subscribe(malts => {
      this.malts = malts;
      this.maltsSubject.next(malts);
    });
  }

  connect(): Observable<Malt[]> {
    const displayDataChanges = [
      this.maltsSubject,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this.malts.slice().filter((malt: Malt) => {
        let searchStr = (malt.name + malt.grain).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
    });
  }

  disconnect() {}
}
