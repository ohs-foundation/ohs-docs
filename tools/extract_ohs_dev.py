import os
import re
import ssl
import urllib.request
from urllib.parse import urljoin, urlparse
from bs4 import BeautifulSoup
from markdownify import MarkdownConverter

ctx = ssl._create_unverified_context()
headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

OUTPUT_ROOT = os.path.abspath('/Users/fredhersch/Development/ohs-docs/legacy-ohs-dev')
IMAGES_DIR = os.path.join(OUTPUT_ROOT, 'images')
os.makedirs(IMAGES_DIR, exist_ok=True)

PAGES = [
    # Android FHIR SDK
    ('https://developers.google.com/open-health-stack/android-fhir', 'android-fhir/overview.md'),
    ('https://developers.google.com/open-health-stack/android-fhir/data-capture', 'android-fhir/data-capture.md'),
    ('https://developers.google.com/open-health-stack/android-fhir/fhir-engine', 'android-fhir/fhir-engine.md'),
    ('https://developers.google.com/open-health-stack/android-fhir/workflow', 'android-fhir/workflow.md'),
    ('https://developers.google.com/open-health-stack/android-fhir/knowledge-manager', 'android-fhir/knowledge-manager.md'),
    
    # FHIR Info Gateway
    ('https://developers.google.com/open-health-stack/fhir-info-gateway', 'fhir-info-gateway/overview.md'),
    
    # FHIR Analytics / FHIR Data Pipes
    ('https://developers.google.com/open-health-stack/fhir-analytics', 'fhir-data-pipes/overview.md'),
    ('https://developers.google.com/open-health-stack/fhir-analytics/data-pipes', 'fhir-data-pipes/data-pipes.md'),
    ('https://developers.google.com/open-health-stack/fhir-analytics/parquet-on-fhir', 'fhir-data-pipes/parquet-on-fhir.md'),
    ('https://developers.google.com/open-health-stack/fhir-analytics/view-layer', 'fhir-data-pipes/view-layer.md'),
    
    # Codelabs
    ('https://developers.google.com/open-health-stack/codelabs/data-capture', 'codelabs/data-capture.md'),
    ('https://developers.google.com/open-health-stack/codelabs/fhir-engine', 'codelabs/fhir-engine.md'),
    
    # Design Guidelines
    ('https://developers.google.com/open-health-stack/design', 'design-guidelines/overview.md'),
    ('https://developers.google.com/open-health-stack/design/data-capture-guideline', 'design-guidelines/data-capture-guideline.md'),
    ('https://developers.google.com/open-health-stack/design/offline-sync-guideline', 'design-guidelines/offline-sync-guideline.md'),
    
    # General / Core Docs
    ('https://developers.google.com/open-health-stack', 'general/home.md'),
    ('https://developers.google.com/open-health-stack/overview', 'general/overview.md'),
    ('https://developers.google.com/open-health-stack/about', 'general/about.md'),
    ('https://developers.google.com/open-health-stack/use-cases', 'general/use-cases.md'),
    ('https://developers.google.com/open-health-stack/faqs', 'general/faqs.md'),
    ('https://developers.google.com/open-health-stack/learn', 'general/learn.md'),
    ('https://developers.google.com/open-health-stack/learn/tutorials', 'general/tutorials.md'),
    
    # Resources
    ('https://developers.google.com/open-health-stack/resources/getting-started-with-fhir', 'resources/getting-started-with-fhir.md'),
    ('https://developers.google.com/open-health-stack/resources/examples', 'resources/examples.md'),
    
    # Stories / Case Studies
    ('https://developers.google.com/open-health-stack/stories', 'stories/overview.md'),
    ('https://developers.google.com/open-health-stack/stories/ona', 'stories/ona.md'),
    ('https://developers.google.com/open-health-stack/stories/mpower', 'stories/mpower.md'),
    ('https://developers.google.com/open-health-stack/stories/intellisoft', 'stories/intellisoft.md'),
    ('https://developers.google.com/open-health-stack/stories/emcare', 'stories/emcare.md'),
    ('https://developers.google.com/open-health-stack/stories/iprd', 'stories/iprd.md'),
    
    # Community
    ('https://developers.google.com/open-health-stack/community', 'community/overview.md'),
    ('https://developers.google.com/open-health-stack/community/contribute', 'community/contribute.md'),
    ('https://developers.google.com/open-health-stack/community/developer-calls', 'community/developer-calls.md'),
    ('https://developers.google.com/open-health-stack/community/ohs-workshops', 'community/ohs-workshops.md'),
    ('https://developers.google.com/open-health-stack/community/codeheroes', 'community/codeheroes.md'),
]

downloaded_images = {}

def download_image(img_url, base_url):
    if not img_url:
        return None
    full_url = urljoin(base_url, img_url)
    if full_url in downloaded_images:
        return downloaded_images[full_url]
    
    # Generate filename
    parsed = urlparse(full_url)
    basename = os.path.basename(parsed.path)
    if not basename or '.' not in basename:
        basename = 'image_' + str(len(downloaded_images) + 1) + '.png'
    
    # Clean filename
    basename = re.sub(r'[^a-zA-Z0-9_\.-]', '_', basename)
    local_path = os.path.join(IMAGES_DIR, basename)
    
    # Handle filename collision
    count = 1
    root_name, ext = os.path.splitext(basename)
    while os.path.exists(local_path) and full_url not in downloaded_images.values():
        local_path = os.path.join(IMAGES_DIR, f"{root_name}_{count}{ext}")
        count += 1
    
    try:
        req = urllib.request.Request(full_url, headers=headers)
        data = urllib.request.urlopen(req, context=ctx, timeout=15).read()
        with open(local_path, 'wb') as f:
            f.write(data)
        saved_filename = os.path.basename(local_path)
        downloaded_images[full_url] = saved_filename
        print(f"  [Image] Downloaded {full_url} -> {saved_filename}")
        return saved_filename
    except Exception as e:
        print(f"  [Image Error] Failed to download {full_url}: {e}")
        return full_url

class CustomMarkdownConverter(MarkdownConverter):
    def __init__(self, rel_image_prefix='../images/', base_url='', **options):
        super().__init__(**options)
        self.rel_image_prefix = rel_image_prefix
        self.base_url = base_url

    def convert_img(self, el, text=None, convert_as_inline=False, **kwargs):
        src = el.get('src') or el.get('data-src') or ''
        alt = el.get('alt') or ''
        if src.startswith('data:'):
            return ''
        if src:
            local_img = download_image(src, self.base_url)
            if local_img and not local_img.startswith('http'):
                src = self.rel_image_prefix + local_img
            elif local_img:
                src = local_img
        return f'![{alt}]({src})' if src else ''

def clean_soup(soup, page_url):
    # Remove unwanted devsite headers, sidebars, feedback, bookmarks, etc.
    for tag in soup.find_all(['devsite-header', 'devsite-footer', 'devsite-tabs', 'devsite-feedback',
                              'devsite-page-rating', 'devsite-language-selector', 'devsite-search',
                              'devsite-user', 'devsite-progress', 'devsite-cookie-notification-bar',
                              'devsite-toc', 'devsite-book-nav', 'devsite-page-rating']):
        tag.decompose()

    for tag in soup.find_all('button'):
        tag.decompose()
    
    for tag in soup.find_all(class_=re.compile(r'devsite-nav|devsite-feedback|devsite-rating|bookmark|skip-link|devsite-top-logo|devsite-breadcrumb')):
        tag.decompose()

    # Clean boilerplate like "Stay organized with collectionsSave and categorize content based on your preferences."
    for el in soup.find_all(string=re.compile(r'Stay organized with collections|Save and categorize content based on your preferences')):
        if el.parent:
            el.parent.decompose()

def extract_page(url, relative_out_path):
    print(f"\nProcessing {url} -> {relative_out_path}")
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req, context=ctx, timeout=20).read().decode('utf-8')
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return

    soup = BeautifulSoup(html, 'html.parser')
    raw_title = soup.title.string.strip() if soup.title else ''
    title = raw_title.replace(' | Open Health Stack | Google for Developers', '').replace(' | Google for Developers', '').strip()

    # Find main article content
    article = soup.find('devsite-content') or soup.find('article') or soup.find('div', class_='devsite-article-body') or soup.find('main') or soup.find('body')
    if not article:
        print(f"Warning: No article found for {url}")
        return

    clean_soup(article, url)

    # Determine relative image prefix
    depth = len(relative_out_path.split('/')) - 1
    rel_prefix = ('../' * depth) + 'images/' if depth > 0 else 'images/'

    # Convert to markdown
    converter = CustomMarkdownConverter(
        rel_image_prefix=rel_prefix,
        base_url=url,
        heading_style='ATX',
        bullets='-',
        strip=['script', 'style']
    )
    md_content = converter.convert_soup(article)

    # Cleanup excessive blank lines and leading/trailing whitespace
    md_content = re.sub(r'\n{3,}', '\n\n', md_content).strip()

    # Construct final markdown with YAML frontmatter / metadata
    file_output = f"""---
title: "{title}"
original_url: "{url}"
source: "ohs.dev (Google for Developers Open Health Stack)"
---

# {title}

{md_content}
"""

    out_file = os.path.join(OUTPUT_ROOT, relative_out_path)
    os.makedirs(os.path.dirname(out_file), exist_ok=True)
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(file_output)
    print(f"Saved {out_file} ({len(file_output)} bytes)")

def create_index():
    index_path = os.path.join(OUTPUT_ROOT, 'README.md')
    content = """# Open Health Stack (ohs.dev) Legacy Content Archive

This directory contains the key documentation, guides, architecture overviews, codelabs, and design guidelines extracted from the legacy `ohs.dev` / Google Open Health Stack documentation site (`developers.google.com/open-health-stack`).

## Components

### 1. Android FHIR SDK
- [Android FHIR SDK Overview](android-fhir/overview.md)
- [Structured Data Capture (SDC) Library](android-fhir/data-capture.md)
- [FHIR Engine Library](android-fhir/fhir-engine.md)
- [Workflow Library](android-fhir/workflow.md)
- [Knowledge Manager Library](android-fhir/knowledge-manager.md)

### 2. FHIR Info Gateway
- [FHIR Info Gateway Overview](fhir-info-gateway/overview.md)

### 3. FHIR Data Pipes & Analytics
- [FHIR Analytics Overview](fhir-data-pipes/overview.md)
- [FHIR Data Pipes Pipeline Guide](fhir-data-pipes/data-pipes.md)
- [Parquet on FHIR Schema](fhir-data-pipes/parquet-on-fhir.md)
- [View Layer (SQL-on-FHIR)](fhir-data-pipes/view-layer.md)

### 4. Codelabs & Tutorials
- [Codelab: Structured Data Capture Library](codelabs/data-capture.md)
- [Codelab: FHIR Engine Library](codelabs/fhir-engine.md)
- [Tutorials & Video Walkthroughs](general/tutorials.md)

### 5. Design Guidelines
- [Design Guidelines Overview](design-guidelines/overview.md)
- [Data Capture Guidelines](design-guidelines/data-capture-guideline.md)
- [Offline & Sync Guidelines](design-guidelines/offline-sync-guideline.md)

### 6. General & Resources
- [Overview & Vision](general/overview.md)
- [About Open Health Stack](general/about.md)
- [Use Cases](general/use-cases.md)
- [Frequently Asked Questions (FAQs)](general/faqs.md)
- [Getting Started with FHIR](resources/getting-started-with-fhir.md)
- [Example Apps & Code Samples](resources/examples.md)

### 7. Case Studies / Stories
- [Stories Overview](stories/overview.md)
- [Ona Case Study](stories/ona.md)
- [mPower Case Study](stories/mpower.md)
- [IntelliSOFT Case Study](stories/intellisoft.md)
- [WHO EmCare Case Study](stories/emcare.md)
- [iPRD Case Study](stories/iprd.md)

### 8. Community
- [Community Overview](community/overview.md)
- [Contribute to OHS](community/contribute.md)
- [Developer Calls](community/developer-calls.md)
- [Host an OHS Workshop](community/ohs-workshops.md)
- [Codeheroes](community/codeheroes.md)

---
*Extracted and archived with local images in `images/`.*
"""
    with open(index_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"\nCreated index at {index_path}")

def main():
    print(f"Starting extraction to {OUTPUT_ROOT}...")
    for url, path in PAGES:
        extract_page(url, path)
    create_index()
    print(f"\nAll pages extracted. Total images downloaded: {len(downloaded_images)}")

if __name__ == '__main__':
    main()
