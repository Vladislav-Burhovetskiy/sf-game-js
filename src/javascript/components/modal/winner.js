import showModal from './modal';
import { createFighterImage } from '../fighterPreview';

export default function showWinnerModal(fighter) {
    // call showModal function
    const winnerImageEl = createFighterImage(fighter);
    winnerImageEl.classList.remove('fighter-preview___img');
    winnerImageEl.classList.add('modal-winner-img');

    showModal({
        title: `${fighter.name} won!`,
        bodyElement: winnerImageEl
    });
}
