import controls from '../../constants/controls';

export function getHitPower(fighter) {
    // return hit power
    const { attack } = fighter;
    const criticalHitChance = Math.random() * (2 - 1) + 1;
    const power = attack * criticalHitChance;
    return power;
}

export function getBlockPower(fighter) {
    // return block power
    const { defense } = fighter;
    const dodgeChance = Math.random() * (2 - 1) + 1;
    const power = defense * dodgeChance;
    return power;
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
        let firstFighterHealth = firstFighter.health;
        let secondFighterHealth = secondFighter.health;
        let firstFighterIsBlock = firstFighter.isBlock;
        let secondFighterIsBlock = secondFighter.isBlock;
        const playerOneCriticalHitCombination = [false, false, false];
        const playerTwoCriticalHitCombination = [false, false, false];
        let firstFighterCriticalHit = false;
        let secondFighterCriticalHit = false;

        function updateHealthBars() {
            const firstFighterHealthBar = document.getElementById('left-fighter-indicator');
            const secondFighterHealthBar = document.getElementById('right-fighter-indicator');
            const firstFighterMaxHealth = firstFighter.health;
            const secondFighterMaxHealth = secondFighter.health;
            const firstFighterHealthPercentage = (firstFighterHealth / firstFighterMaxHealth) * 100;
            const secondFighterHealthPercentage = (secondFighterHealth / secondFighterMaxHealth) * 100;

            if (firstFighterHealthPercentage <= 0) {
                firstFighterHealthBar.style.width = '0';
            } else if (secondFighterHealthPercentage <= 0) {
                secondFighterHealthBar.style.width = '0';
            } else {
                firstFighterHealthBar.style.width = `${firstFighterHealthPercentage}%`;
                secondFighterHealthBar.style.width = `${secondFighterHealthPercentage}%`;
            }
        }

        function handleKeyDown(event) {
            const key = event.code;

            if (key === controls.PlayerOneAttack && !secondFighterIsBlock && !firstFighterIsBlock) {
                const damage = getDamage(firstFighter, secondFighter);
                secondFighterHealth -= damage;
            } else if (key === controls.PlayerTwoAttack && !firstFighterIsBlock && !secondFighterIsBlock) {
                const damage = getDamage(secondFighter, firstFighter);
                firstFighterHealth -= damage;
            } else if (key === controls.PlayerOneBlock) {
                firstFighterIsBlock = true;
            } else if (key === controls.PlayerTwoBlock) {
                secondFighterIsBlock = true;
            } else if (key === controls.PlayerOneCriticalHitCombination[0]) {
                playerOneCriticalHitCombination[0] = true;
            } else if (key === controls.PlayerOneCriticalHitCombination[1]) {
                playerOneCriticalHitCombination[1] = true;
            } else if (key === controls.PlayerOneCriticalHitCombination[2]) {
                playerOneCriticalHitCombination[2] = true;
            } else if (key === controls.PlayerTwoCriticalHitCombination[0]) {
                playerTwoCriticalHitCombination[0] = true;
            } else if (key === controls.PlayerTwoCriticalHitCombination[1]) {
                playerTwoCriticalHitCombination[1] = true;
            } else if (key === controls.PlayerTwoCriticalHitCombination[2]) {
                playerTwoCriticalHitCombination[2] = true;
            }

            if (
                playerOneCriticalHitCombination[0] &&
                playerOneCriticalHitCombination[1] &&
                playerOneCriticalHitCombination[2] &&
                !firstFighterCriticalHit
            ) {
                const damage = 2 * firstFighter.attack;
                secondFighterHealth -= damage;
                firstFighterCriticalHit = true;
                setTimeout(() => {
                    firstFighterCriticalHit = false;
                }, 10000);
            }

            if (
                playerTwoCriticalHitCombination[0] &&
                playerTwoCriticalHitCombination[1] &&
                playerTwoCriticalHitCombination[2] &&
                !secondFighterCriticalHit
            ) {
                const damage = 2 * secondFighter.attack;
                firstFighterHealth -= damage;
                secondFighterCriticalHit = true;
                setTimeout(() => {
                    secondFighterCriticalHit = false;
                }, 10000);
            }

            updateHealthBars();
        }

        function handleKeyUp(event) {
            const key = event.code;

            if (key === controls.PlayerOneBlock) {
                firstFighterIsBlock = false;
            } else if (key === controls.PlayerTwoBlock) {
                secondFighterIsBlock = false;
            } else if (key === controls.PlayerOneCriticalHitCombination[0]) {
                playerOneCriticalHitCombination[0] = false;
            } else if (key === controls.PlayerOneCriticalHitCombination[1]) {
                playerOneCriticalHitCombination[1] = false;
            } else if (key === controls.PlayerOneCriticalHitCombination[2]) {
                playerOneCriticalHitCombination[2] = false;
            } else if (key === controls.PlayerTwoCriticalHitCombination[0]) {
                playerTwoCriticalHitCombination[0] = false;
            } else if (key === controls.PlayerTwoCriticalHitCombination[1]) {
                playerTwoCriticalHitCombination[1] = false;
            } else if (key === controls.PlayerTwoCriticalHitCombination[2]) {
                playerTwoCriticalHitCombination[2] = false;
            }

            if (firstFighterHealth <= 0 || secondFighterHealth <= 0) {
                document.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('keyup', handleKeyUp);
                resolve(firstFighterHealth > secondFighterHealth ? firstFighter : secondFighter);
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    });
}
