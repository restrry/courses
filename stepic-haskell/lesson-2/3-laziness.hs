{-
REDucible EXpression
expression that could be reduced
the first redex (2 + 3)
~> sumIt (2 + 3) 4
the seconde redex if function call (args are inlined)
~> (2 + 3) 4
~> 5 + 4
~> 9

add7 :: Int -> Int -> Int
add7 x y = x + 7

lazy calculation model
add7 1 (2 + 3) ~> 1 + 7 ~> 8

eager calculation model
add7 1 (2 + 3) ~> add7 1 5 ~> 1 + 7 ~> 8

dup :: Int -> (Int, Int)
dup x = (x, x)

not every time lazy model is more efficent
lazy calculation model
dup (2 + 3) ~> (2 + 3, 2 + 3) ~> (5, 2 + 3) ~> (5, 5)

eager calculation model
dup (2 + 3) ~> dup 5 ~> (5, 5)

Normal Form - NF when function doesnt contain any redex inside
42
(3, 4)
\x -> x + 2

not NF (contain redex and could be simplified)
"Real " ++ "world"
sin (pi / 2)
(\x -> x + 2) 5
(3, 1 + 5)

WHNF - weak head normal form
\x -> x + 2 * 3 lambda body
(3, 1 * 5) constructor body
(,) (1 * 5) partially apllied constructor
(+) (7 ^ 2) built-in partially apllied constructor

to force calculations for lazy expressions we can use `seq` operator.
seq :: a -> b -> b
seq _|_ b = _|_    -- if  a diverges then seq deverges too
seq a   b = b      -- returns b otherwise

seq forces calculation up to WHNF
seq undefined 2 ~>              exception undefined
seq (id undefined) 2 ~>         exception undefined
seq (undefined, undefined) 2 ~> 2 since the first argument is in WHNF
seq (\x -> undefined) 2 ~>      2 since the first argument is in WHNF

also forces calculations
($!) :: (a -> b) -> a -> b
f $! x = x `seq` f x --here we force argument calc before applying function to argument

const 42 undefined ~>       42
const 42 $ undefined ~>     42
const 42 $! undefined ~>    exception undefined

-}

factorial n | n >= 0    = helper 1 n
            | otherwise = error "arg must be >= 0"

helper acc 0 = acc
-- here we force (acc * n) calculation to get rid of delayed calculation in memory
helper acc n = (helper $! (acc * n)) (n - 1)

