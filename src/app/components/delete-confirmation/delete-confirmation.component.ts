import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  template: `
    <div class="delete-confirmation">
      <div class="delete-confirmation__row">
        <mat-dialog-content>
          {{ data }}
        </mat-dialog-content>
      </div>
      <div class="delete-confirmation__row">
        <div>
          <button [mat-dialog-close]="'confirm'" class="
                  delete-confirmation__button
                  delete-confirmation__button--confirm">
            Confirm
          </button>
        </div>
        <div>
          <button [mat-dialog-close]="'cancel'" class="
          delete-confirmation__button
          delete-confirmation__button--cancel">
            Cancel
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {
  }
}
