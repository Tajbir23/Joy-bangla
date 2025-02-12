document.addEventListener("DOMContentLoaded", function() {
  const joybangla = document.getElementById("joybangla")
  const yamate = document.getElementById("yamate")
  
  const target = document.getElementById("target");
  const stone = document.getElementById("stone");
  const scoreDisplay = document.getElementById("score");
  
  
  const joybanglaPlay =() => {
    joybangla.play()
  }
  
  const yamatePlay = () => {
    console.log("yamate triggered ")
    yamate.play()
  }
  
  let score = 0;
  let isFiring = false;
  let targetSpeedX = 10;
  let targetSpeedY = 10;
  let targetPosX = Math.random() * 350;
  let targetPosY = Math.random() * 400;
  
  // Move the target with bouncing effect
  function moveTarget() {
    targetPosX += targetSpeedX;
    targetPosY += targetSpeedY;
    
    // Bounce on walls
    if (targetPosX <= 0 || targetPosX >= 350) {
      targetSpeedX *= -1;
    }
    if (targetPosY <= 0 || targetPosY >= 400) {
      targetSpeedY *= -1;
    }
    
    target.style.left = targetPosX + "px";
    target.style.top = targetPosY + "px";
    
    requestAnimationFrame(moveTarget);
  }
  
  moveTarget(); // Start movement
  
  // Fire the stone
  stone.addEventListener("click", function() {
    // joy bangla
    joybanglaPlay()
    
    if (isFiring) return;
    isFiring = true;
    
    let posY = 0;
    const interval = setInterval(() => {
      posY += 5;
      stone.style.transform = `translateY(-${posY}px)`;
      
      // Collision Detection
      let stoneRect = stone.getBoundingClientRect();
      let targetRect = target.getBoundingClientRect();
      
      if (
        stoneRect.left < targetRect.right &&
        stoneRect.right > targetRect.left &&
        stoneRect.top < targetRect.bottom &&
        stoneRect.bottom > targetRect.top
      ) {
        score++;
        
        // sojon haranor bedona
        scoreDisplay.textContent = score;
        
        clearInterval(interval);
        resetStone();
        yamatePlay()
      }
      
      // If stone reaches top, reset position
      if (posY > 800) {
        clearInterval(interval);
        resetStone();
      }
    }, 20);
  });
  
  // Reset stone position
  function resetStone() {
    stone.style.transform = "translateY(0)";
    isFiring = false;
  }
});