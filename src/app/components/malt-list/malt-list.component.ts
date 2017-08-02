import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Malt } from 'models';
import { MaltService } from 'services';
import {DataSource} from '@angular/cdk';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'bt-malt-list',
  templateUrl: './malt-list.component.html',
  styleUrls: [ './malt-list.component.css' ]
})

export class MaltListComponent implements OnInit {
  displayedColumns = ['maltName', 'grain', 'yield', 'ebc'];

  dataSource: MaltsDataSource | null;

  constructor (private maltService: MaltService) {
  }

  ngOnInit(): void {
    this.dataSource = new MaltsDataSource(this.maltService);

    // this.dataSource.maltBehaviourSubject.subscribe((malts) => {
    //   console.log(malts.length);
    // });
  }

}

export class MaltsDataSource extends DataSource<any> {
  // maltBehaviourSubject: BehaviorSubject<Malt[]> = new BehaviorSubject<Malt[]>([]);

  constructor(private maltService: MaltService) {
    super();

    // this.initialiseData();
  }

  // initialiseData(): void {
  //   this.maltService.getMalts().then(malts => {
  //     this.maltBehaviourSubject.next(malts);
  //   });
  // }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Malt[]> {
    return this.maltService.getMalts();
    // return this.maltBehaviourSubject;
  }

  disconnect() {}
}
