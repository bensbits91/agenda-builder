import * as React from 'react';
import { Map, ICoordinates, MapType } from "@pnp/spfx-controls-react/lib/Map";


export interface MeetingMapProps {

}

export interface MeetingMapState {

}

class MeetingMap extends React.Component<MeetingMapProps, MeetingMapState> {
    constructor(props: MeetingMapProps) {
        super(props);
        this.state = {

        };
    }

    public render() {
        return (
            <Map
                titleText="New of London"
                coordinates={{ latitude: 51.507351, longitude: -0.127758 }}
                enableSearch={true}
            />
        );
    }
}

export default MeetingMap;