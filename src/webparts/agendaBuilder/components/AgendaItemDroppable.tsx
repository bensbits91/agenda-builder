import * as React from 'react';
import * as moment from 'moment';

import AgendaItemDraggable from './AgendaItemDraggable';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// import type { DropResult } from 'react-beautiful-dnd/src/types';

import styles from './AgendaBuilder.module.scss';


const mcc = 'background-color:aqua;color:black;';


export interface AgendaItemDroppableProps {
    items: any;
    mtg_start_time: string;
    handler: any;
}

export interface AgendaItemDroppableState {
    items: any;
}


interface ContainerProps {
    innerRef: any;
}

class Container extends React.Component<ContainerProps> {
    public render() {
        return (
            <div
                {...this.props}
                ref={this.props.innerRef}
                className={styles.droppableContainer}
            >
                {this.props.children}
            </div>
        );
    }
}

class AgendaItemDroppable extends React.Component<AgendaItemDroppableProps, AgendaItemDroppableState> {
    constructor(props: AgendaItemDroppableProps) {
        super(props);
        this.state = {
            items: null
            // items: this.props.items
        };
    }

    public componentDidMount() {
        console.log('%c : AgendaItemDroppable -> componentDidMount -> this.props', mcc, this.props);
        const new_items = JSON.parse(JSON.stringify(this.props.items));
        this.calc_times(new_items);
    }

    public componentDidUpdate(prevProps: AgendaItemDroppableProps, prevState: AgendaItemDroppableState) {
        if (this.state !== prevState)
            console.log('%c : AgendaItemDroppable -> componentDidUpdate -> this.state', mcc, this.state);
        if (this.props !== prevProps)
            console.log('%c : AgendaItemDroppable -> componentDidUpdate -> this.props', mcc, this.props);
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

    public onDragEnd(result/* : DropResult */) {
        console.log('%c : onDragEnd -> result', mcc, result);
        const { source, destination, draggableId } = result;
        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const dragged_item = JSON.parse(JSON.stringify(this.state.items.filter(i => i.Id === parseInt(draggableId))[0]));
        console.log('%c : AgendaItemDroppable -> onDragEnd -> dragged_item', mcc, dragged_item);

        const new_items = JSON.parse(JSON.stringify(this.state.items));
        new_items.splice(source.index, 1);
        new_items.splice(destination.index, 0, dragged_item);
        console.log('%c : AgendaItemDroppable -> onDragEnd -> new_items', mcc, new_items);

        this.calc_times(new_items);
    }

    public handler_draggable(data) {
        console.log('%c : AgendaItemDroppable -> handler_draggable -> data', mcc, data);
        // copy state
        const new_items = JSON.parse(JSON.stringify(this.state.items));

        if (data.field) {

            // get item
            const this_item_id = parseInt(data.field.split('MinutesApproved')[1]);
            console.log('%c : AgendaItemDroppable -> handler_draggable -> this_item_id', mcc, this_item_id);

            const this_item = new_items.filter(ni => ni.Id === this_item_id)[0];
            console.log('%c : AgendaItemDroppable -> handler_draggable -> this_item', mcc, this_item);
            // update item's approved minutes
            this_item.MinutesApproved = data.value;
            console.log('%c : AgendaItemDroppable -> handler_draggable -> new_items', mcc, new_items);

            // calc times
            this.calc_times(new_items);
        }

        else if (data.page) {
            this.props.handler(data);
        }




        // this.props.handler(data);
    }

    public render() {
        const { items } = this.state;
        console.log('%c : AgendaItemDroppable -> render -> items', mcc, items);

        const el_dnd = items ?
            <div className='temp-aiDragDropWrap'>
                <h2>Agenda Items</h2>
                <DragDropContext onDragEnd={this.onDragEnd.bind(this)}>
                    <Droppable droppableId={'column-1'}>
                        {provided => (
                            <Container
                                innerRef={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {items.map((item, index) => {
                                    console.log('%c : AgendaItemDroppable -> render -> item', mcc, item);
                                    return (
                                        <AgendaItemDraggable
                                            item={item}
                                            index={index}
                                            // handler={this.handler_draggable.bind(this)}
                                            handler={this.handler_draggable.bind(this)}
                                        />
                                    );
                                })}
                                {provided.placeholder}
                            </Container>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            : <></>;

        return (
            el_dnd
        );
    }
}


export default AgendaItemDroppable;