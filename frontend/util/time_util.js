var TimeUtil = {
  timeAgo: function (start) {
    var startTime = new Date(parseInt(start));
    var secs = ((new Date()).getTime() / 1000) - startTime;

    Math.floor(secs);
    var minutes = secs / 60;
    secs = Math.floor(secs % 60);
    if (minutes < 1) {
        return secs + (secs > 1 ? ' seconds ago' : ' second ago');
    }
    var hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    if (hours < 1) {
        return minutes + (minutes > 1 ? ' minutes ago' : ' minute ago');
    }
    var days = hours / 24;
    hours = Math.floor(hours % 24);
    if (days < 1) {
        return hours + (hours > 1 ? ' hours ago' : ' hour ago');
    }
    var weeks = days / 7;
    days = Math.floor(days % 7);
    if (weeks < 1) {
        return days + (days > 1 ? ' days ago' : ' day ago');
    }
    var months = weeks / 4.35;
    weeks = Math.floor(weeks % 4.35);
    if (months < 1) {
        return weeks + (weeks > 1 ? ' weeks ago' : ' week ago');
    }
    var years = months / 12;
    months = Math.floor(months % 12);
    if (years < 1) {
        return months + (months > 1 ? ' months ago' : ' month ago');
    }
    years = Math.floor(years);
    return years + (years > 1 ? ' years ago' : ' years ago');
  },

  format: function (totalSeconds) {
    var hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes < 10 && hours !== 0) {
      minutes = "0" + minutes;
    }
    if (hours === 0) {
      return minutes + ":" + seconds
    } else {
      return hours + ":" + minutes + ":" + seconds
    }
  }
}

module.exports = TimeUtil;
