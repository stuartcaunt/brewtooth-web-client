
import {
  Observable,
  BehaviorSubject,
  fromEvent,
  merge
} from 'rxjs';

import {map, distinctUntilChanged, debounceTime} from 'rxjs/operators';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Hop } from 'models';
import { HopService } from 'services';
import {DataSource} from '@angular/cdk/table';
import {MatDialog} from '@angular/material/dialog';
import {YesNoDialogComponent} from 'components';
import {HopEditModalComponent} from 'components';

@Component({
  selector: 'bt-hop-list',
  templateUrl: './hop-list.component.html',
  styleUrls: ['./hop-list.component.scss']
})
export class HopListComponent implements OnInit {
  displayedColumns = ['name', 'alphaAcid', 'isPellet', 'delete'];
  dataSource: HopsDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor (private hopService: HopService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataSource = new HopsDataSource(this.hopService);
    fromEvent(this.filter.nativeElement, 'keyup').pipe(
      debounceTime(100),
      distinctUntilChanged())
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

  openEditModal(hop: Hop): void {
    let dialogRef = this.dialog.open(HopEditModalComponent);
    dialogRef.afterClosed().subscribe(returnedHop => {
      if (returnedHop != null) {
        this.dataSource.reloadData();
      }
    });

    if (hop == null) {
      hop = new Hop();
    }
    dialogRef.componentInstance.hop = hop;
  }

  deleteHopWithConfirm(hop: Hop): void {
    let dialogRef = this.dialog.open(YesNoDialogComponent);
    dialogRef.componentInstance.message = ('Are you sure you want to delete the hop \"' + hop.name + '\"');
    dialogRef.afterClosed().subscribe(doDelete => {
      if (doDelete) {
        this.deleteHop(hop);
      }
    });
  }

  deleteHop(hop: Hop): void {
    this.hopService.delete(hop).then(() => {
      this.dataSource.reloadData();
    });
  }
}

export class HopsDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  hopsSubject: BehaviorSubject<Hop[]> = new BehaviorSubject<Hop[]>([]);
  hops: Hop[] = new Array<Hop>();

  constructor(private hopService: HopService) {
    super();

    this.reloadData();
  }

  reloadData(): void {
    this.hopService.getHops().subscribe(hops => {
      this.hops = hops;
      this.hopsSubject.next(hops);
    });
  }

  connect(): Observable<Hop[]> {
    const displayDataChanges = [
      this.hopsSubject,
      this._filterChange,
    ];

    return merge(...displayDataChanges).pipe(map(() => {
      return this.hops.slice().filter((hop: Hop) => {
        let searchStr = (hop.name).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });
    }));
  }

  disconnect() {}
}
