document.addEventListener("DOMContentLoaded", function () {
    const generateQRButton = document.getElementById("generateQR");
    const inputText = document.getElementById("inputText");
    const imageInput = document.getElementById("imageInput");
    const downloadLink = document.getElementById("downloadLink");
    const qrcodeContainer = document.getElementById("qrcode");

    generateQRButton.addEventListener("click", function () {
        const text = inputText.value;

        if (text) {
            qrcodeContainer.innerHTML = ""; // 清除之前的QR碼

            const qr = new QRious({
                element: qrcodeContainer,
                value: text,
                size: 200,
            });

            downloadLink.href = qr.toDataURL();
            downloadLink.style.display = "block";
        }
    });

    imageInput.addEventListener("change", function () {
        const file = imageInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                qrcodeContainer.innerHTML = ""; // 清除之前的QR碼

                const qr = new QRious({
                    element: qrcodeContainer,
                    value: event.target.result,
                    size: 200,
                });

                downloadLink.href = qr.toDataURL();
                downloadLink.style.display = "block";
            };

            reader.readAsDataURL(file);
        }
    });
});
