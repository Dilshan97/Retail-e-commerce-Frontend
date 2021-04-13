import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  item_count;

  constructor() { }

  ngOnInit() {
    this.item_count = JSON.parse(localStorage.getItem('cart'));

    console.log(this.item_count.length);
    
  }

}
