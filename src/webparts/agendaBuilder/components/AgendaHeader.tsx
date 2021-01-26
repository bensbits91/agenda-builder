import * as React from 'react';




export interface AgendaHeaderProps {

}

export interface AgendaHeaderState {

}

class AgendaHeader extends React.Component<AgendaHeaderProps, AgendaHeaderState> {
    constructor(props: AgendaHeaderProps) {
        super(props);
        this.state = {};
    }

    public render() {
        return (
            <div>Logo, Org Name, Org Banner</div>
        );
    }
}

export default AgendaHeader;