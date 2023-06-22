import showModal from './modal';

export default function showWinnerModal(fighter) {
    // call showModal function
    const title = 'Winner:';
    const bodyElement = document.createElement('p');
    bodyElement.innerText = `${fighter.name} is the winner!`;

    showModal({ title, bodyElement });
}
