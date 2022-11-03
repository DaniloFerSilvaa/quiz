//Initial Data
let currentQuestion = 0;
let correctAnwers = 0;

showQuestion()

//Events
document.querySelector('.scoreArea button').addEventListener('click',()=>{
    currentQuestion = 0;
    correctAnwers = 0;
    showQuestion()
})


//Functions
function showQuestion() {
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];

        let pct =  Math.floor((currentQuestion / questions.length) * 100);

        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        let optionsHtml =  '';
        for(let i in q.options){
           optionsHtml += `<div data-op='${i}' class='option'><span>${parseInt(i)+1}</span>${q.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent)
        })

    }else{
        finishQuiz()
    }
}

function optionClickEvent(e) {
    let clickedOption = e.target.getAttribute('data-op');

    if(questions[currentQuestion].answer == clickedOption){
        console.log('acertou')
        correctAnwers++;
    } else{
        console.log('errou')
    }
    currentQuestion++
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnwers / questions.length)*100);

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim em?!';
        document.querySelector('.scorePct').style.color = '#f00'
    }else if(points>= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!!';
        document.querySelector('.scorePct').style.color = '#ff0'
    }else if(points >= 70){
        document.querySelector('.scoreText1').innerHTML = 'Exelente!!';
        document.querySelector('.scorePct').style.color = '#0d630d'
    }


    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você acertou ${correctAnwers} de ${questions.length} questões`
    
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';

    document.querySelector('.progress--bar').style.width = `100%`



}