import createElement from '../helpers/domHelper';
// import { getFighterInfo } from './fighterSelector';

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

export function createFighterPreview(fighter, position, getFighterInfo) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    // todo: show fighter info (image, name, health, etc.)
    if (fighter && fighter._id) {
        getFighterInfo(fighter._id)
            .then(fighterInfo => {
                const fighterImage = createFighterImage(fighterInfo);
                fighterElement.append(fighterImage);

                const fighterName = createElement({
                    tagName: 'p',
                    className: 'fighter-preview___name'
                });
                fighterName.textContent = `Name: ${fighterInfo.name}`;
                fighterElement.append(fighterName);

                const fighterHealth = createElement({
                    tagName: 'p',
                    className: 'fighter-preview___health'
                });
                fighterHealth.textContent = `Health: ${fighterInfo.health}`;
                fighterElement.append(fighterHealth);

                const fighterAttack = createElement({
                    tagName: 'p',
                    className: 'fighter-preview___attack'
                });
                fighterAttack.textContent = `Attack: ${fighterInfo.attack}`;
                fighterElement.append(fighterAttack);

                const fighterDefense = createElement({
                    tagName: 'p',
                    className: 'fighter-preview___defense'
                });
                fighterDefense.textContent = `Defense: ${fighterInfo.defense}`;
                fighterElement.append(fighterDefense);
            })
            .catch(error => {
                console.error('Error getting fighter info:', error);
            });
    }

    return fighterElement;
}
