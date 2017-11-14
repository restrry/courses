module Demo where

import Control.Monad (replicateM)

newtype State s a = State { runState :: s -> (a,s) }

-- runState :: State s a -> s -> (a, s)

instance Monad (State s) where
    return a = State $ \st -> (a, st)
    m >>= k = State $ \st ->
        let (a, st') = runState m st
            m' = k a
        in runState m' st'

execState :: State s a -> s -> s
execState m s = snd (runState m s)

evalState :: State s a -> s -> a
evalState m s = fst (runState m s)


get :: State s s
get = State $ \st -> (st, st)
-- runState get 5 ~> (5, 5)

put :: s -> State s ()
put st = State $ (\_ -> (), st)
-- runState (put 6) 5 ~> ((), 7)

tick :: State Int Int
tick = do
    n <- get
    put(n+1)
    return n
-- runState tick 5 ~> (5, 6)

modify :: (s -> s) -> State s ()
-- modify f = State $ \s -> ((), f s)
modify f = do
    s <- get
    put (f s)

-- runState (modify (^2)) 5 ~> ((), 25)

-- https://stepik.org/lesson/8444/step/6
-- readerToState :: Reader r a -> State r a
-- readerToState m = state $ \st -> (runReader m st, st)

-- https://stepik.org/lesson/8444/step/7
-- writerToState :: Monoid w => Writer w a -> State w a
-- writerToState m = state $ \st -> (a, st `mappend` w)
--     where (a, w) = runWriter m

succ' :: Int -> Int
succ' n = execState tick n

plus :: Int -> Int -> Int
plus n x = execState (sequence $ replicate n tick) x

replicateM :: (Monad m) => Int -> m a -> m [a]
replicateM n = sequnce . replicate n

plus' :: Int -> Int -> Int
plus' n x = execState (replicateM n tick) x
