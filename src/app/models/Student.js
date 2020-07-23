const db = require('../../config/db')
const {date, grade} = require('../../lib/utils')


module.exports = {
    all(callback) {
        db.query(`SELECT * 
        FROM students
        ORDER BY name ASC`, function(err, results){
            if (err) throw `Database Error!${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO students (
                name,
                avatar_url,
                email,
                birth,
                school_year,
                workload
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth).iso,
            data.school_year,
            data.workload
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Error!${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query (`SELECT * FROM students WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database Error!${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE students SET
                name=($1),   
                avatar_url=($2),
                email=($3),
                birth=($4),    
                school_year=($5),
                workload=($6)
            WHERE id = $7
        `

        const values = [
            data.name,
            data.avatar_url,
            data.email,
            date(data.birth).iso,
            data.school_year,
            data.workload,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Error!${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database Error!${err}`

            return callback()
        })
    }
}