function calculateEmailTime(departureTime) {
    // Convert to Date object if input is a string
    const departureDate = typeof departureTime === "string" ? new Date(departureTime) : departureTime;

    // Subtract 48 hours (2 days) from the departure time
    const emailTime = new Date(departureDate);
    emailTime.setHours(emailTime.getHours() - 48);

    return emailTime;
}