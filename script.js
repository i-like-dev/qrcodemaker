$(document).ready(function () {
    const generateQRButton = $("#generateQR");
    const inputLink = $("#inputLink");
    const imageInput = $("#imageInput");
    const logoInput = $("#logoInput");
    const utmInputs = $("#utmInputs");
    const sourceInput = $("#utmSource");
    const mediumInput = $("#utmMedium");
    const campaignInput = $("#utmCampaign");
    const qrcodeContainer = $("#qrcode");

    generateQRButton.click(function () {
        const link = inputLink.val();
        const source = sourceInput.val();
        const medium = mediumInput.val();
        const campaign = campaignInput.val();

        const utmParams = buildUTMParams(source, medium, campaign);
        const fullLink = appendUTMParams(link, utmParams);

        generateQRCode(fullLink);
    });

    logoInput.change(function () {
        const file = logoInput[0].files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const logoData = event.target.result;
                qrcodeContainer.empty();
                const qr = new QRCodeWithLogo({
                    content: inputLink.val(),
                    logo: logoData,
                    container: qrcodeContainer,
                    width: 200,
                    height: 200,
                });
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
    }

    function buildUTMParams(source, medium, campaign) {
        const params = [];
        if (source) params.push(`utm_source=${encodeURIComponent(source)}`);
        if (medium) params.push(`utm_medium=${encodeURIComponent(medium)}`);
        if (campaign) params.push(`utm_campaign=${encodeURIComponent(campaign)}`);
        return params.join("&");
    }

    function appendUTMParams(link, params) {
        if (params) {
            return `${link}${link.includes("?") ? "&" : "?"}${params}`;
        }
        return link;
    }
});
