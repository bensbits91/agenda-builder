import * as React from 'react';
import { DateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-controls-react/lib/dateTimePicker';


const mcc = 'color:magenta;';



export interface AsdfDateTimePickerProps {
    field: any;
    handler: any;
}

export interface AsdfDateTimePickerState {

}

class AsdfDateTimePicker extends React.Component<AsdfDateTimePickerProps, AsdfDateTimePickerState> {
    constructor(props: AsdfDateTimePickerProps) {
        super(props);
        this.state = {};
    }

    public _onChange(f, d) {
        console.log('%c : FieldDatePicker -> _onChange -> f', mcc, f);
        console.log('%c : FieldDatePicker -> _onChange -> d', mcc, d);
        this.props.handler(f, d);
    }

    public render() {
        const { field } = this.props;

        const val = field.value ? new Date(field.value) : null;


        return (
            <div>
                <DateTimePicker
                    label={field.Title}
                    placeholder='Please select a date'
                    onChange={d => { this._onChange(field, d); }}
                    showGoToToday={false}
                    value={val}
                />
            </div>
        );
    }
}

export default AsdfDateTimePicker;