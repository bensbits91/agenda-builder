import * as React from 'react';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import TreeMeetingItemMenu from './TreeMeetingItemMenu';


export interface TreeMeetingItemProps {
    id: string;
    // name: string;
    title: string;
    kidCount?: number;
    handler: any;
    toggled?: boolean;
}

export interface TreeMeetingItemState {

}

class TreeMeetingItem extends React.Component<TreeMeetingItemProps, TreeMeetingItemState> {
    constructor(props: TreeMeetingItemProps) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <div className='temp-treeMeetingItemWrap'>
                <Stack horizontal>
                    <div>
                        Meeting - {this.props.title}
                    </div>
                    <div>
                        <TreeMeetingItemMenu
                            toggled={this.props.toggled}
                            handler={this.props.handler.bind(this)}
                        />
                    </div>
                </Stack>
            </div>
        );
    }
}

export default TreeMeetingItem;