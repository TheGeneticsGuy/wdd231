
// Method:          updateVisit()
// What it Does:    Updates the message in the top left of the page based on visit
// Purpose:         Quality of life feature...
function updateVisit() {
    const lastVisit = "vistTime"; // Key to store the date in localStorage
    const currentDate = new Date();
    const storedDate = localStorage.getItem(lastVisit);
    const statusOfVisit = document.querySelector('#time-announce');

    if (!storedDate) {
        // First visit
        statusOfVisit.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = new Date(storedDate);
        const timeDifference = currentDate - lastVisitDate;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));  // Time difference in hours

        if (daysDifference < 1) {
            statusOfVisit.textContent = "Back so soon! Awesome!";
        } else {
            const dayOrDays = daysDifference === 1 ? "day" : "days";    // More efficient if/else
            statusOfVisit.textContent = `You last visited ${daysDifference} ${dayOrDays} ago.`;
        }
    }

    // Save the change
    localStorage.setItem(lastVisit, currentDate.toISOString());    // ISO strings are a universal standard for time.
}

updateVisit();