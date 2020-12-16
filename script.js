//Quiz DATA
const quizData = [
	{
		question:
			'How many active full subscription website customers EDealer has?',
		url: 'images/1.png',
		a: 'About a 600',
		b: ' Almost 900',
		c: '1000',
		d: ' More than 1100',
		correct: 'c',
	},
	{
		question: 'What position does the person in the photo below hold?',
		url: 'images/2.png',
		a: 'President',
		b: 'CEO',
		c: 'CTO',
		d: 'Vice President',
		correct: 'a',
	},
	{
		question: 'What position does the person in the photo below hold?',
		url: 'images/3.png',
		a: 'President',
		b: 'CEO',
		c: 'CTO',
		d: 'Vice President',
		correct: 'b',
	},
	{
		question: 'How much is the Accelerate Local SEO package/month?',
		a: '$250',
		b: '$500',
		c: '$120',
		d: 'FREE',
		url: 'images/4.png',
		correct: 'b',
	},
	{
		question: 'What year was EDealer founded?',
		url: 'images/5.png',
		a: '1997',
		b: '2001',
		c: '2004',
		d: '2008',
		correct: 'c',
	},
	{
		question: 'What is the tagline for EDealer?',
		url: 'images/6.png',
		a: 'Experts in online car sales',
		b: "It's all about time",
		c: 'Specialists in online car sales',
		d: 'Experts in car sales',
		correct: 'a',
	},
	{
		question: 'Which of the following advertising services do we NOT offer?',
		url: 'images/7.png',
		a: 'Video Advertising',
		b: 'Search Advertising',
		c: 'Broadcast Advertising',
		d: 'Social Advertising',
		correct: 'c',
	},
	{
		question: 'How often do EInc Townhalls happen?',
		url: 'images/8.png',
		a: 'Bi-weekly',
		b: 'Bi-monthly',
		c: 'Monthly',
		d: 'Every 6 weeks',
		correct: 'd',
	},
	{
		question: 'Which one of the following are we NOT OEM certified with?',
		url: 'images/9.png',
		a: 'Toyota',
		b: 'Mazda',
		c: 'Maserati',
		d: 'Subaru',
		correct: 'a',
	},
	{
		question: 'What is EBlock?',
		url: 'images/10.png',
		a: 'Official dealership of EDealer',
		b: 'EDealers website package',
		c: 'An online dealer to dealer auction',
		d: 'Just a nice guy',
		correct: 'c',
	},
];
//DOM ELEMENTS
const quizWrap = document.getElementById('quiz-wrapper');
const submit = document.getElementById('btn');
const progress = document.getElementById('progress-bar');
const submitWrap = document.querySelector('.submit-wrapper');

let correct;
let score = 0;
let qNum;

//Quiz CLASS
class Quiz {
	constructor(questions) {
		this.question = questions.question;
		this.url = questions.url;
		this.a = questions.a;
		this.b = questions.b;
		this.c = questions.c;
		this.d = questions.d;
		this.correct = questions.correct;
	}

	getCorrect() {
		return this.correct;
	}

	renderQuiz() {
		return `
		<div class="card  text-center" id="quiz-card">
		<div class="card-header font-weight-bold">
			${this.question}
		</div>
		<img
			style="width: 50%; margin: 0 auto"
			class="card-img-top rounded-circle p-3"
			src="${this.url}"
			alt="Card image cap"
		/>
		<div class="card-body">
			<!-- ANSWER -->
			<h5 class="card-title">Chose correct answer</h5>
			<ul class="list-group">
				<li class="list-group-item border-0 text-left">
					<input type="radio" id="a" name="quiz" value="a" />
					<label for="a">${this.a}</label><br />
				</li>
				<li class="list-group-item border-0 text-left">
					<input type="radio" id="b" name="quiz" value="b" />
					<label for="b">${this.b}</label><br />
				</li>
				<li class="list-group-item border-0 text-left">
					<input type="radio" id="c" name="quiz" value="c" />
					<label for="c">${this.c}</label><br />
				</li>
				<li class="list-group-item border-0 text-left">
					<input type="radio" id="d" name="quiz" value="d" />
					<label for="d">${this.d}</label><br />
				</li>
			</ul>
		</div>
	</div>
        `;
	}

	appendQuiz() {
		//append quiz to the quiz wrapper
		let node = document.createElement('div');

		// quizWrap.appendChild(node);
		node.innerHTML = this.renderQuiz();

		quizWrap.insertBefore(node, submitWrap);
	}
}

// FUNCTIONS
//Check if radio waw selected
function checkSelected() {
	let radios = document.querySelectorAll('input');
	let checked;
	radios.forEach((radio) => {
		if (radio.checked) {
			checked = radio.value;
		}
	});
	return checked;
}
//Shuffle array
function shuffle(a) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

// ==> !!! <===
// Render first Question after document loaded
document.addEventListener('DOMContentLoaded', () => {
	//shuffle
	// shuffle(quizData);
	//append first quiz to the DOM
	let quizObj = quizData.shift();
	const q = new Quiz(quizObj);
	q.appendQuiz();
	correct = q.getCorrect();
	qNum = 1;
});

submit.addEventListener('click', (e) => {
	e.preventDefault();
	let selected = checkSelected();
	if (selected) {
		progress.style.width = qNum * 10 + '%';
		//Check Answer
		if (correct === selected) {
			score += 1;
			//add correct class
		}
		// If wrong answer
		if (correct !== selected) {
			//add alert-danger classs
		}
		//shift quiz from array
		let quizObj = quizData.shift();
		//check if it is not empty
		if (quizObj) {
			qNum++;

			// remove previos
			document.getElementById('quiz-card').remove();
			let q = new Quiz(quizObj);
			q.appendQuiz();
			correct = q.getCorrect();
		} else {
			if (score <= 5) {
				quizWrap.innerHTML = `
			<div class="card">
				<div class="card-body text-center">
									<img
						class="card-img-top p-3"
						src="images/poor.jpg"
						alt="Card image cap"
					/>
					<cite>"Low Marks Again" author F. Reshetnikov</cite>
					<h3>Womp womp....you need to brush up on your EDealer knowledge!</h3>
					<p class="card-text alert-danger p-3">Your score is <b>${score}</b> of 10</p>
				</div>
			</div>`;
			} else if (score > 5 && score < 9) {
				// Show Good results
				quizWrap.innerHTML = `
			<div class="card">
				<div class="card-body text-center">
									<img
						class="card-img-top p-3"
						src="images/good.png"
						alt="Card image cap"
					/>
					<h3>Your EDealer knowledge is good!</h3>
					<p class="card-text alert-info p-3">Your score is <b>${score}</b> of 10</p>
				</div>
			</div>`;
			} else {
				// Show Perfect results
				quizWrap.innerHTML = `
			<div class="card">
				<div class="card-body text-center">
									<img
						class="card-img-top p-3"
						src="images/expert.png"
						alt="Card image cap"
					/>
					<h3>You're an EDealer Expert!</h3>
					<p class="card-text alert-success p-3">Your score is <b>${score}</b> of 10</p>
				</div>
			</div>`;
			}
		}
	}
});
