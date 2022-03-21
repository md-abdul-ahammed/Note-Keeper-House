const formatAMPM = (date) => {
  try {
    let time = date.split(" ");
    let hours = time[4].split(":")[0];
    let minutes = time[4].split(":")[1];
    hours = hours || 12;
    const ampm = hours >= 12 ? " PM" : " AM";
    minutes = minutes < 10 ? `${minutes}` : minutes;
    hours %= 12;
    const strTime = `${hours}:${minutes} ${ampm}`;
    return strTime;
  } catch (e) {
    return "";
  }
};

export default formatAMPM;
