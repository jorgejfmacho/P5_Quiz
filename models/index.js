const Sequelize = require('sequelize');

const sequelize = new Sequelize("sqlite:quizzes.sqlite", { logging: false, operatorsAliases: false});

sequelize.define(
    'quiz',
    { question: {
            type: Sequelize.STRING,
            unique: { msg: "La pregunta ya existe"},
            validate: { notEmpty:{msg: "El campo de la pregunta no puede estar vacío"}}
        },
        answer: {
            type: Sequelize.STRING,
            validate: {notEmpty: {msg: "El campo de la respuesta no puede estar vacío"}}
        }
    }
);

sequelize.sync()
    .then(() => sequelize.models.quiz.count())
    .then((count) => {
    if (!count) {
    return sequelize.models.quiz.bulkCreate([
        { question: "Capital de Italia", answer: "Roma"},
        { question: "Capital de Francia", answer: "París"},
        { question: "Capital de España", answer: "Madrid"},
        { question: "Capital de Portugal", answer: "Lisboa"}
    ]);


}
})
.catch( error => {console.log(error)
});
module.exports=sequelize;