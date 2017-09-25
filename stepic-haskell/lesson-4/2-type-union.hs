module Demo where

-- data type - data constructor
data Point = Point Double Double deriving Show

origin :: Point
origin = Point 0.0 0.0

distanceToOrigin :: Point -> Double
distanceToOrigin (Point x y) = sqrt (x^2 + y^2)

--https://stepik.org/lesson/4985/step/3
distance :: Point -> Point -> Double
distance (Point x1 y1) (Point x2 y2) = sqrt ((x2 - x1) ^ 2 + (y2 - y1) ^ 2)

data Roots = Roots Double Double | None
    deriving Show

roots :: Double -> Double -> Double -> Roots
roots a b c
    | discr >= 0 = Roots x1 x2
    | otherwise  = None
    where
        x1 = helper (-d)
        x2 = helper d
        helper x = (-b + x) / (2 * a)
        d = sqrt discr
        discr = b ^ 2 - 4 * a * c

-- https://stepik.org/lesson/4985/step/5

data Shape = Circle Double | Rectangle Double Double

area :: Shape -> Double
area (Circle r)      = pi * (r ^ 2)
area (Rectangle a b) = a * b

square :: Double -> Shape
square a = Rectangle a a

{-
wont work. we can match on function, but on contstructor
that's kind of abstract data time that hides type
isSquare :: Shape -> Bool
isSquare (square _) = True
isSquare _          = False
-}

--https://stepik.org/lesson/4985/step/8
isSquare (Rectangle a b) = a == b
isSquare _               = False

-- https://stepik.org/lesson/4985/step/6
-- data Result' = Res' Int | Ok

-- instance Show Result' where
--     show Ok       = "Success"
--     show (Res' n) = "Fail: " ++ show n

-- doSomeWork' :: SomeData -> Result'
-- doSomeWork' x = case doSomeWork x of
--                  (Success,_) -> Ok
--                  (Fail, n)   -> Res' n

--https://stepik.org/lesson/4985/step/9

data Bit = Zero | One

data Sign = Minus | Plus
isEqualSign :: Sign -> Sign -> Bool
isEqualSign Minus Minus = True
isEqualSign Plus  Plus  = True
isEqualSign _     _     = False

data Z = Z Sign [Bit]

bitArray2Int :: [Bit] -> Int
bitArray2Int [] = 0
bitArray2Int xs = foldr f 0 (zip [0..] xs) where
        f (i, Zero) acc = acc
        f (i, One)  acc = acc + 2 ^ i

int2bitArray :: Int -> [Bit]
int2bitArray 0 = []
int2bitArray n | n `mod` 2 == 1 = One  : int2bitArray (n `div` 2)
               | n `mod` 2 == 0 = Zero : int2bitArray (n `div` 2)

mul :: Z -> Z -> Z
mul (Z sign1 xs1) (Z sign2 xs2)
    | isEqualSign sign1 sign2 = Z Plus  (mulList xs1 xs2)
    | otherwise               = Z Minus (mulList xs1 xs2)
    where
        mulList as bs = int2bitArray $ bitArray2Int as * bitArray2Int bs

add :: Z -> Z -> Z
add (Z sign1 xs1) (Z sign2 xs2)
    | isEqualSign sign1 sign2 = Z sign1 (int2bitArray $ xsN1 + xsN2)
    | otherwise               = if xsN1 > xsN2
                                  then Z sign1 (int2bitArray $ xsN1 - xsN2)
                                  else Z sign2 (int2bitArray $ xsN2 - xsN1)
    where
        xsN1 = bitArray2Int xs1
        xsN2 = bitArray2Int xs2

fromMaybe (Just x) = x
fromMaybe Nothing  = error "cant retrive"

-- lazy matching. match everytime!
fromMaybe' ~(Just x) = x
-- string below is unreachable
-- fromMaybe' Nothing  = error "cant retrive"

(***) :: (a -> b) -> (c -> d) -> (a, c) -> (b, d)
-- (***) f g p = (f $ fst p, g $ snd p) -- access to p is lazy and delayed
-- (***) f g (x, y) = (f x, g y) -- access eager, since we match. throw on (***) (const 1) (const 2) undefined
(***) f g ~(x, y) = (f x, g y) -- with lazy access we avoid that problem
