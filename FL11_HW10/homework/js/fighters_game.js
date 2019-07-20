class Fighter {
  #name = '';
  #damage = 0;
  #hp = 0;
  #agility = 0;
  #wins = 0;
  #losses = 0;

  constructor (_name = "No name", _damage, _hp, _agility) {
    this.#name = _name;
    this.#damage = _damage;
    this.#hp = _hp;
    this.#agility = _agility;
    console.log(`    ${this.#name} : damage - ${this.#damage}, hp - ${this.#hp}, agility - ${this.#agility}`);
  }

  getName () {
    return this.#name;
  }

  getDamage () {
    return this.#damage;
  }

  getHealth () {
    return this.#hp;
  }

  getAgility () {
    return this.#agility;
  }

  attack(_fighter) {
    let hit = Math.round(Math.random() * 100);
    if (hit > _fighter.getAgility()) {
      console.log(`    ${this.getName()} make ${this.getDamage()} damage to ${_fighter.getName()}`);
      _fighter.dealDamage(this.getDamage());
    } else {
      console.log(`    ${this.getName()} attack missed`);
    }
  }

  logCombatHistory() {
    console.log(`    Name: ${this.#name}, Wins: ${this.#wins}, Losses: ${this.#losses}`);
  }

  heal(_hp) {
    this.#hp = this.#hp + _hp;
    if (this.#hp > 100) {
      this.#hp = 100;
    }
    console.log(`    Name: ${this.#name}, hp: ${this.#hp}`);
  }

  dealDamage (_damage) {
    this.#hp = this.#hp - _damage;
    if (this.#hp < 0) {
      this.#hp = 0;
    }
    console.log(`    ${this.#name} hp: ${this.#hp}`);
  }
  
  addWin() {
    this.#wins = this.#wins +1;
  }

  addLoss() {
    this.#losses = this.#losses +1;
  }

  // hit (enemy, point) {
  //   let damage = point * this.#damage;
  //   enemy.setDamage(damage);
  // }
}

// class ImprovedFighter extends Fighter{
//   doubleHit (improvedFighter, point) {  	
//   	super.hit(improvedFighter, point * 2);    
//   } 
// }

// let fights = (fighter, improvedFighter, ...point) => {
//   console.log(`\nTHE BATTLE BETWEEN ${fighter.getName()} vs ${improvedFighter.getName()}:`);  
//   let i = 0;
//   while ((fighter.getHealth() > 0) && (improvedFighter.getHealth() > 0)) {       	
//     	console.log(`Atacking ${fighter.getName()}...`);  
//     	fighter.hit(improvedFighter, point[i]);
      
//     if (improvedFighter.getHealth() > 0) {
//     	console.log(`Atacking ${improvedFighter.getName()}...`);  
//       improvedFighter.doubleHit(fighter, point[i]);
//     }
    
//     i++;
//   }
//   console.log(`GAME OVER!!!`);
//   if (fighter.getHealth() <= 0) {
//   	console.log(`WINNER is ***${improvedFighter.getName()}***!!!!!`);
//   } else if (improvedFighter.getHealth() <= 0) {
//   	console.log(`WINNER is ***${fighter.getName()}***!!!!!`);
//   }  
// }
/*console.log(`\nPRESENT FIGHTERS:`);  
let fighter = new Fighter('Bob', 1, 100);
let improvedFighter = new ImprovedFighter('Sam', 1, 100);
fights(fighter, improvedFighter, 25, 13, 45,50);


console.log(`\nPRESENT FIGHTERS:`); 
fighter = new Fighter(undefined, 3, 100);
improvedFighter = new ImprovedFighter('Sam', 1, 100);
fights(fighter, improvedFighter, 25, 13, 45,50);*/

console.log(`\nPRESENT FIGHTERS:`);
const myFighter = new Fighter('John', 20, 100, 25);
// console.log(myFighter);
// console.log(myFighter.name);
// console.log(myFighter.getName());
// console.log(myFighter.getDamage());
// console.log(myFighter.getHealth());
// console.log(myFighter.getAgility());
// console.log(myFighter.logCombatHistory());
// myFighter.heal(10);
// myFighter.dealDamage(15);
// myFighter.addWin();
// myFighter.addLoss();
// console.log(myFighter.logCombatHistory());
//debugger;

console.log(`\nPRESENT FIGHTERS:`);
const myFighter2 = new Fighter('Bob', 30, 100, 35);
// console.log(myFighter2);
// console.log(myFighter2.name);
// console.log(myFighter2.getName());
// console.log(myFighter2.getDamage());
// console.log(myFighter2.getHealth());
// console.log(myFighter2.getAgility());
// console.log(myFighter2.logCombatHistory());

function battle (fighter, fighterEnemy) {
  if (fighter.getHealth() === 0)  {
    console.log(`    ${fighter.getName()} is dead and can't fight.`);
    return;
  }else if (fighterEnemy.getHealth() === 0)  {
     console.log(`    ${fighterEnemy.getName()} is dead and can't fight.`);
    return;
  }

  console.log(`\nTHE BATTLE BETWEEN ${fighter.getName()} vs ${fighterEnemy.getName()}:`);
  let i = 0;
  while ((fighter.getHealth() > 0) && (fighterEnemy.getHealth() > 0)) {
    console.log(`Atacking ${fighter.getName()}...`);
    fighter.attack(fighterEnemy);

    if (fighterEnemy.getHealth() > 0) {
      console.log(`Atacking ${fighterEnemy.getName()}...`);
      fighterEnemy.attack(fighter);
    }

    i++;
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
  return;
}

battle(myFighter, myFighter2);
console.log(myFighter.logCombatHistory());
console.log(myFighter2.logCombatHistory());
battle(myFighter, myFighter2);
