import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatestAll, firstValueFrom, map, mergeMap, Observable } from 'rxjs';

import { civilisation, colour, IMatch, IPlayer, ITeam } from '../models/match';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  url = 'https://aoe2.net/api/nightbot/';
  profile_id = 'profile_id=1131924';
  matchUrl = `${this.url}match?${this.profile_id}&flag=true`;
  private readonly _match: BehaviorSubject<IMatch> = new BehaviorSubject<IMatch>({} as any);

  constructor(private readonly http: HttpClient) {}

  $getMatch(): Observable<IMatch> {
    return this._match.asObservable();
  }

  fetchMatch(): void {
    this.$fetchMatch().subscribe((match: any) => {
      this._match.next(match);
    });
  }

  private $fetchMatch(): Observable<any> {
    let matchData: IMatch;

    return this.http.get(this.matchUrl, { responseType: 'text' }).pipe(
      mergeMap((data: any) => {
        const $ELOs: Observable<any>[] = [];
        const split = data.split(' playing on ');
        let index = -1;

        matchData = {
          map: split[1],
          teams: split[0].split(' -VS- ').map((teamData: string) => {
            return {
              players: teamData.split(' + ').map((playerData) => {
                console.warn(playerData.split(''));
                const nameCiv = playerData.substring(6, playerData.length).split(' as ');

                $ELOs.push(this.fetchELO(nameCiv[0], teamData.includes(' + ')));
                index += 1;

                return {
                  colour: this.getColour(playerData.substring(0, 2)),
                  name: nameCiv[0],
                  nationality: playerData.substring(2, 6),
                  civ: nameCiv[1],
                  ELO: index,
                };
              })
            }
          }),
        };

        return $ELOs;
      }),
      combineLatestAll(),
      map((data: any) => {
        matchData.teams.map((team) => {
          return team.players.map((player) => {
            player.ELO = data[player.ELO];
          });
        });

        return matchData;
      }),
    );
  }

  private fetchELO(searchString: string, isTeam: boolean): Observable<number> {
    return this.http.get(`${this.url}/rank?search=${searchString}&leaderboard_id=${isTeam ? '4' : '3'}`, { responseType: 'text' }).pipe(
      map((value) => {
        const ELO = value.match(/\(([^)]+)\)/);

        if (ELO?.length) {
          console.warn(ELO);
          return parseInt(ELO[1], 10);
        }
        return 0;
      })
    );
  }

  private getColour(icon: string): colour {
    switch (icon) {
      case '🔵':
        return colour.BLUE;
      case '🔴':
        return colour.RED;
      case '🟢':
        return colour.GREEN;
      case '🟡':
        return colour.YELLOW;
      case '🌐':
        return colour.CYAN;
      case '🟣':
        return colour.PURPLE;
      case '🟠':
        return colour.ORANGE;
      default:
        return colour.GREY;
    }
  }
}
