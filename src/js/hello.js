function message() {
  var currentTime = new Date();
  currentTime.getHours();
  var currentHour = currentTime.getHours();

  let greet;
  if (currentHour < 12)
    greet = 'Good Morning, ';
  else if (currentHour <= 17)
    greet = 'Good Afternoon, ';
  else if (currentHour <= 24)
    greet = 'Good Evening, ';
  
  return greet;
}

const el = document.querySelector('#welcome-message');
el.firstChild.textContent = message();