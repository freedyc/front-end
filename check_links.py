#!/usr/bin/env python3
"""
Complete link checker script for front-end navigation website
Checks all external links in index.html for validity
"""

import requests
import re
import time
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed

def check_link(link):
    """Check if a single link is working"""
    try:
        response = requests.head(link, timeout=10, allow_redirects=True, 
                               headers={'User-Agent': 'Mozilla/5.0 (compatible; LinkChecker/1.0)'})
        if response.status_code >= 400:
            return (link, False, response.status_code)
        else:
            return (link, True, response.status_code)
    except Exception as e:
        return (link, False, str(e))

def main():
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print("Error: index.html not found. Run this script from the project root.")
        sys.exit(1)

    links = re.findall(r'href=["\']https?://[^"\']+["\']', content)
    links = [link.replace('href="', '').replace("href='", '').replace('"', '').replace("'", '') for link in links]
    
    unique_links = list(dict.fromkeys(links))
    
    print(f'Found {len(unique_links)} unique external links to check')
    print('Checking links...\n')

    broken_links = []
    working_links = []

    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_link = {executor.submit(check_link, link): link for link in unique_links}
        
        for future in as_completed(future_to_link):
            link, is_working, status = future.result()
            
            if is_working:
                working_links.append(link)
                print(f'✅ {link} - {status}')
            else:
                broken_links.append((link, status))
                print(f'❌ {link} - {status}')
            
            time.sleep(0.1)

    print(f'\n=== SUMMARY ===')
    print(f'Total links checked: {len(unique_links)}')
    print(f'Working links: {len(working_links)}')
    print(f'Broken links: {len(broken_links)}')
    
    if broken_links:
        print(f'\n=== BROKEN LINKS ===')
        for link, status in broken_links:
            print(f'{link} - {status}')
    
    return len(broken_links) == 0

if __name__ == '__main__':
    success = main()
    sys.exit(0 if success else 1)
