document.querySelector('#reset-progress').onclick=()=>{
  const wasPaused=paused;
  toggleMenu(true);
  if(confirm('Reset all shooter XP, credits, gear and weapon upgrades? Your other games will not be reset.')){
    try{localStorage.removeItem('neon-gear-v2');}catch{}
    location.reload();
  }else toggleMenu(wasPaused);
};
