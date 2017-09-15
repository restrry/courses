-- call function in operator style
6 `max` 7

-- call operator in function style
(+) 6 7

-- set oparation priorities
-- infix N - set priority [1..10]
-- infixr N - set priority with right associativity
-- infixl N - set priority with left associativity
-- from standard library:
-- infixr 8  ^,     `logBase`
-- infixl 7  *, /,  `div`, `mod`
-- infixl 6  +, -
-- infix  4  ==, /=, >, >=, <, <=

-- our own operator could be created from next symbols:
-- ! # $ % * + . / < = > ? @ \ ^ | - ~

-- creating squaring sum operator
infixl 6 *+*
-- decalring in infix style
a *+* b = a ^ 2 + b ^ 2
-- decalring in prefix style
(*+*) a b = a ^ 2 + b ^ 2
-- 3 *+* 4 ~> (*+*) 3 4 ~> 24

-- implement function cals arguments absolute values diff
(|-|) a b = abs (a - b)

-- bind first argument
(2 /) 4 -- ~> 0.5
-- bind second argument
(/ 2) 4 -- ~> 2.0

-- apply function to arguments
-- $ has the lowest priority (0)
-- useful for pointfree programming
f $ x = f x

{-
sin 0 ~> sin $ 0 ~> 0.0
sin(pi / 2) ~> sin $ pi / 2 ~> 1.0
f (g x (h y)) ~> f $ g x (h y) ~> f $ g x $ h y
-}

-- write the same in point-free style:
-- logBase 4 (min 20 (9 + 7))
-- logBase 4 $ min 20 $ 9 + 7
