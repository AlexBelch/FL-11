const hundred = 100;

const Fighter = (function () {
  const privateData = new WeakMap();

  class Fighter {
    constructor (_fighter) {
      privateData.set(this, {
          name: _fighter.name,
          damage: _fighter.damage,
          hp: _fighter.hp,
          agility:_fighter.agility,
          wins: 0,
          losses: 0
      });
    }

    getName () {
      return privateData.get(this).name;
    }

    getDamage () {
      return privateData.get(this).damage;
    }

    getHealth () {
      return privateData.get(this).hp;
    }

    getAgility () {
      return privateData.get(this).agility;
    }

    attack(_fighter) {
      let hit = Math.round(Math.random() * hundred);
      if (hit > _fighter.getAgility()) {
        console.log(`    ${this.getName()} make ${this.getDamage()} damage to ${_fighter.getName()}`);
        _fighter.dealDamage(this.getDamage());
      } else {
        console.log(`    ${this.getName()} attack missed`);
      }
    }

    logCombatHistory() {
      console.log(`    Name: ${this.getName()}, Wins: ${privateData.get(this).wins}, \
Losses: ${privateData.get(this).losses}`);
    }

    heal(_hp) {
      let obj = privateData.get(this);
      obj.hp = obj.hp + _hp;
      if (obj.hp > hundred) {
          obj.hp = hundred;
      }
     privateData.set(this,obj);
      console.log(`    ${this.getName()} hp: ${this.getHealth()}`);
    }

    dealDamage (_damage) {
      let obj = privateData.get(this);
      obj.hp = obj.hp - _damage;
      if (obj.hp < 0) {
          obj.hp = 0;
      }
      privateData.set(this,obj);
      console.log(`    ${this.getName()} hp: ${this.getHealth()}`);
    }
    
    addWin() {
      let obj = privateData.get(this);
      obj.wins = obj.wins + 1;    
      privateData.set(this,obj);
    }

    addLoss() {
      let obj = privateData.get(this);
      obj.losses = obj.losses + 1;    
      privateData.set(this,obj);
    }

    presentFighter() {
      console.log(`    ${privateData.get(this).name} : 
      damage - ${privateData.get(this).damage}, 
      hp - ${privateData.get(this).hp}, 
      agility - ${privateData.get(this).agility}`);
    }
  }
  return Fighter;
})();

function battle (fighter, fighterEnemy) {
  console.log(`\nPRESENT FIGHTERS:`);
  fighter.presentFighter();
  fighterEnemy.presentFighter();

  if (fighter.getHealth() === 0) {
    console.log(`    ${fighter.getName()} is dead and can't fight.`);
    return;
  }else if (fighterEnemy.getHealth() === 0) {
     console.log(`    ${fighterEnemy.getName()} is dead and can't fight.`);
    return;
  }

  console.log(`\nTHE BATTLE BETWEEN ${fighter.getName()} vs ${fighterEnemy.getName()}:`);

  while (fighter.getHealth() > 0 && fighterEnemy.getHealth() > 0) {
    console.log(`Atacking ${fighter.getName()}...`);
    fighter.attack(fighterEnemy);

    if (fighterEnemy.getHealth() > 0) {
      console.log(`Atacking ${fighterEnemy.getName()}...`);
      fighterEnemy.attack(fighter);
    }
  }
  console.log(`GAME OVER!!!`);
  if (fighter.getHealth() <= 0) {
    console.log(`WINNER is ***${fighterEnemy.getName()}***!!!!!`);
    fighterEnemy.addWin();
    fighter.addLoss();
  } else if (fighterEnemy.getHealth() <= 0) {
    console.log(`WINNER is ***${fighter.getName()}***!!!!!`);
    fighter.addWin();
    fighterEnemy.addLoss();
  }
  fighter.logCombatHistory();
  fighterEnemy.logCombatHistory();
  return;
}

const twenty = 20;
const twentyFive = 25;
const thirty = 30;
const thirtyFive = 35;

const fighterJohn = new Fighter({name: 'John', damage: twenty, hp: hundred, agility: twentyFive});
const fighterBob = new Fighter({name: 'Bob', damage: thirty, hp: hundred, agility: thirtyFive});
battle(fighterJohn, fighterBob);
battle(fighterJohn, fighterBob);
