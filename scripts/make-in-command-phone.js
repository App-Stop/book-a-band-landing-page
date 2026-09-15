const sharp = require("sharp");

(async () => {
  const fm = await sharp("public/assets/phone-frame.png").metadata();
  const insetX = Math.round(fm.width * 0.052);
  const insetTop = Math.round(fm.height * 0.016);
  const insetBottom = Math.round(fm.height * 0.016);
  const sw = fm.width - insetX * 2;
  const sh = fm.height - insetTop - insetBottom;
  const r = Math.round(sw * 0.125);

  // Use the top portion of footer-screen (Find your sound home), not mid-scroll
  const src = sharp("public/assets/footer-screen.png");
  const sm = await src.metadata();
  const cropH = Math.round(sm.width * (sh / sw));
  const cropped = await sharp("public/assets/footer-screen.png")
    .extract({
      left: 0,
      top: 0,
      width: sm.width,
      height: Math.min(cropH, sm.height),
    })
    .resize(sw, sh, { fit: "cover", position: "top" })
    .png()
    .toBuffer();

  const svg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${sw}" height="${sh}"><rect width="${sw}" height="${sh}" rx="${r}" ry="${r}" fill="white"/></svg>`
  );

  const screen = await sharp(cropped)
    .composite([{ input: svg, blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp("public/assets/phone-frame.png")
    .composite([{ input: screen, left: insetX, top: insetTop }])
    .png()
    .toFile("public/assets/in-command-phone.png");

  console.log("rebuilt", { sw, sh, cropH });
})();
