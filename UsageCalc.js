const peopleEl = document.getElementById('people');
const nightsEl = document.getElementById('nights');
const calcEl = document.getElementById('calculate');
const guestsContainerDiv = document.getElementById('guests'); 

const PARTNER_RATE = 25;
const GUEST_RATE = 10;

//let total = 0;

let numberOfPeople = 0;
let numberOfNights = 0;

calcEl.addEventListener('click', (e) => {

    e.preventDefault();
    guestsContainerDiv.innerHTML = '';
    totalFee.reset();

    numberOfPeople = peopleEl.value;
    numberOfNights = nightsEl.value;

    for (i = 0; i < numberOfNights; i++) {

        guestsContainerDiv.appendChild(addNight(i+1, numberOfPeople));

    }

    const addNightRow = document.createElement('div');
    addNightRow.classList.add('row','justify-content-left','my-custom-row');
    const addNightDiv = document.createElement('div');
    addNightDiv.classList.add('col-sm-1', 'p3', 'border', 'bg-light');
    addNightRow.appendChild(addNightDiv);
    const addNightButton = document.createElement('input');
    addNightButton.type = 'button';
    addNightButton.classList.add('btn', 'btn-success');
    addNightButton.value = '+ night';
    addNightButton.id = 'add-night';
    addNightDiv.appendChild(addNightButton);
    guestsContainerDiv.appendChild(addNightRow);

    addNightButton.addEventListener('click', () => {
        numberOfPeople = peopleEl.value;
        numberOfNights++;
        nightsEl.value = numberOfNights;
        guestsContainerDiv.insertBefore(addNight(numberOfNights, numberOfPeople), addNightRow);
    });

    console.log(`${numberOfPeople} people for ${numberOfNights} nights.`)

});


const addNight = function(night, people) {

    const nightDiv = document.createElement('div');
    nightDiv.classList.add('row');
    nightDiv.classList.add('justify-content-left');
    nightDiv.classList.add('my-custom-row');

    const nightCount = document.createElement('div');
    const nightH3 = document.createElement('h4');
    nightH3.innerText = `Night ${night}`
    nightCount.appendChild(nightH3);
    nightDiv.appendChild(nightCount);
    nightCount.classList.add('col-sm-1', 'p3', 'border', 'bg-light', 'display:table');

    const partnerDiv = document.createElement('div');
    partnerDiv.classList.add('col-sm-1', 'p3', 'border', 'bg-light', 'display:table');
    const partnerImg = document.createElement('img');
    partnerImg.setAttribute('src', 'images/noun-sunglasses-4306090.png');
    partnerImg.setAttribute('width', '80');
    const partner = document.createElement('p');
    partner.innerText = `\$${PARTNER_RATE}`;
    totalFee.add(PARTNER_RATE);
    totalFee.render();
    partnerDiv.appendChild(partnerImg);
    partnerDiv.appendChild(partner);
    nightDiv.appendChild(partnerDiv);

    for (j = 1; j < people; j++) {
        nightDiv.appendChild(addPerson());
        totalFee.add(GUEST_RATE);
        totalFee.render();
    }

    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('col-sm-1', 'p3', 'border', 'bg-light');
    const buttonEl = document.createElement('input');
    buttonEl.type = 'button';
    buttonEl.classList.add('btn', 'btn-success');
    buttonEl.value = '+ person';
    buttonEl.id = 'add-person';
    buttonDiv.appendChild(buttonEl);
    nightDiv.appendChild(buttonDiv);

    buttonEl.addEventListener('click', (e) => {
        nightDiv.insertBefore(addPerson(), buttonDiv);

        totalFee.add(GUEST_RATE);
        totalFee.render();
    });

    return nightDiv;
}


const addPerson = function() {
    const guestDiv = document.createElement('div');
    guestDiv.id = `guest-${j}-night-${i}`;
    guestDiv.classList.add('col-sm-1', 'p3', 'border', 'bg-light', 'display:table');
    const personDiv = document.createElement('div');
    const personImg = document.createElement('img');
    personImg.setAttribute('src', 'images/noun-sunbathing-4657002.png');
    personImg.setAttribute('width', '80');
    const personP = document.createElement('a');
    personP.innerText = `\$${GUEST_RATE}`; 
    const removeA = document.createElement('a');
    removeA.innerText = '(remove)';
    personDiv.appendChild(personImg);
    personDiv.appendChild(personP);
    personDiv.appendChild(removeA);
    guestDiv.appendChild(personDiv);

    removeA.addEventListener('click', () => {
        guestDiv.remove();
        totalFee.subtract(GUEST_RATE);
        totalFee.render();
    });

    return guestDiv;
};

const totalFee = {
    total: 0,

    add(fee) {
        this.total += fee;
    },
    subtract(fee) {
        this.total -= fee;
    },
    render() {
        document.getElementById('total-h1').innerText = `Total: \$${this.total}`;
    },
    reset() {
        this.total = 0;
    }

}
