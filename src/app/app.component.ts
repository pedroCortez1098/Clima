import {Component, OnInit} from '@angular/core';
import {SwUpdate} from "@angular/service-worker";
import {MatSnackBar} from "@angular/material/snack-bar";
import {filter, map, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Clima';

  constructor(private updates: SwUpdate, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.updates.available.pipe(
      switchMap(()=> this.snackbar.open('A new version is available!', 'Update now').afterDismissed()),
      filter(result => result.dismissedByAction),
      map(() => this.updates.activateUpdate().then(() => location.reload()))
    ).subscribe();
  }
}
