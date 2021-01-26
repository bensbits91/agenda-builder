import * as React from 'react';


const mcc = 'color:hotpink;';


export interface AgendaMeetingInfoProps {
    data: any;
}

export interface AgendaMeetingInfoState {

}

class AgendaMeetingInfo extends React.Component<AgendaMeetingInfoProps, AgendaMeetingInfoState> {
    constructor(props: AgendaMeetingInfoProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : AgendaMeetingInfo -> componentDidMount -> this.props', mcc, this.props);
    }

    public render() {
        const { data } = this.props;
        const { location_data } = data;

        return (
            <>
                <div>{data.Title}</div>
                <div>{data.EventDate} to {data.EndDate}</div>
                <div>{location_data.Title}</div>
                <div dangerouslySetInnerHTML={{ __html: location_data.Address }} />
                <div>{location_data.City} {location_data.State}&nbsp;&nbsp;{location_data.ZIP}</div>
            </>
        );
    }
}

export default AgendaMeetingInfo;