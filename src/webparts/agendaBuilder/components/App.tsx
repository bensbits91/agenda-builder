import * as React from 'react';
import { sp, Web } from "@pnp/sp/presets/all";
// import { IEmailProperties } from "@pnp/sp/sputilities";
import { IItemAddResult } from "@pnp/sp/items";
// import {
//     Route,
//     BrowserRouter as Router,
//     Switch,
//     Redirect,
//     RouteComponentProps
// } from 'react-router-dom';
import * as moment from 'moment';
import styles from './AgendaBuilder.module.scss';
import TopMenu from './TopMenu';
import Tree from './Tree';
import Agenda from './Agenda';
import AgendaItemForm from './AgendaItemForm';
import MeetingForm from './MeetingForm';


const queryString: any = require('query-string');

const mcc = 'background-color:lime;color:black;';

const today = moment();
console.log('%c : today', mcc, today);


export interface AppProps {
    context: any;
}

export interface AppState {
    meeting_data: any;
    agendaItem_data: any;
    meeting_fields: any;
    agendaItem_fields: any;
    // web_url: string;
}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props);
        this.state = {
            meeting_data: null,
            agendaItem_data: null,
            meeting_fields: null,
            agendaItem_fields: null,
            // web_url: null
        };
    }

    public componentDidMount() {
        this.get_webUrl().then((w: string) => {
            const theWeb = Web(w);
            this.get_meetings(theWeb).then(mtgs => {
                this.get_locations(theWeb).then(locs => {
                    this.prep_mtg_locs(mtgs, locs).then(mtgs_w_locs => {
                        this.get_agendaItems(theWeb).then(ais => {
                            console.log('%c : App -> componentDidMount -> ais', mcc, ais);
                            this.nest_mtg_ais(mtgs_w_locs, ais).then(mtgs_w_ais => {
                                console.log('%c : App -> componentDidMount -> mtgs_w_ais', mcc, mtgs_w_ais);
                                this.get_meetings_fields(theWeb, locs).then(mf => {
                                    console.log('%c : App -> componentDidMount -> mf', mcc, mf);
                                    this.get_agendaItems_fields(theWeb, mtgs).then(aif => {
                                        console.log('%c : App -> componentDidMount -> aif', mcc, aif);
                                        this.setState({
                                            meeting_data: mtgs_w_ais,
                                            agendaItem_data: ais,
                                            meeting_fields: mf,
                                            agendaItem_fields: aif
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    public componentDidUpdate(prevProps: AppProps, prevState: AppState) {
        console.log('%c : App -> componentDidUpdate -> this.state', mcc, this.state);
    }


    public get_webUrl = () => new Promise(resolve => {
        sp.web.get().then(w => {
            resolve(w.Url);
        });
    })


    public get_meetings = (web) => new Promise(resolve => {
        web.lists.getByTitle('Meetings').items
            .select('Title', 'ID', 'EventDate', 'EndDate', 'MeetingLocationId')
            // .filter("EndDate ge datetime'" + today.toISOString() + "'")
            .orderBy('EventDate'/* , false */)
            .get().then(items => {
                // items.map(i => {
                //     i.costPer_number = product_info.filter(p => p.title == i.Product)[0].price;
                //     i.Salesperson_name = getNameFromEmail(i.Salesperson);
                //     i.DateSold_short = moment(i.DateSold).format('M/D/YYYY');
                // });
                resolve(items);
            });
    })

    // public get_meetings_past = (web) => new Promise(resolve => {
    //     web.lists.getByTitle('Meetings').items
    //         .select('Title', 'ID', 'EventDate', 'EndDate', 'MeetingLocationId')
    //         .filter("EndDate lt datetime'" + today.toISOString() + "'")
    //         .orderBy('EventDate', false)
    //         .get().then(items => {
    //             // items.map(i => {
    //             //     i.costPer_number = product_info.filter(p => p.title == i.Product)[0].price;
    //             //     i.Salesperson_name = getNameFromEmail(i.Salesperson);
    //             //     i.DateSold_short = moment(i.DateSold).format('M/D/YYYY');
    //             // });
    //             resolve(items);
    //         });
    // })

    public get_locations = (web) => new Promise(resolve => {
        web.lists.getByTitle('Locations').items
            .select('Title', 'ID', 'Address', 'City', 'State', 'ZIP', 'Latitude', 'Longitude')
            // .orderBy('EventDate', false)
            .get().then(items => {
                // items.map(i => {
                //     i.costPer_number = product_info.filter(p => p.title == i.Product)[0].price;
                //     i.Salesperson_name = getNameFromEmail(i.Salesperson);
                //     i.DateSold_short = moment(i.DateSold).format('M/D/YYYY');
                // });
                resolve(items);
            });
    })

    public prep_mtg_locs = (mtgs, locs) => new Promise(resolve => {
        const mtgs_w_locs = mtgs.map(mtg => {
            mtg.location_data = locs.filter(l => l.Id === mtg.MeetingLocationId)[0];
        });
        Promise.all(mtgs_w_locs).then(mwl => {
            resolve(mtgs);
        });
    })

    public get_agendaItems = (web) => new Promise(resolve => {
        web.lists.getByTitle('Agenda Items').items
            .select('Title', 'ID', 'MeetingId', 'Author0', 'Status', 'Order0', 'MinutesRequested', 'MinutesApproved')
            .orderBy('MeetingId')
            .get().then(items => {
                // items.map(i => {
                //     i.costPer_number = product_info.filter(p => p.title == i.Product)[0].price;
                //     i.Salesperson_name = getNameFromEmail(i.Salesperson);
                //     i.DateSold_short = moment(i.DateSold).format('M/D/YYYY');
                // });
                resolve(items);
            });
    })

    public nest_mtg_ais = (mtgs, ais) => new Promise(resolve => {
        const mtgs_w_ais = mtgs.map(mtg => {
            mtg.children = ais.filter(ai => ai.MeetingId === mtg.Id);
            return mtg;
        });
        Promise.all(mtgs_w_ais).then(mwa => {
            resolve(mtgs);
        });
    })

    public get_meetings_fields = (web, locs) => new Promise(resolve => {
        web.lists.getByTitle('Meetings').fields
            .filter("Hidden eq false and ReadOnlyField eq false and InternalName ne 'ContentType' and InternalName ne 'Location' and InternalName ne 'Geolocation'")
            .select('TypeAsString', 'InternalName', 'Title', 'Required', 'Choices', 'Description')
            .get().then(fields => {
                const new_fields = JSON.parse(JSON.stringify(fields));
                const location_field = new_fields.filter(f => f.InternalName == 'MeetingLocation')[0];
                console.log('%c : App -> location_field', mcc, location_field);
                location_field['Choices'] = locs.map(l => l.Title);
                console.log('%c : App -> new_fields', mcc, new_fields);

                resolve(new_fields);
            });
    })

    public get_agendaItems_fields = (web, mtgs) => new Promise(resolve => {
        web.lists.getByTitle('Agenda Items').fields
            .filter("Hidden eq false and ReadOnlyField eq false and InternalName ne 'ContentType' and InternalName ne 'Amount'")
            .select('TypeAsString', 'InternalName', 'Title', 'Required', 'Choices', 'Description')
            .get().then(fields => {
                console.log('%c : App -> fields ===============>', mcc, fields);
                const mtg_lookup_field = fields.filter(f => f.InternalName == 'Meeting')[0];
                console.log('%c : App -> mtg_lookup_field ===============>', mcc, mtg_lookup_field);
                mtg_lookup_field.Choices = mtgs.map(m => {
                    return m.Title;
                });
                resolve(fields);
            });
    })


    public handler_tree(data/* , aiid */) {
        console.log('%c : App -> handler_tree -> data', mcc, data);
        // console.log('%c : App -> handler_tree -> aiid', mcc, aiid);
        let navTo: any = {
            page: data.page,
        };
        if (data.type) navTo.type = data.type;
        if (data.mode) navTo.mode = data.mode;
        if (data.id) navTo.id = data.id;
        this.router(queryString.stringify(navTo));
    }

    public handler_menu(data) {
        console.log('%c : App -> handler_menu -> data', mcc, data);
        if (data == 'home' || data == 'cancel') {
            const navTo = queryString.stringify({
                page: 'home',
            });
            this.router(navTo);
        }
        else if (data == 'newMeeting') {
            const navTo = queryString.stringify({
                page: 'form',
                type: 'meeting',
                mode: 'new',
            });
            this.router(navTo);
        }
        else if (data == 'edit') {
            const parsed = queryString.parse(location.search);

            const { page, type, id } = parsed;

            const navTo = queryString.stringify({
                page: page,
                type: type,
                mode: 'edit',
                id: id
            });
            this.router(navTo);
        }
        else if (data == 'editMeeting') {
            const parsed = queryString.parse(location.search);

            const { id } = parsed;

            const navTo = queryString.stringify({
                page: 'form',
                type: 'meeting',
                mode: 'edit',
                id: id
            });
            this.router(navTo);
        }
        
    }

    public handler_meetingForm(data) {
        console.log('%c : App -> handler_meetingForm -> data', mcc, data);
        if (data.page) {
            let navTo: any = {
                page: data.page,
            };
            if (data.type) navTo.type = data.type;
            if (data.mode) navTo.mode = data.mode;
            if (data.id) navTo.id = data.id;
            this.router(queryString.stringify(navTo));
            //     if (data.page == 'form' && data.type && data.mode) {
            //         if (data.mode == 'new' || data.id) {
            //             const navTo = queryString.stringify(data);
            //             this.router(navTo);
            //         }
            //         else {
            //             console.log('OOPS: Not a new form and no id provided.');
            //         }
            //     }
            //     else {
            //         console.log('OOPS: Not a form, no nav (yet).');
            //     }
            // }
            // else {
            //     console.log('OOPS: Not a page, no nav (yet).');
        }
        else if (data.field) {
            console.log('%c : App -> handler_meetingForm -> data.field', mcc, data.field);

        }
    }

    public handler_agendaItemForm(data) {
        console.log('%c : App -> handler_agendaItemForm -> data', mcc, data);
    }

    public router(navTo) {
        window.history.pushState(window.location.pathname, '', '?' + navTo);
        this.forceUpdate();
    }

    public render() {

        const parsed = queryString.parse(location.search);

        const { page, type, mode, id } = parsed;
        console.log('%c : App -> render -> id', mcc, id);

        const { agendaItem_data, agendaItem_fields, meeting_data, meeting_fields } = this.state;
        console.log('%c : App -> render -> meeting_data', mcc, meeting_data);

        const el_menu = <TopMenu
            handler={this.handler_menu.bind(this)}
            page={page}
            mode={mode}
        />;





        const m_data = meeting_data ? meeting_data.filter(m => moment(m.EndDate) >= today) : 'loading upcoming meetings';
        console.log('%c : App -> render -> m_data', mcc, m_data);

        const el_tree =
            <Tree
                key={typeof (m_data)}
                data={m_data}
                title='Upcoming Meetings'
                handler={this.handler_tree.bind(this)}
            />;

        const m_data_past = meeting_data ?
            meeting_data
                .filter(m => moment(m.EndDate) < today)
                .sort((a, b) => { return a.EndDate < b.EndDate; })
            : 'loading past meetings';
        console.log('%c : App -> render -> m_data_past', mcc, m_data_past);

        const el_tree_past =
            <Tree
                key={typeof (m_data_past)}
                data={m_data_past}
                title='Past Meetings'
                handler={this.handler_tree.bind(this)}
            />;





        const the_meeting = meeting_data ? meeting_data.filter(m => m.Id === parseInt(id))[0] : null;
        console.log('%c : App -> render -> the_meeting', mcc, the_meeting);

        const el_form_meeting =
            <MeetingForm
                key={the_meeting ? 1 : 0}
                // key={typeof (m_data)}
                data={the_meeting}
                fields={meeting_fields}
                handler={this.handler_meetingForm.bind(this)}
            />;




        const the_ai = agendaItem_data ? agendaItem_data.filter(a => a.Id === parseInt(id))[0] : 'loading agenda item form';
        if (typeof (the_ai) == 'object') {
            the_ai.meeting_name = the_ai && meeting_data ? meeting_data.filter(m => m.Id === the_ai.MeetingId)[0].Title : null;
        }
        const el_form_agendaitem = agendaItem_data ?
            <AgendaItemForm
                key={the_ai ? 1 : 0}
                data={the_ai}
                fields={agendaItem_fields}
                handler={this.handler_agendaItemForm.bind(this)}
            />
            : <></>;





        const el_agenda = the_meeting && id ?
            <Agenda
                data={the_meeting}
            />
            : <></>;


        const el_where = <>WHERE ARE WE???</>;

        const el = !page || page == 'home' ?
            <>
                {el_tree}
                {el_tree_past}
            </>

            : page == 'agenda' ? el_agenda

                : page == 'form' ?
                    type == 'meeting' ? el_form_meeting
                        : type == 'agendaItem' ? el_form_agendaitem
                            : el_where
                    : el_where;


        return (
            <div className={styles.appWrap}>
                {el_menu}
                {el}
            </div>
        );
    }
}

export default App;