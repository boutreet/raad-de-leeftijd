(function () {
'use strict';

const CONFIG = {
  enablePeriodQuestion: true,
  ageBuckets: ['10-12','13-15','16-18','18-25','25-35','35-50','50+'],
  shuffleQuestions: true,
  pointsCorrectAge: 10,
  pointsCorrectPeriod: 5,
  pointsWrong: 0,
  conclusions: {
    high: 'Uitstekend! Je hebt een scherp oog voor historische portretten.',
    medium: 'Goed gedaan! Met wat meer oefening wordt je blik nog scherper.',
    low: 'Er valt nog veel te ontdekken. Kijk eens goed naar de details in elk gezicht.'
  }
};

const DATA = [
{
id:'p1',
title:'Het vrolijke huisgezin',
artist:'Jan Steen',
year:1668,
period:'golden',
image:'images/p1.jpg',
actualAge:7,
apparentAgeBucket:'10-12',
explanation:'Dit schilderij toont kinderen die roken, drinken en feesten — gedragingen die normaal bij volwassenen horen.',
analysis:{
uiterlijk:'Ronde kindergezichten, maar gekleed en gedragend als volwassenen.',
houding:'Ontspannen en feestend.',
activiteit:'Roken van een pijp, drinken van wijn.',
context:'Huishouden in feestsfeer.'
}
},
{
id:'p2',
title:'De Luitspeler',
artist:'Frans Hals',
year:1623,
period:'golden',
image:'images/p2.jpg',
actualAge:12,
apparentAgeBucket:'16-18',
explanation:'Muziek spelen was een teken van goede opvoeding.',
analysis:{
uiterlijk:'Glad gezicht zonder baardgroei.',
houding:'Zelfverzekerd.',
activiteit:'Luit spelen.',
context:'Culturele ontwikkeling.'
}
}
];

let queue=[];
let currentIndex=0;
let score=0;
let correctAge=0;
let correctPeriod=0;

const $=id=>document.getElementById(id);

const screens={
intro:$('screen-intro'),
question:$('screen-question'),
feedback:$('screen-feedback'),
end:$('screen-end')
};

function shuffle(arr){
for(let i=arr.length-1;i>0;i--){
const j=Math.floor(Math.random()*(i+1));
[arr[i],arr[j]]=[arr[j],arr[i]];
}
return arr;
}

function showScreen(name){
Object.values(screens).forEach(s=>s.classList.remove('active'));
screens[name].classList.add('active');
$('site-header').classList.toggle('hidden',name==='intro');
}

function updateHeaderScore(){
$('header-score').textContent=`Score: ${score}`;
}

function updateProgress(){
const total=queue.length;
const done=currentIndex;
const pct=total?(done/total)*100:0;
$('progress-bar').style.width=pct+'%';
$('progress-label').textContent=`Vraag ${done+1} / ${total}`;
}

function periodLabel(v){
const map={before:'Vóór de Gouden Eeuw',golden:'Gouden Eeuw',after:'Na de Gouden Eeuw'};
return map[v]||v;
}

function getRadioValue(name){
const el=document.querySelector(`input[name="${name}"]:checked`);
return el?el.value:null;
}

function clearRadios(name){
document.querySelectorAll(`input[name="${name}"]`).forEach(r=>r.checked=false);
}

function renderIntro(){
document.querySelector('.intro-hint').textContent=`${DATA.length} portretten`;
showScreen('intro');
}

function renderQuestion(){
const portrait=queue[currentIndex];

updateProgress();
updateHeaderScore();

const img=$('painting-img');
img.src=portrait.image;
img.alt=portrait.title;

$('painting-meta').textContent='';

const ageGroup=$('age-options');
ageGroup.innerHTML='';

CONFIG.ageBuckets.forEach(bucket=>{
const label=document.createElement('label');
label.className='radio-card';
label.innerHTML=`
<input type="radio" name="age" value="${bucket}">
<span class="radio-label">${bucket} jaar</span>`;
ageGroup.appendChild(label);
});

$('period-section').style.display=CONFIG.enablePeriodQuestion?'':'none';

clearRadios('age');
clearRadios('period');

$('btn-confirm').disabled=true;

ageGroup.addEventListener('change',validateConfirm);
$('period-options').addEventListener('change',validateConfirm);

showScreen('question');
}

function validateConfirm(){
const ageOk=getRadioValue('age')!==null;
const periodOk=!CONFIG.enablePeriodQuestion||getRadioValue('period')!==null;
$('btn-confirm').disabled=!(ageOk&&periodOk);
}

function renderFeedback(chosenAge,chosenPeriod){
const portrait=queue[currentIndex];

const ageCorrect=chosenAge===portrait.apparentAgeBucket;
const periodCorrect=CONFIG.enablePeriodQuestion?chosenPeriod===portrait.period:null;

let delta=0;

if(ageCorrect){delta+=CONFIG.pointsCorrectAge;correctAge++;}
else{delta+=CONFIG.pointsWrong;}

if(periodCorrect){delta+=CONFIG.pointsCorrectPeriod;correctPeriod++;}
else if(periodCorrect===false){delta+=CONFIG.pointsWrong;}

score+=Math.max(delta,0);

updateHeaderScore();

$('feedback-img').src=portrait.image;

$('feedback-meta').textContent=
`${portrait.title} — ${portrait.artist} (${portrait.year})`;

const verdictAge=$('verdict-age');
verdictAge.className='verdict-row '+(ageCorrect?'verdict-correct':'verdict-wrong');
verdictAge.textContent=ageCorrect?'Leeftijd goed geraden!':'Leeftijd niet correct';

const verdictPeriod=$('verdict-period');

if(CONFIG.enablePeriodQuestion){
verdictPeriod.style.display='';
verdictPeriod.className='verdict-row '+(periodCorrect?'verdict-correct':'verdict-wrong');
verdictPeriod.textContent=periodCorrect?
`Periode correct: ${periodLabel(portrait.period)}`:
`Periode onjuist — het was: ${periodLabel(portrait.period)}`;
}else{
verdictPeriod.style.display='none';
}

$('fb-chosen-age').textContent=chosenAge+' jaar';
$('fb-actual-age').textContent=portrait.actualAge+' jaar';
$('fb-apparent-age').textContent=portrait.apparentAgeBucket+' jaar';

$('score-delta').textContent=delta>0?`+${delta} punten`:`+0 punten`;

$('fb-explanation').textContent=portrait.explanation;
$('fb-uiterlijk').textContent=portrait.analysis.uiterlijk;
$('fb-houding').textContent=portrait.analysis.houding;
$('fb-activiteit').textContent=portrait.analysis.activiteit;
$('fb-context').textContent=portrait.analysis.context;

showScreen('feedback');
}

function renderEnd(){

$('end-score').textContent=score;

const total=queue.length;

$('end-stats').innerHTML=`
<div class="end-stat"><strong>${correctAge}</strong> / ${total} leeftijden correct</div>
${CONFIG.enablePeriodQuestion?`<div class="end-stat"><strong>${correctPeriod}</strong> / ${total} perioden correct</div>`:''}
`;

const maxScore=
total*CONFIG.pointsCorrectAge+
(CONFIG.enablePeriodQuestion?total*CONFIG.pointsCorrectPeriod:0);

const pct=maxScore>0?score/maxScore:0;

let conclusion;

if(pct>=0.75) conclusion=CONFIG.conclusions.high;
else if(pct>=0.4) conclusion=CONFIG.conclusions.medium;
else conclusion=CONFIG.conclusions.low;

$('end-conclusion').textContent=conclusion;

showScreen('end');
}

function resetGame(){
score=0;
correctAge=0;
correctPeriod=0;
currentIndex=0;
queue=[];
updateHeaderScore();
}

function startGame(){
score=0;
correctAge=0;
correctPeriod=0;
currentIndex=0;
queue=[...DATA];
if(CONFIG.shuffleQuestions) shuffle(queue);
renderQuestion();
}

function confirmAnswer(){
const chosenAge=getRadioValue('age');
const chosenPeriod=CONFIG.enablePeriodQuestion?getRadioValue('period'):null;
if(!chosenAge) return;
renderFeedback(chosenAge,chosenPeriod);
}

function nextQuestion(){
currentIndex++;
if(currentIndex>=queue.length) renderEnd();
else renderQuestion();
}

document.addEventListener('DOMContentLoaded',()=>{

$('btn-start').addEventListener('click',startGame);
$('btn-confirm').addEventListener('click',confirmAnswer);
$('btn-next').addEventListener('click',nextQuestion);
$('btn-replay').addEventListener('click',startGame);

$('btn-home').addEventListener('click',()=>{
resetGame();
renderIntro();
});

$('btn-reset').addEventListener('click',()=>{
if(confirm('Wil je het spel opnieuw beginnen?')){
resetGame();
renderIntro();
}
});

renderIntro();

});

})(); 