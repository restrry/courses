-- https://stepik.org/lesson/12399/step/3
class KnownToGork a where
    stomp :: a -> a
    doesEnrageGork :: a -> Bool

class KnownToMork a where
    stab :: a -> a
    doesEnrageMork :: a -> Bool

class (KnownToGork a, KnownToMork a) => KnownToGorkAndMork a where
    stompOrStab :: a -> a
    stompOrStab a | doesEnrageMork a && doesEnrageGork a = stomp $ stab a
                  | doesEnrageGork a = stab a
                  | doesEnrageMork a = stomp a
                  | otherwise = a

-- https://stepik.org/lesson/12399/step/7
class (Bounded a, Eq a, Enum a) => SafeEnum a where
    ssucc :: a -> a
    ssucc a | a == maxBound = minBound
            | otherwise = succ a

    spred :: a -> a
    spred a | a == minBound = maxBound
            | otherwise = pred a

-- if we want to check in ghci we need to instantiate explicitly
instance SafeEnum Bool
-- ssucc False ~> True
-- ssucc True ~> False

-- https://stepik.org/lesson/12399/step/9
avg :: Int -> Int -> Int -> Double
avg a b c = (fromIntegral a + fromIntegral b + fromIntegral c) / 3
