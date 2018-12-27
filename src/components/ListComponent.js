import React, { Component } from 'react'
import '../styles/App.css'
import Nav from './NavComponent'
import gradient from '../images/x.png';
import Detail from './DetailComponent'


import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch,
	Redirect
} from 'react-router-dom'


class List extends Component {

	constructor(props) {
		super(props);
			this.state = {
				items: {},
				isLoaded: false,
				isClicked: false,
				item: 0,
			};
		this.handleClick = this.handleClick.bind(this);
	}


	handleClick() {
		this.setState(state => ({
			isClicked: true,
			item: state.item,
		}));
	}


	componentDidMount() {
		fetch('https://s3.amazonaws.com/br-codingexams/restaurants.json')
		.then(res => res.json())
		.then(json => 
			this.setState({
				isLoaded: true,
				items: json,
			})
		);
	}

	render() {
		var mapLocation = [];
		var latitude;
		var longitude;
		var { isLoaded, items } = this.state;

		if (!isLoaded) {
			return <div>Loading...</div>;
		}

		else {

		return (
			<div className="list">

				<Nav />

				{items.restaurants.map(item => ( 

					<div className="list-pic" key={item} style={{ backgroundImage: `url(${item.backgroundImageURL})`, height: "180px" }}>

{mapLocation.push(item.location.lat)}
{mapLocation.push(item.location.lng)}


					<button onClick={this.handleClick} key={item}>

					

						{this.state.isClicked ? console.log(item): ' '}
			
					
					</button>
				
						<img className="list-gradient" src={gradient} alt={"Gradient"} width="100%" height= "180px" />

						<div className="list-name">{item.name}</div>

						<div className="list-category">{item.category}</div>

					</div>

				))}
		

			</div>

		)
	
		}
	}
}

export default List

/*return (
var { isLoaded, items } = this.state;
let { item } = [];
let { latitude } = 34;
let { longitude } = 68;
var backgroundImageURL ="";
let name = "name";
let category = "category";
let formattedAddress = [formattedAddress];
let formattedPhone = "formattedPhone";
var twitter = '@';
var address = "";
var city = "";
var state = "";
twitter.concat('twitter');
//  let category = "";
let phone = 9999999999;

if (!isLoaded) {
return <div>Loading...</div>;
}

else {
var restaurants = { ...items }
};

for (let i = 0; i < items.restaurants.length; i++) {
latitude = items.restaurants[i].location.lat;
longitude = items.restaurants[i].location.lng;
item = [latitude, longitude];
backgroundImageURL = items.restaurants[i].backgroundImageURL;
name = items.restaurants[i].name;
category = items.restaurants[i].category;
phone = items.restaurants[i].contact.phone;
formattedPhone = items.restaurants[i].contact.formattedPhone;
twitter = items.restaurants[i].contact.twitter;
formattedAddress = items.restaurants[i].location.formattedAddress;
address =  items.restaurants[i].location.address;

//  this.newMethod(item);
<h4>Detail map page</h4>
<li>{item}</li>
<li>{name}</li>
<li>{formattedAddress}</li>
<li>{formattedPhone}</li>
<li><a href="#" target="_blank">@{twitter}</a></li>
<div>
<a href="/detail" onClick={this.handleClick} style={{ top: "0", bottom: "0px", height: "185px", width: "100%" }}>
{this.state.isClicked ? <Detail marker={[...item]} /> : ''}
</a>

<div className="App-pic" key={item} style={{ backgroundImage: `url(${backgroundImageURL})`, 	top: "0", height: "185px" }}>
/
{restaurants.restaurants.map(item => ( <div className="App-pic" key={item} style={{ backgroundImage: `url(${item.backgroundImageURL})`, height: "185px" }}>
<li><button onClick={this.handleClick}>
{this.state.isClicked ? <Detail marker={[...item]} />: 'OFF'}</button></li>
<img className="grad" src={gradient} alt={"Gradient"} width="100%" height= "185px" />
<div className="App-name">{item.name}</div>
<div className="App-category">{item.category}</div>
</div>

))}
</div>
);}*/

