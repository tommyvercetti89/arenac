const QUESTIONS_PER_ROUND = 10;
const XP_PER_LEVEL = 250;
const DEFAULT_SETUP = { mode: "classic", count: 10, time: 0, topic: "all" };
const DEBUG_DEFAULT_SETUP = { level: "beginner", mode: "classic", count: 10, time: 0 };
const VALID_COUNTS = [5, 10, 15, "all"];
const VALID_TIMES = [0, 120, 300, 600];
const ORDER = ["beginner", "intermediate", "advanced", "expert"];
const CARD_KEYS = ["beginner", "intermediate", "advanced", "expert", "mixed"];

const BADGE_META = {
  first_step: { tier: "easy", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>' },
  debug_first: { tier: "easy", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="14" x="8" y="6" rx="4"></rect><path d="m19 7-3 2"></path><path d="m5 7 3 2"></path><path d="m19 19-3-2"></path><path d="m5 19 3-2"></path><path d="M20 13h-4"></path><path d="M4 13h4"></path></svg>' },
  daily_done: { tier: "easy", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>' },
  sharp_eye: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>' },
  streak_3: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>' },
  level_5: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>' },
  timed_hero: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>' },
  exam_master: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>' },
  mistake_fixer: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>' },
  century: { tier: "medium", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="9" x2="20" y2="9"></line><line x1="4" y1="15" x2="20" y2="15"></line><line x1="10" y1="3" x2="8" y2="21"></line><line x1="16" y1="3" x2="14" y2="21"></line></svg>' },
  pointer_master: { tier: "hard", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="m13 13 6 6"></path></svg>' },
  streak_7: { tier: "hard", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>' },
  debug_perfect: { tier: "hard", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>' },
  expert_ace: { tier: "hard", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"></path></svg>' },
  debug_expert: { tier: "hard", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>' },
  survival_streak_10: { tier: "hard", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>' },
  five_hundred: { tier: "legendary", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 18 3 22 9 12 22 2 9 6 3"></polygon><line x1="2" y1="9" x2="22" y2="9"></line><line x1="12" y1="22" x2="6" y2="9"></line><line x1="12" y1="22" x2="18" y2="9"></line></svg>' },
  level_10: { tier: "legendary", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>' },
  survival_streak_20: { tier: "legendary", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>' },
  ub_survivor: { tier: "legendary", icon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>' }
};

const BADGE_ORDER = [
  "first_step", "debug_first", "daily_done",
  "sharp_eye", "streak_3", "level_5", "timed_hero", "exam_master", "mistake_fixer", "century",
  "pointer_master", "streak_7", "debug_perfect", "expert_ace", "debug_expert", "survival_streak_10",
  "five_hundred", "level_10", "survival_streak_20", "ub_survivor"
];
const LETTERS = ["A", "B", "C", "D"];
const RING_CIRC = 2 * Math.PI * 86;

const I18N = {
  tr: {
    documentTitle: "ArenaC · C Dili Mantık Testi",
    profileTitle: "Kullanıcı Profili",
    profileBtnTitle: "Profil",
    profileActive: "Aktif Profil",
    profileActiveDesc: "Farklı profiller arasında geçiş yap",
    profileNew: "+ Yeni",
    profileName: "Kullanıcı Adı",
    profileNameDesc: "Profilinde görünecek takma isim",
    profileAvatar: "Avatar Seç",
    profileAvatarDesc: "Sana uygun bir simge belirle",
    profileSave: "Kaydet",
    profileDelete: "Profili Sil",
    profileBackupTitle: "Profil Yedekleme",
    profileBackupDesc: "Bu profili ve ilerlemesini JSON olarak dışa aktar",
    profileExport: "Profili İndir",
    profileImport: "Profil Yükle",
    profileSaved: "Profil başarıyla güncellendi.",
    profileCreated: "Yeni profil oluşturuldu.",
    profileSwitch: "Profile geçildi.",
    profileExportDone: "Profil ve ilerleme başarıyla indirildi.",
    profileImportDone: "Profil başarıyla içe aktarıldı!",
    profileDeleteConfirm: "Bu profili ve ilerlemesini silmek istediğine emin misin?",
    profileDefaultName: "C Programcısı",
    profileApprentice: "C Çırağı",
    profileCoder: "C Geliştirici",
    profilePointerMaster: "Pointer Ustası",
    profileArchitect: "Bellek Mimarı",
    profileGuru: "C Gurusu",
    badgesBtn: "Başarımlar",
    badgesModalTitle: "Başarımlar & Rozetler",
    badgesModalSub: "Kolaydan efsaneviye tüm hedefler. Kazandığın rozetlerden en beğendiğini profiline sabitleyebilirsin.",
    badgePin: "Sabitle",
    badgePinned: "Sabitlendi",
    badgeEarned: "Kazanıldı",
    badgeLocked: "Kilitli",
    tierEasy: "Kolay",
    tierMedium: "Orta",
    tierHard: "Zor",
    tierLegendary: "Efsanevi",
    pinnedShowcaseTitle: "Vitrin Rozeti",
    noPinnedBadge: "Vitrin Rozeti Seçilmedi",
    noPinnedBadgeSub: "Başarımlar menüsünden beğendiğin bir rozeti profiline sabitle.",
    badgePinnedDone: "Rozet profiline sabitlendi!",
    badgeUnpinnedDone: "Vitrin rozeti kaldırıldı.",
    brandTag: "c · mantık · quiz",
    heroBadge: "C DİLİ MANTIK TESTİ",
    heroTitleA: "Kodun çıktısını ",
    heroTitleB: "tahmin edebilir misin?",
    heroText: "Her soruda küçük bir C kodu var. Çalıştırınca ne olacağını bul, mantığını konuştur. Pointer'lar, bellek, operatörler ve tuhaf C kuralları... Yanlış yapsan da sorun değil, doğru cevabı ve detaylı açıklamasını anında göreceksin.",
    heroMetaPool: "<b>{n}</b> soruluk havuz",
    heroMetaPerRound: "Test başına <b>{n}</b> soru",
    heroMetaKbd: "A–D klavye desteği",
    homeSectionTitle: "Zorluk seviyesi seç",
    homeSectionSub: "Sorular her seferinde karıştırılır, her deneme farklı bir testtir.",
    quizBack: "← Seviye Seç",
    quizBadge: "QUIZ MODU",
    debugBadge: "DEBUGGING MODU",
    debugMode: "Debugging",
    debugDesc: "Kodlardaki kasıtlı hataları bul",
    debugSetupTitle: "Debugging Testi",
    setupLevel: "Seviye",
    qDebug: "Bu koddaki hata nedir?",
    debugModeShort: "Debug",
    quizTabSub: "Kod çıktısı soruları",
    debugTabSub: "Kasıtlı hataları bul",
    debugSectionTitle: "Debug seviyesi seç",
    confirmExitTitle: "Testten çıkılsın mı?",
    confirmExitText: "Test ilerlemen kaydedilmeyecek. Emin misin?",
    confirmStay: "Devam Et",
    confirmExit: "Çık",
    helpIntro: "ArenaC, C dili mantığını ve kurallarını test eden bir web uygulamasıdır. İşte tüm modlar ve özellikler:",
    helpQuiz: "Kodun çıktısını tahmin et. Seviye ve konu seç; modu (klasik/sınav), soru sayısını ve süreyi ayarla.",
    helpDebug: "Kodda kasıtlı bir C hatası var. Doğru hatayı şıklardan bul; cevaptan sonra hatanın nedeni ve çözümü gösterilir.",
    helpDaily: "Herkes aynı 10 soruyu çözer, günde bir kez. Seriyi büyütmek için her gün uğra.",
    helpProgressName: "İlerleme ve Rozetler",
    helpProgress: "Doğru cevaplar XP kazandırır, seviye atlarsın. Rozetler açılır; yanlışların \"Yanlışlarımı Çalış\" ile tekrar sorulur.",
    heroMetaDebug: "<b>{n}</b> debug sorusu",
    kbdHint: "Klavye: <kbd>A</kbd>–<kbd>D</kbd> veya <kbd>1</kbd>–<kbd>4</kbd> ile cevapla, <kbd>Enter</kbd> ile devam et",
    reviewTitle: "Yanlışlarını incele",
    reviewSub: "Doğru cevaplar ve açıklamaları burada.",
    helpTitle: "Nasıl oynanır?",
    docsTitle: "C Çalışma Rehberi",
    docsBadge: "Referans & Hile Sayfası",
    docsTabFormat: "Format Belirteçleri",
    docsTabLibs: "Kütüphaneler & Fonksiyonlar",
    docsTabMemory: "Bellek & Pointer",
    docsTabPrecedence: "Öncelikler & UB",
    survivalTitle: "Zamana Karşı",
    survivalTabSub: "20 sn, her doğruya +3 sn",
    survivalSectionTitle: "Zamana Karşı Meydan Okuma",
    survivalDesc: "20 saniyen var. Her doğru cevap sürene +3 saniye kazandırır. Yanlış yaparsan veya süre biterse oyun sonlanır!",
    survivalBest: "En İyi Seri",
    survivalTotalPlayed: "Oynanan",
    survivalStart: "Meydan Okumayı Başlat",
    survivalResult: "Hayatta Kalma Serisi: {n} Soru!",
    bookmarksTest: "Yıldızlı Sorular",
    noBookmarks: "Henüz yıldızlanmış soru yok.",
    shareCard: "Skor Kartını İndir",
    settingsLineNums: "Kod Satır Numaraları",
    settingsLineNumsDesc: "Kod pencerelerinde sol satır numaralarını göster",
    lineNumsOn: "Açık",
    lineNumsOff: "Kapalı",
    settingsBackup: "Veri Yedekleme",
    settingsBackupDesc: "XP, seviye, rekorlar ve favori sorularını JSON olarak yedekle",
    exportBtn: "Yedek İndir",
    importBtn: "Yedek Yükle",
    exportDone: "Yedek başarıyla indirildi.",
    importDone: "Yedek başarıyla geri yüklendi!",
    importError: "Hata: Dosya okunamadı veya geçersiz.",
    footerText: "ArenaC · mantık sorularıyla C dili pratiği.",
    settingsTitle: "Ayarlar",
    settingsTheme: "Tema",
    settingsThemeDesc: "Koyu veya açık tema kullan",
    themeDark: "Koyu",
    themeLight: "Açık",
    settingsLanguage: "Dil",
    settingsLanguageDesc: "Arayüzü Türkçe veya İngilizce kullan",
    settingsSound: "Ses Efektleri",
    settingsSoundDesc: "Tuşlama ve cevap seslerini aç veya kapat",
    soundOn: "Açık",
    soundOff: "Kapalı",
    settingsVolume: "Ses Seviyesi",
    settingsVolumeDesc: "Ses efektlerinin yükseklik seviyesi",
    settingsFullscreen: "Tam Ekran",
    settingsFullscreenDesc: "Tarayıcıyı tam ekran moduna geçir",
    settingsReset: "En İyi Skorlar",
    settingsResetDesc: "Kaydedilmiş tüm rekorları sil",
    resetBtn: "Sıfırla",
    settingsResetDone: "En iyi skorlar sıfırlandı.",
    fullscreenEnter: "Tam ekran",
    fullscreenExit: "Tam ekrandan çık",
    close: "Kapat",
    setupTitle: "Testi Ayarla",
    setupMode: "Mod",
    modeClassic: "Klasik",
    modeExam: "Sınav",
    modeClassicDesc: "Her sorudan sonra doğru cevabı ve açıklamayı görürsün.",
    modeExamDesc: "Sonuçları ve açıklamaları testin sonunda görürsün.",
    setupTopic: "Konu",
    topicAll: "Tüm konular",
    setupCount: "Soru Sayısı",
    countAll: "Tümü",
    setupTime: "Süre",
    timeOff: "Kapalı",
    time2: "2 dk",
    time5: "5 dk",
    time10: "10 dk",
    startTest: "Teste Başla",
    savedTitle: "Cevap kaydedildi",
    examNote: "Sonuçları testin sonunda göreceksin. Sonraki Soru'ya basana kadar cevabını değiştirebilirsin.",
    unanswered: "Boş bırakıldı",
    timeUp: "Süre doldu! ",
    dailyChallenge: "Günlük Meydan Okuma",
    dailyDone: "Bugün tamamlandı",
    dailyChip: "Günlük",
    installApp: "Uygulamayı Yükle",
    installIntro: "ArenaC'yi ana ekranına uygulama gibi ekleyebilirsin; çevrimdışı da çalışır.",
    installAndroidTitle: "Android (Chrome)",
    installAndroidDesc: "Tarayıcı menüsünü (üç nokta) aç ve \"Uygulamayı yükle\" veya \"Ana ekrana ekle\" seçeneğine dokun.",
    installIosTitle: "iPhone / iPad (Safari)",
    installIosDesc: "Paylaş düğmesine dokun ve \"Ana Ekrana Ekle\" seçeneğini seç.",
    installNote: "İpucu: Sayfayı doğrudan tarayıcıda açmalısın.",
    statLevelLabel: "Seviye",
    statStreakLabel: "Gün Serisi",
    statsTitle: "İstatistikler",
    statsAnswered: "Çözülen",
    statsAccuracy: "Doğruluk",
    statsByLevel: "Seviyeye göre",
    statsWeakTopics: "En çok zorlandığın konular",
    statsBadges: "Rozetler",
    statsNoData: "Henüz veri yok, birkaç test çöz!",
    mistakesTest: "Yanlışlarımı Çalış",
    mistakesChip: "Yanlışlarım",
    newBadges: "Yeni rozet:",
    qOutput: "Bu kodun çıktısı nedir?",
    diff: {
      beginner: { label: "Başlangıç", desc: "Temel operatörler, tipler ve basit diziler" },
      intermediate: { label: "Orta", desc: "Pointer temelleri, string'ler ve struct yapısı" },
      advanced: { label: "İleri", desc: "Pointer aritmetiği, bellek ve önişlemci makroları" },
      expert: { label: "Uzman", desc: "Tanımsız davranışlar, bellek hizalaması ve tuzaklar" },
      mixed: { label: "Karışık", desc: "Tüm seviyelerden rastgele sorular" }
    },
    level: "Seviye {n}",
    levelAll: "Tüm seviyeler",
    questionCount: "{n} soru",
    best: "En iyi: {a}/{b}",
    notAttempted: "Henüz denenmedi",
    progressQuestion: "Soru {a} / {b}",
    progressCorrect: "Doğru: {n}",
    correctTitle: "Doğru!",
    wrongTitle: "Yanlış",
    yourAnswer: "Senin cevabın:",
    correctAnswer: "Doğru cevap:",
    nextQuestion: "Sonraki Soru",
    finishTest: "Testi Bitir",
    newRecord: "Yeni rekor! ",
    result: [
      { title: "Kusursuz!", sub: "Tüm soruları doğru bildin. C dilinde tam bir ustasın, bir üst seviyeyi dene." },
      { title: "Efsane!", sub: "C mantığına ve kurallarına çok hâkimsin. Bir üst seviyede şansını dene!" },
      { title: "İyi iş!", sub: "Sağlam bir temelin var. Aşağıdaki açıklamaları okuyup incelikleri kavrayabilirsin." },
      { title: "Fena değil", sub: "Yanlışlarının açıklamaları aşağıda. Bir tur daha çözmek çok şey öğretir." },
      { title: "Başlangıç hep zordur", sub: "C zor bir dildir; açıklamaları oku, işaretçileri zihninde canlandır ve tekrar dene." }
    ],
    statCorrect: "Doğru",
    statWrong: "Yanlış",
    statLevel: "Seviye",
    retry: "Tekrar Dene",
    chooseLevel: "Seviye Seç",
    reviewItem: "Soru {n}",
    badges: {
      first_step: { name: "İlk Adım", desc: "İlk C testini tamamla" },
      sharp_eye: { name: "Keskin Göz", desc: "Bir testi %100 ile bitir" },
      expert_ace: { name: "C Gurusu", desc: "Uzman seviyesinde %100 yap" },
      century: { name: "Yüz Kulübü", desc: "Toplam 100 C sorusu çöz" },
      five_hundred: { name: "Beş Yüz", desc: "Toplam 500 C sorusu çöz" },
      streak_3: { name: "Alev Aldı", desc: "3 gün üst üste oyna" },
      streak_7: { name: "Haftalık Seri", desc: "7 gün üst üste oyna" },
      timed_hero: { name: "Zaman Kahramanı", desc: "Süreli testte %80+ yap" },
      exam_master: { name: "Sınav Ustası", desc: "Sınav modunda %80+ yap" },
      daily_done: { name: "Günlük Görev", desc: "Günlük meydan okumayı bitir" },
      mistake_fixer: { name: "Hata Avcısı", desc: "Yanlışlarım testini %80+ ile bitir" },
      debug_first: { name: "İlk Debug", desc: "İlk debugging testini tamamla" },
      debug_perfect: { name: "Kusursuz Dedektif", desc: "Bir debug testini %100 ile bitir" },
      debug_expert: { name: "C Hata Avcısı", desc: "Uzman debug seviyesinde %100 yap" },
      level_5: { name: "Yıldız Oyuncu", desc: "5. seviyeye ulaş" },
      pointer_master: { name: "Pointer Ustası", desc: "20 işaretçi sorusunu doğru yanıtla" },
      survival_streak_10: { name: "Hayatta Kalan", desc: "Zamana Karşı modunda 10 soru serisine ulaş" },
      level_10: { name: "Sistem Mimarı", desc: "10. oyuncu seviyesine ulaş" },
      survival_streak_20: { name: "Zaman Bükücü", desc: "Zamana Karşı modunda 20+ soru serisi yap" },
      ub_survivor: { name: "UB Terbiyecisi", desc: "15 tanımsız davranış & tuzak sorusunu doğru yanıtla" },
    }
  },
  en: {
    documentTitle: "ArenaC · C Logic Quiz",
    profileTitle: "User Profile",
    profileBtnTitle: "Profile",
    profileActive: "Active Profile",
    profileActiveDesc: "Switch between different profiles",
    profileNew: "+ New",
    profileName: "Username",
    profileNameDesc: "Display name on your profile",
    profileAvatar: "Choose Avatar",
    profileAvatarDesc: "Select an avatar that suits you",
    profileSave: "Save",
    profileDelete: "Delete Profile",
    profileBackupTitle: "Profile Backup",
    profileBackupDesc: "Export this profile and its progress as JSON",
    profileExport: "Export Profile",
    profileImport: "Import Profile",
    profileSaved: "Profile updated successfully.",
    profileCreated: "New profile created.",
    profileSwitch: "Switched profile.",
    profileExportDone: "Profile and progress exported successfully.",
    profileImportDone: "Profile imported successfully!",
    profileDeleteConfirm: "Are you sure you want to delete this profile and its progress?",
    profileDefaultName: "C Programmer",
    profileApprentice: "C Apprentice",
    profileCoder: "C Developer",
    profilePointerMaster: "Pointer Master",
    profileArchitect: "Memory Architect",
    profileGuru: "C Guru",
    badgesBtn: "Achievements",
    badgesModalTitle: "Achievements & Badges",
    badgesModalSub: "Goals from easy to legendary. Pin your favorite unlocked badge to showcase it on your profile.",
    badgePin: "Pin",
    badgePinned: "Pinned",
    badgeEarned: "Unlocked",
    badgeLocked: "Locked",
    tierEasy: "Easy",
    tierMedium: "Medium",
    tierHard: "Hard",
    tierLegendary: "Legendary",
    pinnedShowcaseTitle: "Featured Badge",
    noPinnedBadge: "No Featured Badge",
    noPinnedBadgeSub: "Pin your favorite unlocked badge from the Achievements showcase.",
    badgePinnedDone: "Badge pinned to profile!",
    badgeUnpinnedDone: "Featured badge unpinned.",
    brandTag: "c · logic · quiz",
    heroBadge: "C LOGIC QUIZ",
    heroTitleA: "Can you predict the ",
    heroTitleB: "output of the code?",
    heroText: "Every question presents a short snippet of C code. Figure out what it outputs and put your understanding of C to the test. Pointers, memory, operators, and nuances... Mistakes are fine: you get the right answer and an in-depth explanation immediately.",
    heroMetaPool: "<b>{n}</b> question pool",
    heroMetaPerRound: "<b>{n}</b> questions per test",
    heroMetaKbd: "A–D keyboard support",
    homeSectionTitle: "Choose a difficulty",
    homeSectionSub: "Questions are shuffled every time, each attempt is a different test.",
    quizBack: "← Choose Level",
    quizBadge: "QUIZ MODE",
    debugBadge: "DEBUGGING MODE",
    debugMode: "Debugging",
    debugDesc: "Find the intentional bugs in the code",
    debugSetupTitle: "Debugging Test",
    setupLevel: "Level",
    qDebug: "What is the bug in this code?",
    debugModeShort: "Debug",
    quizTabSub: "Code output questions",
    debugTabSub: "Find the bugs",
    debugSectionTitle: "Choose a debug level",
    confirmExitTitle: "Quit the test?",
    confirmExitText: "Your test progress will not be saved. Are you sure?",
    confirmStay: "Keep Going",
    confirmExit: "Quit",
    helpIntro: "ArenaC tests your understanding of C logic and language rules. Here are all the modes and features:",
    helpQuiz: "Predict the output of the code. Pick a level and topic; set the mode (classic/exam), question count and time.",
    helpDebug: "The code contains an intentional C bug. Find the correct one; after answering you see the cause and the fix.",
    helpDaily: "Everyone solves the same 10 questions, once a day. Come back daily to grow your streak.",
    helpProgressName: "Progress and Badges",
    helpProgress: "Correct answers earn XP and level you up. Unlock badges; your mistakes come back with \"Practice My Mistakes\".",
    heroMetaDebug: "<b>{n}</b> debug questions",
    kbdHint: "Keyboard: answer with <kbd>A</kbd>–<kbd>D</kbd> or <kbd>1</kbd>–<kbd>4</kbd>, continue with <kbd>Enter</kbd>",
    reviewTitle: "Review your mistakes",
    reviewSub: "The correct answers and explanations are here.",
    helpTitle: "How to play",
    docsTitle: "C Study Guide",
    docsBadge: "Reference & Cheat Sheet",
    docsTabFormat: "Format Specifiers",
    docsTabLibs: "Libraries & Functions",
    docsTabMemory: "Memory & Pointers",
    docsTabPrecedence: "Precedence & UB",
    survivalTitle: "Time Attack",
    survivalTabSub: "20s, +3s per correct",
    survivalSectionTitle: "Time Attack Challenge",
    survivalDesc: "You have 20 seconds. Each correct answer adds +3 seconds. Wrong answer or timeout ends the run!",
    survivalBest: "Best Streak",
    survivalTotalPlayed: "Played",
    survivalStart: "Start Challenge",
    survivalResult: "Survival Streak: {n} Questions!",
    bookmarksTest: "Starred Questions",
    noBookmarks: "No starred questions yet.",
    shareCard: "Download Score Card",
    settingsLineNums: "Code Line Numbers",
    settingsLineNumsDesc: "Show line numbers on the left of code windows",
    lineNumsOn: "On",
    lineNumsOff: "Off",
    settingsBackup: "Data Backup",
    settingsBackupDesc: "Backup XP, levels, scores and favorites as JSON",
    exportBtn: "Export JSON",
    importBtn: "Import JSON",
    exportDone: "Backup downloaded successfully.",
    importDone: "Backup restored successfully!",
    importError: "Error: Could not read or invalid backup file.",
    footerText: "ArenaC · C practice with logic questions.",
    settingsTitle: "Settings",
    settingsTheme: "Theme",
    settingsThemeDesc: "Use the dark or light theme",
    themeDark: "Dark",
    themeLight: "Light",
    settingsLanguage: "Language",
    settingsLanguageDesc: "Use the interface in Turkish or English",
    settingsSound: "Sound Effects",
    settingsSoundDesc: "Toggle keypress and answer sound effects",
    soundOn: "On",
    soundOff: "Off",
    settingsVolume: "Sound Volume",
    settingsVolumeDesc: "Volume level of sound effects",
    settingsFullscreen: "Fullscreen",
    settingsFullscreenDesc: "Switch the browser to fullscreen mode",
    settingsReset: "Best Scores",
    settingsResetDesc: "Delete all saved high scores",
    resetBtn: "Reset",
    settingsResetDone: "Best scores have been reset.",
    fullscreenEnter: "Fullscreen",
    fullscreenExit: "Exit fullscreen",
    close: "Close",
    setupTitle: "Set Up Test",
    setupMode: "Mode",
    modeClassic: "Classic",
    modeExam: "Exam",
    modeClassicDesc: "You see the correct answer and explanation after each question.",
    modeExamDesc: "You see the results and explanations at the end of the test.",
    setupTopic: "Topic",
    topicAll: "All topics",
    setupCount: "Questions",
    countAll: "All",
    setupTime: "Time",
    timeOff: "Off",
    time2: "2 min",
    time5: "5 min",
    time10: "10 min",
    startTest: "Start Test",
    savedTitle: "Answer saved",
    examNote: "You'll see the results at the end of the test. You can change your answer until you move to the next question.",
    unanswered: "Left blank",
    timeUp: "Time's up! ",
    dailyChallenge: "Daily Challenge",
    dailyDone: "Completed today",
    dailyChip: "Daily",
    installApp: "Install App",
    installIntro: "Add ArenaC to your home screen like an app; it also works offline.",
    installAndroidTitle: "Android (Chrome)",
    installAndroidDesc: "Open the browser menu (three dots) and tap \"Install app\" or \"Add to Home screen\".",
    installIosTitle: "iPhone / iPad (Safari)",
    installIosDesc: "Tap the Share button and choose \"Add to Home Screen\".",
    installNote: "Tip: Open the page directly in the browser address bar.",
    statLevelLabel: "Level",
    statStreakLabel: "Day Streak",
    statsTitle: "Statistics",
    statsAnswered: "Answered",
    statsAccuracy: "Accuracy",
    statsByLevel: "By difficulty",
    statsWeakTopics: "Your weakest topics",
    statsBadges: "Badges",
    statsNoData: "No data yet, solve a few tests!",
    mistakesTest: "Practice My Mistakes",
    mistakesChip: "My Mistakes",
    newBadges: "New badge:",
    qOutput: "What is the output of this code?",
    diff: {
      beginner: { label: "Beginner", desc: "Basic operators, primitive types and simple arrays" },
      intermediate: { label: "Intermediate", desc: "Pointer basics, string manipulation and structs" },
      advanced: { label: "Advanced", desc: "Pointer arithmetic, dynamic memory and macros" },
      expert: { label: "Expert", desc: "Undefined behavior, memory alignment and subtle traps" },
      mixed: { label: "Mixed", desc: "Random questions across all difficulties" }
    },
    level: "Level {n}",
    levelAll: "All levels",
    questionCount: "{n} questions",
    best: "Best: {a}/{b}",
    notAttempted: "Not attempted yet",
    progressQuestion: "Question {a} / {b}",
    progressCorrect: "Correct: {n}",
    correctTitle: "Correct!",
    wrongTitle: "Wrong",
    yourAnswer: "Your answer:",
    correctAnswer: "Correct answer:",
    nextQuestion: "Next Question",
    finishTest: "Finish Test",
    newRecord: "New record! ",
    result: [
      { title: "Flawless!", sub: "You got every question right. You are a true C master; try the next level!" },
      { title: "Brilliant!", sub: "You have a solid command of C rules and idioms. Try an even higher level!" },
      { title: "Good job!", sub: "Solid foundation! Read the explanations below to master the nuances." },
      { title: "Not bad", sub: "Review your mistakes below. Taking another attempt will level you up quickly." },
      { title: "C has a steep learning curve", sub: "Read the explanations, visualize the memory layout, and try again!" }
    ],
    statCorrect: "Correct",
    statWrong: "Wrong",
    statLevel: "Level",
    retry: "Try Again",
    chooseLevel: "Choose Level",
    reviewItem: "Question {n}",
    badges: {
      first_step: { name: "First Step", desc: "Complete your first C quiz" },
      sharp_eye: { name: "Sharp Eye", desc: "Finish a test with 100% score" },
      expert_ace: { name: "C Guru", desc: "Score 100% on the Expert difficulty" },
      century: { name: "Century Club", desc: "Solve 100 total C questions" },
      five_hundred: { name: "Five Hundred", desc: "Solve 500 total C questions" },
      streak_3: { name: "On Fire", desc: "Play 3 days in a row" },
      streak_7: { name: "Weekly Streak", desc: "Play 7 days in a row" },
      timed_hero: { name: "Timed Hero", desc: "Score 80%+ on a timed test" },
      exam_master: { name: "Exam Master", desc: "Score 80%+ in Exam mode" },
      daily_done: { name: "Daily Quest", desc: "Finish a Daily Challenge" },
      mistake_fixer: { name: "Bug Hunter", desc: "Finish a Mistakes test with 80%+" },
      debug_first: { name: "First Debug", desc: "Complete your first debugging test" },
      debug_perfect: { name: "Flawless Detective", desc: "Score 100% on a debugging test" },
      debug_expert: { name: "C Bug Master", desc: "Score 100% on Expert debugging" },
      level_5: { name: "Star Player", desc: "Reach Player Level 5" },
      pointer_master: { name: "Pointer Master", desc: "Answer 20 pointer questions correctly" },
      survival_streak_10: { name: "Survivor", desc: "Reach a streak of 10 in Time Attack" },
      level_10: { name: "System Architect", desc: "Reach Player Level 10" },
      survival_streak_20: { name: "Time Bender", desc: "Score a 20+ streak in Time Attack" },
      ub_survivor: { name: "UB Tamer", desc: "Answer 15 Undefined Behavior & trap questions correctly" },
    }
  }
};

const C_KEYWORDS = new Set([
  "return", "if", "else", "switch", "case", "default", "break", "continue",
  "for", "while", "do", "goto", "typedef", "struct", "union", "enum",
  "sizeof", "const", "static", "extern", "volatile", "register", "inline", "restrict"
]);

const C_TYPES = new Set([
  "int", "char", "float", "double", "void", "short", "long", "signed",
  "unsigned", "size_t", "bool", "uint8_t", "int8_t", "uint16_t", "int16_t",
  "uint32_t", "int32_t", "uint64_t", "int64_t", "ptrdiff_t", "FILE", "NULL"
]);

const C_BUILTINS = new Set([
  "printf", "scanf", "malloc", "calloc", "realloc", "free", "strlen", "strcpy",
  "strncpy", "strcmp", "strncmp", "strcat", "strncat", "memset", "memcpy",
  "memmove", "memcmp", "atoi", "atol", "atof", "exit", "qsort", "abs", "signal"
]);

// Web Audio API Synthesizer for lightweight tactile feedback
const sound = {
  ctx: null,
  enabled: true,
  volume: 50,

  init() {
    try {
      const savedEn = localStorage.getItem("arenac:sound_enabled");
      if (savedEn !== null) {
        this.enabled = savedEn === "1";
      }
      const savedVol = localStorage.getItem("arenac:sound_volume");
      if (savedVol !== null) {
        const v = parseInt(savedVol, 10);
        if (!isNaN(v) && v >= 0 && v <= 100) {
          this.volume = v;
        }
      }
    } catch (e) {}
  },

  getCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  },

  play(type) {
    if (!this.enabled || this.volume <= 0) return;
    const ctx = this.getCtx();
    if (!ctx) return;

    const master = (this.volume / 100);
    const now = ctx.currentTime;

    try {
      if (type === "click" || type === "key") {
        // Soft, crisp mechanical click/tap
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        const f0 = type === "key" ? 750 : 560;
        osc.frequency.setValueAtTime(f0, now);
        osc.frequency.exponentialRampToValueAtTime(160, now + 0.032);

        gain.gain.setValueAtTime(master * 0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.032);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.035);

      } else if (type === "correct") {
        // Harmonious, uplifting major chime chord (E5 -> A5 -> C#6)
        const triad = [659.25, 880.00, 1108.73];
        triad.forEach((freq, i) => {
          const t = now + i * 0.065;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.linearRampToValueAtTime(master * 0.22, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.29);
        });

      } else if (type === "wrong") {
        // Soft descending low tone through a lowpass filter
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.22);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(450, now);

        gain.gain.setValueAtTime(master * 0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.23);

      } else if (type === "complete") {
        // Celebratory fanfare arpeggio (C5 -> E5 -> G5 -> C6)
        const fanfare = [523.25, 659.25, 783.99, 1046.50];
        fanfare.forEach((freq, i) => {
          const t = now + i * 0.08;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, t);

          gain.gain.setValueAtTime(0.0001, t);
          gain.gain.linearRampToValueAtTime(master * 0.25, t + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(t);
          osc.stop(t + 0.36);
        });

      } else if (type === "preview") {
        // Soft preview tap
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        gain.gain.setValueAtTime(master * 0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.055);
      }
    } catch (e) {
      // Audio autoplay policy or device error
    }
  }
};


const AVATARS = {
  user: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  coder: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"></circle><path d="M6 21v-2a6 6 0 0 1 12 0v2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line><path d="M4 11v2a2 2 0 0 0 2 2"></path><path d="M20 11v2a2 2 0 0 1-2 2"></path></svg>`,
  wizard: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  terminal: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>`,
  chip: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`,
  shield: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  flame: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
  pointer: `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"></path><path d="m13 13 6 6"></path></svg>`
};

const state = {
  activeSession: null,
  lang: "tr",
  theme: "dark",
  homeMode: "quiz",
  setup: { ...DEFAULT_SETUP },
  debugSetup: { ...DEBUG_DEFAULT_SETUP },
  pendingDifficulty: "beginner",
  progress: null,
  lastSession: null,
  lineNumbers: true,
  currentProfile: null
};

let currentScreen = "home";
let timerInterval = null;
let feedbackTimer = null;
let deferredInstallPrompt = null;

const els = {
  brandHome: document.getElementById("brandHome"),
  helpBtn: document.getElementById("helpBtn"),
  docsBtn: document.getElementById("docsBtn"),
  fullscreenBtn: document.getElementById("fullscreenBtn"),
  fsIconEnter: document.getElementById("fsIconEnter"),
  fsIconExit: document.getElementById("fsIconExit"),
  profileBtn: document.getElementById("profileBtn"),
  profileModal: document.getElementById("profileModal"),
  profileClose: document.getElementById("profileClose"),
  profileAvatarIcon: document.getElementById("profileAvatarIcon"),
  profileNameDisplay: document.getElementById("profileNameDisplay"),
  profileTitleDisplay: document.getElementById("profileTitleDisplay"),
  profileStatLevel: document.getElementById("profileStatLevel"),
  profileStatXp: document.getElementById("profileStatXp"),
  profileStatStreak: document.getElementById("profileStatStreak"),
  profileStatAccuracy: document.getElementById("profileStatAccuracy"),
  profileSelector: document.getElementById("profileSelector"),
  profileNewBtn: document.getElementById("profileNewBtn"),
  profileNameInput: document.getElementById("profileNameInput"),
  profileSaveBtn: document.getElementById("profileSaveBtn"),
  profileDeleteBtn: document.getElementById("profileDeleteBtn"),
  profileExportBtn: document.getElementById("profileExportBtn"),
  profileImportBtn: document.getElementById("profileImportBtn"),
  profileFileInput: document.getElementById("profileFileInput"),
  profileFeedback: document.getElementById("profileFeedback"),
  badgesBtn: document.getElementById("badgesBtn"),
  badgesModal: document.getElementById("badgesModal"),
  badgesClose: document.getElementById("badgesClose"),
  badgesCount: document.getElementById("badgesCount"),
  badgesList: document.getElementById("badgesList"),
  profilePinnedBadge: document.getElementById("profilePinnedBadge"),

  settingsBtn: document.getElementById("settingsBtn"),
  screenHome: document.getElementById("screenHome"),
  screenQuiz: document.getElementById("screenQuiz"),
  screenResult: document.getElementById("screenResult"),
  homePanel: document.getElementById("homePanel"),
  levelValue: document.getElementById("levelValue"),
  xpValue: document.getElementById("xpValue"),
  xpFill: document.getElementById("xpFill"),
  streakValue: document.getElementById("streakValue"),
  dailyBtn: document.getElementById("dailyBtn"),
  statsBtn: document.getElementById("statsBtn"),
  mistakesBtn: document.getElementById("mistakesBtn"),
  bookmarksBtn: document.getElementById("bookmarksBtn"),
  modeTabQuiz: document.getElementById("modeTabQuiz"),
  modeTabDebug: document.getElementById("modeTabDebug"),
  modeTabSurvival: document.getElementById("modeTabSurvival"),
  quizSection: document.getElementById("quizSection"),
  debugSection: document.getElementById("debugSection"),
  survivalSection: document.getElementById("survivalSection"),
  survivalBestScore: document.getElementById("survivalBestScore"),
  survivalTotalGames: document.getElementById("survivalTotalGames"),
  survivalStartBtn: document.getElementById("survivalStartBtn"),
  diffGrid: document.getElementById("diffGrid"),
  debugGrid: document.getElementById("debugGrid"),
  quizBackBtn: document.getElementById("quizBackBtn"),
  quizDiffChip: document.getElementById("quizDiffChip"),
  progressFill: document.getElementById("progressFill"),
  progressQuestion: document.getElementById("progressQuestion"),
  timerChip: document.getElementById("timerChip"),
  progressScore: document.getElementById("progressScore"),
  codeBlock: document.getElementById("codeBlock"),
  bookmarkBtn: document.getElementById("bookmarkBtn"),
  questionText: document.getElementById("questionText"),
  optionsGrid: document.getElementById("optionsGrid"),
  kbdHint: document.getElementById("kbdHint"),
  feedback: document.getElementById("feedback"),
  feedbackIcon: document.getElementById("feedbackIcon"),
  feedbackTitle: document.getElementById("feedbackTitle"),
  feedbackAnswer: document.getElementById("feedbackAnswer"),
  feedbackText: document.getElementById("feedbackText"),
  nextBtn: document.getElementById("nextBtn"),
  ringFill: document.getElementById("ringFill"),
  ringPercent: document.getElementById("ringPercent"),
  ringScore: document.getElementById("ringScore"),
  resultTitle: document.getElementById("resultTitle"),
  resultSubtitle: document.getElementById("resultSubtitle"),
  resultBadges: document.getElementById("resultBadges"),
  statCorrect: document.getElementById("statCorrect"),
  statWrong: document.getElementById("statWrong"),
  statDiff: document.getElementById("statDiff"),
  retryBtn: document.getElementById("retryBtn"),
  homeBtn: document.getElementById("homeBtn"),
  shareCardBtn: document.getElementById("shareCardBtn"),
  review: document.getElementById("review"),
  reviewList: document.getElementById("reviewList"),
  confirmModal: document.getElementById("confirmModal"),
  confirmStayBtn: document.getElementById("confirmStayBtn"),
  confirmExitBtn: document.getElementById("confirmExitBtn"),
  debugModal: document.getElementById("debugModal"),
  debugClose: document.getElementById("debugClose"),
  debugPoolLabel: document.getElementById("debugPoolLabel"),
  debugLvlBeginner: document.getElementById("debugLvlBeginner"),
  debugLvlIntermediate: document.getElementById("debugLvlIntermediate"),
  debugLvlAdvanced: document.getElementById("debugLvlAdvanced"),
  debugLvlExpert: document.getElementById("debugLvlExpert"),
  debugModeDesc: document.getElementById("debugModeDesc"),
  debugModeClassicBtn: document.getElementById("debugModeClassicBtn"),
  debugModeExamBtn: document.getElementById("debugModeExamBtn"),
  debugCount5Btn: document.getElementById("debugCount5Btn"),
  debugCount10Btn: document.getElementById("debugCount10Btn"),
  debugCount15Btn: document.getElementById("debugCount15Btn"),
  debugCountAllBtn: document.getElementById("debugCountAllBtn"),
  debugTimeOffBtn: document.getElementById("debugTimeOffBtn"),
  debugTime2Btn: document.getElementById("debugTime2Btn"),
  debugTime5Btn: document.getElementById("debugTime5Btn"),
  debugTime10Btn: document.getElementById("debugTime10Btn"),
  debugStartBtn: document.getElementById("debugStartBtn"),
  installModal: document.getElementById("installModal"),
  installClose: document.getElementById("installClose"),
  installBtn: document.getElementById("installBtn"),
  statsModal: document.getElementById("statsModal"),
  statsClose: document.getElementById("statsClose"),
  statsContent: document.getElementById("statsContent"),
  setupModal: document.getElementById("setupModal"),
  setupClose: document.getElementById("setupClose"),
  setupDiffLabel: document.getElementById("setupDiffLabel"),
  modeClassicBtn: document.getElementById("modeClassicBtn"),
  modeExamBtn: document.getElementById("modeExamBtn"),
  setupModeDesc: document.getElementById("setupModeDesc"),
  topicSelect: document.getElementById("topicSelect"),
  count5Btn: document.getElementById("count5Btn"),
  count10Btn: document.getElementById("count10Btn"),
  count15Btn: document.getElementById("count15Btn"),
  countAllBtn: document.getElementById("countAllBtn"),
  timeOffBtn: document.getElementById("timeOffBtn"),
  time2Btn: document.getElementById("time2Btn"),
  time5Btn: document.getElementById("time5Btn"),
  time10Btn: document.getElementById("time10Btn"),
  setupStartBtn: document.getElementById("setupStartBtn"),
  helpModal: document.getElementById("helpModal"),
  helpClose: document.getElementById("helpClose"),
  docsModal: document.getElementById("docsModal"),
  docsClose: document.getElementById("docsClose"),
  docsTabFormat: document.getElementById("docsTabFormat"),
  docsTabLibs: document.getElementById("docsTabLibs"),
  docsTabMemory: document.getElementById("docsTabMemory"),
  docsTabPrecedence: document.getElementById("docsTabPrecedence"),
  docsSectionFormat: document.getElementById("docsSectionFormat"),
  docsSectionLibs: document.getElementById("docsSectionLibs"),
  docsSectionMemory: document.getElementById("docsSectionMemory"),
  docsSectionPrecedence: document.getElementById("docsSectionPrecedence"),
  settingsModal: document.getElementById("settingsModal"),
  settingsClose: document.getElementById("settingsClose"),
  themeDarkBtn: document.getElementById("themeDarkBtn"),
  themeLightBtn: document.getElementById("themeLightBtn"),
  langTrBtn: document.getElementById("langTrBtn"),
  langEnBtn: document.getElementById("langEnBtn"),
  soundOnBtn: document.getElementById("soundOnBtn"),
  soundOffBtn: document.getElementById("soundOffBtn"),
  volumeRow: document.getElementById("volumeRow"),
  soundVolumeSlider: document.getElementById("soundVolumeSlider"),
  soundVolumeValue: document.getElementById("soundVolumeValue"),
  lineNumsOnBtn: document.getElementById("lineNumsOnBtn"),
  lineNumsOffBtn: document.getElementById("lineNumsOffBtn"),
  exportDataBtn: document.getElementById("exportDataBtn"),
  importDataBtn: document.getElementById("importDataBtn"),
  importFileInput: document.getElementById("importFileInput"),
  fsToggleBtn: document.getElementById("fsToggleBtn"),
  resetBestBtn: document.getElementById("resetBestBtn"),
  settingsFeedback: document.getElementById("settingsFeedback"),
  heroMetaPool: document.getElementById("heroMetaPool"),
  heroMetaDebug: document.getElementById("heroMetaDebug"),
  heroMetaPerRound: document.getElementById("heroMetaPerRound")
};

function dict() {
  return I18N[state.lang] || I18N.tr;
}

function fmt(template, values) {
  return template.replace(/\{(\w+)\}/g, (_, key) => (values[key] !== undefined ? values[key] : `{${key}}`));
}

function esc(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function span(cls, text) {
  return `<span class="${cls}">${esc(text)}</span>`;
}


function formatCode(cCode) {
  const highlighted = highlightC(cCode);
  const lines = highlighted.split("\n");
  const showNums = state.lineNumbers;
  return lines.map((l, idx) => {
    return `<span class="code-line${showNums ? "" : " no-num"}"><span class="line-num">${idx + 1}</span><span class="line-content">${l}</span></span>`;
  }).join("\n");
}

function applyLineNumbers(show) {
  state.lineNumbers = show;
  try {
    localStorage.setItem("arenac:line_numbers", show ? "1" : "0");
  } catch (e) {}
  if (els.lineNumsOnBtn && els.lineNumsOffBtn) {
    els.lineNumsOnBtn.classList.toggle("active", show);
    els.lineNumsOffBtn.classList.toggle("active", !show);
  }
  if (currentScreen === "quiz" && state.activeSession) {
    const q = state.activeSession.queue[state.activeSession.index];
    if (q) {
      els.codeBlock.innerHTML = formatCode(q.code);
    }
  }
}

function highlightC(code) {
  let out = "";
  let i = 0;

  while (i < code.length) {
    const rest = code.slice(i);
    let m;

    // Multi-line comment /* ... */
    if (rest.startsWith("/*")) {
      const endIdx = rest.indexOf("*/");
      const commentText = endIdx !== -1 ? rest.slice(0, endIdx + 2) : rest;
      out += span("tok-comment", commentText);
      i += commentText.length;
      continue;
    }

    // Single-line comment // ...
    m = /^\/\/[^\n]*/.exec(rest);
    if (m) {
      out += span("tok-comment", m[0]);
      i += m[0].length;
      continue;
    }

    // Preprocessor directive #include, #define, etc.
    m = /^#[ \t]*[a-zA-Z_]\w*(?:[ \t]+(?:<[^>\n]+>|"[^"\n]+"))?/.exec(rest);
    if (m) {
      out += span("tok-preprocessor", m[0]);
      i += m[0].length;
      continue;
    }

    // String literals "..."
    m = /^"(?:\\[\s\S]|[^"\\\n])*"/.exec(rest);
    if (m) {
      out += span("tok-string", m[0]);
      i += m[0].length;
      continue;
    }

    // Char literals '...'
    m = /^'(?:\\[\s\S]|[^'\\\n])+'/.exec(rest);
    if (m) {
      out += span("tok-char", m[0]);
      i += m[0].length;
      continue;
    }

    // Numbers: hex 0x..., float, int
    m = /^(?:0[xX][0-9a-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?[fFlLuU]*)/.exec(rest);
    if (m) {
      out += span("tok-number", m[0]);
      i += m[0].length;
      continue;
    }

    // Identifiers
    m = /^[A-Za-z_]\w*/.exec(rest);
    if (m) {
      const word = m[0];
      if (C_KEYWORDS.has(word)) {
        out += span("tok-keyword", word);
      } else if (C_TYPES.has(word)) {
        out += span("tok-type", word);
      } else if (C_BUILTINS.has(word)) {
        out += span("tok-builtin", word);
      } else {
        out += esc(word);
      }
      i += word.length;
      continue;
    }

    // Operators
    m = /^(?:->|\+\+|--|==|!=|<=|>=|&&|\|\||<<=|>>=|<<|>>|\+=|-=|\*=|\/=|%=|&=|\|=|\^=|[+\-*\/%<>=!&|^~?:])/.exec(rest);
    if (m) {
      out += span("tok-op", m[0]);
      i += m[0].length;
      continue;
    }

    out += esc(rest[0]);
    i++;
  }

  return out;
}

function localizedQuestion(q) {
  if (q.question) {
    if (typeof q.question === "object") {
      return q.question[state.lang] || q.question.tr;
    }
    return q.question;
  }
  return dict().qOutput;
}

function localizedOption(opt) {
  if (typeof opt === "object" && opt !== null) {
    return opt[state.lang] || opt.tr || "";
  }
  return String(opt);
}

function topicLabel(topicKey) {
  if (typeof TOPICS !== "undefined" && TOPICS[topicKey]) {
    return TOPICS[topicKey][state.lang] || TOPICS[topicKey].tr;
  }
  return topicKey;
}

function totalQuestions() {
  if (typeof QUESTIONS === "undefined") return 0;
  return ORDER.reduce((sum, key) => sum + (QUESTIONS[key] || []).length, 0);
}

function totalDebugQuestions() {
  if (typeof DEBUG_QUESTIONS === "undefined") return 0;
  return ORDER.reduce((sum, key) => sum + (DEBUG_QUESTIONS[key] || []).length, 0);
}

function getBest(key) {
  try {
    return JSON.parse(localStorage.getItem(`arenac:best:${key}`) || "null");
  } catch (e) {
    return null;
  }
}

function setBest(key, value) {
  try {
    localStorage.setItem(`arenac:best:${key}`, JSON.stringify(value));
  } catch (e) {
    // ignore
  }
}

function getSavedLang() {
  try {
    return localStorage.getItem("arenac:lang");
  } catch (e) {
    return null;
  }
}

function saveLang(lang) {
  try {
    localStorage.setItem("arenac:lang", lang);
  } catch (e) {
    // ignore
  }
}

function getSavedTheme() {
  try {
    return localStorage.getItem("arenac:theme");
  } catch (e) {
    return null;
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("arenac:theme", theme);
  } catch (e) {
    // ignore
  }
}

function getSavedSetup() {
  try {
    return JSON.parse(localStorage.getItem("arenac:setup") || "null") || { ...DEFAULT_SETUP };
  } catch (e) {
    return { ...DEFAULT_SETUP };
  }
}

function saveSetup() {
  try {
    localStorage.setItem("arenac:setup", JSON.stringify(state.setup));
  } catch (e) {
    // ignore
  }
}

function getSavedDebugSetup() {
  try {
    return JSON.parse(localStorage.getItem("arenac:debugSetup") || "null") || { ...DEBUG_DEFAULT_SETUP };
  } catch (e) {
    return { ...DEBUG_DEFAULT_SETUP };
  }
}

function saveDebugSetup() {
  try {
    localStorage.setItem("arenac:debugSetup", JSON.stringify(state.debugSetup));
  } catch (e) {
    // ignore
  }
}

function defaultProgress() {
  return {
    xp: 0,
    streak: 0,
    lastPlayedDate: null,
    dailyCompletedDates: [],
    badges: [],
    mistakes: [],
    bookmarks: [],
    pinnedBadge: null,
    totalAnswered: 0,
    totalCorrect: 0,
    byLevel: {
      beginner: { answered: 0, correct: 0 },
      intermediate: { answered: 0, correct: 0 },
      advanced: { answered: 0, correct: 0 },
      expert: { answered: 0, correct: 0 },
      debug: { answered: 0, correct: 0 }
    },
    topicStats: {}
  };
}

function getProgress() {
  try {
    const raw = localStorage.getItem("arenac:progress");
    if (!raw) return defaultProgress();
    const p = JSON.parse(raw);
    return { ...defaultProgress(), ...p, bookmarks: Array.isArray(p.bookmarks) ? p.bookmarks : [], mistakes: Array.isArray(p.mistakes) ? p.mistakes : [], pinnedBadge: p.pinnedBadge || null };
  } catch (e) {
    return defaultProgress();
  }
}

function saveProgress(p) {
  try {
    localStorage.setItem("arenac:progress", JSON.stringify(p));
  } catch (e) {
    // ignore
  }
  syncCurrentProfileProgress();
}

function utcDayString(date) {
  const d = date || new Date();
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isDailyDone() {
  const today = utcDayString();
  return (state.progress.dailyCompletedDates || []).includes(today);
}

function levelFromXp(xp) {
  return Math.floor(xp / XP_PER_LEVEL) + 1;
}

function applyTheme(theme) {
  state.theme = theme;
  saveTheme(theme);
  document.documentElement.setAttribute("data-theme", theme);
  els.themeDarkBtn.classList.toggle("active", theme === "dark");
  els.themeLightBtn.classList.toggle("active", theme === "light");
}

function applySoundEnabled(enabled) {
  sound.enabled = enabled;
  try {
    localStorage.setItem("arenac:sound_enabled", enabled ? "1" : "0");
  } catch (e) {}
  els.soundOnBtn.classList.toggle("active", enabled);
  els.soundOffBtn.classList.toggle("active", !enabled);
  els.volumeRow.classList.toggle("disabled", !enabled);
  if (enabled) {
    sound.play("click");
  }
}

function applySoundVolume(vol, playPreview = false) {
  sound.volume = Math.max(0, Math.min(100, vol));
  try {
    localStorage.setItem("arenac:sound_volume", String(sound.volume));
  } catch (e) {}
  els.soundVolumeSlider.value = sound.volume;
  els.soundVolumeValue.textContent = `${sound.volume}%`;
  if (playPreview) {
    sound.play("preview");
  }
}

function applyLanguage(lang) {
  state.lang = lang;
  saveLang(lang);
  document.documentElement.setAttribute("lang", lang);
  els.langTrBtn.classList.toggle("active", lang === "tr");
  els.langEnBtn.classList.toggle("active", lang === "en");
  document.title = dict().documentTitle;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict()[key]) {
      el.textContent = dict()[key];
    }
  });

  els.heroMetaPool.innerHTML = fmt(dict().heroMetaPool, { n: totalQuestions() });
  els.heroMetaDebug.innerHTML = fmt(dict().heroMetaDebug, { n: totalDebugQuestions() });
  els.heroMetaPerRound.innerHTML = fmt(dict().heroMetaPerRound, { n: QUESTIONS_PER_ROUND });
  els.kbdHint.innerHTML = dict().kbdHint;

  refreshCurrentView();
}

function refreshCurrentView() {
  toggleHomeMode(state.homeMode || "quiz");
  renderHome();
  renderDebugGrid();
  renderHomePanel();
  renderSetupControls();
  renderDebugSetupControls();
  if (currentScreen === "quiz" && state.activeSession) {
    renderQuestion();
  }
}

function showScreen(name) {
  currentScreen = name;
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(
    name === "home" ? "screenHome" : name === "quiz" ? "screenQuiz" : "screenResult"
  );
  if (target) {
    target.classList.add("active");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function refreshModalOpen() {
  const anyOpen = document.querySelector(".modal-backdrop:not(.hidden)");
  document.body.classList.toggle("modal-open", !!anyOpen);
}

function toggleHomeMode(mode) {
  state.homeMode = mode;
  els.modeTabQuiz.classList.toggle("active", mode === "quiz");
  els.modeTabDebug.classList.toggle("active", mode === "debug");
  els.modeTabSurvival.classList.toggle("active", mode === "survival");
  els.quizSection.classList.toggle("hidden", mode !== "quiz");
  els.debugSection.classList.toggle("hidden", mode !== "debug");
  els.survivalSection.classList.toggle("hidden", mode !== "survival");
  if (mode === "survival") {
    renderSurvivalBanner();
  }
}

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle(array, rng = Math.random) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildPool(difficulty, topic) {
  let pool = [];
  if (difficulty === "mixed") {
    ORDER.forEach((key) => {
      (QUESTIONS[key] || []).forEach((q, idx) => {
        pool.push({ ...q, source: key, ref: `${key}:${idx}` });
      });
    });
  } else {
    pool = (QUESTIONS[difficulty] || []).map((q, idx) => ({
      ...q,
      source: difficulty,
      ref: `${difficulty}:${idx}`
    }));
  }

  if (topic && topic !== "all") {
    pool = pool.filter((q) => q.topic === topic);
  }
  return pool;
}

function buildDebugPool(level) {
  if (typeof DEBUG_QUESTIONS === "undefined") return [];
  return (DEBUG_QUESTIONS[level] || []).map((q, idx) => ({
    ...q,
    source: "debug",
    ref: `debug:${level}:${idx}`,
    question: dict().qDebug
  }));
}


function renderSurvivalBanner() {
  let best = 0;
  try {
    best = parseInt(localStorage.getItem("arenac:best:survival") || "0", 10) || 0;
  } catch (e) {}
  let total = 0;
  try {
    total = parseInt(localStorage.getItem("arenac:survival_games") || "0", 10) || 0;
  } catch (e) {}
  els.survivalBestScore.textContent = best;
  els.survivalTotalGames.textContent = total;
}

function buildSurvivalPool() {
  let pool = [];
  ORDER.forEach((key) => {
    (QUESTIONS[key] || []).forEach((q, idx) => {
      pool.push({ ...q, source: key, ref: `${key}:${idx}` });
    });
  });
  return pool;
}

function startSurvivalQuiz() {
  const pool = shuffle(buildSurvivalPool());
  const meta = {
    type: "survival",
    title: dict().survivalTitle,
    chipClass: "chip-survival"
  };
  startSession(pool, { mode: "survival", count: pool.length, time: 20 }, meta);
}

function showTimeBonusPop(text) {
  const pop = document.createElement("span");
  pop.className = "time-bonus-pop";
  pop.textContent = text;
  if (els.timerChip && els.timerChip.parentElement) {
    els.timerChip.parentElement.appendChild(pop);
    setTimeout(() => pop.remove(), 900);
  }
}

function updateBookmarkBtnUI() {
  const s = state.activeSession;
  if (!s || !els.bookmarkBtn) return;
  const q = s.queue[s.index];
  const isBookmarked = q && q.ref && (state.progress.bookmarks || []).includes(q.ref);
  els.bookmarkBtn.classList.toggle("active", !!isBookmarked);
  const title = isBookmarked
    ? (state.lang === "tr" ? "Yıldızı Kaldır" : "Remove Bookmark")
    : (state.lang === "tr" ? "Soruyu Yıldızla" : "Bookmark Question");
  els.bookmarkBtn.setAttribute("title", title);
  els.bookmarkBtn.setAttribute("aria-label", title);
}

function toggleBookmarkCurrent() {
  const s = state.activeSession;
  if (!s) return;
  const q = s.queue[s.index];
  if (!q || !q.ref) return;
  const p = state.progress;
  if (!p.bookmarks) p.bookmarks = [];
  const idx = p.bookmarks.indexOf(q.ref);
  if (idx !== -1) {
    p.bookmarks.splice(idx, 1);
  } else {
    p.bookmarks.push(q.ref);
  }
  saveProgress(p);
  sound.play("click");
  updateBookmarkBtnUI();
  renderHomePanel();
}

function startBookmarksQuiz() {
  const p = state.progress;
  if (!p.bookmarks || p.bookmarks.length === 0) return;
  const pool = [];
  p.bookmarks.forEach((ref) => {
    if (ref.startsWith("debug:")) {
      const parts = ref.split(":");
      const lvl = parts[1];
      const idx = parseInt(parts[2], 10);
      if (DEBUG_QUESTIONS[lvl] && DEBUG_QUESTIONS[lvl][idx]) {
        pool.push({
          ...DEBUG_QUESTIONS[lvl][idx],
          source: "debug",
          ref,
          question: dict().qDebug
        });
      }
    } else {
      const parts = ref.split(":");
      const diff = parts[0];
      const idx = parseInt(parts[1], 10);
      if (QUESTIONS[diff] && QUESTIONS[diff][idx]) {
        pool.push({
          ...QUESTIONS[diff][idx],
          source: diff,
          ref
        });
      }
    }
  });
  if (pool.length === 0) return;
  const meta = {
    type: "bookmarks",
    title: dict().bookmarksTest,
    chipClass: "chip-bookmarks"
  };
  startSession(pool, { mode: "classic", count: pool.length, time: 0 }, meta);
}

function renderFeedbackExtras(q) {
  let extrasHtml = "";
  if (q.memory) {
    const memText = typeof q.memory === "object" ? (q.memory[state.lang] || q.memory.tr) : q.memory;
    extrasHtml += `
      <div class="feedback-memory-box">
        <span class="memory-label">${state.lang === "tr" ? "Bellek & Pointer Şeması" : "Memory & Pointer Layout"}</span>
        <div>${esc(memText)}</div>
      </div>
    `;
  }
  const expStr = typeof q.explanation === "object" ? (q.explanation[state.lang] || q.explanation.tr) : (q.explanation || "");
  const isUB = expStr.toLowerCase().includes("tanımsız davranış") || expStr.toLowerCase().includes("undefined behavior") || expStr.toLowerCase().includes("ub");
  if (isUB && !q.memory) {
    extrasHtml += `
      <div class="feedback-ub-box">
        <span class="ub-label">${state.lang === "tr" ? "ISO C Standardı · Tanımsız Davranış (UB)" : "ISO C Standard · Undefined Behavior (UB)"}</span>
        <div>${state.lang === "tr" ? "Bu işlem ISO C standardına göre tanımsızdır. Derleyici optimizasyonuna ve mimariye göre beklenmeyen çıktılar veya çökmeler üretebilir." : "This operation invokes Undefined Behavior according to the ISO C Standard. Behavior may vary across compilers, flags, and targets."}</div>
      </div>
    `;
  }
  return extrasHtml;
}

function renderHomePanel() {
  const p = state.progress;
  const currentLvl = levelFromXp(p.xp);
  const xpInCurrentLvl = p.xp % XP_PER_LEVEL;
  const pct = Math.min(100, Math.round((xpInCurrentLvl / XP_PER_LEVEL) * 100));

  els.levelValue.textContent = currentLvl;
  els.xpValue.textContent = `${xpInCurrentLvl} / ${XP_PER_LEVEL} XP`;
  els.xpFill.style.width = `${pct}%`;
  els.streakValue.textContent = p.streak || 0;

  if (isDailyDone()) {
    els.dailyBtn.textContent = dict().dailyDone;
    els.dailyBtn.classList.remove("btn-primary");
    els.dailyBtn.classList.add("btn-ghost");
  } else {
    els.dailyBtn.textContent = dict().dailyChallenge;
    els.dailyBtn.classList.remove("btn-ghost");
    els.dailyBtn.classList.add("btn-primary");
  }

  const mistakeCount = (p.mistakes || []).length;
  els.mistakesBtn.textContent = `${dict().mistakesTest} (${mistakeCount})`;
  els.mistakesBtn.disabled = mistakeCount === 0;

  const bookmarkCount = (p.bookmarks || []).length;
  els.bookmarksBtn.textContent = `${dict().bookmarksTest} (${bookmarkCount})`;
  els.bookmarksBtn.disabled = bookmarkCount === 0;
}

function renderHome() {
  els.diffGrid.innerHTML = "";
  const d = dict();

  CARD_KEYS.forEach((key) => {
    const meta = d.diff[key];
    const count = key === "mixed" ? totalQuestions() : (QUESTIONS[key] || []).length;
    const best = getBest(key);
    const level = key === "mixed" ? 4 : ORDER.indexOf(key) + 1;
    const badgeText = key === "mixed" ? d.levelAll : fmt(d.level, { n: level });

    const card = document.createElement("button");
    card.type = "button";
    card.className = "diff-card";
    card.dataset.diff = key;
    card.innerHTML = `
      <div class="diff-top">
        <span class="diff-badge">${esc(badgeText)}</span>
        <span class="level-bars">${[1, 2, 3, 4].map((n) => `<i class="${n <= level ? "on" : ""}"></i>`).join("")}</span>
      </div>
      <h3 class="diff-title">${esc(meta.label)}</h3>
      <p class="diff-desc">${esc(meta.desc)}</p>
      <div class="diff-foot">
        <span class="diff-count">${esc(fmt(d.questionCount, { n: count }))}</span>
        <span class="diff-best">${best ? esc(fmt(d.best, { a: best.score, b: best.total })) : esc(d.notAttempted)}</span>
        <span class="diff-arrow" aria-hidden="true">→</span>
      </div>`;

    card.addEventListener("click", () => openSetup(key));
    els.diffGrid.appendChild(card);
  });
}

function renderDebugGrid() {
  els.debugGrid.innerHTML = "";
  const d = dict();

  ORDER.forEach((key, index) => {
    const count = buildDebugPool(key).length;
    const best = getBest(`debug_${key}`);
    const card = document.createElement("button");
    card.type = "button";
    card.className = "diff-card";
    card.dataset.diff = key;
    card.innerHTML = `
      <div class="diff-top">
        <span class="diff-badge">${esc(fmt(d.level, { n: index + 1 }))}</span>
        <span class="level-bars">${[1, 2, 3, 4].map((n) => `<i class="${n <= index + 1 ? "on" : ""}"></i>`).join("")}</span>
      </div>
      <h3 class="diff-title">${esc(d.diff[key].label)}</h3>
      <p class="diff-desc">${esc(d.diff[key].desc || d.debugDesc)}</p>
      <div class="diff-foot">
        <span class="diff-count">${esc(fmt(d.questionCount, { n: count }))}</span>
        <span class="diff-best">${best ? esc(fmt(d.best, { a: best.score, b: best.total })) : esc(d.notAttempted)}</span>
        <span class="diff-arrow" aria-hidden="true">→</span>
      </div>`;

    card.addEventListener("click", () => openDebugSetup(key));
    els.debugGrid.appendChild(card);
  });
}

function openSetup(difficulty) {
  state.pendingDifficulty = difficulty;
  const d = dict();
  const meta = d.diff[difficulty];
  const count = difficulty === "mixed" ? totalQuestions() : (QUESTIONS[difficulty] || []).length;
  els.setupDiffLabel.textContent = `${meta.label} · ${fmt(d.questionCount, { n: count })}`;

  // Populate topics
  els.topicSelect.innerHTML = `<option value="all">${d.topicAll}</option>`;
  if (typeof TOPICS !== "undefined") {
    Object.keys(TOPICS).forEach((tKey) => {
      const opt = document.createElement("option");
      opt.value = tKey;
      opt.textContent = topicLabel(tKey);
      if (state.setup.topic === tKey) opt.selected = true;
      els.topicSelect.appendChild(opt);
    });
  }

  renderSetupControls();
  els.setupModal.classList.remove("hidden");
  refreshModalOpen();
}

function closeSetup() {
  els.setupModal.classList.add("hidden");
  refreshModalOpen();
}

function renderSetupControls() {
  const s = state.setup;
  els.modeClassicBtn.classList.toggle("active", s.mode === "classic");
  els.modeExamBtn.classList.toggle("active", s.mode === "exam");
  els.setupModeDesc.textContent = s.mode === "classic" ? dict().modeClassicDesc : dict().modeExamDesc;

  [els.count5Btn, els.count10Btn, els.count15Btn, els.countAllBtn].forEach((btn) => {
    const val = btn === els.countAllBtn ? "all" : parseInt(btn.textContent, 10);
    btn.classList.toggle("active", s.count === val);
  });

  [els.timeOffBtn, els.time2Btn, els.time5Btn, els.time10Btn].forEach((btn) => {
    let tVal = 0;
    if (btn === els.time2Btn) tVal = 120;
    if (btn === els.time5Btn) tVal = 300;
    if (btn === els.time10Btn) tVal = 600;
    btn.classList.toggle("active", s.time === tVal);
  });
}

function openDebugSetup(level = "beginner") {
  state.debugSetup.level = level;
  renderDebugSetupControls();
  els.debugModal.classList.remove("hidden");
  refreshModalOpen();
}

function closeDebugSetup() {
  els.debugModal.classList.add("hidden");
  refreshModalOpen();
}

function renderDebugSetupControls() {
  const s = state.debugSetup;
  const count = (DEBUG_QUESTIONS[s.level] || []).length;
  els.debugPoolLabel.textContent = `${dict().diff[s.level].label} · ${fmt(dict().questionCount, { n: count })}`;

  [els.debugLvlBeginner, els.debugLvlIntermediate, els.debugLvlAdvanced, els.debugLvlExpert].forEach((btn) => {
    const lvl = btn === els.debugLvlBeginner ? "beginner" :
                btn === els.debugLvlIntermediate ? "intermediate" :
                btn === els.debugLvlAdvanced ? "advanced" : "expert";
    btn.classList.toggle("active", s.level === lvl);
  });

  els.debugModeClassicBtn.classList.toggle("active", s.mode === "classic");
  els.debugModeExamBtn.classList.toggle("active", s.mode === "exam");
  els.debugModeDesc.textContent = s.mode === "classic" ? dict().modeClassicDesc : dict().modeExamDesc;

  [els.debugCount5Btn, els.debugCount10Btn, els.debugCount15Btn, els.debugCountAllBtn].forEach((btn) => {
    const val = btn === els.debugCountAllBtn ? "all" : parseInt(btn.textContent, 10);
    btn.classList.toggle("active", s.count === val);
  });

  [els.debugTimeOffBtn, els.debugTime2Btn, els.debugTime5Btn, els.debugTime10Btn].forEach((btn) => {
    let tVal = 0;
    if (btn === els.debugTime2Btn) tVal = 120;
    if (btn === els.debugTime5Btn) tVal = 300;
    if (btn === els.debugTime10Btn) tVal = 600;
    btn.classList.toggle("active", s.time === tVal);
  });
}

function openConfirmExit() {
  els.confirmModal.classList.remove("hidden");
  refreshModalOpen();
}

function closeConfirmExit() {
  els.confirmModal.classList.add("hidden");
  refreshModalOpen();
}

function startSession(pool, config, meta) {
  if (!pool || pool.length === 0) return;
  stopTimer();

  const isSurvival = config.mode === "survival";
  const count = config.count === "all" ? pool.length : Math.min(config.count || 10, pool.length);
  const queue = shuffle(pool).slice(0, count);

  state.activeSession = {
    pool,
    queue,
    config,
    meta,
    isSurvival,
    index: 0,
    score: 0,
    answers: new Array(queue.length).fill(null),
    timeLeft: isSurvival ? 20 : (config.time || 0),
    timerActive: isSurvival || (config.time || 0) > 0,
    answered: false
  };

  state.lastSession = () => startSession(pool, config, meta);

  els.quizDiffChip.textContent = meta.title || "Quiz";
  els.quizDiffChip.className = `chip chip-diff ${meta.chipClass || ""}`;

  if (state.activeSession.timerActive) {
    els.timerChip.classList.remove("hidden");
    startTimer();
  } else {
    els.timerChip.classList.add("hidden");
  }

  showScreen("quiz");
  renderQuestion();
}

function startQuiz(difficulty, config) {
  const pool = buildPool(difficulty, config.topic);
  const meta = {
    type: "quiz",
    difficulty,
    title: dict().diff[difficulty].label
  };
  startSession(pool, config, meta);
}

function startDebugQuiz(config) {
  const pool = buildDebugPool(config.level);
  const meta = {
    type: "debug",
    level: config.level,
    title: `Debug · ${dict().diff[config.level].label}`,
    chipClass: "chip-debug"
  };
  startSession(pool, config, meta);
}

function startDaily(force = false) {
  if (isDailyDone() && !force) {
    showScreen("home");
    return;
  }
  const dateStr = utcDayString();
  let seed = 0;
  for (let i = 0; i < dateStr.length; i++) {
    seed = (seed * 31 + dateStr.charCodeAt(i)) >>> 0;
  }
  const rng = mulberry32(seed);

  const allPool = [];
  ORDER.forEach((key) => {
    (QUESTIONS[key] || []).forEach((q, idx) => {
      allPool.push({ ...q, source: key, ref: `${key}:${idx}` });
    });
  });

  const dailyPool = shuffle(allPool, rng).slice(0, 10);
  const meta = {
    type: "daily",
    date: dateStr,
    title: dict().dailyChallenge,
    chipClass: "chip-daily"
  };
  startSession(dailyPool, { mode: "classic", count: 10, time: 0 }, meta);
}

function startMistakes() {
  const p = state.progress;
  if (!p.mistakes || p.mistakes.length === 0) return;

  const mistakePool = [];
  p.mistakes.forEach((ref) => {
    if (ref.startsWith("debug:")) {
      const parts = ref.split(":");
      const lvl = parts[1];
      const idx = parseInt(parts[2], 10);
      if (DEBUG_QUESTIONS[lvl] && DEBUG_QUESTIONS[lvl][idx]) {
        mistakePool.push({
          ...DEBUG_QUESTIONS[lvl][idx],
          source: "debug",
          ref,
          question: dict().qDebug
        });
      }
    } else {
      const parts = ref.split(":");
      const diff = parts[0];
      const idx = parseInt(parts[1], 10);
      if (QUESTIONS[diff] && QUESTIONS[diff][idx]) {
        mistakePool.push({
          ...QUESTIONS[diff][idx],
          source: diff,
          ref
        });
      }
    }
  });

  if (mistakePool.length === 0) return;

  const meta = {
    type: "mistakes",
    title: dict().mistakesChip,
    chipClass: "chip-mistakes"
  };
  startSession(mistakePool, { mode: "classic", count: mistakePool.length, time: 0 }, meta);
}

function isAnyModalOpen() {
  return !!document.querySelector(".modal-backdrop:not(.hidden)");
}

function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    const s = state.activeSession;
    if (!s || !s.timerActive) return;
    if (isAnyModalOpen()) return; // Pause timer during any open modal
    s.timeLeft--;
    updateTimerDisplay();
    if (s.timeLeft <= 0) {
      stopTimer();
      finishQuiz("timeout");
    }
  }, 1000);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimerDisplay() {
  const s = state.activeSession;
  if (!s || !s.timerActive) return;
  const m = Math.floor(s.timeLeft / 60);
  const sec = s.timeLeft % 60;
  els.timerChip.textContent = s.isSurvival ? `${s.timeLeft}s` : `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  const isDanger = s.isSurvival ? s.timeLeft <= 5 : s.timeLeft <= 30;
  els.timerChip.classList.toggle("danger", isDanger);
  els.timerChip.classList.toggle("urgent", s.isSurvival && s.timeLeft <= 5);
}

function renderQuestion() {
  const s = state.activeSession;
  if (!s) return;
  const q = s.queue[s.index];
  const d = dict();

  // Progress
  const pct = Math.round(((s.index) / s.queue.length) * 100);
  els.progressFill.style.width = `${pct}%`;
  els.progressQuestion.textContent = fmt(d.progressQuestion, { a: s.index + 1, b: s.queue.length });
  els.progressScore.textContent = fmt(d.progressCorrect, { n: s.score });

  // Code & text
  els.codeBlock.innerHTML = formatCode(q.code);
  updateBookmarkBtnUI();
  els.questionText.textContent = localizedQuestion(q);

  // Options
  els.optionsGrid.innerHTML = "";
  s.answered = s.answers[s.index] !== null;

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option";
    btn.type = "button";
    btn.innerHTML = `
      <span class="option-key">${LETTERS[idx]}</span>
      <span class="option-text">${esc(localizedOption(opt))}</span>
    `;

    if (s.config.mode === "exam") {
      if (s.answers[s.index] === idx) {
        btn.classList.add("selected");
      }
    } else if (s.answered) {
      if (idx === q.answer) {
        btn.classList.add("correct");
      } else if (idx === s.answers[s.index]) {
        btn.classList.add("wrong");
      }
      btn.disabled = true;
    }

    btn.addEventListener("click", () => selectOption(idx));
    els.optionsGrid.appendChild(btn);
  });

  // Feedback card
  if (s.answered) {
    if (s.config.mode === "exam") {
      els.feedback.className = "feedback saved";
      els.feedbackIcon.textContent = "✓";
      els.feedbackTitle.textContent = d.savedTitle;
      els.feedbackAnswer.textContent = "";
      els.feedbackText.textContent = d.examNote;
      els.feedback.classList.remove("hidden");
    } else {
      showFeedback(s.answers[s.index]);
    }
  } else {
    els.feedback.classList.add("hidden");
  }

  const isLast = s.index === s.queue.length - 1;
  els.nextBtn.textContent = isLast ? d.finishTest : d.nextQuestion;
}

function selectOption(idx) {
  const s = state.activeSession;
  if (!s) return;
  const q = s.queue[s.index];
  const isExam = s.config.mode === "exam";

  if (!isExam && s.answered) return;

  if (s.isSurvival) {
    const isCorrect = idx === q.answer;
    s.answers[s.index] = idx;
    s.answered = true;
    recordAnswer(q, isCorrect);
    if (isCorrect) {
      s.score++;
      sound.play("correct");
      s.timeLeft = Math.min(60, s.timeLeft + 3);
      showTimeBonusPop("+3s");
      updateTimerDisplay();
      renderQuestion();
      setTimeout(() => {
        if (state.activeSession === s && currentScreen === "quiz") {
          nextQuestion();
        }
      }, 340);
    } else {
      sound.play("wrong");
      renderQuestion();
      setTimeout(() => {
        if (state.activeSession === s && currentScreen === "quiz") {
          finishQuiz("survival_wrong");
        }
      }, 420);
    }
    return;
  }

  const wasAnswered = s.answers[s.index] !== null;
  const prevAnswer = s.answers[s.index];
  s.answers[s.index] = idx;
  s.answered = true;

  if (isExam) {
    if (wasAnswered && prevAnswer === q.answer && idx !== q.answer) {
      s.score = Math.max(0, s.score - 1);
    } else if ((!wasAnswered || prevAnswer !== q.answer) && idx === q.answer) {
      s.score++;
    }
    sound.play("click");
    renderQuestion();
  } else {
    const isCorrect = idx === q.answer;
    if (isCorrect) {
      s.score++;
      sound.play("correct");
    } else {
      sound.play("wrong");
    }
    recordAnswer(q, isCorrect);
    renderQuestion();
  }
}

function showFeedback(chosenIdx) {
  const s = state.activeSession;
  const q = s.queue[s.index];
  const d = dict();
  const isCorrect = chosenIdx === q.answer;

  els.feedback.className = `feedback ${isCorrect ? "correct" : "wrong"}`;
  els.feedbackIcon.textContent = isCorrect ? "✓" : "✗";
  els.feedbackTitle.textContent = isCorrect ? d.correctTitle : d.wrongTitle;

  if (isCorrect) {
    els.feedbackAnswer.textContent = "";
  } else {
    const yourText = chosenIdx !== null ? localizedOption(q.options[chosenIdx]) : d.unanswered;
    const correctText = localizedOption(q.options[q.answer]);
    els.feedbackAnswer.innerHTML = `
      <div><strong>${d.yourAnswer}</strong> ${esc(yourText)}</div>
      <div><strong>${d.correctAnswer}</strong> ${esc(correctText)}</div>
    `;
  }

  const exp = typeof q.explanation === "object" ? (q.explanation[state.lang] || q.explanation.tr) : q.explanation;
  els.feedbackText.innerHTML = `${esc(exp || "")}${renderFeedbackExtras(q)}`;
  els.feedback.classList.remove("hidden");
}

function recordAnswer(q, isCorrect) {
  const p = state.progress;
  p.totalAnswered = (p.totalAnswered || 0) + 1;
  if (isCorrect) {
    p.totalCorrect = (p.totalCorrect || 0) + 1;
    p.xp = (p.xp || 0) + 25;
    // Remove from mistakes if corrected
    if (p.mistakes && p.mistakes.includes(q.ref)) {
      p.mistakes = p.mistakes.filter((m) => m !== q.ref);
    }
  } else {
    // Add to mistakes
    if (!p.mistakes) p.mistakes = [];
    if (!p.mistakes.includes(q.ref)) {
      p.mistakes.push(q.ref);
    }
  }

  // Level stats
  const lvlKey = q.source || "beginner";
  if (!p.byLevel[lvlKey]) p.byLevel[lvlKey] = { answered: 0, correct: 0 };
  p.byLevel[lvlKey].answered++;
  if (isCorrect) p.byLevel[lvlKey].correct++;

  // Topic stats
  const tKey = q.topic || "general";
  if (!p.topicStats[tKey]) p.topicStats[tKey] = { answered: 0, correct: 0 };
  p.topicStats[tKey].answered++;
  if (isCorrect) p.topicStats[tKey].correct++;

  saveProgress(p);
  renderHomePanel();
}

function nextQuestion() {
  const s = state.activeSession;
  if (!s) return;
  if (s.index < s.queue.length - 1) {
    s.index++;
    renderQuestion();
  } else {
    finishQuiz("completed");
  }
}

function updateStreak(p) {
  const today = utcDayString();
  if (p.lastPlayedDate === today) return;

  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yStr = utcDayString(yesterday);

  if (p.lastPlayedDate === yStr) {
    p.streak = (p.streak || 0) + 1;
  } else {
    p.streak = 1;
  }
  p.lastPlayedDate = today;
}

function evaluateBadges(p, percent) {
  const s = state.activeSession;
  const newBadges = [];
  if (!p.badges) p.badges = [];

  const grant = (bKey) => {
    if (!p.badges.includes(bKey)) {
      p.badges.push(bKey);
      newBadges.push(bKey);
    }
  };

  grant("first_step");

  if (percent === 100) grant("sharp_eye");
  if (percent === 100 && s.meta.difficulty === "expert") grant("expert_ace");
  if (p.totalAnswered >= 100) grant("century");
  if (p.totalAnswered >= 500) grant("five_hundred");
  if (p.streak >= 3) grant("streak_3");
  if (p.streak >= 7) grant("streak_7");
  if (s.config.time > 0 && percent >= 80) grant("timed_hero");
  if (s.config.mode === "exam" && percent >= 80) grant("exam_master");
  if (s.meta.type === "daily" && percent >= 70) grant("daily_done");
  if (s.meta.type === "mistakes" && percent >= 80) grant("mistake_fixer");
  if (s.meta.type === "debug") grant("debug_first");
  if (s.meta.type === "debug" && percent === 100) grant("debug_perfect");
  if (s.meta.type === "debug" && s.meta.level === "expert" && percent === 100) grant("debug_expert");
  if (levelFromXp(p.xp) >= 5) grant("level_5");

  // Check pointer master
  const ptrStats = p.topicStats["pointers"] || { correct: 0 };
  if (ptrStats.correct >= 20) grant("pointer_master");
  if (levelFromXp(p.xp) >= 10) grant("level_10");
  try {
    const survivalBest = parseInt(localStorage.getItem("arenac:best:survival") || "0", 10) || 0;
    if (survivalBest >= 10 || (s.isSurvival && s.score >= 10)) grant("survival_streak_10");
    if (survivalBest >= 20 || (s.isSurvival && s.score >= 20)) grant("survival_streak_20");
  } catch (e) {}

  const trapStats = (p.topicStats["traps"] || { correct: 0 });
  const expStats = (p.byLevel["expert"] || { correct: 0 });
  if (trapStats.correct >= 15 || expStats.correct >= 25) grant("ub_survivor");


  return newBadges;
}

function finishQuiz(reason) {
  stopTimer();
  const s = state.activeSession;
  if (!s) return;
  sound.play("complete");

  // In exam mode, process all answers at the end
  if (s.config.mode === "exam") {
    s.queue.forEach((q, idx) => {
      const chosen = s.answers[idx];
      const isCorrect = chosen === q.answer;
      recordAnswer(q, isCorrect);
    });
  }

  const p = state.progress;
  updateStreak(p);

  if (s.meta.type === "daily") {
    const today = utcDayString();
    if (!p.dailyCompletedDates) p.dailyCompletedDates = [];
    if (!p.dailyCompletedDates.includes(today)) {
      p.dailyCompletedDates.push(today);
    }
  }

  const total = s.queue.length;
  const score = s.score;
  const percent = total > 0 ? Math.round((score / total) * 100) : 0;

  // Check best score
  let bestKey = s.meta.difficulty;
  if (s.meta.type === "debug") bestKey = `debug_${s.meta.level}`;
  if (bestKey) {
    const currentBest = getBest(bestKey);
    if (!currentBest || score > currentBest.score) {
      setBest(bestKey, { score, total, date: utcDayString() });
    }
  }

  if (s.isSurvival) {
    try {
      const prevGames = parseInt(localStorage.getItem("arenac:survival_games") || "0", 10) || 0;
      localStorage.setItem("arenac:survival_games", String(prevGames + 1));
      const prevBest = parseInt(localStorage.getItem("arenac:best:survival") || "0", 10) || 0;
      if (s.score > prevBest) {
        localStorage.setItem("arenac:best:survival", String(s.score));
      }
    } catch (e) {}
    renderSurvivalBanner();
  }

  const newBadges = evaluateBadges(p, percent);
  saveProgress(p);

  renderResult(newBadges, percent, score, total, reason);
  showScreen("result");
}

let numberAnimTimer = null;

function animateNumber(target, isPercent = true) {
  if (numberAnimTimer) {
    clearInterval(numberAnimTimer);
    numberAnimTimer = null;
  }
  const el = els.ringPercent;
  let cur = 0;
  if (target === 0) {
    el.textContent = isPercent ? "0%" : "0";
    return;
  }
  const step = Math.max(1, Math.floor(target / 25));
  numberAnimTimer = setInterval(() => {
    cur += step;
    if (cur >= target) {
      cur = target;
      clearInterval(numberAnimTimer);
      numberAnimTimer = null;
    }
    el.textContent = isPercent ? `${cur}%` : `${cur}`;
  }, 20);
}

function renderResult(newBadges, percent, score, total, reason) {
  const s = state.activeSession;
  const d = dict();

  // Ring animation
  if (s && s.isSurvival) {
    const ringFraction = Math.min(1, score / 20);
    const offset = RING_CIRC - ringFraction * RING_CIRC;
    els.ringFill.style.strokeDashoffset = offset;
    animateNumber(score, false);
    els.ringScore.textContent = state.lang === "tr" ? "Soru Serisi" : "Question Streak";
  } else {
    const offset = RING_CIRC - (percent / 100) * RING_CIRC;
    els.ringFill.style.strokeDashoffset = offset;
    animateNumber(percent, true);
    els.ringScore.textContent = `${score} / ${total}`;
  }

  // Title / Subtitle
  let tier = 4;
  if (percent === 100) tier = 0;
  else if (percent >= 80) tier = 1;
  else if (percent >= 60) tier = 2;
  else if (percent >= 40) tier = 3;

  if (s && s.isSurvival) {
    els.ringPercent.textContent = `${score}`;
    els.ringScore.textContent = state.lang === "tr" ? "Soru" : "Questions";
    els.resultTitle.textContent = fmt(d.survivalResult, { n: score });
    els.resultSubtitle.textContent = reason === "timeout"
      ? (state.lang === "tr" ? "Süre bitti! Müthiş bir refleks ve bilgi mücadelesiydi." : "Time's up! Great display of speed and knowledge.")
      : (state.lang === "tr" ? "Yanlış cevap! Hayatta kalma serin sona erdi." : "Wrong answer! Your survival streak ended.");
  } else {
    els.resultTitle.textContent = d.result[tier].title;
    els.resultSubtitle.textContent = d.result[tier].sub;
  }

  // Badges
  if (newBadges.length > 0) {
    const badgeNames = newBadges.map((b) => d.badges[b]?.name || b).join(", ");
    els.resultBadges.textContent = `${d.newBadges} ${badgeNames}`;
    els.resultBadges.classList.remove("hidden");
  } else {
    els.resultBadges.classList.add("hidden");
  }

  // Stats counters
  els.statCorrect.textContent = score;
  if (s && s.isSurvival) {
    els.statWrong.textContent = reason === "timeout" ? 0 : 1;
    els.statDiff.textContent = d.survivalTitle;
  } else {
    els.statWrong.textContent = total - score;
    els.statDiff.textContent = s.meta.title || "-";
  }

  // Review section: in survival mode, only check questions reached
  const wrongs = [];
  const maxIdx = (s && s.isSurvival) ? s.index : s.queue.length - 1;
  for (let idx = 0; idx <= maxIdx && idx < s.queue.length; idx++) {
    const q = s.queue[idx];
    if (s.answers[idx] !== null && s.answers[idx] !== q.answer) {
      wrongs.push({ q, chosen: s.answers[idx], index: idx });
    }
  }

  if (wrongs.length > 0) {
    els.reviewList.innerHTML = "";
    wrongs.forEach(({ q, chosen, index }) => {
      const item = document.createElement("div");
      item.className = "review-item";
      const yourText = chosen !== null ? localizedOption(q.options[chosen]) : d.unanswered;
      const correctText = localizedOption(q.options[q.answer]);
      const exp = typeof q.explanation === "object" ? (q.explanation[state.lang] || q.explanation.tr) : q.explanation;

      item.innerHTML = `
        <div class="review-head">
          <span class="chip">${fmt(d.reviewItem, { n: index + 1 })}</span>
          <span class="review-q">${esc(localizedQuestion(q))}</span>
        </div>
        <pre class="code review-code"><code>${formatCode(q.code)}</code></pre>
        <div class="review-answers">
          <div class="review-ans review-wrong"><strong>${d.yourAnswer}</strong> ${esc(yourText)}</div>
          <div class="review-ans review-correct"><strong>${d.correctAnswer}</strong> ${esc(correctText)}</div>
        </div>
        <p class="review-exp">${esc(exp)}</p>
        ${renderFeedbackExtras(q)}
      `;
      els.reviewList.appendChild(item);
    });
    els.review.classList.remove("hidden");
  } else {
    els.review.classList.add("hidden");
  }
}

function renderStats() {
  const p = state.progress;
  const d = dict();
  const total = p.totalAnswered || 0;
  const correct = p.totalCorrect || 0;
  const acc = total > 0 ? Math.round((correct / total) * 100) : 0;

  let html = `
    <div class="stats-grid">
      <div class="stat-box">
        <span class="stat-num">${total}</span>
        <span class="stat-lbl">${d.statsAnswered}</span>
      </div>
      <div class="stat-box">
        <span class="stat-num">%${acc}</span>
        <span class="stat-lbl">${d.statsAccuracy}</span>
      </div>
      <div class="stat-box">
        <span class="stat-num">${levelFromXp(p.xp)}</span>
        <span class="stat-lbl">${d.statLevelLabel}</span>
      </div>
      <div class="stat-box">
        <span class="stat-num">${p.streak}</span>
        <span class="stat-lbl">${d.statStreakLabel}</span>
      </div>
    </div>
  `;

  // By difficulty
  html += `
    <h4 class="stats-section-title">${d.statsByLevel}</h4>
    <div class="level-stats-list">
  `;
  ORDER.forEach((key) => {
    const l = p.byLevel[key] || { answered: 0, correct: 0 };
    const lAcc = l.answered > 0 ? Math.round((l.correct / l.answered) * 100) : 0;
    html += `
      <div class="level-stat-row">
        <span>${d.diff[key].label}</span>
        <span>${l.correct} / ${l.answered} (%${lAcc})</span>
      </div>
    `;
  });
  html += `</div>`;

  // Weak topics
  const weak = Object.keys(p.topicStats || {})
    .map((k) => ({
      key: k,
      ...p.topicStats[k],
      rate: p.topicStats[k].answered > 0 ? p.topicStats[k].correct / p.topicStats[k].answered : 1
    }))
    .filter((t) => t.answered >= 3)
    .sort((a, b) => a.rate - b.rate)
    .slice(0, 3);

  if (weak.length > 0) {
    html += `
      <h4 class="stats-section-title">${d.statsWeakTopics}</h4>
      <div class="weak-topics-list">
    `;
    weak.forEach((w) => {
      const wAcc = Math.round(w.rate * 100);
      html += `
        <div class="level-stat-row">
          <span>${topicLabel(w.key)}</span>
          <span style="color:var(--red);">%${wAcc}</span>
        </div>
      `;
    });
    html += `</div>`;
  }

  // Badges
  html += `
    <h4 class="stats-section-title">${d.statsBadges} (${(p.badges || []).length}/${BADGE_ORDER.length})</h4>
    <div class="badges-grid">
  `;
  BADGE_ORDER.forEach((bKey) => {
    const unlocked = (p.badges || []).includes(bKey);
    const bInfo = d.badges[bKey] || { name: bKey, desc: "" };
    const iconSvg = unlocked
      ? `<svg class="icon icon-badge" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`
      : `<svg class="icon icon-badge" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`;
    html += `
      <div class="badge-item ${unlocked ? "unlocked" : "locked"}">
        <span class="badge-icon">${iconSvg}</span>
        <div class="badge-info">
          <strong>${esc(bInfo.name)}</strong>
          <small>${esc(bInfo.desc)}</small>
        </div>
      </div>
    `;
  });
  html += `</div>`;

  els.statsContent.innerHTML = html;
}

function openStats() {
  renderStats();
  els.statsModal.classList.remove("hidden");
  refreshModalOpen();
}

function closeStats() {
  els.statsModal.classList.add("hidden");
  refreshModalOpen();
}

function openHelp() {
  els.helpModal.classList.remove("hidden");
  refreshModalOpen();
}

function closeHelp() {
  els.helpModal.classList.add("hidden");
  refreshModalOpen();
}

function openDocs() {
  els.docsModal.classList.remove("hidden");
  refreshModalOpen();
}

function closeDocs() {
  els.docsModal.classList.add("hidden");
  refreshModalOpen();
}

function switchDocsTab(tabKey) {
  const tabs = [
    { btn: els.docsTabFormat, sec: els.docsSectionFormat, key: "format" },
    { btn: els.docsTabLibs, sec: els.docsSectionLibs, key: "libs" },
    { btn: els.docsTabMemory, sec: els.docsSectionMemory, key: "memory" },
    { btn: els.docsTabPrecedence, sec: els.docsSectionPrecedence, key: "precedence" }
  ];
  tabs.forEach((t) => {
    const isActive = t.key === tabKey;
    t.btn.classList.toggle("active", isActive);
    t.btn.setAttribute("aria-selected", isActive ? "true" : "false");
    t.sec.classList.toggle("hidden", !isActive);
  });
}


function exportData() {
  syncCurrentProfileProgress();
  const backup = {
    appName: "ArenaC",
    version: 3,
    exportDate: new Date().toISOString(),
    progress: state.progress,
    bestScores: {},
    settings: {
      theme: state.theme,
      lang: state.lang,
      soundEnabled: sound.enabled,
      soundVolume: sound.volume,
      lineNumbers: state.lineNumbers
    },
    profiles: getProfiles(),
    activeProfileId: getActiveProfileId()
  };
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith("arenac:best:") || k === "arenac:survival_games")) {
        backup.bestScores[k] = localStorage.getItem(k);
      }
    }
  } catch (e) {}

  const jsonStr = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const dateStr = utcDayString();
  a.href = url;
  a.download = `arenac_tam_yedek_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showSettingsFeedback(dict().exportDone);
}

function importData(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const backup = JSON.parse(e.target.result);
      if (!backup || (!backup.progress && !backup.version && !backup.profile)) {
        throw new Error("Invalid structure");
      }
      if (backup.progress) {
        state.progress = { ...defaultProgress(), ...backup.progress };
        saveProgress(state.progress);
      }
      if (backup.bestScores && typeof backup.bestScores === "object") {
        Object.keys(backup.bestScores).forEach((k) => {
          try {
            localStorage.setItem(k, backup.bestScores[k]);
          } catch (err) {}
        });
      }
      if (Array.isArray(backup.profiles) && backup.profiles.length > 0) {
        saveProfiles(backup.profiles);
      }
      if (backup.activeProfileId) {
        setActiveProfileId(backup.activeProfileId);
      }
      if (backup.settings) {
        if (typeof backup.settings.theme === "string") applyTheme(backup.settings.theme);
        if (typeof backup.settings.lang === "string") applyLanguage(backup.settings.lang);
        if (typeof backup.settings.soundEnabled === "boolean") applySoundEnabled(backup.settings.soundEnabled);
        if (typeof backup.settings.soundVolume === "number") applySoundVolume(backup.settings.soundVolume);
        if (typeof backup.settings.lineNumbers === "boolean") applyLineNumbers(backup.settings.lineNumbers);
      }
      refreshCurrentView();
      renderSurvivalBanner();
      renderProfileModalUI();
      showSettingsFeedback(dict().importDone);
      sound.play("correct");
    } catch (err) {
      showSettingsFeedback(dict().importError);
      sound.play("wrong");
    }
  };
  reader.readAsText(file);
}

function generateScoreCard() {
  const s = state.activeSession;
  if (!s) return;
  const p = state.progress;
  const d = dict();

  const canvas = document.createElement("canvas");
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  // Background - Dark gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 630);
  bgGrad.addColorStop(0, "#0b0c10");
  bgGrad.addColorStop(0.5, "#12141d");
  bgGrad.addColorStop(1, "#07080b");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 630);

  // Subtle radial glow accents
  const glow = ctx.createRadialGradient(250, 180, 20, 250, 180, 400);
  glow.addColorStop(0, "rgba(255, 212, 59, 0.12)");
  glow.addColorStop(1, "rgba(255, 212, 59, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1200, 630);

  const glow2 = ctx.createRadialGradient(950, 480, 20, 950, 480, 450);
  glow2.addColorStop(0, "rgba(56, 189, 248, 0.08)");
  glow2.addColorStop(1, "rgba(56, 189, 248, 0)");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, 1200, 630);

  // Card border outline
  ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
  ctx.lineWidth = 2;
  ctx.strokeRect(30, 30, 1140, 570);

  // App Brand / Logo
  ctx.fillStyle = "#ffd43b";
  ctx.font = "900 32px 'JetBrains Mono', monospace, sans-serif";
  ctx.fillText("ArenaC", 70, 95);

  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.font = "600 18px 'JetBrains Mono', monospace, sans-serif";
  ctx.fillText("·  C Dili Mantık & Algoritma Testi", 215, 95);

  // Mode / Difficulty Chip
  const modeTitle = (s.meta && s.meta.title ? s.meta.title : "C Mantık Testi").toUpperCase();
  ctx.font = "700 14px 'JetBrains Mono', monospace, sans-serif";
  const chipWidth = ctx.measureText(modeTitle).width + 36;
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(70, 130, chipWidth, 36, 18);
  } else {
    ctx.rect(70, 130, chipWidth, 36);
  }
  ctx.fill();
  ctx.fillStyle = "#38bdf8";
  ctx.fillText(modeTitle, 88, 154);

  // Main Score Block
  const total = s.queue.length;
  const score = s.score;
  const percent = s.isSurvival ? score : (total > 0 ? Math.round((score / total) * 100) : 0);

  if (s.isSurvival) {
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 84px 'Archivo', 'Segoe UI', sans-serif";
    ctx.fillText(`${score}`, 70, 270);

    ctx.fillStyle = "#ffd43b";
    ctx.font = "700 34px 'Archivo', 'Segoe UI', sans-serif";
    ctx.fillText(state.lang === "tr" ? "Soru Serisi" : "Streak", 210, 260);

    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "500 20px 'Manrope', 'Segoe UI', sans-serif";
    ctx.fillText(state.lang === "tr" ? "Hayatta Kalma & Zamana Karşı Meydan Okuma" : "Time Attack & Survival Challenge", 70, 320);
  } else {
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 96px 'Archivo', 'Segoe UI', sans-serif";
    ctx.fillText(`%${percent}`, 70, 280);

    ctx.fillStyle = "#ffd43b";
    ctx.font = "700 34px 'Archivo', 'Segoe UI', sans-serif";
    ctx.fillText(`${score} / ${total} ${state.lang === "tr" ? "Doğru" : "Correct"}`, 340, 260);

    let tier = 4;
    if (percent === 100) tier = 0;
    else if (percent >= 80) tier = 1;
    else if (percent >= 60) tier = 2;
    else if (percent >= 40) tier = 3;
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.font = "600 22px 'Manrope', 'Segoe UI', sans-serif";
    ctx.fillText(d.result[tier].title + " — " + d.result[tier].sub, 70, 335);
  }

  // Stats Cards Row
  const cards = [
    { label: state.lang === "tr" ? "SEVİYE" : "LEVEL", val: `Lvl ${levelFromXp(p.xp)}` },
    { label: state.lang === "tr" ? "TOPLAM XP" : "TOTAL XP", val: `${p.xp} XP` },
    { label: state.lang === "tr" ? "GÜN SERİSİ" : "STREAK", val: `${p.streak || 1} Gün` },
    { label: state.lang === "tr" ? "DOĞRULUK" : "ACCURACY", val: `%${p.totalAnswered ? Math.round((p.totalCorrect / p.totalAnswered) * 100) : 0}` }
  ];

  cards.forEach((c, idx) => {
    const x = 70 + idx * 265;
    const y = 390;
    ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    if (ctx.roundRect) {
      ctx.roundRect(x, y, 240, 110, 16);
    } else {
      ctx.rect(x, y, 240, 110);
    }
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "700 12px 'JetBrains Mono', monospace, sans-serif";
    ctx.fillText(c.label, x + 20, y + 36);

    ctx.fillStyle = "#ffffff";
    ctx.font = "800 26px 'Archivo', 'Segoe UI', sans-serif";
    ctx.fillText(c.val, x + 20, y + 80);
  });

  // Footer text
  ctx.fillStyle = "rgba(255, 255, 255, 0.35)";
  ctx.font = "500 15px 'JetBrains Mono', monospace, sans-serif";
  ctx.fillText(`ArenaC · ${utcDayString()} · arenac.github.io`, 70, 560);

  // Download PNG
  try {
    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `arenac_skor_${utcDayString()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    sound.play("click");
  } catch (e) {
    console.error("Canvas export failed", e);
  }
}


let profileFeedbackTimer = null;

function showProfileFeedback(msg) {
  els.profileFeedback.textContent = msg;
  els.profileFeedback.classList.remove("hidden");
  if (profileFeedbackTimer) clearTimeout(profileFeedbackTimer);
  profileFeedbackTimer = setTimeout(() => {
    els.profileFeedback.classList.add("hidden");
  }, 2600);
}

function getProfileTitle(level) {
  const d = dict();
  if (level <= 2) return d.profileApprentice;
  if (level <= 4) return d.profileCoder;
  if (level <= 7) return d.profilePointerMaster;
  if (level <= 10) return d.profileArchitect;
  return d.profileGuru;
}

function getProfiles() {
  try {
    const raw = localStorage.getItem("arenac:profiles");
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr) && arr.length > 0) return arr;
    }
  } catch (e) {}

  const defaultProf = {
    id: "prof_default",
    name: dict().profileDefaultName,
    avatar: "user",
    createdAt: utcDayString(),
    progress: state.progress || defaultProgress()
  };
  saveProfiles([defaultProf]);
  return [defaultProf];
}

function saveProfiles(profiles) {
  try {
    localStorage.setItem("arenac:profiles", JSON.stringify(profiles));
  } catch (e) {}
}

function getActiveProfileId() {
  try {
    return localStorage.getItem("arenac:active_profile_id") || "prof_default";
  } catch (e) {
    return "prof_default";
  }
}

function setActiveProfileId(id) {
  try {
    localStorage.setItem("arenac:active_profile_id", id);
  } catch (e) {}
}

function getCurrentProfile() {
  const profiles = getProfiles();
  const activeId = getActiveProfileId();
  const found = profiles.find((p) => p.id === activeId);
  return found || profiles[0];
}

function syncCurrentProfileProgress() {
  const profiles = getProfiles();
  const cur = getCurrentProfile();
  const idx = profiles.findIndex((p) => p.id === cur.id);
  if (idx !== -1) {
    profiles[idx].progress = state.progress;
    profiles[idx].bestScores = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && (k.startsWith("arenac:best:") || k === "arenac:survival_games")) {
        profiles[idx].bestScores[k] = localStorage.getItem(k);
      }
    }
    saveProfiles(profiles);
  }
}

function updateProfileNavbarIcon() {
  const cur = getCurrentProfile();
  els.profileBtn.setAttribute("title", `${dict().profileBtnTitle} (${cur.name})`);
  els.profileBtn.setAttribute("aria-label", `${dict().profileBtnTitle} (${cur.name})`);
}


function openBadgesModal() {
  renderBadgesShowcase();
  els.badgesModal.classList.remove("hidden");
  refreshModalOpen();
}

function closeBadgesModal() {
  els.badgesModal.classList.add("hidden");
  refreshModalOpen();
}

function togglePinBadge(bKey) {
  const p = state.progress;
  const d = dict();
  if (p.pinnedBadge === bKey) {
    p.pinnedBadge = null;
    showProfileFeedback(d.badgeUnpinnedDone);
  } else {
    p.pinnedBadge = bKey;
    showProfileFeedback(`${d.badgePinnedDone} (${d.badges[bKey]?.name || bKey})`);
  }
  saveProgress(p);
  sound.play("click");
  renderBadgesShowcase();
  renderProfilePinnedBadgeUI();
}

function renderBadgesShowcase() {
  const p = state.progress;
  const d = dict();
  const unlockedBadges = p.badges || [];
  els.badgesCount.textContent = `${unlockedBadges.length} / ${BADGE_ORDER.length}`;

  const tiers = [
    { key: "easy", label: d.tierEasy, pillCls: "tier-easy" },
    { key: "medium", label: d.tierMedium, pillCls: "tier-medium" },
    { key: "hard", label: d.tierHard, pillCls: "tier-hard" },
    { key: "legendary", label: d.tierLegendary, pillCls: "tier-legendary" }
  ];

  let html = "";
  tiers.forEach((tier) => {
    const tierBadges = BADGE_ORDER.filter((bKey) => BADGE_META[bKey] && BADGE_META[bKey].tier === tier.key);
    if (tierBadges.length === 0) return;

    html += `
      <div class="badge-tier-section">
        <div class="badge-tier-head">
          <span class="badge-tier-title">${tier.label}</span>
          <span class="badge-tier-pill ${tier.pillCls}">${tier.label}</span>
        </div>
        <div class="badge-tier-grid">
    `;

    tierBadges.forEach((bKey) => {
      const unlocked = unlockedBadges.includes(bKey);
      const isPinned = p.pinnedBadge === bKey;
      const meta = BADGE_META[bKey] || { icon: "" };
      const info = d.badges[bKey] || { name: bKey, desc: "" };

      html += `
        <div class="showcase-badge-card ${unlocked ? "unlocked" : "locked"} ${isPinned ? "is-pinned" : ""}">
          <div class="badge-card-top">
            <span class="badge-card-icon">${unlocked ? meta.icon : '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>'}</span>
            <div class="badge-card-details">
              <strong class="badge-card-name">${esc(info.name)}</strong>
              <small class="badge-card-desc">${esc(info.desc)}</small>
            </div>
          </div>
          <div class="badge-card-foot">
            ${unlocked
              ? `<span class="badge-status-tag">✓ ${d.badgeEarned}</span>
                 <button class="badge-pin-btn ${isPinned ? "is-pinned" : ""}" type="button" data-badge="${bKey}">
                   ★ ${isPinned ? d.badgePinned : d.badgePin}
                 </button>`
              : `<span class="badge-status-tag locked-tag">${d.badgeLocked}</span>`
            }
          </div>
        </div>
      `;
    });

    html += `</div></div>`;
  });

  els.badgesList.innerHTML = html;

  // Bind pin buttons
  els.badgesList.querySelectorAll(".badge-pin-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bKey = btn.dataset.badge;
      if (bKey) togglePinBadge(bKey);
    });
  });
}

function renderProfilePinnedBadgeUI() {
  const p = state.progress;
  const d = dict();
  const bKey = p.pinnedBadge;

  if (bKey && d.badges[bKey]) {
    const info = d.badges[bKey];
    const meta = BADGE_META[bKey] || { tier: "medium", icon: "" };
    const tierName = meta.tier === "easy" ? d.tierEasy : meta.tier === "hard" ? d.tierHard : meta.tier === "legendary" ? d.tierLegendary : d.tierMedium;

    els.profilePinnedBadge.innerHTML = `
      <div class="profile-pinned-card">
        <div class="pinned-card-left">
          <span class="pinned-badge-icon">${meta.icon}</span>
          <div class="pinned-badge-info">
            <span class="pinned-badge-tag">★ ${d.pinnedShowcaseTitle} · ${tierName}</span>
            <strong class="pinned-badge-name">${esc(info.name)}</strong>
            <small class="pinned-badge-desc">${esc(info.desc)}</small>
          </div>
        </div>
        <button class="btn btn-ghost btn-xs unpin-badge-btn" type="button" title="Vitrin rozetini kaldır">×</button>
      </div>
    `;

    const unpinBtn = els.profilePinnedBadge.querySelector(".unpin-badge-btn");
    if (unpinBtn) {
      unpinBtn.addEventListener("click", () => togglePinBadge(bKey));
    }
  } else {
    els.profilePinnedBadge.innerHTML = `
      <div class="profile-pinned-empty">
        <span class="pinned-empty-icon">★</span>
        <div class="pinned-empty-text">
          <strong>${d.noPinnedBadge}</strong>
          <small>${d.noPinnedBadgeSub}</small>
        </div>
      </div>
    `;
  }
}

function renderProfileModalUI() {
  const cur = getCurrentProfile();
  const p = state.progress;
  const d = dict();
  const lvl = levelFromXp(p.xp);
  const total = p.totalAnswered || 0;
  const correct = p.totalCorrect || 0;
  const acc = total > 0 ? Math.round((correct / total) * 100) : 0;

  // Header
  const avKey = cur.avatar || "user";
  els.profileAvatarIcon.innerHTML = AVATARS[avKey] || AVATARS.user;
  els.profileNameDisplay.textContent = cur.name;
  els.profileTitleDisplay.textContent = `${fmt(d.level, { n: lvl })} · ${getProfileTitle(lvl)}`;

  // Stats
  els.profileStatLevel.textContent = lvl;
  els.profileStatXp.textContent = p.xp || 0;
  els.profileStatStreak.textContent = p.streak || 0;
  els.profileStatAccuracy.textContent = `%${acc}`;

  // Input
  els.profileNameInput.value = cur.name;

  // Selector
  const profiles = getProfiles();
  els.profileSelector.innerHTML = "";
  profiles.forEach((prof) => {
    const opt = document.createElement("option");
    opt.value = prof.id;
    opt.textContent = prof.name;
    if (prof.id === cur.id) opt.selected = true;
    els.profileSelector.appendChild(opt);
  });

  // Pinned Badge Showcase
  renderProfilePinnedBadgeUI();
}

function openProfile() {
  renderProfileModalUI();
  els.profileModal.classList.remove("hidden");
  refreshModalOpen();
}

function closeProfile() {
  els.profileModal.classList.add("hidden");
  refreshModalOpen();
}

function switchProfile(targetId) {
  syncCurrentProfileProgress();
  const profiles = getProfiles();
  const target = profiles.find((p) => p.id === targetId);
  if (!target) return;

  setActiveProfileId(target.id);
  state.currentProfile = target;
  state.progress = target.progress ? { ...defaultProgress(), ...target.progress } : defaultProgress();
  saveProgress(state.progress);

  if (target.bestScores) {
    Object.keys(target.bestScores).forEach((k) => {
      try {
        localStorage.setItem(k, target.bestScores[k]);
      } catch (e) {}
    });
  }

  updateProfileNavbarIcon();
  refreshCurrentView();
  renderSurvivalBanner();
  renderProfileModalUI();
  showProfileFeedback(`${dict().profileSwitch} (${target.name})`);
  sound.play("click");
}

function createNewProfile() {
  const d = dict();
  const name = prompt(state.lang === "tr" ? "Yeni profil adı girin:" : "Enter new profile name:", d.profileDefaultName);
  if (!name || !name.trim()) return;

  syncCurrentProfileProgress();
  const profiles = getProfiles();
  const newProf = {
    id: `prof_${Date.now()}`,
    name: name.trim().slice(0, 24),
    avatar: "user",
    createdAt: utcDayString(),
    progress: defaultProgress(),
    bestScores: {}
  };

  profiles.push(newProf);
  saveProfiles(profiles);
  switchProfile(newProf.id);
  showProfileFeedback(d.profileCreated);
}

function saveCurrentProfileEdits() {
  const cur = getCurrentProfile();
  const newName = els.profileNameInput.value.trim();
  if (newName) {
    cur.name = newName.slice(0, 24);
  }


  const profiles = getProfiles();
  const idx = profiles.findIndex((p) => p.id === cur.id);
  if (idx !== -1) {
    profiles[idx] = cur;
    saveProfiles(profiles);
  }

  updateProfileNavbarIcon();
  renderProfileModalUI();
  showProfileFeedback(dict().profileSaved);
  sound.play("click");
}

function deleteCurrentProfile() {
  const profiles = getProfiles();
  if (profiles.length <= 1) {
    showProfileFeedback(state.lang === "tr" ? "En az bir profil bulunmalıdır." : "At least one profile is required.");
    sound.play("wrong");
    return;
  }
  const cur = getCurrentProfile();
  if (!confirm(dict().profileDeleteConfirm)) return;

  const remaining = profiles.filter((p) => p.id !== cur.id);
  saveProfiles(remaining);
  switchProfile(remaining[0].id);
  sound.play("click");
}

function exportCurrentProfile() {
  syncCurrentProfileProgress();
  const cur = getCurrentProfile();
  const d = dict();
  const exportData = {
    appName: "ArenaC",
    type: "arenac_profile",
    version: 3,
    exportDate: new Date().toISOString(),
    profile: {
      id: cur.id,
      name: cur.name,
      createdAt: cur.createdAt
    },
    progress: state.progress,
    bestScores: cur.bestScores || {}
  };

  const jsonStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const cleanName = cur.name.toLowerCase().replace(/[^a-z0-9]/g, "_");
  a.href = url;
  a.download = `arenac_profil_${cleanName}_${utcDayString()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showProfileFeedback(d.profileExportDone);
  sound.play("click");
}

function importProfile(file) {
  if (!file) return;
  const d = dict();
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || (!data.profile && !data.progress)) {
        throw new Error("Geçersiz profil dosyası");
      }
      const profName = (data.profile && data.profile.name) ? data.profile.name : (data.appName ? "İçe Aktarılan Profil" : "Yedek Profil");
      const avatar = (data.profile && data.profile.avatar) ? data.profile.avatar : "terminal";
      const createdAt = (data.profile && data.profile.createdAt) ? data.profile.createdAt : utcDayString();
      const progress = data.progress ? { ...defaultProgress(), ...data.progress } : defaultProgress();
      const bestScores = data.bestScores || {};

      syncCurrentProfileProgress();
      const profiles = getProfiles();
      const newProf = {
        id: `prof_${Date.now()}`,
        name: profName.slice(0, 24),
        avatar,
        createdAt,
        progress,
        bestScores
      };
      profiles.push(newProf);
      saveProfiles(profiles);
      switchProfile(newProf.id);
      showProfileFeedback(d.profileImportDone);
      sound.play("correct");
    } catch (err) {
      showProfileFeedback(dict().importError);
      sound.play("wrong");
    }
  };
  reader.readAsText(file);
}

function openSettings() {
  els.settingsModal.classList.remove("hidden");
  refreshModalOpen();
}

function closeSettings() {
  els.settingsModal.classList.add("hidden");
  refreshModalOpen();
}

function openInstall() {
  els.installModal.classList.remove("hidden");
  refreshModalOpen();
}

function closeInstall() {
  els.installModal.classList.add("hidden");
  refreshModalOpen();
}

function showSettingsFeedback(msg) {
  els.settingsFeedback.textContent = msg;
  els.settingsFeedback.classList.remove("hidden");
  if (feedbackTimer) clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => {
    els.settingsFeedback.classList.add("hidden");
  }, 2500);
}

function goHome() {
  stopTimer();
  state.activeSession = null;
  renderHomePanel();
  renderHome();
  renderDebugGrid();
  showScreen("home");
}

function isFullscreen() {
  return !!(document.fullscreenElement || document.webkitFullscreenElement);
}

function toggleFullscreen() {
  if (!isFullscreen()) {
    const root = document.documentElement;
    if (root.requestFullscreen) {
      root.requestFullscreen().catch(() => {});
    } else if (root.webkitRequestFullscreen) {
      root.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function updateFullscreenUI() {
  const active = isFullscreen();
  const d = dict();
  const label = active ? d.fullscreenExit : d.fullscreenEnter;
  els.fsIconEnter.classList.toggle("hidden", active);
  els.fsIconExit.classList.toggle("hidden", !active);
  els.fullscreenBtn.setAttribute("title", label);
  els.fullscreenBtn.setAttribute("aria-label", label);
  els.fsToggleBtn.textContent = label;
}

// Event Listeners
els.brandHome.addEventListener("click", () => {
  if (currentScreen === "quiz") {
    openConfirmExit();
  } else {
    goHome();
  }
});

els.quizBackBtn.addEventListener("click", () => {
  if (currentScreen === "quiz") {
    openConfirmExit();
  } else {
    goHome();
  }
});

els.nextBtn.addEventListener("click", nextQuestion);
els.retryBtn.addEventListener("click", () => {
  if (state.lastSession) state.lastSession();
});
els.homeBtn.addEventListener("click", goHome);

els.fullscreenBtn.addEventListener("click", toggleFullscreen);
els.fsToggleBtn.addEventListener("click", toggleFullscreen);
document.addEventListener("fullscreenchange", updateFullscreenUI);
document.addEventListener("webkitfullscreenchange", updateFullscreenUI);



els.badgesBtn.addEventListener("click", openBadgesModal);
els.badgesClose.addEventListener("click", closeBadgesModal);
els.badgesModal.addEventListener("click", (e) => {
  if (e.target === els.badgesModal) closeBadgesModal();
});

els.profileBtn.addEventListener("click", openProfile);
els.profileClose.addEventListener("click", closeProfile);
els.profileModal.addEventListener("click", (e) => {
  if (e.target === els.profileModal) closeProfile();
});
els.profileSelector.addEventListener("change", (e) => switchProfile(e.target.value));
els.profileNewBtn.addEventListener("click", createNewProfile);
els.profileSaveBtn.addEventListener("click", saveCurrentProfileEdits);
els.profileDeleteBtn.addEventListener("click", deleteCurrentProfile);
els.profileExportBtn.addEventListener("click", exportCurrentProfile);
els.profileImportBtn.addEventListener("click", () => els.profileFileInput.click());
els.profileFileInput.addEventListener("change", (e) => {
  if (e.target.files && e.target.files[0]) {
    importProfile(e.target.files[0]);
    e.target.value = "";
  }
});

els.settingsBtn.addEventListener("click", openSettings);
els.settingsClose.addEventListener("click", closeSettings);
els.settingsModal.addEventListener("click", (e) => {
  if (e.target === els.settingsModal) closeSettings();
});

els.helpBtn.addEventListener("click", openHelp);
els.helpClose.addEventListener("click", closeHelp);
els.helpModal.addEventListener("click", (e) => {
  if (e.target === els.helpModal) closeHelp();
});

els.docsBtn.addEventListener("click", openDocs);
els.docsClose.addEventListener("click", closeDocs);
els.docsModal.addEventListener("click", (e) => {
  if (e.target === els.docsModal) closeDocs();
});

els.docsTabFormat.addEventListener("click", () => switchDocsTab("format"));
els.docsTabLibs.addEventListener("click", () => switchDocsTab("libs"));
els.docsTabMemory.addEventListener("click", () => switchDocsTab("memory"));
els.docsTabPrecedence.addEventListener("click", () => switchDocsTab("precedence"));

els.setupClose.addEventListener("click", closeSetup);
els.setupModal.addEventListener("click", (e) => {
  if (e.target === els.setupModal) closeSetup();
});

els.statsBtn.addEventListener("click", openStats);
els.statsClose.addEventListener("click", closeStats);
els.statsModal.addEventListener("click", (e) => {
  if (e.target === els.statsModal) closeStats();
});

els.installBtn.addEventListener("click", async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    try {
      await deferredInstallPrompt.userChoice;
    } catch (e) {}
    deferredInstallPrompt = null;
    return;
  }
  openInstall();
});
els.installClose.addEventListener("click", closeInstall);
els.installModal.addEventListener("click", (e) => {
  if (e.target === els.installModal) closeInstall();
});


els.modeTabSurvival.addEventListener("click", () => toggleHomeMode("survival"));
els.survivalStartBtn.addEventListener("click", startSurvivalQuiz);
els.bookmarkBtn.addEventListener("click", toggleBookmarkCurrent);
els.bookmarksBtn.addEventListener("click", startBookmarksQuiz);
els.shareCardBtn.addEventListener("click", generateScoreCard);

els.lineNumsOnBtn.addEventListener("click", () => applyLineNumbers(true));
els.lineNumsOffBtn.addEventListener("click", () => applyLineNumbers(false));

els.exportDataBtn.addEventListener("click", exportData);
els.importDataBtn.addEventListener("click", () => els.importFileInput.click());
els.importFileInput.addEventListener("change", (e) => {
  if (e.target.files && e.target.files[0]) {
    importData(e.target.files[0]);
    e.target.value = "";
  }
});

els.modeTabQuiz.addEventListener("click", () => toggleHomeMode("quiz"));
els.modeTabDebug.addEventListener("click", () => toggleHomeMode("debug"));

els.debugClose.addEventListener("click", closeDebugSetup);
els.debugModal.addEventListener("click", (e) => {
  if (e.target === els.debugModal) closeDebugSetup();
});

function bindDebugChoice(btn, key, val) {
  btn.addEventListener("click", () => {
    state.debugSetup[key] = val;
    saveDebugSetup();
    renderDebugSetupControls();
  });
}

bindDebugChoice(els.debugLvlBeginner, "level", "beginner");
bindDebugChoice(els.debugLvlIntermediate, "level", "intermediate");
bindDebugChoice(els.debugLvlAdvanced, "level", "advanced");
bindDebugChoice(els.debugLvlExpert, "level", "expert");
bindDebugChoice(els.debugModeClassicBtn, "mode", "classic");
bindDebugChoice(els.debugModeExamBtn, "mode", "exam");
bindDebugChoice(els.debugCount5Btn, "count", 5);
bindDebugChoice(els.debugCount10Btn, "count", 10);
bindDebugChoice(els.debugCount15Btn, "count", 15);
bindDebugChoice(els.debugCountAllBtn, "count", "all");
bindDebugChoice(els.debugTimeOffBtn, "time", 0);
bindDebugChoice(els.debugTime2Btn, "time", 120);
bindDebugChoice(els.debugTime5Btn, "time", 300);
bindDebugChoice(els.debugTime10Btn, "time", 600);

els.debugStartBtn.addEventListener("click", () => {
  const config = { ...state.debugSetup };
  closeDebugSetup();
  startDebugQuiz(config);
});

els.confirmStayBtn.addEventListener("click", closeConfirmExit);
els.confirmExitBtn.addEventListener("click", () => {
  closeConfirmExit();
  goHome();
});
els.confirmModal.addEventListener("click", (e) => {
  if (e.target === els.confirmModal) closeConfirmExit();
});

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
});

els.dailyBtn.addEventListener("click", () => startDaily(false));
els.mistakesBtn.addEventListener("click", () => startMistakes());

els.themeDarkBtn.addEventListener("click", () => applyTheme("dark"));
els.themeLightBtn.addEventListener("click", () => applyTheme("light"));
els.langTrBtn.addEventListener("click", () => applyLanguage("tr"));
els.langEnBtn.addEventListener("click", () => applyLanguage("en"));

els.soundOnBtn.addEventListener("click", () => applySoundEnabled(true));
els.soundOffBtn.addEventListener("click", () => applySoundEnabled(false));
els.soundVolumeSlider.addEventListener("input", (e) => {
  applySoundVolume(parseInt(e.target.value, 10), true);
});

function bindSetupChoice(btn, key, val) {
  btn.addEventListener("click", () => {
    state.setup[key] = val;
    saveSetup();
    renderSetupControls();
  });
}

bindSetupChoice(els.modeClassicBtn, "mode", "classic");
bindSetupChoice(els.modeExamBtn, "mode", "exam");
bindSetupChoice(els.count5Btn, "count", 5);
bindSetupChoice(els.count10Btn, "count", 10);
bindSetupChoice(els.count15Btn, "count", 15);
bindSetupChoice(els.countAllBtn, "count", "all");
bindSetupChoice(els.timeOffBtn, "time", 0);
bindSetupChoice(els.time2Btn, "time", 120);
bindSetupChoice(els.time5Btn, "time", 300);
bindSetupChoice(els.time10Btn, "time", 600);

els.topicSelect.addEventListener("change", () => {
  state.setup.topic = els.topicSelect.value;
  saveSetup();
});

els.setupStartBtn.addEventListener("click", () => {
  const diff = state.pendingDifficulty;
  closeSetup();
  startQuiz(diff, state.setup);
});

els.resetBestBtn.addEventListener("click", () => {
  CARD_KEYS.forEach((key) => {
    try {
      localStorage.removeItem(`arenac:best:${key}`);
      localStorage.removeItem(`arenac:best:debug_${key}`);
    } catch (e) {}
  });
  try {
    localStorage.removeItem("arenac:best:survival");
    localStorage.removeItem("arenac:survival_games");
  } catch (e) {}
  renderSurvivalBanner();
  showSettingsFeedback(dict().settingsResetDone);
  if (currentScreen === "home") {
    renderHome();
    renderDebugGrid();
  }
});

// Global UI click sound
document.addEventListener("click", (e) => {
  const btn = e.target.closest("button, .diff-card, .seg-btn, .stat-pill");
  if (btn && !btn.classList.contains("option") && !btn.id.startsWith("sound")) {
    sound.play("click");
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  const modalOpen = document.querySelector(".modal-backdrop:not(.hidden)");

  if (e.key === "Escape") {
    let closed = false;
    if (!els.badgesModal.classList.contains("hidden")) { closeBadgesModal(); closed = true; }
    else if (!els.profileModal.classList.contains("hidden")) { closeProfile(); closed = true; }
    else if (!els.confirmModal.classList.contains("hidden")) { closeConfirmExit(); closed = true; }
    else if (!els.debugModal.classList.contains("hidden")) { closeDebugSetup(); closed = true; }
    else if (!els.installModal.classList.contains("hidden")) { closeInstall(); closed = true; }
    else if (!els.statsModal.classList.contains("hidden")) { closeStats(); closed = true; }
    else if (!els.setupModal.classList.contains("hidden")) { closeSetup(); closed = true; }
    else if (!els.settingsModal.classList.contains("hidden")) { closeSettings(); closed = true; }
    else if (!els.helpModal.classList.contains("hidden")) { closeHelp(); closed = true; }
    else if (!els.docsModal.classList.contains("hidden")) { closeDocs(); closed = true; }
    if (closed) sound.play("click");
    return;
  }

  if (currentScreen !== "quiz" || modalOpen) return;

  const key = e.key.toLowerCase();
  const s = state.activeSession;
  if (!s) return;

  if (key === "f" || key === "*") {
    e.preventDefault();
    toggleBookmarkCurrent();
    return;
  }

  if (!s.answered || s.config.mode === "exam") {
    let idx = ["a", "b", "c", "d"].indexOf(key);
    if (idx === -1) idx = ["1", "2", "3", "4"].indexOf(key);
    if (idx !== -1 && idx < s.queue[s.index].options.length) {
      selectOption(idx);
      return;
    }
  }

  if (key === "enter" || key === " ") {
    e.preventDefault();
    sound.play("click");
    nextQuestion();
  }
});

// Initialize State & App
sound.init();
els.soundOnBtn.classList.toggle("active", sound.enabled);
els.soundOffBtn.classList.toggle("active", !sound.enabled);
els.volumeRow.classList.toggle("disabled", !sound.enabled);
els.soundVolumeSlider.value = sound.volume;
els.soundVolumeValue.textContent = `${sound.volume}%`;
window.addEventListener("pointerdown", () => sound.getCtx(), { once: true });
window.addEventListener("keydown", () => sound.getCtx(), { once: true });

state.progress = getProgress();
state.currentProfile = getCurrentProfile();
state.setup = getSavedSetup();
state.debugSetup = getSavedDebugSetup();
try {
  const savedLineNums = localStorage.getItem("arenac:line_numbers");
  state.lineNumbers = savedLineNums !== "0";
} catch (e) {
  state.lineNumbers = true;
}
applyLineNumbers(state.lineNumbers);
renderSurvivalBanner();
applyTheme(getSavedTheme() || "dark");
applyLanguage(getSavedLang() || "tr");
updateProfileNavbarIcon();
showScreen("home");

if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  });
}

