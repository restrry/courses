module Demo where

import Prelude hiding (($))
import Control.Monad (ap, liftM)
{-
f :: a -> b

FUNCTIONS WITH EFFECTS
f :: a -> Maybe b       - sometimes can fail
f :: a -> [b]           - can return several results
f :: a -> (Either s) b  - sometimes can fainish with typed exception
f :: a -> (s, b)        - can write in log
f :: a -> ((->) e) b    - can read from env
f :: a -> (State s) b   - can work with changable state
f :: a -> IO b          - make i/o opertaions

Kleisli arrow
f :: a -> m b
-}
-- https://stepik.org/lesson/8437/step/3

data Log a = Log [String] a
    deriving (Show)

toLogger :: (a -> b) -> String -> (a -> Log b)
toLogger f msg = \x -> Log [msg] (f x)

execLoggers :: a -> (a -> Log b) -> (b -> Log c) -> Log c
execLoggers x f g = Log [msg1, msg2] v2
    where
        Log [msg1] v1 = f x
        Log [msg2] v2 = g v1


add1Log = toLogger (+ 1) "added one"
mult2Log = toLogger (* 2) "multiplied by 2"
-- execLoggers 3 add1Log mult2Log
{-
class Monad m where
    return :: a -> m a
    (>>=) :: m a -> (a -> m b) -> m b ~> bind

infixl 1 >>=
-}
toKleisli :: Monad m => (a -> b) -> (a -> m b)
-- toKleisli f = \x -> return (f x)
toKleisli f x = return (f x)
-- toKleisli cos 0 :: [Double] ~> [1.0]
-- toKleisli cos 0 :: Maybe Double ~> Just 1.0
-- toKleisli cos 0 :: IO Double ~> 1.0 (on screen)

-- https://stepik.org/lesson/8437/step/5
returnLog :: a -> Log a
returnLog = Log []
{-
infixr 0 $
($) :: (a -> b) -> a -> b
f $ x = f x

infixr 1 &
(&) :: a -> (a -> b) -> b
x & f = f x
(+1) $ (*3) $ (+2) $ 5 ~> 22
5 & (+2) & (*3) & (+1) ~> 22
like >>=, but without m
flip fmap ~> >>=, but bind knows about container

(>>) :: m a -> m b -> m b
x >> y = x >>= \_ -> y

fail :: String -> m a
fail s = error s

(=<<) :: Monad m => (a -> m b) -> m a -> m b
(=<<) = flip (>>=)

(<=<) :: Monad m => (b -> m c) -> (a -> m b) -> (a -> m c)
f <=< g = \x -> g x >>= f
or (<=<) f g x = g x >>= f
-}

-- https://stepik.org/lesson/8437/step/7
bindLog :: Log a -> (a -> Log b) -> Log b
bindLog (Log m1 v1) f = Log (m2 ++ m1 ++ m2) v2
    where
        Log m2 v2 = f v1

-- https://stepik.org/lesson/8437/step/8
instance Monad Log where
    return = returnLog
    (>>=) = bindLog

instance Functor Log where
    fmap = liftM

instance Applicative Log where
    pure = return
    (<*>) = ap

execLoggersList :: a -> [a -> Log a] -> Log a
-- execLoggersList ini fns = foldl (\predValue fn -> (>>=) predValue fn) (return ini) fns
execLoggersList ini fns = foldl (>>=) (return ini) fns
--  execLoggersList 3 [add1Log, mult2Log, \x -> Log ["multiplied by 100"] (x * 100)]
