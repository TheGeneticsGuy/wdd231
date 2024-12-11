const everything = window.location.href.split('?');

let formData = everything[1].split('&');
const showInfo = document.querySelector('#join-results');

function show(cup) {
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result = element.split('=')[1];
        }
    });
    return result;
}

let member_title = show('title-input').replace(/\+/g, ' ');
if (member_title !== '') {
    member_title = ` (${member_title})`;        // Only adding the title if it exists
}
let phone = show('phone').replace(/\-/g, '').replace(/\+/g, '');    // Remove the hyphens
// Now, need to remove the + if there is a number... need no more than 10 numbers

if (phone.length > 10) {
    phone = phone.slice(phone.length - 10);
}

// Input Optional Details
let details = show('description');
if (details === '') {
    details = '< None Given >';        // Only adding the title if it exists
}

let memberLevel = show('memberSelection');
memberLevel += " Membership";

// Format the timestamp into a human-readable format
function getTimeStamp(timestamp) {
    try {
        const date = new Date(decodeURIComponent(timestamp));
        const humanReadable = date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            timeZoneName: "short"
        });
        return humanReadable;
    } catch (error) {
        console.error('Bad Timestamp:', error);
        return 'Invalid Timestamp';
    }
}
let timestamp = getTimeStamp(show('hidden-timestamp'));
console.log(timestamp)

showInfo.innerHTML = `
<p><strong>Membership For:</strong> ${show("first-name-input")} ${show("last-name-input")}${member_title}</p>
<p><strong>Organization:</strong> ${show('business-input').replace(/\+/g, ' ')}</p>
<p><strong>Your Phone:</strong> (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}</p>
<p><strong>Email:</strong> ${show('email').replace('%40', '@')}</p>
<p><strong>Details:</strong><br>${show('description').replace(/\+/g, ' ')}</p>
<p><br>Your <strong>${memberLevel}</strong> has been accepted on ${timestamp}`
