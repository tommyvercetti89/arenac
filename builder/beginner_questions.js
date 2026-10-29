module.exports = [
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 5;\n    int b = 2;\n    printf(\"%d\", a / b);\n    return 0;\n}",
    "options": [
      "2.5",
      "2",
      "3",
      "0"
    ],
    "answer": 1,
    "explanation": {
      "tr": "C dilinde her iki terim de tam sayı (int) olduğunda bölme operatörü (/) tamsayı bölmesi yapar ve ondalık kısmı atar (truncation). 5 / 2 = 2 olur.",
      "en": "In C, integer division truncates toward zero when both operands are integers. 5 / 2 evaluates to 2."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    int y = x++;\n    printf(\"%d %d\", x, y);\n    return 0;\n}",
    "options": [
      "5 5",
      "6 5",
      "6 6",
      "5 6"
    ],
    "answer": 1,
    "explanation": {
      "tr": "Postfix artırma (x++) operatörü önce x'in mevcut değerini (5) döner ve y'ye atar, ardından x'i 1 artırarak 6 yapar. Çıktı: 6 5.",
      "en": "Postfix increment (x++) yields the current value (5) for assignment, then increments x to 6. Output: 6 5."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    int y = ++x;\n    printf(\"%d %d\", x, y);\n    return 0;\n}",
    "options": [
      "6 6",
      "6 5",
      "5 5",
      "5 6"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Prefix artırma (++x) operatörü önce x'i 1 artırarak 6 yapar, ardından bu yeni değeri y'ye atar. Çıktı: 6 6.",
      "en": "Prefix increment (++x) increments x to 6 first, then yields that updated value to y. Output: 6 6."
    }
  },
  {
    "topic": "variables",
    "code": "#include <stdio.h>\n\nint main() {\n    char c = 'A';\n    printf(\"%d\", c + 1);\n    return 0;\n}",
    "options": [
      "B",
      "66",
      "A1",
      "Hata verir"
    ],
    "answer": 1,
    "explanation": {
      "tr": "'A' karakterinin ASCII sayısal değeri 65'tir. c + 1 ifadesi tamsayı terfisi ile 66 sonucunu verir ve %d bu sayıyı 66 olarak yazdırır.",
      "en": "The ASCII value of 'A' is 65. Integer promotion computes 65 + 1 = 66, and %d prints 66."
    }
  },
  {
    "topic": "conditions",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = -5;\n    if (x) {\n        printf(\"EVET\");\n    } else {\n        printf(\"HAYIR\");\n    }\n    return 0;\n}",
    "options": [
      "EVET",
      "HAYIR",
      "0",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C dilinde yalnızca 0 değeri 'yanlış' (false) kabul edilir. Sıfır dışındaki tüm pozitif ve negatif sayılar (-5 dahil) mantıksal olarak 'doğru' (true) kabul edilir.",
      "en": "In C, only 0 evaluates to false. Any non-zero value, including negative numbers like -5, evaluates to true."
    }
  },
  {
    "topic": "conditions",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 0;\n    if (x = 5) {\n        printf(\"%d\", x);\n    } else {\n        printf(\"SIFIR\");\n    }\n    return 0;\n}",
    "options": [
      "5",
      "0",
      "SIFIR",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "if koşulunda çift eşit (==) yerine tek eşit (=) kullanılmıştır! x'e 5 atanır ve atama ifadesinin değeri 5 (sıfır dışı yani true) olduğundan if bloğu çalışır ve 5 yazdırılır.",
      "en": "Single equals (=) is assignment, not comparison! x is assigned 5, which evaluates to 5 (true), executing the if block and printing 5."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 0;\n    int b = 5;\n    if (a && ++b) {\n        printf(\"A\");\n    }\n    printf(\"%d\", b);\n    return 0;\n}",
    "options": [
      "5",
      "6",
      "A5",
      "A6"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Mantıksal VE (&&) operatöründe sol taraf 0 (false) ise kısa devre (short-circuit) gerçekleşir ve sağ taraf (++b) ASLA çalıştırılmaz! Bu yüzden b 5 kalır.",
      "en": "In logical AND (&&), if the left operand is false (0), short-circuit evaluation skips the right operand (++b). b remains 5."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 1;\n    int b = 5;\n    if (a || ++b) {\n        printf(\"%d\", b);\n    }\n    return 0;\n}",
    "options": [
      "5",
      "6",
      "1",
      "0"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Mantıksal VEYA (||) operatöründe sol taraf 1 (true) ise sonuç zaten doğrudur; kısa devre nedeniyle sağdaki ++b ifadesi çalıştırılmaz. b 5 olarak yazdırılır.",
      "en": "In logical OR (||), if the left operand is true (1), the right operand is short-circuited. ++b is never executed and b prints 5."
    }
  },
  {
    "topic": "loops",
    "code": "#include <stdio.h>\n\nint main() {\n    int i = 3;\n    while (i--) {\n        printf(\"%d\", i);\n    }\n    return 0;\n}",
    "options": [
      "210",
      "321",
      "3210",
      "21"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Döngü adımları: 1) i=3 testi geçer, i 2 olur, '2' basar. 2) i=2 testi geçer, i 1 olur, '1' basar. 3) i=1 testi geçer, i 0 olur, '0' basar. 4) i=0 testte false olur, döngü biter. Çıktı: 210.",
      "en": "Tracing while(i--): condition evaluates i then decrements. Iterations print 2, then 1, then 0. Output: 210."
    }
  },
  {
    "topic": "conditions",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 2;\n    switch (x) {\n        case 1: printf(\"1\");\n        case 2: printf(\"2\");\n        case 3: printf(\"3\");\n        default: printf(\"D\");\n    }\n    return 0;\n}",
    "options": [
      "23D",
      "2",
      "23",
      "D"
    ],
    "answer": 0,
    "explanation": {
      "tr": "switch bloğunda 'break' ifadesi bulunmadığı için eşleşen case 2'den itibaren sonraki tüm case'ler ve default arka arkaya çalışır (fallthrough). Çıktı: 23D.",
      "en": "Without break statements, switch execution falls through from matching case 2 across all subsequent cases and default: 23D."
    }
  },
  {
    "topic": "conditions",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    if (x > 10);\n    {\n        printf(\"CALISTI\");\n    }\n    return 0;\n}",
    "options": [
      "CALISTI",
      "Hiçbir şey",
      "Hata verir",
      "0"
    ],
    "answer": 0,
    "explanation": {
      "tr": "if satırının hemen sonundaki noktalı virgül (;) if koşulunun gövdesini sonlandırır! Süslü parantezli blok bağımsız bir kod bloğu haline gelir ve her halükarda çalışarak 'CALISTI' yazar.",
      "en": "The semicolon (;) immediately after if terminates the if statement with an empty body. The following block executes unconditionally: CALISTI."
    }
  },
  {
    "topic": "loops",
    "code": "#include <stdio.h>\n\nint main() {\n    int i = 0;\n    for (i = 0; i < 3; i++);\n    printf(\"%d\", i);\n    return 0;\n}",
    "options": [
      "3",
      "012",
      "0",
      "2"
    ],
    "answer": 0,
    "explanation": {
      "tr": "for döngüsünün başlığından hemen sonra noktalı virgül (;) olduğundan döngünün gövdesi boştur. Döngü 3 kez boş döner, i 3 olduğunda çıkar ve printf tek bir kez 3 basar.",
      "en": "The semicolon after the for loop header creates an empty loop body. i increments until reaching 3, then printf prints 3."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int *p = &a;\n    *p = 25;\n    printf(\"%d\", a);\n    return 0;\n}",
    "options": [
      "25",
      "10",
      "Adres değeri",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "p işaretçisi a değişkeninin bellek adresini tutar. *p = 25 işlemi (dereferencing) bu adrese 25 yazar ve doğrudan a'yı 25 yapar.",
      "en": "Pointer p holds the address of a. Dereferencing with *p = 25 modifies variable a directly to 25."
    }
  },
  {
    "topic": "sizeof_types",
    "code": "#include <stdio.h>\n\nint main() {\n    printf(\"%lu\", sizeof(char));\n    return 0;\n}",
    "options": [
      "1",
      "2",
      "4",
      "Derleyiciye bağlı"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C dil standardı tanımı gereği sizeof(char) her zaman kesin olarak 1 bayttır. C'de sizeof birimi char cinsindendir.",
      "en": "By ISO C standard definition, sizeof(char) is always guaranteed to be exactly 1 byte."
    }
  },
  {
    "topic": "strings",
    "code": "#include <stdio.h>\n\nint main() {\n    char s[] = \"C\";\n    printf(\"%lu\", sizeof(s));\n    return 0;\n}",
    "options": [
      "2",
      "1",
      "4",
      "8"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C dilinde çift tırnaklı string sabitlerinin sonuna otomatik olarak null sonlandırıcı '\\0' karakteri eklenir. Dizi 'C' ve '\\0' olmak üzere 2 bayttır.",
      "en": "Double-quoted string literals in C are automatically null-terminated with '\\0'. The array holds 'C' and '\\0', occupying 2 bytes."
    }
  },
  {
    "topic": "strings",
    "code": "#include <stdio.h>\n\nint main() {\n    char str[] = {'A', 'r', '\\0', 'e', 'n', 'a'};\n    printf(\"%s\", str);\n    return 0;\n}",
    "options": [
      "Ar",
      "Arena",
      "Ar\\0ena",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "%s belirteci ekrana yazdırırken '\\0' (null karakter) ile karşılaştığı anda durur. Bu yüzden sadece 'Ar' yazdırılır.",
      "en": "%s stops printing upon encountering the null terminator '\\0'. Thus only 'Ar' is printed."
    }
  },
  {
    "topic": "arrays",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[3] = {10, 20, 30};\n    printf(\"%d\", arr[1]);\n    return 0;\n}",
    "options": [
      "20",
      "10",
      "30",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C dilinde diziler 0 tabanlı indekslenir. arr[0] = 10, arr[1] = 20, arr[2] = 30'dur. arr[1] 20 değerini verir.",
      "en": "C arrays are 0-indexed. arr[0]=10, arr[1]=20, arr[2]=30. arr[1] prints 20."
    }
  },
  {
    "topic": "arrays",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20};\n    printf(\"%d %d\", arr[1], arr[2]);\n    return 0;\n}",
    "options": [
      "20 0",
      "20 20",
      "20 ÇöpDeğer",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C'de bir dizi kısmen başlatılırsa, değer atanmayan diğer tüm elemanlar otomatik olarak 0 ile doldurulur (zero-filled). arr[2] = 0 olur.",
      "en": "In C, partially initialized arrays guarantee that all unmentioned elements are initialized to zero. arr[2] is 0."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    x *= 2 + 3;\n    printf(\"%d\", x);\n    return 0;\n}",
    "options": [
      "25",
      "13",
      "15",
      "10"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Bileşik atama operatörü (x *= ...) sağdaki ifadenin tamamı hesaplandıktan sonra işletilir: x = x * (2 + 3) = 5 * 5 = 25.",
      "en": "Compound assignment evaluates the full right-hand expression first: x = x * (2 + 3) = 5 * 5 = 25."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 17 % 5;\n    printf(\"%d\", a);\n    return 0;\n}",
    "options": [
      "2",
      "3",
      "3.4",
      "1"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Modül operatörü (%) tamsayı bölmesinden kalan değeri verir: 17 = 5 * 3 + 2. Kalan 2'dir.",
      "en": "The modulo operator (%) computes the integer remainder: 17 % 5 = 2."
    }
  },
  {
    "topic": "bitwise",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 7;\n    if (n & 1) {\n        printf(\"TEK\");\n    } else {\n        printf(\"CIFT\");\n    }\n    return 0;\n}",
    "options": [
      "TEK",
      "CIFT",
      "0",
      "1"
    ],
    "answer": 0,
    "explanation": {
      "tr": "n & 1 işlemi sayının en anlamsız (en sağdaki) bitini test eder. 7 (0111) & 1 (0001) = 1 (true) olduğundan TEK yazdırılır.",
      "en": "n & 1 tests the least significant bit. 7 is odd (binary 0111), yielding 1 (true), so TEK is printed."
    }
  },
  {
    "topic": "bitwise",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 1;\n    printf(\"%d\", a << 3);\n    return 0;\n}",
    "options": [
      "8",
      "3",
      "1",
      "16"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Sola kaydırma (a << n) sayıyı 2^n ile çarpar: 1 << 3 = 1 * 2^3 = 8.",
      "en": "Left shift (<<) multiplies by 2^n: 1 << 3 shifts 1 left by 3 bits, producing 8."
    }
  },
  {
    "topic": "bitwise",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 4; // 0100\n    int b = 1; // 0001\n    printf(\"%d\", a | b);\n    return 0;\n}",
    "options": [
      "5",
      "4",
      "1",
      "0"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Bitwise OR (|) işlemi karşılıklı bitlerden en az biri 1 ise 1 üretir. 0100 | 0001 = 0101 (ondalık 5).",
      "en": "Bitwise OR (|) yields 1 if either bit is 1. 0100 | 0001 = 0101 (decimal 5)."
    }
  },
  {
    "topic": "bitwise",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 6; // 0110\n    int b = 3; // 0011\n    printf(\"%d\", a ^ b);\n    return 0;\n}",
    "options": [
      "5",
      "2",
      "7",
      "0"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Bitwise XOR (^) işlemi farklı bitler için 1, aynı bitler için 0 üretir: 0110 ^ 0011 = 0101 (ondalık 5).",
      "en": "Bitwise XOR (^) produces 1 when bits differ and 0 when they match: 0110 ^ 0011 = 0101 (5)."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = (10 > 20) ? 10 : 20;\n    printf(\"%d\", x);\n    return 0;\n}",
    "options": [
      "20",
      "10",
      "1",
      "0"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Ternary operatöründe (şart ? doğruysa : yanlışsa), (10 > 20) yanlış olduğundan iki nokta üst üsteden sonraki 20 değeri döner.",
      "en": "Ternary operator evaluates condition ? if_true : if_false. 10 > 20 is false, returning 20."
    }
  },
  {
    "topic": "loops",
    "code": "#include <stdio.h>\n\nint main() {\n    int i = 0;\n    do {\n        i++;\n    } while (i < 0);\n    printf(\"%d\", i);\n    return 0;\n}",
    "options": [
      "1",
      "0",
      "Hiçbir şey",
      "Sonsuz döngü"
    ],
    "answer": 0,
    "explanation": {
      "tr": "do-while döngüsünün gövdesi koşul ne olursa olsun en az bir kez mutlaka çalışır. i 1 olur, ardından (1 < 0) yanlış olduğundan döngü biter ve 1 yazdırılır.",
      "en": "A do-while loop always executes its body at least once before testing the condition. i increments to 1, then the loop exits."
    }
  },
  {
    "topic": "scope",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    {\n        int x = 10;\n    }\n    printf(\"%d\", x);\n    return 0;\n}",
    "options": [
      "5",
      "10",
      "15",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Süslü parantezler {} yeni bir blok kapsamı (block scope) oluşturur. İçteki x dıştakini blok içinde gölgeler (shadowing); blok kapanınca dıştaki x (5) geçerlidir.",
      "en": "Inner block scope shadows the outer variable only within the block. Outside, outer x (5) is unaffected."
    }
  },
  {
    "topic": "functions",
    "code": "#include <stdio.h>\n\nvoid inc(int n) {\n    n++;\n}\n\nint main() {\n    int x = 5;\n    inc(x);\n    printf(\"%d\", x);\n    return 0;\n}",
    "options": [
      "5",
      "6",
      "0",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C dilinde fonksiyon parametreleri varsayılan olarak değer ile iletilir (pass-by-value). Fonksiyon içindeki n++ yalnızca yerel kopyayı artırır, main'deki x 5 kalır.",
      "en": "C passes arguments by value. Modifying parameter 'n' inside inc() affects only the local copy, leaving main's x unchanged at 5."
    }
  },
  {
    "topic": "loops",
    "code": "#include <stdio.h>\n\nint main() {\n    int sum = 0;\n    for (int i = 0; i < 4; i++) {\n        if (i == 2) continue;\n        sum += i;\n    }\n    printf(\"%d\", sum);\n    return 0;\n}",
    "options": [
      "4",
      "6",
      "3",
      "2"
    ],
    "answer": 0,
    "explanation": {
      "tr": "continue ifadesi o adımın kalanını atlar. i=0 (sum=0), i=1 (sum=1), i=2 (atlanır), i=3 (sum=1+3=4). Çıktı: 4.",
      "en": "continue skips the remainder of iteration 2. Summing 0 + 1 + 3 = 4."
    }
  },
  {
    "topic": "loops",
    "code": "#include <stdio.h>\n\nint main() {\n    int count = 0;\n    for (int i = 0; i < 5; i++) {\n        if (i == 3) break;\n        count++;\n    }\n    printf(\"%d\", count);\n    return 0;\n}",
    "options": [
      "3",
      "4",
      "5",
      "2"
    ],
    "answer": 0,
    "explanation": {
      "tr": "i=3 olduğunda break döngüyü derhal sonlandırır. count i=0, 1, 2 için üç kez artarak 3 olur.",
      "en": "When i reaches 3, break terminates the loop immediately. count is incremented for 0, 1, and 2, yielding 3."
    }
  },
  {
    "topic": "loops",
    "code": "#include <stdio.h>\n\nint main() {\n    int count = 0;\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 2; j++) {\n            count++;\n        }\n    }\n    printf(\"%d\", count);\n    return 0;\n}",
    "options": [
      "6",
      "5",
      "9",
      "3"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Dış döngü 3 kez, her dış adımda iç döngü 2 kez çalışır. Toplam adım sayısı 3 * 2 = 6'dır.",
      "en": "Outer loop runs 3 times; inner loop runs 2 times per outer step: 3 * 2 = 6."
    }
  },
  {
    "topic": "variables",
    "code": "#include <stdio.h>\n\nint main() {\n    unsigned char x = 255;\n    x = x + 1;\n    printf(\"%d\", x);\n    return 0;\n}",
    "options": [
      "0",
      "256",
      "Hata verir",
      "-1"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C standardına göre unsigned türlerde taşma tanımsız değildir; modülo aritmetiği ile başa döner (wrap-around). 8-bit unsigned char için 255 + 1 = 0 olur.",
      "en": "Unsigned integer overflow is well-defined in C: arithmetic wraps modulo 2^8, so 255 + 1 wraps to 0."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 10;\n    int y = (x == 10);\n    printf(\"%d\", y);\n    return 0;\n}",
    "options": [
      "1",
      "10",
      "0",
      "true"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C'de karşılaştırma operatörleri (==, !=, < vb.) şart doğru olduğunda int türünde 1, yanlış olduğunda 0 üretir. y = 1 olur.",
      "en": "In C, equality operators produce integer 1 for true and 0 for false. y becomes 1."
    }
  },
  {
    "topic": "conditions",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 0;\n    if (!a) {\n        printf(\"SIFIR\");\n    } else {\n        printf(\"DEGIL\");\n    }\n    return 0;\n}",
    "options": [
      "SIFIR",
      "DEGIL",
      "Hata",
      "0"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Mantıksal DEĞİL (!) operatörü 0 değerini 1 (true) yapar. !0 doğru olduğundan if bloğu çalışır ve SIFIR yazdırılır.",
      "en": "Logical NOT (!) inverts truth: !0 evaluates to 1 (true), printing SIFIR."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 42;\n    printf(\"%d\", !!x);\n    return 0;\n}",
    "options": [
      "1",
      "42",
      "0",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Çift ünlem (!!), herhangi bir değeri kesin bir boolean 0 veya 1 değerine dönüştürmek için kullanılan yaygın bir C deyimidir. !42 = 0, !0 = 1.",
      "en": "Double NOT (!!) normalizes any non-zero value to boolean 1. !42 is 0, and !0 is 1."
    }
  },
  {
    "topic": "variables",
    "code": "#include <stdio.h>\n\nint main() {\n    float f = 5 / 2;\n    printf(\"%.1f\", f);\n    return 0;\n}",
    "options": [
      "2.0",
      "2.5",
      "2",
      "3.0"
    ],
    "answer": 0,
    "explanation": {
      "tr": "5 ve 2 tamsayı olduğundan 5 / 2 ifadesi tamsayı bölmesiyle 2 sonucunu üretir. Bu 2 değeri daha sonra float'a çevrilerek f'ye atanır ve 2.0 basılır.",
      "en": "5 / 2 performs integer division yielding 2 before being implicitly cast to float 2.0."
    }
  },
  {
    "topic": "variables",
    "code": "#include <stdio.h>\n\nint main() {\n    char c = '7';\n    int val = c - '0';\n    printf(\"%d\", val);\n    return 0;\n}",
    "options": [
      "7",
      "55",
      "0",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "ASCII tablosunda '0'..'9' karakterleri ardışıktır. Karakter rakamdan '0' çıkarıldığında ('7' - '0' = 55 - 48 = 7) tamsayı değeri elde edilir.",
      "en": "In ASCII, digit characters are consecutive. Subtracting '0' converts character digit '7' into integer 7."
    }
  },
  {
    "topic": "strings",
    "code": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[] = \"Arena\";\n    printf(\"%lu\", strlen(s));\n    return 0;\n}",
    "options": [
      "5",
      "6",
      "4",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "strlen() fonksiyonu null sonlandırıcı ('\\0') karakterini saymaz; yalnızca string içindeki karakter sayısını döner: 5.",
      "en": "strlen() counts characters excluding the null terminator, returning 5."
    }
  },
  {
    "topic": "strings",
    "code": "#include <stdio.h>\n\nint main() {\n    char str[] = \"ArenaC\";\n    printf(\"%c\", str[1]);\n    return 0;\n}",
    "options": [
      "r",
      "A",
      "e",
      "n"
    ],
    "answer": 0,
    "explanation": {
      "tr": "str[0] = 'A', str[1] = 'r' dir. %c formatı indeks 1'deki 'r' karakterini yazdırır.",
      "en": "str[0] is 'A', str[1] is 'r'. %c prints character 'r'."
    }
  },
  {
    "topic": "structs",
    "code": "#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    struct Point p = {10, 20};\n    printf(\"%d\", p.x + p.y);\n    return 0;\n}",
    "options": [
      "30",
      "10",
      "20",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "p yapısının üyeleri x=10 ve y=20 olarak başlatılmıştır. Nokta (.) operatörü ile üyelere erişilir ve 10 + 20 = 30 yazdırılır.",
      "en": "Struct members are initialized to 10 and 20. Dot operator accesses members: 10 + 20 = 30."
    }
  }
];
