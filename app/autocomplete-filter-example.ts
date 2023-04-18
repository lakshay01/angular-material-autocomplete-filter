import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'autocomplete-filter-example',
  templateUrl: 'autocomplete-filter-example.html',
  styleUrls: ['autocomplete-filter-example.css'],
})
export class AutocompleteFilterExample {
  myControl: FormControl = new FormControl();

  options = ['One', 'Two', 'Three'];

  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.myControl = new FormControl('', {
      validators: [
        this.autocompleteStringValidator(this.options),
        Validators.required,
      ],
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((val) => this.filter(val))
    );
  }

  autocompleteStringValidator(validOptions: Array<string>): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (validOptions.indexOf(control.value) !== -1) {
        return null; /* valid option selected */
      }
      return { invalidAutocompleteString: { value: control.value } };
    };
  }

  filter(val: string): string[] {
    return this.options.filter(
      (option) => option.toLowerCase().indexOf(val.toLowerCase()) === 0
    );
  }

  validation_msgs = {
    nameLabelAutocompleteControl: [
      {
        type: 'invalidAutocompleteString',
        message: 'name not recognized. Click one of the autocomplete options.',
      },
      { type: 'required', message: 'label is required.' },
    ],
  };
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
