import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'previous-button',
    template: './back.component.html',
})

export class BackButtonComponent implements OnInit {
    //@Input()color: string;

  constructor(private location: Location) { }
  goBack() {
    this.location.back();
  }
  ngOnInit(){}
}