import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';

const modulesToExport = [
  ButtonModule,
  InputTextModule,
  MenubarModule,
  TableModule,
];

@NgModule({
  exports: [...modulesToExport],
})
export class PrimengModule {}
