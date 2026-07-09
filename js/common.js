/* ============================================================
   YUKI · Componentes compartidos entre index.html y producto.html
   (botón flotante de WhatsApp + dirección corta en el footer)
   ============================================================ */
(function () {
  "use strict";

  const float = document.createElement("a");
  float.className = "wa-float";
  float.href = BRAND.whatsappHref;
  float.target = "_blank";
  float.rel = "noopener noreferrer";
  float.setAttribute("aria-label", "Escríbenos por WhatsApp");
  float.innerHTML = WA_ICON_SVG;
  document.body.appendChild(float);

  const footerAddress = document.getElementById("footerAddress");
  if (footerAddress) footerAddress.textContent = BRAND.address;
})();
