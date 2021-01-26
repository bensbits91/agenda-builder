import * as React from 'react';
import * as moment from 'moment';
import { Draggable } from 'react-beautiful-dnd';
import FieldText from './fields/FieldText';
import TreeAgendaItemMenu from './TreeAgendaItemMenu';
import styles from './AgendaBuilder.module.scss';

const mcc = 'background-color:orange;color:black;';

export interface AgendaItemDraggableProps {
    item: any;
    index: number;
    handler: any;
}

export interface AgendaItemDraggableState {

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
                className={styles.draggableContainer}
            >
                {this.props.children}
            </div>
        );
    }
}

class AgendaItemDraggable extends React.Component<AgendaItemDraggableProps, AgendaItemDraggableState> {
    constructor(props: AgendaItemDraggableProps) {
        super(props);
        this.state = {};
    }

    public handler_menu(buttonId) {
        console.log('%c : AgendaItemDraggable -> handler_menu -> buttonId', mcc, buttonId);
        // this.props.handler(buttonId, this.props.item.Id);
        if (buttonId == 'editAgendaItem') {
            this.props.handler({
                page: 'form',
                type: 'agendaItem',
                id: this.props.item.Id,
                mode: 'edit'
            });
        }
    }

    public handler_fields(field, value) {
        console.log('%c : AgendaItemDraggable -> handler_fields -> field', mcc, field);
        console.log('%c : AgendaItemDraggable -> handler_fields -> value', mcc, value);
        this.props.handler({
            field: field,
            value: value
        });
    }

    public render() {
        const { item, index } = this.props;
        console.log('%c : AgendaItemDraggable -> render -> index', mcc, index);
        console.log('%c : AgendaItemDraggable -> render -> item', mcc, item);

        return (
            <Draggable
                key={item.Id + ''}
                draggableId={item.Id + ''}
                index={index}
            >
                {provided => (
                    <Container
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        <span className='temp-ai-start-time'>{moment(item.start_time).format('h:mm A')}</span>
                        <span className='temp-ai-end-time'> - {moment(item.end_time).format('h:mm A')}</span>
                        <span className='temp-ai-title'>{item.Title}</span>
                        <span className={styles.aiApprovedTime}>
                            <span className='temp-ai-field-label'>Approved time: </span>
                            <span className={styles.aiFieldValue}>
                                <FieldText
                                    field={{
                                        InternalName: 'MinutesApproved' + item.Id,
                                        Title: 'Approved Time',
                                        TypeAsText: 'Text',
                                        label: false,
                                        value: item.MinutesApproved
                                    }}
                                    handler={this.handler_fields.bind(this)}
                                />
                            </span>
                            <span className='temp-ai-field-label'> minutes</span>
                        </span>
                        <span className={styles.aiMenu}>
                            <TreeAgendaItemMenu
                                handler={this.handler_menu.bind(this)}
                            // handler={this.props.handler}
                            />
                        </span>
                    </Container>
                )}
            </Draggable>
        );
    }
}

export default AgendaItemDraggable;