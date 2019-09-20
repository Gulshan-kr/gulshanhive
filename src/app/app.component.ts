import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
loadedfeature='recipe';
  onNavigate(feature: string){
    this.loadedfeature= feature;
  }

  ngOnInit(){
    firebase.initializeApp(
      {apiKey: "AIzaSyD704uaWSxCAIWdEIx6GRuTVp3mbhyNK10",
      authDomain: "innotical-guls-recipe.firebaseapp.com",}
    );
  }
}
