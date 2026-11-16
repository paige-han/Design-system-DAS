/** Placeholder images for stories. Swap in real partner logos or photos when you have them. */
function placeholder(label: string, bg: string, fg: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
    <rect width="400" height="400" fill="${bg}"/>
    <text x="200" y="210" text-anchor="middle" font-family="Montserrat, sans-serif" font-size="22" font-weight="600" fill="${fg}">${label}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const partnerLogo = (name: string) => placeholder(`${name} logo`, "#ffffff", "#566061");
export const projectPhoto = (name: string) => placeholder(`${name} photo`, "#004138", "#f2f7f7");

export const headshot = (name: string) => placeholder(name, "#e4ebeb", "#566061");
export const eventImage = (name: string) => placeholder(`${name} image`, "#00251f", "#a6d569");
