sumSquares x y = x ^ 2 + y ^ 2;
lenVec3 x y z = sqrt(x^2 + y^2 + z^2)

let g x = (if x > 0 then 1 else (-1)) + 3

-- reutrn 0 if passed value is 0, 1 if greater than 0, -1 otherwise
sign x = if x /= 0
    then if x < 0
        then -1
        else 1
    else 0

-- those are equal
let max5 x = max 5 x
let max5' = max 5

let discount limit proc sum = if sum >= limit
    then sum * (100 - proc) / 100
    else sum

let standardDiscount = discount 1000 5
-- standardDiscount 2000 ~> 1900.0
