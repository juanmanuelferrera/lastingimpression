import os
import re
import json
from bs4 import BeautifulSoup
from datetime import datetime

WEB_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../web'))
OUTPUT_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), '../src/data/posts.json'))

# Helper to parse date from various formats
DATE_PATTERNS = [
    r'(\d{4})-(\d{2})-(\d{2})',  # 2018-03-23
    r'(\w+) (\d{1,2}), (\d{4})', # March 23, 2018
]
def parse_date(text):
    for pat in DATE_PATTERNS:
        m = re.search(pat, text)
        if m:
            try:
                if len(m.groups()) == 3 and pat.startswith('('):
                    return datetime.strptime('-'.join(m.groups()), '%Y-%m-%d').isoformat()
                elif len(m.groups()) == 3:
                    return datetime.strptime(' '.join(m.groups()), '%B %d %Y').isoformat()
            except Exception:
                continue
    return None

def detect_language(soup, folder):
    # Try to detect from <html lang="...">
    html_tag = soup.find('html')
    if html_tag and html_tag.has_attr('lang'):
        lang = html_tag['lang'].split('-')[0]
        if lang in ['en', 'ru']:
            return lang
    # Fallback: check folder path for 'ru' or 'en'
    if 'ru' in folder.lower():
        return 'ru'
    return 'en'

def extract_posts():
    posts = []
    for folder in sorted(os.listdir(WEB_DIR)):
        folder_path = os.path.join(WEB_DIR, folder)
        if not os.path.isdir(folder_path):
            continue
        # Look for index.html in http%3A/lastingimpression.info/
        subdir = os.path.join(folder_path, 'http%3A', 'lastingimpression.info')
        index_file = os.path.join(subdir, 'index.html')
        if not os.path.exists(index_file):
            continue
        with open(index_file, 'r', encoding='utf-8', errors='ignore') as f:
            soup = BeautifulSoup(f, 'html.parser')
        language = detect_language(soup, folder)
        # Find all posts (article elements)
        for article in soup.find_all('article'):
            post = {}
            # Title
            title_tag = article.find('h2', class_='entry-title')
            if title_tag and title_tag.a:
                post['title'] = title_tag.a.get_text(strip=True)
                post['url'] = title_tag.a['href']
            # Author
            author_tag = article.find('span', class_='fn')
            post['author'] = author_tag.get_text(strip=True) if author_tag else None
            # Date
            date_tag = article.find('span', class_='updated')
            if date_tag:
                post['date'] = parse_date(date_tag.get_text())
            else:
                # Fallback: look for meta-date
                meta_date = article.find('span', class_='meta-date')
                post['date'] = parse_date(meta_date.get_text()) if meta_date else None
            # Categories
            cats = []
            cat_tags = article.find_all('a', rel='category tag')
            for cat in cat_tags:
                cats.append(cat.get_text(strip=True))
            post['categories'] = cats
            # Tags
            tags = []
            tag_tags = article.find_all('a', rel='tag')
            for tag in tag_tags:
                tags.append(tag.get_text(strip=True))
            post['tags'] = tags
            # Excerpt/content
            entry_content = article.find('div', class_='entry-content')
            if entry_content:
                post['excerpt'] = entry_content.get_text(strip=True)[:300]
                post['content_html'] = str(entry_content)
            # Images
            images = []
            for img in article.find_all('img'):
                images.append(img.get('src'))
            post['images'] = images
            # Embedded videos (YouTube, etc.)
            videos = []
            for iframe in article.find_all('iframe'):
                videos.append(iframe.get('src'))
            post['videos'] = videos
            # Language
            post['language'] = language
            posts.append(post)
    # Sort posts by date
    posts = sorted(posts, key=lambda x: x.get('date') or '', reverse=True)
    # Write to JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(posts, f, ensure_ascii=False, indent=2)
    print(f'Extracted {len(posts)} posts to {OUTPUT_FILE}')

if __name__ == '__main__':
    extract_posts() 