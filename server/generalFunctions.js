// generalFunctions.js
'use strict';


// -------------------- FORMAT ----------------------

// Format Hours
global.formatedTime = function (time) {
    if (time) {
        if (time.includes(':') && !time.includes(' ')) {
            var formatedTime = '';

            time = time.split(':');

            var hours = time[0];
            if (hours > 12)
                hours = hours - 12;

            // Remove leading 0
            if (hours[0] == 0) {
                hours = hours[1];
            }

            formatedTime += hours;
            formatedTime += ':';
            formatedTime += time[1];

            if (time[0] < 12)
                formatedTime += ' AM';
            else
                formatedTime += ' PM';
            return formatedTime;
        }
        return time;
    }
    return '';
};

// Format Date
global.formatedDate = function (date) {
    if (date) {
        if (!date.includes(' ')) {
            // Convert Time

            // UTC TIME
            var utcDate = new Date(date);
            //local Date
            date = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000).toString();
            date = date.split(' ');
            date = date[1] + ' ' + date[2];

            return date;
        }
        return date;
    }
    return '';
};



// -------------------- VALIDATE ----------------------

// Valid ID
global.validateID = function (id) {
    return id.match(/^[0-9a-fA-F]{24}$/);
}

// Valid Email
global.validateEmail = function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Valid Phone Number
global.validPhoneNumber = function (number) {
    var digit_phone_number = /^\d{10}$/;
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    // Check Valid phone number
    if (number.match(phoneno) || number.match(digit_phone_number)) {
        // IS VALID
        return true;
    }
    // Not Valid Phone Number
    else {
        return false;
    }
}
// END - generalFunctions.js