import Data.Char (isDigit)

-- https://stepik.org/lesson/8439/step/4
data Token = Number Int | Plus | Minus | LeftBrace | RightBrace
    deriving (Eq, Show)

parseToInt x = read x::Int

asToken :: String -> Maybe Token
asToken str | all isDigit str = Just (Number (parseToInt str))
            | str == "+"      = Just Plus
            | str == "-"      = Just Minus
            | str == "("      = Just LeftBrace
            | str == ")"      = Just RightBrace
            | otherwise       = Nothing

-- like standard sequence
-- sequence [] = return []
-- sequence (m:ms) = do
--     x <- m
--     xs <- sequence ms
--     return (x:xs)

tokenize :: String -> Maybe [Token]
tokenize input = sequence $ map asToken $ words input

-- https://stepik.org/lesson/8439/step/6
data Board = Board Int
    deriving (Show)
nextPositions :: Board -> [Board]
nextPositions (Board x) = map Board [x-1,x+1]

nextPositionsN :: Board -> Int -> (Board -> Bool) -> [Board]
nextPositionsN b n pred
    | n < 0  = []
    | n == 0 = if pred b then [b] else []
    | otherwise = do
        pos <- nextPositions b
        nextPos <- nextPositionsN pos (n - 1) pred
        return nextPos

    -- | otherwise =
    --     nextPositions b >>= (\pos ->
    --     nextPositionsN pos (n - 1) pred >>=(\nextPos ->
    --     return nextPos))

-- https://stepik.org/lesson/8439/step/8
pythagoreanTriple :: Int -> [(Int, Int, Int)]
pythagoreanTriple max
        | max <= 0 = []
        | otherwise = do
            a <- [1..max]
            b <- [a..max]
            c <- [b..max]
            True <- return (isPythagoreanTriple a b c)
            return (a, b, c)
            where isPythagoreanTriple a b c = a ^ 2 + b ^ 2 == c ^ 2


test_8_0 = pythagoreanTriple 5  == [(3,4,5)]
test_8_1 = pythagoreanTriple 0  == []
test_8_2 = pythagoreanTriple 10 == [(3,4,5),(6,8,10)]

allTests_8 = zip [0..] [test_8_0, test_8_1, test_8_2]
