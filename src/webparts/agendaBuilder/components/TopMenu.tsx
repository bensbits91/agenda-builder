import * as React from 'react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { colors } from './definitions';

// const mcc = 'color:darkorange;';

const items_list: ICommandBarItemProps[] = [
    {
        key: 'newMeeting',
        button_id: 'newMeeting',
        text: 'New Meeting',
        iconProps: { iconName: 'AddEvent' },
    }
],
    items_agenda: ICommandBarItemProps[] = [
        {
            key: 'home',
            button_id: 'home',
            text: 'Home',
            iconProps: { iconName: 'Home' },
        },
        {
            key: 'print',
            button_id: 'print',
            text: 'Print',
            iconProps: { iconName: 'Print' },
        },
        {
            key: 'export',
            button_id: 'export',
            text: 'Export',
            iconProps: { iconName: 'ExcelLogoInverse' },
        },
        {
            key: 'share',
            button_id: 'share',
            text: 'Share',
            iconProps: { iconName: 'Share' },
        },
        {
            key: 'editMeeting',
            button_id: 'editMeeting',
            text: 'Edit Meeting',
            iconProps: { iconName: 'WindowEdit' },
        },
    ],
    items_form_display: ICommandBarItemProps[] = [
        {
            key: 'home',
            button_id: 'home',
            text: 'Home',
            iconProps: { iconName: 'Home' },
        },
        {
            key: 'edit',
            button_id: 'edit',
            text: 'Edit',
            iconProps: { iconName: 'PageHeaderEdit' },
        },
        {
            key: 'print',
            button_id: 'print',
            text: 'Print',
            iconProps: { iconName: 'Print' },
        },
        {
            key: 'export',
            button_id: 'export',
            text: 'Export',
            iconProps: { iconName: 'ExcelLogoInverse' },
        },
        {
            key: 'share',
            button_id: 'share',
            text: 'Share',
            iconProps: { iconName: 'Share' },
        },
        // {
        //     key: 'signatures',
        //     button_id: 'signatures',
        //     text: 'Signatures',
        //     iconProps: { iconName: 'InsertSignatureLine' },
        // },
    ],
    items_form_edit: ICommandBarItemProps[] = [
        {
            key: 'save',
            button_id: 'save',
            text: 'Save',
            iconProps: { iconName: 'SaveAll' },
        },
        // {
        //     key: 'signatures',
        //     button_id: 'signatures',
        //     text: 'Signatures',
        //     iconProps: { iconName: 'InsertSignatureLine' },
        // },
        {
            key: 'cancel',
            button_id: 'cancel',
            text: 'Cancel',
            iconProps: { iconName: 'Cancel' },
        }
    ],
    items_form_new: ICommandBarItemProps[] = [
        {
            key: 'save',
            button_id: 'save',
            text: 'Save',
            iconProps: { iconName: 'SaveAll' },
        },
        {
            key: 'cancel',
            button_id: 'cancel',
            text: 'Cancel',
            iconProps: { iconName: 'Cancel' },
        }
    ],
    top_menu_farItems: ICommandBarItemProps[] = [
        {
            key: 'size',
            button_id: 'size',
            text: 'Toggle compact mode',
            ariaLabel: 'Toggle compact mode', // This needs an ariaLabel since it's icon-only
            iconOnly: true,
            iconProps: { iconName: 'SizeLegacy' },
        },
        {
            key: 'mode',
            button_id: 'mode',
            text: 'Toggle dark mode',
            ariaLabel: 'Toggle dark mode',
            iconOnly: true,
            iconProps: { iconName: 'ClearNight' },
        },
        {
            key: 'layout',
            button_id: 'layout',
            text: 'Change layout',
            ariaLabel: 'Change layout',
            iconOnly: true,
            iconProps: { iconName: 'Tiles' },
        },
        {
            key: 'info',
            button_id: 'info',
            text: 'Info',
            ariaLabel: 'Info',
            iconOnly: true,
            iconProps: { iconName: 'Info' },
        }
    ],
    itemStyles = {
        // root: { backgroundColor: colors.black.b3 },
        root: { border: 'none' },
        // rootHovered: { backgroundColor: colors.black.b5 },
        icon: { color: colors.mint },
        iconHovered: { color: colors.navy },
        // label: { color: colors.black.b9 },
        // labelHovered: { color: colors.gray.c },
    },
    styles_commandBar = {
        secondarySet: { paddingTop: 12 }
    };


export interface TopMenuProps {
    handler: any;
    mode: string;
    page: string;
}
// export interface TopMenuState {}

class TopMenu extends React.Component<TopMenuProps, {}> {
    constructor(props: TopMenuProps) {
        super(props);
        // this.state = {};
    }

    public render() {

        const { page, mode, handler } = this.props;


        const CustomButton: React.FunctionComponent<IButtonProps> = (props: any) => {
            return (
                <CommandBarButton
                    {...props}
                    onClick={() => handler(props.button_id)}
                    styles={{
                        ...props.styles,
                        ...itemStyles
                    }}
                />
            );
        };

        const items_mode = mode == 'display' ? items_form_display
            : mode == 'edit' ? items_form_edit
                : mode == 'new' ? items_form_new
                    : page == 'agenda' ? items_agenda
                        : items_list;

        return (
            <CommandBar
                items={items_mode}
                // overflowItems={top_menu_overflowItems}
                // overflowButtonProps={overflowProps}
                farItems={top_menu_farItems}
                // ariaLabel='Use left and right arrow keys to navigate between commands'
                styles={styles_commandBar}
                buttonAs={CustomButton}
            />
        );
    }
}

export default TopMenu;