import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Category } from '../../data/Category';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  categories: Category[] = Object.values(Category);

  ViewFullCategories(){
    //TODO add scrolling
    //TODO fix spacing when values dont fit
    //TODO fix padding between count and name
  }
}
