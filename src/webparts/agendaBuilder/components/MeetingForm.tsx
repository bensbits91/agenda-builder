import * as React from 'react';
import FieldText from './fields/FieldText';
import FieldDropDown from './fields/FieldDropDown';
import AsdfDateTimePicker from './fields/AsdfDateTimePicker';

import AgendaItemDroppable from './AgendaItemDroppable';

const mcc = 'background-color:pink;color:black;';


export interface MeetingFormProps {
    data: any;
    fields: any;
    handler: any;
}

export interface MeetingFormState {
    fields: any;
}

class MeetingForm extends React.Component<MeetingFormProps, MeetingFormState> {
    constructor(props: MeetingFormProps) {
        super(props);
        this.state = {
            fields: null
        };
    }

    public componentDidMount() {
        console.log('%c : MeetingForm -> componentDidMount -> this.props', mcc, this.props);
        const { data, fields } = this.props;
        const form_fields = fields ? fields.map(f => {
            const f_value = data ? data[f.InternalName] : null;
            console.log('%c : MeetingForm -> componentDidMount -> f_value', mcc, f_value);
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
        console.log('%c : MeetingForm -> componentDidMount -> form_fields', mcc, form_fields);
        this.setState({
            fields: form_fields
        });
    }

    public handler_fields(data) {
        console.log('%c : MeetingForm -> handler_fields -> data', mcc, data);
    }

    public handler_ai(data/* , aiid */) {
        console.log('%c MeetingForm -> handler_ai -> data', mcc, data);
        this.props.handler(data);
        // console.log('%c : MeetingForm -> handler_ai -> aiid', mcc, aiid);
        // this.props.handler({
        //     page: 'form',
        //     type: 'agendaItem',
        //     id: aiid,
        //     mode: 'edit'
        // });
    }



    public render() {

        const { data } = this.props;

        const { fields } = this.state;

        const el_form = fields ?
            fields.map(f => {
                const type = f.TypeAsString;
                const el_field =
                    type == 'Text' ?
                        <FieldText
                            field={f}
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


        const el_aiList = data ? <AgendaItemDroppable
            items={data.children}
            mtg_start_time={data.EventDate}
            handler={this.handler_ai.bind(this)}
        />
            : <></>;

        return (
            <div className='temp-formWrap'>
                {el_form}
                {el_aiList}
            </div>
        );
    }
}

export default MeetingForm;