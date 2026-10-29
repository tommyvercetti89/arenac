module.exports = [
  {
    "topic": "undefined_behavior",
    "code": "#include <stdio.h>\n\nint main() {\n    int a[] = {1, 2, 3, 4};\n    int *p = a;\n    printf(\"%d\", *(p++) + *(++p));\n    return 0;\n}",
    "options": [
      "Tanımsız Davranış (Undefined Behavior)",
      "4",
      "5",
      "6"
    ],
    "answer": 0,
    "explanation": {
      "tr": "+ operatörünün sol ve sağ terimleri arasında bir sequence point yoktur. p işaretçisinin aynı ifadede aralarında sıralama olmadan birden fazla kez değiştirilmesi C standardına göre Tanımsız Davranıştır.",
      "en": "There is no sequence point between the operands of addition. Modifying pointer p multiple times unsequenced is Undefined Behavior."
    }
  },
  {
    "topic": "undefined_behavior",
    "code": "#include <stdio.h>\n\nint main() {\n    int a[5] = {0};\n    int i = 1;\n    a[i] = i++;\n    printf(\"%d\", a[1]);\n    return 0;\n}",
    "options": [
      "Tanımsız Davranış (Undefined Behavior)",
      "1",
      "2",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "a[i] indeksinin hesaplanması ile i++ yan etkisi arasında bir sequence point yoktur. i hem okunup indeks olarak kullanılmakta hem de artırılmaktadır; bu C standardında unsequenced modification / UB'dir.",
      "en": "Evaluating index 'i' in a[i] and modifying 'i' with i++ are unsequenced with respect to each other, resulting in Undefined Behavior."
    }
  },
  {
    "topic": "loops",
    "code": "#include <stdio.h>\n\nint main() {\n    int count = 0;\n    int n = 5;\n    switch (n % 2) {\n        case 0: do { count++;\n        case 1:      count++;\n                } while (--n > 0);\n    }\n    printf(\"%d\", count);\n    return 0;\n}",
    "options": [
      "6",
      "5",
      "10",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Duff's Device tekniğidir: switch ve do-while iç içe geçmiştir. n=5 (5%2=1) olduğundan case 1'e atlar, count 1 artar. do-while kontrolünde --n 4 olur (>0). Sonraki turlarda gövde baştan akar (case 0 ve 1 her tur 2 artırır). Toplam: 1 + 2 + 2 + 1 = 6.",
      "en": "This is Duff's Device: interleaving a switch and do-while. The initial jump to case 1 increments count once, and subsequent loop iterations increment count twice per step, totaling 6."
    }
  },
  {
    "topic": "variables",
    "code": "#include <stdio.h>\n\nint main() {\n    // volatile anahtar kelimesi derleyici optimizasyonunu nasıl etkiler?\n    volatile int flag = 1;\n    int x = flag;\n    int y = flag;\n    printf(\"%d\", x == y);\n    return 0;\n}",
    "options": [
      "1 (ancak derleyicinin bellek okumalarını önbelleğe almasını/silmesini engeller)",
      "0",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "volatile niteleyicisi, derleyiciye bu değişkenin donanım veya başka bir thread tarafından her an değiştirilebileceğini bildirir. Derleyici okumaları CPU yazmacında önbelleğe alamaz; her seferinde gerçek bellek adresinden okumak zorundadır.",
      "en": "volatile tells the compiler that the variable may change unexpectedly (e.g. hardware/interrupts). The compiler is forbidden from caching or eliding reads from memory."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint f(int a, int b) { return a - b; }\n\nint main() {\n    int i = 1;\n    printf(\"%d\", f(i++, i++));\n    return 0;\n}",
    "options": [
      "Belirlenmemiştir (Unspecified Order of Evaluation)",
      "1",
      "-1",
      "0"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C standardında fonksiyon parametrelerinin soldan sağa mı yoksa sağdan sola mı değerlendirileceği belirlenmemiştir (unspecified order). Derleyiciye göre f(1, 2) veya f(2, 1) olabilir.",
      "en": "The evaluation order of function arguments in C is unspecified. It is up to the compiler whether arguments evaluate left-to-right or right-to-left."
    }
  },
  {
    "topic": "variables",
    "code": "#include <stdio.h>\n\nint main() {\n    char c = 200;\n    if (c == 200) {\n        printf(\"ESIT\");\n    } else {\n        printf(\"FARKLI\");\n    }\n    return 0;\n}",
    "options": [
      "Platforma / Derleyiciye bağlı (signed char ise FARKLI)",
      "Her zaman ESIT",
      "Her zaman FARKLI",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C standardında düz 'char' türünün signed mı yoksa unsigned mı olduğu platforma/derleyiciye bağlıdır (implementation-defined). x86'da varsayılan signed char'dır ve 200 taşarak -56 olur; int'e terfide -56 != 200 olduğundan FARKLI basılır.",
      "en": "Whether plain 'char' is signed or unsigned is implementation-defined. On platforms where char is signed, 200 overflows to -56, which does not equal 200 when promoted to int."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    const int a = 10;\n    int *p = (int*)&a;\n    *p = 50;\n    printf(\"%d\", a);\n    return 0;\n}",
    "options": [
      "Tanımsız Davranış (Undefined Behavior)",
      "50",
      "10",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Orijinal olarak 'const' olarak tanımlanmış bir nesnenin const niteleyicisini cast ile kaldırıp üzerine yazmak C standardında kesin olarak Tanımsız Davranıştır (UB). Nesne salt okunur bellekte olabilir.",
      "en": "Modifying an object originally defined as const by casting away its constness is Undefined Behavior in C."
    }
  },
  {
    "topic": "bitwise",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = -1;\n    // C'de negatif işaretli sayıların sağa kaydırılması:\n    printf(\"%d\", (x >> 1) == -1);\n    return 0;\n}",
    "options": [
      "Uygulamaya bağlı (Implementation-defined: genellikle aritmetik shift ile 1 döner)",
      "Her zaman 0",
      "Tanımsız Davranış",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Negatif işaretli tamsayıların sağa kaydırılması C standardında uygulamaya bağlıdır (implementation-defined). Çoğu modern derleyici aritmetik shift yaparak işaret bitini korur (-1 kalır ve 1 basar), ancak mantıksal shift yapan sistemler de geçerlidir.",
      "en": "Right-shifting a negative signed integer is implementation-defined in C. Most systems perform arithmetic shift (preserving sign bits, resulting in -1), but logical shift is also permitted."
    }
  },
  {
    "topic": "functions",
    "code": "#include <stdio.h>\n\nint f(int a, int b) { return a + b; }\n\nint main() {\n    printf(\"%d\", (***f)(2, 3));\n    return 0;\n}",
    "options": [
      "5",
      "Derleme hatası",
      "Adres",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C dilinde bir fonksiyon adı otomatik olarak işaretçiye dönüştüğü ve dereference edilen fonksiyon işaretçisi tekrar fonksiyona dönüştüğü için (***f)(2, 3) ile f(2, 3) tamamen geçerli ve eşdeğerdir: 5.",
      "en": "Function pointer dereferencing decays right back to a function pointer. Therefore (*f), (**f), and (***f) are completely equivalent to f(2, 3), yielding 5."
    }
  },
  {
    "topic": "sizeof_types",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 5;\n    // C99 VLA (Variable Length Array) ve sizeof kuralı:\n    sizeof(int[n++]);\n    printf(\"%d\", n);\n    return 0;\n}",
    "options": [
      "6 (VLA boyutu için n++ çalıştırılır)",
      "5 (sizeof yan etki üretmez)",
      "Derleme hatası",
      "Tanımsız Davranış"
    ],
    "answer": 0,
    "explanation": {
      "tr": "ISO C99 §6.5.3.4p2 maddesine göre: sizeof normalde ifadeleri derleme zamanında tip tespiti için kullanır ve yan etkilerini ÇALIŞTIRMAZ. ANCAK operand bir VLA türü ise, dizi boyutunun çalışma anında hesaplanması zorunlu olduğundan n++ ÇALIŞTIRILIR! n = 6 olur.",
      "en": "Per ISO C99 §6.5.3.4p2: sizeof is usually unevaluated, EXCEPT when the operand is a Variable Length Array (VLA). In that case, the size expression IS evaluated at runtime, incrementing n to 6."
    }
  },
  {
    "topic": "scope",
    "code": "#include <stdio.h>\n\n// Dosya kapsamında aynı değişkenin birden fazla bildirimi:\nint x;\nint x;\nint x = 10;\n\nint main() {\n    printf(\"%d\", x);\n    return 0;\n}",
    "options": [
      "10 (C'de geçerli 'tentative definition', C++'ta derleme hatası)",
      "Derleme hatası",
      "0",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C dilinde dosya kapsamındaki başlatıcısız bildirimler 'deneme bildirimi' (tentative definition) kabul edilir ve tek bir başlatıcı ile birleşebilir. C'de tamamen geçerlidir; C++'ta ise yeniden tanımlama hatasıdır.",
      "en": "In C, file-scope uninitialized declarations are 'tentative definitions' that merge with a single initializer. This is valid in C, but a redefinition error in C++."
    }
  },
  {
    "topic": "undefined_behavior",
    "code": "#include <stdio.h>\n\nint main() {\n    float f = 5.0f;\n    int *p = (int*)&f;\n    printf(\"%d\", *p != 0);\n    return 0;\n}",
    "options": [
      "Tanımsız Davranış (Strict Aliasing ihlali)",
      "1",
      "0",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "ISO C Strict Aliasing kuralına göre, bir nesnenin belleğine uyumsuz bir türün işaretçisi üzerinden erişmek (float nesnesini int* ile dereference etmek) Tanımsız Davranıştır (UB). Derleyiciler bu iki işaretçinin çakışmayacağını varsayarak kod üretir.",
      "en": "Dereferencing a float through an int* pointer violates the C Strict Aliasing Rule, which is Undefined Behavior."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 0x12345678;\n    char *p = (char*)&a;\n    printf(\"0x%x\", (unsigned char)*p);\n    return 0;\n}",
    "options": [
      "0x78 (Little-Endian) veya 0x12 (Big-Endian)",
      "0x12345678",
      "0x34",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "x86/ARM gibi Little-Endian mimarilerde en düşük anlamlı bayt (0x78) ilk adreste saklanır. Big-Endian mimarilerde ise en yüksek anlamlı bayt (0x12) saklanır. char* ile nesne temsili incelemek standartça serbesttir.",
      "en": "On little-endian systems, the least significant byte (0x78) is stored at the lowest address. Inspecting raw bytes via char* is standard-compliant."
    }
  },
  {
    "topic": "undefined_behavior",
    "code": "#include <stdio.h>\n#include <limits.h>\n\nint main() {\n    int x = INT_MIN;\n    int y = -x;\n    printf(\"%d\", y > 0);\n    return 0;\n}",
    "options": [
      "Tanımsız Davranış (İşaretli taşma)",
      "1",
      "0",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "İkiye tümleyen sistemlerde |INT_MIN| değeri INT_MAX'tan 1 fazladır. Dolayısıyla -INT_MIN pozitif int olarak temsil edilemez ve işaretli taşmaya (signed overflow) yol açar; bu da C standardında tanımsız davranıştır.",
      "en": "In two's complement, -INT_MIN exceeds INT_MAX by 1 and cannot be represented in a signed int. Negating INT_MIN causes signed overflow (Undefined Behavior)."
    }
  },
  {
    "topic": "undefined_behavior",
    "code": "#include <stdio.h>\n\nint main() {\n    int x;\n    printf(\"%d\", x == x);\n    return 0;\n}",
    "options": [
      "Tanımsız / Belirsiz (Uninitialized Variable)",
      "Her zaman 1",
      "Her zaman 0",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Başlatılmamış otomatik yerel değişkenlerin okunması tanımsız davranıştır veya belirsiz (indeterminate) değer döner; hatta bazı donanımlarda tuzak gösterimi (trap representation) tetikleyebilir.",
      "en": "Reading an uninitialized local variable yields an indeterminate value and can be Undefined Behavior (or trap representation on certain architectures)."
    }
  },
  {
    "topic": "structs",
    "code": "#include <stdio.h>\n\nstruct Packet {\n    int len;\n    char data[];\n};\n\nint main() {\n    printf(\"%d\", (int)sizeof(struct Packet) == (int)sizeof(int));\n    return 0;\n}",
    "options": [
      "1 (Esnek dizi boyuta dahil edilmez)",
      "0",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C99 Esnek Dizi Üyesi (Flexible Array Member) kuralına göre, struct sonundaki char data[] üyesi sizeof(struct Packet) hesabına katılmaz; yalnızca önceki üyelerin boyutu ve hizalaması hesaplanır: 1.",
      "en": "In C99+, the flexible array member at the end of a struct contributes zero size to sizeof(struct Packet). The comparison evaluates to 1."
    }
  },
  {
    "topic": "structs",
    "code": "#include <stdio.h>\n\nstruct S {\n    int a;\n};\n\nint main() {\n    struct S s = { .a = 1, .a = 2 };\n    printf(\"%d\", s.a);\n    return 0;\n}",
    "options": [
      "2 (Son yazılan değer geçerlidir)",
      "1",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C99 §6.7.8 maddesine göre belirlenmiş başlatıcı listesinde aynı üye birden fazla kez başlatılırsa, listenin en sonundaki başlatma geçerli olur. s.a = 2 yazdırılır.",
      "en": "Per ISO C99 §6.7.8, if a designated initializer specifies the same member multiple times, the last initialization overrides earlier ones: 2."
    }
  },
  {
    "topic": "conditions",
    "code": "#include <stdio.h>\n\nint main() {\n    double nan = 0.0 / 0.0;\n    if (nan == nan) {\n        printf(\"ESIT\");\n    } else {\n        printf(\"FARKLI\");\n    }\n    return 0;\n}",
    "options": [
      "FARKLI (NaN kendisine bile eşit değildir)",
      "ESIT",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "IEEE-754 kayan nokta standardında NaN (Not-a-Number) değeri benzersiz bir özelliğe sahiptir: Kendisi de dahil hiçbir değere eşit DEĞİLDİR (nan == nan her zaman false'tur). Çıktı: FARKLI.",
      "en": "By IEEE-754 floating-point specification, NaN compares unequal to everything, including itself (nan == nan is false). Output: FARKLI."
    }
  },
  {
    "topic": "bitwise",
    "code": "#include <stdio.h>\n\nint main() {\n    unsigned int x = 0x80000001;\n    // 32-bit dairesel sola döndürme (rotate left 1 bit):\n    unsigned int r = (x << 1) | (x >> 31);\n    printf(\"%u\", r);\n    return 0;\n}",
    "options": [
      "3",
      "1",
      "2",
      "0"
    ],
    "answer": 0,
    "explanation": {
      "tr": "x = 1000...0001 ikilik düzenindedir. (x << 1) en soldaki biti dışarı atıp en sağı 0 yapar (000...0010). (x >> 31) ise en soldaki 1 bitini en sağa taşır (000...0001). Bitwise OR ile birleştiğinde 000...0011 yani 3 elde edilir.",
      "en": "Circular bitwise rotation by 1 bit moves the MSB to the LSB position and shifts the rest left: (x << 1) | (x >> 31) evaluates to binary 11 = decimal 3."
    }
  },
  {
    "topic": "arrays",
    "code": "#include <stdio.h>\n\nvoid f() {\n    int n = 5;\n    // C'de VLA (Variable Length Array) static olabilir mi?\n    // static int arr[n];\n}\n\nint main() {\n    printf(\"%d\", 1);\n    return 0;\n}",
    "options": [
      "VLA değişkenleri 'static' veya dosya kapsamında bildirilemez",
      "Bildirilebilir",
      "Derleyiciye bağlı",
      "C99'da serbesttir"
    ],
    "answer": 0,
    "explanation": {
      "tr": "ISO C99 standardına göre Değişken Uzunluklu Diziler (VLA) yalnızca otomatik depolama süresine (automatic storage duration) sahip olabilir; static veya extern niteleyicisi alamazlar ve dosya kapsamında tanımlanamazlar.",
      "en": "Variable Length Arrays (VLAs) in C99 must have automatic storage duration. Declaring a VLA as static or extern is a compile-time constraint violation."
    }
  },
  {
    "topic": "sizeof_types",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 'AB';\n    printf(\"%d\", sizeof(x) == sizeof('A'));\n    return 0;\n}",
    "options": [
      "1 (Her ikisi de int türündedir)",
      "0",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C dilinde hem tek karakter sabitleri ('A') hem de çoklu karakter sabitleri ('AB') int türündedir! Dolayısıyla her ikisinin de sizeof değeri sizeof(int)'tir ve birbirine eşittir (1).",
      "en": "In C, both single-character literals ('A') and multi-character literals ('AB') have type 'int'. Both sizeof values equal sizeof(int), yielding 1."
    }
  },
  {
    "topic": "preprocessor",
    "code": "#include <stdio.h>\n\n#define MERGE(a, b) a##b\n\nint main() {\n    int MERGE(count, 1) = 55;\n    printf(\"%d\", count1);\n    return 0;\n}",
    "options": [
      "55",
      "count1",
      "Hata",
      "0"
    ],
    "answer": 0,
    "explanation": {
      "tr": "## operatörü count ve 1 belirteçlerini birleştirerek 'count1' değişken adını oluşturur. int count1 = 55 tanımlanmış olur ve 55 basılır.",
      "en": "Token concatenation (##) merges count and 1 into identifier count1. 'int count1 = 55;' is compiled, printing 55."
    }
  },
  {
    "topic": "memory",
    "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *p = (int*)malloc(sizeof(int) * 10);\n    // realloc(p, 0) C23 standardında Tanımsız Davranıştır (UB)\n    printf(\"%d\", p != NULL);\n    free(p);\n    return 0;\n}",
    "options": [
      "1 (veya bellek yetersizse 0)",
      "Her zaman 0",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "malloc başarıyla bellek tahsis ederse NULL olmayan bir adres döner (p != NULL doğrudur). C23 standardında realloc(p, 0) çağrısı UB yapılmıştır.",
      "en": "malloc returns a non-null pointer upon successful allocation. Note that realloc(p, 0) is classified as Undefined Behavior in C23."
    }
  },
  {
    "topic": "memory",
    "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    // malloc() tarafından dönen adresin hizalaması:\n    void *p = malloc(1);\n    printf(\"%d\", (size_t)p % sizeof(void*) == 0);\n    free(p);\n    return 0;\n}",
    "options": [
      "1 (malloc herhangi bir temel türe uygun maksimum hizalama garantisi verir)",
      "0",
      "Tanımsız",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C standardı gereğince malloc(), 1 bayt bile ayrılsa, dönen işaretçinin herhangi bir temel veri türü (max_align_t) için uygun şekilde hizalanmış (suitably aligned) olacağını garanti eder.",
      "en": "The C standard mandates that malloc returns a pointer suitably aligned for any fundamental object type (max_align_t)."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    short a = 32767;\n    short b = 1;\n    int c = a + b;\n    printf(\"%d\", c);\n    return 0;\n}",
    "options": [
      "32768",
      "-32768 (taşma)",
      "0",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Aritmetik işlemlerden önce int'ten küçük türler (short, char) tamsayı terfisine (integer promotion) uğrayarak 'int' türüne yükseltilir. 32767 + 1 işlemi 32-bit int üzerinde yapılır ve taşma olmadan 32768 üretir.",
      "en": "Operands of type short undergo integer promotion to 'int' before arithmetic. The addition occurs in 32-bit int, yielding 32768 without overflow."
    }
  },
  {
    "topic": "pointer_arithmetic",
    "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *p1 = (int*)malloc(10 * sizeof(int));\n    int *p2 = (int*)malloc(10 * sizeof(int));\n    // p2 - p1 farkı:\n    printf(\"%d\", p1 != NULL && p2 != NULL);\n    free(p1);\n    free(p2);\n    return 0;\n}",
    "options": [
      "1 (ancak p2 - p1 hesaplamak UB'dir)",
      "0",
      "Hata verir",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C standardına göre iki işaretçi arasında çıkarma (p2 - p1) YALNIZCA her iki işaretçi de aynı dizi nesnesinin elemanlarını gösteriyorsa geçerlidir. Farklı malloc bloklarını çıkarmak Tanımsız Davranıştır.",
      "en": "Pointer subtraction is valid ONLY when both pointers point to elements of the same array object. Subtracting pointers across distinct allocations is Undefined Behavior."
    }
  },
  {
    "topic": "scope",
    "code": "#include <stdio.h>\n\nint a = 1;\n\nvoid g() { printf(\"%d\", a); }\n\nvoid f() {\n    int a = 2;\n    g();\n}\n\nint main() {\n    f();\n    return 0;\n}",
    "options": [
      "1 (C statik/lexical kapsamlıdır)",
      "2 (dinamik kapsam)",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C dili statik (lexical) kapsam kuralını benimser. g() fonksiyonu global a değişkenini (1) görür; f() içindeki yerel a değişkeni g'yi etkilemez. Çıktı: 1.",
      "en": "C uses static (lexical) scoping. Function g resolves 'a' from its definition scope (global a = 1), ignoring local variable 'a' in f(). Output: 1."
    }
  },
  {
    "topic": "preprocessor",
    "code": "#include <stdio.h>\n\n#define MIN(a, b) ((a) < (b) ? (a) : (b))\n\nint main() {\n    int x = 4, y = 3;\n    int m = MIN(x++, y);\n    printf(\"%d %d\", m, x);\n    return 0;\n}",
    "options": [
      "3 5",
      "3 4",
      "4 5",
      "4 4"
    ],
    "answer": 0,
    "explanation": {
      "tr": "MIN(x++, y) açılımı: ((x++) < (y) ? (x++) : (y)). Karşılaştırmada 4 < 3 yanlıştır ve x 5 olur. Yanlış dal y (3) döner; dolayısıyla m=3 ve x=5 olur. Çıktı: 3 5.",
      "en": "MIN(x++, y) expands to ((x++) < (y) ? (x++) : (y)). The test 4 < 3 is false, incrementing x to 5. The false branch returns y (3), so m = 3, x = 5."
    }
  },
  {
    "topic": "pointer_arithmetic",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 5;\n    void *p = &a;\n    // GNU C uzantısı void* aritmetiğine 1 bayt adım olarak izin verir\n    // Standart ISO C'de void* aritmetiği geçersizdir\n    printf(\"%d\", (char*)p + 1 == (char*)p + 1);\n    return 0;\n}",
    "options": [
      "1",
      "0",
      "Hata",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Standart ISO C'de void türü tamamlanmamış bir tür olduğundan void* üzerinde işaretçi aritmetiği yasaktır; ancak char* türüne dönüştürüldüğünde 1 baytlık adımlarla ilerlemek tamamen standarttır.",
      "en": "In standard ISO C, pointer arithmetic on void* is invalid because void has incomplete size. Casting to char* provides well-defined 1-byte stepping."
    }
  },
  {
    "topic": "bitwise",
    "code": "#include <stdio.h>\n\nint main() {\n    unsigned int x = 0;\n    printf(\"%u\", ~x);\n    return 0;\n}",
    "options": [
      "UINT_MAX (tüm bitler 1)",
      "0",
      "-1",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "unsigned türlerde bitwise NOT (~) tüm bitleri 1 yapar. Bu değer unsigned int türünün alabileceği en büyük değer olan UINT_MAX'tır (32-bitte 4294967295).",
      "en": "Bitwise NOT on unsigned 0 sets all bits to 1, producing UINT_MAX."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 10;\n    const int * const p = &a;\n    printf(\"%d\", *p);\n    return 0;\n}",
    "options": [
      "10",
      "Derleme hatası",
      "Adres",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "'const int * const p' ifadesi hem işaretçinin gösterdiği değerin (*p) hem de işaretçinin tuttuğu adresin (p) sabit (immutable) olduğunu belirtir.",
      "en": "'const int * const p' declares a const pointer to a const int. Both the pointer address and pointed-to value cannot be modified."
    }
  },
  {
    "topic": "arrays",
    "code": "#include <stdio.h>\n\nvoid f(int (*p)[3]) {\n    printf(\"%d\", (*p)[1]);\n}\n\nint main() {\n    int matrix[2][3] = {{10, 20, 30}, {40, 50, 60}};\n    f(matrix);\n    return 0;\n}",
    "options": [
      "20",
      "10",
      "30",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "matrix fonksiyon parametresine iletildiğinde ilk satırına işaret eden bir işaretçiye (int (*)[3]) dönüşür. (*p)[1] ilk satırın 1. indeksindeki 20'yi verir.",
      "en": "matrix decays into a pointer to an array of 3 ints (int (*)[3]). (*p)[1] accesses matrix[0][1] = 20."
    }
  },
  {
    "topic": "operators",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 0, b = 0;\n    int res = (a = 1) && (b = a + 1);\n    printf(\"%d %d %d\", res, a, b);\n    return 0;\n}",
    "options": [
      "1 1 2",
      "0 1 0",
      "1 1 0",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "&& operatörü iki terim arasında kesin bir sequence point garanti eder. Sol terim (a = 1) tamamlanmadan sağ terim (b = a + 1 = 2) çalışmaz. Her ikisi de doğru olduğundan res = 1 olur. Çıktı: 1 1 2.",
      "en": "&& enforces a sequence point between operands. (a = 1) is sequenced before (b = a + 1), evaluating cleanly to 1 1 2."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nvoid inc(int **p) {\n    (**p)++;\n}\n\nint main() {\n    int x = 10;\n    int *ptr = &x;\n    inc(&ptr);\n    printf(\"%d\", x);\n    return 0;\n}",
    "options": [
      "11",
      "10",
      "Adres",
      "Hata"
    ],
    "answer": 0,
    "explanation": {
      "tr": "**p ile x değişkenine iki seviyeli indirection ile ulaşılır ve (**p)++ ifadesi x'in değerini 10'dan 11'e artırır.",
      "en": "Double pointer indirection **p accesses variable x directly, incrementing it from 10 to 11."
    }
  },
  {
    "topic": "pointers",
    "code": "#include <stdio.h>\n\nint main() {\n    // C99 restrict anahtar sözcüğü:\n    // Derleyiciye işaretçinin bellek alanına başka hiçbir işaretçi ile erişilmeyeceğini taahhüt eder\n    int x = 10;\n    int * restrict p = &x;\n    printf(\"%d\", *p);\n    return 0;\n}",
    "options": [
      "10",
      "Derleme hatası",
      "0",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C99 ile eklenen 'restrict' anahtar sözcüğü, o nesneye yalnızca bu işaretçi üzerinden erişileceğini derleyiciye vaat eder. Bu sayede derleyici agresif yazmaç önbelleklemesi ve döngü vektörizasyonu yapabilir.",
      "en": "The C99 'restrict' qualifier asserts that the pointed object is not aliased by any other pointer in that scope, enabling compiler optimizations."
    }
  },
  {
    "topic": "functions",
    "code": "#include <stdio.h>\n\nint fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}\n\nint main() {\n    printf(\"%d\", fact(4));\n    return 0;\n}",
    "options": [
      "24",
      "12",
      "4",
      "Stack overflow"
    ],
    "answer": 0,
    "explanation": {
      "tr": "Özyinelemeli faktöriyel çağrısı: 4 * 3 * 2 * 1 = 24. n <= 1 taban koşulunda durur.",
      "en": "Recursive factorial computes 4 * 3 * 2 * 1 = 24."
    }
  },
  {
    "topic": "arrays",
    "code": "#include <stdio.h>\n\nint main() {\n    // C99 Bileşik Sabit (Compound Literal):\n    int *p = (int[]){10, 20, 30};\n    printf(\"%d\", p[1]);\n    return 0;\n}",
    "options": [
      "20",
      "10",
      "Derleme hatası",
      "Tanımsız"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C99 ile gelen Bileşik Sabitler (Compound Literals) blok kapsamında isimsiz bir otomatik dizi tahsis eder. p[1] 20 değerini döner.",
      "en": "C99 compound literals (int[]){10, 20, 30} allocate an unnamed automatic array in the current block, allowing p[1] to evaluate to 20."
    }
  },
  {
    "topic": "preprocessor",
    "code": "#include <stdio.h>\n\n#define FOO 1\n\nint main() {\n#if FOO == 1\n    printf(\"A\");\n#elif FOO == 2\n    printf(\"B\");\n#else\n    printf(\"C\");\n#endif\n    return 0;\n}",
    "options": [
      "A",
      "B",
      "C",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "#if önişlemci koşulu derleme öncesinde FOO değerini kontrol eder. FOO 1 olduğu için A basılır; diğer kısımlar derleme çıktısına hiç dahil edilmez.",
      "en": "Conditional compilation directive #if FOO == 1 evaluates to true, emitting printf(\"A\") and discarding all other branches."
    }
  },
  {
    "topic": "undefined_behavior",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[3] = {10, 20, 30};\n    // Dizi sınırları dışına çıkma:\n    printf(\"%d\", arr[3] >= 0);\n    return 0;\n}",
    "options": [
      "Tanımsız Davranış (Undefined Behavior)",
      "1",
      "0",
      "Her zaman hata"
    ],
    "answer": 0,
    "explanation": {
      "tr": "3 elemanlı dizinin geçerli indeksleri 0, 1 ve 2'dir. arr[3] ile sınır dışına (out-of-bounds) erişmek C standardında tanımsız davranıştır; çöp değer okuyabilir veya çökmeye yol açabilir.",
      "en": "Valid indices for arr[3] are 0, 1, and 2. Accessing arr[3] is an out-of-bounds read and Undefined Behavior."
    }
  },
  {
    "topic": "scope",
    "code": "#include <stdio.h>\n\nint main() {\n    int i = 0;\n    for (int i = 0; i < 2; i++) {\n        // döngü yerel i'si\n    }\n    printf(\"%d\", i);\n    return 0;\n}",
    "options": [
      "0",
      "2",
      "1",
      "Derleme hatası"
    ],
    "answer": 0,
    "explanation": {
      "tr": "C99'da for döngüsü başlığında bildirilen 'int i' döngü bloğuyla sınırlıdır. Döngü bittiğinde dıştaki i değişkeni (değeri 0) etkilenmeden kalır.",
      "en": "In C99, variables declared within the for loop clause are scoped to the loop. The outer 'i' remains 0."
    }
  }
];
