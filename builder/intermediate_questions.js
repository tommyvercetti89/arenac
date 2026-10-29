module.exports = [
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30};\n    int *p = arr;\n    int val = *p++;\n    printf(\"%d %d\", val, *p);\n    return 0;\n}",
    "options": [
      "10 20",
      "11 20",
      "10 10",
      "20 20"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Postfix ++ operatörünün önceliği * operatöründen yüksektir. *p++ ifadesinde önce p'nin mevcut adresindeki değer (10) okunur ve val'e verilir, ardından p bir sonraki elemana (20) ilerletilir. Çıktı: 10 20.",
      "en": "Postfix ++ has higher precedence than *. In *p++, the current value at p (10) is assigned to val first, then p is incremented to point to 20. Output: 10 20."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30};\n    int *p = arr;\n    (*p)++;\n    printf(\"%d %d\", arr[0], arr[1]);\n    return 0;\n}",
    "options": [
      "11 20",
      "10 20",
      "10 21",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Parantez (*p) işaretçinin gösterdiği konuma (arr[0]) erişir. Ardından ++ bu değeri 1 artırarak 10'dan 11 yapar. İşaretçinin kendisi ilerlemez. Çıktı: 11 20.",
      "en": "Parentheses (*p) dereference p first (arr[0] = 10). The ++ then increments that value to 11. Pointer p itself does not move. Output: 11 20."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30};\n    int *p = arr;\n    int val = *++p;\n    printf(\"%d %d\", val, *p);\n    return 0;\n}",
    "options": [
      "20 20",
      "10 20",
      "11 20",
      "10 10"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Prefix ++p önce işaretçiyi bir sonraki elemana (&arr[1]) ilerletir, ardından * operatörü ile bu yeni konumdaki değer (20) okunur. Çıktı: 20 20.",
      "en": "Prefix ++p advances the pointer to &arr[1] first, then dereferences it, producing 20 for val. Output: 20 20."
    }
  },
  {
    "topic": "pointer_arithmetic",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[5] = {1, 2, 3, 4, 5};\n    int *p1 = &arr[4];\n    int *p2 = &arr[1];\n    printf(\"%td\", p1 - p2);\n    return 0;\n}",
    "options": [
      "3",
      "12",
      "4",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C'de aynı diziyi gösteren iki işaretçinin farkı (p1 - p2), aradaki bayt farkını DEĞİL, aradaki eleman sayısını (ptrdiff_t) verir: 4 - 1 = 3.",
      "en": "Subtracting two pointers to the same array yields the number of elements between them (ptrdiff_t), not the byte difference. 4 - 1 = 3."
    }
  },
  {
    "topic": "arrays",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40};\n    printf(\"%d\", 2[arr]);\n    return 0;\n}",
    "options": [
      "30",
      "20",
      "Sözdizimi hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C standardına göre arr[i] ifadesi *(arr + i) demektir. Toplama değişmeli (commutative) olduğundan *(i + arr) yani i[arr] ifadesi tamamen geçerlidir: 2[arr] == arr[2] == 30.",
      "en": "In C, arr[i] translates to *(arr + i). Since addition is commutative, *(i + arr) can be written as i[arr]. 2[arr] equals arr[2] = 30."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int *p = &arr[3];\n    printf(\"%d\", p[-2]);\n    return 0;\n}",
    "options": [
      "20",
      "40",
      "10",
      "Tanımsız Davranış"
    ],
    "answer": 0,
    "explanation": {
      "tr": "p[-2] ifadesi *(p - 2) olarak derlenir. p arr[3]'ü (40) gösterdiğinden, 2 geriye gidilerek arr[1] yani 20 elde edilir.",
      "en": "p[-2] evaluates to *(p - 2). Since p points to arr[3] (40), stepping back 2 elements accesses arr[1] (20)."
    }
  },
  {
    "topic": "arrays",
    "code": "#include <stdio.h>\n\nvoid printSize(int arr[]) {\n    printf(\"%lu\", sizeof(arr));\n}\n\nint main() {\n    int myArr[10];\n    printSize(myArr);\n    return 0;\n}",
    "options": [
      "Pointer boyutu (genellikle 4 veya 8)",
      "40",
      "10",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Fonksiyon başlığındaki dizi bildirimi (int arr[]) işaretçiye (int *arr) dönüşür (array decay). sizeof(arr) fonksiyon içinde dizinin değil işaretçinin boyutunu verir.",
      "en": "Array parameters decay to pointers in function signatures. sizeof(arr) yields the pointer size (4 or 8 bytes), not the original array size."
    }
  },
  {
    "topic": "strings",
    "code": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[] = \"Arena\";\n    printf(\"%lu %lu\", strlen(s), sizeof(s));\n    return 0;\n}",
    "options": [
      "5 6",
      "5 5",
      "6 6",
      "6 5"
    ],
    "answer": 0,
    "explanation": {
      "tr": "strlen() null karakter hariç karakter sayısını (5) verir. sizeof() ise bellekte ayrılan toplam bayt boyutunu ('\\0' dahil 6 bayt) verir. Çıktı: 5 6.",
      "en": "strlen counts characters up to '\\0' (5), whereas sizeof returns total array bytes including '\\0' (6). Output: 5 6."
    }
  },
  {
    "topic": "strings",
    "code": "#include <stdio.h>\n\nint main() {\n    char *s = \"Arena\" \"C\";\n    printf(\"%s\", s);\n    return 0;\n}",
    "options": [
      "ArenaC",
      "Arena",
      "C",
      "Sözdizimi hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C dilinde aralarında sadece boşluk bulunan string sabitleri (adjacent string literals) derleme aşamasında otomatik olarak birleştirilir. Çıktı: ArenaC.",
      "en": "Adjacent string literals in C are automatically concatenated by the compiler into a single literal. Output: ArenaC."
    }
  },
  {
    "topic": "sizeof_types",
    "code": "#include <stdio.h>\n\nint main() {\n    printf(\"%d\", sizeof('A') == sizeof(char));\n    return 0;\n}",
    "options": [
      "0",
      "1",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C dilinde 'A' gibi karakter sabitlerinin türü 'int'tir (genellikle 4 bayt), char DEĞİLDİR! sizeof('A') == sizeof(char) ifadesi 4 == 1 yanlış (0) üretir. (C++'ta char'dır ve 1 üretir).",
      "en": "In C, character constants like 'A' have type 'int', not 'char'! sizeof('A') is sizeof(int), which is greater than sizeof(char). The comparison yields 0."
    }
  },
  {
    "topic": "bitwise",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 2; // binary: 0010\n    if (x & 1 == 0) {\n        printf(\"CIFT\");\n    } else {\n        printf(\"TEK\");\n    }\n    return 0;\n}",
    "options": [
      "TEK",
      "CIFT",
      "0",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C'de '==' operatörünün önceliği bitwise '&' operatöründen daha yüksektir! İfade x & (1 == 0) olarak çalışır: 1 == 0 (0) olur, ardından 2 & 0 = 0 (false) üretir ve else dalı TEK basar!",
      "en": "In C, '==' has higher precedence than '&'! The expression is evaluated as x & (1 == 0). 2 & 0 yields 0 (false), executing the else branch: TEK."
    }
  },
  {
    "topic": "bitwise",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 1 << 2 + 1;\n    printf(\"%d\", x);\n    return 0;\n}",
    "options": [
      "8",
      "5",
      "4",
      "3"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Toplama (+) operatörünün önceliği bit kaydırmadan (<<) daha yüksektir! İfade 1 << (2 + 1) = 1 << 3 = 8 olarak hesaplanır.",
      "en": "Addition (+) has higher precedence than bit shift (<<)! 1 << 2 + 1 evaluates as 1 << (2 + 1) = 1 << 3 = 8."
    }
  },
  {
    "topic": "sizeof_types",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = -1;\n    unsigned int b = 1;\n    if (a < b) {\n        printf(\"KUCUK\");\n    } else {\n        printf(\"BUYUK\");\n    }\n    return 0;\n}",
    "options": [
      "BUYUK",
      "KUCUK",
      "-1",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "signed int ve unsigned int karşılaştırıldığında signed olan terfi ettirilir. -1 işaretsiz türe dönüşünce UINT_MAX (4294967295) olur. 4294967295 < 1 yanlış olduğundan BUYUK yazdırılır!",
      "en": "When comparing signed and unsigned ints, -1 is converted to unsigned int (UINT_MAX, ~4.29 billion). Since UINT_MAX > 1, BUYUK is printed."
    }
  },
  {
    "topic": "conditions",
    "code": "#include <stdio.h>\n\nint main() {\n    float x = 0.1f;\n    if (x == 0.1) {\n        printf(\"ESIT\");\n    } else {\n        printf(\"FARKLI\");\n    }\n    return 0;\n}",
    "options": [
      "FARKLI",
      "ESIT",
      "0.1",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "0.1 sabiti double türündedir. IEEE-754 ikilik taban yuvarlama farkı nedeniyle 32-bit float (0.1f) ile 64-bit double (0.1) tam olarak eşit değildir. Çıktı: FARKLI.",
      "en": "The literal 0.1 has type double. Due to IEEE-754 precision limits, (double)0.1f does not equal 0.1 exactly, printing FARKLI."
    }
  },
  {
    "topic": "preprocessor",
    "code": "#include <stdio.h>\n#define SQUARE(x) x * x\n\nint main() {\n    int res = SQUARE(2 + 3);\n    printf(\"%d\", res);\n    return 0;\n}",
    "options": [
      "11",
      "25",
      "13",
      "10"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Önişlemci makroları parantezsiz kopyalar: SQUARE(2 + 3) -> 2 + 3 * 2 + 3 = 2 + 6 + 3 = 11.",
      "en": "Macro arguments expand textually without parentheses: 2 + 3 * 2 + 3 = 2 + 6 + 3 = 11."
    }
  },
  {
    "topic": "preprocessor",
    "code": "#include <stdio.h>\n\n#define MAX(a, b) ((a) > (b) ? (a) : (b))\n\nint main() {\n    int x = 5, y = 3;\n    int m = MAX(x++, y);\n    printf(\"%d %d\", m, x);\n    return 0;\n}",
    "options": [
      "6 7",
      "5 6",
      "6 6",
      "5 7"
    ],
    "answer": 0,
    "explanation": {
      "tr": "MAX(x++, y) ifadesinde x++ iki kez genişler: ((x++) > (y) ? (x++) : (y)). Karşılaştırmada x 6 olur; doğru dal seçilince x++ tekrar çalışır, m 6 olur ve x 7 olur! Çıktı: 6 7.",
      "en": "In MAX(x++, y), x++ is evaluated twice: once in the condition (making x 6) and once in the selected true branch, returning 6 for m and incrementing x to 7."
    }
  },
  {
    "topic": "preprocessor",
    "code": "#include <stdio.h>\n\n#define PTR_D int*\ntypedef int* ptr_t;\n\nint main() {\n    PTR_D a, b;\n    ptr_t c, d;\n    printf(\"%d %d\", sizeof(b) == sizeof(int*), sizeof(d) == sizeof(int*));\n    return 0;\n}",
    "options": [
      "0 1",
      "1 1",
      "0 0",
      "1 0"
    ],
    "answer": 0,
    "explanation": {
      "tr": "PTR_D a, b; ifadesi int* a, b; haline gelir; a işaretçi, b ise int olur (0). typedef ile tanımlanan d ise gerçek bir işaretçidir (1). Çıktı: 0 1.",
      "en": "The macro expands to 'int* a, b;' where 'b' is plain int (0). typedef creates a real type alias, making 'd' a pointer (1). Output: 0 1."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 1;\n    int b = sizeof(a++);\n    printf(\"%d\", a);\n    return 0;\n}",
    "options": [
      "1",
      "2",
      "4",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "sizeof derleme zamanında tip hesabı yapar ve parantez içindeki ifadelerin yan etkilerini çalışma anında ASLA çalıştırmaz (unevaluated operand). a++ çalışmaz, a 1 kalır.",
      "en": "sizeof operands are unevaluated at runtime. a++ is never executed, leaving a at 1."
    }
  },
  {
    "topic": "scope",
    "code": "#include <stdio.h>\n\nvoid counter() {\n    static int c = 0;\n    c++;\n    printf(\"%d \", c);\n}\n\nint main() {\n    counter();\n    counter();\n    counter();\n    return 0;\n}",
    "options": [
      "1 2 3 ",
      "1 1 1 ",
      "0 1 2 ",
      "3 2 1 "
    ],
    "answer": 0,
    "explanation": {
      "tr": "static yerel değişkenler yalnızca bir kez başlatılır ve fonksiyon çağrıları arasında değerlerini korurlar. Çıktı: 1 2 3 .",
      "en": "static local variables are initialized once and preserve their state between calls. Output: 1 2 3 ."
    }
  },
  {
    "topic": "variables",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 5, b = 20;\n    const int *p = &a;\n    p = &b;\n    printf(\"%d\", *p);\n    return 0;\n}",
    "options": [
      "20",
      "5",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "const int *p sabit bir tamsayıya işaretçidir. *p üzerinden değer değiştirilemez, ancak p işaretçisinin gösterdiği adres (p = &b) serbestçe değiştirilebilir. Çıktı: 20.",
      "en": "const int *p is a pointer to const int. The pointed-to value cannot be modified through p, but p itself can be reassigned: 20."
    }
  },
  {
    "topic": "functions",
    "code": "#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int (*fp)(int, int) = add;\n    printf(\"%d\", fp(5, 7));\n    return 0;\n}",
    "options": [
      "12",
      "Adres değeri",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "fp iki tamsayı alıp tamsayı dönen bir fonksiyon işaretçisidir (function pointer). fp(5, 7) add(5, 7) yi çağırır ve 12 basar.",
      "en": "fp is a function pointer pointing to add. fp(5, 7) invokes add(5, 7), returning 12."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nvoid swap(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main() {\n    int a = 10, b = 20;\n    swap(&a, &b);\n    printf(\"%d %d\", a, b);\n    return 0;\n}",
    "options": [
      "20 10",
      "10 20",
      "10 10",
      "20 20"
    ],
    "answer": 0,
    "explanation": {
      "tr": "swap fonksiyonuna adresler (&a, &b) iletildiği için fonksiyon çağrılan yerdeki bellek hücrelerini doğrudan değiştirir. Çıktı: 20 10.",
      "en": "Addresses &a and &b are passed to swap, modifying caller memory via pointers. Output: 20 10."
    }
  },
  {
    "topic": "arrays",
    "code": "#include <stdio.h>\n\nint main() {\n    int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};\n    printf(\"%d\", *(*(matrix + 1) + 2));\n    return 0;\n}",
    "options": [
      "6",
      "5",
      "4",
      "3"
    ],
    "answer": 0,
    "explanation": {
      "tr": "matrix + 1 ikinci satırı {4, 5, 6} gösterir. *(matrix + 1) satırın başlangıç adresidir, + 2 eklenip dereference edildiğinde matrix[1][2] = 6 elde edilir.",
      "en": "matrix + 1 points to row 1. Adding 2 advances to column 2 (element 6). Dereferencing yields 6."
    }
  },
  {
    "topic": "structs",
    "code": "#include <stdio.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\nint main() {\n    struct Node b = {20, NULL};\n    struct Node a = {10, &b};\n    printf(\"%d\", a.next->data);\n    return 0;\n}",
    "options": [
      "20",
      "10",
      "Adres",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "a.next b'nin adresini tutar. Ok operatörü (->) işaretçiyi dereference edip data üyesine erişir: 20.",
      "en": "a.next points to b. Arrow operator (->) dereferences the pointer to access member data: 20."
    }
  },
  {
    "topic": "structs",
    "code": "#include <stdio.h>\n\nunion Data {\n    int i;\n    char c;\n};\n\nint main() {\n    union Data d;\n    d.i = 65;\n    printf(\"%c\", d.c);\n    return 0;\n}",
    "options": [
      "A",
      "65",
      "Tanımsız",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "union üyeleri aynı bellek alanını paylaşır. d.i = 65 yazıldığında bellekteki ilk bayt 65 (ASCII 'A') olur. d.c okunduğunda 'A' basılır.",
      "en": "Union members share memory. Setting d.i = 65 writes ASCII 65 ('A') into the shared byte, printing 'A'."
    }
  },
  {
    "topic": "variables",
    "code": "#include <stdio.h>\n\nenum Color { RED, GREEN = 5, BLUE };\n\nint main() {\n    printf(\"%d %d\", RED, BLUE);\n    return 0;\n}",
    "options": [
      "0 6",
      "0 2",
      "1 6",
      "0 5"
    ],
    "answer": 0,
    "explanation": {
      "tr": "enum değerleri belirtilmediğinde 0'dan başlar (RED = 0). GREEN 5 yapıldığında sonraki elemanlar birer artarak devam eder (BLUE = 6). Çıktı: 0 6.",
      "en": "Enum values start at 0 by default (RED = 0). Subsequent unassigned values increment from the previous (GREEN = 5, so BLUE = 6)."
    }
  },
  {
    "topic": "bitwise",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 16;\n    if ((n & (n - 1)) == 0) {\n        printf(\"EVET\");\n    } else {\n        printf(\"HAYIR\");\n    }\n    return 0;\n}",
    "options": [
      "EVET",
      "HAYIR",
      "0",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "(n & (n - 1)) == 0 ifadesi bir sayının 2'nin kuvveti olup olmadığını kontrol eden klasik C bitwise deyimidir. 16 (10000) & 15 (01111) = 0 olduğundan EVET basılır.",
      "en": "(n & (n - 1)) == 0 tests if n is a power of 2. 16 & 15 is 0, so EVET is printed."
    }
  },
  {
    "topic": "bitwise",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 0;\n    printf(\"%d\", ~x);\n    return 0;\n}",
    "options": [
      "-1",
      "0",
      "1",
      "255"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Bitwise NOT (~) operatörü tüm bitleri 1 yapar. İkiye tümleyen (two's complement) tamsayı sisteminde tüm bitleri 1 olan sayı kesin olarak -1'dir.",
      "en": "Bitwise NOT (~) flips all bits. In two's complement representation, all bits set to 1 represents -1."
    }
  },
  {
    "topic": "structs",
    "code": "#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n    int z;\n};\n\nint main() {\n    struct Point p = { .y = 20 };\n    printf(\"%d %d %d\", p.x, p.y, p.z);\n    return 0;\n}",
    "options": [
      "0 20 0",
      "Tanımsız / Çöp değerler",
      "20 0 0",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C99 ve sonrasında belirlenmiş başlatıcı (designated initializer) ile kısmen başlatılan yapılarda, açıkça yazılmayan tüm diğer üyeler kesin olarak SIFIR ile doldurulur. Çıktı: 0 20 0.",
      "en": "In C99+, unmentioned members in designated initializers are guaranteed to be zero-filled: 0 20 0."
    }
  },
  {
    "topic": "functions",
    "code": "#include <stdio.h>\n\nvoid solve(int n) {\n    if (n == 0) return;\n    solve(n - 1);\n    printf(\"%d\", n);\n}\n\nint main() {\n    solve(3);\n    return 0;\n}",
    "options": [
      "123",
      "321",
      "3",
      "0123"
    ],
    "answer": 0,
    "explanation": {
      "tr": "printf özyinelemeli çağrıdan sonra yer alır (backtracking/post-order). En derin çağrı (n=1) ilk yazdırılır, sonra 2, sonra 3: 123.",
      "en": "printf executes after recursive unwinding. Deepest frame (n=1) prints first, producing 123."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = (1, 2, 3);\n    printf(\"%d\", a);\n    return 0;\n}",
    "options": [
      "3",
      "1",
      "2",
      "6"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Virgül operatörü soldan sağa çalışır ve en sağdaki ifadenin değerini döner: a = 3.",
      "en": "The comma operator evaluates operands left to right and returns the value of the rightmost expression: 3."
    }
  },
  {
    "topic": "loops",
    "code": "#include <stdio.h>\n\nint main() {\n    int i, j;\n    for (i = 0, j = 0; i < 3; i++, j += 2);\n    printf(\"%d %d\", i, j);\n    return 0;\n}",
    "options": [
      "3 6",
      "2 4",
      "3 4",
      "0 0"
    ],
    "answer": 0,
    "explanation": {
      "tr": "for başlığındaki noktalı virgül yüzünden döngü gövdesi boştur. i 3 olduğunda döngüden çıkılır ve j 6 olur. Çıktı: 3 6.",
      "en": "The semicolon creates an empty loop body. Loop terminates when i reaches 3 with j = 6. Output: 3 6."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 42;\n    int *p = &a;\n    int **pp = &p;\n    printf(\"%d\", **pp);\n    return 0;\n}",
    "options": [
      "42",
      "Adres değeri",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "pp çift işaretçidir (pointer to pointer). *pp p işaretçisine, **pp ise a'nın değerine (42) ulaşır.",
      "en": "pp is a double pointer. Dereferencing twice (**pp) retrieves the integer value 42."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 100;\n    void *vp = &x;\n    printf(\"%d\", *(int*)vp);\n    return 0;\n}",
    "options": [
      "100",
      "Adres",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "void* türü doğrudan dereference edilemez; ancak (int*) türüne dönüştürüldükten (cast) sonra tamsayı değeri 100 okunabilir.",
      "en": "void* cannot be directly dereferenced. Casting to (int*) allows dereferencing to read 100."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int *p = NULL;\n    if (!p) {\n        printf(\"NULL\");\n    } else {\n        printf(\"VALID\");\n    }\n    return 0;\n}",
    "options": [
      "NULL",
      "VALID",
      "Çökme (Crash)",
      "Hata"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C'de NULL işaretçi mantıksal olarak 0 (false) değerindedir. !p ifadesi doğru (1) olur ve NULL basılır.",
      "en": "A NULL pointer evaluates to false (0). The logical NOT !p evaluates to true (1), printing NULL."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = -7;\n    int y = 3;\n    printf(\"%d\", x % y);\n    return 0;\n}",
    "options": [
      "-1",
      "2",
      "1",
      "-2"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C99 standardına göre tamsayı bölmesi sıfıra doğru yuvarlanır ve modül (%) kalanı daima bölünenin (sol terim) işaretini taşır. -7 % 3 = -1.",
      "en": "In C99+, integer division truncates toward zero and the remainder takes the sign of the dividend: -7 % 3 = -1."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    char s[] = \"C-Language\";\n    char *p = s;\n    while (*p != '-') {\n        p++;\n    }\n    printf(\"%td\", p - s);\n    return 0;\n}",
    "options": [
      "1",
      "2",
      "0",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "s[0] 'C', s[1] '-' dir. p '-' karakterini gösterdiğinde p - s farkı indeks 1 - 0 = 1 verir.",
      "en": "Index 0 is 'C' and index 1 is '-'. The pointer difference p - s yields index 1."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20, c = 30;\n    int x = (a > b) ? a : (b > c) ? b : c;\n    printf(\"%d\", x);\n    return 0;\n}",
    "options": [
      "30",
      "20",
      "10",
      "1"
    ],
    "answer": 0,
    "explanation": {
      "tr": "İç içe ternary operatörleri sağdan sola ilişkilendirilir. (10 > 20) yanlış olduğundan sağdaki (20 > 30 ? 20 : 30) çalışır ve 30 döner.",
      "en": "Chained ternary operators associate right-to-left. 10 > 20 is false, evaluating (20 > 30 ? 20 : 30) = 30."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = printf(\"%d\", printf(\"C\"));\n    return 0;\n}",
    "options": [
      "C1",
      "C",
      "11",
      "C2"
    ],
    "answer": 0,
    "explanation": {
      "tr": "printf() ekrana yazdırdığı karakter sayısını döndürür. İçteki printf(\"C\") 'C' yazar ve 1 döner. Dıştaki printf bu 1'i yazar: C1.",
      "en": "printf returns the number of characters printed. Inner printf(\"C\") prints 'C' and returns 1. Outer printf prints 1: C1."
    }
  },
  {
    "topic": "strings",
    "code": "#include <stdio.h>\n\nint main() {\n    char a[] = \"hello\";\n    char b[] = \"hello\";\n    printf(\"%d\", a == b);\n    return 0;\n}",
    "options": [
      "0",
      "1",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "'==' operatörü string içeriklerini DEĞİL, dizilerin bellek adreslerini karşılaştırır. a ve b stack'te ayrı diziler olduğundan adresleri farklıdır (0).",
      "en": "'==' compares array memory addresses, not their contents. Since a and b are separate stack arrays, a == b is 0 (false)."
    }
  }
];
