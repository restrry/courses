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


-- https://stepik.org/lesson/7009/step/5
data Tree a = Leaf a | Node (Tree a) (Tree a)

height :: Tree a -> Int
height (Leaf _)   = 0
height (Node x y) = 1 + max (height x) (height y)

size :: Tree a -> Int
size (Leaf _)   = 1
size (Node x y) = 1 + size x + size y

-- https://stepik.org/lesson/7009/step/6
-- data Tree a = Leaf a | Node (Tree a) (Tree a)

avg :: Tree Int -> Int
avg t =
    let (c,s) = go t
    in s `div` c
  where
    go :: Tree Int -> (Int,Int)
    go (Leaf v)   = (1, v)
    go (Node x y) = tupleSum (go x) (go y)

    tupleSum :: (Int,Int) -> (Int, Int) -> (Int, Int)
    tupleSum a b = (fst a + fst b, snd a + snd b)


-- https://stepik.org/lesson/7009/step/8
infixl 6 :+:
infixl 7 :*:

data Expr = Val Int | Expr :+: Expr | Expr :*: Expr
    deriving (Show, Eq)

expand :: Expr -> Expr
expand ex@((e1 :+: e2) :*: e) = helper ex (expand e1 :*: expand e :+: expand e2 :*: expand e)
expand ex@(e :*: (e1 :+: e2)) = helper ex (expand e :*: expand e1 :+: expand e :*: expand e2)
expand ex@(e1 :+: e2)         = helper ex (expand e1 :+: expand e2)
expand ex@(e1 :*: e2)         = helper ex (expand e1 :*: expand e2)
expand e                      = e

helper exression definition = if exression == definition
                                then definition
                                else expand (definition)

test0 = expand $ Val 1 :*: (Val 2 :*: (Val 3 :+: Val 4))
test1 = expand $ (Val 1 :+: Val 2 :+: Val 3) :*: (Val 4 :+: Val 5)
