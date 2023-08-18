$(document).ready(function () {
    const generateQRButton = $("#generateQR");
    const qrTypeSelect = $("#qrType");
    const inputText = $("#inputText");
    const imageInput = $("#imageInput");
    const logoInput = $("#logoInput");
    const downloadLink = $("#downloadLink");
    const qrcodeContainer = $("#qrcode");

    generateQRButton.click(function () {
        const qrType = qrTypeSelect.val();
        const text = inputText.val();

        if (qrType === "text" && text) {
            generateQRCode(text);
        } else if (qrType === "sms" && text) {
            generateQRCode("SMSTO:" + text);
        } else if (qrType === "email" && text) {
            generateQRCode("mailto:" + text);
        } else if (qrType === "wifi" && text) {
            generateQRCode("WIFI:" + text);
        } else if (qrType === "link" && text) {
            generateQRCode(text);
        }
    });

    logoInput.change(function () {
        const file = logoInput[0].files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const logoData = event.target.result;
                qrcodeContainer.empty();
                const qr = new QRCodeWithLogo({
                    content: inputText.val(),
                    logo: logoData,
                    container: qrcodeContainer,
                    width: 200,
                    height: 200,
                });

                downloadLink.attr("href", qr.toDataURL());
                downloadLink.css("display", "block");
            };

            reader.readAsDataURL(file);
        }
    });

    function generateQRCode(content) {
        qrcodeContainer.empty();
        const qr = new QRious({
            element: qrcodeContainer[0],
            value: content,
            size: 200,
        });

        downloadLink.attr("href", qr.toDataURL());
        downloadLink.css("display", "block");
    }
});
