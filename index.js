var api_key="at_pM51FxxDkeM7unzXDX3vuMz1FfaRQ";
var lat;
var lon;
// var http = require('http');
// var ip = '176.32.98.166';
// var api_key = 'your_api_key';
var isp;
var tz;
var l;
var i;
var initial_lat;
var initial_lon;
var api_url = 'https://geo.ipify.org/api/v1?';

let achenSvgString = "<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='1000'><path d='M2,111 h300 l-242.7,176.3 92.7,-285.3 92.7,285.3 z' fill='#000000'/></svg>"
let myIconUrl = encodeURI("data:image/svg+xml," + achenSvgString).replace('#','%23');
var mymap=L.map('mapid');



  

// var loc=await getLocation();

// const initializeMap =async ()=>{
// var loc=await getLocation();
// console.log(loc);
// }

async function initialize_map(){
    // var loc =await getLocation();
   mymap.setView([39.04372,-77.48749], 10);  
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoidXNlcjE5OSIsImEiOiJja3BnanBrbHAyaGlvMm9ubGRmZHk5ZzMwIn0.pYCDSbruoLHSla59e6FkyA'
}).addTo(mymap);
L.marker([39.04372,-77.48749]).addTo(mymap);

console.log("map");

}


initialize_map();




document.getElementById('btt').addEventListener('click',function(e){
  let x=document.getElementById('ipa').value;
  e.preventDefault();
  if(x==''){
    alert('Enter IP');
  }
  else{
    console.log(x);
    
    var url = api_url + 'apiKey=' + api_key + '&ipAddress=' + x;
    const getData=async () =>{
      try{
        const response=await fetch(url);
        const data=await response.json();
        console.log(data);
        if(data.code==422){
          alert(data.messages);
        }
        
        isp=data.isp;
        tz=data.location.timezone;
        l=data.location.city;
        i=data.ip;
        // console.log(isp);
        // console.log(tz);
        // console.log(l);
        // document.getElementById('ip_add').innerHTML(`${i}`);
        let r=[data.location.lat,data.location.lng];
        console.log(r);
        return r;
      }
      catch{
        // const response=await fetch(url);
        alert(response.status);
        alert(data.messages);
      }
    }

    


    const viewMap =async () => {
      const value = await getData();
      console.log(value);
      // console.log("In the map");
      mymap.removeLayer(L.marker);
      mymap.flyTo(value,12);
      L.marker(value).addTo(mymap);  
      document.getElementById('ip_add').innerHTML=i;
      document.getElementById('location').innerHTML=l;
      document.getElementById('time_zone').innerHTML="UTC"+tz;
      document.getElementById('isp').innerHTML=isp;
    }
    viewMap();
  }
  
})






