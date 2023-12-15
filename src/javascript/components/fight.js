import controls from '../../constants/controls';

function randomNumber() {
    return Math.random() + 1;
}

export function getHitPower(fighter) {
    // return hit power
    const criticalHitChance = randomNumber();
    const powerHit = fighter.attack * criticalHitChance;
    return powerHit;
}

export function getBlockPower(fighter) {
    // return block power
    const dodgeChance = randomNumber();
    const powerBlock = fighter.defense * dodgeChance;
    return powerBlock;
}

export function getDamage(attacker, defender) {
    // return damage
    const hitPower = getHitPower(attacker);
    const blockPower = getBlockPower(defender);
    const damage = Math.max(hitPower - blockPower, 0);
    return damage;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        let healthFighter1 = firstFighter.health;
        let healthFighter2 = secondFighter.health;
        let isBlockFighter1 = firstFighter.isBlock;
        let isBlockFighter2 = secondFighter.isBlock;
        const criticalHitComboPlayer1 = [false, false, false];
        const criticalHitComboPlayer2 = [false, false, false];
        let criticalHitFighter1 = false;
        let criticalHitFighter2 = false;

        const hit = {
            hitPlayer1Event: () => {
                if (!isBlockFighter2 && !isBlockFighter1) {
                    healthFighter2 -= getDamage(firstFighter, secondFighter);
                }
            },

            hitPlayer2Event: () => {
                if (!isBlockFighter2 && !isBlockFighter1) {
                    healthFighter1 -= getDamage(secondFighter, firstFighter);
                }
            },

            criticalHitPlayer1Event: () => {
                if (
                    criticalHitComboPlayer1[0] &&
                    criticalHitComboPlayer1[1] &&
                    criticalHitComboPlayer1[2] &&
                    !criticalHitFighter1
                ) {
                    healthFighter2 -= 2 * firstFighter.attack;
                    criticalHitFighter1 = true;
                    setTimeout(() => {
                        criticalHitFighter1 = false;
                    }, 10000);
                }
            },

            criticalHitPlayer2Event: () => {
                if (
                    criticalHitComboPlayer2[0] &&
                    criticalHitComboPlayer2[1] &&
                    criticalHitComboPlayer2[2] &&
                    !criticalHitFighter2
                ) {
                    healthFighter1 -= 2 * secondFighter.attack;
                    criticalHitFighter2 = true;
                    setTimeout(() => {
                        criticalHitFighter2 = false;
                    }, 10000);
                }
            }
        };

        const keyHandlers = new Map([
            [controls.PlayerOneAttack, hit.hitPlayer1Event],
            [controls.PlayerTwoAttack, hit.hitPlayer2Event]
        ]);

        function addKeyHandlers(controlArray, eventHandler) {
            controlArray.forEach(controlKey => keyHandlers.set(controlKey, eventHandler));
        }

        addKeyHandlers(controls.PlayerOneCriticalHitCombination, hit.criticalHitPlayer1Event);
        addKeyHandlers(controls.PlayerTwoCriticalHitCombination, hit.criticalHitPlayer2Event);

        function hadnlerHit(key) {
            const handler = keyHandlers.get(key);
            if (handler) handler();
        }

        function determineWinner() {
            resolve(healthFighter1 > healthFighter2 ? firstFighter : secondFighter);
        }

        function updateHealthBars() {
            const leftBar = document.getElementById('left-fighter-indicator');
            const rightBar = document.getElementById('right-fighter-indicator');
            const maxHealthFighter1 = firstFighter.health;
            const maxHealthFighter2 = secondFighter.health;
            const percentFighter1 = (healthFighter1 / maxHealthFighter1) * 100;
            const percentFighter2 = (healthFighter2 / maxHealthFighter2) * 100;

            leftBar.style.width = percentFighter1 <= 0 ? '0' : `${percentFighter1}%`;
            rightBar.style.width = percentFighter2 <= 0 ? '0' : `${percentFighter2}%`;
        }

        function handleCriticalHitKeyDown(code, isPressed) {
            const indexPlayer1 = controls.PlayerOneCriticalHitCombination.indexOf(code);
            const indexPlayer2 = controls.PlayerTwoCriticalHitCombination.indexOf(code);
            const isBlockPlayer1 = controls.PlayerOneBlock.includes(code);
            const isBlockPlayer2 = controls.PlayerTwoBlock.includes(code);

            switch (true) {
                case indexPlayer1 !== -1:
                    criticalHitComboPlayer1[indexPlayer1] = isPressed;
                    break;
                case indexPlayer2 !== -1:
                    criticalHitComboPlayer2[indexPlayer2] = isPressed;
                    break;
                case isBlockPlayer1:
                    isBlockFighter1 = isPressed;
                    break;
                case isBlockPlayer2:
                    isBlockFighter2 = isPressed;
                    break;
                default:
                    break;
            }
        }

        function handleKeyDown(event) {
            const { code } = event;

            handleCriticalHitKeyDown(code, true);
            hadnlerHit(code);
            updateHealthBars();
        }

        function handleKeyUp(event) {
            const { code } = event;

            handleCriticalHitKeyDown(code, false);

            if (healthFighter1 <= 0 || healthFighter2 <= 0) {
                document.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('keyup', handleKeyUp);

                determineWinner();
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    });
}
