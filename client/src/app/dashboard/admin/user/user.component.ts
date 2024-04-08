import {AsyncPipe, NgIf} from "@angular/common";
import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {UserDTO} from "../admin.contracts";

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [
        MatCardContent,
        MatCard,
        MatCardActions,
        NgIf,
        MatButton,    ],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css'
})
export class UserComponent {

    @Input() user: UserDTO = {} as UserDTO;
    @Input() disableUser: ((signedURL: string) => void) = () => {};
    @Input() enableUser: ((signedURL: string) => void) = () => {};
}
