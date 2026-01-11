let selectedCharacter = null;

function toggleMode() {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
}

function selectCharacter(img) {
  selectedCharacter = img.src;
  // Highlight selected
  document.querySelectorAll('.chars img').forEach(i => i.style.border = '');
  img.style.border = '3px solid #00ffff';
}

function generateAvatar() {
  const name = document.getElementById("username").value;
  const file = document.getElementById("imageInput").files[0];

  if(!file && !selectedCharacter) return alert("اكتب اسمك وارفع صورة أو اختر شخصية");

  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Posterize
    ctx.drawImage(img, 70, 40, 280, 280);
    let imageData = ctx.getImageData(70,40,280,280);
    let data = imageData.data;
    for(let i=0;i<data.length;i+=4){
      data[i] = Math.floor(data[i]/64)*64;
      data[i+1] = Math.floor(data[i+1]/64)*64;
      data[i+2] = Math.floor(data[i+2]/64)*64;
    }
    ctx.putImageData(imageData,70,40);

    // Glow + إطار
    ctx.shadowColor = "#ff00ff";
    ctx.shadowBlur = 25;
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#00ffff";
    ctx.beginPath();
    ctx.arc(210,180,130,0,Math.PI*2);
    ctx.stroke();

    // Edge detection approximation
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(210,180,130,0,Math.PI*2);
    ctx.stroke();

    // نجوم متحركة
    for(let i=0;i<35;i++){
      ctx.fillStyle = `hsl(${Math.random()*360},100%,75%)`;
      ctx.beginPath();
      let x = Math.random()*420;
      let y = Math.random()*480;
      ctx.arc(x,y,Math.random()*3+1,0,Math.PI*2);
      ctx.fill();
    }

    // الاسم بخط عربي فخم
    ctx.font = "36px Changa";
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 20;
    ctx.fillText(`★ ${name} ★`, 210, 450);

    // تفعيل التحميل
    document.getElementById("download").href = canvas.toDataURL("image/png");
  };

  // رفع الصورة أو اختيار الشخصية
  img.src = file ? URL.createObjectURL(file) : selectedCharacter;
}
function shareWhatsApp(){
  const link = document.getElementById("download").href;
  if(!link) return alert("أنشئ الصورة أولًا");
  window.open(`https://wa.me/?text=شوف شخصيتي الأنمي 🔥 ${encodeURIComponent(link)}`,"_blank");
}
