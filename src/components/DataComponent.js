import React, { Component } from 'react'
import '../styles/App.css'




class Data extends Component {

            constructor(props) {
            super(props);
            this.state = {
              items: {},
              isLoaded: false,
              isClicked: false
            };
            this.handleClick = this.handleClick.bind(this);
          }


          handleClick() {
            this.setState(state => ({
              isClicked: true,
              item: this.state.item,
            }));

          }


          componentDidMount() {
            fetch('https://s3.amazonaws.com/br-codingexams/restaurants.json')
              .then(res => res.json())
              .then(json => {
                this.setState({
                  isLoaded: true,
                  items: json,
                })
              });

          }

            render() {
            let formattedPhone = "formattedPhone";
            var twitter = '@';

            var { isLoaded, items } = this.state;

            if (!isLoaded) {
              return <div>Loading...</div>;
            }

            else {
                for (let i = 0; i < items.restaurants.length; i++) {
                formattedPhone = items.restaurants[i].contact.formattedPhone;
                twitter = items.restaurants[i].contact.twitter;
          return (
            <div>
               
	

                    {items.restaurants.map(item => ( <div className="name" key={item.name}>
                    <div className="detail-name">{item.name}</div>
                    <div className="detail-category">{item.category}</div>
					<li className="detail-address">{item.location.address}, <br />{item.location.city}, {item.location.state}, </li>
              
                    

                 
                 <li className="detail-phone">{formattedPhone}</li>
                <li className="detail-twitter">@{twitter}</li>

					
					


  </div>

                    ))}


      </div>

    )}
}
}
}

export default Data;
