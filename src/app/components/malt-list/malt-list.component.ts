import { Component, OnInit } from '@angular/core';
import { Malt } from 'models';
import { MaltService } from 'services';

@Component({
  selector: 'bt-malt-list',
  templateUrl: './malt-list.component.html',
  styleUrls: [ './malt-list.component.css' ]
})

export class MaltListComponent implements OnInit {

  malts: Malt[];

  constructor (private maltService: MaltService) {
  }

  getMalts(): void {
    this.maltService.getMalts()
      .then(malts => {
        this.malts = malts;
        console.log('got malts ' + malts);
      });
  }

  ngOnInit(): void {
    this.getMalts();
  }

}
