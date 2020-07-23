const {age, date, grade, graduation} = require('../../lib/utils')
const Teacher = require('../models/Teacher')

module.exports = {
    index(req, res){
        Teacher.all(function(teachers){
            return res.render("teachers/index", { teachers })

        })
        
    },
    create(req, res){
        return res.render('teachers/create')
    },
    post(req, res){
        const keys = Object.keys(req.body)
        for(key of keys) {
            if(req.body[key]=="") {
                return res.send('Please, fill all fields!')
            }
        }

        Teacher.create(req.body, function(teacher){
            return res.redirect(`/teachers/${teacher.id}`)
        })
    },
    show(req, res){
        Teacher.find(req.params.id, function(teacher){
            if (!teacher) return res.send("Teacher not Found!")

            teacher.age = age(teacher.birth)
            teacher.graduation = graduation(teacher.educational_level)
            teacher.occupation = teacher.occupation.split(",")
            teacher.created_at = date(teacher.created_at).format

            return res.render("teachers/show", {teacher})
        })
    },
    edit(req, res){
        Teacher.find(req.params.id, function(teacher){
            if (!teacher) return res.send("Teacher not Found!")

            teacher.birth = date(teacher.birth).iso
            teacher.graduation = graduation(teacher.educational_level)

            return res.render("teachers/edit", {teacher})
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)
        for(key of keys) {
            if(req.body[key]=="") {
                return res.send('Please, fill all fields!')
            }
        }
        
        Teacher.update(req.body, function(){
            return res.redirect(`teachers/${req.body.id}`)
        })
    },
    delete(req, res){
        Teacher.delete(req.body.id, function(){
            return res.redirect("/teachers")
        })
    }
}