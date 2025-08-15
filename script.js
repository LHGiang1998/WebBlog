// Blog Management System
class BlogManager {
    constructor() {
        this.posts = JSON.parse(localStorage.getItem('blogPosts')) || [];
        this.isAdmin = false;
        this.currentPage = 1;
        this.postsPerPage = 6;
        this.currentCategory = 'all';
        this.searchQuery = '';
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.renderPosts();
        this.updatePostCount();
        this.setupSmoothScrolling();
        this.setupBackToTop();
    }
    
    setupEventListeners() {
        // Admin login
        document.getElementById('adminBtn').addEventListener('click', () => {
            document.getElementById('adminModal').style.display = 'block';
        });
        
        // Login form
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });
        
        // Logout
        document.getElementById('logoutBtn').addEventListener('click', () => {
            this.logout();
        });
        
        // Post form
        document.getElementById('postForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePostSubmit();
        });
        
        // Preview button
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.showPreview();
        });
        
        // Search
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.searchQuery = e.target.value.toLowerCase();
            this.currentPage = 1;
            this.renderPosts();
        });
        
        // Category filter
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentCategory = e.target.dataset.category;
                this.currentPage = 1;
                this.renderPosts();
            });
        });
        
        // Load more
        document.getElementById('loadMoreBtn').addEventListener('click', () => {
            this.currentPage++;
            this.renderPosts(true);
        });
        
        // Admin tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                e.target.classList.add('active');
                document.getElementById(e.target.dataset.tab + 'Tab').classList.add('active');
                
                if (e.target.dataset.tab === 'manage') {
                    this.renderAdminPosts();
                }
            });
        });
        
        // Modal close
        document.querySelectorAll('.close').forEach(close => {
            close.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });
        
        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });
        
        // Contact form
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmit();
        });
        
        // Navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
                
                const target = e.target.getAttribute('href');
                if (target.startsWith('#')) {
                    document.querySelector(target).scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    handleLogin() {
        const password = document.getElementById('adminPassword').value;
        // Simple password check - in production, use proper authentication
        if (password === 'admin123') {
            this.isAdmin = true;
            document.getElementById('adminModal').style.display = 'none';
            document.getElementById('adminPanel').style.display = 'block';
            document.body.style.overflow = 'hidden';
            this.showNotification('Đăng nhập thành công!', 'success');
        } else {
            this.showNotification('Mật khẩu không đúng!', 'error');
        }
        document.getElementById('adminPassword').value = '';
    }
    
    logout() {
        this.isAdmin = false;
        document.getElementById('adminPanel').style.display = 'none';
        document.body.style.overflow = 'auto';
        this.clearPostForm();
        this.showNotification('Đã đăng xuất!', 'info');
    }
    
    handlePostSubmit() {
        const title = document.getElementById('postTitle').value;
        const category = document.getElementById('postCategory').value;
        const tags = document.getElementById('postTags').value;
        const excerpt = document.getElementById('postExcerpt').value;
        const content = document.getElementById('postContent').value;
        
        if (!title || !category || !content) {
            this.showNotification('Vui lòng điền đầy đủ thông tin!', 'error');
            return;
        }
        
        const post = {
            id: Date.now(),
            title,
            category,
            tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            excerpt: excerpt || content.substring(0, 150) + '...',
            content,
            date: new Date().toLocaleDateString('vi-VN'),
            timestamp: Date.now()
        };
        
        this.posts.unshift(post);
        this.savePosts();
        this.renderPosts();
        this.updatePostCount();
        this.clearPostForm();
        this.showNotification('Bài viết đã được đăng!', 'success');
        
        // Switch to manage tab
        document.querySelector('[data-tab="manage"]').click();
    }
    
    clearPostForm() {
        document.getElementById('postForm').reset();
    }
    
    showPreview() {
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;
        
        if (!title || !content) {
            this.showNotification('Vui lòng nhập tiêu đề và nội dung!', 'error');
            return;
        }
        
        const previewContent = document.getElementById('previewContent');
        previewContent.innerHTML = `
            <h1>${title}</h1>
            <div class="preview-content">${marked.parse(content)}</div>
        `;
        
        document.getElementById('previewModal').style.display = 'block';
    }
    
    renderPosts(append = false) {
        const container = document.getElementById('blogPosts');
        const filteredPosts = this.getFilteredPosts();
        
        if (filteredPosts.length === 0) {
            container.innerHTML = `
                <div class="no-posts">
                    <i class="fas fa-file-alt"></i>
                    <h3>Không tìm thấy bài viết</h3>
                    <p>Thử tìm kiếm với từ khóa khác hoặc chọn chuyên mục khác.</p>
                </div>
            `;
            document.getElementById('loadMoreBtn').style.display = 'none';
            return;
        }
        
        const startIndex = append ? (this.currentPage - 1) * this.postsPerPage : 0;
        const endIndex = this.currentPage * this.postsPerPage;
        const postsToShow = filteredPosts.slice(startIndex, endIndex);
        
        const postsHTML = postsToShow.map(post => this.createPostHTML(post)).join('');
        
        if (append) {
            container.innerHTML += postsHTML;
        } else {
            container.innerHTML = postsHTML;
        }
        
        // Show/hide load more button
        const loadMoreBtn = document.getElementById('loadMoreBtn');
        if (endIndex >= filteredPosts.length) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'block';
        }
        
        // Add click listeners to blog cards
        document.querySelectorAll('.blog-card').forEach(card => {
            card.addEventListener('click', () => {
                const postId = parseInt(card.dataset.postId);
                this.showPostDetail(postId);
            });
        });
    }
    
    getFilteredPosts() {
        let filtered = this.posts;
        
        // Filter by category
        if (this.currentCategory !== 'all') {
            filtered = filtered.filter(post => post.category === this.currentCategory);
        }
        
        // Filter by search query
        if (this.searchQuery) {
            filtered = filtered.filter(post => 
                post.title.toLowerCase().includes(this.searchQuery) ||
                post.content.toLowerCase().includes(this.searchQuery) ||
                post.tags.some(tag => tag.toLowerCase().includes(this.searchQuery))
            );
        }
        
        return filtered;
    }
    
    createPostHTML(post) {
        const categoryNames = {
            'automation': 'Tự động hóa',
            'iot': 'IoT',
            'programming': 'Lập trình',
            'tutorial': 'Hướng dẫn'
        };
        
        const icons = {
            'automation': 'fas fa-cog',
            'iot': 'fas fa-wifi',
            'programming': 'fas fa-code',
            'tutorial': 'fas fa-book'
        };
        
        return `
            <div class="blog-card" data-post-id="${post.id}">
                <div class="blog-card-image">
                    <i class="${icons[post.category] || 'fas fa-file-alt'}"></i>
                </div>
                <div class="blog-card-content">
                    <div class="blog-card-meta">
                        <span class="blog-card-category">${categoryNames[post.category] || post.category}</span>
                        <span>${post.date}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <div class="blog-card-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    showPostDetail(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;
        
        const modal = document.getElementById('previewModal');
        const content = document.getElementById('previewContent');
        
        content.innerHTML = `
            <div class="post-detail">
                <div class="post-meta">
                    <span class="post-category">${post.category}</span>
                    <span class="post-date">${post.date}</span>
                </div>
                <h1>${post.title}</h1>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="post-content">${marked.parse(post.content)}</div>
            </div>
        `;
        
        modal.style.display = 'block';
    }
    
    renderAdminPosts() {
        const container = document.getElementById('adminPostsList');
        
        if (this.posts.length === 0) {
            container.innerHTML = `
                <div class="no-posts">
                    <i class="fas fa-file-alt"></i>
                    <h3>Chưa có bài viết nào</h3>
                    <p>Hãy viết bài viết đầu tiên!</p>
                </div>
            `;
            return;
        }
        
        const postsHTML = this.posts.map(post => `
            <div class="post-item">
                <div class="post-info">
                    <h4>${post.title}</h4>
                    <p>Chuyên mục: ${post.category} | Ngày đăng: ${post.date}</p>
                </div>
                <div class="post-actions">
                    <button class="btn-small btn-edit" onclick="blogManager.editPost(${post.id})">
                        <i class="fas fa-edit"></i> Sửa
                    </button>
                    <button class="btn-small btn-delete" onclick="blogManager.deletePost(${post.id})">
                        <i class="fas fa-trash"></i> Xóa
                    </button>
                </div>
            </div>
        `).join('');
        
        container.innerHTML = postsHTML;
    }
    
    editPost(postId) {
        const post = this.posts.find(p => p.id === postId);
        if (!post) return;
        
        // Fill form with post data
        document.getElementById('postTitle').value = post.title;
        document.getElementById('postCategory').value = post.category;
        document.getElementById('postTags').value = post.tags.join(', ');
        document.getElementById('postExcerpt').value = post.excerpt;
        document.getElementById('postContent').value = post.content;
        
        // Remove post from array (will be re-added when form is submitted)
        this.posts = this.posts.filter(p => p.id !== postId);
        this.savePosts();
        
        // Switch to write tab
        document.querySelector('[data-tab="write"]').click();
        
        this.showNotification('Bài viết đã được tải để chỉnh sửa!', 'info');
    }
    
    deletePost(postId) {
        if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
            this.posts = this.posts.filter(p => p.id !== postId);
            this.savePosts();
            this.renderPosts();
            this.renderAdminPosts();
            this.updatePostCount();
            this.showNotification('Bài viết đã được xóa!', 'success');
        }
    }
    
    handleContactSubmit() {
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const message = document.getElementById('contactMessage').value;
        
        // In a real application, you would send this to a server
        console.log('Contact form submitted:', { name, email, message });
        
        this.showNotification('Cảm ơn bạn đã liên hệ! Tôi sẽ phản hồi sớm nhất có thể.', 'success');
        document.getElementById('contactForm').reset();
    }
    
    updatePostCount() {
        document.getElementById('totalPosts').textContent = this.posts.length;
    }
    
    savePosts() {
        localStorage.setItem('blogPosts', JSON.stringify(this.posts));
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
            color: white;
            border-radius: 8px;
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
    
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    setupBackToTop() {
        const backToTopButton = document.getElementById('backToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'flex';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize blog manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.blogManager = new BlogManager();
    
    // Add some sample posts if none exist
    if (blogManager.posts.length === 0) {
        const samplePosts = [
            {
                id: 1,
                title: "Giới thiệu về PLC và ứng dụng trong tự động hóa",
                category: "automation",
                tags: ["PLC", "Automation", "Industrial"],
                excerpt: "PLC (Programmable Logic Controller) là thiết bị điều khiển logic có thể lập trình, được sử dụng rộng rãi trong tự động hóa công nghiệp...",
                content: `# Giới thiệu về PLC và ứng dụng trong tự động hóa

PLC (Programmable Logic Controller) là thiết bị điều khiển logic có thể lập trình, được sử dụng rộng rãi trong tự động hóa công nghiệp.

## Đặc điểm chính của PLC

- **Độ tin cậy cao**: Hoạt động ổn định trong môi trường công nghiệp khắc nghiệt
- **Dễ lập trình**: Sử dụng ngôn ngữ lập trình đơn giản như Ladder Logic
- **Tính mở rộng**: Có thể thêm các module I/O khi cần thiết
- **Khả năng giao tiếp**: Hỗ trợ nhiều giao thức truyền thông công nghiệp

## Ứng dụng thực tế

1. **Điều khiển băng tải sản xuất**
2. **Hệ thống chiếu sáng tự động**
3. **Điều khiển máy móc công nghiệp**
4. **Hệ thống HVAC**

PLC đã trở thành xương sống của ngành tự động hóa hiện đại.`,
                date: new Date().toLocaleDateString('vi-VN'),
                timestamp: Date.now() - 86400000
            },
            {
                id: 2,
                title: "Xây dựng hệ thống IoT với ESP32 và MQTT",
                category: "iot",
                tags: ["ESP32", "IoT", "MQTT", "WiFi"],
                excerpt: "Hướng dẫn chi tiết cách xây dựng một hệ thống IoT đơn giản sử dụng ESP32 và giao thức MQTT để truyền dữ liệu...",
                content: `# Xây dựng hệ thống IoT với ESP32 và MQTT

ESP32 là một vi điều khiển mạnh mẽ với khả năng kết nối WiFi và Bluetooth tích hợp, rất phù hợp cho các dự án IoT.

## Chuẩn bị phần cứng

- ESP32 Development Board
- Cảm biến nhiệt độ DHT22
- LED và điện trở
- Breadboard và dây nối

## Cài đặt môi trường phát triển

\`\`\`cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>

const char* ssid = "your_wifi_ssid";
const char* password = "your_wifi_password";
const char* mqtt_server = "your_mqtt_broker";

WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(2, DHT22);
\`\`\`

## Kết nối và gửi dữ liệu

Hệ thống sẽ đọc dữ liệu từ cảm biến và gửi lên MQTT broker mỗi 30 giây.`,
                date: new Date().toLocaleDateString('vi-VN'),
                timestamp: Date.now() - 172800000
            }
        ];
        
        blogManager.posts = samplePosts;
        blogManager.savePosts();
        blogManager.renderPosts();
        blogManager.updatePostCount();
    }
});
