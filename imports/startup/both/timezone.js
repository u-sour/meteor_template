import { Meteor } from 'meteor/meteor'
import moment from 'moment-timezone'

Meteor.startup(function () {
    moment.tz.setDefault('Asia/Phnom_Penh')
})
