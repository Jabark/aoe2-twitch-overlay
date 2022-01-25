import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { IMatch } from './models/match';
import { MatchService } from './services/match.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  match!: IMatch;
  private ngUnsubscribe = new Subject();

  constructor(
    private readonly matchService: MatchService,
  ){}

  ngOnInit() {
    setInterval(() => this.matchService.fetchMatch(), 5000);

    this.matchService.$getMatch()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((match) => {
        this.match = match;
      });
  }


  ngOnDestroy() {
    this.ngUnsubscribe.next(true);
    this.ngUnsubscribe.complete();
  }
}
