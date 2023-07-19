import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { User } from 'src/app/models/user'
@Injectable({
  providedIn: 'root'
})

export class UserService {

  public isRegistered: boolean = true;
  public user: any;
  public result!: Observable<any>;
  public userLevel: number = 0;
  public hiddenMenu: any[] = []
  public menus: any = [];

  constructor() {}

  public returnMenus()
  {
    this.menus = [
      {
        name: 'Empresa',
        title: true,
        attributes: this.checkUserLevel('user', this.userLevel)
      },
      {
        name: 'Config. da empresa',
        url: '/base',
        attributes: this.checkUserLevel('user', this.userLevel),
        iconComponent: { name: 'cil-building' },
        children: [
          {
            name: 'Minha Empresa',
            url: '/base/accordion',
            attributes: this.checkUserLevel('user', this.userLevel)
          },
          {
            name: 'Benefícios',
            url: '/base/breadcrumbs',
            attributes: this.checkUserLevel('admin', this.userLevel)
          },
          {
            name: 'Cargos',
            url: '/base/cards',
            attributes: this.checkUserLevel('admin', this.userLevel)
          },
          {
            name: 'Filiais',
            url: '/base/carousel',
            attributes: this.checkUserLevel('admin', this.userLevel)
          }
        ]
      },
      {
        name: 'Usuários',
        title: true,
        attributes: this.checkUserLevel('admin', this.userLevel)
      },
      {
        name: 'Meu perfil',
        url: '/charts',
        iconComponent: { name: 'cil-user' },
        attributes: this.checkUserLevel('admin', this.userLevel)
      },
      {
        name: 'Todos os usuários',
        url: '/charts',
        iconComponent: { name: 'cil-group' },
        attributes: this.checkUserLevel('admin', this.userLevel)
      },
    ];
    return this.menus
  }

  private checkUserLevel(menu: string, level: number)
  {
    if (!this.isRegistered) return { hidden: true };
    switch(menu)
    {
      case 'admin': return (level == 3 ? null : { hidden: true } );
      case 'user': return (level == 4 ? null : { hidden: true } )
      break;
    }
    return { hidden: true }
  }

  public addUser(usr: User) //: Observable<User>
  {
    this.user = usr;
    this.user.level = (this.user.cnpj ? 3 : 4);
    this.userLevel = this.user.level;
    /* return this.result = this.user.pipe(
			tap(_ => console.warn(`fetched`)),
			catchError(this.handleError(`Registro do usuário`))
		); */ 
    return new Promise( (resolve,reject) => {
      localStorage.setItem('user', JSON.stringify(this.user))
      resolve(this.user)
    })
  }

  public getUserName()
  {
    let _name = localStorage.getItem('user')
    if(_name)
    { 
      let _rname = JSON.parse(_name)
      return _rname.name.split(' ')[0]
    }
  }

  public handleError<T>(operation = 'operation', result?: T) 
	{
		return async (error: any): Promise<Observable<T>> => {
		  console.error(error); 
		  return of(result as T);
		};
	}
   

}
