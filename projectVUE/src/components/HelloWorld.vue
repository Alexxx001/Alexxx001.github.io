<template>
    <v-container>
        <v-app-bar
                app
                color="#2b566e"
                dark
        >
            <div class="d-flex align-center">
                <v-img
                        alt="Logo"
                        class="shrink mt-1 hidden-sm-and-down"
                        contain
                        min-width="100"
                        src="https://i.ibb.co/mccsHSn/555555post-it-3m-logo-2-FC29-EB97-B-seeklogo-com.png"
                        width="100"
                />
            </div>

            <v-spacer></v-spacer>

            <v-btn class="mx-2" fab dark small color="#ffd617" @click="createEvent=true">
                <v-icon color="#2b566e">mdi-plus</v-icon>
            </v-btn>
        </v-app-bar>
        <v-row class="fill-height">
            <v-col>
                <v-sheet height="64">
                    <v-toolbar flat color="white">
                        <v-btn outlined class="mr-4" color="grey darken-2" @click="type = 'month'">
                            Month
                        </v-btn>
                        <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                            Today
                        </v-btn>
                        <v-btn fab text small color="grey darken-2" @click="prev">
                            <v-icon small>mdi-chevron-left</v-icon>
                        </v-btn>
                        <v-btn fab text small color="grey darken-2" @click="next">
                            <v-icon small>mdi-chevron-right</v-icon>
                        </v-btn>
                        <v-toolbar-title>{{ title }}</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                </v-sheet>
                <v-sheet height="600">
                    <v-calendar
                            ref="calendar"
                            v-model="focus"
                            color="primary"
                            :events="events"
                            :event-color="getEventColor"
                            :now="today"
                            :type="type"
                            @click:event="showEvent"
                            @click:more="viewDay"
                            @change="updateRange"
                    ></v-calendar>
                    <v-menu
                            v-model="selectedOpen"
                            :close-on-content-click="false"
                            :activator="selectedElement"
                            offset-x
                    >
                        <v-card
                                color="grey lighten-4"
                                min-width="350px"
                                flat
                        >
                            <v-toolbar
                                    :color="selectedEvent.color"
                                    dark
                            >
                                <v-btn icon @click="deleteEvent">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <span v-html="selectedEvent.details"></span>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                        text
                                        color="secondary"
                                        @click="selectedOpen = false"
                                >
                                    OK
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                </v-sheet>
            </v-col>
        </v-row>
        <v-dialog persistent v-model="createEvent" max-width="700">
            <v-card>
                <v-card-title>
                    Create New Event
                </v-card-title>
                <v-card-text>
                    <v-text-field filled label="What to do" class="mx-2" v-model="name"></v-text-field>
                    <v-textarea filled label="Description" class="mx-2" v-model="description" rows="1"
                                auto-grow="true"></v-textarea>
                    <v-menu
                            ref="menu3"
                            v-model="menu3"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            no-title
                            max-width="200px"
                            min-width="290px"
                    >
                    </v-menu>
                    <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                    >
                        <template v-slot:activator="{ on }">
                            <v-text-field
                                    readonly
                                    filled
                                    v-model="eventDate"
                                    label="Choose date"
                                    v-on="on"
                                    class="mx-2"
                            ></v-text-field>
                        </template>
                        <v-date-picker color="success" no-title v-model="eventDate"
                                       @input="menu2 = false"></v-date-picker>
                    </v-menu>
                </v-card-text>
                <v-card-actions>
                    <v-btn
                            color="success"
                            depressed=""
                            @click="closeDialog"
                    >
                        Close
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="success"
                            depressed
                            :disabled="isDisabled"
                            @click="submit"
                    >
                        Submit
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        data: () => ({
            focus: '',
            type: 'month',
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
            },
            createEvent: false,
            name: '',
            description: '',
            menu2: false,
            menu3: false,
            eventDate: undefined,
            start: null,
            end: null,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],
            colors: ['pink', 'indigo', 'orange', 'cyan', 'green', 'red', 'purple'],
            names: ['Meeting', 'Holiday', 'HW', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
        }),
        computed: {
            title() {

                const {start} = this;
                if (!start ) {

                    return ''
                }

                const startMonth = this.monthFormatter(start);
                const startYear = start.year;
                        return `${startMonth} ${startYear}`
            },
            isDisabled() {
                return !(this.name !== undefined && this.name.trim() !== '' && this.eventDate !== undefined);
            },
            monthFormatter() {
                return this.$refs.calendar.getFormatter({
                    timeZone: 'UTC', month: 'long',
                })
            },
        },
        mounted() {
            this.events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];
            this.$refs.calendar.checkChange()
        },
        methods: {
            deleteEvent() {
                const index = this.events.indexOf(this.selectedEvent);
                this.events.splice(index, 1);
                this.selectedOpen = false;
                this.selectedEvent = {};
                this.selectedElement = null;
                this.selectedOpen = false;
                localStorage.setItem('events', JSON.stringify(this.events));
            },
            submit() {
                let year = parseInt(this.eventDate.substr(0, 4));
                let month = parseInt(this.eventDate.substr(5, 2));
                let day = parseInt(this.eventDate.substr(8, 2));

                let eventStart = new Date(Date.UTC(year, month - 1, day )).toISOString().substring(0, 10);
                let eventEnd = new Date(Date.UTC(year, month - 1, day)).toISOString().substring(0, 10);

                this.events.push({
                    name: this.name,
                    start: eventStart,
                    end: eventEnd,
                    color: 'orange',
                    details: this.description
                });
                localStorage.setItem('events', JSON.stringify(this.events));
                localStorage.setItem(('1'), 1);
                this.closeDialog();
            },
            closeDialog() {
                this.name = '',
                    this.description = '',
                    this.createEvent = false
            },
            viewDay({date}) {
                this.focus = date;
                this.type = 'day'
            },
            getEventColor(event) {
                return event.color
            },
            setToday() {
                this.focus = this.today
            },
            prev() {
                this.$refs.calendar.prev()
            },
            next() {
                this.$refs.calendar.next()
            },
            showEvent({nativeEvent, event}) {
                const open = () => {
                    this.selectedEvent = event;
                    this.selectedElement = nativeEvent.target;
                    setTimeout(() => this.selectedOpen = true, 10)
                };

                if (this.selectedOpen) {
                    this.selectedOpen = false;
                    setTimeout(open, 10)
                } else {
                    open()
                }

                nativeEvent.stopPropagation()
            },
            updateRange({start, end}) {

                this.start = start;
                this.end = end;
            },
            nth(d) {
                return d > 3 && d < 21
                    ? 'th'
                    : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10]
            },
            rnd(a, b) {
                return Math.floor((b - a + 1) * Math.random()) + a
            },
            formatDate(a, withTime) {
                return withTime
                    ? `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
                    : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`
            },
        },
    }
</script>
