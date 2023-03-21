window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTmezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${long}?key=9Z8A4DBZDSZ4VSEY7XC9K4KJQ`;
            
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temp, conditions, icon} = data.currentConditions;
                temperatureDegree.textContent = Math.floor(temp);
                temperatureDescription.textContent = conditions;
                locationTmezone.textContent = data.timezone;
               
            

                let celcius = (temp - 32) * (5 / 9); 

                setIcons(icon,document.querySelector('.icon'));

                temperatureSection.addEventListener('click',() => {
                    if(temperatureSpan.textContent === "F"){
                        temperatureSpan.textContent = "C"; 
                        temperatureDegree.textContent = Math.floor(celcius); 
                    }else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temp);
                    }
                })
            });
        });
    }

    
    function setIcons(icon,iconId){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});