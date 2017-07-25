// find max depth of nested elems
// https://stackoverflow.com/questions/43423005/find-depth-of-the-nested-ul-ol-tags
function countInclusionsOf(selector){
    return Array.from(document.querySelectorAll(selector))
        .map(function(el) {
            let depth = 0;
            let elem = el;
            while(elem){
                elem = elem.parentElement.closest(selector);
                depth++;
            }
            return depth;
        });
}

const flow = (...fns) => x => fns.reduce((x, f) => f(x), x);
const pickMaxFromArray = (values) => Math.max(...values);

const calcMaxDepthFor = flow(countInclusionsOf, pickMaxFromArray);
const result = calcMaxDepthFor('ul, ol') || 0;

