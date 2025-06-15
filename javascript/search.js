class NavigationSearch {
    constructor() {
        this.searchInput = null;
        this.allLinks = [];
        this.allSections = [];
        this.originalDisplay = new Map();
        this.init();
    }

    init() {
        this.createSearchUI();
        this.collectAllLinks();
        this.bindEvents();
        this.saveOriginalDisplay();
    }

    createSearchUI() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-box">
                <input type="text" id="search-input" placeholder="搜索链接、工具或技术..." />
                <button id="clear-search" type="button">清除</button>
            </div>
            <div id="search-results" class="search-results" style="display: none;"></div>
        `;

        const content = document.querySelector('.content');
        content.insertBefore(searchContainer, content.firstChild);

        this.searchInput = document.getElementById('search-input');
    }

    saveOriginalDisplay() {
        document.querySelectorAll('.list1, .g1').forEach(element => {
            this.originalDisplay.set(element, element.style.display || 'block');
        });
    }

    collectAllLinks() {
        const sections = document.querySelectorAll('.list1');
        sections.forEach(section => {
            const sectionTitle = section.querySelector('h3').textContent;
            const groups = section.querySelectorAll('.g1');
            
            groups.forEach(group => {
                const groupTitle = group.querySelector('.title1').textContent;
                const links = group.querySelectorAll('a');
                
                links.forEach(link => {
                    this.allLinks.push({
                        element: link,
                        text: link.textContent,
                        href: link.href,
                        title: link.title || '',
                        section: sectionTitle,
                        group: groupTitle,
                        parentGroup: group,
                        parentSection: section
                    });
                });
            });
        });

        this.allSections = Array.from(sections);
    }

    bindEvents() {
        this.searchInput.addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.clearSearch();
            }
        });

        document.getElementById('clear-search').addEventListener('click', () => {
            this.clearSearch();
        });
    }

    performSearch(query) {
        if (!query.trim()) {
            this.clearSearch();
            return;
        }

        const results = this.allLinks.filter(link => {
            const searchText = `${link.text} ${link.title} ${link.section} ${link.group}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        this.displayResults(results, query);
        this.filterSections(results);
    }

    displayResults(results, query) {
        const resultsContainer = document.getElementById('search-results');
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `<div class="no-results">未找到包含 "${query}" 的链接</div>`;
            resultsContainer.style.display = 'block';
            return;
        }

        const groupedResults = {};
        results.forEach(result => {
            const key = `${result.section} - ${result.group}`;
            if (!groupedResults[key]) {
                groupedResults[key] = [];
            }
            groupedResults[key].push(result);
        });

        let html = `<div class="results-header">找到 ${results.length} 个相关链接：</div>`;
        
        Object.entries(groupedResults).forEach(([groupKey, links]) => {
            html += `<div class="result-group">
                <div class="result-group-title">${groupKey}</div>
                <div class="result-links">`;
            
            links.forEach(link => {
                html += `<a href="${link.href}" target="_blank" class="result-link" title="${link.title}">
                    ${this.highlightText(link.text, query)}
                </a>`;
            });
            
            html += `</div></div>`;
        });

        resultsContainer.innerHTML = html;
        resultsContainer.style.display = 'block';
    }

    highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    filterSections(results) {
        this.allSections.forEach(section => {
            section.style.display = 'none';
        });

        const sectionsWithResults = new Set();
        const groupsWithResults = new Set();

        results.forEach(result => {
            sectionsWithResults.add(result.parentSection);
            groupsWithResults.add(result.parentGroup);
        });

        sectionsWithResults.forEach(section => {
            section.style.display = 'block';
            
            const groups = section.querySelectorAll('.g1');
            groups.forEach(group => {
                if (groupsWithResults.has(group)) {
                    group.style.display = 'block';
                } else {
                    group.style.display = 'none';
                }
            });
        });
    }

    clearSearch() {
        this.searchInput.value = '';
        document.getElementById('search-results').style.display = 'none';
        
        this.originalDisplay.forEach((display, element) => {
            element.style.display = display;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new NavigationSearch();
});
