document.addEventListener("DOMContentLoaded", function() {
  const joybangla = document.getElementById("joybangla");
  const yamate = document.getElementById("yamate");
  
  const target = document.getElementById("target");
  const stone = document.getElementById("stone");
  const scoreDisplay = document.getElementById("score");
  const popupContainer = document.getElementById("popup-container");
  
  let score = 0;
  let isFiring = false;
  let targetSpeedX = 5; // টার্গেটের প্রাথমিক গতি
  let targetSpeedY = 5;
  let targetPosX = Math.random() * 300;
  let targetPosY = Math.random() * 350;
  let attempts = 100;
  
  function moveTarget() {
    targetPosX += targetSpeedX;
    targetPosY += targetSpeedY;
    
    // **টার্গেট যদি স্ক্রিনের বাইরে চলে যায়, তাহলে এটাকে ফিরিয়ে আনা**
    if (targetPosX <= 0 || targetPosX >= 350) {
      targetSpeedX *= -1;
      targetPosX = Math.max(0, Math.min(350, targetPosX)); // এক্স পজিশন সীমাবদ্ধ করা
    }
    if (targetPosY <= 0 || targetPosY >= 400) {
      targetSpeedY *= -1;
      targetPosY = Math.max(0, Math.min(400, targetPosY)); // ওয়াই পজিশন সীমাবদ্ধ করা
    }
    
    // **র্যান্ডম গতির পরিবর্তন কিন্তু সীমাবদ্ধ**
    if (Math.random() < 0.05) {
      let speedChange = Math.random() * 2 - 1; // -1 থেকে 1 পর্যন্ত র্যান্ডম সংখ্যা
      targetSpeedX = Math.max(-8, Math.min(8, targetSpeedX + speedChange)); // স্পিড সীমাবদ্ধ
      targetSpeedY = Math.max(-8, Math.min(8, targetSpeedY + speedChange)); // স্পিড সীমাবদ্ধ
    }
    
    target.style.left = targetPosX + "px";
    target.style.top = targetPosY + "px";
    
    requestAnimationFrame(moveTarget);
  }
  
  moveTarget(); // **টার্গেট মুভ করা শুরু করবে**
  
  stone.addEventListener("click", function() {
    if (isFiring || attempts <= 0) return;
    
    attempts--;
    joybangla.play();
    isFiring = true;
    
    let posY = 0;
    const interval = setInterval(() => {
      posY += 7;
      stone.style.transform = `translateY(-${posY}px)`;
      
      let stoneRect = stone.getBoundingClientRect();
      let targetRect = target.getBoundingClientRect();
      
      if (
        stoneRect.left < targetRect.right &&
        stoneRect.right > targetRect.left &&
        stoneRect.top < targetRect.bottom &&
        stoneRect.bottom > targetRect.top
      ) {
        score++;
        scoreDisplay.textContent = score;
        clearInterval(interval);
        resetStone();
        yamate.play();
        showPopup();
      }
      
      if (posY > 800) {
        clearInterval(interval);
        resetStone();
      }
    }, 15);
  });
  
  function resetStone() {
    stone.style.transform = "translateY(0)";
    isFiring = false;
  }
  
  function showPopup() {
    popupContainer.style.display = "block";
    setTimeout(() => {
      popupContainer.style.display = "none";
    }, 1000);
  }
});