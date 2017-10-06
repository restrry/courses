module Demo where

type Name = String
type DataBase = [(Name, Name)]

fathers, mothers :: DataBase
fathers = [ ("Bill", "John"),
            ("Ann", "John"),
            ("John", "Piter")]

mothers = [ ("Bill", "Jane"),
            ("Ann", "Jane"),
            ("John", "Alice"),
            ("Jane", "Dorothy"),
            ("Alice", "Mary")]

getM, getF :: Name -> Maybe Name
getM person = lookup person mothers
getF person = lookup person fathers

-- getF "Bill" >>= getM >>= getM
-- the same in imperative example
-- do {f <- getF "Bill"; gm <- getM f; getM gm}

granmas :: Name -> Maybe (Name, Name)
granmas person = do
    m   <- getM person
    gmm <- getM m
    f   <- getF person
    gmf <- getM f
    return (gmm, gmf)

-- granmas "Ann" ~> ("..", "..")
-- granmas "Ololo" ~> Nothing - no both grandmas
-- granmas "John" ~> Nothing - no one grandma


list = [(x, y) | x <- [1,2,3], y <- [4,5,6]]

list' = do
    x <- [1, 2, 3]
    y <- [4, 5, 6]
    return (x, y)

list'' =
    [1, 2, 3] >>= (\x ->
    [4, 5, 6] >>= (\y ->
    return (x, y)))

lst = do
    x <- [1, 2, 3]
    y <- [1, 2]
    -- here we pack in monad with return and unpack with pattern mattching
    -- if can't match mondic fail is called
    True <- return (x /= y)
    return (x, y)

lst = do
    x <- [1, 2, 3]
    y <- [1, 2]
    -- if (pred) then [x] (length = 1!) else []
    if (x / y) then "A" else []
    return (x, y)
