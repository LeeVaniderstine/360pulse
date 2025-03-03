/* language.js */

// Assumes your translation file is already loaded via:
 // <script src="https://cdn.jsdelivr.net/gh/leevaniderstine/360pulse/thank-you-translations.js?v=20250228"></script>

// Global language variable
window.pulseCheckLanguage = { code: 'en' };

/* ======================
   Language Utility (LanguageUtil)
   ====================== */
var LanguageUtil = (function() {
    var currentLanguage = 'en'; // Default language
    var changeListeners = [];
    var selectedLanguageDiv = null;

    function init() {
        selectedLanguageDiv = document.getElementById('selectedLanguage');
        if (selectedLanguageDiv) {
            var langText = selectedLanguageDiv.textContent.trim();
            for (var code in languageNames) {
                if (languageNames[code] === langText) {
                    currentLanguage = code;
                    break;
                }
            }
        }
        var urlParams = new URLSearchParams(window.location.search);
        var urlLang = urlParams.get('language');
        if (urlLang && languageNames[urlLang]) {
            currentLanguage = urlLang;
        } else if (!selectedLanguageDiv || !selectedLanguageDiv.textContent.trim()) {
            var browserLangFull = navigator.language || navigator.userLanguage || 'en';
            var browserLang = browserLangFull.toLowerCase().split('-')[0];
            if (languageNames[browserLang]) {
                currentLanguage = browserLang;
            }
        }
        if (selectedLanguageDiv) {
            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.type === 'characterData' || mutation.type === 'childList') {
                        var newLangName = selectedLanguageDiv.textContent.trim();
                        for (var code in languageNames) {
                            if (languageNames[code] === newLangName && code !== currentLanguage) {
                                currentLanguage = code;
                                notifyListeners();
                                break;
                            }
                        }
                    }
                });
            });
            observer.observe(selectedLanguageDiv, { characterData: true, childList: true, subtree: true });
        }
        notifyListeners();
    }

    function notifyListeners() {
        changeListeners.forEach(function(listener) {
            listener(currentLanguage);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.addEventListener('popstate', function() {
        var urlParams = new URLSearchParams(window.location.search);
        var urlLang = urlParams.get('language');
        if (urlLang && languageNames[urlLang] && urlLang !== currentLanguage) {
            currentLanguage = urlLang;
            notifyListeners();
        }
    });

    return {
        onLanguageChange: function(listener) {
            changeListeners.push(listener);
            // Immediately invoke the listener with the current language.
            listener(currentLanguage);
            return function() {
                var index = changeListeners.indexOf(listener);
                if (index !== -1) {
                    changeListeners.splice(index, 1);
                }
            };
        },
        translate: function(key) {
            // Use the global variable for current language.
            if (translations[window.pulseCheckLanguage.code] && translations[window.pulseCheckLanguage.code][key]) {
                return translations[window.pulseCheckLanguage.code][key];
            }
            if (translations.en && translations.en[key]) {
                return translations.en[key];
            }
            return key;
        }
    };
})();

// Language mappings
var languageNames = {
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
    "sv": "Svenska",
    "no": "Norsk",
    "da": "Dansk",
    "fi": "Suomi",
    "el": "Ελληνικά",
    "he": "עברית",
    "fil": "Filipino",
    "yue": "粵語"
};

// Language codes in order of display
var languageCodes = [
    "en", "zh", "es", "fr", "de", "ja", "ko", "it", "pt", "nl",
    "ru", "ar", "hi", "bn", "id", "vi", "tr", "pl", "uk",
    "sv", "no", "da", "fi", "el", "he", "fil", "yue"
];

// Translations for all page elements
var translations = {
    "en": {
        "testimonial": "Testimonial",
        "submit-feedback": "Submit Feedback",
        "reviews": "Leave a Review",
        "testimonial-heading": "Share Your Experience",
        "testimonial-subheading": "A quick testimonial from you would mean the world to us!",
        "write-testimonial-heading": "Write Your Testimonial",
        "ai-button-text": "Let AI write this for me",
        "consent-label": "I agree that my testimonial may be used in marketing materials",
        "consent-info": "By checking this box, you agree that we may use all or parts of your testimonial in our marketing materials. Your testimonial may appear on our website, social media, and other marketing channels. We may also edit your testimonial for clarity while maintaining the essence of your feedback. This consent includes permission to use your name, title, company, photo if provided, and a link to your website when applicable. You may request to stop future use of your testimonial at any time by contacting us. Please note that while we can prevent your testimonial from being used in new materials, we may not be able to remove it from already published materials such as printed collateral, videos, or past social media posts.",
        "submit-testimonial": "Submit & Continue to Reviews",
        "skip-testimonial": "Skip this step",
        "review-heading": "Leave a Review",
        "review-subheading": "Your experience can help your peers, would you share it as a review?",
        "rate-experience-heading": "How would you rate your experience?",
        "star-rating-info": "Select a rating to prefill on supported platforms.",
        "write-review-heading": "Write Your Review",
        "review-copy-info": "Copy this text to paste into your selected review platform.",
        "copy-review": "Copy to Clipboard",
        "select-platform-heading": "Select a Platform to Share Your Review",
        "review-textarea-placeholder": "Write your review here or let AI help you...",
        "testimonial-textarea-placeholder": "Write your testimonial here or let AI help you...",
        "thank-you-title": "Thank you!",
        "thank-you-message": "We truly appreciate you taking the time to complete our survey. Your feedback helps us improve our services.",
        "powered-by": "Powered by",
        "try-free": "Try it for Free",
        "powered-by-title": "Try 360Pulse Continuous Feedback Surveys for Free",
        "testimonial-success": "Thanks for your testimonial!",
        "testimonial-success-message": "You'll be redirected to review options shortly.",
        "redirect-message": "Redirecting...",
        "title-promoter": "We Appreciate Your Time!",
        "welcome-promoter": "We truly appreciate your ongoing support. We welcome any additional thoughts you'd like to share, as your continued feedback helps us grow.",
        "feedback-placeholder-promoter": "How can we make things even better for you?",
        "title-passive": "Share Your Thoughts",
        "welcome-passive": "Thank you for taking the time to complete our survey. We'd love to know more about what you liked and any ideas you have for making things even better.",
        "feedback-placeholder-passive": "What did you enjoy, and how can we improve further?",
        "title-detractor": "Help Us Improve",
        "welcome-detractor": "Thank you for taking the time to complete our survey. We're sorry to hear things didn't meet your expectations. Your honest feedback helps us identify ways to improve.",
        "feedback-placeholder-detractor": "Please tell us what went wrong and how we can do better.",
        "page-title": "Thank You for Your Feedback",
        "meta-description": "We appreciate you taking the time to share your thoughts. Your insights help us improve and create a better experience for everyone."
    },
    "es": {
        "testimonial": "Testimonio",
        "submit-feedback": "Enviar Comentarios",
        "reviews": "Dejar una Reseña",
        "testimonial-heading": "Comparte tu Experiencia",
        "testimonial-subheading": "¡Un breve testimonio tuyo significaría mucho para nosotros!",
        "write-testimonial-heading": "Escribe tu Testimonio",
        "ai-button-text": "Dejar que la IA escriba esto por mí",
        "consent-label": "Acepto que mi testimonio pueda ser utilizado en materiales de marketing",
        "consent-info": "Al marcar esta casilla, aceptas que podamos usar todo o parte de tu testimonio en nuestros materiales de marketing. Tu testimonio puede aparecer en nuestro sitio web, redes sociales y otros canales de marketing. También podemos editar tu testimonio para mayor claridad, manteniendo la esencia de tus comentarios. Este consentimiento incluye permiso para usar tu nombre, título, empresa, foto si se proporciona, y un enlace a tu sitio web cuando corresponda. Puedes solicitar detener el uso futuro de tu testimonio en cualquier momento contactándonos. Ten en cuenta que, si bien podemos evitar que tu testimonio se use en nuevos materiales, es posible que no podamos eliminarlo de materiales ya publicados, como material impreso, videos o publicaciones anteriores en redes sociales.",
        "submit-testimonial": "Enviar y Continuar a Reseñas",
        "skip-testimonial": "Omitir este paso",
        "review-heading": "Dejar una Reseña",
        "review-subheading": "Tu experiencia puede ayudar a tus compañeros, ¿la compartirías como una reseña?",
        "rate-experience-heading": "¿Cómo calificarías tu experiencia?",
        "star-rating-info": "Selecciona una calificación para precompletar en plataformas compatibles.",
        "write-review-heading": "Escribe tu Reseña",
        "review-copy-info": "Copia este texto para pegarlo en la plataforma de reseñas seleccionada.",
        "copy-review": "Copiar al Portapapeles",
        "select-platform-heading": "Selecciona una Plataforma para Compartir tu Reseña",
        "review-textarea-placeholder": "Escribe tu reseña aquí o deja que la IA te ayude...",
        "testimonial-textarea-placeholder": "Escribe tu testimonio aquí o deja que la IA te ayude...",
        "thank-you-title": "¡Gracias!",
        "thank-you-message": "Realmente apreciamos que te hayas tomado el tiempo para completar nuestra encuesta. Tus comentarios nos ayudan a mejorar nuestros servicios.",
        "powered-by": "Desarrollado por",
        "try-free": "Pruébalo gratis",
        "powered-by-title": "Prueba las encuestas de retroalimentación continua 360Pulse gratis",
        "testimonial-success": "¡Gracias por tu testimonio!",
        "testimonial-success-message": "Serás redirigido a las opciones de reseña en breve.",
        "redirect-message": "Redirigiendo...",
        "title-promoter": "¡Agradecemos tu tiempo!",
        "welcome-promoter": "Realmente apreciamos tu apoyo continuo. Agradecemos cualquier pensamiento adicional que quieras compartir, ya que tu retroalimentación continua nos ayuda a crecer.",
        "feedback-placeholder-promoter": "¿Cómo podemos hacer las cosas aún mejor para ti?",
        "title-passive": "Comparte tus pensamientos",
        "welcome-passive": "Gracias por tomarte el tiempo de completar nuestra encuesta. Nos encantaría saber más sobre lo que te gustó y cualquier idea que tengas para mejorar aún más.",
        "feedback-placeholder-passive": "¿Qué disfrutaste y cómo podemos mejorar más?",
        "title-detractor": "Ayúdanos a mejorar",
        "welcome-detractor": "Gracias por tomarte el tiempo de completar nuestra encuesta. Lamentamos que las cosas no hayan cumplido con tus expectativas. Tu retroalimentación honesta nos ayuda a identificar formas de mejorar.",
        "feedback-placeholder-detractor": "Por favor, cuéntanos qué salió mal y cómo podemos hacerlo mejor.",
        "page-title": "Gracias por sus comentarios",
        "meta-description": "Agradecemos que se haya tomado el tiempo de compartir sus pensamientos. Sus opiniones nos ayudan a mejorar y crear una mejor experiencia para todos."
    },
    "fr": {
        "testimonial": "Témoignage",
        "submit-feedback": "Envoyer les Commentaires",
        "reviews": "Laisser un Avis",
        "testimonial-heading": "Partagez Votre Expérience",
        "testimonial-subheading": "Un bref témoignage de votre part signifierait beaucoup pour nous !",
        "write-testimonial-heading": "Rédigez Votre Témoignage",
        "ai-button-text": "Laisser l'IA écrire ceci pour moi",
        "consent-label": "J'accepte que mon témoignage puisse être utilisé dans des documents marketing",
        "consent-info": "En cochant cette case, vous acceptez que nous puissions utiliser tout ou partie de votre témoignage dans nos supports marketing. Votre témoignage peut apparaître sur notre site web, nos réseaux sociaux et d'autres canaux marketing. Nous pouvons également modifier votre témoignage pour plus de clarté tout en conservant l'essence de vos commentaires. Ce consentement comprend l'autorisation d'utiliser votre nom, titre, entreprise, photo si fournie, et un lien vers votre site web le cas échéant. Vous pouvez demander d'arrêter l'utilisation future de votre témoignage à tout moment en nous contactant. Veuillez noter que bien que nous puissions empêcher l'utilisation de votre témoignage dans de nouveaux supports, nous ne pourrons peut-être pas le supprimer des supports déjà publiés tels que les supports imprimés, les vidéos ou les publications antérieures sur les réseaux sociaux.",
        "submit-testimonial": "Soumettre et Continuer vers les Avis",
        "skip-testimonial": "Passer cette étape",
        "review-heading": "Laisser un Avis",
        "review-subheading": "Votre expérience peut aider vos pairs, voudriez-vous la partager sous forme d'avis ?",
        "rate-experience-heading": "Comment évalueriez-vous votre expérience ?",
        "star-rating-info": "Sélectionnez une note pour préremplir sur les plateformes prises en charge.",
        "write-review-heading": "Rédigez Votre Avis",
        "review-copy-info": "Copiez ce texte pour le coller sur la plateforme d'avis sélectionnée.",
        "copy-review": "Copier dans le Presse-papiers",
        "select-platform-heading": "Sélectionnez une Plateforme pour Partager Votre Avis",
        "review-textarea-placeholder": "Écrivez votre avis ici ou laissez l'IA vous aider...",
        "testimonial-textarea-placeholder": "Écrivez votre témoignage ici ou laissez l'IA vous aider...",
        "thank-you-title": "Merci !",
        "thank-you-message": "Nous vous remercions sincèrement d'avoir pris le temps de répondre à notre sondage. Vos commentaires nous aident à améliorer nos services.",
        "powered-by": "Propulsé par",
        "try-free": "Essayez-le gratuitement",
        "powered-by-title": "Essayez les sondages de rétroaction continue 360Pulse gratuitement",
        "testimonial-success": "Merci pour votre témoignage !",
        "testimonial-success-message": "Vous serez redirigé vers les options d'avis sous peu.",
        "redirect-message": "Redirection en cours...",
        "title-promoter": "Nous apprécions votre temps !",
        "welcome-promoter": "Nous apprécions vraiment votre soutien continu. Nous accueillons toutes pensées supplémentaires que vous souhaitez partager, car vos commentaires continus nous aident à grandir.",
        "feedback-placeholder-promoter": "Comment pouvons-nous rendre les choses encore meilleures pour vous ?",
        "title-passive": "Partagez vos pensées",
        "welcome-passive": "Merci d'avoir pris le temps de remplir notre sondage. Nous aimerions en savoir plus sur ce qui vous a plu et les idées que vous avez pour améliorer encore les choses.",
        "feedback-placeholder-passive": "Qu'avez-vous apprécié et comment pouvons-nous nous améliorer davantage ?",
        "title-detractor": "Aidez-nous à nous améliorer",
        "welcome-detractor": "Merci d'avoir pris le temps de remplir notre sondage. Nous sommes désolés d'apprendre que les choses n'ont pas répondu à vos attentes. Vos commentaires honnêtes nous aident à identifier des moyens de nous améliorer.",
        "feedback-placeholder-detractor": "Veuillez nous dire ce qui n'a pas fonctionné et comment nous pouvons faire mieux.",
        "page-title": "Merci pour votre feedback",
        "meta-description": "Nous vous remercions d'avoir pris le temps de partager vos réflexions. Vos idées nous aident à nous améliorer et à créer une meilleure expérience pour tous."
    },
    "de": {
        "testimonial": "Erfahrungsbericht",
        "submit-feedback": "Feedback Senden",
        "reviews": "Bewertung abgeben",
        "testimonial-heading": "Teilen Sie Ihre Erfahrung",
        "testimonial-subheading": "Ein kurzer Erfahrungsbericht von Ihnen würde uns sehr viel bedeuten!",
        "write-testimonial-heading": "Schreiben Sie Ihren Erfahrungsbericht",
        "ai-button-text": "KI für mich schreiben lassen",
        "consent-label": "Ich stimme zu, dass mein Erfahrungsbericht in Marketingmaterialien verwendet werden darf",
        "consent-info": "Durch Anklicken dieses Kästchens stimmen Sie zu, dass wir Ihren Erfahrungsbericht ganz oder teilweise in unseren Marketingmaterialien verwenden dürfen. Ihr Erfahrungsbericht kann auf unserer Website, in sozialen Medien und anderen Marketingkanälen erscheinen. Wir können Ihren Erfahrungsbericht auch für mehr Klarheit bearbeiten, wobei wir den Kern Ihres Feedbacks beibehalten. Diese Zustimmung umfasst die Erlaubnis, Ihren Namen, Titel, Unternehmen, ggf. Foto und einen Link zu Ihrer Website zu verwenden. Sie können jederzeit beantragen, dass Ihr Erfahrungsbericht in Zukunft nicht mehr verwendet wird, indem Sie uns kontaktieren. Bitte beachten Sie, dass wir zwar verhindern können, dass Ihr Erfahrungsbericht in neuen Materialien verwendet wird, wir ihn jedoch möglicherweise nicht aus bereits veröffentlichten Materialien wie Drucksachen, Videos oder früheren Social-Media-Beiträgen entfernen können.",
        "submit-testimonial": "Absenden & Weiter zu Bewertungen",
        "skip-testimonial": "Diesen Schritt überspringen",
        "review-heading": "Bewertung abgeben",
        "review-subheading": "Ihre Erfahrung kann anderen helfen. Würden Sie sie als Bewertung teilen?",
        "rate-experience-heading": "Wie würden Sie Ihre Erfahrung bewerten?",
        "star-rating-info": "Wählen Sie eine Bewertung aus, um auf unterstützten Plattformen vorzufüllen.",
        "write-review-heading": "Schreiben Sie Ihre Bewertung",
        "review-copy-info": "Kopieren Sie diesen Text, um ihn in die ausgewählte Bewertungsplattform einzufügen.",
        "copy-review": "In die Zwischenablage kopieren",
        "select-platform-heading": "Wählen Sie eine Plattform, um Ihre Bewertung zu teilen",
        "review-textarea-placeholder": "Schreiben Sie Ihre Bewertung hier oder lassen Sie die KI Ihnen helfen...",
        "testimonial-textarea-placeholder": "Schreiben Sie Ihren Erfahrungsbericht hier oder lassen Sie die KI Ihnen helfen...",
        "thank-you-title": "Vielen Dank!",
        "thank-you-message": "Wir schätzen es sehr, dass Sie sich die Zeit genommen haben, unsere Umfrage auszufüllen. Ihr Feedback hilft uns, unsere Dienstleistungen zu verbessern.",
        "powered-by": "Bereitgestellt von",
        "try-free": "Kostenlos testen",
        "powered-by-title": "Testen Sie 360Pulse kontinuierliche Feedback-Umfragen kostenlos",
        "testimonial-success": "Vielen Dank für Ihren Erfahrungsbericht!",
        "testimonial-success-message": "Sie werden in Kürze zu den Bewertungsoptionen weitergeleitet.",
        "redirect-message": "Weiterleitung...",
        "title-promoter": "Wir schätzen Ihre Zeit!",
        "welcome-promoter": "Wir schätzen Ihre kontinuierliche Unterstützung wirklich. Wir freuen uns über zusätzliche Gedanken, die Sie teilen möchten, da Ihr kontinuierliches Feedback uns beim Wachsen hilft.",
        "feedback-placeholder-promoter": "Wie können wir die Dinge für Sie noch besser machen?",
        "title-passive": "Teilen Sie Ihre Gedanken",
        "welcome-passive": "Danke, dass Sie sich die Zeit genommen haben, unsere Umfrage auszufüllen. Wir würden gerne mehr darüber erfahren, was Ihnen gefallen hat und welche Ideen Sie haben, um die Dinge noch besser zu machen.",
        "feedback-placeholder-passive": "Was hat Ihnen gefallen und wie können wir uns weiter verbessern?",
        "title-detractor": "Helfen Sie uns, besser zu werden",
        "welcome-detractor": "Danke, dass Sie sich die Zeit genommen haben, unsere Umfrage auszufüllen. Es tut uns leid zu hören, dass die Dinge Ihre Erwartungen nicht erfüllt haben. Ihr ehrliches Feedback hilft uns, Verbesserungsmöglichkeiten zu identifizieren.",
        "feedback-placeholder-detractor": "Bitte teilen Sie uns mit, was schief gelaufen ist und wie wir es besser machen können.",
        "page-title": "Vielen Dank für Ihr Feedback",
        "meta-description": "Wir danken Ihnen, dass Sie sich die Zeit genommen haben, Ihre Gedanken zu teilen. Ihre Einblicke helfen uns, uns zu verbessern und ein besseres Erlebnis für alle zu schaffen."
    },
    "zh": {
        "testimonial": "推荐",
        "submit-feedback": "提交反馈",
        "reviews": "留下评价",
        "testimonial-heading": "分享您的体验",
        "testimonial-subheading": "您的简短推荐对我们意义重大！",
        "write-testimonial-heading": "撰写您的推荐",
        "ai-button-text": "让AI为我写",
        "consent-label": "我同意我的推荐可用于营销材料",
        "consent-info": "勾选此框，即表示您同意我们可以在营销材料中使用您的全部或部分推荐。您的推荐可能出现在我们的网站、社交媒体和其他营销渠道。我们可能会编辑您的推荐以提高清晰度，同时保持您反馈的本质。此同意包括允许使用您的姓名、职称、公司、提供的照片（如有），以及在适用情况下链接到您的网站。您可以随时联系我们，要求停止将来使用您的推荐。请注意，虽然我们可以防止您的推荐在新材料中使用，但我们可能无法将其从已发布的材料中删除，如印刷品、视频或过去的社交媒体帖子。",
        "submit-testimonial": "提交并继续到评价",
        "skip-testimonial": "跳过此步骤",
        "review-heading": "留下评价",
        "review-subheading": "您的体验可以帮助您的同行，您愿意将其作为评价分享吗？",
        "rate-experience-heading": "您如何评价您的体验？",
        "star-rating-info": "选择评分以在支持的平台上预填。",
        "write-review-heading": "撰写您的评价",
        "review-copy-info": "复制此文本以粘贴到您选择的评价平台。",
        "copy-review": "复制到剪贴板",
        "select-platform-heading": "选择一个平台分享您的评价",
        "review-textarea-placeholder": "在此处撰写您的评价或让AI帮助您...",
        "testimonial-textarea-placeholder": "在此处撰写您的推荐或让AI帮助您...",
        "thank-you-title": "谢谢！",
        "thank-you-message": "非常感谢您抽出时间完成我们的调查。您的反馈帮助我们改进服务。",
        "powered-by": "技术支持",
        "try-free": "免费试用",
        "powered-by-title": "免费试用 360Pulse 持续反馈调查",
        "testimonial-success": "感谢您的推荐！",
        "testimonial-success-message": "您将很快被重定向到评价选项。",
        "redirect-message": "正在重定向...",
        "title-promoter": "我们感谢您的时间！",
        "welcome-promoter": "我们真诚感谢您持续的支持。我们欢迎您分享任何其他想法，因为您持续的反馈帮助我们成长。",
        "feedback-placeholder-promoter": "我们如何能为您做得更好？",
        "title-passive": "分享您的想法",
        "welcome-passive": "感谢您抽出时间完成我们的调查。我们很想了解更多关于您喜欢的内容以及您对如何使事情变得更好的想法。",
        "feedback-placeholder-passive": "您喜欢什么，我们如何进一步改进？",
        "title-detractor": "帮助我们改进",
        "welcome-detractor": "感谢您抽出时间完成我们的调查。我们很遗憾听到事情没有达到您的期望。您的诚实反馈帮助我们找出改进的方法。",
        "feedback-placeholder-detractor": "请告诉我们什么出了问题，以及我们如何做得更好。",
        "page-title": "感谢您的反馈",
        "meta-description": "感谢您抽出时间分享您的想法。您的见解帮助我们改进并为所有人创造更好的体验。"
    },
    "ja": {
        "testimonial": "推薦文",
        "submit-feedback": "フィードバックを送信",
        "reviews": "レビューを残す",
        "testimonial-heading": "あなたの体験を共有する",
        "testimonial-subheading": "あなたからの簡単な推薦文は私たちにとって非常に重要です！",
        "write-testimonial-heading": "あなたの推薦文を書く",
        "ai-button-text": "AIに書いてもらう",
        "consent-label": "私の推薦文がマーケティング資料に使用されることに同意します",
        "consent-info": "このボックスにチェックを入れることで、あなたは私たちがあなたの推薦文の全部または一部を当社のマーケティング資料で使用することに同意します。あなたの推薦文は、当社のウェブサイト、ソーシャルメディア、その他のマーケティングチャネルに表示される可能性があります。また、あなたのフィードバックの本質を維持しながら、明確さのために推薦文を編集する場合があります。この同意には、必要に応じて、あなたの名前、役職、会社、提供された写真、およびウェブサイトへのリンクを使用する許可が含まれます。あなたは当社に連絡することで、いつでも推薦文の将来の使用を停止するよう要求することができます。ただし、新しい資料でのあなたの推薦文の使用を防止することはできますが、印刷物、動画、過去のソーシャルメディア投稿など、すでに公開された資料からは削除できない場合があることにご注意ください。",
        "submit-testimonial": "送信してレビューに進む",
        "skip-testimonial": "このステップをスキップ",
        "review-heading": "レビューを残す",
        "review-subheading": "あなたの経験は同僚の役に立ちます。レビューとして共有しませんか？",
        "rate-experience-heading": "あなたの経験をどのように評価しますか？",
        "star-rating-info": "サポートされているプラットフォームに事前入力する評価を選択してください。",
        "write-review-heading": "あなたのレビューを書く",
        "review-copy-info": "このテキストをコピーして、選択したレビュープラットフォームに貼り付けてください。",
        "copy-review": "クリップボードにコピー",
        "select-platform-heading": "レビューを共有するプラットフォームを選択",
        "review-textarea-placeholder": "ここにレビューを書くか、AIに手伝ってもらいましょう...",
        "testimonial-textarea-placeholder": "ここに推薦文を書くか、AIに手伝ってもらいましょう...",
        "thank-you-title": "ありがとうございます！",
        "thank-you-message": "アンケートにお時間を割いていただき、誠にありがとうございます。あなたのフィードバックは、私たちのサービス向上に役立ちます。",
        "powered-by": "提供",
        "try-free": "無料でお試し",
        "powered-by-title": "360Pulse継続的フィードバック調査を無料でお試しください",
        "testimonial-success": "推薦文をありがとうございます！",
        "testimonial-success-message": "まもなくレビューオプションにリダイレクトされます。",
        "redirect-message": "リダイレクト中...",
        "title-promoter": "お時間をいただきありがとうございます！",
        "welcome-promoter": "継続的なサポートに心から感謝いたします。追加のご意見をお寄せいただければ幸いです。皆様の継続的なフィードバックが私たちの成長を助けています。",
        "feedback-placeholder-promoter": "どのようにすればさらに良くなるでしょうか？",
        "title-passive": "ご意見をお聞かせください",
        "welcome-passive": "アンケートにお時間を割いていただきありがとうございます。あなたが気に入ったことや、さらに改善するためのアイデアについてもっと知りたいです。",
        "feedback-placeholder-passive": "何を楽しんでいただきましたか？また、どのようにさらに改善できますか？",
        "title-detractor": "改善にご協力ください",
        "welcome-detractor": "アンケートにお時間を割いていただきありがとうございます。期待に応えられなかったことを申し訳なく思います。あなたの正直なフィードバックは、改善方法を特定するのに役立ちます。",
        "feedback-placeholder-detractor": "何がうまくいかなかったのか、どうすれば改善できるかを教えてください。",
        "page-title": "フィードバックをありがとうございます",
        "meta-description": "お時間を割いてご意見をお寄せいただき、ありがとうございます。あなたの洞察は私たちの改善に役立ち、皆様にとってより良い体験を作り出すのに役立ちます。"
    },
    "ko": {
        "testimonial": "추천사",
        "submit-feedback": "피드백 제출",
        "reviews": "리뷰 남기기",
        "testimonial-heading": "경험 공유하기",
        "testimonial-subheading": "간단한 추천사는 저희에게 큰 의미가 있습니다!",
        "write-testimonial-heading": "추천사 작성하기",
        "ai-button-text": "AI에게 작성을 맡기기",
        "consent-label": "추천사가 마케팅 자료에 사용될 수 있음에 동의합니다",
        "consent-info": "이 확인란을 선택하면 마케팅 자료에 추천사의 전부 또는 일부를 사용하는 데 동의하는 것입니다. 귀하의 추천사는 당사 웹사이트, 소셜 미디어 및 기타 마케팅 채널에 표시될 수 있습니다. 또한 피드백의 본질을 유지하면서 명확성을 위해 추천사를 편집할 수 있습니다. 이 동의에는 해당되는 경우 귀하의 이름, 직함, 회사, 제공된 사진 및 웹사이트 링크를 사용할 수 있는 권한이 포함됩니다. 귀하는 당사에 연락하여 언제든지 추천사의 향후 사용 중단을 요청할 수 있습니다. 그러나 새로운 자료에 귀하의 추천사 사용을 방지할 수는 있지만 인쇄물, 비디오 또는 과거 소셜 미디어 게시물과 같이 이미 게시된 자료에서는 삭제하지 못할 수 있습니다.",
        "submit-testimonial": "제출하고 리뷰로 계속하기",
        "skip-testimonial": "이 단계 건너뛰기",
        "review-heading": "리뷰 남기기",
        "review-subheading": "귀하의 경험은 동료에게 도움이 될 수 있습니다. 리뷰로 공유하시겠습니까?",
        "rate-experience-heading": "경험을 어떻게 평가하시겠습니까?",
        "star-rating-info": "지원되는 플랫폼에 미리 채울 등급을 선택하세요.",
        "write-review-heading": "리뷰 작성하기",
        "review-copy-info": "이 텍스트를 복사하여 선택한 리뷰 플랫폼에 붙여넣으세요.",
        "copy-review": "클립보드에 복사",
        "select-platform-heading": "리뷰를 공유할 플랫폼 선택",
        "review-textarea-placeholder": "여기에 리뷰를 작성하거나 AI의 도움을 받으세요...",
        "testimonial-textarea-placeholder": "여기에 추천사를 작성하거나 AI의 도움을 받으세요...",
        "thank-you-title": "감사합니다!",
        "thank-you-message": "설문조사를 완료해 주셔서 진심으로 감사드립니다. 귀하의 피드백은 저희 서비스 개선에 도움이 됩니다.",
        "powered-by": "제공",
        "try-free": "무료로 사용해 보기",
        "powered-by-title": "360Pulse 지속적 피드백 설문조사를 무료로 사용해 보세요",
        "testimonial-success": "추천사를 남겨주셔서 감사합니다!",
        "testimonial-success-message": "곧 리뷰 옵션으로 리디렉션됩니다.",
        "redirect-message": "리디렉션 중...",
        "title-promoter": "시간을 내주셔서 감사합니다!",
        "welcome-promoter": "지속적인 지원에 진심으로 감사드립니다. 지속적인 피드백이 저희의 성장에 도움이 되므로, 추가로 공유하고 싶은 생각이 있으시면 환영합니다.",
        "feedback-placeholder-promoter": "어떻게 하면 더 나아질 수 있을까요?",
        "title-passive": "생각을 공유해주세요",
        "welcome-passive": "설문조사를 완료해 주셔서 감사합니다. 좋았던 점과 더 나아지기 위한 아이디어에 대해 더 알고 싶습니다.",
        "feedback-placeholder-passive": "무엇이 좋았으며, 어떻게 하면 더 개선할 수 있을까요?",
        "title-detractor": "개선에 도움을 주세요",
        "welcome-detractor": "설문조사를 완료해 주셔서 감사합니다. 기대에 미치지 못했다니 유감입니다. 귀하의 솔직한 피드백은 개선 방법을 찾는 데 도움이 됩니다.",
        "feedback-placeholder-detractor": "무엇이 잘못되었고 어떻게 개선할 수 있는지 알려주세요.",
        "page-title": "피드백을 주셔서 감사합니다",
        "meta-description": "시간을 내어 생각을 공유해 주셔서 감사합니다. 귀하의 통찰력은 저희가 개선하고 모두를 위해 더 나은 경험을 만드는 데 도움이 됩니다."
    },
    "it": {
        "testimonial": "Testimonianza",
        "submit-feedback": "Invia Feedback",
        "reviews": "Lascia una Recensione",
        "testimonial-heading": "Condividi la Tua Esperienza",
        "testimonial-subheading": "Una tua breve testimonianza significherebbe molto per noi!",
        "write-testimonial-heading": "Scrivi la Tua Testimonianza",
        "ai-button-text": "Lascia che l'IA scriva questo per me",
        "consent-label": "Accetto che la mia testimonianza possa essere utilizzata in materiali di marketing",
        "consent-info": "Selezionando questa casella, accetti che possiamo utilizzare tutta o parte della tua testimonianza nei nostri materiali di marketing. La tua testimonianza potrebbe apparire sul nostro sito web, sui social media e su altri canali di marketing. Potremmo anche modificare la tua testimonianza per chiarezza, mantenendo l'essenza del tuo feedback. Questo consenso include il permesso di utilizzare il tuo nome, titolo, azienda, foto se fornita, e un link al tuo sito web, se applicabile. Puoi richiedere di interrompere l'uso futuro della tua testimonianza in qualsiasi momento contattandoci. Tieni presente che, sebbene possiamo impedire che la tua testimonianza venga utilizzata in nuovi materiali, potremmo non essere in grado di rimuoverla da materiali già pubblicati come materiale stampato, video o post precedenti sui social media.",
        "submit-testimonial": "Invia e Continua alle Recensioni",
        "skip-testimonial": "Salta questo passaggio",
        "review-heading": "Lascia una Recensione",
        "review-subheading": "La tua esperienza può aiutare i tuoi colleghi, la condivideresti come recensione?",
        "rate-experience-heading": "Come valuteresti la tua esperienza?",
        "star-rating-info": "Seleziona una valutazione per precompilare sulle piattaforme supportate.",
        "write-review-heading": "Scrivi la Tua Recensione",
        "review-copy-info": "Copia questo testo da incollare nella piattaforma di recensioni selezionata.",
        "copy-review": "Copia negli Appunti",
        "select-platform-heading": "Seleziona una Piattaforma per Condividere la Tua Recensione",
        "review-textarea-placeholder": "Scrivi qui la tua recensione o lascia che l'IA ti aiuti...",
        "testimonial-textarea-placeholder": "Scrivi qui la tua testimonianza o lascia che l'IA ti aiuti...",
        "thank-you-title": "Grazie!",
        "thank-you-message": "Apprezziamo davvero che tu abbia dedicato del tempo a completare il nostro sondaggio. Il tuo feedback ci aiuta a migliorare i nostri servizi.",
        "powered-by": "Offerto da",
        "try-free": "Provalo gratuitamente",
        "powered-by-title": "Prova gratuitamente i sondaggi di feedback continuo 360Pulse",
        "testimonial-success": "Grazie per la tua testimonianza!",
        "testimonial-success-message": "Sarai reindirizzato alle opzioni di recensione a breve.",
        "redirect-message": "Reindirizzamento in corso...",
        "title-promoter": "Apprezziamo il tuo tempo!",
        "welcome-promoter": "Apprezziamo davvero il tuo continuo supporto. Accogliamo con piacere qualsiasi pensiero aggiuntivo che vorresti condividere, poiché il tuo feedback continuo ci aiuta a crescere.",
        "feedback-placeholder-promoter": "Come possiamo rendere le cose ancora migliori per te?",
        "title-passive": "Condividi i tuoi pensieri",
        "welcome-passive": "Grazie per aver dedicato del tempo a completare il nostro sondaggio. Ci piacerebbe sapere di più su ciò che ti è piaciuto e su qualsiasi idea tu abbia per migliorare ulteriormente.",
        "feedback-placeholder-passive": "Cosa hai apprezzato e come possiamo migliorare ulteriormente?",
        "title-detractor": "Aiutaci a migliorare",
        "welcome-detractor": "Grazie per aver dedicato del tempo a completare il nostro sondaggio. Ci dispiace sapere che le cose non hanno soddisfatto le tue aspettative. Il tuo feedback onesto ci aiuta a identificare modi per migliorare.",
        "feedback-placeholder-detractor": "Per favore, dicci cosa è andato storto e come possiamo fare meglio.",
        "page-title": "Grazie per il tuo feedback",
        "meta-description": "Apprezziamo che tu abbia dedicato del tempo a condividere i tuoi pensieri. Le tue opinioni ci aiutano a migliorare e a creare un'esperienza migliore per tutti."
    },
    "pt": {
        "testimonial": "Depoimento",
        "submit-feedback": "Enviar Feedback",
        "reviews": "Deixar um Comentário",
        "testimonial-heading": "Compartilhe sua Experiência",
        "testimonial-subheading": "Um breve depoimento seu significaria muito para nós!",
        "write-testimonial-heading": "Escreva seu Depoimento",
        "ai-button-text": "Deixar a IA escrever isso para mim",
        "consent-label": "Concordo que meu depoimento possa ser usado em materiais de marketing",
        "consent-info": "Ao marcar esta caixa, você concorda que podemos usar todo ou parte do seu depoimento em nossos materiais de marketing. Seu depoimento pode aparecer em nosso site, mídias sociais e outros canais de marketing. Também podemos editar seu depoimento para maior clareza, mantendo a essência do seu feedback. Este consentimento inclui permissão para usar seu nome, cargo, empresa, foto, se fornecida, e um link para seu site, quando aplicável. Você pode solicitar a interrupção do uso futuro do seu depoimento a qualquer momento entrando em contato conosco. Observe que, embora possamos impedir que seu depoimento seja usado em novos materiais, talvez não possamos removê-lo de materiais já publicados, como materiais impressos, vídeos ou postagens anteriores em mídias sociais.",
        "submit-testimonial": "Enviar e Continuar para Comentários",
        "skip-testimonial": "Pular esta etapa",
        "review-heading": "Deixar um Comentário",
        "review-subheading": "Sua experiência pode ajudar seus colegas, você a compartilharia como um comentário?",
        "rate-experience-heading": "Como você avaliaria sua experiência?",
        "star-rating-info": "Selecione uma classificação para preencher previamente nas plataformas suportadas.",
        "write-review-heading": "Escreva seu Comentário",
        "review-copy-info": "Copie este texto para colar na plataforma de comentários selecionada.",
        "copy-review": "Copiar para a Área de Transferência",
        "select-platform-heading": "Selecione uma Plataforma para Compartilhar seu Comentário",
        "review-textarea-placeholder": "Escreva sua avaliação aqui ou deixe a IA ajudá-lo...",
        "testimonial-textarea-placeholder": "Escreva seu depoimento aqui ou deixe a IA ajudá-lo...",
        "thank-you-title": "Obrigado!",
        "thank-you-message": "Agradecemos sinceramente por você ter dedicado tempo para preencher nossa pesquisa. Seu feedback nos ajuda a melhorar nossos serviços.",
        "powered-by": "Desenvolvido por",
        "try-free": "Experimente gratuitamente",
        "powered-by-title": "Experimente as pesquisas de feedback contínuo 360Pulse gratuitamente",
        "testimonial-success": "Obrigado pelo seu depoimento!",
        "testimonial-success-message": "Você será redirecionado para as opções de comentários em breve.",
        "redirect-message": "Redirecionando...",
        "title-promoter": "Agradecemos seu tempo!",
        "welcome-promoter": "Realmente apreciamos seu apoio contínuo. Agradecemos quaisquer pensamentos adicionais que você gostaria de compartilhar, pois seu feedback contínuo nos ajuda a crescer.",
        "feedback-placeholder-promoter": "Como podemos tornar as coisas ainda melhores para você?",
        "title-passive": "Compartilhe seus pensamentos",
        "welcome-passive": "Obrigado por dedicar seu tempo para preencher nossa pesquisa. Gostaríamos de saber mais sobre o que você gostou e quaisquer ideias que tenha para tornar as coisas ainda melhores.",
        "feedback-placeholder-passive": "O que você gostou e como podemos melhorar ainda mais?",
        "title-detractor": "Ajude-nos a melhorar",
        "welcome-detractor": "Obrigado por dedicar seu tempo para preencher nossa pesquisa. Lamentamos saber que as coisas não atenderam às suas expectativas. Seu feedback honesto nos ajuda a identificar maneiras de melhorar.",
        "feedback-placeholder-detractor": "Por favor, diga-nos o que deu errado e como podemos fazer melhor.",
        "page-title": "Obrigado pelo seu feedback",
        "meta-description": "Agradecemos por você ter dedicado tempo para compartilhar seus pensamentos. Suas percepções nos ajudam a melhorar e criar uma experiência melhor para todos."
    },
    "nl": {
        "testimonial": "Getuigenis",
        "submit-feedback": "Feedback Verzenden",
        "reviews": "Laat een Review Achter",
        "testimonial-heading": "Deel uw Ervaring",
        "testimonial-subheading": "Een korte getuigenis van u zou veel voor ons betekenen!",
        "write-testimonial-heading": "Schrijf uw Getuigenis",
        "ai-button-text": "Laat AI dit voor mij schrijven",
        "consent-label": "Ik ga ermee akkoord dat mijn getuigenis mag worden gebruikt in marketingmateriaal",
        "consent-info": "Door dit vakje aan te vinken, gaat u ermee akkoord dat wij uw getuigenis geheel of gedeeltelijk mogen gebruiken in ons marketingmateriaal. Uw getuigenis kan verschijnen op onze website, sociale media en andere marketingkanalen. We kunnen uw getuigenis ook bewerken voor de duidelijkheid, met behoud van de essentie van uw feedback. Deze toestemming omvat toestemming om uw naam, titel, bedrijf, foto indien verstrekt, en een link naar uw website te gebruiken, indien van toepassing. U kunt te allen tijde verzoeken om het toekomstige gebruik van uw getuigenis te stoppen door contact met ons op te nemen. Houd er rekening mee dat, hoewel we kunnen voorkomen dat uw getuigenis in nieuw materiaal wordt gebruikt, we deze mogelijk niet kunnen verwijderen uit reeds gepubliceerd materiaal, zoals drukwerk, video's of eerdere posts op sociale media.",
        "submit-testimonial": "Verzenden & Doorgaan naar Reviews",
        "skip-testimonial": "Deze stap overslaan",
        "review-heading": "Laat een Review Achter",
        "review-subheading": "Uw ervaring kan uw collega's helpen, wilt u deze delen als een review?",
        "rate-experience-heading": "Hoe zou u uw ervaring beoordelen?",
        "star-rating-info": "Selecteer een beoordeling om vooraf in te vullen op ondersteunde platforms.",
        "write-review-heading": "Schrijf uw Review",
        "review-copy-info": "Kopieer deze tekst om in uw geselecteerde reviewplatform te plakken.",
        "copy-review": "Kopiëren naar Klembord",
        "select-platform-heading": "Selecteer een Platform om uw Review te Delen",
        "review-textarea-placeholder": "Schrijf hier uw review of laat AI u helpen...",
        "testimonial-textarea-placeholder": "Schrijf hier uw getuigenis of laat AI u helpen...",
        "thank-you-title": "Bedankt!",
        "thank-you-message": "We waarderen het zeer dat u de tijd heeft genomen om onze enquête in te vullen. Uw feedback helpt ons onze diensten te verbeteren.",
        "powered-by": "Aangedreven door",
        "try-free": "Probeer het gratis",
        "powered-by-title": "Probeer 360Pulse continue feedback-enquêtes gratis",
        "testimonial-success": "Bedankt voor uw getuigenis!",
        "testimonial-success-message": "U wordt binnenkort doorgestuurd naar de beoordelingsopties.",
        "redirect-message": "Doorverwijzen...",
        "title-promoter": "We waarderen uw tijd!",
        "welcome-promoter": "We waarderen uw voortdurende ondersteuning echt. We verwelkomen alle aanvullende gedachten die u wilt delen, aangezien uw voortdurende feedback ons helpt groeien.",
        "feedback-placeholder-promoter": "Hoe kunnen we de dingen nog beter voor u maken?",
        "title-passive": "Deel uw gedachten",
        "welcome-passive": "Bedankt dat u de tijd heeft genomen om onze enquête in te vullen. We horen graag meer over wat u leuk vond en eventuele ideeën die u heeft om dingen nog beter te maken.",
        "feedback-placeholder-passive": "Wat vond u leuk en hoe kunnen we verder verbeteren?",
        "title-detractor": "Help ons verbeteren",
        "welcome-detractor": "Bedankt dat u de tijd heeft genomen om onze enquête in te vullen. Het spijt ons te horen dat de dingen niet aan uw verwachtingen voldeden. Uw eerlijke feedback helpt ons manieren te identificeren om te verbeteren.",
        "feedback-placeholder-detractor": "Vertel ons alstublieft wat er mis ging en hoe we het beter kunnen doen.",
        "page-title": "Bedankt voor uw feedback",
        "meta-description": "We waarderen dat u de tijd heeft genomen om uw gedachten te delen. Uw inzichten helpen ons te verbeteren en een betere ervaring voor iedereen te creëren."
    },
    "ru": {
        "testimonial": "Отзыв",
        "submit-feedback": "Отправить Отзыв",
        "reviews": "Оставить отзыв",
        "testimonial-heading": "Поделитесь своим опытом",
        "testimonial-subheading": "Ваш краткий отзыв будет очень важен для нас!",
        "write-testimonial-heading": "Напишите свой отзыв",
        "ai-button-text": "Пусть AI напишет это за меня",
        "consent-label": "Я согласен с тем, что мой отзыв может быть использован в маркетинговых материалах",
        "consent-info": "Устанавливая этот флажок, вы соглашаетесь с тем, что мы можем использовать ваш отзыв полностью или частично в наших маркетинговых материалах. Ваш отзыв может появиться на нашем веб-сайте, в социальных сетях и других маркетинговых каналах. Мы также можем отредактировать ваш отзыв для ясности, сохраняя при этом суть вашего отзыва. Это согласие включает разрешение на использование вашего имени, должности, компании, фотографии, если она предоставлена, и ссылки на ваш веб-сайт, если применимо. Вы можете в любое время потребовать прекратить использование вашего отзыва в будущем, связавшись с нами. Обратите внимание, что, хотя мы можем предотвратить использование вашего отзыва в новых материалах, мы, возможно, не сможем удалить его из уже опубликованных материалов, таких как печатные материалы, видео или прошлые сообщения в социальных сетях.",
        "submit-testimonial": "Отправить и перейти к отзывам",
        "skip-testimonial": "Пропустить этот шаг",
        "review-heading": "Оставить отзыв",
        "review-subheading": "Ваш опыт может помочь вашим коллегам, не могли бы вы поделиться им в качестве отзыва?",
        "rate-experience-heading": "Как бы вы оценили свой опыт?",
        "star-rating-info": "Выберите оценку для предварительного заполнения на поддерживаемых платформах.",
        "write-review-heading": "Напишите свой отзыв",
        "review-copy-info": "Скопируйте этот текст, чтобы вставить его на выбранную вами платформу отзывов.",
        "copy-review": "Копировать в буфер обмена",
        "select-platform-heading": "Выберите платформу, чтобы поделиться своим отзывом",
        "review-textarea-placeholder": "Напишите свой отзыв здесь или позвольте ИИ помочь вам...",
        "testimonial-textarea-placeholder": "Напишите свой отзыв здесь или позвольте ИИ помочь вам...",
        "thank-you-title": "Спасибо!",
        "thank-you-message": "Мы искренне благодарим вас за то, что вы нашли время заполнить нашу анкету. Ваш отзыв помогает нам улучшать наши услуги.",
        "powered-by": "Работает на платформе",
        "try-free": "Попробуйте бесплатно",
        "powered-by-title": "Попробуйте опросы непрерывной обратной связи 360Pulse бесплатно",
        "testimonial-success": "Спасибо за ваш отзыв!",
        "testimonial-success-message": "Вы будете перенаправлены к вариантам обзора в ближайшее время.",
        "redirect-message": "Перенаправление...",
        "title-promoter": "Мы ценим ваше время!",
        "welcome-promoter": "Мы действительно ценим вашу постоянную поддержку. Мы приветствуем любые дополнительные мысли, которыми вы хотели бы поделиться, поскольку ваши постоянные отзывы помогают нам расти.",
        "feedback-placeholder-promoter": "Как мы можем сделать вещи еще лучше для вас?",
        "title-passive": "Поделитесь своими мыслями",
        "welcome-passive": "Спасибо, что нашли время, чтобы заполнить наш опрос. Мы хотели бы узнать больше о том, что вам понравилось, и о любых идеях, которые у вас есть, чтобы сделать вещи еще лучше.",
        "feedback-placeholder-passive": "Что вам понравилось, и как мы можем улучшиться дальше?",
        "title-detractor": "Помогите нам улучшиться",
        "welcome-detractor": "Спасибо, что нашли время, чтобы заполнить наш опрос. Нам жаль слышать, что вещи не соответствовали вашим ожиданиям. Ваши честные отзывы помогают нам определить способы улучшения.",
        "feedback-placeholder-detractor": "Пожалуйста, расскажите нам, что пошло не так, и как мы можем сделать лучше.",
        "page-title": "Спасибо за ваш отзыв",
        "meta-description": "Мы ценим, что вы нашли время поделиться своими мыслями. Ваши идеи помогают нам улучшаться и создавать лучший опыт для всех."
    },
    "ar": {
        "testimonial": "شهادة",
        "submit-feedback": "إرسال التعليقات",
        "reviews": "اترك تعليق",
        "testimonial-heading": "شارك تجربتك",
        "testimonial-subheading": "شهادة موجزة منك ستعني لنا الكثير!",
        "write-testimonial-heading": "اكتب شهادتك",
        "ai-button-text": "دع الذكاء الاصطناعي يكتب هذا لي",
        "consent-label": "أوافق على أنه يجوز استخدام شهادتي في المواد التسويقية",
        "consent-info": "من خلال تحديد هذا المربع، فإنك توافق على أنه يجوز لنا استخدام كل أو أجزاء من شهادتك في موادنا التسويقية. قد تظهر شهادتك على موقعنا الإلكتروني ووسائل التواصل الاجتماعي وقنوات التسويق الأخرى. يجوز لنا أيضًا تعديل شهادتك للتوضيح مع الحفاظ على جوهر ملاحظاتك. تتضمن هذه الموافقة الإذن باستخدام اسمك والمسمى الوظيفي والشركة والصورة إذا تم توفيرها ورابط إلى موقع الويب الخاص بك عند الاقتضاء. يمكنك طلب إيقاف الاستخدام المستقبلي لشهادتك في أي وقت عن طريق الاتصال بنا. يرجى ملاحظة أنه بينما يمكننا منع استخدام شهادتك في المواد الجديدة، فقد لا نتمكن من إزالتها من المواد المنشورة بالفعل مثل المواد المطبوعة أو مقاطع الفيديو أو منشورات وسائل التواصل الاجتماعي السابقة.",
        "submit-testimonial": "إرسال والمتابعة إلى التعليقات",
        "skip-testimonial": "تخطي هذه الخطوة",
        "review-heading": "اترك تعليق",
        "review-subheading": "تجربتك يمكن أن تساعد زملائك، هل ستشاركها كتعليق؟",
        "rate-experience-heading": "كيف تقيم تجربتك؟",
        "star-rating-info": "حدد تقييمًا للملء المسبق على الأنظمة الأساسية المدعومة.",
        "write-review-heading": "اكتب تعليقك",
        "review-copy-info": "انسخ هذا النص للصقه في نظام التعليقات الذي اخترته.",
        "copy-review": "نسخ إلى الحافظة",
        "select-platform-heading": "حدد نظامًا أساسيًا لمشاركة تعليقك",
        "review-textarea-placeholder": "اكتب مراجعتك هنا أو دع الذكاء الاصطناعي يساعدك...",
        "testimonial-textarea-placeholder": "اكتب شهادتك هنا أو دع الذكاء الاصطناعي يساعدك...",
        "thank-you-title": "شكراً لك!",
        "thank-you-message": "نقدر حقاً أنك خصصت وقتاً لإكمال استطلاعنا. تعليقاتك تساعدنا على تحسين خدماتنا.",
        "powered-by": "مدعوم بواسطة",
        "try-free": "جربه مجانًا",
        "powered-by-title": "جرب استبيانات التقييم المستمر 360Pulse مجانًا",
        "testimonial-success": "شكراً على شهادتك!",
        "testimonial-success-message": "سيتم إعادة توجيهك إلى خيارات المراجعة قريباً.",
        "redirect-message": "جاري إعادة التوجيه...",
        "title-promoter": "نقدر وقتك!",
        "welcome-promoter": "نحن نقدر حقاً دعمك المستمر. نرحب بأي أفكار إضافية ترغب في مشاركتها، حيث تساعدنا ملاحظاتك المستمرة على النمو.",
        "feedback-placeholder-promoter": "كيف يمكننا جعل الأمور أفضل بالنسبة لك؟",
        "title-passive": "شارك أفكارك",
        "welcome-passive": "شكراً على تخصيص وقت لإكمال استطلاعنا. نود معرفة المزيد عما أعجبك وأي أفكار لديك لجعل الأمور أفضل.",
        "feedback-placeholder-passive": "ما الذي استمتعت به، وكيف يمكننا التحسين أكثر؟",
        "title-detractor": "ساعدنا على التحسين",
        "welcome-detractor": "شكراً على تخصيص وقت لإكمال استطلاعنا. يؤسفنا سماع أن الأمور لم تلب توقعاتك. تساعدنا ملاحظاتك الصادقة على تحديد طرق للتحسين.",
        "feedback-placeholder-detractor": "الرجاء إخبارنا بما حدث وكيف يمكننا أن نقوم بعمل أفضل.",
        "page-title": "شكراً على تعليقاتك",
        "meta-description": "نقدر لك الوقت الذي قضيته في مشاركة أفكارك. تساعدنا رؤاك على التحسين وخلق تجربة أفضل للجميع."
    },
    "hi": {
        "testimonial": "प्रशंसापत्र",
        "submit-feedback": "प्रतिक्रिया भेजें",
        "reviews": "समीक्षा छोड़ें",
        "testimonial-heading": "अपना अनुभव साझा करें",
        "testimonial-subheading": "आपका एक संक्षिप्त प्रशंसापत्र हमारे लिए बहुत मायने रखेगा!",
        "write-testimonial-heading": "अपना प्रशंसापत्र लिखें",
        "ai-button-text": "AI को मेरे लिए यह लिखने दें",
        "consent-label": "मैं सहमत हूं कि मेरे प्रशंसापत्र का उपयोग मार्केटिंग सामग्री में किया जा सकता है",
        "consent-info": "इस बॉक्स को चेक करके, आप सहमति देते हैं कि हम आपकी प्रशंसापत्र के सभी या हिस्सों का उपयोग अपनी मार्केटिंग सामग्री में कर सकते हैं। आपकी प्रशंसापत्र हमारी वेबसाइट, सोशल मीडिया और अन्य मार्केटिंग चैनलों पर दिखाई दे सकती है। हम आपकी प्रतिक्रिया के सार को बनाए रखते हुए स्पष्टता के लिए आपकी प्रशंसापत्र को संपादित भी कर सकते हैं। इस सहमति में आपके नाम, शीर्षक, कंपनी, प्रदान की गई तस्वीर और आपके वेबसाइट के लिंक का उपयोग करने की अनुमति शामिल है, जब लागू हो। आप हमसे संपर्क करके किसी भी समय अपनी प्रशंसापत्र के भविष्य में उपयोग को रोकने का अनुरोध कर सकते हैं। कृपया ध्यान दें कि जब हम नई सामग्री में आपकी प्रशंसापत्र के उपयोग को रोक सकते हैं, तो हम इसे पहले से प्रकाशित सामग्री जैसे मुद्रित सामग्री, वीडियो या पिछली सोशल मीडिया पोस्ट से निकालने में सक्षम नहीं हो सकते हैं।",
        "submit-testimonial": "जमा करें और समीक्षाओं पर जारी रखें",
        "skip-testimonial": "इस चरण को छोड़ें",
        "review-heading": "समीक्षा छोड़ें",
        "review-subheading": "आपका अनुभव आपके साथियों की मदद कर सकता है, क्या आप इसे समीक्षा के रूप में साझा करेंगे?",
        "rate-experience-heading": "आप अपने अनुभव को कैसे रेट करेंगे?",
        "star-rating-info": "समर्थित प्लेटफ़ॉर्म पर प्रीफ़िल करने के लिए रेटिंग चुनें।",
        "write-review-heading": "अपनी समीक्षा लिखें",
        "review-copy-info": "इस टेक्स्ट को कॉपी करें और अपने चुने हुए समीक्षा प्लेटफ़ॉर्म में पेस्ट करें।",
        "copy-review": "क्लिपबोर्ड पर कॉपी करें",
        "select-platform-heading": "अपनी समीक्षा साझा करने के लिए एक प्लेटफ़ॉर्म चुनें",
        "review-textarea-placeholder": "अपनी समीक्षा यहां लिखें या AI को आपकी मदद करने दें...",
        "testimonial-textarea-placeholder": "अपना प्रशंसापत्र यहां लिखें या AI को आपकी मदद करने दें...",
        "thank-you-title": "धन्यवाद!",
        "thank-you-message": "हम वास्तव में आपके द्वारा हमारे सर्वेक्षण को पूरा करने के लिए समय निकालने की सराहना करते हैं। आपकी प्रतिक्रिया हमें अपनी सेवाओं को बेहतर बनाने में मदद करती है।",
        "powered-by": "द्वारा संचालित",
        "try-free": "इसे निःशुल्क आज़माएं",
        "powered-by-title": "360Pulse निरंतर प्रतिक्रिया सर्वेक्षण निःशुल्क आज़माएं",
        "testimonial-success": "आपके प्रशंसापत्र के लिए धन्यवाद!",
        "testimonial-success-message": "आपको जल्द ही समीक्षा विकल्पों पर पुनर्निर्देशित किया जाएगा।",
        "redirect-message": "पुनर्निर्देशित कर रहा है...",
        "title-promoter": "हम आपके समय की सराहना करते हैं!",
        "welcome-promoter": "हम वास्तव में आपके निरंतर समर्थन की सराहना करते हैं। हम आपके द्वारा साझा करने के लिए किसी भी अतिरिक्त विचारों का स्वागत करते हैं, क्योंकि आपकी निरंतर प्रतिक्रिया हमें बढ़ने में मदद करती है।",
        "feedback-placeholder-promoter": "हम आपके लिए चीजों को और भी बेहतर कैसे बना सकते हैं?",
        "title-passive": "अपने विचार साझा करें",
        "welcome-passive": "हमारे सर्वेक्षण को पूरा करने के लिए समय निकालने के लिए धन्यवाद। हम आपको जो पसंद आया उसके बारे में और चीजों को और भी बेहतर बनाने के लिए आपके पास कोई विचार है, उसके बारे में अधिक जानना चाहेंगे।",
        "feedback-placeholder-passive": "आपने क्या आनंद लिया, और हम आगे कैसे सुधार कर सकते हैं?",
        "title-detractor": "हमें सुधारने में मदद करें",
        "welcome-detractor": "हमारे सर्वेक्षण को पूरा करने के लिए समय निकालने के लिए धन्यवाद। हमें यह सुनकर खेद है कि चीजें आपकी अपेक्षाओं को पूरा नहीं कर सकीं। आपकी ईमानदार प्रतिक्रिया हमें सुधार के तरीके पहचानने में मदद करती है।",
        "feedback-placeholder-detractor": "कृपया हमें बताएं कि क्या गलत हुआ और हम कैसे बेहतर कर सकते हैं।",
        "page-title": "आपकी प्रतिक्रिया के लिए धन्यवाद",
        "meta-description": "हम आपके विचार साझा करने के लिए समय निकालने की सराहना करते हैं। आपकी अंतर्दृष्टि हमें सुधारने और सभी के लिए बेहतर अनुभव बनाने में मदद करती है।"
    },
    "bn": {
        "testimonial": "প্রশংসাপত্র",
        "submit-feedback": "প্রতিক্রিয়া জমা দিন",
        "reviews": "একটি পর্যালোচনা করুন",
        "testimonial-heading": "আপনার অভিজ্ঞতা শেয়ার করুন",
        "testimonial-subheading": "আপনার একটি সংক্ষিপ্ত প্রশংসাপত্র আমাদের জন্য অনেক মূল্যবান হবে!",
        "write-testimonial-heading": "আপনার প্রশংসাপত্র লিখুন",
        "ai-button-text": "AI কে আমার জন্য এটি লিখতে দিন",
        "consent-label": "আমি সম্মত যে আমার প্রশংসাপত্র বিপণন উপকরণে ব্যবহার করা যেতে পারে",
        "consent-info": "এই বাক্সটি চেক করে, আপনি সম্মত হন যে আমরা আপনার প্রশংসাপত্রের সমস্ত বা অংশগুলি আমাদের বিপণন উপকরণগুলিতে ব্যবহার করতে পারি। আপনার প্রশংসাপত্রটি আমাদের ওয়েবসাইট, সোশ্যাল মিডিয়া এবং অন্যান্য বিপণন চ্যানেলগুলিতে প্রদর্শিত হতে পারে। আমরা আপনার প্রতিক্রিয়ার सार বজায় রেখে স্পষ্টতার জন্য আপনার প্রশংসাপত্র সম্পাদনাও করতে পারি। এই সম্মতিতে আপনার নাম, পদবি, সংস্থা, প্রদত্ত ছবি এবং আপনার ওয়েবসাইটের লিঙ্ক ব্যবহার করার অনুমতি অন্তর্ভুক্ত রয়েছে, যখন প্রযোজ্য। আপনি আমাদের সাথে যোগাযোগ করে যে কোনও সময় আপনার প্রশংসাপত্রের ভবিষ্যতের ব্যবহার বন্ধ করার অনুরোধ করতে পারেন। দয়া করে মনে রাখবেন যে আমরা নতুন উপকরণগুলিতে আপনার প্রশংসাপত্রের ব্যবহার রোধ করতে পারলেও, আমরা এটি ইতিমধ্যে প্রকাশিত উপকরণগুলি যেমন মুদ্রিত সমান্তরাল, ভিডিও বা অতীতের সোশ্যাল মিডিয়া পোস্টগুলি থেকে সরাতে সক্ষম নাও হতে পারি।",
        "submit-testimonial": "জমা দিন এবং পর্যালোচনাগুলিতে চালিয়ে যান",
        "skip-testimonial": "এই ধাপটি এড়িয়ে যান",
        "review-heading": "একটি পর্যালোচনা করুন",
        "review-subheading": "আপনার অভিজ্ঞতা আপনার সহকর্মীদের সাহায্য করতে পারে, আপনি কি এটি একটি পর্যালোচনা হিসাবে ভাগ করবেন?",
        "rate-experience-heading": "আপনি আপনার অভিজ্ঞতা কিভাবে মূল্যায়ন করবেন?",
        "star-rating-info": "সমর্থিত প্ল্যাটফর্মগুলিতে প্রিফিল করার জন্য একটি রেটিং নির্বাচন করুন।",
        "write-review-heading": "আপনার পর্যালোচনা লিখুন",
        "review-copy-info": "এই পাঠ্যটি অনুলিপি করুন এবং আপনার নির্বাচিত পর্যালোচনা প্ল্যাটফর্মে পেস্ট করুন।",
        "copy-review": "ক্লিপবোর্ডে অনুলিপি করুন",
        "select-platform-heading": "আপনার পর্যালোচনা ভাগ করার জন্য একটি প্ল্যাটফর্ম নির্বাচন করুন",
        "review-textarea-placeholder": "এখানে আপনার পর্যালোচনা লিখুন বা AI কে আপনাকে সাহায্য করতে দিন...",
        "testimonial-textarea-placeholder": "এখানে আপনার প্রশংসাপত্র লিখুন বা AI কে আপনাকে সাহায্য করতে দিন...",
        "thank-you-title": "ধন্যবাদ!",
        "thank-you-message": "আমরা সত্যিই আপনাকে আমাদের জরিপ সম্পূর্ণ করার জন্য সময় নেওয়ার জন্য প্রশংসা করি। আপনার প্রতিক্রিয়া আমাদের পরিষেবাগুলি উন্নত করতে সাহায্য করে।",
        "powered-by": "দ্বারা পরিচালিত",
        "try-free": "বিনামূল্যে চেষ্টা করুন",
        "powered-by-title": "360Pulse ধারাবাহিক প্রতিক্রিয়া জরিপগুলি বিনামূল্যে চেষ্টা করুন",
        "testimonial-success": "আপনার প্রশংসাপত্রের জন্য ধন্যবাদ!",
        "testimonial-success-message": "আপনি শীঘ্রই পর্যালোচনা বিকল্পগুলিতে পুনঃনির্দেশিত হবেন।",
        "redirect-message": "পুনঃনির্দেশ করা হচ্ছে...",
        "title-promoter": "আমরা আপনার সময়কে মূল্য দিই!",
        "welcome-promoter": "আমরা সত্যিই আপনার চলমান সমর্থনের প্রশংসা করি। আমরা আপনার শেয়ার করতে চাওয়া যেকোনো অতিরিক্ত চিন্তাকে স্বাগত জানাই, কারণ আপনার চলমান প্রতিক্রিয়া আমাদের বাড়তে সাহায্য করে।",
        "feedback-placeholder-promoter": "আমরা কিভাবে আপনার জন্য জিনিসগুলি আরও ভালো করতে পারি?",
        "title-passive": "আপনার চিন্তা শেয়ার করুন",
        "welcome-passive": "আমাদের সমীক্ষা সম্পূর্ণ করার জন্য সময় নেওয়ার জন্য ধন্যবাদ। আপনি কী পছন্দ করেছেন এবং জিনিসগুলি আরও ভালো করার জন্য আপনার কোনো ধারণা আছে কিনা তা আমরা আরও জানতে চাই।",
        "feedback-placeholder-passive": "আপনি কি উপভোগ করেছেন, এবং আমরা কিভাবে আরও উন্নতি করতে পারি?",
        "title-detractor": "আমাদের উন্নতি করতে সাহায্য করুন",
        "welcome-detractor": "আমাদের সমীক্ষা সম্পূর্ণ করার জন্য সময় নেওয়ার জন্য ধন্যবাদ। জিনিসগুলি আপনার প্রত্যাশা পূরণ করেনি শুনে দুঃখিত। আপনার সৎ প্রতিক্রিয়া আমাদের উন্নতির উপায় চিহ্নিত করতে সাহায্য করে।",
        "feedback-placeholder-detractor": "অনুগ্রহ করে আমাদের বলুন কী ভুল হয়েছে এবং আমরা কিভাবে আরও ভালো করতে পারি।",
        "page-title": "আপনার প্রতিক্রিয়ার জন্য ধন্যবাদ",
        "meta-description": "আপনার চিন্তাভাবনা শেয়ার করার জন্য সময় নেওয়ার জন্য আমরা আপনাকে ধন্যবাদ জানাই। আপনার অন্তর্দৃষ্টি আমাদের উন্নতি করতে এবং সবার জন্য একটি আরও ভাল অভিজ্ঞতা তৈরি করতে সাহায্য করে।"
    },
    "id": {
        "testimonial": "Testimoni",
        "submit-feedback": "Kirim Umpan Balik",
        "reviews": "Tinggalkan Ulasan",
        "testimonial-heading": "Bagikan Pengalaman Anda",
        "testimonial-subheading": "Testimoni singkat dari Anda akan sangat berarti bagi kami!",
        "write-testimonial-heading": "Tulis Testimoni Anda",
        "ai-button-text": "Biarkan AI menulis ini untuk saya",
        "consent-label": "Saya setuju bahwa testimoni saya dapat digunakan dalam materi pemasaran",
        "consent-info": "Dengan mencentang kotak ini, Anda setuju bahwa kami dapat menggunakan semua atau sebagian dari testimoni Anda dalam materi pemasaran kami. Testimoni Anda mungkin muncul di situs web kami, media sosial, dan saluran pemasaran lainnya. Kami juga dapat mengedit testimoni Anda untuk kejelasan sambil mempertahankan inti dari umpan balik Anda. Persetujuan ini mencakup izin untuk menggunakan nama, jabatan, perusahaan, foto Anda jika disediakan, dan tautan ke situs web Anda jika berlaku. Anda dapat meminta untuk menghentikan penggunaan testimoni Anda di masa mendatang kapan saja dengan menghubungi kami. Harap dicatat bahwa meskipun kami dapat mencegah testimoni Anda digunakan dalam materi baru, kami mungkin tidak dapat menghapusnya dari materi yang sudah diterbitkan seperti jaminan cetak, video, atau posting media sosial sebelumnya.",
        "submit-testimonial": "Kirim & Lanjutkan ke Ulasan",
        "skip-testimonial": "Lewati langkah ini",
        "review-heading": "Tinggalkan Ulasan",
        "review-subheading": "Pengalaman Anda dapat membantu rekan-rekan Anda, maukah Anda membagikannya sebagai ulasan?",
        "rate-experience-heading": "Bagaimana Anda menilai pengalaman Anda?",
        "star-rating-info": "Pilih peringkat untuk mengisi otomatis di platform yang didukung.",
        "write-review-heading": "Tulis Ulasan Anda",
        "review-copy-info": "Salin teks ini untuk ditempelkan ke platform ulasan yang Anda pilih.",
        "copy-review": "Salin ke Papan Klip",
        "select-platform-heading": "Pilih Platform untuk Membagikan Ulasan Anda",
        "review-textarea-placeholder": "Tulis ulasan Anda di sini atau biarkan AI membantu Anda...",
        "testimonial-textarea-placeholder": "Tulis testimoni Anda di sini atau biarkan AI membantu Anda...",
        "thank-you-title": "Terima kasih!",
        "thank-you-message": "Kami sangat menghargai Anda telah meluangkan waktu untuk menyelesaikan survei kami. Umpan balik Anda membantu kami meningkatkan layanan kami.",
        "powered-by": "Didukung oleh",
        "try-free": "Coba gratis",
        "powered-by-title": "Coba Survei Umpan Balik Berkelanjutan 360Pulse secara Gratis",
        "testimonial-success": "Terima kasih atas testimoni Anda!",
        "testimonial-success-message": "Anda akan segera dialihkan ke opsi ulasan.",
        "redirect-message": "Mengalihkan...",
        "title-promoter": "Kami Menghargai Waktu Anda!",
        "welcome-promoter": "Kami sangat menghargai dukungan berkelanjutan Anda. Kami menyambut baik pemikiran tambahan yang ingin Anda bagikan, karena umpan balik berkelanjutan Anda membantu kami tumbuh.",
        "feedback-placeholder-promoter": "Bagaimana kami dapat membuat hal-hal menjadi lebih baik untuk Anda?",
        "title-passive": "Bagikan Pemikiran Anda",
        "welcome-passive": "Terima kasih telah meluangkan waktu untuk menyelesaikan survei kami. Kami ingin tahu lebih banyak tentang apa yang Anda sukai dan ide apa pun yang Anda miliki untuk membuat hal-hal menjadi lebih baik lagi.",
        "feedback-placeholder-passive": "Apa yang Anda nikmati, dan bagaimana kami dapat meningkatkan lebih lanjut?",
        "title-detractor": "Bantu Kami Meningkat",
        "welcome-detractor": "Terima kasih telah meluangkan waktu untuk menyelesaikan survei kami. Kami menyesal mendengar bahwa hal-hal tidak memenuhi harapan Anda. Umpan balik jujur Anda membantu kami mengidentifikasi cara untuk meningkat.",
        "feedback-placeholder-detractor": "Tolong beri tahu kami apa yang salah dan bagaimana kami dapat melakukannya dengan lebih baik.",
        "page-title": "Terima Kasih atas Umpan Balik Anda",
        "meta-description": "Kami menghargai Anda telah meluangkan waktu untuk berbagi pemikiran Anda. Wawasan Anda membantu kami meningkatkan dan menciptakan pengalaman yang lebih baik bagi semua orang."
    },
    "vi": {
        "testimonial": "Lời chứng thực",
        "submit-feedback": "Gửi Phản Hồi",
        "reviews": "Để lại Đánh giá",
        "testimonial-heading": "Chia sẻ Trải nghiệm của Bạn",
        "testimonial-subheading": "Một lời chứng thực ngắn gọn từ bạn sẽ có ý nghĩa rất lớn đối với chúng tôi!",
        "write-testimonial-heading": "Viết Lời chứng thực của Bạn",
        "ai-button-text": "Để AI viết cái này cho tôi",
        "consent-label": "Tôi đồng ý rằng lời chứng thực của tôi có thể được sử dụng trong các tài liệu tiếp thị",
        "consent-info": "Bằng cách chọn hộp này, bạn đồng ý rằng chúng tôi có thể sử dụng tất cả hoặc một phần lời chứng thực của bạn trong các tài liệu tiếp thị của chúng tôi. Lời chứng thực của bạn có thể xuất hiện trên trang web, phương tiện truyền thông xã hội và các kênh tiếp thị khác của chúng tôi. Chúng tôi cũng có thể chỉnh sửa lời chứng thực của bạn để rõ ràng hơn trong khi vẫn giữ nguyên bản chất phản hồi của bạn. Sự đồng ý này bao gồm sự cho phép sử dụng tên, chức danh, công ty, ảnh của bạn nếu được cung cấp và liên kết đến trang web của bạn khi thích hợp. Bạn có thể yêu cầu ngừng sử dụng lời chứng thực của bạn trong tương lai bất cứ lúc nào bằng cách liên hệ với chúng tôi. Xin lưu ý rằng mặc dù chúng tôi có thể ngăn lời chứng thực của bạn được sử dụng trong các tài liệu mới, chúng tôi có thể không xóa được lời chứng thực đó khỏi các tài liệu đã xuất bản như tài liệu in, video hoặc các bài đăng trên phương tiện truyền thông xã hội trước đây.",
        "submit-testimonial": "Gửi & Tiếp tục đến Đánh giá",
        "skip-testimonial": "Bỏ qua bước này",
        "review-heading": "Đánh giá",
        "review-subheading": "Trải nghiệm của bạn có thể giúp ích cho đồng nghiệp của bạn, bạn có muốn chia sẻ nó như một bài đánh giá không?",
        "rate-experience-heading": "Bạn đánh giá trải nghiệm của bạn như thế nào?",
        "star-rating-info": "Chọn xếp hạng để điền trước trên các nền tảng được hỗ trợ.",
        "write-review-heading": "Viết Đánh giá của Bạn",
        "review-copy-info": "Sao chép văn bản này để dán vào nền tảng đánh giá bạn đã chọn.",
        "copy-review": "Sao chép vào Clipboard",
        "select-platform-heading": "Chọn một Nền tảng để Chia sẻ Đánh giá của Bạn",
        "review-textarea-placeholder": "Viết đánh giá của bạn ở đây hoặc để AI giúp bạn...",
        "testimonial-textarea-placeholder": "Viết lời chứng thực của bạn ở đây hoặc để AI giúp bạn...",
        "thank-you-title": "Cảm ơn bạn!",
        "thank-you-message": "Chúng tôi thực sự đánh giá cao việc bạn đã dành thời gian để hoàn thành khảo sát của chúng tôi. Phản hồi của bạn giúp chúng tôi cải thiện dịch vụ của mình.",
        "powered-by": "Được cung cấp bởi",
        "try-free": "Dùng thử miễn phí",
        "powered-by-title": "Dùng thử Khảo sát Phản hồi Liên tục 360Pulse miễn phí",
        "testimonial-success": "Cảm ơn lời chứng thực của bạn!",
        "testimonial-success-message": "Bạn sẽ sớm được chuyển hướng đến các tùy chọn đánh giá.",
        "redirect-message": "Đang chuyển hướng...",
        "title-promoter": "Chúng tôi đánh giá cao thời gian của bạn!",
        "welcome-promoter": "Chúng tôi thực sự đánh giá cao sự hỗ trợ liên tục của bạn. Chúng tôi hoan nghênh bất kỳ suy nghĩ bổ sung nào bạn muốn chia sẻ, vì phản hồi liên tục của bạn giúp chúng tôi phát triển.",
        "feedback-placeholder-promoter": "Làm thế nào chúng tôi có thể làm mọi thứ tốt hơn cho bạn?",
        "title-passive": "Chia sẻ suy nghĩ của bạn",
        "welcome-passive": "Cảm ơn bạn đã dành thời gian hoàn thành khảo sát của chúng tôi. Chúng tôi muốn biết thêm về những gì bạn thích và bất kỳ ý tưởng nào bạn có để làm mọi thứ tốt hơn nữa.",
        "feedback-placeholder-passive": "Bạn thích điều gì, và làm thế nào chúng tôi có thể cải thiện hơn nữa?",
        "title-detractor": "Giúp chúng tôi cải thiện",
        "welcome-detractor": "Cảm ơn bạn đã dành thời gian hoàn thành khảo sát của chúng tôi. Chúng tôi rất tiếc khi nghe rằng mọi thứ không đáp ứng kỳ vọng của bạn. Phản hồi chân thành của bạn giúp chúng tôi xác định các cách để cải thiện.",
        "feedback-placeholder-detractor": "Vui lòng cho chúng tôi biết điều gì đã sai và chúng tôi có thể làm tốt hơn như thế nào.",
        "page-title": "Cảm ơn phản hồi của bạn",
        "meta-description": "Chúng tôi đánh giá cao việc bạn đã dành thời gian chia sẻ suy nghĩ của mình. Những hiểu biết sâu sắc của bạn giúp chúng tôi cải thiện và tạo ra trải nghiệm tốt hơn cho mọi người."
    },
    "tr": {
        "testimonial": "Referans",
        "submit-feedback": "Geri Bildirim Gönder",
        "reviews": "İnceleme Bırakın",
        "testimonial-heading": "Deneyiminizi Paylaşın",
        "testimonial-subheading": "Sizden kısa bir referans bizim için çok şey ifade eder!",
        "write-testimonial-heading": "Referansınızı Yazın",
        "ai-button-text": "Bunu benim için AI yazsın",
        "consent-label": "Referansımın pazarlama materyallerinde kullanılmasına izin veriyorum",
        "consent-info": "Bu kutuyu işaretleyerek, referansınızın tamamını veya bir kısmını pazarlama materyallerimizde kullanabileceğimizi kabul etmiş olursunuz. Referansınız web sitemizde, sosyal medyada ve diğer pazarlama kanallarında görünebilir. Ayrıca, geri bildiriminizin özünü korurken, netlik için referansınızı düzenleyebiliriz. Bu izin, adınızı, unvanınızı, şirketinizi, varsa fotoğrafınızı ve uygun olduğunda web sitenize bir bağlantı kullanma iznini içerir. Bizimle iletişime geçerek istediğiniz zaman referansınızın gelecekte kullanılmasını durdurmamızı talep edebilirsiniz. Referansınızın yeni materyallerde kullanılmasını engelleyebilsek de, basılı materyaller, videolar veya geçmiş sosyal medya gönderileri gibi yayınlanmış materyallerden kaldıramayabileceğimizi lütfen unutmayın.",
        "submit-testimonial": "Gönder & İncelemelere Devam Et",
        "skip-testimonial": "Bu adımı atla",
        "review-heading": "İnceleme Bırakın",
        "review-subheading": "Deneyiminiz meslektaşlarınıza yardımcı olabilir, bir inceleme olarak paylaşır mısınız?",
        "rate-experience-heading": "Deneyiminizi nasıl değerlendirirsiniz?",
        "star-rating-info": "Desteklenen platformlarda önceden doldurmak için bir derecelendirme seçin.",
        "write-review-heading": "İncelemenizi Yazın",
        "review-copy-info": "Bu metni kopyalayın ve seçtiğiniz inceleme platformuna yapıştırın.",
        "copy-review": "Panoya Kopyala",
        "select-platform-heading": "İncelemenizi Paylaşmak için bir Platform Seçin",
        "review-textarea-placeholder": "İncelemenizi buraya yazın veya AI'nın size yardımcı olmasına izin verin...",
        "testimonial-textarea-placeholder": "Referansınızı buraya yazın veya AI'nın size yardımcı olmasına izin verin...",
        "thank-you-title": "Teşekkürler!",
        "thank-you-message": "Anketimizi tamamlamak için zaman ayırdığınız için gerçekten teşekkür ederiz. Geri bildiriminiz hizmetlerimizi geliştirmemize yardımcı oluyor.",
        "powered-by": "Tarafından desteklenmektedir",
        "try-free": "Ücretsiz deneyin",
        "powered-by-title": "360Pulse Sürekli Geri Bildirim Anketlerini Ücretsiz Deneyin",
        "testimonial-success": "Referansınız için teşekkürler!",
        "testimonial-success-message": "Kısa süre içinde inceleme seçeneklerine yönlendirileceksiniz.",
        "redirect-message": "Yönlendiriliyor...",
        "title-promoter": "Zamanınıza değer veriyoruz!",
        "welcome-promoter": "Sürekli desteğinizi gerçekten takdir ediyoruz. Sürekli geri bildiriminiz büyümemize yardımcı olduğu için paylaşmak istediğiniz ek düşüncelerinizi memnuniyetle karşılıyoruz.",
        "feedback-placeholder-promoter": "Sizin için işleri nasıl daha iyi hale getirebiliriz?",
        "title-passive": "Düşüncelerinizi paylaşın",
        "welcome-passive": "Anketimizi tamamlamak için zaman ayırdığınız için teşekkür ederiz. Neyi beğendiğiniz ve işleri daha da iyi hale getirmek için herhangi bir fikriniz olup olmadığı hakkında daha fazla bilgi edinmek isteriz.",
        "feedback-placeholder-passive": "Nelerden hoşlandınız ve nasıl daha da geliştirebiliriz?",
        "title-detractor": "Gelişmemize yardımcı olun",
        "welcome-detractor": "Anketimizi tamamlamak için zaman ayırdığınız için teşekkür ederiz. İşlerin beklentilerinizi karşılamamasına üzüldük. Dürüst geri bildiriminiz, gelişme yollarını belirlememize yardımcı oluyor.",
        "feedback-placeholder-detractor": "Lütfen neyin yanlış gittiğini ve nasıl daha iyi yapabileceğimizi bize söyleyin.",
        "page-title": "Geri Bildiriminiz için Teşekkürler",
        "meta-description": "Düşüncelerinizi paylaşmak için zaman ayırdığınız için teşekkür ederiz. Görüşleriniz, gelişmemize ve herkes için daha iyi bir deneyim yaratmamıza yardımcı oluyor."
    },
    "pl": {
        "testimonial": "Referencje",
        "submit-feedback": "Prześlij Opinię",
        "reviews": "Zostaw recenzję",
        "testimonial-heading": "Podziel się swoim doświadczeniem",
        "testimonial-subheading": "Krótka referencja od Ciebie wiele by dla nas znaczyła!",
        "write-testimonial-heading": "Napisz swoje referencje",
        "ai-button-text": "Pozwól AI napisać to za mnie",
        "consent-label": "Zgadzam się, aby moje referencje mogły być wykorzystane w materiałach marketingowych",
        "consent-info": "Zaznaczając to pole, wyrażasz zgodę na wykorzystanie całości lub części Twoich referencji w naszych materiałach marketingowych. Twoje referencje mogą pojawić się na naszej stronie internetowej, w mediach społecznościowych i innych kanałach marketingowych. Możemy również edytować Twoje referencje dla zachowania przejrzystości, zachowując istotę Twojej opinii. Niniejsza zgoda obejmuje zgodę na wykorzystanie Twojego imienia i nazwiska, tytułu, firmy, zdjęcia, jeśli zostało dostarczone, oraz linku do Twojej strony internetowej, jeśli dotyczy. W każdej chwili możesz zażądać zaprzestania wykorzystywania Twoich referencji w przyszłości, kontaktując się z nami. Pamiętaj, że chociaż możemy uniemożliwić wykorzystanie Twoich referencji w nowych materiałach, możemy nie być w stanie usunąć ich z już opublikowanych materiałów, takich jak materiały drukowane, filmy lub wcześniejsze posty w mediach społecznościowych.",
        "submit-testimonial": "Prześlij i przejdź do recenzji",
        "skip-testimonial": "Pomiń ten krok",
        "review-heading": "Zostaw recenzję",
        "review-subheading": "Twoje doświadczenie może pomóc Twoim rówieśnikom, czy podzielisz się nim jako recenzja?",
        "rate-experience-heading": "Jak oceniasz swoje doświadczenie?",
        "star-rating-info": "Wybierz ocenę, aby wstępnie wypełnić na obsługiwanych platformach.",
        "write-review-heading": "Napisz swoją recenzję",
        "review-copy-info": "Skopiuj ten tekst, aby wkleić go na wybranej platformie recenzji.",
        "copy-review": "Skopiuj do schowka",
        "select-platform-heading": "Wybierz platformę, aby udostępnić swoją recenzję",
        "review-textarea-placeholder": "Napisz swoją recenzję tutaj lub pozwól AI pomóc Ci...",
        "testimonial-textarea-placeholder": "Napisz swoje referencje tutaj lub pozwól AI pomóc Ci...",
        "thank-you-title": "Dziękujemy!",
        "thank-you-message": "Naprawdę doceniamy, że poświęciłeś czas na wypełnienie naszej ankiety. Twoje opinie pomagają nam ulepszać nasze usługi.",
        "powered-by": "Obsługiwane przez",
        "try-free": "Wypróbuj za darmo",
        "powered-by-title": "Wypróbuj ankiety ciągłego feedbacku 360Pulse za darmo",
        "testimonial-success": "Dziękujemy za Twoją referencję!",
        "testimonial-success-message": "Wkrótce zostaniesz przekierowany do opcji recenzji.",
        "redirect-message": "Przekierowywanie...",
        "title-promoter": "Doceniamy Twój czas!",
        "welcome-promoter": "Naprawdę doceniamy Twoje ciągłe wsparcie. Chętnie przyjmiemy wszelkie dodatkowe przemyślenia, którymi chciałbyś się podzielić, ponieważ Twoja ciągła informacja zwrotna pomaga nam się rozwijać.",
        "feedback-placeholder-promoter": "Jak możemy uczynić rzeczy jeszcze lepszymi dla Ciebie?",
        "title-passive": "Podziel się swoimi myślami",
        "welcome-passive": "Dziękujemy za poświęcenie czasu na wypełnienie naszej ankiety. Chcielibyśmy dowiedzieć się więcej o tym, co Ci się podobało i jakie masz pomysły, aby rzeczy były jeszcze lepsze.",
        "feedback-placeholder-passive": "Co Ci się podobało i jak możemy jeszcze bardziej się poprawić?",
        "title-detractor": "Pomóż nam się poprawić",
        "welcome-detractor": "Dziękujemy za poświęcenie czasu na wypełnienie naszej ankiety. Przykro nam słyszeć, że rzeczy nie spełniły Twoich oczekiwań. Twoja szczera opinia pomaga nam zidentyfikować sposoby na poprawę.",
        "feedback-placeholder-detractor": "Proszę, powiedz nam, co poszło nie tak i jak możemy to zrobić lepiej.",
        "page-title": "Dziękujemy za Twoją opinię",
        "meta-description": "Doceniamy, że poświęciłeś czas na podzielenie się swoimi przemyśleniami. Twoje spostrzeżenia pomagają nam się doskonalić i tworzyć lepsze doświadczenia dla wszystkich."
    },
    "uk": {
        "testimonial": "Відгук",
        "submit-feedback": "Надіслати Відгук",
        "reviews": "Залишити відгук",
        "testimonial-heading": "Поділіться своїм досвідом",
        "testimonial-subheading": "Ваш короткий відгук буде дуже важливим для нас!",
        "write-testimonial-heading": "Напишіть свій відгук",
        "ai-button-text": "Нехай AI напише це за мене",
        "consent-label": "Я згоден з тим, що мій відгук може бути використаний у маркетингових матеріалах",
        "consent-info": "Встановлюючи цей прапорець, ви погоджуєтеся з тим, що ми можемо використовувати ваш відгук повністю або частково в наших маркетингових матеріалах. Ваш відгук може з’явитися на нашому веб-сайті, у соціальних мережах та інших маркетингових каналах. Ми також можемо відредагувати ваш відгук для ясності, зберігаючи при цьому суть вашого відгуку. Ця згода включає дозвіл на використання вашого імені, посади, компанії, фотографії, якщо вона надана, та посилання на ваш веб-сайт, якщо застосовно. Ви можете в будь-який час вимагати припинити використання вашого відгуку в майбутньому, зв’язавшись з нами. Зверніть увагу, що, хоча ми можемо запобігти використанню вашого відгуку в нових матеріалах, ми, можливо, не зможемо видалити його з уже опублікованих матеріалів, таких як друковані матеріали, відео чи минулі повідомлення в соціальних мережах.",
        "submit-testimonial": "Надіслати та перейти до відгуків",
        "skip-testimonial": "Пропустити цей крок",
        "review-heading": "Залишити відгук",
        "review-subheading": "Ваш досвід може допомогти вашим колегам, чи не могли б ви поділитися ним як відгук?",
        "rate-experience-heading": "Як би ви оцінили свій досвід?",
        "star-rating-info": "Виберіть оцінку для попереднього заповнення на підтримуваних платформах.",
        "write-review-heading": "Напишіть свій відгук",
        "review-copy-info": "Скопіюйте цей текст, щоб вставити його на вибрану вами платформу відгуків.",
        "copy-review": "Копіювати в буфер обміну",
        "select-platform-heading": "Виберіть платформу, щоб поділитися своїм відгуком",
        "review-textarea-placeholder": "Напишіть свій відгук тут або дозвольте ШІ допомогти вам...",
        "testimonial-textarea-placeholder": "Напишіть свій відгук тут або дозвольте ШІ допомогти вам...",
        "thank-you-title": "Дякуємо!",
        "thank-you-message": "Ми дійсно цінуємо, що ви знайшли час, щоб заповнити наше опитування. Ваш відгук допомагає нам покращувати наші послуги.",
        "powered-by": "Працює на",
        "try-free": "Спробуйте безкоштовно",
        "powered-by-title": "Спробуйте опитування безперервного зворотного зв'язку 360Pulse безкоштовно",
        "testimonial-success": "Дякуємо за ваш відгук!",
        "testimonial-success-message": "Вас скоро буде перенаправлено до опцій огляду.",
        "redirect-message": "Перенаправлення...",
        "title-promoter": "Ми цінуємо ваш час!",
        "welcome-promoter": "Ми дійсно цінуємо вашу постійну підтримку. Ми вітаємо будь-які додаткові думки, якими ви хотіли б поділитися, оскільки ваш постійний відгук допомагає нам рости.",
        "feedback-placeholder-promoter": "Як ми можемо зробити речі ще кращими для вас?",
        "title-passive": "Поділіться своїми думками",
        "welcome-passive": "Дякуємо, що знайшли час заповнити наше опитування. Ми хотіли б дізнатися більше про те, що вам сподобалося, та про будь-які ідеї, які у вас є, щоб зробити речі ще кращими.",
        "feedback-placeholder-passive": "Що вам сподобалося, і як ми можемо ще покращитися?",
        "title-detractor": "Допоможіть нам покращитися",
        "welcome-detractor": "Дякуємо, що знайшли час заповнити наше опитування. Нам шкода чути, що речі не відповідали вашим очікуванням. Ваш чесний відгук допомагає нам визначити шляхи для покращення.",
        "feedback-placeholder-detractor": "Будь ласка, розкажіть нам, що пішло не так і як ми можемо зробити краще.",
        "page-title": "Дякуємо за ваш відгук",
        "meta-description": "Ми цінуємо, що ви знайшли час поділитися своїми думками. Ваші ідеї допомагають нам вдосконалюватися та створювати кращий досвід для всіх."
    },
    "sv": {
        "testimonial": "Rekommendation",
        "submit-feedback": "Skicka Feedback",
        "reviews": "Lämna en recension",
        "testimonial-heading": "Dela din upplevelse",
        "testimonial-subheading": "En kort rekommendation från dig skulle betyda mycket för oss!",
        "write-testimonial-heading": "Skriv din rekommendation",
        "ai-button-text": "Låt AI skriva detta åt mig",
        "consent-label": "Jag samtycker till att min rekommendation får användas i marknadsföringsmaterial",
        "consent-info": "Genom att markera den här rutan samtycker du till att vi får använda hela eller delar av din rekommendation i vårt marknadsföringsmaterial. Din rekommendation kan visas på vår webbplats, sociala medier och andra marknadsföringskanaler. Vi kan också redigera din rekommendation för tydlighetens skull samtidigt som vi behåller kärnan i din feedback. Detta samtycke inkluderar tillstånd att använda ditt namn, titel, företag, foto om det tillhandahålls, och en länk till din webbplats när det är tillämpligt. Du kan när som helst begära att sluta använda din rekommendation i framtiden genom att kontakta oss. Observera att även om vi kan förhindra att din rekommendation används i nytt material, kanske vi inte kan ta bort den från redan publicerat material som tryckt material, videor eller tidigare inlägg på sociala medier.",
        "submit-testimonial": "Skicka & Fortsätt till recensioner",
        "skip-testimonial": "Hoppa över detta steg",
        "review-heading": "Lämna en recension",
        "review-subheading": "Din upplevelse kan hjälpa dina kollegor, skulle du vilja dela den som en recension?",
        "rate-experience-heading": "Hur skulle du betygsätta din upplevelse?",
        "star-rating-info": "Välj ett betyg för att fylla i på förhand på plattformar som stöds.",
        "write-review-heading": "Skriv din recension",
        "review-copy-info": "Kopiera den här texten för att klistra in i din valda recensionsplattform.",
        "copy-review": "Kopiera till Urklipp",
        "select-platform-heading": "Välj en plattform för att dela din recension",
        "review-textarea-placeholder": "Skriv din recension här eller låt AI hjälpa dig...",
        "testimonial-textarea-placeholder": "Skriv din rekommendation här eller låt AI hjälpa dig...",
        "thank-you-title": "Tack!",
        "thank-you-message": "Vi uppskattar verkligen att du tog dig tid att fylla i vår enkät. Din feedback hjälper oss att förbättra våra tjänster.",
        "powered-by": "Drivs av",
        "try-free": "Prova det gratis",
        "powered-by-title": "Prova 360Pulse kontinuerliga feedbackundersökningar gratis",
        "testimonial-success": "Tack för din rekommendation!",
        "testimonial-success-message": "Du kommer snart att omdirigeras till recensionsalternativen.",
        "redirect-message": "Omdirigerar...",
        "title-promoter": "Vi uppskattar din tid!",
        "welcome-promoter": "Vi uppskattar verkligen ditt fortsatta stöd. Vi välkomnar alla ytterligare tankar du vill dela med dig av, eftersom din fortsatta återkoppling hjälper oss att växa.",
        "feedback-placeholder-promoter": "Hur kan vi göra saker ännu bättre för dig?",
        "title-passive": "Dela dina tankar",
        "welcome-passive": "Tack för att du tog dig tid att fylla i vår enkät. Vi skulle vilja veta mer om vad du tyckte om och vilka idéer du har för att göra saker ännu bättre.",
        "feedback-placeholder-passive": "Vad gillade du och hur kan vi förbättra ytterligare?",
        "title-detractor": "Hjälp oss att förbättra",
        "welcome-detractor": "Tack för att du tog dig tid att fylla i vår enkät. Vi är ledsna att höra att saker inte mötte dina förväntningar. Din ärliga återkoppling hjälper oss att identifiera sätt att förbättra oss.",
        "feedback-placeholder-detractor": "Berätta gärna vad som gick fel och hur vi kan göra bättre.",
        "page-title": "Tack för din feedback",
        "meta-description": "Vi uppskattar att du tog dig tid att dela dina tankar. Dina insikter hjälper oss att förbättra och skapa en bättre upplevelse för alla."
    },
    "no": {
        "testimonial": "Anbefaling",
        "submit-feedback": "Send Tilbakemelding",
        "reviews": "Legg igjen en anmeldelse",
        "testimonial-heading": "Del din erfaring",
        "testimonial-subheading": "En kort anbefaling fra deg ville bety mye for oss!",
        "write-testimonial-heading": "Skriv din anbefaling",
        "ai-button-text": "La AI skrive dette for meg",
        "consent-label": "Jeg samtykker i at min anbefaling kan brukes i markedsføringsmateriell",
        "consent-info": "Ved å krysse av i denne boksen, samtykker du til at vi kan bruke hele eller deler av din anbefaling i vårt markedsføringsmateriell. Din anbefaling kan vises på nettstedet vårt, sosiale medier og andre markedsføringskanaler. Vi kan også redigere anbefalingen din for klarhetens skyld, samtidig som vi opprettholder essensen av tilbakemeldingen din. Dette samtykket inkluderer tillatelse til å bruke ditt navn, tittel, firma, bilde hvis det er gitt, og en lenke til nettstedet ditt når det er aktuelt. Du kan når som helst be om å stoppe fremtidig bruk av anbefalingen din ved å kontakte oss. Vær oppmerksom på at selv om vi kan forhindre at anbefalingen din blir brukt i nytt materiell, kan vi kanskje ikke fjerne den fra allerede publisert materiell som trykt materiale, videoer eller tidligere innlegg på sosiale medier.",
        "submit-testimonial": "Send inn og fortsett til anmeldelser",
        "skip-testimonial": "Hopp over dette trinnet",
        "review-heading": "Legg igjen en anmeldelse",
        "review-subheading": "Din erfaring kan hjelpe dine kolleger, vil du dele den som en anmeldelse?",
        "rate-experience-heading": "Hvordan vil du vurdere din erfaring?",
        "star-rating-info": "Velg en vurdering for å forhåndsutfylle på støttede plattformer.",
        "write-review-heading": "Skriv din anmeldelse",
        "review-copy-info": "Kopier denne teksten for å lime inn i din valgte anmeldelsesplattform.",
        "copy-review": "Kopier til utklippstavlen",
        "select-platform-heading": "Velg en plattform for å dele din anmeldelse",
        "review-textarea-placeholder": "Skriv anmeldelsen din her eller la AI hjelpe deg...",
        "testimonial-textarea-placeholder": "Skriv din anbefaling her eller la AI hjelpe deg...",
        "thank-you-title": "Takk!",
        "thank-you-message": "Vi setter virkelig pris på at du tok deg tid til å fullføre undersøkelsen vår. Tilbakemeldingene dine hjelper oss med å forbedre tjenestene våre.",
        "powered-by": "Drevet av",
        "try-free": "Prøv det gratis",
        "powered-by-title": "Prøv 360Pulse kontinuerlige tilbakemeldingsundersøkelser gratis",
        "testimonial-success": "Takk for din anbefaling!",
        "testimonial-success-message": "Du vil snart bli omdirigert til anmeldelsesalternativer.",
        "redirect-message": "Omdirigerer...",
        "title-promoter": "Vi setter pris på tiden din!",
        "welcome-promoter": "Vi setter virkelig pris på din kontinuerlige støtte. Vi ønsker velkommen alle ytterligere tanker du ønsker å dele, da din kontinuerlige tilbakemelding hjelper oss å vokse.",
        "feedback-placeholder-promoter": "Hvordan kan vi gjøre ting enda bedre for deg?",
        "title-passive": "Del tankene dine",
        "welcome-passive": "Takk for at du tok deg tid til å fullføre undersøkelsen vår. Vi vil gjerne vite mer om hva du likte og eventuelle ideer du har for å gjøre ting enda bedre.",
        "feedback-placeholder-passive": "Hva likte du, og hvordan kan vi forbedre oss ytterligere?",
        "title-detractor": "Hjelp oss å forbedre oss",
        "welcome-detractor": "Takk for at du tok deg tid til å fullføre undersøkelsen vår. Vi er lei for å høre at ting ikke møtte forventningene dine. Din ærlige tilbakemelding hjelper oss å identifisere måter å forbedre oss på.",
        "feedback-placeholder-detractor": "Vennligst fortell oss hva som gikk galt og hvordan vi kan gjøre det bedre.",
        "page-title": "Takk for tilbakemeldingen din",
        "meta-description": "Vi setter pris på at du tok deg tid til å dele tankene dine. Dine innspill hjelper oss å forbedre oss og skape en bedre opplevelse for alle."
    },
    "da": {
        "testimonial": "Anbefaling",
        "submit-feedback": "Send Feedback",
        "reviews": "Skriv en anmeldelse",
        "testimonial-heading": "Del din oplevelse",
        "testimonial-subheading": "En kort anbefaling fra dig ville betyde meget for os!",
        "write-testimonial-heading": "Skriv din anbefaling",
        "ai-button-text": "Lad AI skrive dette for mig",
        "consent-label": "Jeg accepterer, at min anbefaling må bruges i markedsføringsmateriale",
        "consent-info": "Ved at afkrydse dette felt accepterer du, at vi må bruge hele eller dele af din anbefaling i vores markedsføringsmateriale. Din anbefaling kan vises på vores hjemmeside, sociale medier og andre markedsføringskanaler. Vi kan også redigere din anbefaling for klarhedens skyld, mens vi bevarer essensen af din feedback. Dette samtykke omfatter tilladelse til at bruge dit navn, titel, firma, foto, hvis det er angivet, og et link til dit websted, når det er relevant. Du kan til enhver tid anmode om at stoppe fremtidig brug af din anbefaling ved at kontakte os. Bemærk, at selvom vi kan forhindre, at din anbefaling bliver brugt i nyt materiale, kan vi muligvis ikke fjerne den fra allerede offentliggjort materiale såsom trykt materiale, videoer eller tidligere opslag på sociale medier.",
        "submit-testimonial": "Indsend og fortsæt til anmeldelser",
        "skip-testimonial": "Spring dette trin over",
        "review-heading": "Skriv en anmeldelse",
        "review-subheading": "Din oplevelse kan hjælpe dine kolleger, vil du dele den som en anmeldelse?",
        "rate-experience-heading": "Hvordan vil du vurdere din oplevelse?",
        "star-rating-info": "Vælg en bedømmelse for at forudfylde på understøttede platforme.",
        "write-review-heading": "Skriv din anmeldelse",
        "review-copy-info": "Kopier denne tekst for at indsætte den i din valgte anmeldelsesplatform.",
        "copy-review": "Kopier til udklipsholder",
        "select-platform-heading": "Vælg en platform til at dele din anmeldelse",
        "review-textarea-placeholder": "Skriv din anmeldelse her eller lad AI hjælpe dig...",
        "testimonial-textarea-placeholder": "Skriv din anbefaling her eller lad AI hjælpe dig...",
        "thank-you-title": "Tak!",
        "thank-you-message": "Vi sætter virkelig pris på, at du tog dig tid til at udfylde vores undersøgelse. Din feedback hjælper os med at forbedre vores tjenester.",
        "powered-by": "Drevet af",
        "try-free": "Prøv det gratis",
        "powered-by-title": "Prøv 360Pulse kontinuerlige feedback-undersøgelser gratis",
        "testimonial-success": "Tak for din anbefaling!",
        "testimonial-success-message": "Du vil snart blive omdirigeret til anmeldelsesmuligheder.",
        "redirect-message": "Omdirigerer...",
        "title-promoter": "Vi sætter pris på din tid!",
        "welcome-promoter": "Vi sætter virkelig pris på din fortsatte støtte. Vi byder velkommen til eventuelle yderligere tanker, du gerne vil dele, da din fortsatte feedback hjælper os med at vokse.",
        "feedback-placeholder-promoter": "Hvordan kan vi gøre tingene endnu bedre for dig?",
        "title-passive": "Del dine tanker",
        "welcome-passive": "Tak fordi du tog dig tid til at udfylde vores undersøgelse. Vi vil gerne vide mere om, hvad du kunne lide, og eventuelle idéer du har til at gøre tingene endnu bedre.",
        "feedback-placeholder-passive": "Hvad nød du, og hvordan kan vi forbedre os yderligere?",
        "title-detractor": "Hjælp os med at forbedre os",
        "welcome-detractor": "Tak fordi du tog dig tid til at udfylde vores undersøgelse. Vi er kede af at høre, at tingene ikke levede op til dine forventninger. Din ærlige feedback hjælper os med at identificere måder at forbedre os på.",
        "feedback-placeholder-detractor": "Fortæl os venligst, hvad der gik galt, og hvordan vi kan gøre det bedre.",
        "page-title": "Tak for din feedback",
        "meta-description": "Vi sætter pris på, at du tog dig tid til at dele dine tanker. Dine indsigter hjælper os med at forbedre og skabe en bedre oplevelse for alle."
    },
    "fi": {
        "testimonial": "Suositus",
        "submit-feedback": "Lähetä Palaute",
        "reviews": "Jätä arvostelu",
        "testimonial-heading": "Jaa kokemuksesi",
        "testimonial-subheading": "Lyhyt suositus sinulta merkitsisi meille paljon!",
        "write-testimonial-heading": "Kirjoita suosituksesi",
        "ai-button-text": "Anna tekoälyn kirjoittaa tämä puolestani",
        "consent-label": "Hyväksyn, että suositustani voidaan käyttää markkinointimateriaaleissa",
        "consent-info": "Rastittamalla tämän ruudun hyväksyt, että voimme käyttää suositustasi kokonaan tai osittain markkinointimateriaaleissamme. Suosituksesi voi näkyä verkkosivustollamme, sosiaalisessa mediassa ja muissa markkinointikanavissa. Voimme myös muokata suositustasi selkeyden vuoksi säilyttäen samalla palautteesi ytimen. Tämä suostumus sisältää luvan käyttää nimeäsi, titteliäsi, yritystäsi, valokuvaasi, jos se on toimitettu, ja linkkiä verkkosivustollesi, kun se on sovellettavissa. Voit milloin tahansa pyytää lopettamaan suosituksesi käytön tulevaisuudessa ottamalla meihin yhteyttä. Huomaa, että vaikka voimme estää suosituksesi käytön uudessa materiaalissa, emme välttämättä pysty poistamaan sitä jo julkaistusta materiaalista, kuten painetusta materiaalista, videoista tai aiemmista sosiaalisen median julkaisuista.",
        "submit-testimonial": "Lähetä ja jatka arvosteluihin",
        "skip-testimonial": "Ohita tämä vaihe",
        "review-subheading": "Kokemuksesi voi auttaa kollegoitasi, haluaisitko jakaa sen arvosteluna?",
        "rate-experience-heading": "Miten arvioisit kokemuksesi?",
        "star-rating-info": "Valitse arvosana esitäytettäväksi tuetuilla alustoilla.",
        "write-review-heading": "Kirjoita arvostelusi",
        "review-copy-info": "Kopioi tämä teksti liittääksesi sen valitsemallesi arvostelualustalle.",
        "copy-review": "Kopioi leikepöydälle",
        "select-platform-heading": "Valitse alusta jakaaksesi arvostelusi",
        "review-textarea-placeholder": "Kirjoita arvostelusi tähän tai anna tekoälyn auttaa sinua...",
        "testimonial-textarea-placeholder": "Kirjoita suosituksesi tähän tai anna tekoälyn auttaa sinua...",
        "thank-you-title": "Kiitos!",
        "thank-you-message": "Arvostamme todella sitä, että käytit aikaa kyselymme täyttämiseen. Palautteesi auttaa meitä parantamaan palveluitamme.",
        "powered-by": "Palvelun tarjoaa",
        "try-free": "Kokeile ilmaiseksi",
        "powered-by-title": "Kokeile 360Pulse jatkuvan palautteen kyselyitä ilmaiseksi",
        "testimonial-success": "Kiitos suosituksestasi!",
        "testimonial-success-message": "Sinut ohjataan pian arvosteluvaihtoehtoihin.",
        "redirect-message": "Uudelleenohjataan...",
        "title-promoter": "Arvostamme aikaasi!",
        "welcome-promoter": "Arvostamme todella jatkuvaa tukeasi. Otamme mielellämme vastaan lisäajatuksia, joita haluat jakaa, sillä jatkuva palautteesi auttaa meitä kasvamaan.",
        "feedback-placeholder-promoter": "Miten voimme tehdä asioista vielä parempia sinulle?",
        "title-passive": "Jaa ajatuksesi",
        "welcome-passive": "Kiitos, että käytit aikaa kyselymme täyttämiseen. Haluaisimme tietää lisää siitä, mistä pidit ja mitä ideoita sinulla on asioiden parantamiseksi entisestään.",
        "feedback-placeholder-passive": "Mistä pidit ja miten voimme parantaa edelleen?",
        "title-detractor": "Auta meitä parantamaan",
        "welcome-detractor": "Kiitos, että käytit aikaa kyselymme täyttämiseen. Olemme pahoillamme kuullessamme, että asiat eivät vastanneet odotuksiasi. Rehellinen palautteesi auttaa meitä tunnistamaan parannuskeinoja.",
        "feedback-placeholder-detractor": "Kerro meille, mikä meni vikaan ja miten voimme tehdä paremmin.",
        "page-title": "Kiitos palautteestasi",
        "meta-description": "Arvostamme, että käytit aikaa ajatustesi jakamiseen. Näkemyksesi auttavat meitä parantamaan ja luomaan paremman kokemuksen kaikille."
    },
    "el": {
        "testimonial": "Μαρτυρία",
        "submit-feedback": "Υποβολή Σχολίων",
        "reviews": "Αφήστε μια κριτική",
        "testimonial-heading": "Μοιραστείτε την εμπειρία σας",
        "testimonial-subheading": "Μια σύντομη μαρτυρία από εσάς θα σήμαινε πολλά για εμάς!",
        "write-testimonial-heading": "Γράψτε τη μαρτυρία σας",
        "ai-button-text": "Αφήστε την τεχνητή νοημοσύνη να το γράψει αυτό για μένα",
        "consent-label": "Συμφωνώ ότι η μαρτυρία μου μπορεί να χρησιμοποιηθεί σε υλικό μάρκετινγκ",
        "consent-info": "Επιλέγοντας αυτό το πλαίσιο, συμφωνείτε ότι μπορούμε να χρησιμοποιήσουμε ολόκληρη ή μέρη της μαρτυρίας σας στο υλικό μάρκετινγκ μας. Η μαρτυρία σας μπορεί να εμφανιστεί στον ιστότοπό μας, στα μέσα κοινωνικής δικτύωσης και σε άλλα κανάλια μάρκετινγκ. Μπορούμε επίσης να επεξεργαστούμε τη μαρτυρία σας για λόγους σαφήνειας, διατηρώντας παράλληλα την ουσία των σχολίων σας. Αυτή η συγκατάθεση περιλαμβάνει την άδεια χρήσης του ονόματός σας, του τίτλου, της εταιρείας, της φωτογραφίας σας εάν παρέχεται και ενός συνδέσμου προς τον ιστότοπό σας, κατά περίπτωση. Μπορείτε να ζητήσετε να σταματήσει η μελλοντική χρήση της μαρτυρίας σας ανά πάσα στιγμή επικοινωνώντας μαζί μας. Λάβετε υπόψη ότι, ενώ μπορούμε να αποτρέψουμε τη χρήση της μαρτυρίας σας σε νέο υλικό, ενδέχεται να μην μπορούμε να την αφαιρέσουμε από ήδη δημοσιευμένο υλικό, όπως έντυπο υλικό, βίντεο ή προηγούμενες αναρτήσεις στα μέσα κοινωνικής δικτύωσης.",
        "submit-testimonial": "Υποβολή & Συνέχεια στις κριτικές",
        "skip-testimonial": "Παράλειψη αυτού του βήματος",
        "review-heading": "Αφήστε μια κριτική",
        "review-subheading": "Η εμπειρία σας μπορεί να βοηθήσει τους συναδέλφους σας, θα τη μοιραστείτε ως κριτική;",
        "rate-experience-heading": "Πώς θα βαθμολογούσατε την εμπειρία σας;",
        "star-rating-info": "Επιλέξτε μια βαθμολογία για προσυμπλήρωση σε υποστηριζόμενες πλατφόρμες.",
        "write-review-heading": "Γράψτε την κριτική σας",
        "review-copy-info": "Αντιγράψτε αυτό το κείμενο για να το επικολλήσετε στην επιλεγμένη πλατφόρμα κριτικής.",
        "copy-review": "Αντιγραφή στο πρόχειρο",
        "select-platform-heading": "Επιλέξτε μια πλατφόρμα για να μοιραστείτε την κριτική σας",
        "review-textarea-placeholder": "Γράψτε την κριτική σας εδώ ή αφήστε την τεχνητή νοημοσύνη να σας βοηθήσει...",
        "testimonial-textarea-placeholder": "Γράψτε τη μαρτυρία σας εδώ ή αφήστε την τεχνητή νοημοσύνη να σας βοηθήσει...",
        "thank-you-title": "Ευχαριστούμε!",
        "thank-you-message": "Εκτιμούμε πραγματικά το χρόνο που αφιερώσατε για να συμπληρώσετε την έρευνά μας. Τα σχόλιά σας μας βοηθούν να βελτιώσουμε τις υπηρεσίες μας.",
        "powered-by": "Με την υποστήριξη του",
        "try-free": "Δοκιμάστε το δωρεάν",
        "powered-by-title": "Δοκιμάστε τις έρευνες συνεχούς ανατροφοδότησης 360Pulse δωρεάν",
        "testimonial-success": "Ευχαριστούμε για τη μαρτυρία σας!",
        "testimonial-success-message": "Θα ανακατευθυνθείτε σύντομα στις επιλογές κριτικής.",
        "redirect-message": "Ανακατεύθυνση...",
        "title-promoter": "Εκτιμούμε το χρόνο σας!",
        "welcome-promoter": "Εκτιμούμε πραγματικά τη συνεχή υποστήριξή σας. Καλωσορίζουμε οποιεσδήποτε πρόσθετες σκέψεις που θα θέλατε να μοιραστείτε, καθώς η συνεχής ανατροφοδότησή σας μας βοηθά να αναπτυχθούμε.",
        "feedback-placeholder-promoter": "Πώς μπορούμε να κάνουμε τα πράγματα ακόμα καλύτερα για εσάς;",
        "title-passive": "Μοιραστείτε τις σκέψεις σας",
        "welcome-passive": "Σας ευχαριστούμε που αφιερώσατε χρόνο για να συμπληρώσετε την έρευνά μας. Θα θέλαμε να μάθουμε περισσότερα για το τι σας άρεσε και τυχόν ιδέες που έχετε για να κάνουμε τα πράγματα ακόμα καλύτερα.",
        "feedback-placeholder-passive": "Τι απολαύσατε και πώς μπορούμε να βελτιωθούμε περαιτέρω;",
        "title-detractor": "Βοηθήστε μας να βελτιωθούμε",
        "welcome-detractor": "Σας ευχαριστούμε που αφιερώσατε χρόνο για να συμπληρώσετε την έρευνά μας. Λυπούμαστε που ακούμε ότι τα πράγματα δεν ανταποκρίθηκαν στις προσδοκίες σας. Η ειλικρινής ανατροφοδότησή σας μας βοηθά να εντοπίσουμε τρόπους βελτίωσης.",
        "feedback-placeholder-detractor": "Παρακαλούμε πείτε μας τι πήγε στραβά και πώς μπορούμε να το κάνουμε καλύτερα.",
        "page-title": "Ευχαριστούμε για τα σχόλιά σας",
        "meta-description": "Εκτιμούμε το χρόνο που αφιερώσατε για να μοιραστείτε τις σκέψεις σας. Οι ιδέες σας μας βοηθούν να βελτιωθούμε και να δημιουργήσουμε μια καλύτερη εμπειρία για όλους."
    },
    "he": {
        "testimonial": "המלצה",
        "submit-feedback": "שלח משוב",
        "reviews": "השאירו ביקורת",
        "testimonial-heading": "שתפו את החוויה שלכם",
        "testimonial-subheading": "המלצה קצרה ממך תהיה חשובה לנו מאוד!",
        "write-testimonial-heading": "כתבו את ההמלצה שלכם",
        "ai-button-text": "תנו לבינה מלאכותית לכתוב את זה בשבילי",
        "consent-label": "אני מסכים/ה לכך שההמלצה שלי תשמש בחומרי שיווק",
        "consent-info": "בסימון תיבה זו, את/ה מסכים/ה לכך שנוכל להשתמש בכל ההמלצה שלך או בחלקים ממנה בחומרי השיווק שלנו. ההמלצה שלך עשויה להופיע באתר האינטרנט שלנו, במדיה החברתית ובערוצי שיווק אחרים. אנו עשויים גם לערוך את ההמלצה שלך למען הבהירות תוך שמירה על מהות המשוב שלך. הסכמה זו כוללת הרשאה להשתמש בשמך, בתוארך, בחברתך, בתמונתך אם סופקה, ובקישור לאתר האינטרנט שלך, במידת הצורך. את/ה רשאי/ת לבקש להפסיק את השימוש העתידי בהמלצה שלך בכל עת על ידי יצירת קשר עמנו. שימו לב כי בעוד שנוכל למנוע שימוש בהמלצה שלכם בחומרים חדשים, ייתכן שלא נוכל להסיר אותה מחומרים שכבר פורסמו כגון חומר מודפס, סרטונים או פוסטים קודמים במדיה החברתית.",
        "submit-testimonial": "שלח והמשך לביקורות",
        "skip-testimonial": "דלג על שלב זה",
        "review-heading": "השאירו ביקורת",
        "review-subheading": "החוויה שלך יכולה לעזור לעמיתים שלך, האם תשתף אותה כביקורת?",
        "rate-experience-heading": "איך היית מדרג/ת את החוויה שלך?",
        "star-rating-info": "בחרו דירוג למילוי מראש בפלטפורמות נתמכות.",
        "write-review-heading": "כתבו את הביקורת שלכם",
        "review-copy-info": "העתיקו טקסט זה כדי להדביק בפלטפורמת הביקורת שבחרתם.",
        "copy-review": "העתק ללוח",
        "select-platform-heading": "בחרו פלטפורמה כדי לשתף את הביקורת שלכם",
        "review-textarea-placeholder": "כתבו את הביקורת שלכם כאן או תנו ל-AI לעזור לכם...",
        "testimonial-textarea-placeholder": "כתבו את ההמלצה שלכם כאן או תנו ל-AI לעזור לכם...",
        "thank-you-title": "תודה!",
        "thank-you-message": "אנו מעריכים מאוד שהקדשתם זמן להשלים את הסקר שלנו. המשוב שלכם עוזר לנו לשפר את השירותים שלנו.",
        "powered-by": "מופעל על ידי",
        "try-free": "נסו בחינם",
        "powered-by-title": "נסו סקרי משוב מתמשכים של 360Pulse בחינם",
        "testimonial-success": "תודה על ההמלצה שלך!",
        "testimonial-success-message": "תופנה בקרוב לאפשרויות ביקורת.",
        "redirect-message": "מפנה...",
        "title-promoter": "אנו מעריכים את זמנך!",
        "welcome-promoter": "אנו באמת מעריכים את התמיכה המתמשכת שלך. אנו מקבלים בברכה כל מחשבות נוספות שתרצה לשתף, שכן המשוב המתמשך שלך עוזר לנו לצמוח.",
        "feedback-placeholder-promoter": "איך אנחנו יכולים לעשות דברים אפילו טובים יותר עבורך?",
        "title-passive": "שתף את מחשבותיך",
        "welcome-passive": "תודה שהקדשת זמן למילוי הסקר שלנו. נשמח לדעת עוד על מה שאהבת ועל כל רעיון שיש לך כדי לשפר את הדברים עוד יותר.",
        "feedback-placeholder-passive": "ממה נהנית, ואיך אנחנו יכולים לשפר עוד יותר?",
        "title-detractor": "עזור לנו להשתפר",
        "welcome-detractor": "תודה שהקדשת זמן למילוי הסקר שלנו. אנו מצטערים לשמוע שהדברים לא עמדו בציפיות שלך. המשוב הכן שלך עוזר לנו לזהות דרכים לשיפור.",
        "feedback-placeholder-detractor": "אנא ספר לנו מה השתבש ואיך אנחנו יכולים לעשות זאת טוב יותר.",
        "page-title": "תודה על המשוב שלך",
        "meta-description": "אנו מעריכים שהקדשת זמן לשתף את מחשבותיך. התובנות שלך עוזרות לנו להשתפר וליצור חוויה טובה יותר לכולם."
    },
    "fil": {
        "testimonial": "Testimonial",
        "submit-feedback": "Isumite ang Feedback",
        "reviews": "Mag-iwan ng Review",
        "testimonial-heading": "Ibahagi ang Iyong Karanasan",
        "testimonial-subheading": "Ang isang mabilis na testimonial mula sa iyo ay malaking bagay para sa amin!",
        "write-testimonial-heading": "Isulat ang Iyong Testimonial",
        "ai-button-text": "Hayaan ang AI na isulat ito para sa akin",
        "consent-label": "Sumasang-ayon ako na ang aking testimonial ay maaaring gamitin sa mga materyales sa marketing",
        "consent-info": "Sa pamamagitan ng pag-check sa kahon na ito, sumasang-ayon ka na maaari naming gamitin ang lahat o bahagi ng iyong testimonial sa aming mga materyales sa marketing. Ang iyong testimonial ay maaaring lumabas sa aming website, social media, at iba pang mga channel sa marketing. Maaari rin naming i-edit ang iyong testimonial para sa kalinawan habang pinapanatili ang diwa ng iyong feedback. Kasama sa pahintulot na ito ang pahintulot na gamitin ang iyong pangalan, titulo, kumpanya, larawan kung ibinigay, at isang link sa iyong website kung naaangkop. Maaari kang humiling na ihinto ang paggamit ng iyong testimonial sa hinaharap anumang oras sa pamamagitan ng pakikipag-ugnayan sa amin. Mangyaring tandaan na habang mapipigilan namin ang iyong testimonial na magamit sa mga bagong materyales, maaaring hindi namin ito maalis mula sa mga nailathala nang materyales tulad ng mga nakalimbag na collateral, video, o mga nakaraang post sa social media.",
        "submit-testimonial": "Isumite at Magpatuloy sa Mga Review",
        "skip-testimonial": "Laktawan ang hakbang na ito",
        "review-heading": "Mag-iwan ng Review",
        "review-subheading": "Ang iyong karanasan ay maaaring makatulong sa iyong mga kasamahan, ibabahagi mo ba ito bilang isang review?",
        "rate-experience-heading": "Paano mo ire-rate ang iyong karanasan?",
        "star-rating-info": "Pumili ng rating upang i-prefill sa mga suportadong platform.",
        "write-review-heading": "Isulat ang Iyong Review",
        "review-copy-info": "Kopyahin ang tekstong ito upang i-paste sa iyong napiling platform ng pagsusuri.",
        "copy-review": "Kopyahin sa Clipboard",
        "select-platform-heading": "Pumili ng Platform upang Ibahagi ang Iyong Review",
        "review-textarea-placeholder": "Isulat ang iyong review dito o hayaan ang AI na tumulong sa iyo...",
        "testimonial-textarea-placeholder": "Isulat ang iyong testimonial dito o hayaan ang AI na tumulong sa iyo...",
        "thank-you-title": "Salamat!",
        "thank-you-message": "Talagang pinahahalagahan namin na naglaan ka ng oras para kumpletuhin ang aming survey. Ang iyong feedback ay tumutulong sa amin na mapabuti ang aming mga serbisyo.",
        "powered-by": "Pinalakas ng",
        "try-free": "Subukan ito nang Libre",
        "powered-by-title": "Subukan ang 360Pulse Continuous Feedback Surveys nang Libre",
        "testimonial-success": "Salamat sa iyong testimonial!",
        "testimonial-success-message": "Malapit ka nang i-redirect sa mga opsyon ng pagsusuri.",
        "redirect-message": "Nagre-redirect...",
        "title-promoter": "Pinahahalagahan Namin ang Iyong Oras!",
        "welcome-promoter": "Tunay na pinahahalagahan namin ang iyong patuloy na suporta. Malugod naming tinatanggap ang anumang karagdagang pag-iisip na nais mong ibahagi, dahil ang iyong patuloy na feedback ay tumutulong sa amin na lumago.",
        "feedback-placeholder-promoter": "Paano namin maaaring gawing mas maganda pa ang mga bagay para sa iyo?",
        "title-passive": "Ibahagi ang Iyong mga Saloobin",
        "welcome-passive": "Salamat sa paglaan ng oras para kumpletuhin ang aming survey. Gusto naming malaman ang mas marami tungkol sa kung ano ang nagustuhan mo at anumang ideya na mayroon ka para gawing mas mabuti pa ang mga bagay.",
        "feedback-placeholder-passive": "Ano ang iyong kinagalakan, at paano pa kami mapapahusay?",
        "title-detractor": "Tulungan Kaming Mapabuti",
        "welcome-detractor": "Salamat sa paglaan ng oras para kumpletuhin ang aming survey. Ikinalulungkot naming malaman na ang mga bagay ay hindi nakatugon sa iyong mga inaasahan. Ang iyong tapat na feedback ay tumutulong sa amin na matukoy ang mga paraan upang mapabuti.",
        "feedback-placeholder-detractor": "Mangyaring sabihin sa amin kung ano ang nagkamali at kung paano namin ito maaaring gawin nang mas mahusay.",
        "page-title": "Salamat sa Iyong Feedback",
        "meta-description": "Pinahahalagahan namin na naglaan ka ng oras para ibahagi ang iyong mga saloobin. Ang iyong mga pananaw ay tumutulong sa amin na bumuti at lumikha ng mas mahusay na karanasan para sa lahat."
    },
    "yue": {
        "testimonial": "推薦",
        "submit-feedback": "提交反饋",
        "reviews": "留下評論",
        "testimonial-heading": "分享您的體驗",
        "testimonial-subheading": "您嘅簡短推薦對我哋嚟講意義重大！",
        "write-testimonial-heading": "撰寫您的推薦",
        "ai-button-text": "讓AI為我寫",
        "consent-label": "我同意我嘅推薦可以用喺營銷材料中",
        "consent-info": "勾選此框，即表示您同意我哋可以喺營銷材料中使用您嘅全部或部分推薦。您嘅推薦可能會出現喺我哋嘅網站、社交媒體同埋其他營銷渠道。我哋可能會編輯您嘅推薦以提高清晰度，同時保持您反饋嘅本質。此同意包括允許使用您嘅姓名、職稱、公司、提供嘅照片（如有），以及喺適用情況下鏈接到您嘅網站。您可以隨時聯繫我哋，要求停止將來使用您嘅推薦。請注意，雖然我哋可以防止您嘅推薦喺新材料中使用，但我哋可能無法將其從已發布嘅材料中刪除，如印刷品、視頻或過去嘅社交媒體帖子。",
        "submit-testimonial": "提交並繼續到評論",
        "skip-testimonial": "跳過此步驟",
        "review-heading": "留下評論",
        "review-subheading": "您嘅體驗可以幫助您嘅同行，您願意將其作為評論分享嗎？",
        "rate-experience-heading": "您會如何評價您嘅體驗？",
        "star-rating-info": "選擇評分以喺支持嘅平台上預填。",
        "write-review-heading": "撰寫您的評論",
        "review-copy-info": "複製此文本以粘貼到您選擇嘅評論平台。",
        "copy-review": "複製到剪貼板",
        "select-platform-heading": "選擇一個平台分享您嘅評論",
        "review-textarea-placeholder": "喺呢度寫低你嘅評論或者畀AI幫你...",
        "testimonial-textarea-placeholder": "喺呢度寫低你嘅推薦或者畀AI幫你...",
        "thank-you-title": "多謝！",
        "thank-you-message": "我哋真心感謝你抽出時間完成我哋嘅調查。你嘅反饋幫助我哋改進服務。",
        "powered-by": "由提供",
        "try-free": "免費試用",
        "powered-by-title": "免費試用 360Pulse 持續反饋調查",
        "testimonial-success": "多謝你嘅推薦!",
        "testimonial-success-message": "你好快會被重定向到評論選項。",
        "redirect-message": "重定向緊...",
        "title-promoter": "我哋好感激你抽出時間!",
        "welcome-promoter": "我哋真心感謝你嘅持續支持。我哋歡迎你分享任何其他諗法，因為你嘅持續反饋幫助我哋成長。",
        "feedback-placeholder-promoter": "我哋點樣可以為你做得更好?",
        "title-passive": "分享你嘅諗法",
        "welcome-passive": "多謝你抽出時間完成我哋嘅調查。我哋想知道更多關於你鍾意嘅嘢，同埋你有咩建議可以令到嘢變得更好。",
        "feedback-placeholder-passive": "你享受咗乜嘢，我哋可以點樣進一步改進?",
        "title-detractor": "幫助我哋改進",
        "welcome-detractor": "多謝你抽出時間完成我哋嘅調查。我哋好遺憾聽到呢啲嘢冇達到你嘅期望。你嘅真誠反饋幫助我哋找出改進嘅方法。",
        "feedback-placeholder-detractor": "請告訴我哋咩出咗問題，我哋可以點樣做得更好。",
        "page-title": "多謝你嘅反饋",
        "meta-description": "多謝你抽出時間分享你嘅諗法。你嘅見解幫助我哋改進並為所有人創造更好嘅體驗。"
    }
};


/* ======================
   Language Dropdown & Page Translation Logic
   ====================== */
document.addEventListener('DOMContentLoaded', function() {
    var selectedLanguageDiv = document.getElementById('selectedLanguage');
    var dropdown = document.querySelector('.pulsecheck-language-dropdown');
    var closedDiv = document.querySelector('.pulsecheck-language-dropdown-closed');
    var openDiv = document.querySelector('.pulsecheck-language-dropdown-open');

    // Update language on tab clicks if needed.
    var tabButtons = document.querySelectorAll('.tab-button');
    if (tabButtons.length > 0) {
        tabButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                setTimeout(updatePageLanguage, 100);
            });
        });
    }

    var urlParams = new URLSearchParams(window.location.search);
    var urlLang = urlParams.get('language');
    var selectedLangCode;
    if (urlLang && languageNames[urlLang]) {
        selectedLangCode = urlLang;
    } else {
        var browserLangFull = navigator.language || navigator.userLanguage || 'en';
        selectedLangCode = browserLangFull.toLowerCase().split('-')[0];
        if (!languageNames[selectedLangCode]) {
            selectedLangCode = 'en';
        }
    }
    window.pulseCheckLanguage.code = selectedLangCode;

    function updateUrlParameter(language) {
        var newUrl = new URL(window.location.href);
        newUrl.searchParams.set('language', language);
        window.history.replaceState({}, '', newUrl);
    }
    function updateDropdownDisplay() {
        if (selectedLanguageDiv) {
            selectedLanguageDiv.innerText = languageNames[selectedLangCode];
        }
    }
    function renderDropdownOptions() {
        if (!openDiv) return;
        openDiv.innerHTML = '';
        languageCodes.forEach(function(langCode) {
            var optionDiv = document.createElement('div');
            optionDiv.className = 'pulsecheck-language-dropdown-option';
            optionDiv.dataset.langCode = langCode;
            optionDiv.setAttribute('role', 'option');
            optionDiv.setAttribute('aria-selected', langCode === selectedLangCode ? 'true' : 'false');
            optionDiv.innerHTML = '<div>' + languageNames[langCode] + '</div>';
            openDiv.appendChild(optionDiv);
        });
    }
    function updatePageLanguage() {
        var trans = translations[selectedLangCode] || translations["en"];
        try {
            if (trans["page-title"]) {
                document.title = trans["page-title"];
            }
            if (trans["meta-description"]) {
                var metaDescription = document.querySelector('meta[name="description"]');
                if (metaDescription) {
                    metaDescription.setAttribute('content', trans["meta-description"]);
                } else {
                    metaDescription = document.createElement('meta');
                    metaDescription.setAttribute('name', 'description');
                    metaDescription.setAttribute('content', trans["meta-description"]);
                    document.head.appendChild(metaDescription);
                }
            }
            document.documentElement.setAttribute('lang', selectedLangCode);
        } catch (error) { }

        function updateElementText(selector, translationKey, defaultText) {
            var element = document.getElementById(selector);
            if (element) {
                element.textContent = trans[translationKey] || defaultText;
            }
        }
        function updateElementsBySelector(selector, translationKey, defaultText) {
            document.querySelectorAll(selector).forEach(function(el) {
                el.textContent = trans[translationKey] || defaultText;
            });
        }
        updateElementsBySelector('.tab-button[data-tab="testimonial"] .tab-label span', "testimonial", "Testimonial");
        updateElementsBySelector('.tab-button[data-tab="reviews"] .tab-label span', "reviews", "Leave a Review");
        updateElementText('testimonial-heading', "testimonial-heading", "Share Your Experience");
        updateElementText('testimonial-subheading', "testimonial-subheading", "A quick testimonial from you would mean the world to us!");
        updateElementText('write-testimonial-heading', "write-testimonial-heading", "Write Your Testimonial");
        updateElementsBySelector('.ai-button-text', "ai-button-text", "Let AI write this for me");
        updateElementsBySelector('.consent-label', "consent-label", "I agree that my testimonial may be used in marketing materials");
        var consentInfoIcon = document.getElementById('consent-info-icon');
        if (consentInfoIcon) {
            consentInfoIcon.setAttribute('data-tippy-content', trans["consent-info"] || "");
        }
        updateElementText('submit-testimonial', "submit-testimonial", "Submit & Continue to Reviews");
        updateElementText('skip-testimonial', "skip-testimonial", "Skip this step");
        updateElementText('review-heading', "review-heading", "Leave a Review");
        updateElementText('review-subheading', "review-subheading", "Your experience can help your peers, would you share it as a review?");
        updateElementText('rate-experience-heading', "rate-experience-heading", "How would you rate your experience?");
        updateElementText('write-review-heading', "write-review-heading", "Write Your Review");
        var starRatingInfo = document.getElementById('star-rating-info');
        if (starRatingInfo) {
            var infoSpan = starRatingInfo.querySelector('span');
            if (infoSpan) {
                infoSpan.textContent = trans["star-rating-info"] || "Select a rating to prefill on supported platforms.";
            }
        }
        var reviewCopyInfo = document.getElementById('review-copy-info');
        if (reviewCopyInfo) {
            var infoSpan = reviewCopyInfo.querySelector('span');
            if (infoSpan) {
                infoSpan.textContent = trans["review-copy-info"] || "Copy this text to paste into your selected review platform.";
            }
        }
        var copyButton = document.getElementById('copy-review');
        if (copyButton) {
            var buttonSpan = copyButton.querySelector('span');
            if (buttonSpan) {
                buttonSpan.textContent = trans["copy-review"] || "Copy to Clipboard";
            }
        }
        updateElementText('select-platform-heading', "select-platform-heading", "Select a Platform to Share Your Review");
        function updatePlaceholder(id, key, defaultText) {
            var element = document.getElementById(id);
            if (element && typeof element.setAttribute === 'function') {
                element.setAttribute('placeholder', trans[key] || defaultText);
            }
        }
        updatePlaceholder('testimonial-text', "testimonial-textarea-placeholder", "Write your testimonial here or let AI help you...");
        updatePlaceholder('review-text', "review-textarea-placeholder", "Write your review here or let AI help you...");
        updateElementText('title', "thank-you-title", "Thank you!");
        updateElementText('welcome', "thank-you-message", "We truly appreciate you taking the time to complete our survey. Your feedback helps us improve our services.");
        updateElementText('powered-by', "powered-by", "Powered by");
        updateElementText('try-free', "try-free", "Try it for Free");
        var poweredByBadge = document.getElementById('powered-by-badge');
        if (poweredByBadge) {
            poweredByBadge.setAttribute('title', trans["powered-by-title"] || "Powered by 360Pulse");
        }
        updateElementText('testimonial-success', "testimonial-success", "Thanks for your testimonial!");
        updateElementText('testimonial-success-message', "testimonial-success-message", "You'll be redirected to review options shortly.");
        updateElementText('redirect-message', "redirect-message", "Redirecting...");
        updateElementText('title-promoter', "title-promoter", "We Appreciate Your Time!");
        updateElementText('welcome-promoter', "welcome-promoter", "We truly appreciate your ongoing support. We welcome any additional thoughts you'd like to share, as your continued feedback helps us grow.");
        updatePlaceholder('feedback-placeholder-promoter', "feedback-placeholder-promoter", "How can we make things even better for you?");
        updateElementText('title-passive', "title-passive", "Share Your Thoughts");
        updateElementText('welcome-passive', "welcome-passive", "Thank you for taking the time to complete our survey. We'd love to know more about what you liked and any ideas you have for making things even better.");
        updatePlaceholder('feedback-placeholder-passive', "feedback-placeholder-passive", "What did you enjoy, and how can we improve further?");
        updateElementText('title-detractor', "title-detractor", "Help Us Improve");
        updateElementText('welcome-detractor', "welcome-detractor", "Thank you for taking the time to complete our survey. We're sorry to hear things didn't meet your expectations. Your honest feedback helps us identify ways to improve.");
        updatePlaceholder('feedback-placeholder-detractor', "feedback-placeholder-detractor", "Please tell us what went wrong and how we can do better.");
        var submitFeedbackButtons = document.querySelectorAll('[data-type="submit-feedback"]');
        var submitFeedbackText = trans["submit-feedback"] || "Submit Feedback";
        submitFeedbackButtons.forEach(function(button) {
            var buttonSpan = button.querySelector('span');
            if (buttonSpan) {
                buttonSpan.textContent = submitFeedbackText;
            } else if (button.childElementCount > 0) {
                var textNodes = Array.from(button.childNodes).filter(function(node) {
                    return node.nodeType === 3;
                });
                if (textNodes.length > 0) {
                    textNodes[0].nodeValue = submitFeedbackText;
                } else {
                    var textNode = document.createTextNode(submitFeedbackText);
                    button.insertBefore(textNode, button.firstChild);
                }
            } else {
                button.textContent = submitFeedbackText;
            }
        });
    }

    updateDropdownDisplay();
    renderDropdownOptions();
    updatePageLanguage();
    setTimeout(updatePageLanguage, 500);

    if (dropdown) {
        dropdown.setAttribute('role', 'combobox');
        dropdown.setAttribute('aria-haspopup', 'listbox');
        dropdown.setAttribute('aria-expanded', 'false');
    }
    if (openDiv) {
        openDiv.setAttribute('role', 'listbox');
        openDiv.setAttribute('aria-label', 'Language options');
    }
    if (closedDiv) {
        closedDiv.addEventListener('click', function(e) {
            e.stopPropagation();
            var isExpanded = openDiv.style.display === 'block';
            openDiv.style.display = isExpanded ? 'none' : 'block';
            dropdown.setAttribute('aria-expanded', !isExpanded);
        });
    }
    if (openDiv) {
        openDiv.addEventListener('click', function(e) {
            var target = e.target.closest('.pulsecheck-language-dropdown-option');
            if (target) {
                e.stopPropagation();
                selectedLangCode = target.dataset.langCode;
                window.pulseCheckLanguage.code = selectedLangCode;
                updateUrlParameter(selectedLangCode);
                updateDropdownDisplay();
                updatePageLanguage();
                openDiv.querySelectorAll('[role="option"]').forEach(function(option) {
                    option.setAttribute('aria-selected', option.dataset.langCode === selectedLangCode ? 'true' : 'false');
                });
                openDiv.style.display = 'none';
                dropdown.setAttribute('aria-expanded', 'false');
            }
        });
    }
    document.addEventListener('click', function(e) {
        if (dropdown && !dropdown.contains(e.target) && openDiv.style.display === 'block') {
            openDiv.style.display = 'none';
            dropdown.setAttribute('aria-expanded', 'false');
        }
    });
    try {
        var observer = new MutationObserver(function(mutations) {
            var shouldUpdate = false;
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.nodeType === 1) {
                            if ((node.hasAttribute && node.hasAttribute('data-type') &&
                                 node.getAttribute('data-type') === 'submit-feedback') ||
                                (node.querySelector && node.querySelector('[data-type="submit-feedback"]'))) {
                                shouldUpdate = true;
                            }
                        }
                    });
                }
            });
            if (shouldUpdate) {
                updatePageLanguage();
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    } catch (e) { }
});
