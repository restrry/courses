module Demo where

import Control.Monad
import Control.Monad.State
fibStep :: State (Integer, Integer) ()
fibStep = do
    (v1, v2) <- get
    put(v2, v1 + v2)

execStateN :: Int -> State s a -> s -> s
execStateN n m = execState $ replicateM n m

fib :: Int -> Integer
fib n = fst $ execStateN n fibStep (0, 1)

tick :: State Integer Integer
tick = do
    n <- get
    put(n + 1)
    return n

plus' :: Int -> Int -> Int
plus' n x = execState (replicateM n tick) x

data Tree a = Leaf a | Fork (Tree a) a (Tree a)
    deriving(Show, Eq)

-- numberTree :: Tree () -> Tree Integer
-- numberTree tree = snd $ helper (0, tree)
--     where
--         helper (acc, Leaf _)     = (acc + 1, Leaf (acc + 1))
--         helper (acc, Fork l v r) = let
--                 (accL, l') = helper (acc, l)
--                 accV = accL + 1
--                 (accR, r') = helper (accV, r)
--                 in (accR, Fork l' accV r')

numberTree :: Tree () -> Tree Integer
numberTree tree = evalState (inorder tree) 1
    where
        inorder (Leaf _) = do
            n <- tick
            return (Leaf n)
        inorder(Fork l _ r) = do
            nL <- inorder l
            n <- tick
            nR <- inorder r
            return (Fork nL n nR)
