import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-inbox-screen',
    templateUrl: './inbox-screen.component.html',
    styleUrls: ['./inbox-screen.component.css'],
})
export class InboxScreenComponent {
    error$: Observable<boolean>;

    constructor(private readonly store: Store) {
        this.error$ = store.select((state) => state.taskbox.error);
    }
}
