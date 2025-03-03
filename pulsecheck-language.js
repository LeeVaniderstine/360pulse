document.addEventListener('DOMContentLoaded', function() {
  // -------------------------------------------
  // 1. Language Data and Translation Dictionaries
  // -------------------------------------------
  
  // Native language names for display
  var nativeLanguageNames = {
    "English": "English",
    "中文": "中文",
    "Español": "Español",
    "Français": "Français",
    "Deutsch": "Deutsch",
    "日本語": "日本語",
    "한국어": "한국어",
    "Italiano": "Italiano",
    "Português": "Português",
    "Nederlands": "Nederlands",
    "Русский": "Русский",
    "العربية": "العربية",
    "हिन्दी": "हिन्दी",
    "বাংলা": "বাংলা",
    "Bahasa Indonesia": "Bahasa Indonesia",
    "Tiếng Việt": "Tiếng Việt",
    "Türkçe": "Türkçe",
    "Polski": "Polski",
    "Українська": "Українська",
    "svenska": "Svenska",
    "Norsk": "Norsk",
    "Dansk": "Dansk",
    "Suomi": "Suomi",
    "Ελληνικά": "Ελληνικά",
    "עברית": "עברית",
    "Filipino": "Filipino",
    "Cantonese": "粵語"
  };

  // Textarea placeholder translations
  var textareaPlaceholderTranslations = {
    "English": "Enter your comment",
    "中文": "输入您的评论",
    "Español": "Escribe tu comentario",
    "Français": "Entrez votre commentaire",
    "Deutsch": "Geben Sie Ihren Kommentar ein",
    "日本語": "コメントを入力してください",
    "한국어": "댓글을 입력하세요",
    "Italiano": "Inserisci il tuo commento",
    "Português": "Digite seu comentário",
    "Nederlands": "Voer uw opmerking in",
    "Русский": "Введите ваш комментарий",
    "العربية": "أدخل تعليقك",
    "हिन्दी": "अपनी टिप्पणी दर्ज करें",
    "বাংলা": "আপনার মন্তব্য লিখুন",
    "Bahasa Indonesia": "Masukkan komentar Anda",
    "Tiếng Việt": "Nhập bình luận của bạn",
    "Türkçe": "Yorumunuzu girin",
    "Polski": "Wpisz swój komentarz",
    "Українська": "Введіть ваш коментар",
    "svenska": "Ange din kommentar",
    "Norsk": "Skriv inn kommentaren din",
    "Dansk": "Indtast din kommentar",
    "Suomi": "Kirjoita kommenttisi",
    "Ελληνικά": "Εισαγάγετε το σχόλιό σας",
    "עברית": "הזן את התגובה שלך",
    "Filipino": "Ilagay ang iyong komento",
    "Cantonese": "輸入你的評論"
  };

  // Fixed ordering of languages
  var languageKeys = [
    "English", "中文", "Español", "Français", "Deutsch", "日本語", "한국어", "Italiano", "Português", "Nederlands",
    "Русский", "العربية", "हिन्दी", "বাংলা", "Bahasa Indonesia", "Tiếng Việt", "Türkçe", "Polski", "Українська",
    "svenska", "Norsk", "Dansk", "Suomi", "Ελληνικά", "עברית", "Filipino", "Cantonese"
  ];

  // Mapping browser language codes to our language keys
  var codeToKey = {
    "en": "English",
    "zh": "中文",
    "es": "Español",
    "fr": "Français",
    "de": "Deutsch",
    "ja": "日本語",
    "ko": "한국어",
    "it": "Italiano",
    "pt": "Português",
    "nl": "Nederlands",
    "ru": "Русский",
    "ar": "العربية",
    "hi": "हिन्दी",
    "bn": "বাংলা",
    "id": "Bahasa Indonesia",
    "vi": "Tiếng Việt",
    "tr": "Türkçe",
    "pl": "Polski",
    "uk": "Українська",
    "sv": "svenska",
    "no": "Norsk",
    "da": "Dansk",
    "fi": "Suomi",
    "el": "Ελληνικά",
    "he": "עברית",
    "iw": "עברית",
    "fil": "Filipino",
    "yue": "Cantonese"
  };

  // Build an inverted mapping for setting the <html> lang attribute.
  var keyToCode = {};
  Object.keys(codeToKey).forEach(function(code) {
    keyToCode[codeToKey[code]] = code;
  });

  // Referral legend translations
  var referralTranslations = {
    "English": {"0": "Not likely at all", "10": "Extremely likely"},
    "中文": {"0": "一点也不可能", "10": "极有可能"},
    "Español": {"0": "Nada probable", "10": "Extremadamente probable"},
    "Français": {"0": "Pas du tout probable", "10": "Extrêmement probable"},
    "Deutsch": {"0": "Überhaupt nicht wahrscheinlich", "10": "Äußerst wahrscheinlich"},
    "日本語": {"0": "全くありえない", "10": "非常にありそう"},
    "한국어": {"0": "전혀 가능성이 없다", "10": "매우 가능성이 있다"},
    "Italiano": {"0": "Per niente probabile", "10": "Estremamente probabile"},
    "Português": {"0": "Nada provável", "10": "Extremamente provável"},
    "Nederlands": {"0": "Helemaal niet waarschijnlijk", "10": "Uiterst waarschijnlijk"},
    "Русский": {"0": "Совсем не вероятно", "10": "Чрезвычайно вероятно"},
    "العربية": {"0": "غير محتمل على الإطلاق", "10": "محتمل للغاية"},
    "हिन्दी": {"0": "बिल्कुल भी संभावना नहीं", "10": "अत्यंत संभावना है"},
    "বাংলা": {"0": "একদমই সম্ভব নয়", "10": "অত্যন্ত সম্ভব"},
    "Bahasa Indonesia": {"0": "Tidak mungkin sama sekali", "10": "Sangat mungkin"},
    "Tiếng Việt": {"0": "Hoàn toàn không khả thi", "10": "Rất khả thi"},
    "Türkçe": {"0": "Hiç olası değil", "10": "Son derece olası"},
    "Polski": {"0": "Wcale nie prawdopodobne", "10": "Niezwykle prawdopodobne"},
    "Українська": {"0": "Зовсім не ймовірно", "10": "Надзвичайно ймовірно"},
    "svenska": {"0": "Inte alls troligt", "10": "Extremt troligt"},
    "Norsk": {"0": "Ikke sannsynlig i det hele tatt", "10": "Ekstremt sannsynlig"},
    "Dansk": {"0": "Slet ikke sandsynligt", "10": "Ekstremt sandsynligt"},
    "Suomi": {"0": "Ei lainkaan todennäköistä", "10": "Äärimmäisen todennäköistä"},
    "Ελληνικά": {"0": "Καθόλου πιθανό", "10": "Εξαιρετικά πιθανό"},
    "עברית": {"0": "כלל לא סביר", "10": "סביר מאוד"},
    "Filipino": {"0": "Hindi gaanong malamang", "10": "Lubos na malamang"},
    "Cantonese": {"0": "完全唔可能", "10": "極有可能"}
  };

  // Footer translations
  var footerTranslations = {
    "English": {"Powered by": "Powered by", "Try it Free": "Try it Free"},
    "中文": {"Powered by": "由...驅動", "Try it Free": "免費試用"},
    "Español": {"Powered by": "Impulsado por", "Try it Free": "Pruébalo gratis"},
    "Français": {"Powered by": "Propulsé par", "Try it Free": "Essayez-le gratuitement"},
    "Deutsch": {"Powered by": "Angetrieben von", "Try it Free": "Kostenlos ausprobieren"},
    "日本語": {"Powered by": "提供元", "Try it Free": "無料で試す"},
    "한국어": {"Powered by": "제공", "Try it Free": "무료 체험하기"},
    "Italiano": {"Powered by": "Offerto da", "Try it Free": "Provalo gratis"},
    "Português": {"Powered by": "Impulsionado por", "Try it Free": "Experimente grátis"},
    "Nederlands": {"Powered by": "Aangedreven door", "Try it Free": "Probeer het gratis"},
    "Русский": {"Powered by": "Поддерживается", "Try it Free": "Попробуйте бесплатно"},
    "العربية": {"Powered by": "مدعوم من", "Try it Free": "جربه مجاناً"},
    "हिन्दी": {"Powered by": "द्वारा समर्थित", "Try it Free": "मुफ्त में आज़माएं"},
    "বাংলা": {"Powered by": "চালিত", "Try it Free": "বিনামূল্যে চেষ্টা করুন"},
    "Bahasa Indonesia": {"Powered by": "Didukung oleh", "Try it Free": "Coba Gratis"},
    "Tiếng Việt": {"Powered by": "Được hỗ trợ bởi", "Try it Free": "Dùng thử miễn phí"},
    "Türkçe": {"Powered by": "Tarafından destekleniyor", "Try it Free": "Ücretsiz dene"},
    "Polski": {"Powered by": "Zasilany przez", "Try it Free": "Wypróbuj za darmo"},
    "Українська": {"Powered by": "Підтримується", "Try it Free": "Спробуйте безкоштовно"},
    "svenska": {"Powered by": "Drivs av", "Try it Free": "Prova gratis"},
    "Norsk": {"Powered by": "Drevet av", "Try it Free": "Prøv det gratis"},
    "Dansk": {"Powered by": "Drevet af", "Try it Free": "Prøv det gratis"},
    "Suomi": {"Powered by": "Voimansa saa", "Try it Free": "Kokeile ilmaiseksi"},
    "Ελληνικά": {"Powered by": "Υποστηρίζεται από", "Try it Free": "Δοκιμάστε το δωρεάν"},
    "עברית": {"Powered by": "נתמך על ידי", "Try it Free": "נסה בחינם"},
    "Filipino": {"Powered by": "Pinatatakbo ng", "Try it Free": "Subukan nang Libre"},
    "Cantonese": {"Powered by": "由...驅動", "Try it Free": "免費試用"}
  };

  // Badge translations
  var badgeTranslations = {
    "English": "Try 360Pulse Continuous Feedback Surveys - for Free",
    "中文": "免费试用360Pulse持续反馈调查",
    "Español": "Prueba gratis las encuestas continuas de retroalimentación 360Pulse",
    "Français": "Essayez gratuitement les enquêtes continues de feedback 360Pulse",
    "Deutsch": "Testen Sie 360Pulse kontinuierliche Feedback-Umfragen kostenlos",
    "日本語": "360Pulseの継続的なフィードバック調査を無料でお試しください",
    "한국어": "360Pulse 지속 피드백 설문조사를 무료로 체험하세요",
    "Italiano": "Prova gratuitamente i sondaggi continui di feedback 360Pulse",
    "Português": "Experimente gratuitamente as pesquisas de feedback contínuo 360Pulse",
    "Nederlands": "Probeer 360Pulse continue feedback-enquêtes gratis",
    "Русский": "Попробуйте 360Pulse непрерывные опросы обратной связи бесплатно",
    "العربية": "جرب استطلاعات 360Pulse للملاحظات المستمرة مجاناً",
    "हिन्दी": "360Pulse निरंतर फीडबैक सर्वेक्षण मुफ्त में आज़माएं",
    "বাংলা": "360Pulse অবিরাম প্রতিক্রিয়া জরিপ বিনামূল্যে চেষ্টা করুন",
    "Bahasa Indonesia": "Coba Gratis Survei Umpan Balik Berkelanjutan 360Pulse",
    "Tiếng Việt": "Dùng thử miễn phí khảo sát phản hồi liên tục 360Pulse",
    "Türkçe": "360Pulse Sürekli Geri Bildirim Anketlerini Ücretsiz Deneyin",
    "Polski": "Wypróbuj bezpłatnie ciągłe badania opinii 360Pulse",
    "Українська": "Спробуйте безкоштовно безперервні опитування зворотного зв'язку 360Pulse",
    "svenska": "Prova 360Pulse kontinuerliga feedbackundersökningar gratis",
    "Norsk": "Prøv 360Pulse kontinuerlige tilbakemeldingsundersøkelser gratis",
    "Dansk": "Prøv 360Pulse kontinuerlige feedbackundersøgelser gratis",
    "Suomi": "Kokeile 360Pulse jatkuvia palautekyselyitä ilmaiseksi",
    "Ελληνικά": "Δοκιμάστε δωρεάν τις συνεχείς έρευνες ανατροφοδότησης 360Pulse",
    "עברית": "נסה סקרי משוב מתמשכים 360Pulse בחינם",
    "Filipino": "Subukan nang Libre ang 360Pulse Continuous Feedback Surveys",
    "Cantonese": "免費試用360Pulse持續反饋調查"
  };

  // Button translations for the "Complete" button
  var buttonTranslations = {
    "English": "Complete",
    "中文": "完成",
    "Español": "Completar",
    "Français": "Terminer",
    "Deutsch": "Abschließen",
    "日本語": "完了",
    "한국어": "완료",
    "Italiano": "Completa",
    "Português": "Completar",
    "Nederlands": "Voltooien",
    "Русский": "Завершить",
    "العربية": "إكمال",
    "हिन्दी": "पूरा करें",
    "বাংলা": "সম্পন্ন করুন",
    "Bahasa Indonesia": "Selesaikan",
    "Tiếng Việt": "Hoàn thành",
    "Türkçe": "Tamamla",
    "Polski": "Zakończ",
    "Українська": "Завершити",
    "svenska": "Avsluta",
    "Norsk": "Fullfør",
    "Dansk": "Fuldfør",
    "Suomi": "Valmis",
    "Ελληνικά": "Ολοκλήρωση",
    "עברית": "הושלם",
    "Filipino": "Kompleto",
    "Cantonese": "完成"
  };

  // Page translations for document title and meta description.
  // The placeholder "{Workspace Name}" will be replaced with the workspaceName variable.
  var pageTranslations = {
    "English": {
      "title": "Help Us Improve | {Workspace Name} Feedback",
      "meta": "Your feedback makes a difference! Complete this brief PulseCheck to share your thoughts and help {Workspace Name} improve."
    },
    "中文": {
      "title": "帮助我们改进 | {Workspace Name} 反馈",
      "meta": "您的反馈至关重要！请完成这份简短的PulseCheck，分享您的想法，助力{Workspace Name}不断进步。"
    },
    "Español": {
      "title": "Ayúdanos a mejorar | Retroalimentación de {Workspace Name}",
      "meta": "¡Tu opinión marca la diferencia! Completa este breve PulseCheck para compartir tus ideas y ayudar a {Workspace Name} a mejorar."
    },
    "Français": {
      "title": "Aidez-nous à nous améliorer | Avis de {Workspace Name}",
      "meta": "Votre avis compte ! Complétez ce bref PulseCheck pour partager vos idées et aider {Workspace Name} à s'améliorer."
    },
    "Deutsch": {
      "title": "Hilf uns, uns zu verbessern | {Workspace Name} Feedback",
      "meta": "Dein Feedback zählt! Fülle diesen kurzen PulseCheck aus, um deine Gedanken zu teilen und {Workspace Name} zu verbessern."
    },
    "日本語": {
      "title": "改善にご協力ください | {Workspace Name} フィードバック",
      "meta": "あなたのフィードバックが変化をもたらします！この簡単なPulseCheckにご協力いただき、{Workspace Name}の改善にお力添えください。"
    },
    "한국어": {
      "title": "개선을 위한 의견을 주세요 | {Workspace Name} 피드백",
      "meta": "여러분의 의견이 변화를 만듭니다! 이 간단한 PulseCheck를 완료하여 생각을 공유하고 {Workspace Name} 개선에 도움을 주세요."
    },
    "Italiano": {
      "title": "Aiutaci a migliorare | Feedback di {Workspace Name}",
      "meta": "Il tuo feedback fa la differenza! Completa questo breve PulseCheck per condividere le tue idee e aiutare {Workspace Name} a migliorare."
    },
    "Português": {
      "title": "Ajude-nos a melhorar | Feedback de {Workspace Name}",
      "meta": "Seu feedback faz a diferença! Complete este breve PulseCheck para compartilhar suas ideias e ajudar {Workspace Name} a melhorar."
    },
    "Nederlands": {
      "title": "Help ons verbeteren | {Workspace Name} Feedback",
      "meta": "Jouw feedback maakt het verschil! Vul deze korte PulseCheck in om je gedachten te delen en {Workspace Name} te helpen verbeteren."
    },
    "Русский": {
      "title": "Помогите нам улучшиться | Обратная связь {Workspace Name}",
      "meta": "Ваш отзыв имеет значение! Заполните этот краткий опрос PulseCheck, чтобы поделиться своими мыслями и помочь {Workspace Name} стать лучше."
    },
    "العربية": {
      "title": "ساعدنا على التحسين | ملاحظات {Workspace Name}",
      "meta": "ملاحظاتك تحدث فرقًا! أكمل هذا الاستطلاع القصير لمشاركة أفكارك ومساعدة {Workspace Name} على التحسن."
    },
    "हिन्दी": {
      "title": "हमें सुधारने में मदद करें | {Workspace Name} फीडबैक",
      "meta": "आपकी प्रतिक्रिया मायने रखती है! यह संक्षिप्त PulseCheck पूरा करें, अपनी राय साझा करें और {Workspace Name} को बेहतर बनाने में मदद करें।"
    },
    "বাংলা": {
      "title": "আমাদের উন্নতিতে সাহায্য করুন | {Workspace Name} প্রতিক্রিয়া",
      "meta": "আপনার প্রতিক্রিয়া গুরুত্বপূর্ণ! এই সংক্ষিপ্ত PulseCheck পূরণ করুন, আপনার মতামত শেয়ার করুন এবং {Workspace Name} কে উন্নত করতে সাহায্য করুন।"
    },
    "Bahasa Indonesia": {
      "title": "Bantu Kami Meningkatkan | Umpan Balik {Workspace Name}",
      "meta": "Masukan Anda membuat perbedaan! Selesaikan PulseCheck singkat ini untuk berbagi pemikiran dan membantu {Workspace Name} menjadi lebih baik."
    },
    "Tiếng Việt": {
      "title": "Hãy giúp chúng tôi cải thiện | Phản hồi của {Workspace Name}",
      "meta": "Phản hồi của bạn tạo nên sự khác biệt! Hoàn thành PulseCheck ngắn này để chia sẻ suy nghĩ và giúp {Workspace Name} cải thiện."
    },
    "Türkçe": {
      "title": "Bize Yardım Edin | {Workspace Name} Geri Bildirimi",
      "meta": "Geri bildiriminiz fark yaratır! Düşüncelerinizi paylaşmak ve {Workspace Name}'i geliştirmeye yardımcı olmak için bu kısa PulseCheck'i tamamlayın."
    },
    "Polski": {
      "title": "Pomóż nam się poprawić | Opinie {Workspace Name}",
      "meta": "Twoja opinia ma znaczenie! Wypełnij ten krótki PulseCheck, aby podzielić się swoimi uwagami i pomóc {Workspace Name} się poprawić."
    },
    "Українська": {
      "title": "Допоможіть нам покращитись | Відгуки {Workspace Name}",
      "meta": "Ваш відгук має значення! Заповніть цей короткий PulseCheck, щоб поділитися своїми думками та допомогти {Workspace Name} стати кращим."
    },
    "svenska": {
      "title": "Hjälp oss förbättra | {Workspace Name} Feedback",
      "meta": "Din feedback gör skillnad! Fyll i denna korta PulseCheck för att dela dina tankar och hjälpa {Workspace Name} att förbättras."
    },
    "Norsk": {
      "title": "Hjelp oss med å forbedre | {Workspace Name} Tilbakemelding",
      "meta": "Din tilbakemelding gjør en forskjell! Fullfør denne korte PulseCheck for å dele dine tanker og hjelpe {Workspace Name} med å forbedre seg."
    },
    "Dansk": {
      "title": "Hjælp os med at forbedre | {Workspace Name} Feedback",
      "meta": "Din feedback gør en forskel! Udfyld denne korte PulseCheck for at dele dine tanker og hjælpe {Workspace Name} med at forbedre sig."
    },
    "Suomi": {
      "title": "Autetaan kehittämään | {Workspace Name} Palaute",
      "meta": "Palaute tekee eron! Täytä tämä lyhyt PulseCheck jakaaksesi ajatuksesi ja auttaaksesi {Workspace Name}ia kehittymään."
    },
    "Ελληνικά": {
      "title": "Βοηθήστε μας να βελτιωθούμε | Ανατροφοδότηση {Workspace Name}",
      "meta": "Η ανατροφοδότησή σας κάνει τη διαφορά! Συμπληρώστε αυτό το σύντομο PulseCheck για να μοιραστείτε τις σκέψεις σας και να βοηθήσετε το {Workspace Name} να βελτιωθεί."
    },
    "עברית": {
      "title": "עזרו לנו להשתפר | משוב {Workspace Name}",
      "meta": "המשוב שלכם משנה את כל התמונה! מלאו את PulseCheck הקצר הזה כדי לשתף את מחשבותיכם ולעזור ל-{Workspace Name} להשתפר."
    },
    "Filipino": {
      "title": "Tulungan Mo Kaming Mag-Improve | {Workspace Name} Feedback",
      "meta": "Mahalaga ang iyong feedback! Kumpletuhin ang maikling PulseCheck na ito para ibahagi ang iyong mga saloobin at tulungan ang {Workspace Name} na mag-improve."
    },
    "Cantonese": {
      "title": "幫助我們改進 | {Workspace Name} 反饋",
      "meta": "你的反饋至關重要！請完成這個簡短的PulseCheck，分享你的想法，幫助 {Workspace Name} 改進。"
    }
  };

  // -------------------------------------------
  // 2. NEW: .pulsecheck-question-na translations
  // -------------------------------------------
  var naTranslations = {
    "English": "Not Applicable",
    "中文": "不适用",
    "Español": "No aplicable",
    "Français": "Non applicable",
    "Deutsch": "Nicht zutreffend",
    "日本語": "該当なし",
    "한국어": "해당 없음",
    "Italiano": "Non applicabile",
    "Português": "Não aplicável",
    "Nederlands": "Niet van toepassing",
    "Русский": "Не применяется",
    "العربية": "غير قابل للتطبيق",
    "हिन्दी": "लागू नहीं",
    "বাংলা": "প্রযোজ্য নয়",
    "Bahasa Indonesia": "Tidak berlaku",
    "Tiếng Việt": "Không áp dụng",
    "Türkçe": "Uygulanamaz",
    "Polski": "Nie dotyczy",
    "Українська": "Не застосовується",
    "svenska": "Inte tillämplig",
    "Norsk": "Ikke aktuelt",
    "Dansk": "Ikke relevant",
    "Suomi": "Ei sovellettavissa",
    "Ελληνικά": "Μη εφαρμόσιμο",
    "עברית": "לא ישים",
    "Filipino": "Hindi naaangkop",
    "Cantonese": "不適用"
  };

  // -------------------------------------------
  // 3. Workspace name variable (passed via global variable)
  // -------------------------------------------
  // Use the global variable 'workspaceName' if provided; otherwise, default.
  var workspaceName = window.workspaceName || "Default Workspace";

  // -------------------------------------------
  // 4. DOM References
  // -------------------------------------------
  var selectedLanguageDiv = document.getElementById('selectedLanguage');
  var dropdown = document.querySelector('.pulsecheck-language-dropdown');
  var closedDiv = document.querySelector('.pulsecheck-language-dropdown-closed');
  var openDiv = document.querySelector('.pulsecheck-language-dropdown-open');
  var poweredByElem = document.getElementById('powered-by');
  var tryFreeElem = document.getElementById('try-free');
  var badgeElem = document.getElementById('powered-by-badge');
  var completeButton = document.getElementById('complete-button');

  // -------------------------------------------
  // 5. Determine Default Language
  // -------------------------------------------
  var browserLangFull = navigator.language || navigator.userLanguage || 'en';
  var browserLang = browserLangFull.toLowerCase().split('-')[0];
  var selectedLanguageKey = codeToKey[browserLang] || "English";

  // -------------------------------------------
  // 6. Update Functions
  // -------------------------------------------
  function updateClosedDisplay() {
    if (selectedLanguageDiv) {
      selectedLanguageDiv.innerText = nativeLanguageNames[selectedLanguageKey];
    }
  }

  function renderDropdownOptions() {
    if (openDiv) {
      openDiv.innerHTML = '';
      languageKeys.forEach(function(langKey) {
        var optionDiv = document.createElement('div');
        optionDiv.className = 'pulsecheck-language-dropdown-option';
        optionDiv.dataset.langKey = langKey;
        optionDiv.innerHTML = '<div>' + nativeLanguageNames[langKey] + '</div>';
        openDiv.appendChild(optionDiv);
      });
    }
  }

  function updateReferralLegends() {
    var legendLabels = document.querySelectorAll('.referral-question-legend-label');
    if (legendLabels.length >= 2) {
      legendLabels[0].innerText = "0 = " + referralTranslations[selectedLanguageKey]["0"];
      legendLabels[1].innerText = "10 = " + referralTranslations[selectedLanguageKey]["10"];
    }
  }

  function updateFooterTranslations() {
    if (poweredByElem) {
      poweredByElem.innerText = footerTranslations[selectedLanguageKey]["Powered by"];
    }
    if (tryFreeElem) {
      tryFreeElem.innerText = footerTranslations[selectedLanguageKey]["Try it Free"];
    }
  }

  function updateBadgeTranslation() {
    if (badgeElem) {
      badgeElem.title = badgeTranslations[selectedLanguageKey];
    }
  }

  function updatePageTranslations() {
    var pageTrans = pageTranslations[selectedLanguageKey];
    // Replace the placeholder {Workspace Name} with the workspaceName variable
    document.title = pageTrans.title.replace(/{Workspace Name}/g, workspaceName);
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageTrans.meta.replace(/{Workspace Name}/g, workspaceName));
    }
  }

  function updateButtonTranslation() {
    if (completeButton) {
      completeButton.innerText = buttonTranslations[selectedLanguageKey];
    }
  }

  function updateCommentPlaceholders() {
    var textareas = document.querySelectorAll('.pulsecheck-question-comment');
    textareas.forEach(function(textarea) {
      textarea.placeholder = textareaPlaceholderTranslations[selectedLanguageKey];
    });
  }

  function updateHtmlLang() {
    var langCode = keyToCode[selectedLanguageKey] || 'en';
    document.documentElement.setAttribute('lang', langCode);
  }

  // NEW: Update .pulsecheck-question-na text
  function updateNaTranslation() {
    var naElements = document.querySelectorAll('.pulsecheck-question-na');
    naElements.forEach(function(elem) {
      var translated = naTranslations[selectedLanguageKey] || naTranslations["English"];
      elem.innerText = translated;
    });
  }

  // -------------------------------------------
  // 7. Master UI Update Function
  // -------------------------------------------
  function updateUI() {
    updateClosedDisplay();
    renderDropdownOptions();
    updateReferralLegends();
    updateFooterTranslations();
    updateBadgeTranslation();
    updatePageTranslations();
    updateButtonTranslation();
    updateCommentPlaceholders();
    updateHtmlLang();
    updateNaTranslation();
  }

  // -------------------------------------------
  // 8. Initial UI Render
  // -------------------------------------------
  updateUI();

  // Debug logs to verify DOM elements
  console.log("selectedLanguageDiv:", selectedLanguageDiv);
  console.log("dropdown:", dropdown);
  console.log("closedDiv:", closedDiv);
  console.log("openDiv:", openDiv);

  // -------------------------------------------
  // 9. Dropdown Toggle and Language Selection
  // -------------------------------------------
  if (closedDiv && dropdown && openDiv) {
    // Toggle dropdown open/close when closedDiv is clicked
    closedDiv.addEventListener('click', function(e) {
      e.stopPropagation();
      console.log("ClosedDiv clicked");
      openDiv.style.display = (openDiv.style.display === 'block') ? 'none' : 'block';
    });

    // Handle language selection via event delegation
    openDiv.addEventListener('click', function(e) {
      e.stopPropagation();
      var target = e.target;
      while (target && !target.classList.contains('pulsecheck-language-dropdown-option')) {
        target = target.parentElement;
      }
      if (target) {
        console.log("Language option clicked:", target.dataset.langKey);
        selectedLanguageKey = target.dataset.langKey;
        updateUI();
        openDiv.style.display = 'none';
      }
    });

    // Close the dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!dropdown.contains(e.target)) {
        openDiv.style.display = 'none';
      }
    });
  } else {
    console.warn("One or more required elements (closedDiv, dropdown, openDiv) were not found.");
  }
});
