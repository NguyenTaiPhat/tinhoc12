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
    { question: "LAN là viết tắt của gì?", options: ["Local Area Network", "Large Area Network", "Long Area Network", "Limited Area Network"], correct: 0, explanation: "LAN (Local Area Network) là mạng cục bộ, kết nối các thiết bị trong phạm vi nhỏ như văn phòng, trường học, hoặc nhà ở. LAN có tốc độ cao và chi phí thấp." },
    { question: "WAN là viết tắt của gì?", options: ["Wide Area Network", "Wireless Area Network", "World Area Network", "Web Area Network"], correct: 0, explanation: "WAN (Wide Area Network) là mạng diện rộng, kết nối các mạng LAN qua khoảng cách địa lý lớn như giữa các thành phố hoặc quốc gia. Internet là ví dụ lớn nhất của WAN." },
    { question: "Thiết bị nào gửi dữ liệu tới mọi cổng?", options: ["Switch", "Hub", "Router", "Modem"], correct: 1, explanation: "Hub là thiết bị mạng đơn giản nhất, khi nhận dữ liệu từ một cổng, nó sẽ gửi (broadcast) dữ liệu đó tới TẤT CẢ các cổng khác. Điều này gây lãng phí băng thông và giảm hiệu suất mạng." },
    { question: "Thiết bị nào dựa vào địa chỉ MAC?", options: ["Hub", "Modem", "Switch", "Access Point"], correct: 2, explanation: "Switch là thiết bị thông minh, sử dụng bảng địa chỉ MAC để xác định cổng nào kết nối với thiết bị nào. Khi nhận dữ liệu, Switch chỉ gửi đến đúng cổng của thiết bị đích, tiết kiệm băng thông." },
    { question: "Thiết bị nào định tuyến giữa các mạng?", options: ["Hub", "Switch", "Modem", "Router"], correct: 3, explanation: "Router là thiết bị định tuyến, hoạt động ở tầng mạng (Layer 3). Router kết nối các mạng khác nhau với nhau, chọn đường đi tốt nhất cho dữ liệu, và thường được dùng để kết nối mạng LAN với Internet." },
    { question: "TCP là giao thức ở tầng nào?", options: ["Vật lý", "Liên kết", "Mạng", "Giao vận"], correct: 3, explanation: "TCP (Transmission Control Protocol) hoạt động ở tầng Giao vận (Transport Layer - Layer 4) trong mô hình OSI. TCP đảm bảo dữ liệu được truyền đầy đủ, đúng thứ tự và không bị lỗi." },
    { question: "IPv4 có bao nhiêu bits?", options: ["16 bits", "32 bits", "64 bits", "128 bits"], correct: 1, explanation: "IPv4 sử dụng 32 bits (4 bytes) để biểu diễn địa chỉ IP. Ví dụ: 192.168.1.1 gồm 4 số từ 0-255. Với 32 bits, IPv4 có thể tạo ra khoảng 4.3 tỷ địa chỉ." },
    { question: "IPv6 có bao nhiêu bits?", options: ["32 bits", "64 bits", "128 bits", "256 bits"], correct: 2, explanation: "IPv6 sử dụng 128 bits để biểu diễn địa chỉ, gấp 4 lần IPv4. Điều này cho phép tạo ra số lượng địa chỉ khổng lồ (340 undecillion), giải quyết vấn đề thiếu hụt địa chỉ của IPv4." },
    { question: "DNS làm gì?", options: ["Mã hóa dữ liệu", "Chuyển đổi tên miền thành IP", "Gửi email", "Định tuyến"], correct: 1, explanation: "DNS (Domain Name System) là hệ thống chuyển đổi tên miền dễ nhớ (như google.com) thành địa chỉ IP (như 142.250.xxx.xxx) mà máy tính hiểu được. DNS giống như \"danh bạ điện thoại\" của Internet." },
    { question: "SMTP dùng để làm gì?", options: ["Nhận email", "Gửi email", "Đồng bộ email", "Xóa email"], correct: 1, explanation: "SMTP (Simple Mail Transfer Protocol) là giao thức dùng để GỬI email từ client đến mail server, hoặc giữa các mail server với nhau. Cổng mặc định: 25, 587, 465." },
    { question: "POP3 làm gì với email?", options: ["Gửi", "Tải về và xóa", "Đồng bộ", "Mã hóa"], correct: 1, explanation: "POP3 (Post Office Protocol v3) TẢI email từ server VỀ máy tính và XÓA khỏi server. Email chỉ tồn tại trên một thiết bị duy nhất." },
    { question: "IMAP khác POP3 ở điểm nào?", options: ["Gửi nhanh hơn", "Đồng bộ nhiều thiết bị", "Bảo mật hơn", "Dễ dùng hơn"], correct: 1, explanation: "IMAP (Internet Message Access Protocol) ĐỒNG BỘ email trên nhiều thiết bị. Email luôn lưu trên server, bạn có thể truy cập từ điện thoại, máy tính, tablet cùng lúc." },
    { question: "HTTP sử dụng cổng nào?", options: ["21", "25", "80", "443"], correct: 2, explanation: "HTTP (HyperText Transfer Protocol) sử dụng cổng 80. Đây là giao thức truyền tải web KHÔNG MÃ HÓA, dữ liệu có thể bị đánh cắp." },
    { question: "HTTPS sử dụng cổng nào?", options: ["80", "443", "8080", "3000"], correct: 1, explanation: "HTTPS (HTTP Secure) sử dụng cổng 443. HTTPS mã hóa dữ liệu bằng SSL/TLS, bảo vệ thông tin nhạy cảm như mật khẩu, thẻ tín dụng." },
    { question: "HTTPS khác HTTP ở điểm nào?", options: ["Nhanh hơn", "Có mã hóa", "Cổng khác", "Giao diện đẹp hơn"], correct: 1, explanation: "HTTPS = HTTP + SSL/TLS. Điểm khác biệt quan trọng nhất là HTTPS MÃ HÓA dữ liệu, bảo vệ quyền riêng tư người dùng. Trình duyệt hiển thị biểu tượng ổ khóa khi dùng HTTPS." },
    { question: "MAC Address có bao nhiêu bytes?", options: ["4 bytes", "6 bytes", "8 bytes", "12 bytes"], correct: 1, explanation: "MAC Address (Media Access Control) có 6 bytes = 48 bits. Ví dụ: 00:1A:2B:3C:4D:5E. MAC address là địa chỉ vật lý DUY NHẤT của card mạng, do nhà sản xuất gán." },
    { question: "ARP chuyển đổi gì?", options: ["IP sang MAC", "MAC sang IP", "Domain sang IP", "IP sang Domain"], correct: 0, explanation: "ARP (Address Resolution Protocol) chuyển đổi địa chỉ IP thành địa chỉ MAC. Khi một thiết bị muốn gửi dữ liệu trong mạng LAN, nó cần biết MAC address của thiết bị đích." },
    { question: "ICMP dùng cho lệnh nào?", options: ["telnet", "ftp", "ping", "ssh"], correct: 2, explanation: "ICMP (Internet Control Message Protocol) được dùng trong lệnh PING để kiểm tra kết nối mạng và đo thời gian phản hồi. Ví dụ: ping google.com" },
    { question: "Địa chỉ localhost là gì?", options: ["192.168.1.1", "127.0.0.1", "10.0.0.1", "8.8.8.8"], correct: 1, explanation: "127.0.0.1 là địa chỉ LOCALHOST (loopback), trỏ về chính máy tính đang sử dụng. Dùng để test ứng dụng mạng trên local." },
    { question: "Ethernet là công nghệ mạng gì?", options: ["WAN", "LAN", "MAN", "PAN"], correct: 1, explanation: "Ethernet là công nghệ mạng LAN phổ biến nhất, sử dụng cáp mạng (RJ45) để kết nối. Tốc độ: 10 Mbps, 100 Mbps, 1 Gbps, 10 Gbps." },
    { question: "WiFi là loại mạng gì?", options: ["LAN có dây", "WLAN", "WAN", "Internet"], correct: 1, explanation: "WiFi là công nghệ WLAN (Wireless LAN) - mạng LAN không dây. Thiết bị kết nối qua sóng radio thay vì cáp." },
    { question: "Router hoạt động ở tầng nào?", options: ["Vật lý", "Liên kết", "Mạng", "Giao vận"], correct: 2, explanation: "Router hoạt động ở tầng Mạng (Network Layer - Layer 3) trong mô hình OSI. Router sử dụng địa chỉ IP để định tuyến." },
    { question: "Switch hoạt động ở tầng nào?", options: ["Vật lý", "Liên kết", "Mạng", "Giao vận"], correct: 1, explanation: "Switch hoạt động ở tầng Liên kết dữ liệu (Data Link Layer - Layer 2). Switch sử dụng địa chỉ MAC để chuyển mạch." },
    { question: "Hub hoạt động ở tầng nào?", options: ["Vật lý", "Liên kết", "Mạng", "Giao vận"], correct: 0, explanation: "Hub hoạt động ở tầng Vật lý (Physical Layer - Layer 1). Hub chỉ khuếch đại tín hiệu, không có trí thông minh xử lý." },
    { question: "SSL/TLS dùng để làm gì?", options: ["Tăng tốc", "Mã hóa", "Định tuyến", "Nén dữ liệu"], correct: 1, explanation: "SSL/TLS (Secure Sockets Layer/Transport Layer Security) là giao thức MÃ HÓA dữ liệu, bảo mật kết nối giữa client và server. Dùng trong HTTPS." },
    { question: "Giao thức nào an toàn hơn?", options: ["HTTP", "HTTPS", "FTP", "Telnet"], correct: 1, explanation: "HTTPS là giao thức an toàn nhất trong các lựa chọn vì có mã hóa SSL/TLS. HTTP, FTP, Telnet đều truyền dữ liệu dạng văn bản thuần (plaintext), dễ bị đánh cắp." },
    { question: "Access Point phát sóng gì?", options: ["Bluetooth", "WiFi", "Radio", "TV"], correct: 1, explanation: "Access Point (AP) là thiết bị phát sóng WiFi, cho phép các thiết bị không dây (laptop, điện thoại, tablet) kết nối vào mạng LAN." },
    { question: "Modem chuyển đổi tín hiệu gì?", options: ["Số sang tương tự", "Cao sang thấp", "AC sang DC", "Analog sang Digital"], correct: 0, explanation: "Modem (Modulator-Demodulator) chuyển đổi tín hiệu SỐ (digital) từ máy tính thành tín hiệu TƯƠNG TỰ (analog) để truyền qua đường điện thoại/cáp, và ngược lại." },
    { question: "Ví dụ nào là địa chỉ IPv4?", options: ["2001:db8::1", "192.168.1.1", "FF:FF:FF:FF:FF:FF", "google.com"], correct: 1, explanation: "192.168.1.1 là địa chỉ IPv4 hợp lệ (4 số từ 0-255 cách nhau bởi dấu chấm). 2001:db8::1 là IPv6. FF:FF:FF:FF:FF:FF là MAC address. google.com là domain name." },
    { question: "Ví dụ nào là địa chỉ IPv6?", options: ["192.168.1.1", "2001:0db8::1", "127.0.0.1", "8.8.8.8"], correct: 1, explanation: "2001:0db8::1 là địa chỉ IPv6 hợp lệ (dùng hệ thập lục phân, cách nhau bởi dấu hai chấm). :: là cách viết tắt cho các nhóm số 0 liên tiếp." },
    { question: "TCP đảm bảo điều gì?", options: ["Tốc độ nhanh", "Truyền đáng tin cậy", "Mã hóa", "Nén dữ liệu"], correct: 1, explanation: "TCP đảm bảo truyền dữ liệu ĐÁNG TIN CẬY: kiểm tra lỗi, truyền lại gói bị mất, đảm bảo thứ tự đúng. UDP nhanh hơn nhưng không đáng tin cậy." },
    { question: "IP làm nhiệm vụ gì?", options: ["Mã hóa", "Định địa chỉ", "Gửi email", "Hiển thị web"], correct: 1, explanation: "IP (Internet Protocol) có nhiệm vụ ĐỊNH ĐỊA CHỈ cho các thiết bị và ĐỊNH TUYẾN dữ liệu qua các mạng. Mỗi thiết bị kết nối Internet cần có địa chỉ IP." },
    { question: "Băng thông là gì?", options: ["Độ rộng cáp", "Lượng dữ liệu truyền được", "Tốc độ CPU", "Dung lượng RAM"], correct: 1, explanation: "Băng thông (Bandwidth) là lượng dữ liệu tối đa có thể truyền qua mạng trong một khoảng thời gian. Đơn vị: bps, Mbps, Gbps." },
    { question: "Private IP dùng ở đâu?", options: ["Internet", "Mạng nội bộ", "Server công khai", "Website"], correct: 1, explanation: "Private IP (VD: 192.168.x.x, 10.x.x.x, 172.16-31.x.x) chỉ dùng trong MẠNG NỘI BỘ (LAN), không định tuyến trên Internet. Tiết kiệm địa chỉ IP công khai." },
    { question: "Public IP dùng ở đâu?", options: ["Mạng nội bộ", "Internet", "Localhost", "LAN"], correct: 1, explanation: "Public IP là địa chỉ IP công khai, duy nhất trên INTERNET, được ISP cấp phát. Dùng để các thiết bị kết nối Internet và truy cập từ bên ngoài." },
    { question: "DNS Server lưu trữ gì?", options: ["Email", "Tên miền và IP", "Mật khẩu", "File"], correct: 1, explanation: "DNS Server lưu trữ bảng ánh xạ giữa TÊN MIỀN (domain name) và ĐỊA CHỈ IP. Khi bạn gõ google.com, DNS server sẽ trả về địa chỉ IP tương ứng." },
    { question: "SMTP Server làm gì?", options: ["Nhận email", "Gửi email", "Lưu email", "Xóa email"], correct: 1, explanation: "SMTP Server là máy chủ xử lý việc GỬI email. Khi bạn nhấn Send trong email client, dữ liệu được gửi đến SMTP server để chuyển tiếp đến người nhận." },
    { question: "Giao thức nào không mã hóa?", options: ["HTTPS", "SSH", "HTTP", "SSL"], correct: 2, explanation: "HTTP là giao thức KHÔNG MÃ HÓA, dữ liệu truyền dạng plaintext. HTTPS, SSH, SSL đều có mã hóa. Không nên dùng HTTP cho thông tin nhạy cảm." },
    { question: "Tốc độ Ethernet phổ biến là?", options: ["1 Mbps", "10 Mbps", "100 Mbps", "Tất cả đều đúng"], correct: 3, explanation: "Ethernet có nhiều chuẩn tốc độ: 10 Mbps (Ethernet), 100 Mbps (Fast Ethernet), 1 Gbps (Gigabit Ethernet), 10 Gbps (10-Gigabit Ethernet). Tất cả đều phổ biến tùy theo mục đích sử dụng." },
    { question: "Lệnh ping sử dụng giao thức gì?", options: ["TCP", "UDP", "ICMP", "HTTP"], correct: 2, explanation: "Lệnh ping sử dụng giao thức ICMP (Internet Control Message Protocol) để gửi gói Echo Request và nhận Echo Reply, kiểm tra kết nối mạng." },
    { question: "MAC Address được gán ở đâu?", options: ["Software", "Hardware", "Router", "ISP"], correct: 1, explanation: "MAC Address được gán vào HARDWARE (card mạng) bởi nhà sản xuất khi sản xuất. Mỗi card mạng có MAC address duy nhất, gọi là BIA (Burned-In Address)." },
    { question: "IP Address được gán bởi?", options: ["Nhà sản xuất", "DHCP hoặc thủ công", "DNS", "HTTP"], correct: 1, explanation: "IP Address có thể được gán TỰ ĐỘNG bởi DHCP server hoặc cấu hình THỦ CÔNG (static IP) bởi người quản trị mạng." },
    { question: "Mạng nào có phạm vi lớn nhất?", options: ["LAN", "WLAN", "MAN", "WAN"], correct: 3, explanation: "WAN (Wide Area Network) có phạm vi LỚN NHẤT, kết nối các mạng qua khoảng cách địa lý lớn (thành phố, quốc gia, lục địa). Internet là WAN lớn nhất." },
    { question: "Thiết bị nào cần cho WiFi?", options: ["Hub", "Switch", "Access Point", "Modem"], correct: 2, explanation: "Access Point (AP) là thiết bị bắt buộc để phát sóng WiFi. AP chuyển đổi tín hiệu từ mạng có dây (Ethernet) thành sóng radio không dây." },
    { question: "Gateway là gì?", options: ["Cổng kết nối mạng", "Loại cáp", "Phần mềm", "Trình duyệt"], correct: 0, explanation: "Gateway là CỔNG KẾT NỐI giữa hai mạng khác nhau, thường là giữa mạng LAN và Internet. Router thường đóng vai trò là default gateway." },
    { question: "Firewall làm gì?", options: ["Tăng tốc", "Bảo vệ mạng", "Lưu dữ liệu", "Hiển thị web"], correct: 1, explanation: "Firewall là tường lửa, BẢO VỆ MẠNG bằng cách lọc traffic, chặn truy cập trái phép, phát hiện và ngăn chặn tấn công từ bên ngoài." },
    { question: "VPN là gì?", options: ["Virtual Private Network", "Very Public Network", "Visual Private Network", "Virtual Public Network"], correct: 0, explanation: "VPN (Virtual Private Network) là mạng riêng ảo, tạo kết nối AN TOÀN và MÃ HÓA qua Internet. VPN bảo vệ quyền riêng tư và cho phép truy cập mạng từ xa." },
    { question: "FTP dùng để làm gì?", options: ["Gửi email", "Truyền file", "Duyệt web", "Chat"], correct: 1, explanation: "FTP (File Transfer Protocol) là giao thức TRUYỀN FILE giữa client và server. Dùng để upload/download files, quản lý files trên server." },
    { question: "HTTP là giao thức nào?", options: ["Email", "File transfer", "Web", "Chat"], correct: 2, explanation: "HTTP (HyperText Transfer Protocol) là giao thức WEB, dùng để truyền tải trang web, hình ảnh, video từ web server đến trình duyệt." },
    { question: "Tracert làm gì?", options: ["Tìm virus", "Theo dõi đường đi gói tin", "Tăng tốc mạng", "Mã hóa"], correct: 1, explanation: "Tracert (Traceroute) THEO DÕI ĐƯỜNG ĐI của gói tin từ nguồn đến đích, hiển thị các router trung gian và thời gian phản hồi của từng hop." }
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
let quizMode = 'shuffle'; // 'shuffle' or 'original'
let activeQuizData = []; // Bản copy của quiz data để xáo trộn

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

// Hàm xáo trộn mảng (Fisher-Yates shuffle)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function initQuiz() {
    const startBtn = document.getElementById('startQuiz');
    const nextBtn = document.getElementById('nextQuestion');
    const retryBtn = document.getElementById('retryQuiz');

    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuizQuestion);
    retryBtn.addEventListener('click', resetQuiz);
}

function startQuiz() {
    // Lấy chế độ quiz từ radio button
    const selectedMode = document.querySelector('input[name="quizMode"]:checked').value;
    quizMode = selectedMode;

    currentQuizQuestion = 0;
    quizScore = 0;
    quizAnswers = [];

    // Chuẩn bị dữ liệu quiz
    if (quizMode === 'shuffle') {
        // Xáo trộn câu hỏi
        activeQuizData = shuffleArray(quizData).map(q => {
            // Tạo mảng options kèm index gốc
            const optionsWithIndex = q.options.map((opt, idx) => ({ text: opt, originalIndex: idx }));
            // Xáo trộn options
            const shuffledOptions = shuffleArray(optionsWithIndex);
            // Tìm vị trí mới của đáp án đúng
            const newCorrectIndex = shuffledOptions.findIndex(opt => opt.originalIndex === q.correct);

            return {
                question: q.question,
                options: shuffledOptions.map(opt => opt.text),
                correct: newCorrectIndex,
                explanation: q.explanation,
                originalQuestion: q.question
            };
        });
    } else {
        // Giữ nguyên
        activeQuizData = quizData.map(q => ({
            question: q.question,
            options: [...q.options],
            correct: q.correct,
            explanation: q.explanation,
            originalQuestion: q.question
        }));
    }

    document.getElementById('quizStart').classList.add('hidden');
    document.getElementById('quizActive').classList.remove('hidden');
    document.getElementById('quizResults').classList.add('hidden');

    showQuizQuestion();
}

function showQuizQuestion() {
    const question = activeQuizData[currentQuizQuestion];

    document.getElementById('questionText').textContent = question.question;
    document.getElementById('quizQuestion').textContent = `Câu hỏi ${currentQuizQuestion + 1}/50`;
    document.getElementById('quizScore').textContent = `Điểm: ${quizScore}`;

    const progress = ((currentQuizQuestion) / activeQuizData.length) * 100;
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
    const question = activeQuizData[currentQuizQuestion];
    console.log('Current question:', question); // Debug: kiểm tra xem có explanation không
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

    if (isCorrect) {
        feedback.innerHTML = `
            <div class="feedback-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <strong>Chính xác!</strong>
            </div>
            <div class="feedback-explanation">
                ${question.explanation || ''}
            </div>
        `;
    } else {
        feedback.innerHTML = `
            <div class="feedback-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <strong>Sai rồi!</strong>
            </div>
            <div class="feedback-correct-answer">
                <strong>Đáp án đúng:</strong> ${question.options[question.correct]}
            </div>
            <div class="feedback-explanation">
                <strong>Giải thích:</strong><br>
                ${question.explanation || 'Không có giải thích.'}
            </div>
        `;
    }

    document.getElementById('quizFeedback').classList.remove('hidden');

    document.getElementById('quizScore').textContent = `Điểm: ${quizScore}`;
}

function nextQuizQuestion() {
    currentQuizQuestion++;

    if (currentQuizQuestion < activeQuizData.length) {
        showQuizQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    document.getElementById('quizActive').classList.add('hidden');
    document.getElementById('quizResults').classList.remove('hidden');

    const percentage = (quizScore / activeQuizData.length) * 100;
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
    const modeText = quizMode === 'shuffle' ? 'Xáo trộn' : 'Giữ nguyên';
    addActivity('Quiz', `Hoàn thành bài kiểm tra (${modeText}) - Điểm: ${quizScore}/50`);
}

function resetQuiz() {
    document.getElementById('quizResults').classList.add('hidden');
    document.getElementById('quizStart').classList.remove('hidden');
    activeQuizData = [];
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

