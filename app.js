
async function geocode(s) {
  if (s.lat && s.lon) return [s.lat, s.lon];

  const url =
    "https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&addressdetails=1&countrycodes=ir&accept-language=fa,en&q=" +
    encodeURIComponent(s.address + ", ایران");

  const r = await fetch(url, {
    headers: { "Accept-Language": "fa,en" }
  });

  if (!r.ok) throw Error("سرویس آدرس‌یابی پاسخ نداد");

  const results = await r.json();

  const iranResult = results.find(
    x => x.address?.country_code?.toLowerCase() === "ir"
  );

  if (!iranResult) {
    throw Error("این آدرس در ایران پیدا نشد: " + s.address);
  }

  s.lat = Number(iranResult.lat);
  s.lon = Number(iranResult.lon);

  return [s.lat, s.lon];
}
