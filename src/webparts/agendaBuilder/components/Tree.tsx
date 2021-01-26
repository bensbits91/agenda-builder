import * as React from 'react';
import { Treebeard } from 'react-treebeard';
import decorators from 'react-treebeard/dist/components/Decorators';
import defaultTheme from "react-treebeard/dist/themes/default";
import TreeMeetingItem from './TreeMeetingItem';
import TreeAgendaItem from './TreeAgendAItem';
import styles from './AgendaBuilder.module.scss';


const mcc = 'background-color:darkgreen;';
const mcc2 = 'background-color:darkgreen;color:yellow;';

export interface TreeProps {
    data: any;
    title: string;
    handler: any;
}

export interface TreeState {
    cursor?: any;
    data?: any;
    toggleAll?: string;
}



class CutomContainer extends decorators.Container {

    public myProps;

    public constructor(props) {
        super(props);
        this.myProps = props;
    }

    public handler_ai(data) {
        console.log('%c Tree : CutomContainer -> handler_ai -> data', mcc, data);
        this.myProps.decorators.Container.handler({
            page: 'form',
            type: 'agendaItem',
            id: this.myProps.node.Id,
            mode: 'display'
        });
    }

    public handler_treeItems(data) {
        console.log('%c Tree : CutomContainer -> handler_treeItems -> data', mcc, data);
        console.log('%c : CutomContainer -> handler_treeItems -> this.myProps', mcc, this.myProps);

        if (data == 'editMeeting') {
            this.myProps.decorators.Container.handler({
                page: 'form',
                type: 'meeting',
                id: this.myProps.node.Id,
                mode: 'edit'
            });
        }

        else if (data == 'viewAgenda') {
            this.myProps.decorators.Container.handler({
                page: 'agenda',
                id: this.myProps.node.Id,
            });
        }

        else if (data == 'addAgendaItem') {
            this.myProps.decorators.Container.handler({
                page: 'form',
                type: 'agendaItem',
                mode: 'new'
            });
        }

    }

    public render() {
        const { onClick, node } = this.myProps;
        console.log('%c Tree : CutomContainer -> render -> this.myProps', mcc2, this.myProps);
        console.log('%c Tree : CutomContainer -> render -> node', mcc2, node);

        const _toggled =
            /* _toggleAll == 'Expand all' ? true
                : _toggleAll == 'Collapse all' ? false
                    :  */node.toggled;

        const kidCount = node.children ? node.children.length : 0;
        const isMeeting = node.EndDate || node.EventDate || node.MeetingLocationId;

        const el_item = isMeeting ?
            <TreeMeetingItem
                id={node.Id}
                // name={node.name}
                title={node.Title}
                toggled={_toggled}
                kidCount={kidCount}
                handler={this.handler_treeItems.bind(this)}
            />
            : <TreeAgendaItem
                id={node.Id}
                title={node.Title}
                // name={node.name}
                // toggled={_toggled}
                handler={this.handler_ai.bind(this)}
            />
            ;

        return (
            <div
                // onClick={(e) => this._onClick(e)}
                onClick={onClick}
                className={styles.treeItemContainer}
            >
                {el_item}

            </div>
        );
    }
}

class Tree extends React.Component<TreeProps, TreeState> {
    constructor(props: TreeProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : Tree -> componentDidMount -> this.props', mcc, this.props);
    }



    public render() {

        decorators.Container = CutomContainer;

        decorators.Container.handler = this.props.handler.bind(this);

        defaultTheme.tree.base = {
            ...defaultTheme.tree.base,
            color: '#555',
            backgroundColor: '#fff'
        };


        const { data, title } = this.props;


        const el_tree = typeof (data) == 'object' ?
            <div className='temp-treeWrap'>
                <h2>{title}</h2>
                <Treebeard
                    key={1}
                    data={this.props.data}
                    decorators={decorators}
                    style={defaultTheme}
                    onToggle={(node, toggled) => {
                        if (this.state.cursor) {
                            this.state.cursor.active = false;
                        }
                        node.active = true;
                        if (node.children) {
                            node.toggled = toggled;
                        }
                        this.setState({ cursor: node });
                    }}
                />
            </div>
            : <></>;

        return (
            <>
                {el_tree}
            </>
        );
    }
}

export default Tree;