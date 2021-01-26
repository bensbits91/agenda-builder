import * as React from 'react';
import * as moment from 'moment';


const mcc = 'background-color:white;color:black;';



export interface AgendaItemListItemProps {
    item: any;
}

export interface AgendaItemListItemState {

}

class AgendaItemListItem extends React.Component<AgendaItemListItemProps, AgendaItemListItemState> {
    constructor(props: AgendaItemListItemProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : AgendaItemListItem -> componentDidMount -> this.props', mcc, this.props);
    }

    public render() {
        const { item } = this.props;

        return (
            <div>
                <span className='temp-ai-start-time'>{moment(item.start_time).format('h:mm A')}</span>
                <span className='temp-ai-end-time'> - {moment(item.end_time).format('h:mm A')}</span>
                <span className='temp-ai-title'>{item.Title}</span>
            </div>
        );
    }
}

export default AgendaItemListItem;