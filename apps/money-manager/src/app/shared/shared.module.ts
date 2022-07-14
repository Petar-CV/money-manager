import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BaseComponentsModule } from './components/base-components.module';
import { SharedPipesModule } from './pipes/shared-pipes.module';
import { PrimengModule } from './primeng.module';

@NgModule({
  imports: [
    CommonModule,
    PrimengModule,
    BaseComponentsModule,
    SharedPipesModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    BaseComponentsModule,
    SharedPipesModule,
  ],
})
export class SharedModule {}
