const express = require('express');
const Campground = require('../models/campground')
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers')
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '641c53255e5c5a216462c41c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis nisi cum praesentium reprehenderit quidem, eaque repudiandae alias optio, quia aliquam mollitia dolorum dignissimos. Odio quos eius, ipsa ad perferendis distinctio.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dywttargv/image/upload/v1679767315/YelpCamp/lx7dq9cvmnzfzxt2oc7u.jpg',
                    filename: 'YelpCamp/lx7dq9cvmnzfzxt2oc7u',
                },
                {
                    url: 'https://res.cloudinary.com/dywttargv/image/upload/v1679767317/YelpCamp/skmdo9vubtpsaigk0lud.jpg',
                    filename: 'YelpCamp/skmdo9vubtpsaigk0lud',
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})

