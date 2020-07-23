const db = require('../../config/db')
const {date, grade} = require('../../lib/utils')


module.exports = {
    all(callback) {
        db.query(`SELECT * 
        FROM teachers
        ORDER BY name ASC`, function(err, results){
            if (err) throw `Database Error!${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO teachers (
                name,
                avatar_url,
                birth,
                educational_level,
                type_class,
                created_at,
                occupation
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            date(data.birth).iso,
            data.educational_level,
            data.type_class,
            date(Date.now()).iso,
            data.occupation
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Error!${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query (`SELECT * FROM teachers WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database Error!${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE teachers SET
                avatar_url=($1),
                name=($2),    
                birth=($3),    
                educational_level=($4),    
                type_class=($5),    
                occupation=($6)
            WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.educational_level,
            data.type_class,
            data.occupation,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw `Database Error!${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err, results){
            if (err) throw `Database Error!${err}`

            return callback()
        })
    }
}