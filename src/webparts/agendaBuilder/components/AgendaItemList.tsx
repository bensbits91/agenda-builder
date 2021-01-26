import * as React from 'react';
import * as moment from 'moment';
import AgendaItemListItem from './AgendaItemListItem';

const mcc = 'background-color:hotpink;';


export interface AgendaItemListProps {
    items: any;
    mtg_start_time: string;
}

export interface AgendaItemListState {
    items: any;
}

class AgendaItemList extends React.Component<AgendaItemListProps, AgendaItemListState> {
    constructor(props: AgendaItemListProps) {
        super(props);
        this.state = {
            items: null
        };
    }

    public componentDidMount() {
        console.log('%c : AgendaItemList -> componentDidMount -> this.props', mcc, this.props);
        const new_items = JSON.parse(JSON.stringify(this.props.items));
        this.calc_times(new_items);
    }

    public calc_times(new_items) {
        const { mtg_start_time } = this.props;
        let prev_ai_end_time = mtg_start_time;


        const ais_w_times = new_items.map(ni => {
            const ni_start_time = moment(prev_ai_end_time);
            const min_to_add = ni.MinutesApproved;
            const ni_end_time = moment(prev_ai_end_time).add(min_to_add, 'm');
            ni['start_time'] = ni_start_time.toISOString();
            ni['end_time'] = ni_end_time.toISOString();
            console.log('%c : AgendaItemDroppable -> onDragEnd -> ni', mcc, ni);
            prev_ai_end_time = ni_end_time.toISOString();
            return ni;
        });
        Promise.all(ais_w_times).then(awt => {
            this.setState({
                items: awt
            });
        });
    }

    public render() {
        const { items } = this.state;

        const aiList = items ? items.map(ai => {
            return (
                <AgendaItemListItem
                    item={ai}
                />
            );
        })
            : <></>;


        return (
            <>
                {aiList}
            </>
        );
    }
}

export default AgendaItemList;