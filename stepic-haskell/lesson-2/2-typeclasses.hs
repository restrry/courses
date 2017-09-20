module Demo where
-- where Num is interface applied to a. that's said a implements Num. a limited in context Num
-- :t 7 ~> 7 :: Num a => a
-- :t (+) ~> (+) :: Num a => a -> a -> a
-- :t (>) ~> (>) :: Ord a => a -> a -> a
-- here we have 2 limitations: a should be limied by 2 contexts (implement) -> Num & Ord
-- :t (> 7) ~> (> 7) :: (Num a, Ord a) => a -> Bool
-- :t (> (1, 2)) ~> (> (1, 2)) :: (Num t, Num t1, Ord t, Ord t1) => (t, t1) -> Bool

class Eq a where
    (==), (/=) :: a -> a -> Bool
    -- default implementation
    x /= y = not (x == y)
    -- we could declre circluar deps
    -- and implmement only one method in an specific instance
    -- x == y = not (x /= y)

instance Eq Bool where
    True  ==    True    = True
    False ==    False   = True
    _     ==    _       = Fale

instance (Eq a, Eq b) => Eq (a, b) where
    p1 == p2 = fst p1 == fst p2 && snd p1 == snd p2
    -- specific class implementation, covers default one
    -- x /= y = not (x == y)

-- :t (==) ~> Eq a => a -> a -> Bool
-- :t (== 42) ~> (Eq a, Num a) => a -> Bool
-- :t (== 'x') ~> Char -> Bool
-- aka include
-- :t elem ~> Eq a => a -> [a] -> Bool

--the instance implements class if it implements all methods of that class
-- class extension. extension in terms of inteface, not implementation!
class (Eq a) => Ord a where
    (<), (<=), (>=), (>) :: a -> a -> Bool
    max, min :: a -> a -> a
    compare :: a -> a -> Ordering
    -- minimal complete definitio: either compare or <=

-- multliple class extension
class (Eq a,  Printable a) => MyClass a where
    ...

-- https://stepik.org/lesson/8420/step/7
class Printable a where
    toString :: a -> String

instance Printable Bool where
    toString True = "true"
    toString False = "false"

instance Printable () where
    toString () = "unit type"

instance (Printable a, Printable b) => Printable (a, b) where
    toString(a, b) = "(" ++ toString a ++ "," ++ toString b ++ ")"

-- :t show ~> Show a => a -> String  == aka serialization
-- :t read ~> Read a => String -> a  == aka deserialization
-- read "5" :: Int ~> 5
-- read "5" :: Double ~> 5.0
-- read "[1,2]" :: Double ~> [1.0, 2.0]
-- for complex cases use reads
-- reads "5 rings" :: [(Int, String)] ~> [(5, " rings")]

-- roughly speaking all number, chars etc are enum with order and it could be expressed as
class Enum a where
    succ, pred :: a -> a
    toEnum :: Int -> a
    fromEnum :: a -> Int

-- succ 4 ~> 5
-- pred 4 ~> 3
-- pred 'y' ~> 'y'
-- succ 'y' ~> '{'
-- fromEnum 'z' ~> 122
-- toEnum 122 :: Int ~> 122
-- toEnum 122 :: Char ~> 'z'

-- set limitations on enum types
class Bounded a where
    minBound, maxBound :: a

-- minBound :: Bool ~> False
-- maxBound :: Bool ~> True
-- minBound :: Int ~> -9....
-- maxBound :: Int ~> 9....
-- bound can't limit Integer, since that type is ifinit

-- all number are member of Num class
class Num a where
    (+), (-), (*) :: a -> a -> a
    negate :: a -> a
    abs :: a -> a
    signum :: a -> a
    fromInteger :: Integer -> a

    x - y = x + negate y
    negate x = 0 - x

{-
Integral type - 1, 2, 3 ... (Int, Integer)
:i Integral
class (Real a, Enum a) => Intefral a where
    div :: a -> a -> a
    mod :: a -> a -> a
    ... math operations
    toInteger :: a -> Integer

fractional type 1.1... (Float, Double)
:i Fractional
class Num a => Fractional a where
    (/) :: a -> a -> a

:i Floating (Float, Double)
class Fractional a => Floating a where
    log :: a -> a
    pi :: a
    ... math operations

:i RealFrac
class(Real a, Fractional a) => RealFrac a where
    round, celling, floor :: Integral b => a -> b
    ... math rounding operations

:i RealFloat
class (RealFrac a, Floating a) => RealFloat a where
    isNaN :: a -> Bool
    ... internal operations
-}
