// ===================================
// Toast Notification System
// ===================================

function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${type === 'success'
            ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
            : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
        }
        </svg>
        <span>${message}</span>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===================================
// Data Backup & Restore
// ===================================

function backupData() {
    const data = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        learnedCards: loadFromLocalStorage('learnedCards', []),
        quizzesCompleted: loadFromLocalStorage('quizzesCompleted', 0),
        highestScore: loadFromLocalStorage('highestScore', 0),
        activities: loadFromLocalStorage('activities', []),
        theme: loadFromLocalStorage('theme', 'light')
    };

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `tinhoc12-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('Đã sao lưu dữ liệu thành công!', 'success');
}

function restoreData() {
    const fileInput = document.getElementById('fileInput');
    fileInput.click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);

            // Validate data structure
            if (!data.version || !data.timestamp) {
                showToast('File không đúng định dạng!', 'error');
                return;
            }

            // Confirm restore
            if (!confirm('Bạn có chắc muốn khôi phục dữ liệu? Dữ liệu hiện tại sẽ bị ghi đè.')) {
                return;
            }

            // Restore all data
            saveToLocalStorage('learnedCards', data.learnedCards || []);
            saveToLocalStorage('quizzesCompleted', data.quizzesCompleted || 0);
            saveToLocalStorage('highestScore', data.highestScore || 0);
            saveToLocalStorage('activities', data.activities || []);
            saveToLocalStorage('theme', data.theme || 'light');

            // Apply theme
            document.documentElement.setAttribute('data-theme', data.theme || 'light');

            // Reload current section
            if (currentSection === 'flashcards') {
                loadFlashcardProgress();
            } else if (currentSection === 'progress') {
                updateProgressDashboard();
            }

            showToast('Đã khôi phục dữ liệu thành công!', 'success');

            // Reload page after 1 second for full refresh
            setTimeout(() => location.reload(), 1000);

        } catch (error) {
            console.error('Error parsing backup file:', error);
            showToast('Không thể đọc file backup!', 'error');
        }
    };
    reader.readAsText(file);

    // Reset file input
    event.target.value = '';
}

// ===================================
// Data Structures
// ===================================

const flashcardsData = [
    { question: "LAN là gì?", answer: "Mạng cục bộ (Local Area Network) - Mạng kết nối các thiết bị trong phạm vi nhỏ như văn phòng, trường học." },
    { question: "WAN là gì?", answer: "Mạng diện rộng (Wide Area Network) - Mạng kết nối các mạng LAN qua khoảng cách địa lý lớn." },
    { question: "WLAN là gì?", answer: "Mạng LAN không dây (Wireless LAN) - Mạng cục bộ sử dụng công nghệ WiFi." },
    { question: "Internet là gì?", answer: "Mạng WAN toàn cầu, kết nối hàng tỷ thiết bị trên thế giới." },
    { question: "Hub là gì?", answer: "Thiết bị mạng gửi dữ liệu tới mọi cổng kết nối. Không thông minh, gây lãng phí băng thông." },
    { question: "Switch là gì?", answer: "Thiết bị mạng dựa vào địa chỉ MAC để gửi dữ liệu đúng thiết bị nhận. Thông minh hơn Hub." },
    { question: "Router là gì?", answer: "Thiết bị định tuyến dữ liệu giữa các mạng khác nhau. Kết nối mạng LAN với Internet." },
    { question: "Modem là gì?", answer: "Thiết bị chuyển đổi tín hiệu số thành tín hiệu tương tự và ngược lại." },
    { question: "Access Point là gì?", answer: "Thiết bị phát sóng WiFi, cho phép các thiết bị kết nối mạng không dây." },
    { question: "TCP là gì?", answer: "Transmission Control Protocol - Giao thức chia dữ liệu thành gói, kiểm tra lỗi và đảm bảo truyền đáng tin cậy." },
    { question: "IP là gì?", answer: "Internet Protocol - Giao thức định địa chỉ và định tuyến dữ liệu qua các mạng." },
    { question: "DNS là gì?", answer: "Domain Name System - Hệ thống chuyển đổi tên miền thành địa chỉ IP." },
    { question: "HTTP là gì?", answer: "HyperText Transfer Protocol - Giao thức truyền tải siêu văn bản không mã hóa." },
    { question: "HTTPS là gì?", answer: "HTTP Secure - Giao thức HTTP có mã hóa bằng SSL/TLS, bảo vệ dữ liệu người dùng." },
    { question: "SMTP là gì?", answer: "Simple Mail Transfer Protocol - Giao thức gửi email từ client đến server." },
    { question: "POP3 là gì?", answer: "Post Office Protocol v3 - Giao thức tải email về máy và xóa khỏi server." },
    { question: "IMAP là gì?", answer: "Internet Message Access Protocol - Giao thức đồng bộ email trên nhiều thiết bị." },
    { question: "Ethernet là gì?", answer: "Công nghệ mạng LAN phổ biến nhất, sử dụng cáp mạng để kết nối các thiết bị." },
    { question: "MAC Address là gì?", answer: "Địa chỉ vật lý duy nhất của card mạng, gồm 48 bits (6 bytes)." },
    { question: "ARP là gì?", answer: "Address Resolution Protocol - Giao thức chuyển đổi địa chỉ IP thành địa chỉ MAC." },
    { question: "ICMP là gì?", answer: "Internet Control Message Protocol - Giao thức chẩn đoán và báo lỗi mạng." },
    { question: "IPv4 là gì?", answer: "Phiên bản 4 của Internet Protocol, sử dụng 32 bits, ví dụ: 192.168.1.1" },
    { question: "IPv6 là gì?", answer: "Phiên bản 6 của Internet Protocol, sử dụng 128 bits, giải quyết thiếu hụt địa chỉ IPv4." },
    { question: "Cổng SMTP là gì?", answer: "Cổng 25, 587 hoặc 465 dùng cho giao thức SMTP." },
    { question: "Cổng HTTP là gì?", answer: "Cổng 80 dùng cho giao thức HTTP." },
    { question: "Cổng HTTPS là gì?", answer: "Cổng 443 dùng cho giao thức HTTPS." },
    { question: "Ping là gì?", answer: "Lệnh kiểm tra kết nối mạng và đo thời gian phản hồi bằng giao thức ICMP." },
    { question: "SSL/TLS là gì?", answer: "Giao thức mã hóa dữ liệu để bảo mật kết nối mạng, dùng trong HTTPS." },
    { question: "Localhost là gì?", answer: "Địa chỉ IP 127.0.0.1 trỏ về chính máy tính đang sử dụng." },
    { question: "Bandwidth là gì?", answer: "Băng thông - Lượng dữ liệu tối đa có thể truyền qua mạng trong một khoảng thời gian." }
];

const quizData = [
    { question: "LAN là viết tắt của gì?", options: ["Local Area Network", "Large Area Network", "Long Area Network", "Limited Area Network"], correct: 0 },
    { question: "WAN là viết tắt của gì?", options: ["Wide Area Network", "Wireless Area Network", "World Area Network", "Web Area Network"], correct: 0 },
    { question: "Thiết bị nào gửi dữ liệu tới mọi cổng?", options: ["Switch", "Hub", "Router", "Modem"], correct: 1 },
    { question: "Thiết bị nào dựa vào địa chỉ MAC?", options: ["Hub", "Modem", "Switch", "Access Point"], correct: 2 },
    { question: "Thiết bị nào định tuyến giữa các mạng?", options: ["Hub", "Switch", "Modem", "Router"], correct: 3 },
    { question: "TCP là giao thức ở tầng nào?", options: ["Vật lý", "Liên kết", "Mạng", "Giao vận"], correct: 3 },
    { question: "IPv4 có bao nhiêu bits?", options: ["16 bits", "32 bits", "64 bits", "128 bits"], correct: 1 },
    { question: "IPv6 có bao nhiêu bits?", options: ["32 bits", "64 bits", "128 bits", "256 bits"], correct: 2 },
    { question: "DNS làm gì?", options: ["Mã hóa dữ liệu", "Chuyển đổi tên miền thành IP", "Gửi email", "Định tuyến"], correct: 1 },
    { question: "SMTP dùng để làm gì?", options: ["Nhận email", "Gửi email", "Đồng bộ email", "Xóa email"], correct: 1 },
    { question: "POP3 làm gì với email?", options: ["Gửi", "Tải về và xóa", "Đồng bộ", "Mã hóa"], correct: 1 },
    { question: "IMAP khác POP3 ở điểm nào?", options: ["Gửi nhanh hơn", "Đồng bộ nhiều thiết bị", "Bảo mật hơn", "Dễ dùng hơn"], correct: 1 },
    { question: "HTTP sử dụng cổng nào?", options: ["21", "25", "80", "443"], correct: 2 },
    { question: "HTTPS sử dụng cổng nào?", options: ["80", "443", "8080", "3000"], correct: 1 },
    { question: "HTTPS khác HTTP ở điểm nào?", options: ["Nhanh hơn", "Có mã hóa", "Cổng khác", "Giao diện đẹp hơn"], correct: 1 },
    { question: "MAC Address có bao nhiêu bytes?", options: ["4 bytes", "6 bytes", "8 bytes", "12 bytes"], correct: 1 },
    { question: "ARP chuyển đổi gì?", options: ["IP sang MAC", "MAC sang IP", "Domain sang IP", "IP sang Domain"], correct: 0 },
    { question: "ICMP dùng cho lệnh nào?", options: ["telnet", "ftp", "ping", "ssh"], correct: 2 },
    { question: "Địa chỉ localhost là gì?", options: ["192.168.1.1", "127.0.0.1", "10.0.0.1", "8.8.8.8"], correct: 1 },
    { question: "Ethernet là công nghệ mạng gì?", options: ["WAN", "LAN", "MAN", "PAN"], correct: 1 },
    { question: "WiFi là loại mạng gì?", options: ["LAN có dây", "WLAN", "WAN", "Internet"], correct: 1 },
    { question: "Router hoạt động ở tầng nào?", options: ["Vật lý", "Liên kết", "Mạng", "Giao vận"], correct: 2 },
    { question: "Switch hoạt động ở tầng nào?", options: ["Vật lý", "Liên kết", "Mạng", "Giao vận"], correct: 1 },
    { question: "Hub hoạt động ở tầng nào?", options: ["Vật lý", "Liên kết", "Mạng", "Giao vận"], correct: 0 },
    { question: "SSL/TLS dùng để làm gì?", options: ["Tăng tốc", "Mã hóa", "Định tuyến", "Nén dữ liệu"], correct: 1 },
    { question: "Giao thức nào an toàn hơn?", options: ["HTTP", "HTTPS", "FTP", "Telnet"], correct: 1 },
    { question: "Access Point phát sóng gì?", options: ["Bluetooth", "WiFi", "Radio", "TV"], correct: 1 },
    { question: "Modem chuyển đổi tín hiệu gì?", options: ["Số sang tương tự", "Cao sang thấp", "AC sang DC", "Analog sang Digital"], correct: 0 },
    { question: "Ví dụ nào là địa chỉ IPv4?", options: ["2001:db8::1", "192.168.1.1", "FF:FF:FF:FF:FF:FF", "google.com"], correct: 1 },
    { question: "Ví dụ nào là địa chỉ IPv6?", options: ["192.168.1.1", "2001:0db8::1", "127.0.0.1", "8.8.8.8"], correct: 1 },
    { question: "TCP đảm bảo điều gì?", options: ["Tốc độ nhanh", "Truyền đáng tin cậy", "Mã hóa", "Nén dữ liệu"], correct: 1 },
    { question: "IP làm nhiệm vụ gì?", options: ["Mã hóa", "Định địa chỉ", "Gửi email", "Hiển thị web"], correct: 1 },
    { question: "Băng thông là gì?", options: ["Độ rộng cáp", "Lượng dữ liệu truyền được", "Tốc độ CPU", "Dung lượng RAM"], correct: 1 },
    { question: "Private IP dùng ở đâu?", options: ["Internet", "Mạng nội bộ", "Server công khai", "Website"], correct: 1 },
    { question: "Public IP dùng ở đâu?", options: ["Mạng nội bộ", "Internet", "Localhost", "LAN"], correct: 1 },
    { question: "DNS Server lưu trữ gì?", options: ["Email", "Tên miền và IP", "Mật khẩu", "File"], correct: 1 },
    { question: "SMTP Server làm gì?", options: ["Nhận email", "Gửi email", "Lưu email", "Xóa email"], correct: 1 },
    { question: "Giao thức nào không mã hóa?", options: ["HTTPS", "SSH", "HTTP", "SSL"], correct: 2 },
    { question: "Tốc độ Ethernet phổ biến là?", options: ["1 Mbps", "10 Mbps", "100 Mbps", "Tất cả đều đúng"], correct: 3 },
    { question: "Lệnh ping sử dụng giao thức gì?", options: ["TCP", "UDP", "ICMP", "HTTP"], correct: 2 },
    { question: "MAC Address được gán ở đâu?", options: ["Software", "Hardware", "Router", "ISP"], correct: 1 },
    { question: "IP Address được gán bởi?", options: ["Nhà sản xuất", "DHCP hoặc thủ công", "DNS", "HTTP"], correct: 1 },
    { question: "Mạng nào có phạm vi lớn nhất?", options: ["LAN", "WLAN", "MAN", "WAN"], correct: 3 },
    { question: "Thiết bị nào cần cho WiFi?", options: ["Hub", "Switch", "Access Point", "Modem"], correct: 2 },
    { question: "Gateway là gì?", options: ["Cổng kết nối mạng", "Loại cáp", "Phần mềm", "Trình duyệt"], correct: 0 },
    { question: "Firewall làm gì?", options: ["Tăng tốc", "Bảo vệ mạng", "Lưu dữ liệu", "Hiển thị web"], correct: 1 },
    { question: "VPN là gì?", options: ["Virtual Private Network", "Very Public Network", "Visual Private Network", "Virtual Public Network"], correct: 0 },
    { question: "FTP dùng để làm gì?", options: ["Gửi email", "Truyền file", "Duyệt web", "Chat"], correct: 1 },
    { question: "HTTP là giao thức nào?", options: ["Email", "File transfer", "Web", "Chat"], correct: 2 },
    { question: "Tracert làm gì?", options: ["Tìm virus", "Theo dõi đường đi gói tin", "Tăng tốc mạng", "Mã hóa"], correct: 1 }
];

// ===================================
// State Management
// ===================================

let currentSection = 'dashboard';
let currentCardIndex = 0;
let learnedCards = [];
let currentQuizQuestion = 0;
let quizScore = 0;
let quizAnswers = [];

// ===================================
// LocalStorage Management
// ===================================

function saveToLocalStorage(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.error('Error saving to localStorage:', e);
    }
}

function loadFromLocalStorage(key, defaultValue) {
    try {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.error('Error loading from localStorage:', e);
        return defaultValue;
    }
}

// ===================================
// Theme Management
// ===================================

function initTheme() {
    const savedTheme = loadFromLocalStorage('theme', 'light');
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    saveToLocalStorage('theme', newTheme);
}

// ===================================
// Navigation Management
// ===================================

function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('data-section');
            switchSection(sectionId);

            // Close sidebar on mobile
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('active');
            }
        });
    });
}

function switchSection(sectionId) {
    // Update navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-section') === sectionId) {
            item.classList.add('active');
        }
    });

    // Update sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');

    currentSection = sectionId;

    // Load section-specific data
    if (sectionId === 'flashcards') {
        loadFlashcardProgress();
    } else if (sectionId === 'progress') {
        updateProgressDashboard();
    }
}

// ===================================
// Sidebar Management
// ===================================

function initSidebar() {
    const menuToggle = document.getElementById('menuToggle');
    const closeSidebar = document.getElementById('closeSidebar');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}

// ===================================
// Accordion Management
// ===================================

function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Close all accordions
            document.querySelectorAll('.accordion-item').forEach(acc => {
                acc.classList.remove('active');
            });

            // Open clicked accordion if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===================================
// Flashcard Management
// ===================================

function initFlashcards() {
    learnedCards = loadFromLocalStorage('learnedCards', []);
    currentCardIndex = 0;

    const flashcard = document.getElementById('flashcard');
    const prevBtn = document.getElementById('prevCard');
    const nextBtn = document.getElementById('nextCard');
    const randomBtn = document.getElementById('randomCard');
    const markBtn = document.getElementById('markLearned');

    flashcard.addEventListener('click', () => {
        flashcard.classList.toggle('flipped');
    });

    prevBtn.addEventListener('click', () => {
        if (currentCardIndex > 0) {
            currentCardIndex--;
            updateFlashcard();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentCardIndex < flashcardsData.length - 1) {
            currentCardIndex++;
            updateFlashcard();
        }
    });

    randomBtn.addEventListener('click', () => {
        currentCardIndex = Math.floor(Math.random() * flashcardsData.length);
        updateFlashcard();
    });

    markBtn.addEventListener('click', () => {
        toggleLearnedCard();
    });

    updateFlashcard();
}

function updateFlashcard() {
    const card = flashcardsData[currentCardIndex];
    const flashcard = document.getElementById('flashcard');

    flashcard.classList.remove('flipped');

    document.getElementById('flashcardQuestion').textContent = card.question;
    document.getElementById('flashcardAnswer').textContent = card.answer;
    document.getElementById('cardCounter').textContent = `${currentCardIndex + 1} / ${flashcardsData.length}`;

    updateMarkButton();
    updateLearnedProgress();
}

function toggleLearnedCard() {
    const index = learnedCards.indexOf(currentCardIndex);

    if (index > -1) {
        learnedCards.splice(index, 1);
    } else {
        learnedCards.push(currentCardIndex);
    }

    saveToLocalStorage('learnedCards', learnedCards);
    updateMarkButton();
    updateLearnedProgress();

    // Add activity
    addActivity('Flashcard', `Học thẻ: ${flashcardsData[currentCardIndex].question}`);
}

function updateMarkButton() {
    const markBtn = document.getElementById('markLearned');

    if (learnedCards.includes(currentCardIndex)) {
        markBtn.textContent = 'Đã học';
        markBtn.classList.add('learned');
    } else {
        markBtn.textContent = 'Đánh dấu đã học';
        markBtn.classList.remove('learned');
    }
}

function updateLearnedProgress() {
    const count = learnedCards.length;
    const total = flashcardsData.length;
    const percentage = (count / total) * 100;

    document.getElementById('learnedCount').textContent = `${count} / ${total}`;
    document.getElementById('learnedProgress').style.width = `${percentage}%`;
}

function loadFlashcardProgress() {
    learnedCards = loadFromLocalStorage('learnedCards', []);
    updateLearnedProgress();
    updateMarkButton();
}

// ===================================
// Quiz Management
// ===================================

function initQuiz() {
    const startBtn = document.getElementById('startQuiz');
    const nextBtn = document.getElementById('nextQuestion');
    const retryBtn = document.getElementById('retryQuiz');

    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuizQuestion);
    retryBtn.addEventListener('click', resetQuiz);
}

function startQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    quizAnswers = [];

    document.getElementById('quizStart').classList.add('hidden');
    document.getElementById('quizActive').classList.remove('hidden');
    document.getElementById('quizResults').classList.add('hidden');

    showQuizQuestion();
}

function showQuizQuestion() {
    const question = quizData[currentQuizQuestion];

    document.getElementById('questionText').textContent = question.question;
    document.getElementById('quizQuestion').textContent = `Câu hỏi ${currentQuizQuestion + 1}/50`;
    document.getElementById('quizScore').textContent = `Điểm: ${quizScore}`;

    const progress = ((currentQuizQuestion) / quizData.length) * 100;
    document.getElementById('quizProgressBar').style.width = `${progress}%`;

    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });

    document.getElementById('quizFeedback').classList.add('hidden');
}

function selectAnswer(selectedIndex) {
    const question = quizData[currentQuizQuestion];
    const options = document.querySelectorAll('.quiz-option');
    const isCorrect = selectedIndex === question.correct;

    // Disable all options
    options.forEach(option => option.disabled = true);

    // Highlight correct and incorrect
    options[question.correct].classList.add('correct');
    if (!isCorrect) {
        options[selectedIndex].classList.add('incorrect');
    } else {
        quizScore++;
    }

    quizAnswers.push({ question: currentQuizQuestion, selected: selectedIndex, correct: isCorrect });

    // Show feedback
    const feedback = document.getElementById('feedbackContent');
    feedback.className = 'feedback-content ' + (isCorrect ? 'correct' : 'incorrect');
    feedback.textContent = isCorrect ? 'Chính xác!' : `Sai rồi! Đáp án đúng là: ${question.options[question.correct]}`;
    document.getElementById('quizFeedback').classList.remove('hidden');

    document.getElementById('quizScore').textContent = `Điểm: ${quizScore}`;
}

function nextQuizQuestion() {
    currentQuizQuestion++;

    if (currentQuizQuestion < quizData.length) {
        showQuizQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    document.getElementById('quizActive').classList.add('hidden');
    document.getElementById('quizResults').classList.remove('hidden');

    const percentage = (quizScore / quizData.length) * 100;
    const accuracy = percentage.toFixed(1);

    let grade = '';
    if (percentage >= 90) grade = 'Xuất sắc';
    else if (percentage >= 80) grade = 'Giỏi';
    else if (percentage >= 65) grade = 'Khá';
    else if (percentage >= 50) grade = 'Trung bình';
    else grade = 'Cần ôn tập thêm';

    document.getElementById('finalScore').textContent = quizScore;
    document.getElementById('accuracy').textContent = accuracy + '%';
    document.getElementById('grade').textContent = grade;

    // Animate circle
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (percentage / 100) * circumference;
    document.getElementById('scoreCircle').style.strokeDashoffset = offset;

    // Save to localStorage
    const quizzesCompleted = loadFromLocalStorage('quizzesCompleted', 0) + 1;
    const highestScore = Math.max(quizScore, loadFromLocalStorage('highestScore', 0));

    saveToLocalStorage('quizzesCompleted', quizzesCompleted);
    saveToLocalStorage('highestScore', highestScore);

    // Add activity
    addActivity('Quiz', `Hoàn thành bài kiểm tra - Điểm: ${quizScore}/50`);
}

function resetQuiz() {
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizStart').classList.remove('hidden');
}

// ===================================
// Progress Dashboard
// ===================================

function updateProgressDashboard() {
    const learnedCards = loadFromLocalStorage('learnedCards', []);
    const quizzesCompleted = loadFromLocalStorage('quizzesCompleted', 0);
    const highestScore = loadFromLocalStorage('highestScore', 0);

    // Flashcards progress
    const flashcardsPercentage = (learnedCards.length / flashcardsData.length) * 100;
    document.getElementById('flashcardsLearned').textContent = learnedCards.length;
    document.getElementById('flashcardsProgress').style.width = `${flashcardsPercentage}%`;

    // Quizzes completed
    document.getElementById('quizzesCompleted').textContent = quizzesCompleted;

    // Highest score
    document.getElementById('highestScore').textContent = highestScore;

    // Overall completion
    const completionPercentage = ((learnedCards.length / flashcardsData.length) * 0.6 +
        (highestScore / quizData.length) * 0.4) * 100;
    document.getElementById('completionPercent').textContent = `${Math.round(completionPercentage)}%`;

    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (completionPercentage / 100) * circumference;
    document.getElementById('completionCircle').style.strokeDashoffset = offset;

    // Load activities
    loadActivities();
}

function addActivity(type, description) {
    const activities = loadFromLocalStorage('activities', []);
    const now = new Date();

    activities.unshift({
        type: type,
        description: description,
        timestamp: now.toISOString()
    });

    // Keep only last 10 activities
    if (activities.length > 10) {
        activities.pop();
    }

    saveToLocalStorage('activities', activities);
}

function loadActivities() {
    const activities = loadFromLocalStorage('activities', []);
    const container = document.getElementById('activityList');

    if (activities.length === 0) {
        container.innerHTML = `
            <div class="activity-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p>Chưa có hoạt động nào</p>
            </div>
        `;
        return;
    }

    container.innerHTML = activities.map(activity => {
        const date = new Date(activity.timestamp);
        const timeAgo = getTimeAgo(date);

        let iconSvg = '';
        if (activity.type === 'Flashcard') {
            iconSvg = '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="9" x2="15" y2="9"/><line x1="9" y1="15" x2="15" y2="15"/>';
        } else if (activity.type === 'Quiz') {
            iconSvg = '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>';
        }

        return `
            <div class="activity-item">
                <div class="activity-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        ${iconSvg}
                    </svg>
                </div>
                <div class="activity-info">
                    <div class="activity-title">${activity.description}</div>
                    <div class="activity-time">${timeAgo}</div>
                </div>
            </div>
        `;
    }).join('');
}

function getTimeAgo(date) {
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Vừa xong';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`;
    return `${Math.floor(seconds / 86400)} ngày trước`;
}

// ===================================
// Dashboard Interactions
// ===================================

function initDashboard() {
    const startLearningBtn = document.getElementById('startLearning');
    const moduleCards = document.querySelectorAll('.module-card');

    startLearningBtn.addEventListener('click', () => {
        switchSection('theory');
    });

    moduleCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            switchSection('theory');
            // Open corresponding accordion
            setTimeout(() => {
                const accordionItems = document.querySelectorAll('.accordion-item');
                if (accordionItems[index]) {
                    accordionItems.forEach(item => item.classList.remove('active'));
                    accordionItems[index].classList.add('active');
                    accordionItems[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        });
    });
}

// ===================================
// Initialization
// ===================================

function init() {
    initTheme();
    initNavigation();
    initSidebar();
    initAccordion();
    initFlashcards();
    initQuiz();
    initDashboard();

    // Theme toggle buttons
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    document.getElementById('mobileThemeToggle').addEventListener('click', toggleTheme);

    // Backup & Restore buttons
    document.getElementById('dataBackup').addEventListener('click', backupData);
    document.getElementById('dataRestore').addEventListener('click', restoreData);
    document.getElementById('fileInput').addEventListener('change', handleFileSelect);

    // Load initial data
    updateProgressDashboard();
}

// Start when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

