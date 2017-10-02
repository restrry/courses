module Demo where

import Data.Bits
import Prelude hiding (lookup)
import qualified Data.List as L

-- https://stepik.org/lesson/7602/step/7

newtype Xor = Xor { getXor :: Bool }
    deriving (Eq,Show)

instance Monoid Xor where
    mempty = Xor False
    Xor x `mappend` Xor y = Xor (Data.Bits.xor x y)

-- newtype Box a = Box { getMaybe :: Maybe a }
--     deriving (Eq,Show)

-- instance Monoid a => Monoid (Box a) where
--     mempty = id
--     mappend x = x

maybeToList :: Maybe a -> [a]
maybeToList (Just x)  = [x]
maybeToList Nothing   = []

-- Box Xor
-- Box (Maybe Xor)
-- Box [Int]

test0 x = mempty `mappend` x == x
test1 x = x `mappend` mempty == x
test2 x y z = (x `mappend` y) `mappend` z == x `mappend` (y `mappend` z)

-- https://stepik.org/lesson/7602/step/10
lookup'                  :: (Eq a) => a -> [(a,b)] -> Maybe b
lookup'  _ []          =  Nothing
lookup'  key ((x,y):xys)
    | key == x          =  Just y
    | otherwise         =  lookup' key xys

addToAL :: Eq key => [(key, elt)] -> key -> elt -> [(key, elt)]
addToAL list key value = (key, value) : delFromAL list key

delFromAL :: Eq key => [(key, a)] -> key -> [(key, a)]
delFromAL list key = filter (\a -> (fst a) /= key) list

instance MapLike ListMap where
    -- https://stackoverflow.com/questions/46013184/define-an-empty-container-directly-in-a-haskell-class
    empty             = ListMap []
    lookup key wr     = lookup' key (getListMap wr)
    insert key val wr = ListMap $ addToAL (getListMap wr) key val
    delete key wr     = ListMap $ delFromAL (getListMap wr) key

class MapLike m where
    empty :: m k v
    lookup :: Ord k => k -> m k v -> Maybe v
    insert :: Ord k => k -> v -> m k v -> m k v
    delete :: Ord k => k -> m k v -> m k v
    fromList :: Ord k => [(k,v)] -> m k v
    fromList [] = empty
    fromList ((k,v):xs) = insert k v (fromList xs)

newtype ListMap k v = ListMap { getListMap :: [(k,v)] }
    deriving (Eq,Show)

testObj = ListMap [("name", "Mike"), ("lastname", "Poloz"), ("age", "25")]
test_10_0 = (insert "hobby" "box" testObj) == ListMap [("hobby","box"), ("name", "Mike"), ("lastname", "Poloz"), ("age", "25")]
test_10_1 = (delete "age" testObj) == ListMap [("name", "Mike"), ("lastname", "Poloz")]
test_10_2 = (lookup "age" testObj) == Just "25"
-- testObj3 = empty == ListMap []

allTests_10 = zip [0..] [test_10_0, test_10_1, test_10_2]


-- https://stepik.org/lesson/7602/step/12
newtype ArrowMap k v = ArrowMap { getArrowMap :: k -> Maybe v }

instance MapLike ArrowMap where
    empty                     = ArrowMap (\x -> Nothing)
    lookup key (ArrowMap f)   = f key
    insert key v (ArrowMap f) = ArrowMap (\x -> if key == x then Just v else f x)
    delete key (ArrowMap f)   = ArrowMap (\x -> if key == x then Nothing else f x)


testMap :: ArrowMap Int String
testMap = fromList [(1, "one"), (2, "two"), (3,"three")]

test_12_1 = lookup 1 testMap == Just "one"
test_12_2 = lookup 4 testMap == Nothing

f x = case x of
    42 -> Just "ANSWER"
    0 -> Just "ZERO"
    _ -> Nothing

am = ArrowMap f
test_12_3 = lookup 43 am == Nothing
test_12_4 = lookup 0  am == Just "ZERO"
test_12_5 = lookup 42 am == Just "ANSWER"

am' = insert 43 "SUCC ANSWER" am
test_12_6 = lookup 43 am' == Just "SUCC ANSWER"
test_12_7 = lookup 0 am'  == Just "ZERO"
test_12_8 = lookup 42 am' == Just "ANSWER"

am'' = delete 42 am'
test_12_9 = lookup 42 am'' == Nothing

allTests_12 = zip [0..] [test_12_1, test_12_2, test_12_3, test_12_4, test_12_5, test_12_6, test_12_7, test_12_8, test_12_9]
