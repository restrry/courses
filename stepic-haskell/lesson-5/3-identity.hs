module Demo where

import Control.Monad (ap, liftM)

newtype Identity a = Identity { runIdentity :: a }
    deriving (Eq, Show)

instance Monad Identity where
    return x = Identity x
    Identity x >>= k = k x

-- instance Functor Identity where
--     fmap = liftM

instance Applicative Identity where
    pure = return
    (<*>) = ap

wrap'n'succ :: Integer -> Identity Integer
wrap'n'succ x = Identity (succ x)

{-
runIdentity (wrap'n'succ 3) ~> 4
runIdentity $ wrap'n'succ 3 >>= wrap'n'succ ~> 5
runIdentity $ wrap'n'succ 3 >>= wrap'n'succ >>= wrap'n'succ ~>6
aka 3 & succ & succ & succ
aka runIdentity $ return 3 >>= wrap'n'succ >>= wrap'n'succ >>= wrap'n'succ
-}

-- https://stepik.org/lesson/8438/step/3
-- data SomeType a = ...
-- instance Functor SomeType where
--     fmap f x = x >>= return . f

{-
first monadic law : return a >>= k == k a
second monadic law : m >>= return == m
third monadic law : (m >>= k) >>= k' == m >>= (\x -> k x >>= k')

aka runIdentity $ wrap'n'succ 3 >>= (\x -> wrap'n'succ x >>= wrap'n'succ)
-}

goWrap0 =
    wrap'n'succ 3 >>=
    wrap'n'succ >>=
    wrap'n'succ >>=
    return

goWrap1 =
    wrap'n'succ 3 >>= (\x ->
    wrap'n'succ x >>= (\y ->
    wrap'n'succ y >>= (\z ->
    return z)))

goWrap2 =
    wrap'n'succ 3 >>= (\x -> -- x := succ 3;
    wrap'n'succ x >>= (\y -> -- y := succ x;
    wrap'n'succ y >>= (\z -> -- z := succ y;
    return (x, y, z))))      -- return (x, y, z)

goWrap3 =
    wrap'n'succ 3 >>= (\x ->
    wrap'n'succ x >>= (\y ->
    wrap'n'succ y >> (\_ ->
    return (x + y))))

do {e1 ; e2} == e1 >> e2
do { p <- e1; e2 } == e1 >>= (\p -> e2)
do { let v = e1; e2 } == let v = e1 in do e2

goWrap4 =
    let i = 3 in
    wrap'n'succ i >>= (\x ->
    wrap'n'succ x >>= (\y ->
    wrap'n'succ y >> (\_ ->
    return (i, x + y))))

-- look ma, imperative style!
goWrap4 =
    let i = 3
    -- note below is monadic container
    x <- wrap'n'succ i
    y <- wrap'n'succ x
    wrap'n'succ y
    return (i, x + y)
