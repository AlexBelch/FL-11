let game = confirm('Do you want to play a game?');

if (!game) {
    alert('You did not become a billionaire, but can.');
} else {
    let totalPrize = 0;
    let max = 8;
    let step = 0;
    let zero = 0;
    let one = 1;
    let two = 2;
    let three = 3;
    let four = 4;
    let eight = 8;
    let hundred = 100;
    let fifty = 50;
    let quarter = 25;

    do {
        let digit = Math.round(Math.random() * max);
        let possiblePrize = 0;

        for (let i = three; i > 0; i--) {
            switch (i) {
                case three:
                    possiblePrize = hundred * Math.pow(two, step);
                    break;
                case two:
                    possiblePrize = fifty * Math.pow(two, step);
                    break;
                case one:
                    possiblePrize = quarter * Math.pow(two, step);
                    break;
                default:
                    break;
            }

            let answer = parseInt(
                prompt(`Choose a roulette pocket number from 0 to ${max}
Attempts left: ${i}
Total prize: ${totalPrize}$
Possible prize on current attempt: ${possiblePrize}$
                `),
                10
            );

            if (digit === answer) {
                totalPrize = totalPrize + possiblePrize;

                game = confirm(
                `Congratulation, you won!  Your prize is: ${totalPrize}$. Do you want to continue?`
                );
                if (!game) {
                    alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
                    game = confirm('Do you want to play a game?');
                    totalPrize = zero;
                    max = eight;
                    step = zero;
                } else {
                    max = max + four;
                    step = step + one;
                }
                break;
            } else if (i === 1) {
                totalPrize = zero;
                max = eight;
                step = zero;
                alert(`Thank you for your participation. Your prize is: ${totalPrize}$`);
                game = confirm('Do you want to play a game?');
            }
        }
    } while (game);
}
