module Demo where
import Control.Monad (ap, liftM)
{-
instance Monad ((->) e) where
    -- ~> return :: a -> (e -> a)
    return x = \_ -> x
    (>>=) :: (e -> a) -> (a -> (e -> b)) -> (e -> b)
    m >>= k = \e -> k (m e) e
-}

-- :t safeHead :: [a] -> Maybe a
safeHead = do
    b <- null
    if b
        then return Nothing
        else do
            h <- head
            return $ Just h

safeHead' = do
    e <- id
    if null e
        then return Nothing
        else return $ Just (head e)

newtype Reader r a = Reader { runReader :: (r -> a) }
-- runReader :: Reader r a -> r -> a

instance Functor (Reader r) where
    fmap = liftM

instance Applicative (Reader r) where
    pure = return
    (<*>) = ap

-- instance Monad (Reader r) where
--     return x = Reader $ \e -> x
--     m >>= k = Reader $ \e ->
--         let v = runReader m e
--         in runReader (k v) e

instance Monad (Reader r) where
    return x = Reader $ \_ -> x
    m >>= k  = Reader $ \r -> runReader (k (runReader m r)) r

ask :: Reader r r
ask = Reader id

type User = String
type Password = String
type UserTable = [(User, Password)]

pwds :: UserTable
pwds = [("Bill", "123"), ("Ann", "qwery"), ("John", "23asda")]

firstUser :: Reader UserTable User
firstUser = do
    e <- ask
    return $ fst (head e)

-- runReader firstUser pwds

asks :: (r -> a) -> Reader r a
asks = Reader

firstUserPwd :: Reader UserTable Password
-- firstUserPwd = do
--     pwd <- asks (snd . head)
--     return pwd
firstUserPwd = asks (snd . head)

usersCount :: Reader UserTable Int
usersCount = asks length

local :: (r -> r) -> Reader r a -> Reader r a
local f m = Reader $ \e -> runReader m (f e)

localTest :: Reader UserTable (Int, Int)
localTest = do
    count1 <- usersCount
    count2 <- local(("Mike", "1"):) usersCount
    return (count1, count2)

-- runReader localTest pwds ~> (3, 4)

reader :: (r -> a) -> Reader r a
reader f = do
    r <- ask
    return (f r)

-- https://stepik.org/lesson/8441/step/8
local' :: (r -> r') -> Reader r' a -> Reader r a
local' f m = Reader $ \e -> runReader m (f e)

-- https://stepik.org/lesson/8441/step/9

usersWithBadPasswords :: Reader UsersTable [User]
usersWithBadPasswords = asks (filter ((== "123456") . snd))

