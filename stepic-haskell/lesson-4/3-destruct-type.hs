module Demo where

data Person' = Person' String String Int

firstName' :: Person' -> String
firstName' (Person' x _ _) = x

lastName' :: Person' -> String
lastName' (Person' _ y _) = y

age' :: Person' -> Int
age' (Person' _ _ z) = z

data Person = Person { firstName :: String, lastName :: String, age :: Int }
    deriving (Show, Eq)

john = Person "John" "Smith" 33
-- age john -- getter ~> return 33
-- lastName john -- ~> "Smith"

-- apply function to object
(&) :: a -> (a -> b) -> b
x & f = f x

-- john & age -- ~> 33
-- john & firstName -- ~> "John"

-- f $ g $ h $ x == x & h & g & f
xavier = Person {age = 40, firstName = "Coco", lastName = "Xavier"}

-- we can't define other field later
-- we can't access to undefined field
unknownBill = Person {lastName = "Bill"}

-- NOTE: due to immutability a new Person object will be created
updateAge :: Int -> Person -> Person
updateAge newAge person = person {age = newAge}

name :: Person -> String
name person = firstName person ++ " " ++ lastName person

name' :: Person -> String
name' (Person fn ln _) = fn ++ " " ++ ln

name'' :: Person -> String
-- bind only needed aliases
name'' (Person {lastName = ln, firstName = fn}) = fn ++ " " ++ ln

