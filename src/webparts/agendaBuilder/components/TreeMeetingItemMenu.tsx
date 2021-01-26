import * as React from 'react';
import { IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ActionButton } from 'office-ui-fabric-react';
import { IOverflowSetItemProps, OverflowSet } from 'office-ui-fabric-react/lib/OverflowSet';


const mcc = 'background-color:orange;color:black;';


export interface TreeMeetingItemMenuProps {
    toggled: boolean;
    handler: any;
}

export interface TreeMeetingItemMenuState {

}
// const noOp = () => undefined;

const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
    const buttonStyles: Partial<IButtonStyles> = {
        root: {
            minWidth: 0,
            padding: '0 4px',
            alignSelf: 'stretch',
            height: 'auto',
        },
    };
    return (
        <IconButton
            role='menuitem'
            title='More options'
            styles={buttonStyles}
            menuIconProps={{ iconName: 'More' }}
            menuProps={{ items: overflowItems! }}
        />
    );
};


class TreeMeetingItemMenu extends React.Component<TreeMeetingItemMenuProps, TreeMeetingItemMenuState> {
    public handler_this;
    constructor(props: TreeMeetingItemMenuProps) {
        super(props);
        this.state = {};
        this.handler_this = this.props.handler.bind(this);
    }

    public onClick_menuItem(e, data) {
        console.log('%c : TreeMeetingItemMenu -> onClick_menuItem -> data', mcc, data);
        if (data != 'expandAgendaItems') {
            this.handler_this(data);
            e.preventDefault();
            e.stopPropagation();
        }
    }

    public onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
        return (
            <ActionButton
                onClick={e => this.onClick_menuItem(e, item.key)}
                iconProps={item.iconProps}
            >
                {item.name}
            </ActionButton>
        );
    }

    public render() {
        const expandAgendaItems_name = this.props.toggled ? 'Hide Agenda Items' : 'Show Agenda Items';
        const expandAgendaItems_icon = this.props.toggled ? 'ArrowUpRightMirrored8' : 'ArrowDownRight8';
        return (
            <OverflowSet
                aria-label='Basic Menu Example'
                role='menubar'
                items={[
                    {
                        key: 'expandAgendaItems',
                        name: expandAgendaItems_name,
                        iconProps: { iconName: expandAgendaItems_icon }
                    },
                    {
                        key: 'viewAgenda',
                        name: 'View Agenda',
                        iconProps: { iconName: 'PreviewLink' }
                    },
                    {
                        key: 'editMeeting',
                        name: 'Edit Meeting',
                        iconProps: { iconName: 'WindowEdit' }
                    },
                    {
                        key: 'addAgendaItem',
                        name: 'Add Agenda Item',
                        iconProps: { iconName: 'AddToShoppingList' }
                    },
                ]}
                overflowItems={[
                    {
                        key: 'item4',
                        name: 'Overflow Link 1',
                        iconProps: { iconName: 'AddToShoppingList' }
                    },
                    {
                        key: 'item5',
                        name: 'Overflow Link 2',
                        iconProps: { iconName: 'AddToShoppingList' }
                    },
                ]}
                onRenderOverflowButton={onRenderOverflowButton}
                onRenderItem={this.onRenderItem}
            />
        );
    }
}

export default TreeMeetingItemMenu;