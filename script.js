document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('step-1');
    const nameInput = document.getElementById('name-input');
    const nextBtn = document.getElementById('next-btn');

    // Phase 2 elements
    const step2 = document.getElementById('step-2');
    const displayName = document.getElementById('display-name');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    // Phase 3 elements
    const step3 = document.getElementById('step-3');
    const successName = document.getElementById('success-name');

    // Create custom alert element for better UX instead of default alert()
    const alertEl = document.createElement('div');
    alertEl.className = 'custom-alert';
    alertEl.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff4757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>Em chưa nhập tên kìa! Nhập vào nhé 🥺</span>
    `;
    document.body.appendChild(alertEl);

    let alertTimeout;
    const showAlert = () => {
        alertEl.classList.add('show');
        clearTimeout(alertTimeout);
        alertTimeout = setTimeout(() => {
            alertEl.classList.remove('show');
        }, 3000);
    };

    // Global variable to store name
    let userName = '';

    const handleNext = () => {
        const name = nameInput.value.trim();

        if (!name) {
            // Focus back to input
            nameInput.focus();
            // Show gentle alert
            showAlert();

            // Add slight shake animation to input to indicate error
            nameInput.style.transform = 'translateX(-5px)';
            setTimeout(() => nameInput.style.transform = 'translateX(5px)', 100);
            setTimeout(() => nameInput.style.transform = 'translateX(-5px)', 200);
            setTimeout(() => nameInput.style.transform = 'translateX(0)', 300);
            return;
        }

        // Save username
        userName = name;
        console.log("Tên người dùng đã lưu:", userName);

        // Fade out and hide step 1
        step1.classList.add('hidden');

        // Timeout to simulate moving to the next phase
        setTimeout(() => {
            step1.style.display = 'none';
            step2.style.display = 'block';

            // Allow display change to process before fading in
            setTimeout(() => {
                displayName.textContent = userName;
                step2.classList.remove('hidden');
            }, 50);
        }, 600);
    };

    nextBtn.addEventListener('click', handleNext);

    // Allow pressing Enter to submit
    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleNext();
        }
    });

    // --- Phase 2: Nút Không chạy trốn ---
    noBtn.addEventListener('mouseover', () => {
        // Lấy kích thước tối đa mà nút có thể nhảy tới
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;

        // Tính toán tọa độ ngẫu nhiên
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        // Chuyển position sang fixed nếu chưa có, hoặc gán tệp vào body để tự do bay lượn
        if (noBtn.parentElement !== document.body) {
            // Lưu lại style cần thiết trước khi move ra body
            noBtn.style.width = noBtn.offsetWidth + 'px';
            noBtn.style.height = noBtn.offsetHeight + 'px';
            document.body.appendChild(noBtn);
        }

        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    });

    // Đề phòng trường hợp click được (trên mobile), di chuyển luôn
    noBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // kích hoạt lại sự kiện mouseover
        noBtn.dispatchEvent(new Event('mouseover'));
    });

    // --- Phase 3: Nút Có - Màn hình Thành công ---
    yesBtn.addEventListener('click', () => {
        // Fade out and hide step 2
        step2.classList.add('hidden');

        // Timeout to simulate moving to the next phase
        setTimeout(() => {
            step2.style.display = 'none';
            step3.style.display = 'block';

            // Allow display change to process before fading in
            setTimeout(() => {
                successName.textContent = userName;
                step3.classList.remove('hidden');
            }, 50);
        }, 600);
    });
});
