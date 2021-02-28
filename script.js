document.addEventListener( "DOMContentLoaded", function(event) {
    event.preventDefault();

    const url = "https://api.spacexdata.com/v4/launches/upcoming";
    fetch(url)
        .then(function(response) {
            return response.json();
        }).then(function(json) {


            let launchpads = []
            let rockets = []
            let output = "";
            for (let i = 0; i < json.length; i++){
              launch = json[i];
              output += '<div class="launch" id=launch' + i  +">"
              
              output += '<div class="launch-header">'
              

              output += "<h2>" + launch.name + "</h2>"
              var launchtime = moment(launch.date_utc).format("MMMM Do YYYY h:mm a")
              output += "<h2>" + launchtime + "</h2>"
              output += '</div>'

              output += '<div class="launch-description">'
              

              
              if (launch.details !== null){
                output += "<p>" + launch.details + "</p>"

                if (launch.links.patch.small !== null){
                  output += "<img class=patch src=" + launch.links.patch.small + "/>";
                }
              }
              else{
                output += "<p>No launch details yet! Stay posted for more info </p>"
              }
              
              

              output += '</div>'
              //output += "<p id="+ launch.rocket+ ">Rocket Info</p>" 
              output += '<div class="launchpad ' + launch.launchpad + '"></div>'
              output += '<div class="rocket ' + launch.rocket + '"></div>'
              if (!launchpads.includes(launch.launchpad)){
                launchpads.push(launch.launchpad)
              }
              if (!rockets.includes(launch.rocket)){
                rockets.push(launch.rocket)
              }

              output += "</div>"
            }

            




            document.getElementById("launch-info").innerHTML = output;

            for (let rocket of rockets){
              updateRocketInfo(rocket)
            }
            
            for (let launchpad of launchpads){
              getLaunchpadInfo(launchpad)
            }
            
            console.log(json);
    });
  });


let updateRocketInfo = function(id){
  
  const url = "https://api.spacexdata.com/v4/rockets/" + id
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json){

      
      let out = "";
      out += '<div class="rocket-info">'
      out += "<h2>Rocket: " + json.name + "</h2>"
      out += "<p>Height: " + json.height.feet + " Feet</p>"
      out += "<p>First Flight: " + json.first_flight + "</p>"
      out += "<p>Success Rate: " + json.success_rate_pct + "%</p>"
      out += "<p>" + json.description + "</p>"
      out += '</div>'

      out += '<img class="rocket-img" src=' + json.flickr_images[0] + "/>"
      


      for (let element of document.getElementsByClassName(id)){
        element.innerHTML = out;
      }
      

    })


}


let getLaunchpadInfo = function(id){
  const url = "https://api.spacexdata.com/v4/launchpads/" + id
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(json){

      
      let out = "";

      out += "<h2>Launchpad: " + json.full_name + "</h2>"
      out += "<p>Launch Attempts: " + json.launch_attempts + "</p>"
      out += "<p>Launch Successes: " + json.launch_successes + "</p>"
      out += "<p>Region: " + json.region + "</p>"
      out += "<p>Latitude: " + json.latitude + "</p>"
      out += "<p>Longitude: " + json.longitude + "</p>"

      for (let element of document.getElementsByClassName(id)){
        element.innerHTML = out;
      }
    })

}