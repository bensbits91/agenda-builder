import * as React from 'react';
import * as moment from 'moment';
import AgendaHeader from './AgendaHeader';
import AgendaMeetingInfo from './AgendaMeetingInfo';
import AgendaItemList from './AgendaItemList';

const mcc = 'background-color:green;';


export interface AgeandaProps {
    data: any;
}

export interface AgeandaState {

}

class Agenda extends React.Component<AgeandaProps, AgeandaState> {
    constructor(props: AgeandaProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : Agenda -> componentDidMount -> this.props', mcc, this.props);
    }


    public render() {

        const { data } = this.props;

        const mtgInfo = {
            Id: data.Id,
            Title: data.Title,
            EndDate: moment(data.EndDate).format('dddd, MMMM Do YYYY, h:mm a'),
            EventDate: moment(data.EventDate).format('dddd, MMMM Do YYYY, h:mm a'),
            location_data: data.location_data
        };

        const aiList = data.children ?
            <AgendaItemList
                items={data.children}
                mtg_start_time={data.EventDate}
            />
            : <></>;

        return (
            <>
                <AgendaHeader />
                <AgendaMeetingInfo
                    data={mtgInfo}
                />
                {aiList}
            </>
        );
    }
}

export default Agenda;