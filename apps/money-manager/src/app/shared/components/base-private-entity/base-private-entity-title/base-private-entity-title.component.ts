import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'petar-cv-base-private-entity-title',
  template: `
    <h1 class="font-semibold text-2xl primary-color my-4 text-primary">
      {{ text | translate }}
    </h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasePrivateEntityTitleComponent {
  @Input()
  text!: string;
}
