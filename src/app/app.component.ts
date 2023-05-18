import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // title = 'admin-angular';
  myClass = "sidebar";

  toggleSidebar(a:any){
    // if(this.myClass === "sidebar"){
    //   this.myClass = "sidebar close";
    // }

    // else{
      this.myClass = a;
    // }
    console.log(a,"111111111111");
    
  }

}
