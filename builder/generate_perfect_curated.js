// builder/generate_perfect_curated.js
// Automatically constructs strictly graduated, beautifully curated questions for all 4 levels.
const fs = require("fs");
const path = require("path");

const beginnerQuestions = [
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int a = 5;
    int b = 2;
    printf("%d", a / b);
    return 0;
}`,
    options: ["2.5", "2", "3", "0"],
    answer: 1,
    explanation: {
      tr: "C dilinde her iki terim de tam sayı (int) olduğunda bölme operatörü (/) tamsayı bölmesi yapar ve ondalık kısmı atar (truncation). 5 / 2 = 2 olur.",
      en: "In C, integer division truncates toward zero when both operands are integers. 5 / 2 evaluates to 2."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int x = 5;
    int y = x++;
    printf("%d %d", x, y);
    return 0;
}`,
    options: ["5 5", "6 5", "6 6", "5 6"],
    answer: 1,
    explanation: {
      tr: "Postfix artırma (x++) operatörü önce x'in mevcut değerini (5) döner ve y'ye atar, ardından x'i 1 artırarak 6 yapar. Çıktı: 6 5.",
      en: "Postfix increment (x++) yields the current value (5) for assignment, then increments x to 6. Output: 6 5."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int x = 5;
    int y = ++x;
    printf("%d %d", x, y);
    return 0;
}`,
    options: ["6 6", "6 5", "5 5", "5 6"],
    answer: 0,
    explanation: {
      tr: "Prefix artırma (++x) operatörü önce x'i 1 artırarak 6 yapar, ardından bu yeni değeri y'ye atar. Çıktı: 6 6.",
      en: "Prefix increment (++x) increments x to 6 first, then yields that updated value to y. Output: 6 6."
    }
  },
  {
    topic: "variables",
    code: `#include <stdio.h>

int main() {
    char c = 'A';
    printf("%d", c + 1);
    return 0;
}`,
    options: ["B", "66", "A1", "Hata verir"],
    answer: 1,
    explanation: {
      tr: "'A' karakterinin ASCII sayısal değeri 65'tir. c + 1 ifadesi tamsayı terfisi ile 66 sonucunu verir ve %d bu sayıyı 66 olarak yazdırır.",
      en: "The ASCII value of 'A' is 65. Integer promotion computes 65 + 1 = 66, and %d prints 66."
    }
  },
  {
    topic: "conditions",
    code: `#include <stdio.h>

int main() {
    int x = -5;
    if (x) {
        printf("EVET");
    } else {
        printf("HAYIR");
    }
    return 0;
}`,
    options: ["EVET", "HAYIR", "0", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "C dilinde yalnızca 0 değeri 'yanlış' (false) kabul edilir. Sıfır dışındaki tüm pozitif ve negatif sayılar (-5 dahil) mantıksal olarak 'doğru' (true) kabul edilir.",
      en: "In C, only 0 evaluates to false. Any non-zero value, including negative numbers like -5, evaluates to true."
    }
  },
  {
    topic: "conditions",
    code: `#include <stdio.h>

int main() {
    int x = 0;
    if (x = 5) {
        printf("%d", x);
    } else {
        printf("SIFIR");
    }
    return 0;
}`,
    options: ["5", "0", "SIFIR", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "if koşulunda çift eşit (==) yerine tek eşit (=) kullanılmıştır! x'e 5 atanır ve atama ifadesinin değeri 5 (sıfır dışı yani true) olduğundan if bloğu çalışır ve 5 yazdırılır.",
      en: "Single equals (=) is assignment, not comparison! x is assigned 5, which evaluates to 5 (true), executing the if block and printing 5."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int a = 0;
    int b = 5;
    if (a && ++b) {
        printf("A");
    }
    printf("%d", b);
    return 0;
}`,
    options: ["5", "6", "A5", "A6"],
    answer: 0,
    explanation: {
      tr: "Mantıksal VE (&&) operatöründe sol taraf 0 (false) ise kısa devre (short-circuit) gerçekleşir ve sağ taraf (++b) ASLA çalıştırılmaz! Bu yüzden b 5 kalır.",
      en: "In logical AND (&&), if the left operand is false (0), short-circuit evaluation skips the right operand (++b). b remains 5."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int a = 1;
    int b = 5;
    if (a || ++b) {
        printf("%d", b);
    }
    return 0;
}`,
    options: ["5", "6", "1", "0"],
    answer: 0,
    explanation: {
      tr: "Mantıksal VEYA (||) operatöründe sol taraf 1 (true) ise sonuç zaten doğrudur; kısa devre nedeniyle sağdaki ++b ifadesi çalıştırılmaz. b 5 olarak yazdırılır.",
      en: "In logical OR (||), if the left operand is true (1), the right operand is short-circuited. ++b is never executed and b prints 5."
    }
  },
  {
    topic: "loops",
    code: `#include <stdio.h>

int main() {
    int i = 3;
    while (i--) {
        printf("%d", i);
    }
    return 0;
}`,
    options: ["210", "321", "3210", "21"],
    answer: 0,
    explanation: {
      tr: "Döngü adımları: 1) i=3 testi geçer, i 2 olur, '2' basar. 2) i=2 testi geçer, i 1 olur, '1' basar. 3) i=1 testi geçer, i 0 olur, '0' basar. 4) i=0 testte false olur, döngü biter. Çıktı: 210.",
      en: "Tracing while(i--): condition evaluates i then decrements. Iterations print 2, then 1, then 0. Output: 210."
    }
  },
  {
    topic: "conditions",
    code: `#include <stdio.h>

int main() {
    int x = 2;
    switch (x) {
        case 1: printf("1");
        case 2: printf("2");
        case 3: printf("3");
        default: printf("D");
    }
    return 0;
}`,
    options: ["23D", "2", "23", "D"],
    answer: 0,
    explanation: {
      tr: "switch bloğunda 'break' ifadesi bulunmadığı için eşleşen case 2'den itibaren sonraki tüm case'ler ve default arka arkaya çalışır (fallthrough). Çıktı: 23D.",
      en: "Without break statements, switch execution falls through from matching case 2 across all subsequent cases and default: 23D."
    }
  },
  {
    topic: "conditions",
    code: `#include <stdio.h>

int main() {
    int x = 5;
    if (x > 10);
    {
        printf("CALISTI");
    }
    return 0;
}`,
    options: ["CALISTI", "Hiçbir şey", "Hata verir", "0"],
    answer: 0,
    explanation: {
      tr: "if satırının hemen sonundaki noktalı virgül (;) if koşulunun gövdesini sonlandırır! Süslü parantezli blok bağımsız bir kod bloğu haline gelir ve her halükarda çalışarak 'CALISTI' yazar.",
      en: "The semicolon (;) immediately after if terminates the if statement with an empty body. The following block executes unconditionally: CALISTI."
    }
  },
  {
    topic: "loops",
    code: `#include <stdio.h>

int main() {
    int i = 0;
    for (i = 0; i < 3; i++);
    printf("%d", i);
    return 0;
}`,
    options: ["3", "012", "0", "2"],
    answer: 0,
    explanation: {
      tr: "for döngüsünün başlığından hemen sonra noktalı virgül (;) olduğundan döngünün gövdesi boştur. Döngü 3 kez boş döner, i 3 olduğunda çıkar ve printf tek bir kez 3 basar.",
      en: "The semicolon after the for loop header creates an empty loop body. i increments until reaching 3, then printf prints 3."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int a = 10;
    int *p = &a;
    *p = 25;
    printf("%d", a);
    return 0;
}`,
    options: ["25", "10", "Adres değeri", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "p işaretçisi a değişkeninin bellek adresini tutar. *p = 25 işlemi (dereferencing) bu adrese 25 yazar ve doğrudan a'yı 25 yapar.",
      en: "Pointer p holds the address of a. Dereferencing with *p = 25 modifies variable a directly to 25."
    }
  },
  {
    topic: "sizeof_types",
    code: `#include <stdio.h>

int main() {
    printf("%lu", sizeof(char));
    return 0;
}`,
    options: ["1", "2", "4", "Derleyiciye bağlı"],
    answer: 0,
    explanation: {
      tr: "C dil standardı tanımı gereği sizeof(char) her zaman kesin olarak 1 bayttır. C'de sizeof birimi char cinsindendir.",
      en: "By ISO C standard definition, sizeof(char) is always guaranteed to be exactly 1 byte."
    }
  },
  {
    topic: "strings",
    code: `#include <stdio.h>

int main() {
    char s[] = "C";
    printf("%lu", sizeof(s));
    return 0;
}`,
    options: ["2", "1", "4", "8"],
    answer: 0,
    explanation: {
      tr: "C dilinde çift tırnaklı string sabitlerinin sonuna otomatik olarak null sonlandırıcı '\\0' karakteri eklenir. Dizi 'C' ve '\\0' olmak üzere 2 bayttır.",
      en: "Double-quoted string literals in C are automatically null-terminated with '\\0'. The array holds 'C' and '\\0', occupying 2 bytes."
    }
  },
  {
    topic: "strings",
    code: `#include <stdio.h>

int main() {
    char str[] = {'A', 'r', '\\0', 'e', 'n', 'a'};
    printf("%s", str);
    return 0;
}`,
    options: ["Ar", "Arena", "Ar\\0ena", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "%s belirteci ekrana yazdırırken '\\0' (null karakter) ile karşılaştığı anda durur. Bu yüzden sadece 'Ar' yazdırılır.",
      en: "%s stops printing upon encountering the null terminator '\\0'. Thus only 'Ar' is printed."
    }
  },
  {
    topic: "arrays",
    code: `#include <stdio.h>

int main() {
    int arr[3] = {10, 20, 30};
    printf("%d", arr[1]);
    return 0;
}`,
    options: ["20", "10", "30", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "C dilinde diziler 0 tabanlı indekslenir. arr[0] = 10, arr[1] = 20, arr[2] = 30'dur. arr[1] 20 değerini verir.",
      en: "C arrays are 0-indexed. arr[0]=10, arr[1]=20, arr[2]=30. arr[1] prints 20."
    }
  },
  {
    topic: "arrays",
    code: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20};
    printf("%d %d", arr[1], arr[2]);
    return 0;
}`,
    options: ["20 0", "20 20", "20 ÇöpDeğer", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "C'de bir dizi kısmen başlatılırsa, değer atanmayan diğer tüm elemanlar otomatik olarak 0 ile doldurulur (zero-filled). arr[2] = 0 olur.",
      en: "In C, partially initialized arrays guarantee that all unmentioned elements are initialized to zero. arr[2] is 0."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int x = 5;
    x *= 2 + 3;
    printf("%d", x);
    return 0;
}`,
    options: ["25", "13", "15", "10"],
    answer: 0,
    explanation: {
      tr: "Bileşik atama operatörü (x *= ...) sağdaki ifadenin tamamı hesaplandıktan sonra işletilir: x = x * (2 + 3) = 5 * 5 = 25.",
      en: "Compound assignment evaluates the full right-hand expression first: x = x * (2 + 3) = 5 * 5 = 25."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int a = 17 % 5;
    printf("%d", a);
    return 0;
}`,
    options: ["2", "3", "3.4", "1"],
    answer: 0,
    explanation: {
      tr: "Modül operatörü (%) tamsayı bölmesinden kalan değeri verir: 17 = 5 * 3 + 2. Kalan 2'dir.",
      en: "The modulo operator (%) computes the integer remainder: 17 % 5 = 2."
    }
  },
  {
    topic: "bitwise",
    code: `#include <stdio.h>

int main() {
    int n = 7;
    if (n & 1) {
        printf("TEK");
    } else {
        printf("CIFT");
    }
    return 0;
}`,
    options: ["TEK", "CIFT", "0", "1"],
    answer: 0,
    explanation: {
      tr: "n & 1 işlemi sayının en anlamsız (en sağdaki) bitini test eder. 7 (0111) & 1 (0001) = 1 (true) olduğundan TEK yazdırılır.",
      en: "n & 1 tests the least significant bit. 7 is odd (binary 0111), yielding 1 (true), so TEK is printed."
    }
  },
  {
    topic: "bitwise",
    code: `#include <stdio.h>

int main() {
    int a = 1;
    printf("%d", a << 3);
    return 0;
}`,
    options: ["8", "3", "1", "16"],
    answer: 0,
    explanation: {
      tr: "Sola kaydırma (a << n) sayıyı 2^n ile çarpar: 1 << 3 = 1 * 2^3 = 8.",
      en: "Left shift (<<) multiplies by 2^n: 1 << 3 shifts 1 left by 3 bits, producing 8."
    }
  },
  {
    topic: "bitwise",
    code: `#include <stdio.h>

int main() {
    int a = 4; // 0100
    int b = 1; // 0001
    printf("%d", a | b);
    return 0;
}`,
    options: ["5", "4", "1", "0"],
    answer: 0,
    explanation: {
      tr: "Bitwise OR (|) işlemi karşılıklı bitlerden en az biri 1 ise 1 üretir. 0100 | 0001 = 0101 (ondalık 5).",
      en: "Bitwise OR (|) yields 1 if either bit is 1. 0100 | 0001 = 0101 (decimal 5)."
    }
  },
  {
    topic: "bitwise",
    code: `#include <stdio.h>

int main() {
    int a = 6; // 0110
    int b = 3; // 0011
    printf("%d", a ^ b);
    return 0;
}`,
    options: ["5", "2", "7", "0"],
    answer: 0,
    explanation: {
      tr: "Bitwise XOR (^) işlemi farklı bitler için 1, aynı bitler için 0 üretir: 0110 ^ 0011 = 0101 (ondalık 5).",
      en: "Bitwise XOR (^) produces 1 when bits differ and 0 when they match: 0110 ^ 0011 = 0101 (5)."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int x = (10 > 20) ? 10 : 20;
    printf("%d", x);
    return 0;
}`,
    options: ["20", "10", "1", "0"],
    answer: 0,
    explanation: {
      tr: "Ternary operatöründe (şart ? doğruysa : yanlışsa), (10 > 20) yanlış olduğundan iki nokta üst üsteden sonraki 20 değeri döner.",
      en: "Ternary operator evaluates condition ? if_true : if_false. 10 > 20 is false, returning 20."
    }
  },
  {
    topic: "loops",
    code: `#include <stdio.h>

int main() {
    int i = 0;
    do {
        i++;
    } while (i < 0);
    printf("%d", i);
    return 0;
}`,
    options: ["1", "0", "Hiçbir şey", "Sonsuz döngü"],
    answer: 0,
    explanation: {
      tr: "do-while döngüsünün gövdesi koşul ne olursa olsun en az bir kez mutlaka çalışır. i 1 olur, ardından (1 < 0) yanlış olduğundan döngü biter ve 1 yazdırılır.",
      en: "A do-while loop always executes its body at least once before testing the condition. i increments to 1, then the loop exits."
    }
  },
  {
    topic: "scope",
    code: `#include <stdio.h>

int main() {
    int x = 5;
    {
        int x = 10;
    }
    printf("%d", x);
    return 0;
}`,
    options: ["5", "10", "15", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "Süslü parantezler {} yeni bir blok kapsamı (block scope) oluşturur. İçteki x dıştakini blok içinde gölgeler (shadowing); blok kapanınca dıştaki x (5) geçerlidir.",
      en: "Inner block scope shadows the outer variable only within the block. Outside, outer x (5) is unaffected."
    }
  },
  {
    topic: "functions",
    code: `#include <stdio.h>

void inc(int n) {
    n++;
}

int main() {
    int x = 5;
    inc(x);
    printf("%d", x);
    return 0;
}`,
    options: ["5", "6", "0", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "C dilinde fonksiyon parametreleri varsayılan olarak değer ile iletilir (pass-by-value). Fonksiyon içindeki n++ yalnızca yerel kopyayı artırır, main'deki x 5 kalır.",
      en: "C passes arguments by value. Modifying parameter 'n' inside inc() affects only the local copy, leaving main's x unchanged at 5."
    }
  },
  {
    topic: "loops",
    code: `#include <stdio.h>

int main() {
    int sum = 0;
    for (int i = 0; i < 4; i++) {
        if (i == 2) continue;
        sum += i;
    }
    printf("%d", sum);
    return 0;
}`,
    options: ["4", "6", "3", "2"],
    answer: 0,
    explanation: {
      tr: "continue ifadesi o adımın kalanını atlar. i=0 (sum=0), i=1 (sum=1), i=2 (atlanır), i=3 (sum=1+3=4). Çıktı: 4.",
      en: "continue skips the remainder of iteration 2. Summing 0 + 1 + 3 = 4."
    }
  },
  {
    topic: "loops",
    code: `#include <stdio.h>

int main() {
    int count = 0;
    for (int i = 0; i < 5; i++) {
        if (i == 3) break;
        count++;
    }
    printf("%d", count);
    return 0;
}`,
    options: ["3", "4", "5", "2"],
    answer: 0,
    explanation: {
      tr: "i=3 olduğunda break döngüyü derhal sonlandırır. count i=0, 1, 2 için üç kez artarak 3 olur.",
      en: "When i reaches 3, break terminates the loop immediately. count is incremented for 0, 1, and 2, yielding 3."
    }
  },
  {
    topic: "loops",
    code: `#include <stdio.h>

int main() {
    int count = 0;
    for (int i = 0; i < 3; i++) {
        for (int j = 0; j < 2; j++) {
            count++;
        }
    }
    printf("%d", count);
    return 0;
}`,
    options: ["6", "5", "9", "3"],
    answer: 0,
    explanation: {
      tr: "Dış döngü 3 kez, her dış adımda iç döngü 2 kez çalışır. Toplam adım sayısı 3 * 2 = 6'dır.",
      en: "Outer loop runs 3 times; inner loop runs 2 times per outer step: 3 * 2 = 6."
    }
  },
  {
    topic: "variables",
    code: `#include <stdio.h>

int main() {
    unsigned char x = 255;
    x = x + 1;
    printf("%d", x);
    return 0;
}`,
    options: ["0", "256", "Hata verir", "-1"],
    answer: 0,
    explanation: {
      tr: "C standardına göre unsigned türlerde taşma tanımsız değildir; modülo aritmetiği ile başa döner (wrap-around). 8-bit unsigned char için 255 + 1 = 0 olur.",
      en: "Unsigned integer overflow is well-defined in C: arithmetic wraps modulo 2^8, so 255 + 1 wraps to 0."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int x = 10;
    int y = (x == 10);
    printf("%d", y);
    return 0;
}`,
    options: ["1", "10", "0", "true"],
    answer: 0,
    explanation: {
      tr: "C'de karşılaştırma operatörleri (==, !=, < vb.) şart doğru olduğunda int türünde 1, yanlış olduğunda 0 üretir. y = 1 olur.",
      en: "In C, equality operators produce integer 1 for true and 0 for false. y becomes 1."
    }
  },
  {
    topic: "conditions",
    code: `#include <stdio.h>

int main() {
    int a = 0;
    if (!a) {
        printf("SIFIR");
    } else {
        printf("DEGIL");
    }
    return 0;
}`,
    options: ["SIFIR", "DEGIL", "Hata", "0"],
    answer: 0,
    explanation: {
      tr: "Mantıksal DEĞİL (!) operatörü 0 değerini 1 (true) yapar. !0 doğru olduğundan if bloğu çalışır ve SIFIR yazdırılır.",
      en: "Logical NOT (!) inverts truth: !0 evaluates to 1 (true), printing SIFIR."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int x = 42;
    printf("%d", !!x);
    return 0;
}`,
    options: ["1", "42", "0", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "Çift ünlem (!!), herhangi bir değeri kesin bir boolean 0 veya 1 değerine dönüştürmek için kullanılan yaygın bir C deyimidir. !42 = 0, !0 = 1.",
      en: "Double NOT (!!) normalizes any non-zero value to boolean 1. !42 is 0, and !0 is 1."
    }
  },
  {
    topic: "variables",
    code: `#include <stdio.h>

int main() {
    float f = 5 / 2;
    printf("%.1f", f);
    return 0;
}`,
    options: ["2.0", "2.5", "2", "3.0"],
    answer: 0,
    explanation: {
      tr: "5 ve 2 tamsayı olduğundan 5 / 2 ifadesi tamsayı bölmesiyle 2 sonucunu üretir. Bu 2 değeri daha sonra float'a çevrilerek f'ye atanır ve 2.0 basılır.",
      en: "5 / 2 performs integer division yielding 2 before being implicitly cast to float 2.0."
    }
  },
  {
    topic: "variables",
    code: `#include <stdio.h>

int main() {
    char c = '7';
    int val = c - '0';
    printf("%d", val);
    return 0;
}`,
    options: ["7", "55", "0", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "ASCII tablosunda '0'..'9' karakterleri ardışıktır. Karakter rakamdan '0' çıkarıldığında ('7' - '0' = 55 - 48 = 7) tamsayı değeri elde edilir.",
      en: "In ASCII, digit characters are consecutive. Subtracting '0' converts character digit '7' into integer 7."
    }
  },
  {
    topic: "strings",
    code: `#include <stdio.h>
#include <string.h>

int main() {
    char s[] = "Arena";
    printf("%lu", strlen(s));
    return 0;
}`,
    options: ["5", "6", "4", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "strlen() fonksiyonu null sonlandırıcı ('\\0') karakterini saymaz; yalnızca string içindeki karakter sayısını döner: 5.",
      en: "strlen() counts characters excluding the null terminator, returning 5."
    }
  },
  {
    topic: "strings",
    code: `#include <stdio.h>

int main() {
    char str[] = "ArenaC";
    printf("%c", str[1]);
    return 0;
}`,
    options: ["r", "A", "e", "n"],
    answer: 0,
    explanation: {
      tr: "str[0] = 'A', str[1] = 'r' dir. %c formatı indeks 1'deki 'r' karakterini yazdırır.",
      en: "str[0] is 'A', str[1] is 'r'. %c prints character 'r'."
    }
  },
  {
    topic: "structs",
    code: `#include <stdio.h>

struct Point {
    int x;
    int y;
};

int main() {
    struct Point p = {10, 20};
    printf("%d", p.x + p.y);
    return 0;
}`,
    options: ["30", "10", "20", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "p yapısının üyeleri x=10 ve y=20 olarak başlatılmıştır. Nokta (.) operatörü ile üyelere erişilir ve 10 + 20 = 30 yazdırılır.",
      en: "Struct members are initialized to 10 and 20. Dot operator accesses members: 10 + 20 = 30."
    }
  }
];

fs.writeFileSync(
  path.join(__dirname, "beginner_questions.js"),
  "module.exports = " + JSON.stringify(beginnerQuestions, null, 2) + ";\n",
  "utf8"
);
console.log("Beginner questions written successfully: " + beginnerQuestions.length);

const intermediateQuestions = [
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30};
    int *p = arr;
    int val = *p++;
    printf("%d %d", val, *p);
    return 0;
}`,
    options: ["10 20", "11 20", "10 10", "20 20"],
    answer: 0,
    explanation: {
      tr: "Postfix ++ operatörünün önceliği * operatöründen yüksektir. *p++ ifadesinde önce p'nin mevcut adresindeki değer (10) okunur ve val'e verilir, ardından p bir sonraki elemana (20) ilerletilir. Çıktı: 10 20.",
      en: "Postfix ++ has higher precedence than *. In *p++, the current value at p (10) is assigned to val first, then p is incremented to point to 20. Output: 10 20."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30};
    int *p = arr;
    (*p)++;
    printf("%d %d", arr[0], arr[1]);
    return 0;
}`,
    options: ["11 20", "10 20", "10 21", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "Parantez (*p) işaretçinin gösterdiği konuma (arr[0]) erişir. Ardından ++ bu değeri 1 artırarak 10'dan 11 yapar. İşaretçinin kendisi ilerlemez. Çıktı: 11 20.",
      en: "Parentheses (*p) dereference p first (arr[0] = 10). The ++ then increments that value to 11. Pointer p itself does not move. Output: 11 20."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30};
    int *p = arr;
    int val = *++p;
    printf("%d %d", val, *p);
    return 0;
}`,
    options: ["20 20", "10 20", "11 20", "10 10"],
    answer: 0,
    explanation: {
      tr: "Prefix ++p önce işaretçiyi bir sonraki elemana (&arr[1]) ilerletir, ardından * operatörü ile bu yeni konumdaki değer (20) okunur. Çıktı: 20 20.",
      en: "Prefix ++p advances the pointer to &arr[1] first, then dereferences it, producing 20 for val. Output: 20 20."
    }
  },
  {
    topic: "pointer_arithmetic",
    code: `#include <stdio.h>

int main() {
    int arr[5] = {1, 2, 3, 4, 5};
    int *p1 = &arr[4];
    int *p2 = &arr[1];
    printf("%td", p1 - p2);
    return 0;
}`,
    options: ["3", "12", "4", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C'de aynı diziyi gösteren iki işaretçinin farkı (p1 - p2), aradaki bayt farkını DEĞİL, aradaki eleman sayısını (ptrdiff_t) verir: 4 - 1 = 3.",
      en: "Subtracting two pointers to the same array yields the number of elements between them (ptrdiff_t), not the byte difference. 4 - 1 = 3."
    }
  },
  {
    topic: "arrays",
    code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40};
    printf("%d", 2[arr]);
    return 0;
}`,
    options: ["30", "20", "Sözdizimi hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C standardına göre arr[i] ifadesi *(arr + i) demektir. Toplama değişmeli (commutative) olduğundan *(i + arr) yani i[arr] ifadesi tamamen geçerlidir: 2[arr] == arr[2] == 30.",
      en: "In C, arr[i] translates to *(arr + i). Since addition is commutative, *(i + arr) can be written as i[arr]. 2[arr] equals arr[2] = 30."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = &arr[3];
    printf("%d", p[-2]);
    return 0;
}`,
    options: ["20", "40", "10", "Tanımsız Davranış"],
    answer: 0,
    explanation: {
      tr: "p[-2] ifadesi *(p - 2) olarak derlenir. p arr[3]'ü (40) gösterdiğinden, 2 geriye gidilerek arr[1] yani 20 elde edilir.",
      en: "p[-2] evaluates to *(p - 2). Since p points to arr[3] (40), stepping back 2 elements accesses arr[1] (20)."
    }
  },
  {
    topic: "arrays",
    code: `#include <stdio.h>

void printSize(int arr[]) {
    printf("%lu", sizeof(arr));
}

int main() {
    int myArr[10];
    printSize(myArr);
    return 0;
}`,
    options: ["Pointer boyutu (genellikle 4 veya 8)", "40", "10", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "Fonksiyon başlığındaki dizi bildirimi (int arr[]) işaretçiye (int *arr) dönüşür (array decay). sizeof(arr) fonksiyon içinde dizinin değil işaretçinin boyutunu verir.",
      en: "Array parameters decay to pointers in function signatures. sizeof(arr) yields the pointer size (4 or 8 bytes), not the original array size."
    }
  },
  {
    topic: "strings",
    code: `#include <stdio.h>
#include <string.h>

int main() {
    char s[] = "Arena";
    printf("%lu %lu", strlen(s), sizeof(s));
    return 0;
}`,
    options: ["5 6", "5 5", "6 6", "6 5"],
    answer: 0,
    explanation: {
      tr: "strlen() null karakter hariç karakter sayısını (5) verir. sizeof() ise bellekte ayrılan toplam bayt boyutunu ('\\0' dahil 6 bayt) verir. Çıktı: 5 6.",
      en: "strlen counts characters up to '\\0' (5), whereas sizeof returns total array bytes including '\\0' (6). Output: 5 6."
    }
  },
  {
    topic: "strings",
    code: `#include <stdio.h>

int main() {
    char *s = "Arena" "C";
    printf("%s", s);
    return 0;
}`,
    options: ["ArenaC", "Arena", "C", "Sözdizimi hatası"],
    answer: 0,
    explanation: {
      tr: "C dilinde aralarında sadece boşluk bulunan string sabitleri (adjacent string literals) derleme aşamasında otomatik olarak birleştirilir. Çıktı: ArenaC.",
      en: "Adjacent string literals in C are automatically concatenated by the compiler into a single literal. Output: ArenaC."
    }
  },
  {
    topic: "sizeof_types",
    code: `#include <stdio.h>

int main() {
    printf("%d", sizeof('A') == sizeof(char));
    return 0;
}`,
    options: ["0", "1", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C dilinde 'A' gibi karakter sabitlerinin türü 'int'tir (genellikle 4 bayt), char DEĞİLDİR! sizeof('A') == sizeof(char) ifadesi 4 == 1 yanlış (0) üretir. (C++'ta char'dır ve 1 üretir).",
      en: "In C, character constants like 'A' have type 'int', not 'char'! sizeof('A') is sizeof(int), which is greater than sizeof(char). The comparison yields 0."
    }
  },
  {
    topic: "bitwise",
    code: `#include <stdio.h>

int main() {
    int x = 2; // binary: 0010
    if (x & 1 == 0) {
        printf("CIFT");
    } else {
        printf("TEK");
    }
    return 0;
}`,
    options: ["TEK", "CIFT", "0", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "C'de '==' operatörünün önceliği bitwise '&' operatöründen daha yüksektir! İfade x & (1 == 0) olarak çalışır: 1 == 0 (0) olur, ardından 2 & 0 = 0 (false) üretir ve else dalı TEK basar!",
      en: "In C, '==' has higher precedence than '&'! The expression is evaluated as x & (1 == 0). 2 & 0 yields 0 (false), executing the else branch: TEK."
    }
  },
  {
    topic: "bitwise",
    code: `#include <stdio.h>

int main() {
    int x = 1 << 2 + 1;
    printf("%d", x);
    return 0;
}`,
    options: ["8", "5", "4", "3"],
    answer: 0,
    explanation: {
      tr: "Toplama (+) operatörünün önceliği bit kaydırmadan (<<) daha yüksektir! İfade 1 << (2 + 1) = 1 << 3 = 8 olarak hesaplanır.",
      en: "Addition (+) has higher precedence than bit shift (<<)! 1 << 2 + 1 evaluates as 1 << (2 + 1) = 1 << 3 = 8."
    }
  },
  {
    topic: "sizeof_types",
    code: `#include <stdio.h>

int main() {
    int a = -1;
    unsigned int b = 1;
    if (a < b) {
        printf("KUCUK");
    } else {
        printf("BUYUK");
    }
    return 0;
}`,
    options: ["BUYUK", "KUCUK", "-1", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "signed int ve unsigned int karşılaştırıldığında signed olan terfi ettirilir. -1 işaretsiz türe dönüşünce UINT_MAX (4294967295) olur. 4294967295 < 1 yanlış olduğundan BUYUK yazdırılır!",
      en: "When comparing signed and unsigned ints, -1 is converted to unsigned int (UINT_MAX, ~4.29 billion). Since UINT_MAX > 1, BUYUK is printed."
    }
  },
  {
    topic: "conditions",
    code: `#include <stdio.h>

int main() {
    float x = 0.1f;
    if (x == 0.1) {
        printf("ESIT");
    } else {
        printf("FARKLI");
    }
    return 0;
}`,
    options: ["FARKLI", "ESIT", "0.1", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "0.1 sabiti double türündedir. IEEE-754 ikilik taban yuvarlama farkı nedeniyle 32-bit float (0.1f) ile 64-bit double (0.1) tam olarak eşit değildir. Çıktı: FARKLI.",
      en: "The literal 0.1 has type double. Due to IEEE-754 precision limits, (double)0.1f does not equal 0.1 exactly, printing FARKLI."
    }
  },
  {
    topic: "preprocessor",
    code: `#include <stdio.h>
#define SQUARE(x) x * x

int main() {
    int res = SQUARE(2 + 3);
    printf("%d", res);
    return 0;
}`,
    options: ["11", "25", "13", "10"],
    answer: 0,
    explanation: {
      tr: "Önişlemci makroları parantezsiz kopyalar: SQUARE(2 + 3) -> 2 + 3 * 2 + 3 = 2 + 6 + 3 = 11.",
      en: "Macro arguments expand textually without parentheses: 2 + 3 * 2 + 3 = 2 + 6 + 3 = 11."
    }
  },
  {
    topic: "preprocessor",
    code: `#include <stdio.h>

#define MAX(a, b) ((a) > (b) ? (a) : (b))

int main() {
    int x = 5, y = 3;
    int m = MAX(x++, y);
    printf("%d %d", m, x);
    return 0;
}`,
    options: ["6 7", "5 6", "6 6", "5 7"],
    answer: 0,
    explanation: {
      tr: "MAX(x++, y) ifadesinde x++ iki kez genişler: ((x++) > (y) ? (x++) : (y)). Karşılaştırmada x 6 olur; doğru dal seçilince x++ tekrar çalışır, m 6 olur ve x 7 olur! Çıktı: 6 7.",
      en: "In MAX(x++, y), x++ is evaluated twice: once in the condition (making x 6) and once in the selected true branch, returning 6 for m and incrementing x to 7."
    }
  },
  {
    topic: "preprocessor",
    code: `#include <stdio.h>

#define PTR_D int*
typedef int* ptr_t;

int main() {
    PTR_D a, b;
    ptr_t c, d;
    printf("%d %d", sizeof(b) == sizeof(int*), sizeof(d) == sizeof(int*));
    return 0;
}`,
    options: ["0 1", "1 1", "0 0", "1 0"],
    answer: 0,
    explanation: {
      tr: "PTR_D a, b; ifadesi int* a, b; haline gelir; a işaretçi, b ise int olur (0). typedef ile tanımlanan d ise gerçek bir işaretçidir (1). Çıktı: 0 1.",
      en: "The macro expands to 'int* a, b;' where 'b' is plain int (0). typedef creates a real type alias, making 'd' a pointer (1). Output: 0 1."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int a = 1;
    int b = sizeof(a++);
    printf("%d", a);
    return 0;
}`,
    options: ["1", "2", "4", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "sizeof derleme zamanında tip hesabı yapar ve parantez içindeki ifadelerin yan etkilerini çalışma anında ASLA çalıştırmaz (unevaluated operand). a++ çalışmaz, a 1 kalır.",
      en: "sizeof operands are unevaluated at runtime. a++ is never executed, leaving a at 1."
    }
  },
  {
    topic: "scope",
    code: `#include <stdio.h>

void counter() {
    static int c = 0;
    c++;
    printf("%d ", c);
}

int main() {
    counter();
    counter();
    counter();
    return 0;
}`,
    options: ["1 2 3 ", "1 1 1 ", "0 1 2 ", "3 2 1 "],
    answer: 0,
    explanation: {
      tr: "static yerel değişkenler yalnızca bir kez başlatılır ve fonksiyon çağrıları arasında değerlerini korurlar. Çıktı: 1 2 3 .",
      en: "static local variables are initialized once and preserve their state between calls. Output: 1 2 3 ."
    }
  },
  {
    topic: "variables",
    code: `#include <stdio.h>

int main() {
    int a = 5, b = 20;
    const int *p = &a;
    p = &b;
    printf("%d", *p);
    return 0;
}`,
    options: ["20", "5", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "const int *p sabit bir tamsayıya işaretçidir. *p üzerinden değer değiştirilemez, ancak p işaretçisinin gösterdiği adres (p = &b) serbestçe değiştirilebilir. Çıktı: 20.",
      en: "const int *p is a pointer to const int. The pointed-to value cannot be modified through p, but p itself can be reassigned: 20."
    }
  },
  {
    topic: "functions",
    code: `#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    int (*fp)(int, int) = add;
    printf("%d", fp(5, 7));
    return 0;
}`,
    options: ["12", "Adres değeri", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "fp iki tamsayı alıp tamsayı dönen bir fonksiyon işaretçisidir (function pointer). fp(5, 7) add(5, 7) yi çağırır ve 12 basar.",
      en: "fp is a function pointer pointing to add. fp(5, 7) invokes add(5, 7), returning 12."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}

int main() {
    int a = 10, b = 20;
    swap(&a, &b);
    printf("%d %d", a, b);
    return 0;
}`,
    options: ["20 10", "10 20", "10 10", "20 20"],
    answer: 0,
    explanation: {
      tr: "swap fonksiyonuna adresler (&a, &b) iletildiği için fonksiyon çağrılan yerdeki bellek hücrelerini doğrudan değiştirir. Çıktı: 20 10.",
      en: "Addresses &a and &b are passed to swap, modifying caller memory via pointers. Output: 20 10."
    }
  },
  {
    topic: "arrays",
    code: `#include <stdio.h>

int main() {
    int matrix[2][3] = {{1, 2, 3}, {4, 5, 6}};
    printf("%d", *(*(matrix + 1) + 2));
    return 0;
}`,
    options: ["6", "5", "4", "3"],
    answer: 0,
    explanation: {
      tr: "matrix + 1 ikinci satırı {4, 5, 6} gösterir. *(matrix + 1) satırın başlangıç adresidir, + 2 eklenip dereference edildiğinde matrix[1][2] = 6 elde edilir.",
      en: "matrix + 1 points to row 1. Adding 2 advances to column 2 (element 6). Dereferencing yields 6."
    }
  },
  {
    topic: "structs",
    code: `#include <stdio.h>

struct Node {
    int data;
    struct Node *next;
};

int main() {
    struct Node b = {20, NULL};
    struct Node a = {10, &b};
    printf("%d", a.next->data);
    return 0;
}`,
    options: ["20", "10", "Adres", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "a.next b'nin adresini tutar. Ok operatörü (->) işaretçiyi dereference edip data üyesine erişir: 20.",
      en: "a.next points to b. Arrow operator (->) dereferences the pointer to access member data: 20."
    }
  },
  {
    topic: "structs",
    code: `#include <stdio.h>

union Data {
    int i;
    char c;
};

int main() {
    union Data d;
    d.i = 65;
    printf("%c", d.c);
    return 0;
}`,
    options: ["A", "65", "Tanımsız", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "union üyeleri aynı bellek alanını paylaşır. d.i = 65 yazıldığında bellekteki ilk bayt 65 (ASCII 'A') olur. d.c okunduğunda 'A' basılır.",
      en: "Union members share memory. Setting d.i = 65 writes ASCII 65 ('A') into the shared byte, printing 'A'."
    }
  },
  {
    topic: "variables",
    code: `#include <stdio.h>

enum Color { RED, GREEN = 5, BLUE };

int main() {
    printf("%d %d", RED, BLUE);
    return 0;
}`,
    options: ["0 6", "0 2", "1 6", "0 5"],
    answer: 0,
    explanation: {
      tr: "enum değerleri belirtilmediğinde 0'dan başlar (RED = 0). GREEN 5 yapıldığında sonraki elemanlar birer artarak devam eder (BLUE = 6). Çıktı: 0 6.",
      en: "Enum values start at 0 by default (RED = 0). Subsequent unassigned values increment from the previous (GREEN = 5, so BLUE = 6)."
    }
  },
  {
    topic: "bitwise",
    code: `#include <stdio.h>

int main() {
    int n = 16;
    if ((n & (n - 1)) == 0) {
        printf("EVET");
    } else {
        printf("HAYIR");
    }
    return 0;
}`,
    options: ["EVET", "HAYIR", "0", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "(n & (n - 1)) == 0 ifadesi bir sayının 2'nin kuvveti olup olmadığını kontrol eden klasik C bitwise deyimidir. 16 (10000) & 15 (01111) = 0 olduğundan EVET basılır.",
      en: "(n & (n - 1)) == 0 tests if n is a power of 2. 16 & 15 is 0, so EVET is printed."
    }
  },
  {
    topic: "bitwise",
    code: `#include <stdio.h>

int main() {
    int x = 0;
    printf("%d", ~x);
    return 0;
}`,
    options: ["-1", "0", "1", "255"],
    answer: 0,
    explanation: {
      tr: "Bitwise NOT (~) operatörü tüm bitleri 1 yapar. İkiye tümleyen (two's complement) tamsayı sisteminde tüm bitleri 1 olan sayı kesin olarak -1'dir.",
      en: "Bitwise NOT (~) flips all bits. In two's complement representation, all bits set to 1 represents -1."
    }
  },
  {
    topic: "structs",
    code: `#include <stdio.h>

struct Point {
    int x;
    int y;
    int z;
};

int main() {
    struct Point p = { .y = 20 };
    printf("%d %d %d", p.x, p.y, p.z);
    return 0;
}`,
    options: ["0 20 0", "Tanımsız / Çöp değerler", "20 0 0", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "C99 ve sonrasında belirlenmiş başlatıcı (designated initializer) ile kısmen başlatılan yapılarda, açıkça yazılmayan tüm diğer üyeler kesin olarak SIFIR ile doldurulur. Çıktı: 0 20 0.",
      en: "In C99+, unmentioned members in designated initializers are guaranteed to be zero-filled: 0 20 0."
    }
  },
  {
    topic: "functions",
    code: `#include <stdio.h>

void solve(int n) {
    if (n == 0) return;
    solve(n - 1);
    printf("%d", n);
}

int main() {
    solve(3);
    return 0;
}`,
    options: ["123", "321", "3", "0123"],
    answer: 0,
    explanation: {
      tr: "printf özyinelemeli çağrıdan sonra yer alır (backtracking/post-order). En derin çağrı (n=1) ilk yazdırılır, sonra 2, sonra 3: 123.",
      en: "printf executes after recursive unwinding. Deepest frame (n=1) prints first, producing 123."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int a = (1, 2, 3);
    printf("%d", a);
    return 0;
}`,
    options: ["3", "1", "2", "6"],
    answer: 0,
    explanation: {
      tr: "Virgül operatörü soldan sağa çalışır ve en sağdaki ifadenin değerini döner: a = 3.",
      en: "The comma operator evaluates operands left to right and returns the value of the rightmost expression: 3."
    }
  },
  {
    topic: "loops",
    code: `#include <stdio.h>

int main() {
    int i, j;
    for (i = 0, j = 0; i < 3; i++, j += 2);
    printf("%d %d", i, j);
    return 0;
}`,
    options: ["3 6", "2 4", "3 4", "0 0"],
    answer: 0,
    explanation: {
      tr: "for başlığındaki noktalı virgül yüzünden döngü gövdesi boştur. i 3 olduğunda döngüden çıkılır ve j 6 olur. Çıktı: 3 6.",
      en: "The semicolon creates an empty loop body. Loop terminates when i reaches 3 with j = 6. Output: 3 6."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int a = 42;
    int *p = &a;
    int **pp = &p;
    printf("%d", **pp);
    return 0;
}`,
    options: ["42", "Adres değeri", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "pp çift işaretçidir (pointer to pointer). *pp p işaretçisine, **pp ise a'nın değerine (42) ulaşır.",
      en: "pp is a double pointer. Dereferencing twice (**pp) retrieves the integer value 42."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int x = 100;
    void *vp = &x;
    printf("%d", *(int*)vp);
    return 0;
}`,
    options: ["100", "Adres", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "void* türü doğrudan dereference edilemez; ancak (int*) türüne dönüştürüldükten (cast) sonra tamsayı değeri 100 okunabilir.",
      en: "void* cannot be directly dereferenced. Casting to (int*) allows dereferencing to read 100."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int *p = NULL;
    if (!p) {
        printf("NULL");
    } else {
        printf("VALID");
    }
    return 0;
}`,
    options: ["NULL", "VALID", "Çökme (Crash)", "Hata"],
    answer: 0,
    explanation: {
      tr: "C'de NULL işaretçi mantıksal olarak 0 (false) değerindedir. !p ifadesi doğru (1) olur ve NULL basılır.",
      en: "A NULL pointer evaluates to false (0). The logical NOT !p evaluates to true (1), printing NULL."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int x = -7;
    int y = 3;
    printf("%d", x % y);
    return 0;
}`,
    options: ["-1", "2", "1", "-2"],
    answer: 0,
    explanation: {
      tr: "C99 standardına göre tamsayı bölmesi sıfıra doğru yuvarlanır ve modül (%) kalanı daima bölünenin (sol terim) işaretini taşır. -7 % 3 = -1.",
      en: "In C99+, integer division truncates toward zero and the remainder takes the sign of the dividend: -7 % 3 = -1."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    char s[] = "C-Language";
    char *p = s;
    while (*p != '-') {
        p++;
    }
    printf("%td", p - s);
    return 0;
}`,
    options: ["1", "2", "0", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "s[0] 'C', s[1] '-' dir. p '-' karakterini gösterdiğinde p - s farkı indeks 1 - 0 = 1 verir.",
      en: "Index 0 is 'C' and index 1 is '-'. The pointer difference p - s yields index 1."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int a = 10, b = 20, c = 30;
    int x = (a > b) ? a : (b > c) ? b : c;
    printf("%d", x);
    return 0;
}`,
    options: ["30", "20", "10", "1"],
    answer: 0,
    explanation: {
      tr: "İç içe ternary operatörleri sağdan sola ilişkilendirilir. (10 > 20) yanlış olduğundan sağdaki (20 > 30 ? 20 : 30) çalışır ve 30 döner.",
      en: "Chained ternary operators associate right-to-left. 10 > 20 is false, evaluating (20 > 30 ? 20 : 30) = 30."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int n = printf("%d", printf("C"));
    return 0;
}`,
    options: ["C1", "C", "11", "C2"],
    answer: 0,
    explanation: {
      tr: "printf() ekrana yazdırdığı karakter sayısını döndürür. İçteki printf(\"C\") 'C' yazar ve 1 döner. Dıştaki printf bu 1'i yazar: C1.",
      en: "printf returns the number of characters printed. Inner printf(\"C\") prints 'C' and returns 1. Outer printf prints 1: C1."
    }
  },
  {
    topic: "strings",
    code: `#include <stdio.h>

int main() {
    char a[] = "hello";
    char b[] = "hello";
    printf("%d", a == b);
    return 0;
}`,
    options: ["0", "1", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "'==' operatörü string içeriklerini DEĞİL, dizilerin bellek adreslerini karşılaştırır. a ve b stack'te ayrı diziler olduğundan adresleri farklıdır (0).",
      en: "'==' compares array memory addresses, not their contents. Since a and b are separate stack arrays, a == b is 0 (false)."
    }
  }
];

fs.writeFileSync(
  path.join(__dirname, "intermediate_questions.js"),
  "module.exports = " + JSON.stringify(intermediateQuestions, null, 2) + ";\n",
  "utf8"
);
console.log("Intermediate questions written successfully: " + intermediateQuestions.length);

const advancedQuestions = [
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *p1 = (int*)(&arr + 1);
    printf("%d", *(p1 - 1));
    return 0;
}`,
    options: ["50", "10", "Tanımsız Davranış", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "&arr tüm diziye işaret eden bir işaretçidir (int (*)[5]). (&arr + 1) tüm diziyi (5 int = 20 bayt) aşar. (int*) dönüşümünden sonra 1 çıkarıldığında son eleman olan arr[4]'e (50) geri döner.",
      en: "&arr is a pointer to the entire array of 5 ints. (&arr + 1) skips the whole array. Subtracting 1 from (p1 - 1) points back to the last element arr[4] (50)."
    }
  },
  {
    topic: "strings",
    code: `#include <stdio.h>

int main() {
    char *s = "Merhaba";
    s[0] = 'm';
    printf("%s", s);
    return 0;
}`,
    options: ["Tanımsız Davranış / Çökme (Segmentation Fault)", "merhaba", "Merhaba", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "String sabitleri (\"Merhaba\") salt okunur bellek alanında (.rodata) saklanır. char* işaretçisi üzerinden bu alanı değiştirmeye çalışmak Tanımsız Davranıştır ve çökmeye (SIGSEGV) yol açar.",
      en: "String literals are stored in read-only memory (.rodata). Modifying a string literal via pointer invokes Undefined Behavior (usually Segmentation Fault)."
    }
  },
  {
    topic: "structs",
    code: `#include <stdio.h>

struct S {
    char a;
    int b;
    char c;
};

int main() {
    printf("%lu", sizeof(struct S));
    return 0;
}`,
    options: ["12 (veya hizalamaya göre 6'dan büyük)", "6", "8", "16"],
    answer: 0,
    explanation: {
      tr: "Derleyici donanım erişim hızını optimize etmek için bayt hizalaması (padding) yapar. int üyesinin 4 baytlık sınıra yerleşmesi için a'dan sonra 3 bayt, c'den sonra 3 bayt dolgu eklenir: 1 + 3 + 4 + 1 + 3 = 12 bayt.",
      en: "Data structure padding aligns members to memory word boundaries. Padding bytes are inserted after char 'a' (3 bytes) and 'c' (3 bytes), totaling 12 bytes."
    }
  },
  {
    topic: "arrays",
    code: `#include <stdio.h>

int main() {
    int a[2][2] = { (1, 2), (3, 4) };
    printf("%d %d", a[0][0], a[0][1]);
    return 0;
}`,
    options: ["2 4", "1 2", "1 3", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "Parantezler (1, 2) ve (3, 4) virgül operatörlü ifadelerdir! (1, 2) 2 değerini, (3, 4) ise 4 değerini döner. Dizi {2, 4} ile başlatılmış gibi olur; a[0][0] = 2 ve a[0][1] = 4 olur.",
      en: "(1, 2) and (3, 4) are comma expressions in parentheses, evaluating to 2 and 4. The array is initialized as {2, 4}, setting a[0][0]=2 and a[0][1]=4."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int a[2][2] = {{1, 2}, {3, 4}};
    int (*p)[2] = a;
    printf("%d", *(*(p + 1) + 0));
    return 0;
}`,
    options: ["3", "1", "2", "4"],
    answer: 0,
    explanation: {
      tr: "p 2 elemanlı int dizisine bir işaretçidir (int (*)[2]). p + 1 bir tam satır (2 int) ileri atlayarak ikinci satırı ({3, 4}) gösterir. Dereference edildiğinde 3 elde edilir.",
      en: "p is a pointer to an array of 2 ints. p + 1 skips an entire row to point to {3, 4}. Dereferencing yields 3."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    char *c[] = {"ARENA", "C", "PRO"};
    char **cp[] = {c + 2, c + 1, c};
    char ***cpp = cp;
    printf("%s", **++cpp);
    return 0;
}`,
    options: ["C", "ARENA", "PRO", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "++cpp işaretçiyi cp[1]'e ilerletir. cp[1] c + 1'i tutar (*++cpp = c + 1). İkinci dereference (**++cpp) c[1] string'i olan \"C\" yi verir.",
      en: "++cpp points to cp[1] (which stores c + 1). Dereferencing twice accesses c[1], printing \"C\"."
    }
  },
  {
    topic: "preprocessor",
    code: `#include <stdio.h>
#define STR(x) #x

int main() {
    printf("%s", STR(ArenaC));
    return 0;
}`,
    options: ["ArenaC", "x", "\"ArenaC\"", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "# önişlemci operatörü (stringizing) parametreyi doğrudan çift tırnaklı bir string sabitine dönüştürür. STR(ArenaC) -> \"ArenaC\" olur.",
      en: "The stringizing operator (#) turns the macro argument into a string literal. STR(ArenaC) expands to \"ArenaC\"."
    }
  },
  {
    topic: "preprocessor",
    code: `#include <stdio.h>
#define CONCAT(a, b) a ## b

int main() {
    int xy = 100;
    printf("%d", CONCAT(x, y));
    return 0;
}`,
    options: ["100", "xy", "Derleme hatası", "0"],
    answer: 0,
    explanation: {
      tr: "## operatörü (token pasting) x ve y belirteçlerini birleştirerek 'xy' değişken adını oluşturur. xy'nin değeri 100 yazdırılır.",
      en: "Token pasting (##) merges tokens x and y into identifier xy, printing 100."
    }
  },
  {
    topic: "structs",
    code: `#include <stdio.h>

struct Flags {
    int a : 1;
};

int main() {
    struct Flags f;
    f.a = 1;
    printf("%d", f.a);
    return 0;
}`,
    options: ["-1 (veya 1)", "1", "0", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "1 bitlik işaretli tamsayıda (signed int a : 1) en yüksek bit işaret bitidir. 1 yazıldığında ikiye tümleyen sistemde bu -1 anlamına gelir. (unsigned int a:1 olsaydı 1 olurdu).",
      en: "In a 1-bit signed bit-field, the single bit is the sign bit. Storing 1 represents -1 in two's complement."
    }
  },
  {
    topic: "memory",
    code: `#include <stdio.h>

int* get_stack_ptr() {
    int x = 42;
    return &x;
}

int main() {
    int *p = get_stack_ptr();
    printf("%d", p != NULL);
    return 0;
}`,
    options: ["1 (ancak dereference etmek UB)", "0", "Derleme hatası", "Çökme"],
    answer: 0,
    explanation: {
      tr: "x yerel bir stack değişkenidir ve fonksiyon bitince stack alanı geri alınır. İşaretçinin adresi NULL değildir (1 basar), ancak bu adresteki değeri okumak Tanımsız Davranıştır (Dangling Pointer).",
      en: "Returning the address of a local stack variable returns a non-null pointer, but dereferencing it is Undefined Behavior (Dangling Pointer)."
    }
  },
  {
    topic: "functions",
    code: `#include <stdio.h>

void f(int *p) {
    static int val = 100;
    p = &val;
}

int main() {
    int x = 50;
    int *ptr = &x;
    f(ptr);
    printf("%d", *ptr);
    return 0;
}`,
    options: ["50", "100", "Tanımsız", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "İşaretçiler fonksiyona değerleriyle (adresi kopyalanarak) iletilir. f içinde p'ye yeni adres atanması, main'deki ptr'yi ETKİLEMEZ. Çıktı: 50.",
      en: "Pointers are passed by value. Reassigning local pointer 'p' inside f() does not change caller pointer 'ptr'. Output: 50."
    }
  },
  {
    topic: "functions",
    code: `#include <stdio.h>

void f(int **pp) {
    static int val = 100;
    *pp = &val;
}

int main() {
    int x = 50;
    int *ptr = &x;
    f(&ptr);
    printf("%d", *ptr);
    return 0;
}`,
    options: ["100", "50", "Tanımsız", "Hata verir"],
    answer: 0,
    explanation: {
      tr: "main'deki ptr'nin adresi (&ptr) çift işaretçi olarak iletilmiştir. *pp = &val ifadesi doğrudan main'deki ptr işaretçisini günceller. Çıktı: 100.",
      en: "By passing the address of pointer &ptr (double pointer), *pp = &val mutates ptr in main(). Output: 100."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int x = 5;
    int y = (x++, x++, x++);
    printf("%d %d", x, y);
    return 0;
}`,
    options: ["8 7", "8 8", "7 7", "Tanımsız Davranış"],
    answer: 0,
    explanation: {
      tr: "Virgül operatörü her ifadeden sonra kesin bir sequence point oluşturur! x 6, sonra 7 olur. Üçüncü x++ y'ye 7 verir ve x'i 8 yapar. Çıktı: 8 7.",
      en: "The comma operator enforces sequence points. x increments to 6, then 7. The third expression evaluates to 7 (assigned to y) and increments x to 8. Output: 8 7."
    }
  },
  {
    topic: "conditions",
    code: `#include <stdio.h>

int main() {
    int x = 10;
    if (1 < x < 5) {
        printf("DOGRU");
    } else {
        printf("YANLIS");
    }
    return 0;
}`,
    options: ["DOGRU", "YANLIS", "Sözdizimi hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C'de ilişkisel operatörler soldan sağa çalışır: (1 < x) doğru olduğu için 1 üretir. Ardından (1 < 5) değerlendirilir; bu da doğru (1) olduğu için DOGRU basılır!",
      en: "Relational operators associate left-to-right: (1 < x) is true (1). Then (1 < 5) is also true (1), printing DOGRU."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int a = 0;
    int b = 1;
    if (a++ && (b = 5)) {
        b += 10;
    }
    printf("%d %d", a, b);
    return 0;
}`,
    options: ["1 1", "1 5", "0 1", "1 15"],
    answer: 0,
    explanation: {
      tr: "a++ önce 0 değerini döner (ardından a 1 olur). && operatöründe sol taraf 0 olduğundan kısa devre gerçekleşir ve sağdaki (b = 5) ASLA çalışmaz! b 1 kalır.",
      en: "a++ returns 0 first (then increments a to 1). Left operand being 0 causes short-circuiting, so (b = 5) never executes. b remains 1."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40};
    int *p = arr + 1;
    printf("%d", p[2] - p[-1]);
    return 0;
}`,
    options: ["30", "20", "40", "Tanımsız Davranış"],
    answer: 0,
    explanation: {
      tr: "p arr[1]'i (20) gösterir. p[2] *(p + 2) = arr[3] = 40'tır. p[-1] *(p - 1) = arr[0] = 10'dur. 40 - 10 = 30.",
      en: "p points to arr[1] (20). p[2] is arr[3] (40), and p[-1] is arr[0] (10). 40 - 10 = 30."
    }
  },
  {
    topic: "arrays",
    code: `#include <stdio.h>

#define COUNT(a) (sizeof(a) / sizeof((a)[0]))

void check(int a[10]) {
    printf("%d", (int)COUNT(a) == 10);
}

int main() {
    int arr[10];
    check(arr);
    return 0;
}`,
    options: ["0 (Dizi fonksiyonda işaretçiye dönüştü)", "1 (Boyut 10)", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "Fonksiyon parametresi 'int a[10]' işaretçiye ('int *a') dönüşür. check içinde sizeof(a) işaretçi boyutunu (8 bayt) verir. 8/4 = 2 != 10 olduğundan 0 basılır.",
      en: "Array parameters decay to pointers. Inside check(), sizeof(a) yields pointer size (8 bytes), so COUNT(a) evaluates to 2 != 10, printing 0."
    }
  },
  {
    topic: "scope",
    code: `#include <stdio.h>

int a = 5;

int main() {
    int a = 10;
    {
        extern int a;
        printf("%d ", a);
    }
    printf("%d", a);
    return 0;
}`,
    options: ["5 10", "10 10", "5 5", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "Blok içindeki 'extern int a;' bildirimi yerel a'yı görmezden gelerek global kapsamdaki a'ya (5) başvurur. Blok çıkışında yerel a (10) basılır. Çıktı: 5 10.",
      en: "'extern int a;' inside the block links to the file-scope global variable (5). Outside the block, the local variable (10) is printed: 5 10."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int x = 5;
    int *p1 = &x;
    int *p2 = p1;
    *p2 = 15;
    printf("%d", *p1);
    return 0;
}`,
    options: ["15", "5", "Adres", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "p1 ve p2 aynı bellek adresini (&x) işaret eder (aliasing). p2 üzerinden yapılan değişiklik p1 dereference edildiğinde de görülür: 15.",
      en: "p1 and p2 point to the same memory location (&x). Modifying through *p2 updates x, which *p1 reads as 15."
    }
  },
  {
    topic: "preprocessor",
    code: `#include <stdio.h>
#define PRINT(s) printf(#s " = %d\\n", s)

int main() {
    int val = 42;
    PRINT(val);
    return 0;
}`,
    options: ["val = 42", "42 = 42", "#val = 42", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "#s stringizing ile \"val\" olur. Bitişik string birleştirmesi ile format stringi \"val\" \" = %d\\n\" haline gelir. Çıktı: val = 42.",
      en: "#s stringizes parameter to \"val\". Adjacent string literals concatenate to \"val = %d\\n\", printing val = 42."
    }
  },
  {
    topic: "arrays",
    code: `#include <stdio.h>

int main() {
    int arr[] = {[2] = 5, [0] = 1};
    printf("%d %d %d", arr[0], arr[1], arr[2]);
    return 0;
}`,
    options: ["1 0 5", "5 0 1", "1 5 0", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "C99 Belirlenmiş Başlatıcılar (Designated Initializers) özelliği ile elemanlar indeksleriyle başlatılabilir. Belirtilmeyen indeksler (arr[1]) otomatik olarak 0 olur. Çıktı: 1 0 5.",
      en: "C99 designated array initializers permit setting indices explicitly. Unmentioned elements (arr[1]) are zero-filled: 1 0 5."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int a = 1, b = 2;
    int c = a > b ? a : (a = 10, b = 20, a + b);
    printf("%d %d", c, a);
    return 0;
}`,
    options: ["30 10", "2 1", "30 1", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "a > b yanlış olduğundan iki nokta üst üsteden sonraki virgüllü ifade değerlendirilir: a=10, b=20 yapılır ve a + b = 30 değeri c'ye atanır. Çıktı: 30 10.",
      en: "a > b is false, evaluating the comma expression: a=10, b=20, and c receives 30. Output: 30 10."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int a = 10;
    int * const p = &a;
    *p = 20;
    printf("%d", *p);
    return 0;
}`,
    options: ["20", "10", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "'int * const p' sabit bir işaretçidir (constant pointer). p'nin tuttuğu adres değiştirilemez, ancak işaret ettiği değer (*p = 20) serbestçe değiştirilebilir.",
      en: "'int * const p' is a const pointer to mutable int. The address in p cannot change, but *p can be mutated: 20."
    }
  },
  {
    topic: "structs",
    code: `#include <stdio.h>

struct Point { int x; int y; };

int main() {
    struct Point p1 = {10, 20};
    struct Point p2 = p1;
    p2.x = 99;
    printf("%d %d", p1.x, p2.x);
    return 0;
}`,
    options: ["10 99", "99 99", "10 20", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "C'de struct ataması yüzeysel kopyalama (shallow copy) yapar; tüm baytlar p2'ye kopyalanır. p2.x'in değiştirilmesi p1'i etkilemez. Çıktı: 10 99.",
      en: "Struct assignment copies all member bytes by value. Mutating p2.x does not alter p1.x. Output: 10 99."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int a[4] = {1, 2, 3, 4};
    printf("%d", (void*)a == (void*)&a);
    return 0;
}`,
    options: ["1", "0", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "a (ilk elemanın adresi) ile &a (tüm dizinin adresi) bellekte aynı byte konumuna işaret eder. Türleri farklı olsa da void* olarak karşılaştırıldığında adresler eşittir (1).",
      en: "Both 'a' and '&a' evaluate to the same starting memory address. Cast to void*, they are equal (1)."
    }
  },
  {
    topic: "functions",
    code: `#include <stdio.h>

int f(int a, int b) { return a * b; }

int main() {
    int (*op)(int, int) = &f;
    printf("%d", (*op)(3, 4));
    return 0;
}`,
    options: ["12", "7", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C'de fonksiyon işaretçilerini tanımlarken '&f' ile 'f', çağırırken '(*op)' ile 'op' kullanmak tamamen eşdeğerdir. 3 * 4 = 12.",
      en: "In C, (*op)(3, 4) and op(3, 4) are completely equivalent function pointer call syntaxes: 12."
    }
  },
  {
    topic: "bitwise",
    code: `#include <stdio.h>

int main() {
    int a = 1;
    // 32-bit int üzerinde 32 bit sola kaydırma
    int b = a << 32;
    printf("%d", b);
    return 0;
}`,
    options: ["Tanımsız Davranış (Undefined Behavior)", "0", "1", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "C standardına göre bir türün bit genişliğine eşit veya daha büyük miktarda kaydırma yapmak (32-bit int için << 32) kesin olarak Tanımsız Davranıştır (UB).",
      en: "Shifting by a count greater than or equal to the width of the operand is explicitly Undefined Behavior in C."
    }
  },
  {
    topic: "undefined_behavior",
    code: `#include <stdio.h>
#include <limits.h>

int main() {
    int x = INT_MAX;
    printf("%d", x + 1 < x);
    return 0;
}`,
    options: ["Tanımsız Davranış (Undefined Behavior)", "1", "0", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "C standardında işaretli tamsayı taşması (signed integer overflow) Tanımsız Davranıştır (UB). Derleyiciler x + 1 < x kontrolünü UB varsayarak tamamen optimize edebilir.",
      en: "Signed integer overflow invokes Undefined Behavior in C. Optimizers may assume it never occurs."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int x = 2;
    int y = x++ + ++x;
    printf("%d", y);
    return 0;
}`,
    options: ["Tanımsız Davranış (Undefined Behavior)", "6", "7", "8"],
    answer: 0,
    explanation: {
      tr: "Aynı ifadede aralarında bir sequence point olmadan bir skaler değişkeni birden fazla kez değiştirmek (x++ ve ++x) C standardına göre Tanımsız Davranıştır.",
      en: "Modifying a scalar variable more than once between sequence points without synchronization is Undefined Behavior."
    }
  },
  {
    topic: "undefined_behavior",
    code: `#include <stdio.h>

int main() {
    int x = 1;
    x = x++;
    printf("%d", x);
    return 0;
}`,
    options: ["Tanımsız Davranış (Undefined Behavior)", "1", "2", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "x = x++ ifadesinde x değişkeni hem atanmakta hem de artırılmaktadır. İki yan etki arasında sequence point bulunmadığından tanımsız davranıştır.",
      en: "x = x++ attempts unsequenced modification and assignment to the same scalar variable, which is Undefined Behavior."
    }
  },
  {
    topic: "sizeof_types",
    code: `#include <stdio.h>

int main() {
    int i = 2;
    int a = sizeof(int[i++]);
    printf("%d", i);
    return 0;
}`,
    options: ["3 (C99 VLA kuralı)", "2 (sizeof yan etki üretmez)", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C99 standardında VLA (Variable Length Array) türlerinin boyutu derleme zamanında bilinemez; bu nedenle VLA içeren sizeof ifadeleri çalışma anında değerlendirilir ve i++ çalışır: i = 3.",
      en: "In C99+, if sizeof operand is a Variable Length Array, the expression IS evaluated at runtime. i increments to 3."
    }
  },
  {
    topic: "structs",
    code: `#include <stdio.h>

union Test {
    unsigned int x;
    unsigned char bytes[4];
};

int main() {
    union Test t = { .x = 1 };
    printf("%s", t.bytes[0] == 1 ? "Little-Endian" : "Big-Endian");
    return 0;
}`,
    options: ["Little-Endian (x86/ARM yaygın mimarilerde)", "Big-Endian", "Tanımsız", "Hata"],
    answer: 0,
    explanation: {
      tr: "Little-endian sistemlerde en düşük anlamlı bayt (LSB) en düşük adreste saklanır. 1 tamsayısının ilk baytı 1 ise sistem Little-Endian'dır (x86 ve modern ARM işlemciler).",
      en: "In little-endian architectures, the least significant byte is stored at the lowest address. bytes[0] == 1 indicates Little-Endian."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int val = 0xAA;
    unsigned char *p = (unsigned char*)&val;
    printf("%u", *p);
    return 0;
}`,
    options: ["170", "0", "Hata", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C standardında char* ve unsigned char* strict aliasing kuralından muaftır ve ham bellek baytlarını incelemek için kullanılabilir. 0xAA = 170.",
      en: "Character pointers are explicitly exempt from strict aliasing rules. 0xAA equals decimal 170."
    }
  },
  {
    topic: "structs",
    code: `#include <stdio.h>

struct Empty {};

int main() {
    printf("%d", (int)sizeof(struct Empty) >= 0);
    return 0;
}`,
    options: ["1 (Standart C'de boş struct yasaktır, uzantı olarak 0 veya 1)", "0", "Her derleyicide hata", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "ISO C standardında boş struct yasaktır (constraint violation). Ancak GCC ve Clang bunu uzantı olarak kabul eder (sizeof 0 verirken C++'ta 1 verir). Karşılaştırma >= 0 her zaman doğrudur.",
      en: "Empty structs are constraint violations in ISO C, but supported as compiler extensions (GCC yields sizeof 0, C++ yields 1). >= 0 evaluates to 1."
    }
  },
  {
    topic: "strings",
    code: `#include <stdio.h>
#include <string.h>

int main() {
    char str[] = "ArenaC\\0Python";
    printf("%lu %lu", strlen(str), sizeof(str));
    return 0;
}`,
    options: ["6 14", "6 6", "12 14", "14 14"],
    answer: 0,
    explanation: {
      tr: "strlen() ilk '\\0' karakterine kadar sayar (6). sizeof() ise tüm dizi baytlarını ('ArenaC\\0Python\\0' = 14) verir. Çıktı: 6 14.",
      en: "strlen stops at the embedded '\\0' (6). sizeof measures the full initialized array length including the trailing null (14). Output: 6 14."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int arr[2][2] = {{1, 2}, {3, 4}};
    int *p = (int*)arr;
    printf("%d", *(p + 3));
    return 0;
}`,
    options: ["4", "3", "2", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C'de çok boyutlu diziler bellekte satır öncelikli (row-major) olarak bitişik saklanır. (int*)arr diziyi düz bir bellek bloğu olarak görür: index 3 arr[1][1] = 4'tür.",
      en: "Multi-dimensional arrays are stored contiguously in row-major order. Pointer offset +3 reaches arr[1][1] = 4."
    }
  },
  {
    topic: "structs",
    code: `#include <stdio.h>

struct A {
    char c;
    double d;
};

int main() {
    printf("%lu", sizeof(struct A));
    return 0;
}`,
    options: ["16 (veya hizalamaya göre 9'dan büyük)", "9", "8", "12"],
    answer: 0,
    explanation: {
      tr: "double üyesi genellikle 8 baytlık hizalama gerektirir. 1 baytlık char'dan sonra 7 bayt dolgu (padding) eklenir: 1 + 7 + 8 = 16 bayt.",
      en: "double typically requires 8-byte alignment. 7 padding bytes are placed after char 'c', yielding 16 bytes."
    }
  },
  {
    topic: "memory",
    code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p = (int*)malloc(sizeof(int));
    *p = 10;
    p = (int*)malloc(sizeof(int));
    *p = 20;
    printf("%d (bellek sızıntısı ile)", *p);
    free(p);
    return 0;
}`,
    options: ["20 (bellek sızıntısı ile)", "10", "Çökme", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "p işaretçisine yeni malloc adresi atanmadan önce eski bellek bloğu free() edilmemiştir. Eski 10 değeri bellekte kaybolur (memory leak). Yeni bellek 20 değerini basar.",
      en: "Reassigning pointer p without freeing the first allocation causes a memory leak. *p prints 20."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    char *c[] = {"ENTER", "NEW", "POINT", "FIRST"};
    char **cp[] = {c + 3, c + 2, c + 1, c};
    char ***cpp = cp;
    printf("%s", **++cpp);
    return 0;
}`,
    options: ["POINT", "NEW", "ENTER", "FIRST"],
    answer: 0,
    explanation: {
      tr: "++cpp işaretçiyi cp[1]'e götürür. cp[1] c + 2'yi tutar (*++cpp = c + 2). İkinci dereference c[2] string'i olan \"POINT\"'i verir.",
      en: "++cpp points to cp[1] (storing c + 2). Dereferencing twice accesses c[2], yielding \"POINT\"."
    }
  },
  {
    topic: "preprocessor",
    code: `#include <stdio.h>

#define STR(x) #x
#define XSTR(x) STR(x)
#define NUM 42

int main() {
    printf("%s %s", STR(NUM), XSTR(NUM));
    return 0;
}`,
    options: ["NUM 42", "42 42", "NUM NUM", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "# operatörü parametreyi doğrudan string yapar (STR(NUM) -> \"NUM\"). XSTR gibi aracı bir makro kullanıldığında ise önce parametre genişletilir (NUM -> 42), sonra string yapılır (\"42\"). Çıktı: NUM 42.",
      en: "Direct stringizing (#) prevents macro expansion (STR(NUM) -> \"NUM\"). Two-level expansion with XSTR expands NUM to 42 first, then stringizes to \"42\". Output: NUM 42."
    }
  }
];

fs.writeFileSync(
  path.join(__dirname, "advanced_questions.js"),
  "module.exports = " + JSON.stringify(advancedQuestions, null, 2) + ";\n",
  "utf8"
);
console.log("Advanced questions written successfully: " + advancedQuestions.length);

const expertQuestions = [
  {
    topic: "undefined_behavior",
    code: `#include <stdio.h>

int main() {
    int a[] = {1, 2, 3, 4};
    int *p = a;
    printf("%d", *(p++) + *(++p));
    return 0;
}`,
    options: ["Tanımsız Davranış (Undefined Behavior)", "4", "5", "6"],
    answer: 0,
    explanation: {
      tr: "+ operatörünün sol ve sağ terimleri arasında bir sequence point yoktur. p işaretçisinin aynı ifadede aralarında sıralama olmadan birden fazla kez değiştirilmesi C standardına göre Tanımsız Davranıştır.",
      en: "There is no sequence point between the operands of addition. Modifying pointer p multiple times unsequenced is Undefined Behavior."
    }
  },
  {
    topic: "undefined_behavior",
    code: `#include <stdio.h>

int main() {
    int a[5] = {0};
    int i = 1;
    a[i] = i++;
    printf("%d", a[1]);
    return 0;
}`,
    options: ["Tanımsız Davranış (Undefined Behavior)", "1", "2", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "a[i] indeksinin hesaplanması ile i++ yan etkisi arasında bir sequence point yoktur. i hem okunup indeks olarak kullanılmakta hem de artırılmaktadır; bu C standardında unsequenced modification / UB'dir.",
      en: "Evaluating index 'i' in a[i] and modifying 'i' with i++ are unsequenced with respect to each other, resulting in Undefined Behavior."
    }
  },
  {
    topic: "loops",
    code: `#include <stdio.h>

int main() {
    int count = 0;
    int n = 5;
    switch (n % 2) {
        case 0: do { count++;
        case 1:      count++;
                } while (--n > 0);
    }
    printf("%d", count);
    return 0;
}`,
    options: ["6", "5", "10", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "Duff's Device tekniğidir: switch ve do-while iç içe geçmiştir. n=5 (5%2=1) olduğundan case 1'e atlar, count 1 artar. do-while kontrolünde --n 4 olur (>0). Sonraki turlarda gövde baştan akar (case 0 ve 1 her tur 2 artırır). Toplam: 1 + 2 + 2 + 1 = 6.",
      en: "This is Duff's Device: interleaving a switch and do-while. The initial jump to case 1 increments count once, and subsequent loop iterations increment count twice per step, totaling 6."
    }
  },
  {
    topic: "variables",
    code: `#include <stdio.h>

int main() {
    // volatile anahtar kelimesi derleyici optimizasyonunu nasıl etkiler?
    volatile int flag = 1;
    int x = flag;
    int y = flag;
    printf("%d", x == y);
    return 0;
}`,
    options: ["1 (ancak derleyicinin bellek okumalarını önbelleğe almasını/silmesini engeller)", "0", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "volatile niteleyicisi, derleyiciye bu değişkenin donanım veya başka bir thread tarafından her an değiştirilebileceğini bildirir. Derleyici okumaları CPU yazmacında önbelleğe alamaz; her seferinde gerçek bellek adresinden okumak zorundadır.",
      en: "volatile tells the compiler that the variable may change unexpectedly (e.g. hardware/interrupts). The compiler is forbidden from caching or eliding reads from memory."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int f(int a, int b) { return a - b; }

int main() {
    int i = 1;
    printf("%d", f(i++, i++));
    return 0;
}`,
    options: ["Belirlenmemiştir (Unspecified Order of Evaluation)", "1", "-1", "0"],
    answer: 0,
    explanation: {
      tr: "C standardında fonksiyon parametrelerinin soldan sağa mı yoksa sağdan sola mı değerlendirileceği belirlenmemiştir (unspecified order). Derleyiciye göre f(1, 2) veya f(2, 1) olabilir.",
      en: "The evaluation order of function arguments in C is unspecified. It is up to the compiler whether arguments evaluate left-to-right or right-to-left."
    }
  },
  {
    topic: "variables",
    code: `#include <stdio.h>

int main() {
    char c = 200;
    if (c == 200) {
        printf("ESIT");
    } else {
        printf("FARKLI");
    }
    return 0;
}`,
    options: ["Platforma / Derleyiciye bağlı (signed char ise FARKLI)", "Her zaman ESIT", "Her zaman FARKLI", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "C standardında düz 'char' türünün signed mı yoksa unsigned mı olduğu platforma/derleyiciye bağlıdır (implementation-defined). x86'da varsayılan signed char'dır ve 200 taşarak -56 olur; int'e terfide -56 != 200 olduğundan FARKLI basılır.",
      en: "Whether plain 'char' is signed or unsigned is implementation-defined. On platforms where char is signed, 200 overflows to -56, which does not equal 200 when promoted to int."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    const int a = 10;
    int *p = (int*)&a;
    *p = 50;
    printf("%d", a);
    return 0;
}`,
    options: ["Tanımsız Davranış (Undefined Behavior)", "50", "10", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "Orijinal olarak 'const' olarak tanımlanmış bir nesnenin const niteleyicisini cast ile kaldırıp üzerine yazmak C standardında kesin olarak Tanımsız Davranıştır (UB). Nesne salt okunur bellekte olabilir.",
      en: "Modifying an object originally defined as const by casting away its constness is Undefined Behavior in C."
    }
  },
  {
    topic: "bitwise",
    code: `#include <stdio.h>

int main() {
    int x = -1;
    // C'de negatif işaretli sayıların sağa kaydırılması:
    printf("%d", (x >> 1) == -1);
    return 0;
}`,
    options: ["Uygulamaya bağlı (Implementation-defined: genellikle aritmetik shift ile 1 döner)", "Her zaman 0", "Tanımsız Davranış", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "Negatif işaretli tamsayıların sağa kaydırılması C standardında uygulamaya bağlıdır (implementation-defined). Çoğu modern derleyici aritmetik shift yaparak işaret bitini korur (-1 kalır ve 1 basar), ancak mantıksal shift yapan sistemler de geçerlidir.",
      en: "Right-shifting a negative signed integer is implementation-defined in C. Most systems perform arithmetic shift (preserving sign bits, resulting in -1), but logical shift is also permitted."
    }
  },
  {
    topic: "functions",
    code: `#include <stdio.h>

int f(int a, int b) { return a + b; }

int main() {
    printf("%d", (***f)(2, 3));
    return 0;
}`,
    options: ["5", "Derleme hatası", "Adres", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C dilinde bir fonksiyon adı otomatik olarak işaretçiye dönüştüğü ve dereference edilen fonksiyon işaretçisi tekrar fonksiyona dönüştüğü için (***f)(2, 3) ile f(2, 3) tamamen geçerli ve eşdeğerdir: 5.",
      en: "Function pointer dereferencing decays right back to a function pointer. Therefore (*f), (**f), and (***f) are completely equivalent to f(2, 3), yielding 5."
    }
  },
  {
    topic: "sizeof_types",
    code: `#include <stdio.h>

int main() {
    int n = 5;
    // C99 VLA (Variable Length Array) ve sizeof kuralı:
    sizeof(int[n++]);
    printf("%d", n);
    return 0;
}`,
    options: ["6 (VLA boyutu için n++ çalıştırılır)", "5 (sizeof yan etki üretmez)", "Derleme hatası", "Tanımsız Davranış"],
    answer: 0,
    explanation: {
      tr: "ISO C99 §6.5.3.4p2 maddesine göre: sizeof normalde ifadeleri derleme zamanında tip tespiti için kullanır ve yan etkilerini ÇALIŞTIRMAZ. ANCAK operand bir VLA türü ise, dizi boyutunun çalışma anında hesaplanması zorunlu olduğundan n++ ÇALIŞTIRILIR! n = 6 olur.",
      en: "Per ISO C99 §6.5.3.4p2: sizeof is usually unevaluated, EXCEPT when the operand is a Variable Length Array (VLA). In that case, the size expression IS evaluated at runtime, incrementing n to 6."
    }
  },
  {
    topic: "scope",
    code: `#include <stdio.h>

// Dosya kapsamında aynı değişkenin birden fazla bildirimi:
int x;
int x;
int x = 10;

int main() {
    printf("%d", x);
    return 0;
}`,
    options: ["10 (C'de geçerli 'tentative definition', C++'ta derleme hatası)", "Derleme hatası", "0", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C dilinde dosya kapsamındaki başlatıcısız bildirimler 'deneme bildirimi' (tentative definition) kabul edilir ve tek bir başlatıcı ile birleşebilir. C'de tamamen geçerlidir; C++'ta ise yeniden tanımlama hatasıdır.",
      en: "In C, file-scope uninitialized declarations are 'tentative definitions' that merge with a single initializer. This is valid in C, but a redefinition error in C++."
    }
  },
  {
    topic: "undefined_behavior",
    code: `#include <stdio.h>

int main() {
    float f = 5.0f;
    int *p = (int*)&f;
    printf("%d", *p != 0);
    return 0;
}`,
    options: ["Tanımsız Davranış (Strict Aliasing ihlali)", "1", "0", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "ISO C Strict Aliasing kuralına göre, bir nesnenin belleğine uyumsuz bir türün işaretçisi üzerinden erişmek (float nesnesini int* ile dereference etmek) Tanımsız Davranıştır (UB). Derleyiciler bu iki işaretçinin çakışmayacağını varsayarak kod üretir.",
      en: "Dereferencing a float through an int* pointer violates the C Strict Aliasing Rule, which is Undefined Behavior."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int a = 0x12345678;
    char *p = (char*)&a;
    printf("0x%x", (unsigned char)*p);
    return 0;
}`,
    options: ["0x78 (Little-Endian) veya 0x12 (Big-Endian)", "0x12345678", "0x34", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "x86/ARM gibi Little-Endian mimarilerde en düşük anlamlı bayt (0x78) ilk adreste saklanır. Big-Endian mimarilerde ise en yüksek anlamlı bayt (0x12) saklanır. char* ile nesne temsili incelemek standartça serbesttir.",
      en: "On little-endian systems, the least significant byte (0x78) is stored at the lowest address. Inspecting raw bytes via char* is standard-compliant."
    }
  },
  {
    topic: "undefined_behavior",
    code: `#include <stdio.h>
#include <limits.h>

int main() {
    int x = INT_MIN;
    int y = -x;
    printf("%d", y > 0);
    return 0;
}`,
    options: ["Tanımsız Davranış (İşaretli taşma)", "1", "0", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "İkiye tümleyen sistemlerde |INT_MIN| değeri INT_MAX'tan 1 fazladır. Dolayısıyla -INT_MIN pozitif int olarak temsil edilemez ve işaretli taşmaya (signed overflow) yol açar; bu da C standardında tanımsız davranıştır.",
      en: "In two's complement, -INT_MIN exceeds INT_MAX by 1 and cannot be represented in a signed int. Negating INT_MIN causes signed overflow (Undefined Behavior)."
    }
  },
  {
    topic: "undefined_behavior",
    code: `#include <stdio.h>

int main() {
    int x;
    printf("%d", x == x);
    return 0;
}`,
    options: ["Tanımsız / Belirsiz (Uninitialized Variable)", "Her zaman 1", "Her zaman 0", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "Başlatılmamış otomatik yerel değişkenlerin okunması tanımsız davranıştır veya belirsiz (indeterminate) değer döner; hatta bazı donanımlarda tuzak gösterimi (trap representation) tetikleyebilir.",
      en: "Reading an uninitialized local variable yields an indeterminate value and can be Undefined Behavior (or trap representation on certain architectures)."
    }
  },
  {
    topic: "structs",
    code: `#include <stdio.h>

struct Packet {
    int len;
    char data[];
};

int main() {
    printf("%d", (int)sizeof(struct Packet) == (int)sizeof(int));
    return 0;
}`,
    options: ["1 (Esnek dizi boyuta dahil edilmez)", "0", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C99 Esnek Dizi Üyesi (Flexible Array Member) kuralına göre, struct sonundaki char data[] üyesi sizeof(struct Packet) hesabına katılmaz; yalnızca önceki üyelerin boyutu ve hizalaması hesaplanır: 1.",
      en: "In C99+, the flexible array member at the end of a struct contributes zero size to sizeof(struct Packet). The comparison evaluates to 1."
    }
  },
  {
    topic: "structs",
    code: `#include <stdio.h>

struct S {
    int a;
};

int main() {
    struct S s = { .a = 1, .a = 2 };
    printf("%d", s.a);
    return 0;
}`,
    options: ["2 (Son yazılan değer geçerlidir)", "1", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C99 §6.7.8 maddesine göre belirlenmiş başlatıcı listesinde aynı üye birden fazla kez başlatılırsa, listenin en sonundaki başlatma geçerli olur. s.a = 2 yazdırılır.",
      en: "Per ISO C99 §6.7.8, if a designated initializer specifies the same member multiple times, the last initialization overrides earlier ones: 2."
    }
  },
  {
    topic: "conditions",
    code: `#include <stdio.h>

int main() {
    double nan = 0.0 / 0.0;
    if (nan == nan) {
        printf("ESIT");
    } else {
        printf("FARKLI");
    }
    return 0;
}`,
    options: ["FARKLI (NaN kendisine bile eşit değildir)", "ESIT", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "IEEE-754 kayan nokta standardında NaN (Not-a-Number) değeri benzersiz bir özelliğe sahiptir: Kendisi de dahil hiçbir değere eşit DEĞİLDİR (nan == nan her zaman false'tur). Çıktı: FARKLI.",
      en: "By IEEE-754 floating-point specification, NaN compares unequal to everything, including itself (nan == nan is false). Output: FARKLI."
    }
  },
  {
    topic: "bitwise",
    code: `#include <stdio.h>

int main() {
    unsigned int x = 0x80000001;
    // 32-bit dairesel sola döndürme (rotate left 1 bit):
    unsigned int r = (x << 1) | (x >> 31);
    printf("%u", r);
    return 0;
}`,
    options: ["3", "1", "2", "0"],
    answer: 0,
    explanation: {
      tr: "x = 1000...0001 ikilik düzenindedir. (x << 1) en soldaki biti dışarı atıp en sağı 0 yapar (000...0010). (x >> 31) ise en soldaki 1 bitini en sağa taşır (000...0001). Bitwise OR ile birleştiğinde 000...0011 yani 3 elde edilir.",
      en: "Circular bitwise rotation by 1 bit moves the MSB to the LSB position and shifts the rest left: (x << 1) | (x >> 31) evaluates to binary 11 = decimal 3."
    }
  },
  {
    topic: "arrays",
    code: `#include <stdio.h>

void f() {
    int n = 5;
    // C'de VLA (Variable Length Array) static olabilir mi?
    // static int arr[n];
}

int main() {
    printf("%d", 1);
    return 0;
}`,
    options: ["VLA değişkenleri 'static' veya dosya kapsamında bildirilemez", "Bildirilebilir", "Derleyiciye bağlı", "C99'da serbesttir"],
    answer: 0,
    explanation: {
      tr: "ISO C99 standardına göre Değişken Uzunluklu Diziler (VLA) yalnızca otomatik depolama süresine (automatic storage duration) sahip olabilir; static veya extern niteleyicisi alamazlar ve dosya kapsamında tanımlanamazlar.",
      en: "Variable Length Arrays (VLAs) in C99 must have automatic storage duration. Declaring a VLA as static or extern is a compile-time constraint violation."
    }
  },
  {
    topic: "sizeof_types",
    code: `#include <stdio.h>

int main() {
    int x = 'AB';
    printf("%d", sizeof(x) == sizeof('A'));
    return 0;
}`,
    options: ["1 (Her ikisi de int türündedir)", "0", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C dilinde hem tek karakter sabitleri ('A') hem de çoklu karakter sabitleri ('AB') int türündedir! Dolayısıyla her ikisinin de sizeof değeri sizeof(int)'tir ve birbirine eşittir (1).",
      en: "In C, both single-character literals ('A') and multi-character literals ('AB') have type 'int'. Both sizeof values equal sizeof(int), yielding 1."
    }
  },
  {
    topic: "preprocessor",
    code: `#include <stdio.h>

#define MERGE(a, b) a##b

int main() {
    int MERGE(count, 1) = 55;
    printf("%d", count1);
    return 0;
}`,
    options: ["55", "count1", "Hata", "0"],
    answer: 0,
    explanation: {
      tr: "## operatörü count ve 1 belirteçlerini birleştirerek 'count1' değişken adını oluşturur. int count1 = 55 tanımlanmış olur ve 55 basılır.",
      en: "Token concatenation (##) merges count and 1 into identifier count1. 'int count1 = 55;' is compiled, printing 55."
    }
  },
  {
    topic: "memory",
    code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p = (int*)malloc(sizeof(int) * 10);
    // realloc(p, 0) C23 standardında Tanımsız Davranıştır (UB)
    printf("%d", p != NULL);
    free(p);
    return 0;
}`,
    options: ["1 (veya bellek yetersizse 0)", "Her zaman 0", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "malloc başarıyla bellek tahsis ederse NULL olmayan bir adres döner (p != NULL doğrudur). C23 standardında realloc(p, 0) çağrısı UB yapılmıştır.",
      en: "malloc returns a non-null pointer upon successful allocation. Note that realloc(p, 0) is classified as Undefined Behavior in C23."
    }
  },
  {
    topic: "memory",
    code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    // malloc() tarafından dönen adresin hizalaması:
    void *p = malloc(1);
    printf("%d", (size_t)p % sizeof(void*) == 0);
    free(p);
    return 0;
}`,
    options: ["1 (malloc herhangi bir temel türe uygun maksimum hizalama garantisi verir)", "0", "Tanımsız", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "C standardı gereğince malloc(), 1 bayt bile ayrılsa, dönen işaretçinin herhangi bir temel veri türü (max_align_t) için uygun şekilde hizalanmış (suitably aligned) olacağını garanti eder.",
      en: "The C standard mandates that malloc returns a pointer suitably aligned for any fundamental object type (max_align_t)."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    short a = 32767;
    short b = 1;
    int c = a + b;
    printf("%d", c);
    return 0;
}`,
    options: ["32768", "-32768 (taşma)", "0", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "Aritmetik işlemlerden önce int'ten küçük türler (short, char) tamsayı terfisine (integer promotion) uğrayarak 'int' türüne yükseltilir. 32767 + 1 işlemi 32-bit int üzerinde yapılır ve taşma olmadan 32768 üretir.",
      en: "Operands of type short undergo integer promotion to 'int' before arithmetic. The addition occurs in 32-bit int, yielding 32768 without overflow."
    }
  },
  {
    topic: "pointer_arithmetic",
    code: `#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p1 = (int*)malloc(10 * sizeof(int));
    int *p2 = (int*)malloc(10 * sizeof(int));
    // p2 - p1 farkı:
    printf("%d", p1 != NULL && p2 != NULL);
    free(p1);
    free(p2);
    return 0;
}`,
    options: ["1 (ancak p2 - p1 hesaplamak UB'dir)", "0", "Hata verir", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C standardına göre iki işaretçi arasında çıkarma (p2 - p1) YALNIZCA her iki işaretçi de aynı dizi nesnesinin elemanlarını gösteriyorsa geçerlidir. Farklı malloc bloklarını çıkarmak Tanımsız Davranıştır.",
      en: "Pointer subtraction is valid ONLY when both pointers point to elements of the same array object. Subtracting pointers across distinct allocations is Undefined Behavior."
    }
  },
  {
    topic: "scope",
    code: `#include <stdio.h>

int a = 1;

void g() { printf("%d", a); }

void f() {
    int a = 2;
    g();
}

int main() {
    f();
    return 0;
}`,
    options: ["1 (C statik/lexical kapsamlıdır)", "2 (dinamik kapsam)", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C dili statik (lexical) kapsam kuralını benimser. g() fonksiyonu global a değişkenini (1) görür; f() içindeki yerel a değişkeni g'yi etkilemez. Çıktı: 1.",
      en: "C uses static (lexical) scoping. Function g resolves 'a' from its definition scope (global a = 1), ignoring local variable 'a' in f(). Output: 1."
    }
  },
  {
    topic: "preprocessor",
    code: `#include <stdio.h>

#define MIN(a, b) ((a) < (b) ? (a) : (b))

int main() {
    int x = 4, y = 3;
    int m = MIN(x++, y);
    printf("%d %d", m, x);
    return 0;
}`,
    options: ["3 5", "3 4", "4 5", "4 4"],
    answer: 0,
    explanation: {
      tr: "MIN(x++, y) açılımı: ((x++) < (y) ? (x++) : (y)). Karşılaştırmada 4 < 3 yanlıştır ve x 5 olur. Yanlış dal y (3) döner; dolayısıyla m=3 ve x=5 olur. Çıktı: 3 5.",
      en: "MIN(x++, y) expands to ((x++) < (y) ? (x++) : (y)). The test 4 < 3 is false, incrementing x to 5. The false branch returns y (3), so m = 3, x = 5."
    }
  },
  {
    topic: "pointer_arithmetic",
    code: `#include <stdio.h>

int main() {
    int a = 5;
    void *p = &a;
    // GNU C uzantısı void* aritmetiğine 1 bayt adım olarak izin verir
    // Standart ISO C'de void* aritmetiği geçersizdir
    printf("%d", (char*)p + 1 == (char*)p + 1);
    return 0;
}`,
    options: ["1", "0", "Hata", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "Standart ISO C'de void türü tamamlanmamış bir tür olduğundan void* üzerinde işaretçi aritmetiği yasaktır; ancak char* türüne dönüştürüldüğünde 1 baytlık adımlarla ilerlemek tamamen standarttır.",
      en: "In standard ISO C, pointer arithmetic on void* is invalid because void has incomplete size. Casting to char* provides well-defined 1-byte stepping."
    }
  },
  {
    topic: "bitwise",
    code: `#include <stdio.h>

int main() {
    unsigned int x = 0;
    printf("%u", ~x);
    return 0;
}`,
    options: ["UINT_MAX (tüm bitler 1)", "0", "-1", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "unsigned türlerde bitwise NOT (~) tüm bitleri 1 yapar. Bu değer unsigned int türünün alabileceği en büyük değer olan UINT_MAX'tır (32-bitte 4294967295).",
      en: "Bitwise NOT on unsigned 0 sets all bits to 1, producing UINT_MAX."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    int a = 10;
    const int * const p = &a;
    printf("%d", *p);
    return 0;
}`,
    options: ["10", "Derleme hatası", "Adres", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "'const int * const p' ifadesi hem işaretçinin gösterdiği değerin (*p) hem de işaretçinin tuttuğu adresin (p) sabit (immutable) olduğunu belirtir.",
      en: "'const int * const p' declares a const pointer to a const int. Both the pointer address and pointed-to value cannot be modified."
    }
  },
  {
    topic: "arrays",
    code: `#include <stdio.h>

void f(int (*p)[3]) {
    printf("%d", (*p)[1]);
}

int main() {
    int matrix[2][3] = {{10, 20, 30}, {40, 50, 60}};
    f(matrix);
    return 0;
}`,
    options: ["20", "10", "30", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "matrix fonksiyon parametresine iletildiğinde ilk satırına işaret eden bir işaretçiye (int (*)[3]) dönüşür. (*p)[1] ilk satırın 1. indeksindeki 20'yi verir.",
      en: "matrix decays into a pointer to an array of 3 ints (int (*)[3]). (*p)[1] accesses matrix[0][1] = 20."
    }
  },
  {
    topic: "operators",
    code: `#include <stdio.h>

int main() {
    int a = 0, b = 0;
    int res = (a = 1) && (b = a + 1);
    printf("%d %d %d", res, a, b);
    return 0;
}`,
    options: ["1 1 2", "0 1 0", "1 1 0", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "&& operatörü iki terim arasında kesin bir sequence point garanti eder. Sol terim (a = 1) tamamlanmadan sağ terim (b = a + 1 = 2) çalışmaz. Her ikisi de doğru olduğundan res = 1 olur. Çıktı: 1 1 2.",
      en: "&& enforces a sequence point between operands. (a = 1) is sequenced before (b = a + 1), evaluating cleanly to 1 1 2."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

void inc(int **p) {
    (**p)++;
}

int main() {
    int x = 10;
    int *ptr = &x;
    inc(&ptr);
    printf("%d", x);
    return 0;
}`,
    options: ["11", "10", "Adres", "Hata"],
    answer: 0,
    explanation: {
      tr: "**p ile x değişkenine iki seviyeli indirection ile ulaşılır ve (**p)++ ifadesi x'in değerini 10'dan 11'e artırır.",
      en: "Double pointer indirection **p accesses variable x directly, incrementing it from 10 to 11."
    }
  },
  {
    topic: "pointers",
    code: `#include <stdio.h>

int main() {
    // C99 restrict anahtar sözcüğü:
    // Derleyiciye işaretçinin bellek alanına başka hiçbir işaretçi ile erişilmeyeceğini taahhüt eder
    int x = 10;
    int * restrict p = &x;
    printf("%d", *p);
    return 0;
}`,
    options: ["10", "Derleme hatası", "0", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C99 ile eklenen 'restrict' anahtar sözcüğü, o nesneye yalnızca bu işaretçi üzerinden erişileceğini derleyiciye vaat eder. Bu sayede derleyici agresif yazmaç önbelleklemesi ve döngü vektörizasyonu yapabilir.",
      en: "The C99 'restrict' qualifier asserts that the pointed object is not aliased by any other pointer in that scope, enabling compiler optimizations."
    }
  },
  {
    topic: "functions",
    code: `#include <stdio.h>

int fact(int n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
}

int main() {
    printf("%d", fact(4));
    return 0;
}`,
    options: ["24", "12", "4", "Stack overflow"],
    answer: 0,
    explanation: {
      tr: "Özyinelemeli faktöriyel çağrısı: 4 * 3 * 2 * 1 = 24. n <= 1 taban koşulunda durur.",
      en: "Recursive factorial computes 4 * 3 * 2 * 1 = 24."
    }
  },
  {
    topic: "arrays",
    code: `#include <stdio.h>

int main() {
    // C99 Bileşik Sabit (Compound Literal):
    int *p = (int[]){10, 20, 30};
    printf("%d", p[1]);
    return 0;
}`,
    options: ["20", "10", "Derleme hatası", "Tanımsız"],
    answer: 0,
    explanation: {
      tr: "C99 ile gelen Bileşik Sabitler (Compound Literals) blok kapsamında isimsiz bir otomatik dizi tahsis eder. p[1] 20 değerini döner.",
      en: "C99 compound literals (int[]){10, 20, 30} allocate an unnamed automatic array in the current block, allowing p[1] to evaluate to 20."
    }
  },
  {
    topic: "preprocessor",
    code: `#include <stdio.h>

#define FOO 1

int main() {
#if FOO == 1
    printf("A");
#elif FOO == 2
    printf("B");
#else
    printf("C");
#endif
    return 0;
}`,
    options: ["A", "B", "C", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "#if önişlemci koşulu derleme öncesinde FOO değerini kontrol eder. FOO 1 olduğu için A basılır; diğer kısımlar derleme çıktısına hiç dahil edilmez.",
      en: "Conditional compilation directive #if FOO == 1 evaluates to true, emitting printf(\"A\") and discarding all other branches."
    }
  },
  {
    topic: "undefined_behavior",
    code: `#include <stdio.h>

int main() {
    int arr[3] = {10, 20, 30};
    // Dizi sınırları dışına çıkma:
    printf("%d", arr[3] >= 0);
    return 0;
}`,
    options: ["Tanımsız Davranış (Undefined Behavior)", "1", "0", "Her zaman hata"],
    answer: 0,
    explanation: {
      tr: "3 elemanlı dizinin geçerli indeksleri 0, 1 ve 2'dir. arr[3] ile sınır dışına (out-of-bounds) erişmek C standardında tanımsız davranıştır; çöp değer okuyabilir veya çökmeye yol açabilir.",
      en: "Valid indices for arr[3] are 0, 1, and 2. Accessing arr[3] is an out-of-bounds read and Undefined Behavior."
    }
  },
  {
    topic: "scope",
    code: `#include <stdio.h>

int main() {
    int i = 0;
    for (int i = 0; i < 2; i++) {
        // döngü yerel i'si
    }
    printf("%d", i);
    return 0;
}`,
    options: ["0", "2", "1", "Derleme hatası"],
    answer: 0,
    explanation: {
      tr: "C99'da for döngüsü başlığında bildirilen 'int i' döngü bloğuyla sınırlıdır. Döngü bittiğinde dıştaki i değişkeni (değeri 0) etkilenmeden kalır.",
      en: "In C99, variables declared within the for loop clause are scoped to the loop. The outer 'i' remains 0."
    }
  }
];

fs.writeFileSync(
  path.join(__dirname, "expert_questions.js"),
  "module.exports = " + JSON.stringify(expertQuestions, null, 2) + ";\n",
  "utf8"
);
console.log("Expert questions written successfully: " + expertQuestions.length);
