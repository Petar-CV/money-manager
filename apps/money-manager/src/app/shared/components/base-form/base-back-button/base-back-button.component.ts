import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'petar-cv-base-back-button',
  template: `
    <div class="my-4 space-x-4">
      <p-button
        icon="pi pi-angle-left"
        (click)="goBack()"
        [label]="label | translate"
      ></p-button>

      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseBackButtonComponent {
  @Input()
  label = 'commonActions.goBack';

  public goBack(): void {
    window.history.back();
  }
}
