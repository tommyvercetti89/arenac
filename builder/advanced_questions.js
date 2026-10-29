module.exports = [
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    int *p1 = (int*)(&arr + 1);\n    printf(\"%d\", *(p1 - 1));\n    return 0;\n}",
    "options": [
      "50",
      "10",
      "Tanımsız Davranış",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "&arr tüm diziye işaret eden bir işaretçidir (int (*)[5]). (&arr + 1) tüm diziyi (5 int = 20 bayt) aşar. (int*) dönüşümünden sonra 1 çıkarıldığında son eleman olan arr[4]'e (50) geri döner.",
      "en": "&arr is a pointer to the entire array of 5 ints. (&arr + 1) skips the whole array. Subtracting 1 from (p1 - 1) points back to the last element arr[4] (50)."
    }
  },
  {
    "topic": "strings",
    "code": "#include <stdio.h>\n\nint main() {\n    char *s = \"Merhaba\";\n    s[0] = 'm';\n    printf(\"%s\", s);\n    return 0;\n}",
    "options": [
      "Tanımsız Davranış / Çökme (Segmentation Fault)",
      "merhaba",
      "Merhaba",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "String sabitleri (\"Merhaba\") salt okunur bellek alanında (.rodata) saklanır. char* işaretçisi üzerinden bu alanı değiştirmeye çalışmak Tanımsız Davranıştır ve çökmeye (SIGSEGV) yol açar.",
      "en": "String literals are stored in read-only memory (.rodata). Modifying a string literal via pointer invokes Undefined Behavior (usually Segmentation Fault)."
    }
  },
  {
    "topic": "structs",
    "code": "#include <stdio.h>\n\nstruct S {\n    char a;\n    int b;\n    char c;\n};\n\nint main() {\n    printf(\"%lu\", sizeof(struct S));\n    return 0;\n}",
    "options": [
      "12 (veya hizalamaya göre 6'dan büyük)",
      "6",
      "8",
      "16"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Derleyici donanım erişim hızını optimize etmek için bayt hizalaması (padding) yapar. int üyesinin 4 baytlık sınıra yerleşmesi için a'dan sonra 3 bayt, c'den sonra 3 bayt dolgu eklenir: 1 + 3 + 4 + 1 + 3 = 12 bayt.",
      "en": "Data structure padding aligns members to memory word boundaries. Padding bytes are inserted after char 'a' (3 bytes) and 'c' (3 bytes), totaling 12 bytes."
    }
  },
  {
    "topic": "arrays",
    "code": "#include <stdio.h>\n\nint main() {\n    int a[2][2] = { (1, 2), (3, 4) };\n    printf(\"%d %d\", a[0][0], a[0][1]);\n    return 0;\n}",
    "options": [
      "2 4",
      "1 2",
      "1 3",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Parantezler (1, 2) ve (3, 4) virgül operatörlü ifadelerdir! (1, 2) 2 değerini, (3, 4) ise 4 değerini döner. Dizi {2, 4} ile başlatılmış gibi olur; a[0][0] = 2 ve a[0][1] = 4 olur.",
      "en": "(1, 2) and (3, 4) are comma expressions in parentheses, evaluating to 2 and 4. The array is initialized as {2, 4}, setting a[0][0]=2 and a[0][1]=4."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int a[2][2] = {{1, 2}, {3, 4}};\n    int (*p)[2] = a;\n    printf(\"%d\", *(*(p + 1) + 0));\n    return 0;\n}",
    "options": [
      "3",
      "1",
      "2",
      "4"
    ],
    "answer": 0,
    "explanation": {
      "tr": "p 2 elemanlı int dizisine bir işaretçidir (int (*)[2]). p + 1 bir tam satır (2 int) ileri atlayarak ikinci satırı ({3, 4}) gösterir. Dereference edildiğinde 3 elde edilir.",
      "en": "p is a pointer to an array of 2 ints. p + 1 skips an entire row to point to {3, 4}. Dereferencing yields 3."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    char *c[] = {\"ARENA\", \"C\", \"PRO\"};\n    char **cp[] = {c + 2, c + 1, c};\n    char ***cpp = cp;\n    printf(\"%s\", **++cpp);\n    return 0;\n}",
    "options": [
      "C",
      "ARENA",
      "PRO",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "++cpp işaretçiyi cp[1]'e ilerletir. cp[1] c + 1'i tutar (*++cpp = c + 1). İkinci dereference (**++cpp) c[1] string'i olan \"C\" yi verir.",
      "en": "++cpp points to cp[1] (which stores c + 1). Dereferencing twice accesses c[1], printing \"C\"."
    }
  },
  {
    "topic": "preprocessor",
    "code": "#include <stdio.h>\n#define STR(x) #x\n\nint main() {\n    printf(\"%s\", STR(ArenaC));\n    return 0;\n}",
    "options": [
      "ArenaC",
      "x",
      "\"ArenaC\"",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "# önişlemci operatörü (stringizing) parametreyi doğrudan çift tırnaklı bir string sabitine dönüştürür. STR(ArenaC) -> \"ArenaC\" olur.",
      "en": "The stringizing operator (#) turns the macro argument into a string literal. STR(ArenaC) expands to \"ArenaC\"."
    }
  },
  {
    "topic": "preprocessor",
    "code": "#include <stdio.h>\n#define CONCAT(a, b) a ## b\n\nint main() {\n    int xy = 100;\n    printf(\"%d\", CONCAT(x, y));\n    return 0;\n}",
    "options": [
      "100",
      "xy",
      "Derleme hatası",
      "0"
    ],
    "answer": 0,
    "explanation": {
      "tr": "## operatörü (token pasting) x ve y belirteçlerini birleştirerek 'xy' değişken adını oluşturur. xy'nin değeri 100 yazdırılır.",
      "en": "Token pasting (##) merges tokens x and y into identifier xy, printing 100."
    }
  },
  {
    "topic": "structs",
    "code": "#include <stdio.h>\n\nstruct Flags {\n    int a : 1;\n};\n\nint main() {\n    struct Flags f;\n    f.a = 1;\n    printf(\"%d\", f.a);\n    return 0;\n}",
    "options": [
      "-1 (veya 1)",
      "1",
      "0",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "1 bitlik işaretli tamsayıda (signed int a : 1) en yüksek bit işaret bitidir. 1 yazıldığında ikiye tümleyen sistemde bu -1 anlamına gelir. (unsigned int a:1 olsaydı 1 olurdu).",
      "en": "In a 1-bit signed bit-field, the single bit is the sign bit. Storing 1 represents -1 in two's complement."
    }
  },
  {
    "topic": "memory",
    "code": "#include <stdio.h>\n\nint* get_stack_ptr() {\n    int x = 42;\n    return &x;\n}\n\nint main() {\n    int *p = get_stack_ptr();\n    printf(\"%d\", p != NULL);\n    return 0;\n}",
    "options": [
      "1 (ancak dereference etmek UB)",
      "0",
      "Derleme hatası",
      "Çökme"
    ],
    "answer": 0,
    "explanation": {
      "tr": "x yerel bir stack değişkenidir ve fonksiyon bitince stack alanı geri alınır. İşaretçinin adresi NULL değildir (1 basar), ancak bu adresteki değeri okumak Tanımsız Davranıştır (Dangling Pointer).",
      "en": "Returning the address of a local stack variable returns a non-null pointer, but dereferencing it is Undefined Behavior (Dangling Pointer)."
    }
  },
  {
    "topic": "functions",
    "code": "#include <stdio.h>\n\nvoid f(int *p) {\n    static int val = 100;\n    p = &val;\n}\n\nint main() {\n    int x = 50;\n    int *ptr = &x;\n    f(ptr);\n    printf(\"%d\", *ptr);\n    return 0;\n}",
    "options": [
      "50",
      "100",
      "Tanımsız",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "İşaretçiler fonksiyona değerleriyle (adresi kopyalanarak) iletilir. f içinde p'ye yeni adres atanması, main'deki ptr'yi ETKİLEMEZ. Çıktı: 50.",
      "en": "Pointers are passed by value. Reassigning local pointer 'p' inside f() does not change caller pointer 'ptr'. Output: 50."
    }
  },
  {
    "topic": "functions",
    "code": "#include <stdio.h>\n\nvoid f(int **pp) {\n    static int val = 100;\n    *pp = &val;\n}\n\nint main() {\n    int x = 50;\n    int *ptr = &x;\n    f(&ptr);\n    printf(\"%d\", *ptr);\n    return 0;\n}",
    "options": [
      "100",
      "50",
      "Tanımsız",
      "Hata verir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "main'deki ptr'nin adresi (&ptr) çift işaretçi olarak iletilmiştir. *pp = &val ifadesi doğrudan main'deki ptr işaretçisini günceller. Çıktı: 100.",
      "en": "By passing the address of pointer &ptr (double pointer), *pp = &val mutates ptr in main(). Output: 100."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    int y = (x++, x++, x++);\n    printf(\"%d %d\", x, y);\n    return 0;\n}",
    "options": [
      "8 7",
      "8 8",
      "7 7",
      "Tanımsız Davranış"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Virgül operatörü her ifadeden sonra kesin bir sequence point oluşturur! x 6, sonra 7 olur. Üçüncü x++ y'ye 7 verir ve x'i 8 yapar. Çıktı: 8 7.",
      "en": "The comma operator enforces sequence points. x increments to 6, then 7. The third expression evaluates to 7 (assigned to y) and increments x to 8. Output: 8 7."
    }
  },
  {
    "topic": "conditions",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 10;\n    if (1 < x < 5) {\n        printf(\"DOGRU\");\n    } else {\n        printf(\"YANLIS\");\n    }\n    return 0;\n}",
    "options": [
      "DOGRU",
      "YANLIS",
      "Sözdizimi hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C'de ilişkisel operatörler soldan sağa çalışır: (1 < x) doğru olduğu için 1 üretir. Ardından (1 < 5) değerlendirilir; bu da doğru (1) olduğu için DOGRU basılır!",
      "en": "Relational operators associate left-to-right: (1 < x) is true (1). Then (1 < 5) is also true (1), printing DOGRU."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 0;\n    int b = 1;\n    if (a++ && (b = 5)) {\n        b += 10;\n    }\n    printf(\"%d %d\", a, b);\n    return 0;\n}",
    "options": [
      "1 1",
      "1 5",
      "0 1",
      "1 15"
    ],
    "answer": 0,
    "explanation": {
      "tr": "a++ önce 0 değerini döner (ardından a 1 olur). && operatöründe sol taraf 0 olduğundan kısa devre gerçekleşir ve sağdaki (b = 5) ASLA çalışmaz! b 1 kalır.",
      "en": "a++ returns 0 first (then increments a to 1). Left operand being 0 causes short-circuiting, so (b = 5) never executes. b remains 1."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40};\n    int *p = arr + 1;\n    printf(\"%d\", p[2] - p[-1]);\n    return 0;\n}",
    "options": [
      "30",
      "20",
      "40",
      "Tanımsız Davranış"
    ],
    "answer": 0,
    "explanation": {
      "tr": "p arr[1]'i (20) gösterir. p[2] *(p + 2) = arr[3] = 40'tır. p[-1] *(p - 1) = arr[0] = 10'dur. 40 - 10 = 30.",
      "en": "p points to arr[1] (20). p[2] is arr[3] (40), and p[-1] is arr[0] (10). 40 - 10 = 30."
    }
  },
  {
    "topic": "arrays",
    "code": "#include <stdio.h>\n\n#define COUNT(a) (sizeof(a) / sizeof((a)[0]))\n\nvoid check(int a[10]) {\n    printf(\"%d\", (int)COUNT(a) == 10);\n}\n\nint main() {\n    int arr[10];\n    check(arr);\n    return 0;\n}",
    "options": [
      "0 (Dizi fonksiyonda işaretçiye dönüştü)",
      "1 (Boyut 10)",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Fonksiyon parametresi 'int a[10]' işaretçiye ('int *a') dönüşür. check içinde sizeof(a) işaretçi boyutunu (8 bayt) verir. 8/4 = 2 != 10 olduğundan 0 basılır.",
      "en": "Array parameters decay to pointers. Inside check(), sizeof(a) yields pointer size (8 bytes), so COUNT(a) evaluates to 2 != 10, printing 0."
    }
  },
  {
    "topic": "scope",
    "code": "#include <stdio.h>\n\nint a = 5;\n\nint main() {\n    int a = 10;\n    {\n        extern int a;\n        printf(\"%d \", a);\n    }\n    printf(\"%d\", a);\n    return 0;\n}",
    "options": [
      "5 10",
      "10 10",
      "5 5",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Blok içindeki 'extern int a;' bildirimi yerel a'yı görmezden gelerek global kapsamdaki a'ya (5) başvurur. Blok çıkışında yerel a (10) basılır. Çıktı: 5 10.",
      "en": "'extern int a;' inside the block links to the file-scope global variable (5). Outside the block, the local variable (10) is printed: 5 10."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    int *p1 = &x;\n    int *p2 = p1;\n    *p2 = 15;\n    printf(\"%d\", *p1);\n    return 0;\n}",
    "options": [
      "15",
      "5",
      "Adres",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "p1 ve p2 aynı bellek adresini (&x) işaret eder (aliasing). p2 üzerinden yapılan değişiklik p1 dereference edildiğinde de görülür: 15.",
      "en": "p1 and p2 point to the same memory location (&x). Modifying through *p2 updates x, which *p1 reads as 15."
    }
  },
  {
    "topic": "preprocessor",
    "code": "#include <stdio.h>\n#define PRINT(s) printf(#s \" = %d\\n\", s)\n\nint main() {\n    int val = 42;\n    PRINT(val);\n    return 0;\n}",
    "options": [
      "val = 42",
      "42 = 42",
      "#val = 42",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "#s stringizing ile \"val\" olur. Bitişik string birleştirmesi ile format stringi \"val\" \" = %d\\n\" haline gelir. Çıktı: val = 42.",
      "en": "#s stringizes parameter to \"val\". Adjacent string literals concatenate to \"val = %d\\n\", printing val = 42."
    }
  },
  {
    "topic": "arrays",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {[2] = 5, [0] = 1};\n    printf(\"%d %d %d\", arr[0], arr[1], arr[2]);\n    return 0;\n}",
    "options": [
      "1 0 5",
      "5 0 1",
      "1 5 0",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C99 Belirlenmiş Başlatıcılar (Designated Initializers) özelliği ile elemanlar indeksleriyle başlatılabilir. Belirtilmeyen indeksler (arr[1]) otomatik olarak 0 olur. Çıktı: 1 0 5.",
      "en": "C99 designated array initializers permit setting indices explicitly. Unmentioned elements (arr[1]) are zero-filled: 1 0 5."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 1, b = 2;\n    int c = a > b ? a : (a = 10, b = 20, a + b);\n    printf(\"%d %d\", c, a);\n    return 0;\n}",
    "options": [
      "30 10",
      "2 1",
      "30 1",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "a > b yanlış olduğundan iki nokta üst üsteden sonraki virgüllü ifade değerlendirilir: a=10, b=20 yapılır ve a + b = 30 değeri c'ye atanır. Çıktı: 30 10.",
      "en": "a > b is false, evaluating the comma expression: a=10, b=20, and c receives 30. Output: 30 10."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int * const p = &a;\n    *p = 20;\n    printf(\"%d\", *p);\n    return 0;\n}",
    "options": [
      "20",
      "10",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "'int * const p' sabit bir işaretçidir (constant pointer). p'nin tuttuğu adres değiştirilemez, ancak işaret ettiği değer (*p = 20) serbestçe değiştirilebilir.",
      "en": "'int * const p' is a const pointer to mutable int. The address in p cannot change, but *p can be mutated: 20."
    }
  },
  {
    "topic": "structs",
    "code": "#include <stdio.h>\n\nstruct Point { int x; int y; };\n\nint main() {\n    struct Point p1 = {10, 20};\n    struct Point p2 = p1;\n    p2.x = 99;\n    printf(\"%d %d\", p1.x, p2.x);\n    return 0;\n}",
    "options": [
      "10 99",
      "99 99",
      "10 20",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C'de struct ataması yüzeysel kopyalama (shallow copy) yapar; tüm baytlar p2'ye kopyalanır. p2.x'in değiştirilmesi p1'i etkilemez. Çıktı: 10 99.",
      "en": "Struct assignment copies all member bytes by value. Mutating p2.x does not alter p1.x. Output: 10 99."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int a[4] = {1, 2, 3, 4};\n    printf(\"%d\", (void*)a == (void*)&a);\n    return 0;\n}",
    "options": [
      "1",
      "0",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "a (ilk elemanın adresi) ile &a (tüm dizinin adresi) bellekte aynı byte konumuna işaret eder. Türleri farklı olsa da void* olarak karşılaştırıldığında adresler eşittir (1).",
      "en": "Both 'a' and '&a' evaluate to the same starting memory address. Cast to void*, they are equal (1)."
    }
  },
  {
    "topic": "functions",
    "code": "#include <stdio.h>\n\nint f(int a, int b) { return a * b; }\n\nint main() {\n    int (*op)(int, int) = &f;\n    printf(\"%d\", (*op)(3, 4));\n    return 0;\n}",
    "options": [
      "12",
      "7",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C'de fonksiyon işaretçilerini tanımlarken '&f' ile 'f', çağırırken '(*op)' ile 'op' kullanmak tamamen eşdeğerdir. 3 * 4 = 12.",
      "en": "In C, (*op)(3, 4) and op(3, 4) are completely equivalent function pointer call syntaxes: 12."
    }
  },
  {
    "topic": "bitwise",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 1;\n    // 32-bit int üzerinde 32 bit sola kaydırma\n    int b = a << 32;\n    printf(\"%d\", b);\n    return 0;\n}",
    "options": [
      "Tanımsız Davranış (Undefined Behavior)",
      "0",
      "1",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C standardına göre bir türün bit genişliğine eşit veya daha büyük miktarda kaydırma yapmak (32-bit int için << 32) kesin olarak Tanımsız Davranıştır (UB).",
      "en": "Shifting by a count greater than or equal to the width of the operand is explicitly Undefined Behavior in C."
    }
  },
  {
    "topic": "undefined_behavior",
    "code": "#include <stdio.h>\n#include <limits.h>\n\nint main() {\n    int x = INT_MAX;\n    printf(\"%d\", x + 1 < x);\n    return 0;\n}",
    "options": [
      "Tanımsız Davranış (Undefined Behavior)",
      "1",
      "0",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C standardında işaretli tamsayı taşması (signed integer overflow) Tanımsız Davranıştır (UB). Derleyiciler x + 1 < x kontrolünü UB varsayarak tamamen optimize edebilir.",
      "en": "Signed integer overflow invokes Undefined Behavior in C. Optimizers may assume it never occurs."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 2;\n    int y = x++ + ++x;\n    printf(\"%d\", y);\n    return 0;\n}",
    "options": [
      "Tanımsız Davranış (Undefined Behavior)",
      "6",
      "7",
      "8"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Aynı ifadede aralarında bir sequence point olmadan bir skaler değişkeni birden fazla kez değiştirmek (x++ ve ++x) C standardına göre Tanımsız Davranıştır.",
      "en": "Modifying a scalar variable more than once between sequence points without synchronization is Undefined Behavior."
    }
  },
  {
    "topic": "undefined_behavior",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 1;\n    x = x++;\n    printf(\"%d\", x);\n    return 0;\n}",
    "options": [
      "Tanımsız Davranış (Undefined Behavior)",
      "1",
      "2",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "x = x++ ifadesinde x değişkeni hem atanmakta hem de artırılmaktadır. İki yan etki arasında sequence point bulunmadığından tanımsız davranıştır.",
      "en": "x = x++ attempts unsequenced modification and assignment to the same scalar variable, which is Undefined Behavior."
    }
  },
  {
    "topic": "sizeof_types",
    "code": "#include <stdio.h>\n\nint main() {\n    int i = 2;\n    int a = sizeof(int[i++]);\n    printf(\"%d\", i);\n    return 0;\n}",
    "options": [
      "3 (C99 VLA kuralı)",
      "2 (sizeof yan etki üretmez)",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C99 standardında VLA (Variable Length Array) türlerinin boyutu derleme zamanında bilinemez; bu nedenle VLA içeren sizeof ifadeleri çalışma anında değerlendirilir ve i++ çalışır: i = 3.",
      "en": "In C99+, if sizeof operand is a Variable Length Array, the expression IS evaluated at runtime. i increments to 3."
    }
  },
  {
    "topic": "structs",
    "code": "#include <stdio.h>\n\nunion Test {\n    unsigned int x;\n    unsigned char bytes[4];\n};\n\nint main() {\n    union Test t = { .x = 1 };\n    printf(\"%s\", t.bytes[0] == 1 ? \"Little-Endian\" : \"Big-Endian\");\n    return 0;\n}",
    "options": [
      "Little-Endian (x86/ARM yaygın mimarilerde)",
      "Big-Endian",
      "Tanımsız",
      "Hata"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Little-endian sistemlerde en düşük anlamlı bayt (LSB) en düşük adreste saklanır. 1 tamsayısının ilk baytı 1 ise sistem Little-Endian'dır (x86 ve modern ARM işlemciler).",
      "en": "In little-endian architectures, the least significant byte is stored at the lowest address. bytes[0] == 1 indicates Little-Endian."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int val = 0xAA;\n    unsigned char *p = (unsigned char*)&val;\n    printf(\"%u\", *p);\n    return 0;\n}",
    "options": [
      "170",
      "0",
      "Hata",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C standardında char* ve unsigned char* strict aliasing kuralından muaftır ve ham bellek baytlarını incelemek için kullanılabilir. 0xAA = 170.",
      "en": "Character pointers are explicitly exempt from strict aliasing rules. 0xAA equals decimal 170."
    }
  },
  {
    "topic": "structs",
    "code": "#include <stdio.h>\n\nstruct Empty {};\n\nint main() {\n    printf(\"%d\", (int)sizeof(struct Empty) >= 0);\n    return 0;\n}",
    "options": [
      "1 (Standart C'de boş struct yasaktır, uzantı olarak 0 veya 1)",
      "0",
      "Her derleyicide hata",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "ISO C standardında boş struct yasaktır (constraint violation). Ancak GCC ve Clang bunu uzantı olarak kabul eder (sizeof 0 verirken C++'ta 1 verir). Karşılaştırma >= 0 her zaman doğrudur.",
      "en": "Empty structs are constraint violations in ISO C, but supported as compiler extensions (GCC yields sizeof 0, C++ yields 1). >= 0 evaluates to 1."
    }
  },
  {
    "topic": "strings",
    "code": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = \"ArenaC\\0Python\";\n    printf(\"%lu %lu\", strlen(str), sizeof(str));\n    return 0;\n}",
    "options": [
      "6 14",
      "6 6",
      "12 14",
      "14 14"
    ],
    "answer": 0,
    "explanation": {
      "tr": "strlen() ilk '\\0' karakterine kadar sayar (6). sizeof() ise tüm dizi baytlarını ('ArenaC\\0Python\\0' = 14) verir. Çıktı: 6 14.",
      "en": "strlen stops at the embedded '\\0' (6). sizeof measures the full initialized array length including the trailing null (14). Output: 6 14."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[2][2] = {{1, 2}, {3, 4}};\n    int *p = (int*)arr;\n    printf(\"%d\", *(p + 3));\n    return 0;\n}",
    "options": [
      "4",
      "3",
      "2",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C'de çok boyutlu diziler bellekte satır öncelikli (row-major) olarak bitişik saklanır. (int*)arr diziyi düz bir bellek bloğu olarak görür: index 3 arr[1][1] = 4'tür.",
      "en": "Multi-dimensional arrays are stored contiguously in row-major order. Pointer offset +3 reaches arr[1][1] = 4."
    }
  },
  {
    "topic": "structs",
    "code": "#include <stdio.h>\n\nstruct A {\n    char c;\n    double d;\n};\n\nint main() {\n    printf(\"%lu\", sizeof(struct A));\n    return 0;\n}",
    "options": [
      "16 (veya hizalamaya göre 9'dan büyük)",
      "9",
      "8",
      "12"
    ],
    "answer": 0,
    "explanation": {
      "tr": "double üyesi genellikle 8 baytlık hizalama gerektirir. 1 baytlık char'dan sonra 7 bayt dolgu (padding) eklenir: 1 + 7 + 8 = 16 bayt.",
      "en": "double typically requires 8-byte alignment. 7 padding bytes are placed after char 'c', yielding 16 bytes."
    }
  },
  {
    "topic": "memory",
    "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *p = (int*)malloc(sizeof(int));\n    *p = 10;\n    p = (int*)malloc(sizeof(int));\n    *p = 20;\n    printf(\"%d (bellek sızıntısı ile)\", *p);\n    free(p);\n    return 0;\n}",
    "options": [
      "20 (bellek sızıntısı ile)",
      "10",
      "Çökme",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "p işaretçisine yeni malloc adresi atanmadan önce eski bellek bloğu free() edilmemiştir. Eski 10 değeri bellekte kaybolur (memory leak). Yeni bellek 20 değerini basar.",
      "en": "Reassigning pointer p without freeing the first allocation causes a memory leak. *p prints 20."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    char *c[] = {\"ENTER\", \"NEW\", \"POINT\", \"FIRST\"};\n    char **cp[] = {c + 3, c + 2, c + 1, c};\n    char ***cpp = cp;\n    printf(\"%s\", **++cpp);\n    return 0;\n}",
    "options": [
      "POINT",
      "NEW",
      "ENTER",
      "FIRST"
    ],
    "answer": 0,
    "explanation": {
      "tr": "++cpp işaretçiyi cp[1]'e götürür. cp[1] c + 2'yi tutar (*++cpp = c + 2). İkinci dereference c[2] string'i olan \"POINT\"'i verir.",
      "en": "++cpp points to cp[1] (storing c + 2). Dereferencing twice accesses c[2], yielding \"POINT\"."
    }
  },
  {
    "topic": "preprocessor",
    "code": "#include <stdio.h>\n\n#define STR(x) #x\n#define XSTR(x) STR(x)\n#define NUM 42\n\nint main() {\n    printf(\"%s %s\", STR(NUM), XSTR(NUM));\n    return 0;\n}",
    "options": [
      "NUM 42",
      "42 42",
      "NUM NUM",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "# operatörü parametreyi doğrudan string yapar (STR(NUM) -> \"NUM\"). XSTR gibi aracı bir makro kullanıldığında ise önce parametre genişletilir (NUM -> 42), sonra string yapılır (\"42\"). Çıktı: NUM 42.",
      "en": "Direct stringizing (#) prevents macro expansion (STR(NUM) -> \"NUM\"). Two-level expansion with XSTR expands NUM to 42 first, then stringizes to \"42\". Output: NUM 42."
    }
  }
];
