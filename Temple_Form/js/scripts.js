const everything = window.location.href.split('?');
console.log(everything)

let formData = everything[1].split('&');
const showInfo = document.querySelector('#results');

function show(cup) {
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result = element.split('=')[1].replace("%40", "@").replace('%2B1', '')
        }
    })
    return result;
}
let phone = show('phone');

showInfo.innerHTML = `
<p>Appointment For ${show("first")} ${show("last")}</p>
<p>${show("ordinance")} on ${show('fecha')} in the ${show('location').replace(/\+/g, ' ')} Temple</p>
<p>Your Phone: (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}</p>
<p>Your Email: ${show('email')}


`;