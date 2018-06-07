// Foursquare API Info
const clientId = 'IHY5FUW1TKABZMMAPWEDXMSFDUI40BT0S01C0EWHZ4PUGT3J';
const clientSecret = 'P1NPME4VBIXTF1VSBVINQUFJFUESWIA5ZZ24VJ0ZKIXULO2V';
const url = 'https://api.foursquare.com/v2/venues/explore?near=';

// APIXU Info
const apiKey = '2608f57a49244beebdb200012180805';
const forecastUrl = 'http://api.apixu.com/v1/forecast.json?key=';

// Page Elements
const $input = $('#city');
const $submit = $('#button');
const $destination = $('#destination');
const $container = $('.container');
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [$("#weather1"), $("#weather2"), $("#weather3"), $("#weather4")];
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Add AJAX functions here:
//forsquare (venue) response object
const getVenues = async () => {
const city = $input.val();
//v=version parameter(todays date YYYMMDD), limit=number of venues we wish to return
const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20180508`;
/*or
const urlToFetch = url + city + '&limit=10&client_id=' + clientId + '&client_secret=' + clientSecret + '&v=20180401';*/
  try{ const response = await fetch(urlToFetch);
      if(response.ok){
        const jsonResponse = await response.json();
        //console.log(jsonResponse);
        /*saving some of the object from the console in a var venues: the response property(object), the groups property(array, save the firselement, the items property(array of venue data))
        let venues = jsonResponse.response.groups[0].items;
        console.log(venues);
        //look in the console, there will be an array for the limit parameter, we need the venue property, use map() to save the venues, so the var will change to: */
        let venues = jsonResponse.response.groups[0].items.map(item => item.venue);
        console.log(venues);
        return venues;
       
        //code to execute with JSON response
      }
    
  }catch(error){console.log(error);
    
}
};
//apixu (forecast) response object
const getForecast = async () => {
//q parameter=location query(value of the users input), days= number of days to retrieve,hour= time of day to retrieve the weather  
  
  const urlToFetch = `${forecastUrl}${apiKey}&q=${$input.val()}&days=4&hour=11`;
  try{ let response = await fetch(urlToFetch);
      if(response.ok){
        const jsonResponse = await response.json();
  //when use console.log(jsonResponse); in the consile will see blocked message, copy the url and paste in new tab, use jsbeautifier.com or json view to look at the code
 // we take forecast.forecastday from the code
       const days =  jsonResponse.forecast.forecastday;
        console.log(days);
        return days;
      }
    
  }catch(error){
  console.log(error);
}
};


// Render functions
//renderVenues calls forEach function on the $venueDivs array(array of the <div>s in index.html, where we will render the info returned in the response from the forsquare api) 
const renderVenues = (venues) => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
     const venue = venue[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;
    let venueContent = createVenueHTML(venue.name, venue.location, venueIMGSrc);
    $venue.append(venueContent);
  });
  $destination.append('<h2>' +venues[0].location.city +'</h2>');
}

const renderForecast = (days) => {
  $weatherDivs.forEach(($day, index) => {
    // Add your code here:
const currentDay = days[index];
    
    let weatherContent = createWeatherHtml(currentDay);
    $day.append(weatherContent);
  });
}

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
}

$submit.click(executeSearch)

