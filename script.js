(function () {
  'use strict';

  const CONFIG = {
    enablePeriodQuestion: true,
    ageBuckets: ['10-12', '13-15', '16-18', '18-25', '25-35', '35-50', '50+'],
    shuffleQuestions: true,
    pointsCorrectAge: 10,
    pointsCorrectPeriod: 5,
    pointsWrong: 0,
    conclusions: {
      high:   'Uitstekend! Je hebt een scherp oog voor historische portretten.',
      medium: 'Goed gedaan! Met wat meer oefening wordt je blik nog scherper.',
      low:    'Er valt nog veel te ontdekken. Kijk eens goed naar de details in elk gezicht.',
    },
  };

  const DATA = [
  {
    id: 'p1',
    title:    'Het vrolijke huisgezin',
    artist:   'Jan Steen',
    year:     1668,
    period:   'golden',
    image:    'images/p1.jpg',
    actualAge:        7,
    apparentAgeBucket:'10-12',
    explanation: 'Dit schilderij toont kinderen die roken, drinken en feesten — gedragingen die normaal bij volwassenen horen. Jan Steen beeldt ze bewust zo af om een morele les te geven: zo hoort het niet. Toch laat het zien dat kinderen in de Gouden Eeuw al vroeg werden blootgesteld aan de wereld van volwassenen.',
    analysis: {
      uiterlijk:  'Ronde kindergezichten, maar gekleed en gedragend als volwassenen.',
      houding:    'Ontspannen en feestend — geen kinderlijke terughoudendheid.',
      activiteit: 'Roken van een pijp, drinken van wijn — typisch volwassen activiteiten.',
      context:    'De setting is een huishouden in feestsfeer. De morele boodschap is dat dit verkeerd is, maar het toont wel hoe vroeg kinderen bij volwassen gedrag werden betrokken.',
    },
  },
  {
    id: 'p2',
    title:    'De Luitspeler',
    artist:   'Frans Hals',
    year:     1623,
    period:   'golden',
    image:    'images/p2.jpg',
    actualAge:        12,
    apparentAgeBucket:'16-18',
    explanation: 'Muziek spelen was in de Gouden Eeuw een teken van goede opvoeding en culturele ontwikkeling. Door deze jongen zo serieus en vaardig af te beelden, toont Frans Hals hem als beschaafd en volwassen — ook al is hij pas ongeveer 12 jaar oud.',
    analysis: {
      uiterlijk:  'Glad gezicht zonder baardgroei, maar serieuze blik die ouder doet lijken.',
      houding:    'Rechtop, zelfverzekerd, nadenkend — geen kinderlijke nonchalance.',
      activiteit: 'Luit spelen was een teken van culturele verfijning en sociale status.',
      context:    'Muzikale vaardigheid liet zien dat iemand goed opgevoed en beschaafd was — ook voor jonge mensen.',
    },
  },
  {
    id: 'p3',
    title:    'De serenade',
    artist:   'Judith Leyster',
    year:     1629,
    period:   'golden',
    image:    'images/p3.jpg',
    actualAge:        14,
    apparentAgeBucket:'18-25',
    explanation: 'Een serenade geven was iets wat normaal volwassen mannen deden om indruk te maken. Door een jongen van ongeveer 14 in deze rol af te beelden, lijkt hij een volwassen rol na te spelen. Judith Leyster geeft hem een theatrale, volwassen uitstraling.',
    analysis: {
      uiterlijk:  'Jong gezicht, maar nadrukkelijk volwassen uitgedost en geposeerd.',
      houding:    'Theatraal en dramatisch — alsof hij een volwassen man nabootst.',
      activiteit: 'Serenade spelen op luit — een typisch volwassen romantisch gebaar.',
      context:    'De serenade als ritueel hoorde bij het hof maken — iets voor volwassen mannen, niet jongens.',
    },
  },
  {
    id: 'p4',
    title:    'Portret van een jonge man (Simon van Alphen)',
    artist:   'Nicolaes Maes',
    year:     1680,
    period:   'golden',
    image:    'images/p4.jpg',
    actualAge:        16,
    apparentAgeBucket:'18-25',
    explanation: 'Dit portret van waarschijnlijk Simon van Alphen toont een jongen van circa 16 jaar als een volwassen heer. De elegante kleding, zelfbewuste pose en serieuze blik zijn allemaal kenmerken van een volwassen statusportret — niet van een tiener.',
    analysis: {
      uiterlijk:  'Geen rimpels of ouderdomstekenen, maar ook geen kinderlijke trekken meer zichtbaar.',
      houding:    'Leunt zelfverzekerd tegen een boom, gebaart met de hand — bewust en waardig.',
      activiteit: 'Poseren voor een statusportret — iets wat volwassen heren deden.',
      context:    'Elegante kleding en een formele portretpositie geven hem het aanzien van een gerespecteerd man.',
    },
  },
  {
    id: 'p5',
    title:    'Helena van der Schalcke',
    artist:   'Gerard ter Borch',
    year:     1648,
    period:   'golden',
    image:    'images/p5.jpg',
    actualAge:        2,
    apparentAgeBucket:'10-12',
    explanation: 'Helena van der Schalcke was slechts 2 jaar oud toen dit portret werd geschilderd, maar ze draagt een elegante jurk, accessoires en zelfs sieraden die je eerder bij een volwassen dame verwacht. Dit is het meest extreme voorbeeld: zelfs peuters werden als kleine volwassenen gekleed en afgebeeld.',
    analysis: {
      uiterlijk:  'Peuterlichaam, maar volledig uitgedost als een volwassen dame van stand.',
      houding:    'Rechtop staand, kalm — alsof ze al weet hoe ze zich moet presenteren.',
      activiteit: 'Houdt een rieten mandje en een anjer vast — volwassen, symbolische attributen.',
      context:    'Sieraden en rijke kleding tonen de hoge sociale status van de familie. Kinderen werden als miniatuurvolwassenen gepresenteerd.',
    },
  },
  {
    id: 'p6',
    title:    'Kinderen leren een poes dansen',
    artist:   'Jan Steen',
    year:     1670,
    period:   'golden',
    image:    'images/p6.jpg',
    actualAge:        9,
    apparentAgeBucket:'10-12',
    explanation: 'Dit schilderij is een uitzondering: Jan Steen kiest hier bewust voor een speelse, kinderlijke weergave. De kinderen proberen hun fantasie waar te maken en hebben plezier. Dit laat zien dat niet alle schilders kinderen altijd als miniatuurvolwassenen afbeeldden — soms werd hun speelsheid juist benadrukt.',
    analysis: {
      uiterlijk:  'Kinderlijke gezichten en proporties — relatief realistisch voor hun leeftijd.',
      houding:    'Ontspannen en speels, geen volwassen pose of serieuze uitdrukking.',
      activiteit: 'Een poes leren dansen — puur kinderspel en fantasie.',
      context:    'Jan Steen staat bekend om zijn humoristische en moraliserende taferelen. Hier toont hij kinderen als kinderen.',
    },
  },
];

  let queue = [];
  let currentIndex = 0;
  let score = 0;
  let correctAge = 0;
  let correctPeriod = 0;

  const $  = id => document.getElementById(id);
  const screens = {
    intro:    $('screen-intro'),
    question: $('screen-question'),
    feedback: $('screen-feedback'),
    end:      $('screen-end'),
  };

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function showScreen(name) {
    Object.values(screens).forEach(s => s.classList.remove('active'));
    screens[name].classList.add('active');
    const header = $('site-header');
    header.classList.toggle('hidden', name === 'intro');
  }

  function updateHeaderScore() {
    $('header-score').textContent = `Score: ${score}`;
  }

  function updateProgress() {
    const total = queue.length;
    const done  = currentIndex;
    const pct   = total ? (done / total) * 100 : 0;
    $('progress-bar').style.width = pct + '%';
    $('progress-label').textContent = `Vraag ${done + 1} / ${total}`;
  }

  function periodLabel(value) {
    const map = { before: 'Vóór de Gouden Eeuw', golden: 'Gouden Eeuw', after: 'Na de Gouden Eeuw' };
    return map[value] || value;
  }

  function getRadioValue(name) {
    const el = document.querySelector(`input[name="${name}"]:checked`);
    return el ? el.value : null;
  }

  function clearRadios(name) {
    document.querySelectorAll(`input[name="${name}"]`).forEach(r => (r.checked = false));
    document.querySelectorAll(`.radio-card`).forEach(c => {
      if (c.querySelector(`input[name="${name}"]`)) {
        c.classList.remove('selected');
      }
    });
  }

  function renderIntro() {
    const hint = document.querySelector('.intro-hint');
    if (hint) hint.textContent = `${DATA.length} portretten · Tijdsduur ±5 minuten`;
    showScreen('intro');
  }

  function renderQuestion() {
    const portrait = queue[currentIndex];

    updateProgress();
    updateHeaderScore();

    const img      = $('painting-img');
    const fallback = $('painting-fallback');
    img.src = portrait.image;
    img.alt = portrait.title;
    fallback.classList.add('hidden');
    img.onerror = () => {
      img.style.display = 'none';
      fallback.classList.remove('hidden');
    };
    img.onload = () => {
      img.style.display = 'block';
      fallback.classList.add('hidden');
    };

    $('painting-meta').textContent = '';

    const ageGroup = $('age-options');
    ageGroup.innerHTML = '';
    CONFIG.ageBuckets.forEach(bucket => {
      const label = document.createElement('label');
      label.className = 'radio-card';
      label.innerHTML = `
        <input type="radio" name="age" value="${bucket}" />
        <span class="radio-label">${bucket} jaar</span>`;
      ageGroup.appendChild(label);
    });

    const periodSection = $('period-section');
    if (CONFIG.enablePeriodQuestion) {
      periodSection.style.display = '';
    } else {
      periodSection.style.display = 'none';
    }

    clearRadios('age');
    clearRadios('period');

    $('btn-confirm').disabled = true;

    ageGroup.addEventListener('change', validateConfirm);
    $('period-options').addEventListener('change', validateConfirm);

    showScreen('question');
  }

  function validateConfirm() {
    const ageOk    = getRadioValue('age') !== null;
    const periodOk = !CONFIG.enablePeriodQuestion || getRadioValue('period') !== null;
    $('btn-confirm').disabled = !(ageOk && periodOk);
  }

  function renderFeedback(chosenAge, chosenPeriod) {
    const portrait = queue[currentIndex];

    const ageCorrect    = chosenAge === portrait.apparentAgeBucket;
    const periodCorrect = CONFIG.enablePeriodQuestion
      ? chosenPeriod === portrait.period
      : null;

    let delta = 0;
    if (ageCorrect)    { delta += CONFIG.pointsCorrectAge;    correctAge++; }
    else               { delta += CONFIG.pointsWrong; }
    if (periodCorrect) { delta += CONFIG.pointsCorrectPeriod; correctPeriod++; }
    else if (periodCorrect === false) { delta += CONFIG.pointsWrong; }
    score += Math.max(delta, 0);

    updateHeaderScore();

    const fbImg = $('feedback-img');
    fbImg.src = portrait.image;
    fbImg.alt = portrait.title;
    $('feedback-meta').textContent =
      `${portrait.title} — ${portrait.artist} (${portrait.year})`;

    const verdictAge = $('verdict-age');
    verdictAge.className = 'verdict-row ' + (ageCorrect ? 'verdict-correct' : 'verdict-wrong');
    verdictAge.textContent = ageCorrect
      ? 'Leeftijd goed geraden!'
      : 'Leeftijd niet correct';

    const verdictPeriod = $('verdict-period');
    if (CONFIG.enablePeriodQuestion) {
      verdictPeriod.style.display = '';
      verdictPeriod.className = 'verdict-row ' + (periodCorrect ? 'verdict-correct' : 'verdict-wrong');
      verdictPeriod.textContent = periodCorrect
        ? `Periode correct: ${periodLabel(portrait.period)}`
        : `Periode onjuist — het was: ${periodLabel(portrait.period)}`;
    } else {
      verdictPeriod.style.display = 'none';
    }

    $('fb-chosen-age').textContent  = chosenAge + ' jaar';
    $('fb-actual-age').textContent  = portrait.actualAge + ' jaar';
    $('fb-apparent-age').textContent = portrait.apparentAgeBucket + ' jaar';

    const deltaEl = $('score-delta');
    deltaEl.textContent  = delta > 0 ? `+${delta} punten` : `+0 punten`;
    deltaEl.className    = 'score-delta ' + (delta > 0 ? 'positive' : 'neutral');

    $('fb-explanation').textContent = portrait.explanation;
    $('fb-uiterlijk').textContent   = portrait.analysis.uiterlijk;
    $('fb-houding').textContent     = portrait.analysis.houding;
    $('fb-activiteit').textContent  = portrait.analysis.activiteit;
    $('fb-context').textContent     = portrait.analysis.context;

    showScreen('feedback');
  }

  function renderEnd() {
    $('end-score').textContent = score;

    const statsEl = $('end-stats');
    const total   = queue.length;
    statsEl.innerHTML = `
      <div class="end-stat"><strong>${correctAge}</strong> / ${total} leeftijden correct</div>
      ${CONFIG.enablePeriodQuestion
        ? `<div class="end-stat"><strong>${correctPeriod}</strong> / ${total} perioden correct</div>`
        : ''}
    `;

    const maxScore = total * CONFIG.pointsCorrectAge
      + (CONFIG.enablePeriodQuestion ? total * CONFIG.pointsCorrectPeriod : 0);
    const pct = maxScore > 0 ? score / maxScore : 0;
    let conclusion;
    if (pct >= 0.75) conclusion = CONFIG.conclusions.high;
    else if (pct >= 0.4) conclusion = CONFIG.conclusions.medium;
    else conclusion = CONFIG.conclusions.low;

    $('end-conclusion').textContent = conclusion;

    showScreen('end');
  }

  function resetGame() {
    score        = 0;
    correctAge   = 0;
    correctPeriod = 0;
    currentIndex = 0;
    queue        = [];
    updateHeaderScore();
  }

  function startGame() {
    score         = 0;
    correctAge    = 0;
    correctPeriod = 0;
    currentIndex  = 0;
    queue = [...DATA];
    if (CONFIG.shuffleQuestions) shuffle(queue);
    renderQuestion();
  }

  function confirmAnswer() {
    const chosenAge    = getRadioValue('age');
    const chosenPeriod = CONFIG.enablePeriodQuestion ? getRadioValue('period') : null;
    if (!chosenAge) return;
    renderFeedback(chosenAge, chosenPeriod);
  }

  function nextQuestion() {
    currentIndex++;
    if (currentIndex >= queue.length) {
      renderEnd();
    } else {
      renderQuestion();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {

    $('btn-start').addEventListener('click', startGame);
    $('btn-confirm').addEventListener('click', confirmAnswer);
    $('btn-next').addEventListener('click', nextQuestion);
    $('btn-replay').addEventListener('click', startGame);

    $('btn-home').addEventListener('click', () => {
      resetGame();
      renderIntro();
    });

    $('btn-reset').addEventListener('click', () => {
      if (confirm('Wil je het spel opnieuw beginnen? Je voortgang gaat verloren.')) {
        resetGame();
        renderIntro();
      }
    });

    document.querySelectorAll('.radio-card').forEach(card => {
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          const radio = card.querySelector('input[type="radio"]');
          if (radio) { radio.checked = true; radio.dispatchEvent(new Event('change', { bubbles: true })); }
        }
      });
    });

    renderIntro();
  });

})();
