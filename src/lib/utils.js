module.exports = {
    age(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth()- birthDate.getMonth()

        if (month<0 || month==0 && today.getDate()<birthDate.getDate()) {
            age = age - 1
        }
        return age
    },

    graduation(educational_level) {
        const education = educational_level
        if (education=="valor1") return ("Ensino Médio Completo")
        if (education=="valor2") return ("Ensino Superior Completo")
        if (education=="valor3") return ("Mestrado")
        if (education=="valor4") return ("Doutorado")
    },
    
    date(timestamp) {
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)
        return `${day}/${month}/${year}`
    },

    date2(timestamp) {
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)
        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`
        }
    },
    grade(school_year){
        const school = school_year
        if (school=="5ef") return ("5º Ano do Ensino Fundamental")
        if (school=="6ef") return ("6º Ano do Ensino Fundamental")
        if (school=="7ef") return ("7º Ano do Ensino Fundamental")
        if (school=="8ef") return ("8º Ano do Ensino Fundamental")
        if (school=="1em") return ("1º Ano do Ensino Médio")
        if (school=="2em") return ("2º Ano do Ensino Médio")
        if (school=="3em") return ("3º Ano do Ensino Médio")
    }
}