module Demo where

import Control.Monad (ap, liftM)

newtype Writer w a = Writer { runWriter :: (a, w) }

-- run Writer :: Writer w a
writer :: (a, w) -> Writer w a
writer = Writer

execWriter :: Writer w a -> w
execWriter m = snd (runWriter m)

instance (Monoid w) => Monad (Writer w) where
    return x = Writer (x, mempty)
    m >>= k =
        let (x, u) = runWriter m
            (y, v) = runWriter $ k x
        in Writer (y, u `mappend` v)

-- runWriter (return 3 :: Writer String Int) ~> (3, "")
-- runWriter (return 3 :: Writer (Sum Int) Int) ~> (3, Sum {getSum = 0})
-- runWriter (return 3 :: Writer (Product Int) Int) ~> (3, Sum {getProduct = 1})
-- execWriter (return 3 :: Writer String Int) ~> ""

tell :: Monoid w => w -> Writer w ()
tell w = writer ((), w)

calc :: (Int -> Int -> Int) -> Int -> Int -> Writer String Int
calc op arg1 arg2 = do
    let res = arg1 `op` arg2
    -- tell "ok "
    if abs res < 128 then
        return res
    else do
        tell "overflow"
        return res

-- runWriter $ cacl (+) 33 44 ~> (77, "")
-- execWriter $ cacl (+) 33 44 ~> ""
-- runWriter $ cacl (+) 99 44 ~> (143, "overflow")
