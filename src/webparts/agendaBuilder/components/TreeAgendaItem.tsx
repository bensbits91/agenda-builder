import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import TreeAgendaItemMenu from './TreeAgendaItemMenu';

const mcc = 'background-color:yellow;color:black;';
// let handler_bind: any;

export interface TreeAgendaItemProps {
    id: string;
    // name: string;
    title: string;
    handler: any;
}

export interface TreeAgendaItemState {

}

class TreeAgendaItem extends React.Component<TreeAgendaItemProps, TreeAgendaItemState> {
    constructor(props: TreeAgendaItemProps) {
        super(props);
        this.state = {};
        // handler_bind = this.props.handler.bind(this);
    }

    public componentDidMount() {
        console.log('%c : TreeAgendaItem -> componentDidMount -> this.props', mcc, this.props);
    }

    public onClick_ai() {
        this.props.handler(this.props.id);
    }

    public handler_menu(data) {
        console.log('%c : TreeAgendaItem -> handler_menu -> data', mcc, data);

    }

    public render() {
        return (
            <div
                className='temp-treeAgendaItemWrap'
                onClick={this.onClick_ai.bind(this)}
            >
                <Stack horizontal>
                    <div>
                        Agenda Item - {this.props.title}
                    </div>
                    <div>
                        <TreeAgendaItemMenu
                            handler={this.handler_menu.bind(this)}
                        />
                    </div>
                </Stack>

            </div>
        );
    }
}

export default TreeAgendaItem;