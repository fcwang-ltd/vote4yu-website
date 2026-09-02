"""Bundle the five built pages into one self-contained review page.

Each page is inlined (CSS + JS) and stored as a string in the shell; the shell renders one at a
time in an iframe, hands it the artwork as data URIs over postMessage, and follows in-site links.
Run from the repo root: python3 build_preview.py
"""
import base64
import json
import mimetypes
import os
import re

PAGES = [
    ("index.html", "Home"),
    ("platform.html", "Platform"),
    ("about.html", "About"),
    ("events-news.html", "Events &amp; News"),
    ("get-involved.html", "Get Involved"),
    ("privacy.html", "Privacy"),
]

OUT = "/tmp/claude-0/-home-claude-repo/920b766b-be95-510a-a02f-a9755d11b271/scratchpad/vote4yu-preview.html"


def read(path):
    with open(path, encoding="utf-8") as fh:
        return fh.read()


# ---- artwork as data URIs, one copy for the whole bundle ----
assets = {}
for name in sorted(os.listdir("assets")):
    path = os.path.join("assets", name)
    mime = mimetypes.guess_type(path)[0] or "application/octet-stream"
    with open(path, "rb") as fh:
        assets["assets/" + name] = "data:%s;base64,%s" % (mime, base64.b64encode(fh.read()).decode())

# Script injected into every page: swaps asset paths for the data URIs the shell sends, and
# hands in-site navigation back to the shell.
BRIDGE = """
<script>
(function () {
  var applied = false;
  function apply(map) {
    if (applied) return;
    applied = true;
    document.querySelectorAll('img[src], source[srcset], link[rel="icon"]').forEach(function (el) {
      var attr = el.tagName === 'SOURCE' ? 'srcset' : (el.tagName === 'LINK' ? 'href' : 'src');
      var val = el.getAttribute(attr);
      if (val && map[val]) el.setAttribute(attr, map[val]);
    });
  }
  window.addEventListener('message', function (e) {
    if (e.data && e.data.v4yAssets) apply(e.data.v4yAssets);
  });
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || !/\\.html(#.*)?$/.test(href)) return;
    e.preventDefault();
    parent.postMessage({ v4yNavigate: href }, '*');
  });
  parent.postMessage({ v4yReady: true }, '*');
})();
</script>
"""


def inline(html):
    """Fold the shared stylesheet and scripts into the page itself."""
    css = read("css/tokens.css") + "\n" + read("css/site.css")
    html = html.replace(
        '<link rel="stylesheet" href="css/tokens.css">\n<link rel="stylesheet" href="css/site.css">',
        "<style>\n" + css + "\n</style>",
    )
    for src in ("js/content.js", "js/site.js"):
        html = html.replace(
            '<script src="%s"></script>' % src,
            "<script>\n" + read(src) + "\n</script>",
        )
    return html.replace("</body>", BRIDGE + "</body>")


bundle = {}
for filename, _ in PAGES:
    html = inline(read(filename))
    leftovers = re.findall(r'(?:src|href)="(css/|js/)[^"]*"', html)
    if leftovers:
        raise SystemExit("un-inlined reference in %s: %s" % (filename, leftovers))
    bundle[filename] = html

tabs = "\n".join(
    '      <button class="tab" type="button" data-page="%s"%s>%s</button>'
    % (f, ' aria-current="true"' if i == 0 else "", label)
    for i, (f, label) in enumerate(PAGES)
)


def js_json(value):
    """JSON for embedding in a <script> — no closing tag can escape the block."""
    return json.dumps(value).replace("</", "<\\/")


shell = read("tools/preview-shell.html")
shell = shell.replace("/*__TABS__*/", tabs)
shell = shell.replace("/*__PAGES__*/", js_json(bundle))
shell = shell.replace("/*__ASSETS__*/", js_json(assets))

with open(OUT, "w", encoding="utf-8") as fh:
    fh.write(shell)

print("%s — %.1f MB" % (OUT, os.path.getsize(OUT) / 1e6))
