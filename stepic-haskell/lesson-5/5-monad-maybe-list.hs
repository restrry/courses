module Demo where

import Prelude hiding (Maybe, Just, Nothing)

data Maybe a = Nothing | Just a
    deriving (Eq, Ord)
{-
class Monad m where
    return :: a -> m a
    (>>=) :: m a -> (a -> m b) -> m b
    (>>) :: m a -> m b -> mb
    fail :: String -> m a
-}

instance Monad Maybe where
    return = Just

    (Just x) >>= k = k x
    Nothing  >>= _ = Nothing

    (Just _) >> m = m
    Nothing  >> _ = Nothing

    fail _ = Nothing

instance Monad [] where
    return x = [x]
    xs >>= k = concat (map k xs)
    fail _   = []

list = [(x, y) | x <- [1,2,3], y <- [4,5,6]]

list' = do
    x <- [1, 2, 3]
    y <- [4, 5, 6]
    return (x, y)

list'' =
    [1, 2, 3] >>= (\x ->
    [4, 5, 6] >>= (\y ->
    return (x, y)))
