import Data.Functor

-- https://stepik.org/lesson/8432/step/3
data Point3D a = Point3D a a a deriving Show
-- fmap (+ 1) (Point3D 5 6 7)
instance Functor Point3D where
    fmap f (Point3D x y z) = Point3D (f x) (f y) (f z)

-- https://stepik.org/lesson/8432/step/4
data GeomPrimitive a = Point (Point3D a) | LineSegment (Point3D a) (Point3D a)

instance Functor GeomPrimitive where
    fmap f (Point x)         = Point (fmap f x)
    fmap f (LineSegment x y) = LineSegment (fmap f x) (fmap f y)

-- https://stepik.org/lesson/8432/step/6

data Tree a = Leaf (Maybe a) | Branch (Tree a) (Maybe a) (Tree a) deriving Show
instance Functor Tree where
    fmap f (Leaf x) = Leaf (f <$> x)
    fmap f (Branch l x r) = Branch (f <$> l) (f <$> x) (f <$> r)

--https://stepik.org/lesson/8432/step/8
data Entry k1 k2 v = Entry (k1, k2) v  deriving Show
data Map k1 k2 v = Map [Entry k1 k2 v]  deriving Show

instance Functor (Entry k1 k2) where
    fmap f (Entry keys v) = Entry keys (f v)

instance Functor (Map k1 k2) where
    fmap f (Map xs) = Map $ map (fmap f) xs
