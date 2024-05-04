var Storage = (function () {
    var defaultLevel = 'easy'
    return {
        get:function (){
            return localStorage.getItem('mfLevel') || defaultLevel
        },
        set:function (level){
            localStorage.setItem('mfLevel', level);
        },
    }
})();