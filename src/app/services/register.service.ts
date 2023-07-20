import { Injectable } from '@angular/core';
import { INavData } from '@coreui/angular';
import { catchError, Observable, tap } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  public items$: INavData[];

  constructor(public user: UserService, private http: HttpClient) {
    let _level = this.user.getUserData()
    this.user.userLevel = _level ? _level.level : 4
    this.items$ = this.getSidebarItems(user.returnMenus())
  }

  private getSidebarItems(menus: any): INavData[] {
    return menus;
  }

  public getCEP(cep: any): Observable<any>
  {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`).pipe(
      tap(_ => console.warn(`fetched`)),
			catchError(this.user.handleError(`Registro do usuário`))
    )
  }

}
