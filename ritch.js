// RITCH VIP - سكريبت التفعيل
(function() {
    'use strict';
    
    console.log('%c RITCH VIP ACTIVATED ', 'background: #22c55e; color: #000; font-size: 16px; font-weight: bold; padding: 4px');
    console.log('%c تم تفعيل المميزات بنجاح ✅ ', 'color: #22c55e; font-size: 14px;');
    
    // منع كليك يمين + F12
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
        if (e.keyCode == 123 || e.ctrlKey && e.shiftKey && e.keyCode == 73) {
            e.preventDefault();
            return false;
        }
    });
    
    // رسالة ترحيب بعد ثانيتين
    setTimeout(() => {
        alert('تم تفعيل RITCH VIP بنجاح ✅\n\nموقعك جاهز للاستخدام');
    }, 2000);
    
})();
