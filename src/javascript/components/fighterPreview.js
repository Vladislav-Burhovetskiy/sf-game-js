import createElement from '../helpers/domHelper';

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)
    if (fighter) {
        const { name, health, attack, defense } = fighter;

        const imageFighterEl = createFighterImage(fighter);
        fighterElement.append(imageFighterEl);

        fighterElement.innerHTML += `
          <p class="fighter_preview__name">${name}</p>
          <div class='fighter_preview__details-container'>
              <p>Health: <span>${health}</span></p>
              <p>Attack: <span>${attack}</span></p>
              <p>Defense: <span>${defense}</span></p>
          </div>
      `;
    }

    return fighterElement;
}
