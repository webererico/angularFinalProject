import { Component } from '@angular/core';
import { MatListItem } from '@angular/material/list';

interface MenuItem {
  path: string;
  title: string;
}


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListItem],
  template: `
    @for(menuItem of menuList; track menuItem){
      <a mat-list-item [href]="menuItem.path">{{menuItem.title}}</a>
    }
  `,
  styles: ``
})
export class MenuComponent {
  menuList: MenuItem[] = [
    {
      title: 'Inicio',
      path: '/dashboard'
    },
    {
      title: 'Categorias',
      path: '/categories'
    },
  ]

}
