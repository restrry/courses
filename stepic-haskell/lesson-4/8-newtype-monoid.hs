module Demo where

newtype IntList = IList [Int] deriving Show
example = IList [1,2]

data IntList' = IList' [Int] deriving Show
-- newtype is lazy type and could be optimized on copilation step
-- newtype couldn't be used for pattern matching since that is deleted
-- on compilation step because newtype exists on compilation step, not during runtime
ignore' :: IntList' -> String
ignore' (IList' _) = "Hello"

ignore :: IntList -> String
ignore (IList _) = "Hello"

newtype Identity a = Identity {runIdentity :: a}
    deriving (Eq, Show)

-- :k Identity    ~> * -> *
-- :t Identity    ~> a -> Identity a
-- :t runIdentity ~> Identity a -> a

class Monoid a where
    mempty :: a             -- neutral element
    mappend :: a -> a -> a  -- apply function
    mconcat :: [a] -> a     -- flatting
    mconcat = foldr mappend mempty

{-
laws:
id
mempty `mappend` x == x
commutativity
x `mappend` mempty == x
associativity
(x `mappend` y) `mappend` z == x `mappend` (y `mappend` z)
-}

instance Monoid [a] where
    mempty = []
    mappend = (++)
    -- note: we needn't event implement concat since default implementation fits here

{-
numbers could be declared as monoid for:
- mempty = 0, mappend +
- mempty = 1, mappend *
-}

newtype Sum a = Sum {getSum :: a}
    deriving (Eq, Ord, Read, Show, Bounded)

instance Num a => Monoid (Sum a) where
    mempty = Sum 0
    Sum x `mappend` Sum y = Sum (x + y)

-- Sum 2 `mappend` Sum 3 ~> Sum 5

newtype Product a = Product {getProduct :: a}
    deriving (Eq, Ord, Read, Show, Bounded)

instance Num a => Monoid (Product a) where
    mempty = Product 1
    Product x `mappend` Product y = Product (x * y)


instance (Monoid a, Monoid b) => Monoid (a, b) where
    mempty = (mempty, mempty)
    (x1, x2) `mappend` (y1, y2) = (x1 `mappend` y1, x2 `mappend` y2)

-- ("ABC", Product 2) `mappend` ("CDE", Product 3) ~> ("ABCCDE", Product 6)
instance Monoid a => Monoid (Maybe a) where
    mempty                    = Nothing
    Nothing `mappend` m       = m
    m `mappend` Nothing       = m
    -- note: here we also reference mappend to Monoid a implementation
    Just m1 `mappend` Just m2 = Just (m1 `mappend` m2)

newtype First a = First { getFirst :: Maybe a}
    deriving (Eq, Ord, Read, Show)

instance Monoid (First a) where
    mempty = First Nothing
    First Nothing `mappend` r = r
    l `mappend` _             = l

firstNonEmpty = getFirst $ mconcat $ map First


newtype Endo a = Endo {appEndo :: a -> a}

instance Monoid (Endo a) where
    mempty = Endo id
    Endo f `mappend` Endo g = Endo (f . g)

-- :t map Endo [(*2), (+5), (^2)] ~> Num a => [Endo a]
-- :t mconcat $ map Endo [(*2), (+5), (^2)] ~> Num a => Endo a
-- :t appEndo $ mconcat $ map Endo [(*2), (+5), (^2)] ~> Num a => a -> a
