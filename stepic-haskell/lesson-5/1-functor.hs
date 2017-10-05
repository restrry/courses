module Demo where

import Prelude hiding (Functor, fmap)

class Functor f where
    fmap :: (a -> b) -> f a -> f b

instance Functor [] where
    fmap = map

instance Functor Maybe where
    fmap _ Nothing  = Nothing
    fmap f (Just a) = Just (f a)

data Tree a = Leaf a | Branch (Tree a) a (Tree a)
    deriving (Show)

testTree = Branch (Leaf 2) 3 (Leaf 4)

instance Functor Tree where
    fmap g (Leaf x) = Leaf (g x)
    fmap g (Branch l x r) = Branch (fmap g l) (g x) (fmap g r)

-- <$> operator: f `fmap` container == f <$> container
-- <$ operator : 42 <$ testTree ~> Branch (Leaf 42) (42) (Leaf 42)

-- (a -> b) -> (s, a) -> (s, b)
instance Functor ((,) s) where
    fmap g (x, y) = (x, g y)

-- Either (Left x) (Right y)
-- (a -> b) -> Either e a -> Either e b -> so Left is unchangable, map on Right
instance Functor (Either e) where
    fmap _ (Left x)  = Left x
    fmap g (Right y) = Right (g y)

instance Functor ((->) e) where
    fmap = (.)

-- (a -> b) -> (e -> a) -> (e -> b)
-- fmap length tail "ABC" - NOTE: func arity has cnahged
{-
functor laws:
fmap id == id
fmap (f . g) xs == (fmap f . fmap g) xs
-}
