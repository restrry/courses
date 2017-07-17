function getPrototypeChainFor(el){
    const prototypes = [];
    let elem = el;
    for(;;){
        const proto = Object.getPrototypeOf(elem);
        if(!proto) break;
        prototypes.push(proto);
        elem = proto;
    }

    return prototypes;
}

const buildChainString = arr => arr.map(Object.toString).join('-->');
const flow = (...fns) => x => fns.reduce((x, f) => f(x), x);
const getProtoString = flow(getPrototypeChainFor, buildChainString);
