// ==========================================
    // PROFILE DROPDOWN & LOGOUT INTEGRATION
    // ==========================================
    const profileTrigger = document.getElementById('profile-dropdown-trigger');
    const profileDropdown = document.getElementById('profile-dropdown-menu');
    const dropdownLogoutBtn = document.getElementById('dropdown-logout-btn');
    
    // Modal Elements (Assuming your modal HTML is already at the bottom of the page)
    const logoutModal = document.getElementById('logout-modal');
    const cancelLogoutBtn = document.getElementById('cancel-logout');
    const confirmLogoutBtn = document.getElementById('confirm-logout');

    // 1. Toggle Profile Dropdown
    if (profileTrigger && profileDropdown) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents the click from immediately closing it
            profileDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside of it
        document.addEventListener('click', (e) => {
            if (!profileTrigger.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        });
    }

    // 2. Open Modal from Dropdown
    if (dropdownLogoutBtn && logoutModal) {
        dropdownLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Hide the dropdown menu
            profileDropdown.classList.remove('show');
            // Show the confirmation modal
            logoutModal.classList.add('show');
        });
    }

    // 3. Handle Modal Actions
    if (logoutModal) {
        // Cancel logic
        if (cancelLogoutBtn) {
            cancelLogoutBtn.addEventListener('click', () => {
                logoutModal.classList.remove('show');
            });
        }

        // Confirm logic (Redirects to Login)
        if (confirmLogoutBtn) {
            confirmLogoutBtn.addEventListener('click', () => {
                logoutModal.classList.remove('show');
                
                // If you have the global loader function running:
                if (typeof triggerLoaderAndNavigate === 'function') {
                    triggerLoaderAndNavigate('../login/login.html');
                } else {
                    // Direct fallback redirect
                    window.location.href = '../login/login.html';
                }
            });
        }

        // Close modal when clicking the dark background overlay
        logoutModal.addEventListener('click', (e) => {
            if (e.target === logoutModal) {
                logoutModal.classList.remove('show');
            }
        });
    }




document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. GLOBAL LOADER HANDLING (Unified 2.2s logic)
    // ==========================================
    const loader = document.getElementById('oppty-global-loader');
    const MIN_LOADER_TIME = 2200; 
    const startTime = Date.now();

    function hideLoaderOnLoad() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 800 - elapsedTime);
        setTimeout(() => {
            if (loader) loader.classList.add('hide-loader');
        }, remainingTime);
    }

    window.addEventListener('load', hideLoaderOnLoad);
    if (document.readyState === 'complete') {
        hideLoaderOnLoad();
    }

    function triggerLoaderAndNavigate(targetUrl) {
        if (loader) {
            loader.classList.remove('hide-loader');
            const icon = loader.querySelector('.loader-icon');
            const fullLogo = loader.querySelector('.loader-full-logo');
            if (icon && fullLogo) {
                icon.style.animation = 'none';
                fullLogo.style.animation = 'none';
                icon.offsetHeight; 
                icon.style.animation = null; 
                fullLogo.style.animation = null; 
            }
            setTimeout(() => {
                window.location.href = targetUrl;
            }, MIN_LOADER_TIME);
        } else {
            window.location.href = targetUrl;
        }
    }

    // Attach loader to valid navigation links
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetUrl = this.getAttribute('href');
            if (!targetUrl || targetUrl.startsWith('#') || targetUrl.startsWith('javascript')) return; 
            
            e.preventDefault(); 
            triggerLoaderAndNavigate(targetUrl);
        });
    });


    // ==========================================
    // 2. SIDEBAR LOGIC
    // ==========================================
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebar = document.getElementById('sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');

    if(mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', () => sidebar.classList.add('show'));
    }
    if(closeSidebarBtn && sidebar) {
        closeSidebarBtn.addEventListener('click', () => sidebar.classList.remove('show'));
    }

    // Submenu Toggle
    const courseToggle = document.getElementById('course-toggle');
    const subMenu = document.getElementById('sub-menu');
    const chevron = courseToggle ? courseToggle.querySelector('.chevron') : null;

    if (courseToggle && subMenu && chevron) {
        courseToggle.addEventListener('click', (e) => {
            e.preventDefault();
            subMenu.classList.toggle('show');
            courseToggle.classList.toggle('active');
            chevron.style.transform = subMenu.classList.contains('show') ? 'rotate(-180deg)' : 'rotate(0deg)';
        });
    }

    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 992 && sidebar && mobileToggle) {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target) && sidebar.classList.contains('show')) {
                sidebar.classList.remove('show');
            }
        }
    });

    // ==========================================
    // 3. DYNAMIC DATE FOR BANNER
    // ==========================================
    const dateBadge = document.getElementById('current-date');
    if (dateBadge) {
        const options = { weekday: 'long', month: 'short', day: 'numeric' };
        const today = new Date().toLocaleDateString('en-US', options);
        dateBadge.textContent = today;
    }


    // ==========================================
    // 4. MODAL LOGIC (New Requirements)
    // ==========================================
    
    function setupModal(btnId, modalId) {
        const btn = document.getElementById(btnId);
        const modal = document.getElementById(modalId);
        
        if(btn && modal) {
            // Open Modal
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('show');
            });
            
            // Close Modal via X button
            const closeBtn = modal.querySelector('.close-modal');
            if(closeBtn) {
                closeBtn.addEventListener('click', () => {
                    modal.classList.remove('show');
                });
            }
            
            // Close Modal via clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                }
            });
        }
    }

    // Initialize all modals
    setupModal('btn-view-schedule', 'schedule-modal');
    setupModal('btn-add-task', 'add-task-modal');
    setupModal('btn-view-calendar', 'calendar-modal');
    setupModal('btn-read-more', 'article-modal');


    // ==========================================
    // 5. ADD TASK FUNCTIONALITY
    // ==========================================
    const saveTaskBtn = document.getElementById('save-task-btn');
    const taskInput = document.getElementById('new-task-text');
    const typeInput = document.getElementById('new-task-type');
    const taskList = document.getElementById('task-list-container');
    const taskModal = document.getElementById('add-task-modal');

    if(saveTaskBtn && taskInput && taskList && taskModal) {
        saveTaskBtn.addEventListener('click', () => {
            const taskText = taskInput.value.trim();
            const type = typeInput.value;
            
            if(taskText !== "") {
                // Determine styling based on type
                let tagClass = "blue";
                let tagText = "Course";
                if(type === "quiz") { tagClass = "orange"; tagText = "Quiz"; }
                if(type === "review") { tagClass = "green"; tagText = "Review"; }

                // Create new HTML element
                const newTaskHTML = `
                    <label class="task-item" style="animation: fadeInUp 0.4s ease forwards;">
                        <input type="checkbox" class="task-cb">
                        <span class="task-text">${taskText}</span>
                        <span class="task-tag ${tagClass}">${tagText}</span>
                    </label>
                `;
                
                // Add to list
                taskList.insertAdjacentHTML('afterbegin', newTaskHTML);
                
                // Reset form and close modal
                taskInput.value = "";
                taskModal.classList.remove('show');
            } else {
                taskInput.focus();
            }
        });
    }

    // ==========================================
    // 6. GENERAL BUTTON ACTIONS
    // ==========================================
    const resumeBtn = document.getElementById('btn-resume-course');
    if(resumeBtn) {
        resumeBtn.addEventListener('click', () => {
            triggerLoaderAndNavigate('course-preview.html?id=course-django-1');
        });
    }

    const joinWorkspaceBtn = document.getElementById('btn-join-workspace');
    if(joinWorkspaceBtn) {
        joinWorkspaceBtn.addEventListener('click', () => {
            const ogText = joinWorkspaceBtn.innerHTML;
            joinWorkspaceBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Connecting...';
            setTimeout(() => {
                joinWorkspaceBtn.innerHTML = '<i class="fa-solid fa-check"></i> Connected';
                joinWorkspaceBtn.style.background = 'var(--primary-blue)';
                joinWorkspaceBtn.style.color = 'white';
                setTimeout(() => { joinWorkspaceBtn.innerHTML = ogText; joinWorkspaceBtn.style = ''; }, 2000);
            }, 1000);
        });
    }
    
    const regHackathonBtn = document.getElementById('register-hackathon');
    if(regHackathonBtn) {
        regHackathonBtn.addEventListener('click', () => {
            regHackathonBtn.innerHTML = '<i class="fa-solid fa-check"></i> Registered Successfully!';
            regHackathonBtn.style.background = '#10b981';
            setTimeout(() => {
                document.getElementById('article-modal').classList.remove('show');
                regHackathonBtn.innerHTML = 'Register Now';
                regHackathonBtn.style.background = '';
            }, 1500);
        });
    }
});