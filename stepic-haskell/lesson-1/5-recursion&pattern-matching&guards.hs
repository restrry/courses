-- function 'undefined' could be used as a stub for not implmented code

factorial n = if n == 0
    then 1
    else n * factorial (n - 1)

-- pattern matching
factorial1 0 = 1
factorial1 n = n * factorial1 (n - 1)

factorial2 0 = 1
factorial2 n = if n < 0
    then error "arg must be >= 0"
    else n * factorial2 (n - 1)

-- guards
factorial3 0 = 1
factorial3 n | n < 0 = error "arg must be >= 0"
             | n > 0 = n * factorial3 (n - 1)


factorial4 n | n == 0    = 1
             | n > 0     = n * factorial4 (n - 1)
             | otherwise = error "arg must be >= 0"

factorial5 n | n >= 0    = helper 1 n
             | otherwise = error "arg must be >= 0"

helper acc 0 = acc
helper acc n = helper (acc * n) (n - 1)

-- https://stepik.org/lesson/%D0%A0%D0%B5%D0%BA%D1%83%D1%80%D1%81%D0%B8%D1%8F-8413/step/4

doubleFact :: Integer -> Integer
doubleFact n = if n == 0 || n == 1 then 1 else n * doubleFact (n - 2)

doubleFact' :: Integer -> Integer
doubleFact' 0 = 1
doubleFact' 1 = 1
doubleFact' n = n * doubleFact' (n - 2)

-- https://stepik.org/lesson/8413/step/8
fibonacci :: Integer -> Integer
fibonacci n | n == -1 = 1
            | n == 0  = 0
            | n == 1  = 1
            | n > 0   = fibonacci (n - 1) + fibonacci (n - 2)
            | n < 0   = (-1)*((-1)^abs n) * fibonacci(abs n)

-- https://stepik.org/lesson/8413/step/10
fibonacci2 n | n >= 2 = helper3 0 1 n
             | n == 1 = 1
             | n == 0 = 0
             | n < (0) = (-1)*((-1) ^ abs n) * fibonacci2(abs n)

helper3 acc1 acc2 0 = acc1 + acc2
helper3 acc1 acc2 n = helper3 acc2 (acc1 + acc2) (n - 1)
