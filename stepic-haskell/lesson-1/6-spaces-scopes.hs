module Demo where

roots :: Double
        -> Double
        -> Double
        -> (Double, Double)

roots a b c =
    (
        (-b - sqrt (b ^ 2 - 4 * a * c)) / (2 * a)
    ,
        (-b + sqrt (b ^ 2 - 4 * a * c)) / (2 * a)
    )

roots2 a b c =
    let d = sqrt (b ^ 2 - 4 * a * c) in
    (
        (-b - d) / (2 * a),
        (-b + d) / (2 * a)
    )

roots3 a b c =
    let {
        d = sqrt (b ^ 2 - 4 * a * c);
        x1 = (-b - d) / (2 * a);
        x2 = (-b + d) / (2 * a)
    } in (x1, x2)

-- all indents should have the same size
-- bigger size is interpreted as continuation of the previous string
-- indentation = 0 is for global definitions
roots4 a b c =
    let
        x1 = (-b - d) / aTwice
        x2 = (-b + d) / aTwice
        d  = sqrt $ b ^ 2 - 4 * a * c
        aTwice = 2 * a
    in (x1, x2)

factorial6 n
    | n >= 0 =
        let
            helper acc 0 = acc
            helper acc n = helper (acc * n) (n - 1)
        in
        helper 1 n
    | otherwise = error "arg must be >= 0"

roots5 a b c = (x1, x2) where
    x1 = (-b - d) / aTwice
    x2 = (-b + d) / aTwice
    d  = sqrt $ b ^ 2 - 4 * a * c
    aTwice = 2 * a

-- where is useful for decalring for the whole expression context
factorial7 n | n >= 0 = helper 1 n
             | otherwise = error "arg must be >= 0"
    where
        helper acc 0 = acc
        helper acc n = helper (acc * n) (n - 1)

-- as well as variable, function, we can bind local pattern matching
rootsDiff a b c = let
    (x1, x2) = roots a b c
    in
    x2 - x1

-- https://stepik.org/lesson/8414/step/6
seqA n
    | n == 0 = 1
    | n == 1 = 2
    | n == 2 = 3
    | n >= 3 = let
            helper a0 a1 a2 2 = a2
            helper a0 a1 a2 n = helper a1 a2 (a1 + a2 - 2 * a0) (n - 1)
            in helper 1 2 3 n
    | otherwise = error "arg must be >= 0"

-- https://stepik.org/lesson/8414/step/8

sum'n'count :: Integer -> (Integer, Integer)
sum'n'count x = helper 0 0 (abs x)
    where
    helper val count (-1) = (val, count)
    helper val count n | n >= 10     = helper (val + modV) (count + 1) divV
                       | otherwise   = helper (val + n)    (count + 1) (-1)
        where (divV, modV) = divMod n 10


-- https://stepik.org/lesson/8414/step/9
integration :: (Double -> Double) -> Double -> Double -> Double
integration f a b | a == b = 0
                  | a <= b = helper f 0 0
                  | a > b = (-1) * integration f b a
            where
               n = 1000
               diff = (b - a) / n
               helper f acc count | count == 0 || count == n = helper f (acc + 0.5 * f (a + count * diff)) (count + 1)
                                  | count > n  = diff * acc
                                  | otherwise = helper f (acc + f (a + count * diff)) (count + 1)
