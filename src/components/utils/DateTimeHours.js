const DateTimeHours = (dateString) => {
  const inputDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - inputDate.getTime(); // Calculate time difference in milliseconds
    // Difference in milliseconds

  const millisecondsInMinute = 60000; // 1000 milliseconds * 60 seconds
  const millisecondsInHour = 3600000; // 1000 milliseconds * 60 seconds * 60 minutes

  if (timeDifference > 1000 && timeDifference < 60000) {
      const seconds = Math.floor(timeDifference / 1000);
      return `${seconds === 1 ? '1 second ago' : `${seconds} seconds ago`} `;
  } else if (timeDifference > millisecondsInMinute * 60000 && timeDifference < 3600000) {
      const minutes = Math.floor(timeDifference / millisecondsInMinute);
      return `${minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`} `;
  } else if (timeDifference < millisecondsInHour * 3600000 && timeDifference < 86400000) { // Adjusted condition
      const hours = Math.floor(timeDifference / millisecondsInHour);
      return `${hours === 1 ? '1 hour ago' : `${hours} hours ago`} `;
  } else {
      const dd = String(inputDate.getDate()).padStart(2, '0');
      const mm = String(inputDate.getMonth() + 1).padStart(2, '0');
      const yyyy = inputDate.getFullYear();
      return `${dd}/${mm}/${yyyy} `;
  }
}

export default DateTimeHours;
