module Demo where

import Prelude hiding (Bool, True, False)

data Bool = True | False

alwaysTrue :: Int -> Bool
alwaysTrue n = True

data B = T | F deriving (Show, Eq, Read, Enum)
not' :: B -> B
not' T = F
not' F = T

-- https://stepik.org/lesson/4916/step/5
instance Show Color where
    show Red   = "Red"
    show Green = "Green"
    show Blue  = "Blue"

intToChar :: Int -> Char
intToChar 0 = '0'
intToChar 1 = '1'
intToChar 2 = '2'
intToChar 3 = '3'
intToChar 4 = '4'
intToChar 5 = '5'
intToChar _ = 'N'

isz :: Char -> Bool
isz 'z' = True
isz _   = False

stringToBool :: String -> Bool
stringToBool "true"  = True
stringToBool "false" = False

--https://stepik.org/lesson/4916/step/7
charToInt :: Char -> Int
charToInt '0' = 0
charToInt '1' = 1
charToInt '2' = 2
charToInt '3' = 3
charToInt '4' = 4
charToInt '5' = 5
charToInt '6' = 6
charToInt '7' = 7
charToInt '8' = 8
charToInt '9' = 9

-- https://stepik.org/lesson/4916/step/8
data Color = Red | Green | Blue
stringToColor :: String -> Color
stringToColor "Red"   = Red
stringToColor "Green" = Green
stringToColor "Blue"  = Blue

-- https://stepik.org/lesson/4916/step/11
cmp :: LogLevel -> LogLevel -> Ordering
cmp Error   Error   = EQ
cmp Warning Warning = EQ
cmp Info    Info    = EQ
cmp Error   _       = GT
cmp Info    _       = LT
cmp Warning Error   = LT
cmp Warning Info    = GT

lessThanError :: LogLevel -> Bool
lessThanError lvl =
    case cmp lvl Error of
        LT -> True
        _  -> False

-- https://stepik.org/lesson/4916/step/13
data Result = Fail | Success
doSomeWork :: SomeData -> (Result,Int)
processData :: SomeData -> String
processData x =
    case doSomeWork x of
        (Success, _) -> "Success"
        (Fail, code) -> "Fail: " ++ show code
