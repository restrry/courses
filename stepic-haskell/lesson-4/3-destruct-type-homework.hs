import Data.Time.Clock
import Data.Time.Format
-- import System.Locale

-- https://stepik.org/lesson/5431/step/3
timeToString :: UTCTime -> String
timeToString = formatTime defaultTimeLocale "%a %d %T"

data LogLevel = Error | Warning | Info

data LogEntry = LogEntry { timestamp :: UTCTime, logLevel :: LogLevel, message :: String }

logLevelToString :: LogLevel -> String
logLevelToString Error   = "Error"
logLevelToString Warning = "Warning"
logLevelToString Info    = "Info"

logEntryToString :: LogEntry -> String
logEntryToString x = timeToString (timestamp x) ++ ": " ++  logLevelToString (logLevel x) ++ ": " ++ message x


-- https://stepik.org/lesson/5431/step/5
data Person = Person { firstName :: String, lastName :: String, age :: Int }

updateLastName :: Person -> Person -> Person
updateLastName personSource personDest = personDest {lastName = lastName personSource}

-- https://stepik.org/lesson/5431/step/8
-- data Person = Person { firstName :: String, lastName :: String, age :: Int }
abbrFirstName :: Person -> Person
abbrFirstName person = person { firstName = newName } where
  name = firstName person
  newName = if length name <= 2 then name else name !! 0 : "."
