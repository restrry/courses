const { expect } = require('chai');

const dayPrice = 2;
const weekPrice = 7;
const monthPrice = 25;

const daysInMonth = 30;
const daysInWeek = 7;

const last = arr => arr[arr.length - 1];
const setLast = (arr, value) => {
    arr[arr.length - 1] = value;
}

function calcMinCostFor(days){
    const costByDay = calcCostByDay(days);
    const purchasesByDays = regeneratePurchases(costByDay);

    return {
        cost: last(costByDay),
        purchases: purchasesByDays
    };
}

function calcCostByDay(travelDates){
    // one additional for 0
    const costByDay = Array(daysInMonth + 1).fill(0);
    for (let i = 1; i < costByDay.length; i++){
        costByDay[i] = Math.min(
            // to optimise search with includes we can switch from array to hash
            // but if by description we don't care about perf
            // check for a day
            costByDay[i - 1] + (travelDates.includes(i) ? dayPrice : 0),
            // check for a week
            i - daysInWeek >= 0 ? costByDay[i - daysInWeek] + weekPrice : Infinity
        );
    }

    // check for a month
    setLast(costByDay, Math.min(last(costByDay), monthPrice));

    return costByDay;
}

function regeneratePurchases(costByDay){
    const res = [];
    let i = costByDay.length - 1;

    if (costByDay[i] === monthPrice){
        res.push({day: 1, price: monthPrice});
        return res;
    }

    while(i > 0){
        if(costByDay[i] - costByDay[i - 1] === dayPrice){
            res.unshift({day: i, price: dayPrice});
            i--;
        } else if(costByDay[i] !== costByDay[i - 1]){
            res.unshift({day: i - daysInWeek + 1, price: weekPrice});
            i -= daysInWeek;
        } else {
            i--;
        }
    }

    return res;
}

// ------------------- tests -----------------------

const suit1 = calcMinCostFor([1, 2, 4, 5, 7, 29, 30]);

expect(suit1.cost).to.equal(11);
expect(suit1.purchases).to.deep.equal([
    { day: 1, price: 7 },
    { day: 29, price: 2 },
    { day: 30, price: 2 }
]);


const suit2 = calcMinCostFor([1, 7, 8, 9, 10, 15, 16, 17, 18, 21, 25]);

expect(suit2.cost).to.equal(18);
expect(suit2.purchases).to.deep.equal([
    { day: 1, price: 2 },
    { day: 4, price: 7 },
    { day: 12, price: 7 },
    { day: 25, price: 2 }
]);


const suit3 = calcMinCostFor([1, 2, 4, 5, 7, 8, 9, 10, 11, 12, 29, 30]);

expect(suit3.cost).to.equal(18);
expect(suit3.purchases).to.deep.equal([
    { day: 1, price: 7 },
    { day: 8, price: 7 },
    { day: 29, price: 2 },
    { day: 30, price: 2 }
]);


const suit4 = calcMinCostFor([1, 5, 7, 8, 9, 10, 24, 26, 29, 30]);

expect(suit4.cost).to.equal(16);
expect(suit4.purchases).to.deep.equal([
    { day: 1, price: 2 },
    { day: 3, price: 7 },
    { day: 24, price: 7 }
]);

const suit5 = calcMinCostFor([1, 2, 3, 4, 5, 7, 8, 9, 10, 17, 18, 20, 22, 24, 26, 29, 30]);

expect(suit5.cost).to.equal(25);
expect(suit5.purchases).to.deep.equal([
    { day: 1, price: 25 }
]);
