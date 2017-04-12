import React, { Component } from 'react';
import { Calendar_Week, Calendar_List, Panel } from '@extjs/ext-react';
import './data';

export default class CalendarWeekViewExample extends Component {

    state = {
        visibleDays:7
    }

    store = Ext.create('Ext.calendar.store.Calendars', {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: '/KitchenSink/CalendarWeek'
        }
    })

    render() {
        return (
            <Panel
                shadow
                title={Ext.Date.format(new Date(), 'F Y')}
                layout={{
                    type: 'hbox',
                    align: 'stretch'
                }}
                header={{
                    layout: 'hbox',
                    items: [{
                        xtype: 'component',
                        flex: 1
                    }, {
                        xtype: 'segmentedbutton',
                        items: [{
                            text: Ext.os.is.Phone ? null : 'Full Week',
                            iconCls: Ext.os.is.Phone ? 'x-fa fa-calendar-check-o' : null,
                            value: 'fullweek',
                            handler: () => this.setState({visibleDays:7})
                        }, {
                            text: Ext.os.is.Phone ? null : 'Work Week',
                            iconCls: Ext.os.is.Phone ? 'x-fa fa-briefcase' : null,
                            value: 'workweek',
                            handler: () => this.setState({visibleDays:5})
                        }]
                    }]
                }}
            >
                <Panel
                    title={'Calendars'}
                    ui={'light'}
                    width={150}
                    bodyPadding={5}
                    hidden={Ext.os.is.Phone}
                >
                    <Calendar_List store={this.store}/>
                </Panel>
                <Calendar_Week
                    store={this.store}
                    flex={1}
                    timezoneOffset={0}
                    gestureNavigation={false}
                    value={new Date()}
                    firstDayOfWeek={0}
                    visibleDays={this.state.visibleDays}
                />
            </Panel>
        )
    }
}
