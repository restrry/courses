-- in ghci :l moduleName.hs - load module
module Name where
-- module Prelude is imported implicitly

-- module Char is imported from Data directory
-- import ALL funtions
import Data.Char

-- or named import
import Data.Char (toUpper, toLower)

-- or import ALL funtions except desired
import Data.Char hiding (toLower)

-- alternative use full path Data.List.union
import Data.List
import qualified Data.Set
-- Data.Set.union

-- with renaming
import qualified Data.Set as Set

-- by default all function are imported from module
const42 = 42
sumIt x y = x + y

-- or we can declare export expliclity
module Test (const42) where
const42 x = 42
