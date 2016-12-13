import {
    Component, OnInit, Input, Output, EventEmitter, forwardRef,
    AfterContentInit, OnChanges, ElementRef, ViewChild, SimpleChange,
    Renderer
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor,
    FormGroup, FormControl, NgControl
} from '@angular/forms';

import * as moment from 'moment';

import { languare } from '../globals';
moment.locale(languare);

const noop = () => { };
type StringOrNull = string | null;

const DATE_PICKER_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerDropDownComponent),
    multi: true
};

const DATE_PICKER_CONTROL_VALIDATORS: any = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DatePickerDropDownComponent),
    multi: true
};

// Input value: DateTime in JSON format
@Component({
    selector: 'datepicker-dropdown',
    template: `
    <div class="container-fluid" >
        <div class="row">
            <input #input type="text" [attr.class]="inputCss" [(ngModel)]="model" (blur)="_handleBlur($event)" (forcus)="_handleFocus($event)" />
        </div>
        <div class="row" style="display:inline-block;" *ngIf="showing" (click)="_calendarClick()" >
            <datepicker [(ngModel)]="bindValue" (selectionDone)="_handleChange($event)" ></datepicker>
        </div>
    </div>
    `,
    providers: [DATE_PICKER_CONTROL_VALUE_ACCESSOR, DATE_PICKER_CONTROL_VALIDATORS],
    styles: [],
    host: { '(click)': 'focus()' }
})
/* tslint:enable:component-selector-name component-selector-type */
export class DatePickerDropDownComponent implements ControlValueAccessor, AfterContentInit, OnChanges {
    private _value: Date | null = null;
    private showing: boolean = false;
    private _model: StringOrNull = null;

    private languare = languare;
    @Input() required: boolean;
    @Input() control: NgControl;
    @Input() format: string = "L";
    @Input() inputCss = "form-control";
    @ViewChild('input') _inputElement: ElementRef;
    private validate = (c: FormControl): any => {
        if (c instanceof FormControl) {
            let required_result = { required: { valid: false } };
            if (this.required && (!this._value || !this.model)) {
                return required_result;
            }
        }
        return null;
    }
    private validator(c: FormGroup) {
        let result;
        let control_names = Object.keys(c);
        let controls = control_names.map(name => c[name]);

        if (!controls.every(control => {
            result = this.validator(control);
            if (result) {
                return false;
            }
            return true;
        })) {
            return result;;
        }
        return null;
    }
    get model(): StringOrNull {
        return this._model;
    }
    set model(value: StringOrNull) {
        this._model = value;
        let new_date: Date | null = null;
        let is_new_value: boolean = false;
        var json_date: string | null = null;
        if (value) {
            var mm_new_date = moment(this.model, this.format);
            new_date = mm_new_date.toDate();
            if (new_date.getTime() && (!this._value || new_date.getTime() != this._value.getTime()) ) {
                this._value = new_date;
                json_date = mm_new_date.toISOString(); 
                is_new_value = true;
            }
        } else {
            if (this._value != null) {
                this._value = null;
                is_new_value = true;
            }
        }

        if (is_new_value) {
            this._changeEmitter.emit(json_date);
            this._onChangeCallback(new_date);
        }
    }
    get bindValue(): any {
        if (this._value) {
            return this._value;
        }
        return null;
    }

    @Input() set bindValue(v: any) {
        var new_date: Date | null = null;
        if (typeof v === "string" && v) {
            new_date = moment(v as string).toDate();
        } else if (v instanceof Date) {
            new_date = v;
        }

        if (new_date instanceof Date 
                && (!this._value || new_date.getTime() != this._value.getTime())) {
            this._value = new_date;
            let mm_current_date = moment(this._model).toDate();
            if(mm_current_date != new_date){
                this.model = moment(new_date).format(this.format);
            }
            var json_date: string | null = null;
            if (this._value) { json_date = mm_current_date.toISOString(); }
            this._changeEmitter.emit(json_date);
            this._onChangeCallback(this._value);
        }
    }
    //The internal data model
    private _focused: boolean = false;
    /** Callback registered via registerOnTouched (ControlValueAccessor) */
    private _onTouchedCallback: () => void = noop;
    /** Callback registered via registerOnChange (ControlValueAccessor) */
    private _onChangeCallback: (_: Date) => void = noop;

    /** Readonly properties. */
    get focused() { return this._focused; }

    private _blurEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _focusEmitter: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    private _changeEmitter: EventEmitter<string> = new EventEmitter<string>();

    @Output('blur')
    get onBlur(): Observable<FocusEvent> {
        return this._blurEmitter.asObservable();
    }

    @Output('focus')
    get onFocus(): Observable<FocusEvent> {
        return this._focusEmitter.asObservable();
    }
    @Output("change")
    get onChange(): Observable<string> {
        return this._changeEmitter.asObservable();
    }

    /** Set focus on input */
    focus() {
        this._renderer.invokeElementMethod(this._inputElement.nativeElement, 'focus');
        this.showing = true;
    }

    /**
    * Implemented as part of ControlValueAccessor.
    * TODO: internal
    */
    registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    /**
     * Implemented as part of ControlValueAccessor.
     * TODO: internal
     */
    registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }
    private _hideCalendarTimeoutHandler: number | null = null;
    private _delayHideCalendar() {
        this.showing = false;
        this._onTouchedCallback();
    }
    private _calendarClick() {
        if (this._hideCalendarTimeoutHandler) {
            clearTimeout(this._hideCalendarTimeoutHandler);
            this._hideCalendarTimeoutHandler = null;
        }
    }

    private _handleFocus(event: FocusEvent) {
        this._focused = true;
        this._focusEmitter.emit(event);
    }

    private _handleBlur(event: FocusEvent) {
        this._focused = false;
        this._blurEmitter.emit(event);
        this._hideCalendarTimeoutHandler = setTimeout(this._delayHideCalendar.bind(this), 200);
    }
   
    private _handleChange(newValue: Date) {
        if(!this._value || this._value.getTime() != newValue.getTime()){
            this._value = newValue;
            let mm_current_date = moment(newValue); 
            this.model =mm_current_date.format(this.format);
            var json_date: string | null = null;
            if (this._value) {
                json_date = mm_current_date.toISOString();
            }
            this._changeEmitter.emit(json_date);
            this._onChangeCallback(this._value);
            this._onTouchedCallback();
            this.showing = false;
        }
    }
    /**
   * Implemented as part of ControlValueAccessor.
   * System bind data from model [ngModel]
   */
    writeValue(inputValue: any) {
        var new_value: Date | null = null;
        if (typeof inputValue === "string" && inputValue) {
            new_value = moment(inputValue as string).toDate();
        } else if (inputValue instanceof Date) {
            new_value = inputValue;
        }
        if (new_value != this._value) {
            this.model = moment(new_value).format(this.format);
            this._value = new_value;
        }
    }


    /** TODO: internal */
    ngAfterContentInit() {
        // this._validateConstraints();
    }

    /** TODO: internal */
    ngOnChanges(changes: { [key: string]: SimpleChange }) {
        // this._validateConstraints();
    }
    constructor(private _renderer: Renderer) {

    }

}