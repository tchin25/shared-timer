import React, { Component } from 'react';
import '../../styles/pages/timer.scss'
import {db} from '../../firebaseConfig'
import Clock from './timer_components/Clock'

const dbCollection = 'timer'

class Timer extends Component {

    constructor(props) {
        super(props);
        this.state = { deadline: undefined, key: undefined, dbListener: undefined };
        this.setTimer = this.setTimer.bind(this)
    }

    setTimer(event) {
        //Sets a time with a key if key isn't in database already
        //Inserts into database so others can fetch
        db.collection(dbCollection)
            .doc(this.state.key)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    console.log("Document already exists:", doc.data());
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                    db.collection(dbCollection).doc(this.state.key).set({
                        deadline: this.state.deadline
                    })
                        .then(function () {
                            console.log("Document successfully written!");
                        })
                        .catch(function (error) {
                            console.error("Error writing document: ", error);
                        });
                }
            }).catch(function (error) {
                console.log("Error getting document:", error);
            })

        event.preventDefault();
    }

    fetchTimer() {
        //Fetch deadline from database with specific key
        //Passes time into clock

        //Puts listener to detect if deleted from database
        //If deleted, notification and stop listener
        if (this.state.key || this.state.deadline) {
            this.setState({
                ...this.state,
                dbListener: db.collection(dbCollection)
                .doc(this.state.key)
                .onSnapshot((doc) => {
                    if (!doc.exists) {
                        //Doc has been deleted
                        this.alarmTriggered(true);
                    } else {
                        this.setState({
                            ...this.state,
                            deadline: doc.data().deadline
                        })
                    }
                })
            })
        }
    }

    deleteTimer() {
        //Deletes deadline in database with specific key
        db.collection(dbCollection)
            .doc(this.state.key)
            .delete()
            .then(function () {
                console.log("Document successfully deleted!");
            })
            .catch(function (error) {
                console.error("Error removing document: ", error);
            });

        //Resets listener
        this.state.dbListener();

        this.setState({
            deadline: null,
            key: null
        })
    }

    alarmTriggered(deleted = false) {
        //Triggers alarm
        //Popup
        if (deleted) {
            //Notify that the alarm was deleted
            //Don't notify if is person who deleted alarm
        }

        //When alarm is turned off, reset clock
        this.deleteTimer();
    }

    render() {
        return (
            <div>
                <Clock deadline={this.state.deadline} alarmTriggered={this.alarmTriggered}></Clock>
            </div>
        );
    }
}

export default Timer