import * as React from 'react';
import FieldText from './fields/FieldText';
import FieldDropDown from './fields/FieldDropDown';
import AsdfDateTimePicker from './fields/AsdfDateTimePicker';


const mcc = 'background-color:black;color:lime;';

// const empty_form = [
//     {
//         : ''
//     },
// ];

export interface AgendaItemFormProps {
    data: any;
    fields: any;
    handler: any;
}

export interface AgendaItemFormState {
    fields: any;
}

class AgendaItemForm extends React.Component<AgendaItemFormProps, AgendaItemFormState> {
    constructor(props: AgendaItemFormProps) {
        super(props);
        this.state = {
            fields: null
        };
    }

    public componentDidMount() {
        console.log('%c : AgendaItemForm -> componentDidMount -> this.props', mcc, this.props);
        const { data, fields } = this.props;
        const form_fields = fields ? fields.map(f => {
            const f_value = data ?
                f.InternalName == 'Meeting'
                    ? data['meeting_name']
                    : data[f.InternalName]
                : null;
            console.log('%c : AgendaItemForm -> componentDidMount -> f_value', mcc, f_value);
            // const choices = f.Choices ? f.Choices : null;
            const ff = {
                Title: f.Title,
                InternalName: f.InternalName,
                TypeAsString: f.TypeAsString,
                value: f_value
            };
            if (f.Choices) ff['Choices'] = f.Choices;
            return ff;
        }) : null;
        console.log('%c : AgendaItemForm -> componentDidMount -> form_fields', mcc, form_fields);
        this.setState({
            fields: form_fields
        });
    }

    public componentDidUpdate(prevProps: AgendaItemFormProps, prevState: AgendaItemFormState) {
        if (prevState !== this.state)
            console.log('%c : AgendaItemForm -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public handler_fields(data) {
        console.log('%c : AgendaItemForm -> handler_fields -> data', mcc, data);
    }

    public render() {
        const { data } = this.props;

        const { fields } = this.state;

        const el_form = fields ?
            fields.map(f => {
                const type = f.TypeAsString;
                // if (f.InternalName == 'Meeting') {
                //     f.value = data.meeting_name;
                // }
                const el_field =
                    type == 'Text' || type == 'Number' ?
                        <FieldText
                            field={f}
                            label={true}
                            handler={this.handler_fields.bind(this)}
                        />
                        : type == 'DateTime' && f.InternalName != 'EndDate' ? // temp'ly hiding end date to calc end time and stuff...
                            <AsdfDateTimePicker
                                field={f}
                                handler={this.handler_fields.bind(this)}
                            />
                            : type == 'Lookup' || type == 'Choice' ?
                                <FieldDropDown
                                    field={f}
                                    handler={this.handler_fields.bind(this)}
                                />
                                : <></>;
                return el_field;
            })
            : <></>;


        return (
            <div className='temp-formWrap'>
                {el_form}
            </div>
        );
    }
}

export default AgendaItemForm;