import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

const modulesToExport = [ButtonModule, InputTextModule];

@NgModule({
  exports: [...modulesToExport],
})
export class PrimengModule {}
