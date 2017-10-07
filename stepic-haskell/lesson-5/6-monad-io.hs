module Main where

import Data.List
import System.Directory
-- main is entry point for the programm
-- main = do
--     putStrLn "What is your name?"
--     name <- getLine
--     putStrLn $ "Hi," ++ name ++ "!"

main' = do
    putStrLn "What is your name?"
    putStr "Name: "
    name <- getLine
    if null name
        then main'
        else putStrLn $ "Hi, " ++ name ++ "!"

{-
-- newtype IO a = IO (RealWord -> (RealWord, a))
type IO a = RealWord -> (RealWord, a)
return :: a -> IO a ~> a -> RealWord -> (RealWord, a)
(>>=) :: IO a -> (a -> IO b) -> IO b
instance Monad IO where
    reutrn a = \w -> (w, a)
    (>>=) m k = \w -> case m w of (w', a) -> k a w'
-}
getLine' :: IO String
getLine' = do
    c <- getChar
    if c == '\n'
        then return []
        else do
            cs <- getLine'
            return (c:cs)

putStr' :: String -> IO ()
putStr' [] = return ()
putStr' (x:xs) = putChar x >> putStr' xs

-- note: here we are interested not in the result, but the effect
-- sequence_ :: Monad m => [m a] -> m ()
-- sequence_ = foldr (>>) (return())
-- sequence_ [Just 1, Just 2] ~> Just ()
-- sequence_ [Just 1, Nothing] ~> Nothing
-- sequence_ [[1,2], [3, 4, 5, 6]] ~> [(), (), (), (), (), (), (), ()]
-- sequence_ [putChar 'a', putChar 'b'] ~> 'ab' in console
putStr'' :: String -> IO ()
putStr'' = sequence_ . map putChar
-- aka sequence_ $ map putChar "ab"

mapM_ :: Monad m => (a -> m b) -> [a] -> m ()
mapM_ f = sequence_ . map f
-- mapM_ (\x -> [x, x]) "ABC" ~> [(), (), (), (), (), (), (), ()] -- note 8 effects!

putStr''' :: String -> IO ()
putStr''' = mapM_ putChar

{-
sequence :: Monad m => [m a] -> m [a]
sequence ms = foldr k (return []) ms
            where
                k :: Monad m => m a -> m [a] -> m [a]
                k m m' = do
                    x <- m
                    xs <- m'
                    return (x:xs)

mapM :: Monad m => (a -> m b) -> [a] -> m [b]
mapM f = sequence . map f
-}
-- sequence [Just 1, Just 2] ~> Just [1, 2]
-- sequence [Just 1, Nothing, Just 2] ~> Nothing
-- sequence [getLine, getLine] ~> wait for input of 2 lines
-- mapM putChar "Hello" ~> log Hello and return [(), (), (), (), ()]

--https://stepik.org/lesson/8443/step/8

main = do
    putStr "Substring: "
    name <- getLine
    if null name
        then putStrLn "Canceled"
        else do
            allNames <- getFiles
            let fileNamesToDelete = filterNamesBySubstr name (allNames)
            mapM_ (\fileName -> putStrLn ("Removing file: " ++ fileName) >> removeFile fileName) fileNamesToDelete


getFiles = getDirectoryContents "."
filterNamesBySubstr substr names = filter (\name -> isInfixOf substr name) names

