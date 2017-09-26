module Demo where

data List a = Nil | Cons a (List a)
    deriving Show
-- data [] a = [] | a : ([] a)
-- :t Cons 'z' Nil ~> Cons 'z' Nil :: List Char
-- yz = Cons 'y' (Cons 'z' Nil) ~> List char
-- :t yz ~> List Char
-- yz ~> Cons 'y' (Cons 'z' Nil)

--https://stepik.org/lesson/7009/step/3

fromList :: List a -> [a]
fromList Nil           = []
fromList (Cons a (xs)) = a : fromList xs

toList :: [a] -> List a
toList []         = Nil
toList (x:xs)     = Cons x (toList xs)

-- https://stepik.org/lesson/7009/step/4
data Nat = Zero | Suc Nat
    deriving Show

-- factorial :: Integer -> Integer
-- factorial 0 = 1
-- factorial n = n * factorial (n - 1)

-- fromNat :: Nat -> Integer
-- fromNat Zero = 0
-- fromNat (Suc n) = fromNat n + 1

-- integerToNat :: Integer -> Nat
-- integerToNat 0 = Zero
-- integerToNat n = Suc (integerToNat (n - 1))

-- add a b = integerToNat $ (fromNat a) + (fromNat b)
-- mul a b = integerToNat $ (fromNat a) * (fromNat b)
-- fac n = integerToNat $ factorial $ fromNat n

add :: Nat -> Nat -> Nat
add Zero    b       = b
add a       Zero    = a
add (Suc a) (Suc b) = add (Suc (Suc a)) b

mul :: Nat -> Nat -> Nat
mul x y = helper x y
    where
    helper (Suc Zero)  acc         = acc
    helper (Suc a)     acc         = helper a (add acc y)
    helper _           _           = Zero

fac :: Nat -> Nat
fac x = helper x x
    where
    helper (Zero)      _           = Suc Zero
    helper (Suc Zero)  acc         = acc
    helper (Suc a)     acc         = mul x (fac a)
