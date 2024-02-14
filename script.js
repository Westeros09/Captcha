// DOMCONTENTLOADED SAU DOM TRC HÌNH ẢNH, TÀI NGUYÊN
document.addEventListener("DOMContentLoaded", function(){
    var canvas = document.getElementById('captcha')
    //SỬ DỤNG CANVAS ĐỂ VẼ 2D
    var ctx = canvas.getContext('2d') 
    var captchaText = generateCaptchaText(6)
    const captchaStatus = document.getElementById('captcha-status')
    drawCaptchaText(captchaText);   

    //HANDLE CAPTCHA VERIFYCATION
    function verifyCaptcha(){
        var inputText = document.getElementById('captcha-input').value.toLowerCase();
        if(inputText === captchaText.toLowerCase()){
            captchaStatus.textContent = 'Captcha Correct!'
            captchaStatus.style.color = 'green'
        }else if(inputText.length < 6){
            captchaStatus.textContent = 'Enter all characters!'
            captchaStatus.style.color = 'red'
        }else{
            captchaStatus.textContent = 'Captcha Incorrect!'
            captchaStatus.style.color = 'red'
        }
        setTimeout(() => {
            captchaStatus.textContent = 'Status : IDLE'
            captchaStatus.style.color = 'black'
        }, 3000);
        document.getElementById('captcha-input').value = '';
        captchaText = generateCaptchaText(6)
        drawCaptchaText(captchaText);
    }

    //ADD EVENTLISTENER FOR CHECK BUTTON
    document.getElementById('check-captcha').addEventListener("click", verifyCaptcha)

    //ADD EVENTLISTENER FOR RELOAD BUTTON
    document.getElementById('reload-captcha')
    .addEventListener("click", function(){
        document.getElementById('captcha-input').value = '';
        captchaText = generateCaptchaText(6)
        drawCaptchaText(captchaText);
        captchaStatus.textContent = 'Status : IDLE'
    })

    //GENERATE CAPTCHATEXT
    function generateCaptchaText(length){
        let result = ''
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        //RANDOM TỪ 0-1 NÊN PHẢI LẤY NHÂN RỒI LÀM TRÒN
        for (let index = 0; index < length; index++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length) )           
        }
        return result;
    }

    //DRAW CAPTCHA
    function drawCaptchaText(text){
        //xóa nội dung hiện tại của canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#f3f3f3';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        addNoise(ctx);
        ctx.fillStyle = '#006400';
        ctx.font = '30px Arial';
        
        //calculate the width of text, start position
        const textWidth = ctx.measureText(text).width
        const startX = (canvas.width - textWidth)/3

        //rotation and distration
        for (let i = 0; i < text.length; i++) {
            ctx.save();
            //ADDJUST STARTX FOR EACH CHAR
            ctx.translate(startX + i * 20, 30); 
            ctx.rotate((Math.random() -0.5) * 0.4)
            ctx.fillText(text[i], 0, 0)
            ctx.restore();
        }
    }

    //ADD NOISE
    function addNoise(ctx){
        const imageData = ctx.getImageData(0,0, canvas.width, canvas.height)
        const pixels = imageData.data;
        for(let i = 0; i < pixels.length; i+=2){
            let color =  (Math.random() > 0.5) ? 255 : 0
            pixels[i] = pixels[i+1] = pixels[i+2]= color; 
        }
        ctx.putImageData(imageData, 0, 0)
    }
})