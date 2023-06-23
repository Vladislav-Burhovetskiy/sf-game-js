import showModal from './modal';
import createElement from '../../helpers/domHelper';

export default function showWinnerModal(fighter) {
    // call showModal function
    const title = `Winner: ${fighter.name}`;
    const bodyElement = document.createElement('div');

    const winnerImage = createElement({
        tagName: 'img',
        className: 'modal-winner-img',
        attributes: {
            src: fighter.source,
            alt: fighter.name
        }
    });

    bodyElement.append(winnerImage);

    showModal({ title, bodyElement });
}
