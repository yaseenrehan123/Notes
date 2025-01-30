function noteCard(heading, content){
    this.id = Date.now(); // Assign a unique ID
    this.heading = heading,
    this.content = content;
};

const cardContainer = document.querySelector('.card-container');

const createCardButton = document.querySelector('.create-new-card-container');
const defCardHeading = document.querySelector('.card-wrapper .heading-wrapper');
const addHeadingPlaceholder = document.querySelector('.add-heading-placeholder');
const headingInputElement = document.querySelector('.add-heading-placeholder input')
const addContentPlaceholder = document.querySelector('.add-content-placeholder');
const contentInputElement = document.querySelector('.add-content-placeholder textarea');
const approveCardBtn = document.querySelector('.approve-card-btn');

let cards = JSON.parse(localStorage.getItem('cards-array')) || [];

approveCardBtn.onclick = () => addNewCard();

cards.forEach(function(card){
    createNoteCard(card);
});


function createNoteCard(noteCard){
    const card = document.createElement('div');
    card.className = 'note-card';

    const wrapper = document.createElement('div');
    wrapper.className = 'card-wrapper';

    const headingContainer = document.createElement('div');
    headingContainer.className = 'heading';

    const headingWrapper = document.createElement('div');
    headingWrapper.className = 'heading-wrapper';

    const heading = document.createElement('h1');
    heading.textContent = noteCard.heading;
    
    const contentContainer = document.createElement('div');
    contentContainer.className = 'content';

    const content = document.createElement('p');
    content.textContent = noteCard.content;

    const deleteBtn = document.createElement('div');
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = () => removeCard(card);

    const deleteIcon = document.createElement('i');
    deleteIcon.className = 'bx bx-x';

    card.dataset.id = noteCard.id;

    cardContainer.append(card);
    card.append(wrapper,deleteBtn);
    wrapper.append(headingContainer,contentContainer);
    headingContainer.append(headingWrapper);
    headingWrapper.append(heading);
    contentContainer.append(content);
    deleteBtn.append(deleteIcon);

}
function removeCard(card){ // doesnt work!
    const cardId = card.dataset.id; // Get the id
    cards = cards.filter(card => card.id != cardId); // Filter out the card by id
    console.log(cards); // Debugging: Ensure the card was removed
    saveCards(); // Save the updated array
    card.remove(); // Remove the DOM element
    
}
function addNewCard(){ // is attached on approveButton
    if(headingInputElement.value === '' || contentInputElement.value === ''){
        alert('Cant create empty card, please write something !');
        return;
    }
    const newCard = new noteCard(headingInputElement.value,contentInputElement.value);
    createNoteCard(newCard);
    headingInputElement.value = '';
    contentInputElement.value = '';
    createCardButton.style.display = 'flex';
    defCardHeading.style.display = 'flex';
    addHeadingPlaceholder.style.display = 'none';
    addContentPlaceholder.style.display = 'none';
    approveCardBtn.style.display = 'none';

    cards.push(newCard);
    saveCards();
}
createCardButton.onclick = function(){ // called to enable panel fields
    createCardButton.style.display = 'none';
    defCardHeading.style.display = 'none';
    addHeadingPlaceholder.style.display = 'flex';
    addContentPlaceholder.style.display = 'flex';
    approveCardBtn.style.display = 'flex';
}
function saveCards(){
    localStorage.setItem('cards-array', JSON.stringify(cards));
}
function deleteAllCards(){
    cards = [];
    saveCards();

    document.querySelectorAll('.note-card').forEach(function(cardElement){
        if(cardElement.id !== 'create-card-element'){
             cardElement.remove();
        }
    });
}
//navbar section
const sidebar = document.querySelector('.side-bar');

function enableSideBar(){
    sidebar.style.display = 'flex';
}
function hideSideBar(){
    sidebar.style.display = 'none';
}