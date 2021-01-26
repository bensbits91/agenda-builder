import * as React from 'react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
// import { colors } from './definitions';
// import * as colors from './colors';

const mcc = 'background-color:navy;color:white;';


export interface FieldTextProps {
    field: any;
    handler: any;
    // dark: boolean;
    // theme: any;
    multiline?: boolean;
    rows?: number;
    // value: string;
    placeholder?: string;
    label?: boolean;
}

export interface FieldTextState {

}

class FieldText extends React.Component<FieldTextProps, FieldTextState> {
    constructor(props: FieldTextProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : FieldText -> componentDidMount -> this.props', mcc, this.props);
    }

    public _onChange(f, o) {
        this.props.handler(f.InternalName, o);
    }

    // private _onRenderLabel = (props/* : ITextFieldProps */)/* : JSX.Element */ => {
    //     return (
    //         <span style={{ color: colors.gray.c }}>{props.label}</span>
    //     );
    // }

    public render() {
        const { field, placeholder, label } = this.props;
        const placeholder_toShow = placeholder || 'Please enter text here';

        // const {label} = field;
        const theLabel = !!label ? field.Title : false;

        return (
            <div>
                <TextField
                    id={field.InternalName}
                    label={theLabel}
                    placeholder={placeholder_toShow}

                    defaultValue={field.value}
                    // defaultValue={this.props.value}

                    multiline={this.props.multiline ? this.props.multiline : false}
                    rows={this.props.multiline && this.props.rows ? this.props.rows : 1}
                    // styles={{ label: { color: dark ? colors.gray_c : 'unset' } }}
                    // onRenderLabel={this._onRenderLabel}
                    // onChange={(e, o) => this._onChange(e, o)}
                    onChange={(e, t) => this._onChange(field, t)}

                />

            </div>
        );
    }
}

export default FieldText;