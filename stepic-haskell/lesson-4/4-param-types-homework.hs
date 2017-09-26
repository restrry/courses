import Data.List
import Data.List.Split (splitOn)
import Data.Char (isSpace, isDigit)

-- https://stepik.org/lesson/5746/step/9

data Error = ParsingError | IncompleteDataError | IncorrectDataError String
    deriving (Show)

data Person = Person { firstName :: String, lastName :: String, age :: Int }
    deriving (Show)

-- type synonymus
type ParsingEntity = (String, String)

-- step 1 parse string by line
lineSymbol = "\n"
delimeterSymbol = " = "

splitByString :: String -> [String]
splitByString = splitOn lineSymbol

formatToLine :: String -> Either Error [String]
formatToLine = validateParsting . splitByString

validateParsting :: [String] -> Either Error [String]
validateParsting str | all (isInfixOf delimeterSymbol) str = Right str
                     | otherwise                           = Left ParsingError

-- step 2 format them and create enteties

splitPairs :: String -> [String]
splitPairs = splitOn delimeterSymbol


trimLeft :: String -> String
trimLeft = dropWhile isSpace

trimRight :: String -> String
trimRight str | all isSpace str = ""
trimRight (c : cs) = c : trimRight cs

trim :: String -> String
trim = trimLeft . trimRight

trimify :: [String] -> [String]
trimify = map trim

tuplify2 :: [t] -> (t, t)
tuplify2 [a, b] = (a, b)

_formatToTuple :: [String] -> [ParsingEntity]
_formatToTuple = map $ tuplify2 . trimify . splitPairs

formatToTuple :: Either Error [String] -> Either Error [ParsingEntity]
formatToTuple (Right str) = Right (_formatToTuple str)
formatToTuple (Left err)  = Left err

-- step 3 filter and valiate number of entites
knownFiels = ["firstName", "lastName", "age"]
isKnownNotEmptyField :: ParsingEntity -> Bool
isKnownNotEmptyField (field, _) = isNotEmpty field && any (\knownField -> field `isInfixOf` knownField) knownFiels

isNotEmpty :: String -> Bool
isNotEmpty xs = length xs > 0

filterTuples :: [ParsingEntity] -> [ParsingEntity]
filterTuples = filter isKnownNotEmptyField

filterValidateEntity :: Either Error [ParsingEntity] -> Either Error [ParsingEntity]
filterValidateEntity (Right str) | length (filterTuples str) == 3   = Right (filterTuples str)
                                 | otherwise                        = Left IncompleteDataError
filterValidateEntity (Left err)                                     = Left err

-- step 4 validate entites
validateData :: Either Error [ParsingEntity] -> Either Error [ParsingEntity]
validateData (Right str) = if hasValidAge ageStr
                            then Right (str)
                            else Left (IncorrectDataError ageStr)
                            where ageStr = getFromTuple "age" str
validateData (Left err)  = Left err

hasValidAge :: String -> Bool
hasValidAge = all isDigit

getFromTuple :: String -> [ParsingEntity] -> String
getFromTuple fieldName tuples = case lookup fieldName tuples of
                                Just value -> value
                                _          -> ""

-- step 5 create person
parseToInt :: String -> Int
parseToInt x = read x::Int

personFactory :: [ParsingEntity] -> Person
personFactory str = Person {
    age       = parseToInt $ getFromTuple "age" str,
    firstName = getFromTuple "firstName" str,
    lastName  = getFromTuple "lastName" str
}

createPerson :: Either Error [ParsingEntity] -> Either Error Person
createPerson (Right str) = Right $ personFactory str
createPerson (Left err)  = Left err

parsePerson :: String -> Either Error Person
parsePerson = createPerson . validateData . filterValidateEntity . formatToTuple . formatToLine


-- wrong Parse | empty string
t0 = parsePerson ""
-- correct
t1 = parsePerson "firstName = John\nlastName = Connor\nage = 30"
-- correct | shiffled fields
t18 = parsePerson "lastName = Connor\nfirstName = John\nage = 30"
-- wrong Parse | no spaces around = in minor fields
t2 = parsePerson "firstName = John Smith\nlastName = Connor\nage = 30\nasde=as11"
-- wrong Parse | no spaces around = on the left in minor fields
t5 = parsePerson "firstName = John Smith\nlastName = Connor\nage = 30\nasde= "
-- wrong Parse | no spaces around = in major fields
t3 = parsePerson "firstName=Barbarian\nlastName=Conn On\nage=30"
-- wrong Incorrect | age is non-numeric
t4 = parsePerson "firstName = John\nlastName = Connor\nage = as30"
-- wrong Parse | no spaces around = in major fields, missing major field
t6 = parsePerson "firstName=Barbarian\nlastName=Conn Or"
-- wrong Parse | no spaces around = in major fields, typo in major field
t7 = parsePerson "firstNameee = John Smith\nlastName = Connor\nage = 30\nasde=as11"
-- correct | excessive fields
t8 = parsePerson "firstName = John\nlastName = Connor\nfoo = bar\nage = 30"
-- wrong Incomplete | missing major field
t9 = parsePerson "firstName = Barbarian\nlastName = Conn Or"
-- wrong Parse | empty major value
t10 = parsePerson "firstName = John\nlastName = Connor\nage = "
-- wrong Parse | no spaces around = on the right in major field
t11 = parsePerson "firstName = John\nlastName = Connor\nage ="
-- wrong Parse | empty key, missing major field
t12 = parsePerson "firstName = John\nlastName = Connor\n = 30"
-- correct | spaces in major field value
t13 = parsePerson "firstName = Barbarian\nlastName = Conn On\nage = 30"
-- correct | = in major field value
t14 = parsePerson "firstName = John\nlastName = Con=nor\nage = 30"
-- wrong Parse | no spaces around =, missing value in minor field
t15 = parsePerson "firstName=Barbarian\nlastName=Conn On\nage=30\ng dsfsd"
-- wrong Incomplete | major field key with whitespace, age is non-numeric
t17 = parsePerson " firstName = John\nlastName = Connor\nage = 2f8 "
