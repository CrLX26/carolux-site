export async function loadGloockFont() {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Gloock&display=swap",
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
        next: { revalidate: 86400 },
      }
    ).then((r) => r.text());
    const fontUrl = css.match(/src: url\((.+?)\)/)?.[1];
    if (!fontUrl) return undefined;
    return fetch(fontUrl, { next: { revalidate: 86400 } }).then((r) =>
      r.arrayBuffer()
    );
  } catch {
    return undefined;
  }
}
