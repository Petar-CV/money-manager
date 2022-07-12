import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';

const modulesToExport = [ButtonModule, InputTextModule, MenubarModule];

@NgModule({
  exports: [...modulesToExport],
})
export class PrimengModule {}
