function StartTimer(){StartTime=Date.now();}
function EndTimer(){
    EndTime=Date.now()-StartTime;
    hrs=Math.floor(EndTime/1000/60/60);
    min=Math.floor(EndTime/1000/60-hrs*60)
    sec=Math.floor(EndTime/1000-min*60)
    showMessage("<div style='color:green'>GoldHEN загружен за "+sec+" сек!</div> нажмите кнопку PS для выхода"); }