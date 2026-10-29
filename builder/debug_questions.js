module.exports = {
  beginner: [
    {
      code: `int main() {
    int x = 5
    printf("%d", x);
    return 0;
}`,
      options: [
        { tr: "2. satırın sonunda noktalı virgül (;) eksik", en: "Missing semicolon (;) at the end of line 2" },
        { tr: "printf yerine print kullanılmalı", en: "Should use print instead of printf" },
        { tr: "x değişkeni başlatılmamış", en: "Variable x is not initialized" },
        { tr: "return 0 hatalı", en: "return 0 is invalid" }
      ],
      answer: 0,
      bugError: "SyntaxError",
      explanation: {
        tr: "C dilinde her deyim (statement) noktalı virgül (;) ile bitmek zorundadır. 'int x = 5' satırının sonuna ';' eklenmelidir.",
        en: "In C, every statement must terminate with a semicolon (;). A semicolon is missing after 'int x = 5'."
      }
    },
    {
      code: `int main() {
    int x = 10;
    if (x = 5) {
        printf("Bes");
    }
    return 0;
}`,
      options: [
        { tr: "if koşulunda karşılaştırma (==) yerine atama (=) kullanılmış", en: "Assignment (=) is used instead of equality comparison (==) in if condition" },
        { tr: "printf parantezleri eksik", en: "printf parentheses are missing" },
        { tr: "x tipi float olmalıydı", en: "x should be a float" },
        { tr: "Süslü parantezler gereksiz", en: "Curly braces are unnecessary" }
      ],
      answer: 0,
      bugError: "LogicalBug",
      explanation: {
        tr: "'x = 5' ifadesi x'e 5 atar ve koşul her zaman true (5) olur. Eşitlik kontrolü için '==' kullanılmalıdır: if (x == 5).",
        en: "'x = 5' assigns 5 to x and always evaluates to true. For comparison, '==' must be used: if (x == 5)."
      }
    },
    {
      code: `int main() {
    int x;
    scanf("%d", x);
    return 0;
}`,
      options: [
        { tr: "scanf fonksiyonuna x'in adresi (&x) verilmelidir", en: "scanf requires the address of x (&x)" },
        { tr: "%d yerine %s kullanılmalı", en: "Should use %s instead of %d" },
        { tr: "scanf C'de geçersizdir", en: "scanf is invalid in C" },
        { tr: "x float olarak tanımlanmalı", en: "x must be defined as float" }
      ],
      answer: 0,
      bugError: "PointerError",
      explanation: {
        tr: "scanf girdiyi yazabilmek için değişkenin bellek adresine ihtiyaç duyar. x yerine &x verilmelidir: scanf(\"%d\", &x); Aksi halde tanımsız bellek adresine yazma hatası (çökme) oluşur.",
        en: "scanf needs the memory address of the variable to store the input. It must be &x: scanf(\"%d\", &x); passing raw 'x' leads to a crash."
      }
    },
    {
      code: `int main() {
    int arr[5];
    for (int i = 0; i <= 5; i++) {
        arr[i] = i * 2;
    }
    return 0;
}`,
      options: [
        { tr: "Döngü sınırında off-by-one hatası: arr[5] sınır dışıdır", en: "Off-by-one error: arr[5] is out of bounds for an array of size 5" },
        { tr: "i değişkeni int olamaz", en: "Variable i cannot be an int" },
        { tr: "arr[i] = i * 2 geçersiz atamadır", en: "arr[i] = i * 2 is an invalid assignment" },
        { tr: "for döngüsünde noktalı virgül yanlış kullanılmış", en: "Semicolons in for loop are misplaced" }
      ],
      answer: 0,
      bugError: "OutOfBoundsError",
      explanation: {
        tr: "5 elemanlı bir dizinin geçerli indeksleri 0, 1, 2, 3, 4'tür. Koşul 'i <= 5' olduğunda arr[5] elemanına erişilir ve dizi sınırları dışına (out-of-bounds) taşılır. Doğrusu: i < 5.",
        en: "An array of size 5 has valid indices 0 to 4. Using 'i <= 5' writes to arr[5], causing an out-of-bounds memory access. It should be 'i < 5'."
      }
    },
    {
      code: `int main() {
    int total;
    total += 10;
    printf("%d", total);
    return 0;
}`,
      options: [
        { tr: "total yerel değişkeni başlatılmamış (çöp değer içerir)", en: "Local variable total is uninitialized (contains indeterminate garbage value)" },
        { tr: "+= operatörü C'de yoktur", en: "+= operator does not exist in C" },
        { tr: "total global olmalıydı", en: "total must be global" },
        { tr: "printf formatı yanlış", en: "printf format is incorrect" }
      ],
      answer: 0,
      bugError: "UninitializedVariable",
      explanation: {
        tr: "C dilinde yerel (otomatik) değişkenler otomatik olarak sıfırlanmaz, bellekteki rastgele çöp değeri (garbage value) taşır. 'int total = 0;' şeklinde başlatılmalıdır.",
        en: "Local automatic variables in C are not zero-initialized by default; they contain garbage. It must be initialized with 'int total = 0;'."
      }
    },
    {
      code: `int main() {
    printf("Merhaba Dunya);
    return 0;
}`,
      options: [
        { tr: "String sabitinin kapanış çift tırnağı (\") eksik", en: "Missing closing double quote (\") for the string literal" },
        { tr: "printf küçük harfle yazılamaz", en: "printf cannot be lowercase" },
        { tr: "Noktalı virgül eksik", en: "Semicolon is missing" },
        { tr: "main parametre almalıdır", en: "main must take arguments" }
      ],
      answer: 0,
      bugError: "SyntaxError",
      explanation: {
        tr: "String sabiti açılan çift tırnak ile aynı satırda kapatılmalıdır. Doğrusu: printf(\"Merhaba Dunya\");",
        en: "String literals must be closed with a double quote. Correct form: printf(\"Merhaba Dunya\");"
      }
    },
    {
      code: `int main() {
    int a = 10, b = 0;
    int c = a / b;
    printf("%d", c);
    return 0;
}`,
      options: [
        { tr: "Sıfıra bölme hatası (Division by zero)", en: "Division by zero runtime error" },
        { tr: "c tanımlanırken int kullanılamaz", en: "c cannot be declared as int" },
        { tr: "a ve b aynı satırda tanımlanamaz", en: "a and b cannot be declared on the same line" },
        { tr: "printf %d kabul etmez", en: "printf does not accept %d" }
      ],
      answer: 0,
      bugError: "ArithmeticError",
      explanation: {
        tr: "C dilinde tamsayıyı sıfıra bölmek tanımsız davranıştır ve çalışma anında programın çökmesine (Floating Point Exception / SIGFPE) neden olur.",
        en: "Division by zero on integers is Undefined Behavior in C and triggers a runtime crash (SIGFPE)."
      }
    },
    {
      code: `int main() {
    char ch = "A";
    printf("%c", ch);
    return 0;
}`,
      options: [
        { tr: "Karakter sabitleri için tek tırnak ('A') kullanılmalıdır", en: "Character literals require single quotes ('A')" },
        { tr: "ch değişkeni char değil string olmalı", en: "ch must be string not char" },
        { tr: "%c yerine %d yazılmalı", en: "Should use %d instead of %c" },
        { tr: "printf çalışmaz", en: "printf will not work" }
      ],
      answer: 0,
      bugError: "TypeError",
      explanation: {
        tr: "\"A\" çift tırnak içinde bir string sabitidir (const char*) ve char değişkenine doğrudan atanamaz. Tek bir karakter için tek tırnak kullanılmalıdır: char ch = 'A';",
        en: "\"A\" is a string literal (const char*) and cannot be directly assigned to a char variable. Single quotes represent a single char: char ch = 'A';"
      }
    },
    {
      code: `int main() {
    int i = 0;
    while (i < 5) {
        printf("%d", i);
    }
    return 0;
}`,
      options: [
        { tr: "Döngü sayacı (i) artırılmadığı için sonsuz döngü oluşur", en: "Loop counter (i) is never incremented, causing an infinite loop" },
        { tr: "while yerine for kullanılmalı", en: "Must use for instead of while" },
        { tr: "i < 5 yanlış bir koşuldur", en: "i < 5 is an invalid condition" },
        { tr: "Döngü gövdesi boştur", en: "Loop body is empty" }
      ],
      answer: 0,
      bugError: "InfiniteLoop",
      explanation: {
        tr: "Döngü gövdesinde i değeri hiç değiştirilmediği için i her zaman 0 kalır ve (i < 5) koşulu sonsuza kadar true olur. Gövdeye 'i++;' eklenmelidir.",
        en: "The loop variable i is never modified inside the body, so i remains 0 forever, producing an infinite loop. An increment like 'i++;' is required."
      }
    },
    {
      code: `int main() {
    float pi = 3.14;
    printf("%d", pi);
    return 0;
}`,
      options: [
        { tr: "float değişken için %d yerine %f format belirteci kullanılmalıdır", en: "float variables require %f format specifier instead of %d" },
        { tr: "pi float olarak tanımlanamaz", en: "pi cannot be defined as float" },
        { tr: "3.14 geçerli bir sayı değildir", en: "3.14 is not a valid number" },
        { tr: "printf float yazdıramaz", en: "printf cannot print floats" }
      ],
      answer: 0,
      bugError: "FormatMismatch",
      explanation: {
        tr: "%d tamsayı (int) beklerken float verilmesi bellek temsilinin yanlış yorumlanmasına ve anlamsız/çöp bir değer basılmasına yol açar. Doğrusu: printf(\"%f\", pi);",
        en: "%d expects an int. Passing a float causes printf to misinterpret the bits passed on the stack/registers, producing garbage. Use %f for floats."
      }
    }
  ],
  intermediate: [
    {
      code: `int main() {
    int val = 2;
    switch (val) {
        case 1: printf("Bir ");
        case 2: printf("Iki ");
        case 3: printf("Uc ");
    }
    return 0;
}`,
      options: [
        { tr: "case bloklarının sonunda 'break;' eksik (istenmeyen fall-through)", en: "Missing 'break;' at the end of case blocks (unintended fall-through)" },
        { tr: "switch sadece char alabilir", en: "switch can only accept char" },
        { tr: "case 2 yerine default yazılmalıydı", en: "Should have used default instead of case 2" },
        { tr: "val int olamaz", en: "val cannot be an int" }
      ],
      answer: 0,
      bugError: "MissingBreak",
      explanation: {
        tr: "C'de case sonuna 'break;' konulmazsa sonraki case'ler de çalışır (fall-through). val=2 olduğunda sadece 'Iki' değil, 'Iki Uc ' yazdırılır.",
        en: "Without 'break;' statements, control falls through into subsequent cases. For val=2, it mistakenly prints 'Iki Uc ' instead of just 'Iki '."
      }
    },
    {
      code: `int* getNumber() {
    int num = 42;
    return &num;
}

int main() {
    int *p = getNumber();
    printf("%d", *p);
    return 0;
}`,
      options: [
        { tr: "Yerel yığın (stack) değişkeninin adresi döndürülüyor (Dangling Pointer)", en: "Returning address of a local stack variable (Dangling Pointer)" },
        { tr: "getNumber int dönmeliydi", en: "getNumber should return int" },
        { tr: "*p dereference edilemez", en: "*p cannot be dereferenced" },
        { tr: "num static olamaz", en: "num cannot be static" }
      ],
      answer: 0,
      bugError: "DanglingPointer",
      explanation: {
        tr: "num yerel bir değişkendir ve getNumber() fonksiyonu sonlandığında bellekteki ömrü biter. Bu geçersiz adresi main içinde dereference etmek (*p) Tanımsız Davranıştır (çöp değer veya çökme). Çözüm: Değişkeni static yapmak veya malloc ile ayırmaktır.",
        en: "Variable num is allocated on the stack and is destroyed when getNumber() returns. Dereferencing this pointer in main is Undefined Behavior."
      }
    },
    {
      code: `int main() {
    char s[5] = "Arena";
    printf("%s", s);
    return 0;
}`,
      options: [
        { tr: "Dizi boyutu null sonlandırıcı ('\\0') için yetersiz (en az 6 olmalı)", en: "Array size is insufficient for the null terminator ('\\0') (needs at least 6)" },
        { tr: "char dizisi çift tırnakla başlatılamaz", en: "char array cannot be initialized with double quotes" },
        { tr: "printf %s yerine %c bekler", en: "printf expects %c instead of %s" },
        { tr: "Arena 5 harfli olduğu için s[5] tam yeterlidir", en: "Arena is 5 letters so s[5] is sufficient" }
      ],
      answer: 0,
      bugError: "BufferOverflow",
      explanation: {
        tr: "\"Arena\" 5 karakterdir ancak C string'leri null ('\\0') ile sonlanmalıdır. s[5] tanımlandığında '\\0' sığmaz ve s bir geçerli C string'i olmaz. %s ile yazdırılırken sınır dışına taşarak çökmeye neden olur.",
        en: "\"Arena\" has 5 characters plus 1 byte for '\\0', requiring at least 6 bytes. s[5] leaves no room for '\\0', so printf with %s reads past the array."
      }
    },
    {
      code: `#define MULT(a, b) a * b

int main() {
    int res = MULT(2 + 3, 4);
    printf("%d", res);
    return 0;
}`,
      options: [
        { tr: "Makro argümanları paranteze alınmamış (öncelik hatası: 2 + 3 * 4 = 14)", en: "Macro arguments lack parentheses (precedence bug: expands to 2 + 3 * 4 = 14)" },
        { tr: "MULT fonksiyon olarak tanımlanmalı", en: "MULT must be defined as a function" },
        { tr: "Makroda noktalı virgül olmalı", en: "Macro needs a semicolon" },
        { tr: "#define C'de geçersizdir", en: "#define is invalid in C" }
      ],
      answer: 0,
      bugError: "MacroPrecedenceBug",
      explanation: {
        tr: "Makro metin olarak '2 + 3 * 4' şeklinde açılır ve çarpma önce yapılarak 14 üretir. Beklenen (2 + 3) * 4 = 20 için makro '#define MULT(a, b) ((a) * (b))' olarak yazılmalıdır.",
        en: "The macro expands textually to 2 + 3 * 4 = 14. To ensure correct precedence, parameters and body must be enclosed in parentheses: ((a) * (b))."
      }
    },
    {
      code: `void printLength(int arr[]) {
    int len = sizeof(arr) / sizeof(arr[0]);
    printf("%d", len);
}

int main() {
    int data[10];
    printLength(data);
    return 0;
}`,
      options: [
        { tr: "Dizi fonksiyona aktarıldığında pointer'a indirgenir (sizeof(arr) dizi boyutunu vermez)", en: "Arrays decay to pointers when passed to functions (sizeof(arr) gives pointer size)" },
        { tr: "sizeof dizilerde kullanılamaz", en: "sizeof cannot be used on arrays" },
        { tr: "data[10] başlatılmalıdır", en: "data[10] must be initialized" },
        { tr: "printLength void dönemez", en: "printLength cannot return void" }
      ],
      answer: 0,
      bugError: "ArrayDecayBug",
      explanation: {
        tr: "C'de fonksiyon parametresi olan 'int arr[]' gerçekte 'int *arr' işaretçisidir. sizeof(arr) dizinin değil pointer'ın boyutunu (4 veya 8 bayt) verir. Dizi uzunluğu fonksiyona ayrı bir parametre olarak geçilmelidir.",
        en: "In C, array parameters decay into pointers. Inside the function, sizeof(arr) yields the pointer size (4 or 8 bytes), not the total array size."
      }
    },
    {
      code: `#include <stdlib.h>

int main() {
    int x = 10;
    free(&x);
    return 0;
}`,
      options: [
        { tr: "free() yalnızca dinamik (malloc vb.) belleği serbest bırakabilir, stack adresinde tanımsızdır", en: "free() must only be called on dynamic memory (malloc/calloc), not stack addresses" },
        { tr: "free(&x) yerine delete x yazılmalı", en: "Should use delete x instead of free(&x)" },
        { tr: "x serbest bırakıldıktan sonra tekrar tanımlanmalı", en: "x must be re-declared after freeing" },
        { tr: "Kod tamamen doğrudur", en: "The code is completely correct" }
      ],
      answer: 0,
      bugError: "InvalidFree",
      explanation: {
        tr: "&x yerel (stack) bir değişkendir. free() fonksiyonuna yalnızca malloc/calloc/realloc ile heap'ten tahsis edilmiş adresler verilmelidir. Stack adresini free etmek anında çökmeye yol açar.",
        en: "&x is a stack address. free() must only be called with pointers returned by malloc, calloc, or realloc. Passing a stack pointer causes an abort/crash."
      }
    },
    {
      code: `#include <string.h>

int main() {
    char *dest;
    strcpy(dest, "ArenaC");
    return 0;
}`,
      options: [
        { tr: "dest işaretçisi başlatılmamış / bellek tahsis edilmemiş (Wild Pointer)", en: "dest pointer is uninitialized / no memory allocated (Wild Pointer dereference)" },
        { tr: "strcpy C'de yoktur", en: "strcpy does not exist in C" },
        { tr: "dest char[] olmalıydı", en: "dest should be char[]" },
        { tr: "ArenaC 6 karakterden uzundur", en: "ArenaC has more than 6 characters" }
      ],
      answer: 0,
      bugError: "UninitializedPointer",
      explanation: {
        tr: "dest başlatılmamış bir işaretçidir (wild pointer) ve rastgele bir bellek adresini gösterir. strcpy bu tanımsız adrese yazmaya çalıştığında Segmentation Fault oluşur. Önce bellek ayrılmalıdır (ör. char dest[20]; veya malloc).",
        en: "dest is an uninitialized wild pointer. Attempting to copy into it writes to an arbitrary memory address, causing a crash. Memory must be allocated first."
      }
    },
    {
      code: `int main() {
    char s[] = {'H', 'e', 'l', 'l', 'o'};
    printf("%s", s);
    return 0;
}`,
      options: [
        { tr: "Dizide null sonlandırıcı ('\\0') eksik olduğu için %s bellek dışına taşar", en: "Missing null terminator ('\\0'), causing %s to read beyond array bounds" },
        { tr: "Karakter dizisi tek tırnakla tanımlanamaz", en: "Character arrays cannot be initialized with single quotes" },
        { tr: "Hello 5 harflidir, hata yoktur", en: "Hello has 5 characters, there is no error" },
        { tr: "printf yerine puts kullanılmalı", en: "Should use puts instead of printf" }
      ],
      answer: 0,
      bugError: "MissingNullTerminator",
      explanation: {
        tr: "Karakter dizisi küme parantezleri ile oluşturulurken son eleman olarak '\\0' eklenmezse C standardına göre geçerli bir string sayılmaz. printf('%s') bellekte rastgele bir 0 görene kadar okumaya devam eder (buffer overread).",
        en: "When initialized element-by-element without '\\0', the array is not a valid null-terminated string. printf %s continues reading memory until it hits a zero byte."
      }
    },
    {
      code: `int main() {
    int arr[3] = {1, 2, 3};
    arr = arr + 1;
    return 0;
}`,
      options: [
        { tr: "Dizi adı sabit bir adrestir (l-value değildir), üzerine atama yapılamaz", en: "Array names are not modifiable l-values; you cannot reassign to an array name" },
        { tr: "arr + 1 sözdizimi yanlıştır", en: "arr + 1 syntax is invalid" },
        { tr: "arr[3] 4 elemanlı olmalıydı", en: "arr[3] should have 4 elements" },
        { tr: "int yerine pointer kullanılmalı", en: "Should use pointer instead of int" }
      ],
      answer: 0,
      bugError: "NonModifiableLvalue",
      explanation: {
        tr: "Dizi isimleri (arr) derleme zamanında sabit bellek adresleridir ve değiştirilebilir l-value (modifiable l-value) değildirler. 'arr = ...' derleme hatası verir. İlerletmek için ayrı bir pointer kullanılmalıdır: int *p = arr; p++;",
        en: "Array names evaluate to constant pointer values and are not modifiable l-values. You cannot assign to 'arr'. Use a separate pointer: int *p = arr; p++;"
      }
    },
    {
      code: `int main() {
    int x = 5;
    if (x == 5); {
        printf("Bes");
    }
    return 0;
}`,
      options: [
        { tr: "if koşulunun sonundaki gereksiz noktalı virgül (;) koşul gövdesini boşaltır", en: "Unintended semicolon (;) after if condition creates an empty statement" },
        { tr: "printf format belirteci içermelidir", en: "printf must contain a format specifier" },
        { tr: "x == 5 sözdizimi yanlıştır", en: "x == 5 syntax is invalid" },
        { tr: "Hata yoktur", en: "There is no bug" }
      ],
      answer: 0,
      bugError: "StraySemicolon",
      explanation: {
        tr: "if (x == 5); satırındaki noktalı virgül if deyimini hemen sonlandırır. Ardından gelen süslü parantezli blok ({ printf(\"Bes\"); }) if'ten bağımsız sıradan bir blok haline gelir ve koşul ne olursa olsun her zaman çalışır.",
        en: "The semicolon right after the if header terminates the if statement with an empty body. The subsequent block always executes regardless of the condition."
      }
    }
  ],
  advanced: [
    {
      code: `#include <stdlib.h>

int main() {
    int *p = (int*)malloc(sizeof(int));
    free(p);
    free(p);
    return 0;
}`,
      options: [
        { tr: "Aynı bellek adresinin iki kez serbest bırakılması (Double Free)", en: "Double free bug: freeing the same memory address twice" },
        { tr: "malloc dönüş tipi cast edilmemelidir", en: "malloc return should not be cast" },
        { tr: "free NULL alamaz", en: "free cannot take NULL" },
        { tr: "sizeof(int) yerine 4 yazılmalı", en: "Should use 4 instead of sizeof(int)" }
      ],
      answer: 0,
      bugError: "DoubleFree",
      explanation: {
        tr: "Bir bellek bloğu serbest bırakıldıktan sonra tekrar free() edilirse bellek yöneticisi bozulur (heap corruption) ve program anında çöker. Bu ciddi bir güvenlik açığıdır (CWE-415).",
        en: "Calling free() twice on the same memory chunk corrupts the allocator heap state and causes crashes or security vulnerabilities (Double Free, CWE-415)."
      }
    },
    {
      code: `#include <stdlib.h>

int main() {
    int *p = (int*)malloc(sizeof(int));
    *p = 10;
    free(p);
    *p = 20;
    return 0;
}`,
      options: [
        { tr: "Serbest bırakılan belleğe erişim ve yazma (Use-After-Free)", en: "Writing to freed memory (Use-After-Free)" },
        { tr: "p NULL yapılmamış", en: "p is not set to NULL" },
        { tr: "*p = 10 satırı gereksizdir", en: "*p = 10 is redundant" },
        { tr: "malloc bellek ayıramamıştır", en: "malloc failed to allocate" }
      ],
      answer: 0,
      bugError: "UseAfterFree",
      explanation: {
        tr: "free(p) yapıldıktan sonra işaret edilen bellek geçersizdir. Bu adrese yazmak (*p = 20) Tanımsız Davranıştır ve Use-After-Free açığı oluşturur.",
        en: "After calling free(p), the memory is released back to the heap. Dereferencing it (*p = 20) is an undefined Use-After-Free bug."
      }
    },
    {
      code: `int main() {
    for (unsigned int i = 5; i >= 0; i--) {
        printf("%u ", i);
    }
    return 0;
}`,
      options: [
        { tr: "İşaretsiz sayı (unsigned) asla negatif olamayacağı için döngü sonsuzdur", en: "Unsigned integers can never be negative (i >= 0 is always true), causing an infinite loop" },
        { tr: "i-- yerine --i kullanılmalı", en: "Must use --i instead of i--" },
        { tr: "%u yerine %d kullanılmalı", en: "Must use %d instead of %u" },
        { tr: "5'ten geriye sayılamaz", en: "Cannot count down from 5" }
      ],
      answer: 0,
      bugError: "UnsignedUnderflowLoop",
      explanation: {
        tr: "unsigned int türü 0'ın altına indiğinde negatif olmak yerine UINT_MAX (ör. 4,294,967,295) değerine taşar. Bu nedenle 'i >= 0' koşulu DAİMA doğrudur ve sonsuz döngü oluşur.",
        en: "Unsigned types wrap around to UINT_MAX on underflow, so 'i >= 0' is unconditionally true, creating an infinite loop."
      }
    },
    {
      code: `int main() {
    char *str = "ArenaC";
    str[0] = 'a';
    return 0;
}`,
      options: [
        { tr: "Salt okunur (read-only) alandaki string sabitini değiştirmeye çalışma hatası", en: "Attempting to modify a string literal stored in read-only memory" },
        { tr: "str pointer değil dizi olmalı", en: "str must be array not pointer" },
        { tr: "Tek tırnak yerine çift tırnak olmalı", en: "Should use double quotes instead of single quote" },
        { tr: "Hata yoktur", en: "There is no error" }
      ],
      answer: 0,
      bugError: "StringLiteralMutation",
      explanation: {
        tr: "\"ArenaC\" string sabiti işletim sisteminde salt okunur (read-only text/data) segmentte saklanır. Üzerine yazmaya çalışmak (str[0] = 'a') Segmentation Fault ile programı sonlandırır. Değiştirilebilir string için 'char str[] = \"ArenaC\";' kullanılmalıdır.",
        en: "String literals reside in read-only memory. Writing to them triggers a Segmentation Fault. Use a mutable array instead: char str[] = \"ArenaC\";"
      }
    },
    {
      code: `#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main() {
    int i = 5, j = 2;
    int m = MAX(i++, j);
    return 0;
}`,
      options: [
        { tr: "Makroda yan etkili argüman (i++) iki kez çalıştırılır (Double Evaluation)", en: "Side-effecting argument (i++) is evaluated twice in macro (Double Evaluation bug)" },
        { tr: "MAX makrosu C99'da yasaktır", en: "MAX macro is illegal in C99" },
        { tr: "m int olamaz", en: "m cannot be int" },
        { tr: "Hata yoktur", en: "There is no error" }
      ],
      answer: 0,
      bugError: "MacroDoubleEvaluation",
      explanation: {
        tr: "Makro açılımında 'i++' hem karşılaştırma kısmında hem de doğru olan kolunda yer alır. i 5 iken 5 > 2 doğru olur (i 6 olur), ardından i++ bir kez daha çalışır ve i 7 olur. Argüman beklenmedik şekilde 2 kez artırılmış olur.",
        en: "The macro expands with i++ in both the condition and the selected branch, causing i to be incremented twice unexpectedly."
      }
    },
    {
      code: `#include <stdlib.h>

int main() {
    int *p = (int*)malloc(10 * sizeof(int));
    p = (int*)realloc(p, 100 * sizeof(int));
    return 0;
}`,
      options: [
        { tr: "realloc başarısız olursa (NULL dönerse) eski bellek adresi kaybedilir (Memory Leak)", en: "If realloc fails and returns NULL, original pointer is overwritten, leaking memory" },
        { tr: "realloc boyutu küçültemez", en: "realloc cannot shrink memory" },
        { tr: "malloc ve realloc birlikte kullanılamaz", en: "malloc and realloc cannot be used together" },
        { tr: "p serbest bırakılamaz", en: "p cannot be freed" }
      ],
      answer: 0,
      bugError: "ReallocMemoryLeak",
      explanation: {
        tr: "realloc başarısız olduğunda NULL döner ancak eski bellek bloğu serbest bırakılmaz. Doğrudan 'p = realloc(p, ...)' yazılırsa p NULL olur ve orijinal bellek adresine erişim kaybedilerek sızıntı (leak) oluşur. Geçici bir işaretçi kullanılmalıdır: 'int *temp = realloc(p, ...);'.",
        en: "If realloc fails, it returns NULL without freeing the original buffer. Overwriting 'p' with NULL directly loses the handle to the original allocation, creating a memory leak."
      }
    },
    {
      code: `#include <string.h>

int main() {
    char buf[5];
    strcpy(buf, "ArenaC-2026");
    return 0;
}`,
      options: [
        { tr: "Hedef tampon (buf) kaynak string'den küçük olduğu için yığın taşması (Buffer Overflow)", en: "Destination buffer (buf) is smaller than source string, causing a Stack Buffer Overflow" },
        { tr: "strcpy yerine strcmp kullanılmalı", en: "Should use strcmp instead of strcpy" },
        { tr: "buf dinamik olmalı", en: "buf must be dynamic" },
        { tr: "Hata yoktur", en: "There is no bug" }
      ],
      answer: 0,
      bugError: "BufferOverflow",
      explanation: {
        tr: "\"ArenaC-2026\" 12 bayttır ancak buf sadece 5 bayt yer tutar. strcpy sınır kontrolü yapmadığı için stack belleğindeki diğer verilerin üzerine yazar (Buffer Overflow - CWE-120).",
        en: "strcpy does not check destination buffer bounds. Copying 12 bytes into a 5-byte buffer overwrites adjacent stack memory, causing a classic buffer overflow."
      }
    },
    {
      code: `int main() {
    int i = 5;
    int a = i++ + i++;
    return 0;
}`,
      options: [
        { tr: "Aynı ifadede sequence point olmadan değişkenin iki kez değiştirilmesi (Tanımsız Davranış)", en: "Modifying a variable twice without an intervening sequence point (Undefined Behavior)" },
        { tr: "a int olarak tanımlanamaz", en: "a cannot be defined as int" },
        { tr: "i++ yerine ++i kullanılmalıydı", en: "Should have used ++i instead of i++" },
        { tr: "C'de toplama işlemi yapılamaz", en: "Addition cannot be performed in C" }
      ],
      answer: 0,
      bugError: "SequencePointViolation",
      explanation: {
        tr: "+ operatörü bir sequence point sağlamaz. Aynı değişkenin ardışık olarak sıralanmamış şekilde değiştirilmesi (unsequenced modification) C standartlarına göre tanımsız davranıştır (UB).",
        en: "Binary + does not introduce a sequence point. Multiple unsequenced modifications to the same scalar variable within an expression is Undefined Behavior."
      }
    },
    {
      code: `#include <stdlib.h>

int main() {
    int *p = (int*)malloc(5 * sizeof(int));
    p++;
    free(p);
    return 0;
}`,
      options: [
        { tr: "malloc'un döndürdüğü başlangıç adresi değil, kaydırılmış adres free edilmeye çalışılıyor", en: "Attempting to free an offset pointer instead of the original address returned by malloc" },
        { tr: "p++ pointer ilerletemez", en: "p++ cannot advance a pointer" },
        { tr: "free sadece dizi adını alır", en: "free only takes array names" },
        { tr: "5 * sizeof(int) geçersizdir", en: "5 * sizeof(int) is invalid" }
      ],
      answer: 0,
      bugError: "InvalidPointerFree",
      explanation: {
        tr: "free() fonksiyonuna yalnızca malloc/calloc tarafından döndürülen tam başlangıç adresi verilmelidir. p++ ile adresi kaydırdıktan sonra free(p) çağırmak heap yöneticisini bozar ve çökme üretir.",
        en: "free() requires the exact pointer returned by the allocator. Freeing an offset pointer (p++) causes heap corruption and program crash."
      }
    },
    {
      code: `struct Student {
    int id;
};

int main() {
    struct Student s = {101};
    struct Student *ptr = &s;
    printf("%d", ptr.id);
    return 0;
}`,
      options: [
        { tr: "İşaretçi üzerinden üye erişimi için nokta (.) değil ok (->) operatörü kullanılmalıdır", en: "Accessing struct members via pointer requires arrow operator (->), not dot (.)" },
        { tr: "s struct olarak başlatılamaz", en: "s cannot be initialized as struct" },
        { tr: "id alanı int olamaz", en: "id field cannot be int" },
        { tr: "ptr adresi yanlıştır", en: "ptr address is invalid" }
      ],
      answer: 0,
      bugError: "SyntaxError",
      explanation: {
        tr: "ptr bir işaretçidir. İşaretçilerde üye erişimi için 'ptr->id' veya '(*ptr).id' sözdizimi kullanılmalıdır. 'ptr.id' derleme hatası verir.",
        en: "ptr is a pointer to a struct. Accessing its member requires the arrow operator 'ptr->id' or '(*ptr).id'. Using 'ptr.id' is a syntax error."
      }
    }
  ],
  expert: [
    {
      code: `int main() {
    int a[5] = {1, 2, 3, 4, 5};
    int i = 0;
    a[i] = i++;
    return 0;
}`,
      options: [
        { tr: "Atama operatörünün iki tarafında i'nin sıralanmamış değerlendirilmesi (Tanımsız Davranış)", en: "Unsequenced evaluation and side-effect on 'i' across assignment (Undefined Behavior)" },
        { tr: "a[i] diziye atama yapamaz", en: "a[i] cannot assign to array" },
        { tr: "i++ geçersizdir", en: "i++ is invalid" },
        { tr: "Hata yoktur", en: "There is no bug" }
      ],
      answer: 0,
      bugError: "UnsequencedAssignment",
      explanation: {
        tr: "C standartlarına göre (C11 §6.5) atama operatörünün sol tarafındaki adresin tespiti ile sağ tarafındaki değerin hesaplanması arasında sequence point yoktur. a[i]'deki i'nin mi yoksa i++'ın mı önce hesaplanacağı tanımsızdır (UB).",
        en: "There is no sequence point between evaluating the left-hand operand's address and the right-hand operand's side effects in simple assignment, causing Undefined Behavior."
      }
    },
    {
      code: `#include <stdio.h>

int main() {
    const int val = 100;
    int *p = (int*)&val;
    *p = 200;
    printf("%d", val);
    return 0;
}`,
      options: [
        { tr: "Aslen const olarak tanımlanmış bir nesneyi pointer cast ile değiştirmek Tanımsız Davranıştır", en: "Mutating an object originally defined as const via pointer cast is Undefined Behavior" },
        { tr: "val const olarak tanımlanamaz", en: "val cannot be declared const" },
        { tr: "(int*) cast işlemi C'de yasaktır", en: "(int*) cast is illegal in C" },
        { tr: "printf %d kabul etmez", en: "printf does not accept %d" }
      ],
      answer: 0,
      bugError: "ConstModificationUB",
      explanation: {
        tr: "Bir nesne orijinal olarak 'const' nitelemesiyle tanımlanmışsa, bu nesneyi işaretçi cast işlemiyle değiştirmeye çalışmak C standardına göre açıkça Tanımsız Davranıştır (derleyici sabiti optimize edebilir veya salt okunur belleğe koyabilir).",
        en: "Modifying an object originally defined with a const-qualified type through a non-const pointer is explicitly Undefined Behavior in the C standard."
      }
    },
    {
      code: `int main() {
    unsigned int x = 1;
    unsigned int y = x << 32;
    return 0;
}`,
      options: [
        { tr: "Türün bit genişliğine eşit veya daha büyük kaydırma yapmak Tanımsız Davranıştır", en: "Shifting by an amount equal to or greater than the operand bit-width is Undefined Behavior" },
        { tr: "x << 32 geçerli bir 0 sonucudur", en: "x << 32 is a valid 0 result" },
        { tr: "unsigned int kaydırılamaz", en: "unsigned int cannot be shifted" },
        { tr: "Hata yoktur", en: "There is no bug" }
      ],
      answer: 0,
      bugError: "InvalidBitShiftUB",
      explanation: {
        tr: "C standardına göre bir tamsayıyı kendi bit genişliği (örneğin 32-bit int için 32) kadar veya daha fazla kaydırmak Tanımsız Davranıştır (UB). x86 işlemciler kaydırma miktarını modulo 32 alabilir (x << 0 gibi çalışabilir).",
        en: "In C, shifting by a count equal to or greater than the bit-width of the operand is Undefined Behavior. Hardware often masks the shift amount modulo 32."
      }
    },
    {
      code: `int main() {
    float f = 5.5f;
    int *p = (int*)&f;
    printf("%d", *p);
    return 0;
}`,
      options: [
        { tr: "Uyumsuz işaretçi dönüşümü ve dereference (Strict Aliasing Rule ihlali)", en: "Strict Aliasing Rule violation: incompatible pointer dereference" },
        { tr: "float C'de int'e cast edilemez", en: "float cannot be cast to int in C" },
        { tr: "p NULL olmalıdır", en: "p must be NULL" },
        { tr: "f geçerli bir float değildir", en: "f is not a valid float" }
      ],
      answer: 0,
      bugError: "StrictAliasingViolation",
      explanation: {
        tr: "C standardının Katı Örtüşme Kuralı (Strict Aliasing Rule) gereğince bir float nesnesine int* üzerinden erişilemez. Bu kuralın ihlali tanımsız davranıştır ve derleyici optimizasyonlarında kodun bozulmasına yol açar. Güvenli bayt kopyası için memcpy() kullanılmalıdır.",
        en: "Dereferencing a float through an int* violates the Strict Aliasing Rule, which is Undefined Behavior and breaks modern compiler optimizations. Use memcpy for type punning."
      }
    },
    {
      code: `int main() {
    int arr1[3] = {1, 2, 3};
    int arr2[3] = {4, 5, 6};
    if (&arr1[0] < &arr2[0]) {
        printf("Kucuk");
    }
    return 0;
}`,
      options: [
        { tr: "Farklı bağımsız nesnelere ait işaretçilerin (<, >) ile karşılaştırılması Tanımsız Davranıştır", en: "Relational comparison (<, >) between pointers to different independent objects is Undefined Behavior" },
        { tr: "Adresler asla karşılaştırılamaz", en: "Addresses can never be compared" },
        { tr: "== kullanılmalıydı", en: "Should have used ==" },
        { tr: "Hata yoktur", en: "There is no bug" }
      ],
      answer: 0,
      bugError: "InvalidPointerComparison",
      explanation: {
        tr: "C standardına göre ilişkisel operatörler (<, <=, >, >=) yalnızca aynı dizi veya yapının elemanlarını gösteren işaretçiler arasında tanımlıdır. İki bağımsız nesnenin adreslerini karşılaştırmak Tanımsız Davranıştır.",
        en: "Relational comparisons (<, >, <=, >=) are only defined between pointers pointing into the same array object. Comparing pointers to distinct objects is Undefined Behavior."
      }
    },
    {
      code: `int is_overflow(int a, int b) {
    if (a + b < a) {
        return 1;
    }
    return 0;
}`,
      options: [
        { tr: "İşaretli taşma UB olduğu için derleyici bu kontrolü optimizasyonla silebilir", en: "Signed overflow is UB, so optimizing compilers can eliminate this check completely" },
        { tr: "a + b asla a'dan küçük olamaz", en: "a + b can never be less than a" },
        { tr: "Fonksiyon bool dönmelidir", en: "Function must return bool" },
        { tr: "Hata yoktur", en: "There is no bug" }
      ],
      answer: 0,
      bugError: "UndefinedSignedOverflowCheck",
      explanation: {
        tr: "C standardında işaretli tamsayı taşması Tanımsız Davranıştır (UB). Derleyiciler UB'nin asla gerçekleşmeyeceğini varsayarak 'a + b < a' ifadesini matematiksel olarak imkansız kabul eder ve kontrolü tamamen koddan kaldırır. Güvenli kontrol için taşma gerçekleşmeden önce kontrol yapılmalıdır.",
        en: "Signed overflow is Undefined Behavior. Optimizing compilers assume overflow never happens and legally optimize away 'a + b < a' as dead code."
      }
    },
    {
      code: `int main() {
    char *p = malloc(10);
    p = "Sabit Metin";
    free(p);
    return 0;
}`,
      options: [
        { tr: "malloc ile ayrılan adres kaybedilmiş ve string sabiti free edilmeye çalışılmıştır", en: "Allocated memory handle is leaked and code attempts to free a string literal" },
        { tr: "free() char* kabul etmez", en: "free() does not accept char*" },
        { tr: "malloc boyutu int olmalıdır", en: "malloc size must be int" },
        { tr: "Hata yoktur", en: "There is no error" }
      ],
      answer: 0,
      bugError: "LeakedHandleAndInvalidFree",
      explanation: {
        tr: "'p = \"Sabit Metin\"' ataması malloc ile ayrılan adresi ezer (memory leak). Ardından p salt okunur string sabitinin adresini gösterirken free(p) çağrılır ve program anında çöker.",
        en: "Reassigning p overwrites the malloc handle, leaking memory. Then free(p) attempts to free a string literal address, causing an immediate crash."
      }
    },
    {
      code: `#include <signal.h>

int done = 0;

void handler(int sig) {
    done = 1;
}

int main() {
    signal(SIGINT, handler);
    while (!done) {
        // bekle
    }
    return 0;
}`,
      options: [
        { tr: "done değişkeni volatile sig_atomic_t olarak tanımlanmalıdır (derleyici önbelleğe alabilir)", en: "done variable must be volatile sig_atomic_t (compiler may cache !done in a register)" },
        { tr: "signal() C'de kullanılamaz", en: "signal() cannot be used in C" },
        { tr: "handler parametre alamaz", en: "handler cannot take parameters" },
        { tr: "while gövdesi boş olamaz", en: "while body cannot be empty" }
      ],
      answer: 0,
      bugError: "MissingVolatileSignal",
      explanation: {
        tr: "Derleyici döngü gövdesinde done'ın değişmediğini görerek done değerini bir CPU yazmacına (register) önbellekleyebilir ve döngüyü 'while(1)' haline getirebilir. Sinyal işleyicilerle paylaşılan değişkenler 'volatile sig_atomic_t' olmalıdır.",
        en: "Without 'volatile', the compiler may cache 'done' in a CPU register, creating an infinite loop even if a signal modifies the variable."
      }
    },
    {
      code: `struct Header {
    int length;
    char data[];
};

int main() {
    struct Header h;
    h.data[0] = 'A';
    return 0;
}`,
      options: [
        { tr: "Esnek dizi üyesi (Flexible Array Member) içeren struct stack'te doğrudan tanımlanamaz", en: "A struct with a Flexible Array Member cannot be allocated on the stack directly" },
        { tr: "char data[] sözdizimi C'de geçersizdir", en: "char data[] syntax is illegal in C" },
        { tr: "length alanı int olamaz", en: "length field cannot be int" },
        { tr: "data üyesine ulaşılamaz", en: "data member cannot be accessed" }
      ],
      answer: 0,
      bugError: "FlexibleArrayStackAllocation",
      explanation: {
        tr: "Flexible array member (data[]) içeren yapılar için sizeof(struct Header) içinde dizi boyutu 0 sayılır. Stack'te 'struct Header h;' şeklinde tanımlandığında data için hiçbir bellek ayrılmaz ve h.data[0] sınır dışı belleğe yazar. Bu yapılar malloc ile dinamik ayrılmalıdır.",
        en: "Structs with flexible array members have 0 bytes allocated for the array on the stack. Accessing h.data[0] writes out of bounds; it must be dynamically allocated with malloc."
      }
    },
    {
      code: `int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int *p1 = &arr[0];
    int *p2 = &arr[4];
    int diff = p2 - p1;
    printf("%d", diff == 16);
    return 0;
}`,
      options: [
        { tr: "Pointer farkı bayt sayısını değil, eleman sayısını verir (diff 4'tür, 16 değil)", en: "Pointer subtraction yields element count, not byte count (diff is 4, not 16)" },
        { tr: "p2 - p1 işlemi C'de tanımsızdır", en: "p2 - p1 is undefined in C" },
        { tr: "p2 ve p1 adresleri aynıdır", en: "p2 and p1 addresses are identical" },
        { tr: "Hata yoktur", en: "There is no error" }
      ],
      answer: 0,
      bugError: "PointerArithmeticUnitBug",
      explanation: {
        tr: "C dilinde aynı diziye işaret eden iki pointer çıkarıldığında (p2 - p1), sonuç otomatik olarak sizeof(int)'e bölünerek aradaki eleman sayısı (4 - 0 = 4) olarak döndürülür. Bayt sayısı (16) değildir. Bu nedenle diff == 16 her zaman 0 (yanlış) üretir.",
        en: "Pointer subtraction yields the distance in elements (ptrdiff_t), not raw bytes. p2 - p1 evaluates to 4 (elements), so testing for 16 is a logical bug."
      }
    }
  ]
};

