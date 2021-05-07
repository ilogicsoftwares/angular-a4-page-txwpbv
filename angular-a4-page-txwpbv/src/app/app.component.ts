import { Component, OnInit, VERSION } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  elements = ['header', 'body', 'footer', 'text'];
  date=new Date().toLocaleDateString();
  items=[];
  onBtnAddElement(el: string): void {
    this.elements = [...this.elements, el];
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    for (let index = 0; index < 100; index++) {
     this.items.push(index);
      
    }
  }
}
