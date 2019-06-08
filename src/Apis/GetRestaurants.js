import React, { Component } from 'react';

fetch('https://s3.amazonaws.com/br-codingexams/restaurants.json')
  .then(res => res.json())
  .then(json => {
    this.setState({
      isLoaded: true,
      items: json,
    })
  });

export default Example;
