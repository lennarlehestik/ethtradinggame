var myStorage = window.localStorage;
var ethprice = 2113.35
var ethbalanceeth = 2
var dollarbalance = 500
var miners = 0;
var minerprice = 500;
var coolingprice = 1000;
var totalmined = 0;
var error = "";
var count = 5;
var miningpower = 0.01
var miningpowerprice = 2000

var cats = [2120,2111,2115,2133,2145,2123.35,2113.35]

document.getElementById("miningpower").innerHTML = miningpower
document.getElementById("miningpowerprice").innerHTML = miningpowerprice
document.getElementById("totalmined").innerHTML = totalmined
document.getElementById("miners").innerHTML = miners
document.getElementById("minerprice").innerHTML = minerprice
document.getElementById("ethprice").innerHTML = ethprice
document.getElementById("dollarbalance").innerHTML = dollarbalance
document.getElementById("ethbalanceeth").innerHTML = ethbalanceeth
document.getElementById("dollarbalanceeth").innerHTML = ethbalanceeth * ethprice

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function setError(error){
swal({
  buttons: false,
  timer: 2000,
  text:error
});
}

function buyminer(){
  if(dollarbalance >= minerprice){
  dollarbalance-=minerprice
  document.getElementById("dollarbalance").innerHTML = dollarbalance.toFixed(2)
  miners+=1
  document.getElementById("miners").innerHTML = miners
  minerprice+=100
  document.getElementById("minerprice").innerHTML = minerprice
  document.getElementById("computerbox").innerHTML += "<img id='gpupic' style='margin-bottom:1px;margin-right:5px;width:150px;' src='https://i.postimg.cc/MHT1Srqk/nvid.png'/>";
  }
  else{
    setError("You don't have enough $.")
  }
}

setInterval(()=>{
  ethbalanceeth = ethbalanceeth + (miningpower * miners)
  totalmined += miningpower * miners
  document.getElementById("totalmined").innerHTML = totalmined.toFixed(2)
  document.getElementById("ethbalanceeth").innerHTML = ethbalanceeth.toFixed(2)
  document.getElementById("dollarbalanceeth").innerHTML = (ethbalanceeth * ethprice).toFixed(2)
},5000)

function buyminingpower(){
  if(dollarbalance >= miningpowerprice){
  dollarbalance-=miningpowerprice
  document.getElementById("dollarbalance").innerHTML = dollarbalance.toFixed(2)
  miningpower+=0.01
  document.getElementById("miningpower").innerHTML = miningpower
  miningpowerprice+=1000
  document.getElementById("miningpowerprice").innerHTML = miningpowerprice
  }
  else{
    setError("You don't have enough $.")
  }
}

function mine(){
  document.getElementById("mine").disabled = "true"
  document.getElementById("mine").style.backgroundColor = "#e74c3c"
  var time = 0;
  for (var i = 0; i < 20; i++) {
    setTimeout(function() {
      var width = document.getElementById("mineprogressfill").offsetWidth
      console.log(width)
      var newwidth = parseInt( width ) + 5 + "%";
      document.getElementById("mineprogressfill").style.width = newwidth
    }, 250 * i);
  }
  setTimeout(function() {
      document.getElementById("mineprogressfill").style.width = "0%"
    }, 5000);
  setTimeout(()=>{
  document.getElementById("mine").disabled = false
  document.getElementById("mine").style.backgroundColor = "#2980b9"
  ethbalanceeth = ethbalanceeth + miningpower
  totalmined += miners > 0 ? miningpower * miners : miningpower
  document.getElementById("totalmined").innerHTML = totalmined.toFixed(2)
  document.getElementById("ethbalanceeth").innerHTML = ethbalanceeth.toFixed(2)
  document.getElementById("dollarbalanceeth").innerHTML = (ethbalanceeth * ethprice).toFixed(2)
  },5000)
}

function buyeth(){
  const buyamount = Number(document.getElementById("buy").value)
  if(dollarbalance > buyamount * ethprice){
    dollarbalance-=Number(buyamount * ethprice)
    document.getElementById("dollarbalance").innerHTML = dollarbalance.toFixed(2)
    ethbalanceeth = ethbalanceeth + buyamount
    document.getElementById("ethbalanceeth").innerHTML = ethbalanceeth.toFixed(2)
    document.getElementById("dollarbalanceeth").innerHTML = (ethbalanceeth * ethprice).toFixed(2)
  }
  else{
    setError("You don't have enough $.")
  }
}

function selleth(){
  const sellamount = Number(document.getElementById("sell").value)
  if(ethbalanceeth >= sellamount){
    ethbalanceeth = ethbalanceeth - sellamount
    dollarbalance = dollarbalance + sellamount * ethprice
    document.getElementById("dollarbalance").innerHTML = dollarbalance.toFixed(2)
    document.getElementById("ethbalanceeth").innerHTML = ethbalanceeth.toFixed(2)
    document.getElementById("dollarbalanceeth").innerHTML = (ethbalanceeth * ethprice).toFixed(2)
  }
  else{
    setError("You don't have enough ETH.")
  }
}

const events = {
  0:{event:"NYTimes said ETH can't scale.",change:-1.1},
  1:{event:"Elon musk bought some ETH!", change:+1.3},
  2:{event:"CryptoKitties launched a new version.", change:+1.1},
  3:{event:"Legislators consider criminalizing ETH use.", change:-1.3},
  4:{event:"EOSETF now sold on Ethereum.", change:+1.3},
  5:{event:"ETH said to be used for illegal activities.", change:-1.3},
  6:{event:"Surprisingly, ETH price 10% up today.", change:+1.1},
  7:{event:"Unexpected, ETH price 10% down today.", change:+1.1}
}

const eventlength = Object.keys(events).length;

setInterval(function(){
  if(miners > 0){
    for (var i = 0; i < 20; i++) {
    setTimeout(function() {
      var width = document.getElementById("automineprogressfill").offsetWidth
      console.log(width)
      var newwidth = parseInt( width ) + 5 + "%";
      document.getElementById("automineprogressfill").style.width = newwidth
    }, 250 * i);
  }
  setTimeout(function() {
      document.getElementById("automineprogressfill").style.width = "0%"
    }, 5000);
  }
},5000)

setInterval(function(){
  const cryptoevent = getRandomInt(eventlength)
  ethprice+=Number((getRandomInt(ethprice/100) * events[cryptoevent].change).toFixed(2))
  document.getElementById("ethprice").innerHTML = ethprice.toFixed(2)
  document.getElementById("news").innerHTML = events[cryptoevent].event
  document.getElementById("ethbalanceeth").innerHTML = ethbalanceeth.toFixed(2)
  document.getElementById("dollarbalanceeth").innerHTML = (ethbalanceeth * ethprice).toFixed(2)
  cats.shift()
  cats.push(ethprice)
  console.log(cats)
  chart.update();
}, 5000);

var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
	// The type of chart we want to create
	type: 'line',
	// The data for our dataset
	data: {
		labels: ["6h ago","5h ago","4h ago","3h ago", "2h ago", "1h ago", "Current"],
		// Information about the dataset
    datasets: [{
			label: "Rainfall",
			backgroundColor: 'lightblue',
			borderColor: 'royalblue',
			data: cats,
      fill: false
		}]
	},

	// Configuration options
	options: {
    layout: {
      padding: 5,
    },
		legend: {
			display: false
		},
		title: {
			display: true,
			text: 'ETH Price in USD'
		},
        animation: {
        duration: 0
    },
		scales: {
			yAxes: [{
        ticks: {
          suggestedMin: 2100,
          suggestedMax:2200
        },
				scaleLabel: {
					display: true,
					labelString: 'ETH Price'
				}
			}],
			xAxes: [{
				scaleLabel: {
					display: true,
					labelString: 'Time'
				}
			}]
		}
	}
});