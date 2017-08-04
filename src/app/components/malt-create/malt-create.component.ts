import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Malt} from 'models';
import {MaltService} from 'services';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'bt-malt-create',
  templateUrl: './malt-create.component.html',
  styleUrls: [ './malt-create.component.css' ]
})

export class MaltCreateComponent {

  maltSubject: Subject<Malt> = new Subject<Malt>();
  malt: Malt = new Malt();

  constructor(private maltService: MaltService) {
  }

  getMaltObservable(): Observable<Malt> {
    return this.maltSubject.asObservable();
  }

  save() {
    this.malt.name = 'test4';
    this.malt.yield = 0.75;
    this.malt.ebc = 15.0;
    this.malt.grain = 'BARLEY';

    // Save malt
    this.maltService.create(this.malt).then(malt => {
      this.malt = malt;

      // Notify observers
      this.maltSubject.next(this.malt);
    });
  }
}
