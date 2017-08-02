import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Malt } from 'models';
import { MaltService } from 'services';
import {DataSource} from '@angular/cdk';
import {Observable} from 'rxjs/Rx';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'bt-malt-list',
  templateUrl: './malt-list.component.html',
  styleUrls: [ './malt-list.component.css' ]
})

export class MaltListComponent implements OnInit {
  displayedColumns = ['maltName', 'grain', 'yield', 'ebc'];
  dataSource: MaltsDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  constructor (private maltService: MaltService) {
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

}

export class MaltsDataSource extends DataSource<any> {
  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  maltsObservable: Observable<Malt[]>;
  malts: Malt[] = [];

  constructor(private maltService: MaltService) {
    super();

    this.maltsObservable = this.maltService.getMalts();
    this.maltsObservable.subscribe(malts => this.malts = malts);
  }

  connect(): Observable<Malt[]> {
    const displayDataChanges = [
      this.maltsObservable,
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
