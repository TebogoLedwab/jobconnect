const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Skills = require('../models/skills_schema');

//POST Route
//A route to enter/post default skills
router.post("/default_skills", async (req, res, next) => {

    //Hardcoded default skills that are declared under skills
    let skills =   
    [
        {name:"Cooking"},{name:"Painting"},{name:"Laundry"},
        {name:"Cleaning"},{name:"Driving"},{name:"Paving"},
        {name:"Washing dishes"},{name:"Brickwork"},
        {name:"Handyman"},{name:"Helper"},{name:"Typing"},
        {name:"Gardening"},{name:"Photographer"},{name:"Graphic designing"},
        {name:"Repair"},{name:"Ironing"},{name:"Typing"},{name:"Car maintenance"},{name:"Driving"},{name:"Emergency preparedness"},   
        {name:"First Aid"},{name:"CPR"},{name:"Welding"},
        {name:"General maintenance"},{name:"Videography"},{name:"Grocery shopping"},
        {name:"Thrifting"},{name:"Sewing"},{name:"Making a bed"},
        {name:"Web designing"},{name:"Computer maintenance"},{name:"Taking out the trash"},
        {name:"Tracking personal finances"},{name:"Catering"},
        {name:"Plumbing"},{name:"Vacuuming"},{name:"Washing car"},{name:"Walking pets"},   {name:"Reading"},{name:"Financial planning"},{name:"General organizer"},
        {name:"Advising"},{name:"Coaching"},{name:"Computer programming"},
        {name:"Interviewing"},{name:"Masseuse"},{name:"Motivation"},
        {name:"People management"},{name:"Presentation"},{name:"Reporting"},{name:"Web design"},
        {name:"Hunting"},{name:"Baby sitting"},{name:"Porter"},{name:"Participation"},
        {name:"Refinishing furniture"},{name:"Troubleshooting"},{name:"Observation"},{name:"Web development"},
        {name:"Drawing"},{name:"Woodworking"},{name:"Take surveys"}
    ]; 

    //A method of saving many default skills at once
    await Skills.insertMany(skills,
        (err, data) => {
            if (err)
            {
                return console.log(err);
            }
            else
            {
                res.status(201).json
                ({
                    Skills:data

                });
            }

        });
});

//GET Route
//A route for getting all skills
router.get('/get_all_skills', (req, res, next) => {
    Skills.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
module.exports = router;