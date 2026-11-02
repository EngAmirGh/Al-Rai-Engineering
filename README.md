<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Al-Rai Engineering Company - منصة إدارة القسايم والمشاريع الميدانية</title>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Cairo Font -->
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">

    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        navy: { 800: '#0f172a', 900: '#090d16', 950: '#04070d' },
                        amber: { 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706' }
                    },
                    fontFamily: { cairo: ['Cairo', 'sans-serif'] }
                }
            }
        }
    </script>

    <style>
        * { user-select: none; }
        input, select, textarea { font-family: 'Cairo', sans-serif; font-variant-numeric: lining-nums western-numeric; }
        
        body { 
            background: #04070d;
            background-image: 
                radial-gradient(at 0% 0%, rgba(30, 58, 138, 0.25) 0px, transparent 50%),
                radial-gradient(at 100% 100%, rgba(245, 158, 11, 0.08) 0px, transparent 50%),
                linear-gradient(to bottom, #04070d, #090d16);
            color: #ffffff; 
            font-family: 'Cairo', sans-serif; 
            min-height: 100vh; 
            overflow-x: hidden; 
        }

        .glass-panel { 
            background: rgba(10, 16, 28, 0.95); 
            backdrop-filter: blur(24px); 
            border: 1px solid rgba(255, 255, 255, 0.12); 
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6); 
        }

        .glass-card { 
            background: rgba(13, 21, 37, 0.9); 
            backdrop-filter: blur(14px); 
            border: 1px solid rgba(255, 255, 255, 0.12); 
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4); 
            transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1); 
        }
        
        .glass-card:hover { 
            border-color: rgba(245, 158, 11, 0.6); 
            transform: translateY(-2px); 
            box-shadow: 0 10px 30px rgba(245, 158, 11, 0.15); 
        }

        .custom-scrollbar::-webkit-scrollbar { width: 5px; height: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(5, 8, 15, 0.8); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(245, 158, 11, 0.5); border-radius: 4px; }
        
        /* التنبيه المضيء والمتحرك للمشرف */
        .pulse-alert-box {
            background: linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(220, 38, 38, 0.15));
            border: 1px solid #f59e0b;
            animation: pulseGlow 1.8s infinite alternate ease-in-out;
        }

        @keyframes pulseGlow {
            0% { 
                box-shadow: 0 0 10px rgba(245, 158, 11, 0.3), inset 0 0 10px rgba(245, 158, 11, 0.1);
                border-color: rgba(245, 158, 11, 0.6);
            }
            100% { 
                box-shadow: 0 0 25px rgba(245, 158, 11, 0.8), inset 0 0 15px rgba(245, 158, 11, 0.2);
                border-color: #fbbf24;
            }
        }

        @media print { 
            .no-print { display: none !important; } 
            .print-only { display: block !important; } 
            body { background: white !important; color: black !important; } 
        }
    </style>
</head>
<body class="text-white font-cairo selection:bg-amber-500 selection:text-navy-950 flex flex-col h-screen overflow-hidden">

    <!-- LOGIN SCREEN PORTAL -->
    <div id="loginScreen" class="fixed inset-0 bg-navy-950/98 z-50 flex items-center justify-center p-4 backdrop-blur-2xl">
        <div class="glass-panel p-8 rounded-3xl max-w-xl w-full border border-amber-500/30 shadow-2xl space-y-6">
            <div class="text-center space-y-2">
                <div class="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-navy-950 font-black text-4xl mx-auto shadow-xl shadow-amber-500/20 border-2 border-amber-300">
                    <i class="fa-solid fa-compass-drafting"></i>
                </div>
                <h1 class="text-2xl font-black text-white tracking-wide mt-3">Al-Rai Engineering Company</h1>
                <p class="text-xs text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 py-1 px-3 rounded-full inline-block">
                    منصة الإدارة والربط الميداني الهندسي
                </p>
            </div>

            <div class="space-y-4 pt-2">
                <label class="block text-xs font-bold text-slate-200 text-right">قم باختيار حسابك الهندسي لتسجيل الدخول:</label>
                
                <!-- قسم الإدارة العليا والمبرمج -->
                <div class="space-y-1">
                    <span class="text-[10px] text-amber-400 font-black uppercase tracking-wider block px-1">إدارة النظام والمدير العام</span>
                    <div class="grid grid-cols-1 gap-2" id="adminUsersList"></div>
                </div>

                <!-- قسم المهندسين والمشرفين الميدانيين -->
                <div class="space-y-1 pt-2">
                    <span class="text-[10px] text-slate-400 font-black uppercase tracking-wider block px-1">المهندسون والمشرفون الميدانيون</span>
                    <div class="grid grid-cols-1 gap-2.5 max-h-48 overflow-y-auto custom-scrollbar p-1" id="fieldUsersList"></div>
                </div>
            </div>

            <div class="text-center pt-2">
                <span class="text-[11px] text-slate-400 font-bold">نظام محمي بمسار واعتماد رسمي للإشراف على القسايم</span>
            </div>
        </div>
    </div>

    <!-- Header Navigation -->
    <header class="bg-navy-950 border-b border-slate-800 px-6 py-3.5 shrink-0 flex items-center justify-between no-print shadow-2xl z-30">
        <div class="flex items-center gap-4">
            <div class="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-navy-950 font-black text-2xl shadow-lg shadow-amber-500/20 border border-amber-300">
                <i class="fa-solid fa-helmet-safety"></i>
            </div>
            <div>
                <h1 class="text-lg font-black text-white tracking-wide flex items-center gap-2">
                    Al-Rai Engineering <span class="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-0.5 rounded-lg border border-amber-500/40 font-extrabold">المحتوى الميداني</span>
                </h1>
                <p class="text-xs text-amber-400 font-bold flex items-center gap-2 mt-0.5" id="currentUserDisplay">
                    <i class="fa-solid fa-user-gear"></i> المستخدم: --
                </p>
            </div>
        </div>

        <div class="flex items-center gap-3">
            <button id="programmerAddUserBtn" onclick="openAddUserModal()" class="hidden bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition">
                <i class="fa-solid fa-user-plus text-amber-400"></i> إضافة مستخدم جديد (المبرمج)
            </button>
            <button onclick="exportBackup()" class="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition">
                <i class="fa-solid fa-file-export text-amber-400"></i> تصدير البيانات
            </button>
            <button onclick="logout()" class="bg-rose-950/60 hover:bg-rose-900/80 text-rose-200 border border-rose-800 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition">
                <i class="fa-solid fa-right-from-bracket"></i> خروج
            </button>
        </div>
    </header>

    <!-- Main Workspace -->
    <div class="flex flex-1 overflow-hidden">

        <!-- RIGHT SIDEBAR (الشريط الجانبي الأيمن المتطور) -->
        <aside class="w-[430px] bg-navy-950/95 border-l border-slate-800 flex flex-col shrink-0 no-print z-20 shadow-2xl">
            
            <!-- Header sidebar -->
            <div class="p-4 border-b border-slate-800 flex items-center justify-between bg-navy-900/80">
                <div class="flex items-center gap-2">
                    <i class="fa-solid fa-folder-tree text-amber-400 text-sm"></i>
                    <span class="text-xs font-black text-white uppercase tracking-wider">لوحة الإشراف والقسايم</span>
                </div>
                <button onclick="openNewSiteModal()" class="bg-gradient-to-r from-amber-500 to-amber-600 text-navy-950 font-black px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-amber-500/20 hover:brightness-110 transition">
                    <i class="fa-solid fa-plus text-xs"></i> قسيمة جديدة
                </button>
            </div>

            <!-- 1. SECTION: TOP ANIMATED ALERT HEADER (قسم التنبيهات الثابت العلوي للمشرف) -->
            <div id="sidebarAlertSection" class="p-3 border-b border-slate-800/80 bg-navy-950 shrink-0">
                <!-- Loaded dynamically depending on pending supervisor tasks -->
            </div>

            <!-- Search input -->
            <div class="p-3 border-b border-slate-800/80 bg-navy-950/80">
                <div class="relative">
                    <i class="fa-solid fa-magnifying-glass absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                    <input type="text" id="siteSearchInput" oninput="renderSidebarSites()" placeholder="بحث باسم القسيمة، المالك، أو المشرف..." class="w-full bg-slate-900 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 font-bold">
                </div>
            </div>

            <!-- Filter Tabs -->
            <div class="flex border-b border-slate-800 bg-navy-900/40 text-[11px] font-bold text-slate-300">
                <button onclick="setFilterTab('all')" id="tabAll" class="flex-1 py-2.5 text-center border-b-2 border-amber-500 text-amber-400 bg-amber-500/5 transition">الكل</button>
                <button onclick="setFilterTab('my_created')" id="tabCreated" class="flex-1 py-2.5 text-center border-b-2 border-transparent hover:text-white transition">من إنشائي</button>
                <button onclick="setFilterTab('assigned')" id="tabAssigned" class="flex-1 py-2.5 text-center border-b-2 border-transparent hover:text-white relative transition">
                    مُسندة إليّ
                </button>
                <button onclick="setFilterTab('pending')" id="tabPending" class="flex-1 py-2.5 text-center border-b-2 border-transparent hover:text-amber-400 relative transition">
                    معلقة 🟡 <span id="pendingBadgeCount" class="hidden bg-amber-500 text-navy-950 text-[9px] px-1.5 py-0.2 rounded-full font-black">0</span>
                </button>
            </div>

            <!-- 2. SECTION: SITES LIST (قائمة القسايم والمشاريع) -->
            <div class="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2.5 bg-navy-950/60">
                <div id="sitesListContainer" class="space-y-2.5"></div>
            </div>
        </aside>

        <!-- Main Content Area -->
        <main class="flex-1 bg-navy-950 flex flex-col overflow-hidden relative">
            
            <!-- Site Header -->
            <div id="activeSiteHeader" class="bg-navy-900 border-b border-slate-800 p-5 shrink-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div class="flex items-center gap-4">
                    <div class="w-14 h-14 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl shrink-0 shadow-inner">
                        <i class="fa-solid fa-city"></i>
                    </div>
                    <div>
                        <div class="flex flex-wrap items-center gap-2 mb-1">
                            <span id="siteOwnerBadge" class="text-[11px] bg-slate-800 text-slate-200 px-2.5 py-0.5 rounded-md border border-slate-700 font-bold">أنشأها: --</span>
                            <span id="siteSupervisorBadge" class="text-[11px] bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-md border border-amber-500/30 font-bold">المشرف الميداني: --</span>
                            <span id="siteStatusBadge" class="text-[11px] px-2.5 py-0.5 rounded-md font-extrabold border">--</span>
                        </div>
                        <h2 class="text-xl font-black text-white tracking-wide" id="currentSiteTitle">اختر قسيمة من القائمة لبدء العمل</h2>
                    </div>
                </div>

                <div class="flex flex-wrap items-center gap-2.5">
                    <button id="approveSiteHeaderBtn" onclick="approveSupervisorAction()" class="hidden bg-gradient-to-r from-amber-500 to-amber-600 text-navy-950 text-xs font-black px-4 py-2 rounded-xl shadow-lg shadow-amber-500/30 flex items-center gap-2 hover:brightness-110 transition animate-bounce">
                        <i class="fa-solid fa-circle-check text-sm"></i> اعتماد الإشراف واستلام الموقع
                    </button>
                    <button onclick="openAssignModal()" class="bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 transition">
                        <i class="fa-solid fa-user-gear text-amber-400"></i> إسناد/تغيير المشرف
                    </button>
                    <button onclick="openExpenseModal()" class="bg-slate-900 hover:bg-slate-800 text-rose-300 border border-rose-900/50 text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-2 transition">
                        <i class="fa-solid fa-receipt text-rose-400"></i> + مصاريف / مواد
                    </button>
                    <button onclick="openWorkerModal()" class="bg-gradient-to-r from-amber-500 to-amber-600 text-navy-950 text-xs font-black px-4 py-2 rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-2 hover:brightness-110 transition">
                        <i class="fa-solid fa-user-plus text-sm"></i> + إضافة عامل
                    </button>
                </div>
            </div>

            <!-- Financial Summary Bar -->
            <div class="bg-navy-900/90 border-b border-slate-800 px-6 py-3 shrink-0 flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center gap-8 text-xs">
                    <div>
                        <span class="text-slate-400 font-bold block text-[10px]">مستحقات العمال</span>
                        <span class="text-base font-black text-amber-400" id="statTotalAmount">0.000 د.ك</span>
                    </div>
                    <div class="h-7 w-px bg-slate-800"></div>
                    <div>
                        <span class="text-slate-400 font-bold block text-[10px]">المصاريف والمواد</span>
                        <span class="text-base font-black text-rose-400" id="statTotalExpenses">0.000 د.ك</span>
                    </div>
                    <div class="h-7 w-px bg-slate-800"></div>
                    <div>
                        <span class="text-slate-400 font-bold block text-[10px]">إجمالي التكلفة الحالية</span>
                        <span class="text-base font-black text-emerald-400" id="statGrandTotal">0.000 د.ك</span>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <button onclick="shareSiteSummary()" class="bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"><i class="fa-brands fa-whatsapp text-emerald-400"></i> مشاركة واتساب</button>
                    <button onclick="copySiteSummary()" class="bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"><i class="fa-solid fa-copy text-amber-400"></i> نسخ ملخص</button>
                    <button onclick="printSiteInvoice()" class="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5"><i class="fa-solid fa-print"></i> طباعة تقرير</button>
                </div>
            </div>

            <!-- Workspace Details Container -->
            <div class="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 bg-navy-950">
                
                <!-- Workers Section -->
                <div>
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="text-xs font-black text-white flex items-center gap-2 uppercase tracking-wider">
                            <i class="fa-solid fa-users text-amber-400"></i> كشف العمال والمقاولين بالقسيمة
                        </h3>
                        <span id="workersCountBadge" class="text-[11px] bg-slate-900 text-slate-300 border border-slate-800 px-2.5 py-0.5 rounded-full font-bold">0 عمال</span>
                    </div>
                    
                    <div id="siteWorkersContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
                    
                    <div id="emptyWorkersState" class="hidden text-center py-16 glass-panel rounded-3xl border border-dashed border-slate-800 max-w-md mx-auto my-6">
                        <div class="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-2xl mx-auto mb-3 border border-amber-500/20">
                            <i class="fa-solid fa-user-slash"></i>
                        </div>
                        <h3 class="text-sm font-bold text-white mb-1">لا يوجد عمال مسجلون حتى الآن</h3>
                        <p class="text-xs text-slate-400 mb-4">قم بإضافة بيانات العمال واليوميات الخاصة بهذه القسيمة</p>
                        <button onclick="openWorkerModal()" class="bg-amber-500 text-navy-950 font-black text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition">+ إضافة عامل الآن</button>
                    </div>
                </div>

                <!-- Expenses Section -->
                <div class="pt-6 border-t border-slate-800">
                    <div class="flex items-center justify-between mb-3">
                        <h3 class="text-xs font-black text-white flex items-center gap-2 uppercase tracking-wider">
                            <i class="fa-solid fa-truck-ramp-box text-rose-400"></i> كشف المواد والتكاليف الإضافية
                        </h3>
                        <span id="expensesCountBadge" class="text-[11px] bg-slate-900 text-slate-300 border border-slate-800 px-2.5 py-0.5 rounded-full font-bold">0 سجلات</span>
                    </div>
                    
                    <div id="expensesContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"></div>
                </div>

                <!-- Updates Log Section -->
                <div class="pt-6 border-t border-slate-800">
                    <h3 class="text-xs font-black text-white mb-3 flex items-center gap-2 uppercase tracking-wider">
                        <i class="fa-solid fa-clock-rotate-left text-amber-400"></i> سجل التحديثات والنشاطات والاعتمادات الأخيرة
                    </h3>
                    <div class="glass-card rounded-2xl p-4 border border-slate-800 max-h-56 overflow-y-auto custom-scrollbar">
                        <div id="siteLogsContainer" class="space-y-2.5 text-xs"></div>
                    </div>
                </div>

            </div>
        </main>
    </div>

    <!-- MODAL: Add New User (Programmer/Admin Only) -->
    <div id="addUserModal" class="fixed inset-0 bg-navy-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 hidden">
        <div class="glass-panel bg-navy-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-navy-950">
                <h3 class="text-base font-black text-amber-400 flex items-center gap-2">
                    <i class="fa-solid fa-user-plus"></i> إضافة مستخدم جديد (صلاحيات المبرمج/المدير)
                </h3>
                <button onclick="closeAddUserModal()" class="text-slate-400 hover:text-white p-2 rounded-xl"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <form onsubmit="saveNewUser(event)" class="p-6 space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-200 mb-1">اسم المستخدم / المهندس *</label>
                    <input type="text" id="newUserNameInput" required placeholder="مثال: م/صالح" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 font-bold">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-200 mb-1">المسمى الوظيفي / الدور *</label>
                    <input type="text" id="newUserRoleInput" required placeholder="مثال: مهندس موقع / مشرف ميداني" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 font-bold">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-200 mb-1">نوع التصنيف *</label>
                    <select id="newUserTypeSelect" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-bold">
                        <option value="field">مهندس / مشرف ميداني</option>
                        <option value="admin">إدارة العليا / مدير عام / مبرمج</option>
                    </select>
                </div>
                <div class="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                    <button type="button" onclick="closeAddUserModal()" class="px-4 py-2 bg-slate-800 text-xs text-slate-300 font-bold rounded-xl">إلغاء</button>
                    <button type="submit" class="px-6 py-2 bg-amber-500 text-navy-950 font-black text-xs rounded-xl hover:bg-amber-400 transition">حفظ وإضافة فورية</button>
                </div>
            </form>
        </div>
    </div>

    <!-- MODAL: Create New Site -->
    <div id="newSiteModal" class="fixed inset-0 bg-navy-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 hidden">
        <div class="glass-panel bg-navy-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-navy-950">
                <h3 class="text-base font-black text-amber-400 flex items-center gap-2">
                    <i class="fa-solid fa-building-circle-check"></i> فتح قسيمة أو مشروع ميداني جديد
                </h3>
                <button onclick="closeNewSiteModal()" class="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition">
                    <i class="fa-solid fa-xmark text-base"></i>
                </button>
            </div>

            <form onsubmit="createNewSiteAction(event)" class="p-6 space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-200 mb-1">اسم القسيمة أو رقم الموقع *</label>
                    <input type="text" id="modalSiteName" required placeholder="مثال: قسيمة 42 - قطعة 3، الجابريّة" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 font-bold">
                </div>
                
                <div>
                    <label class="block text-xs font-bold text-slate-200 mb-1">اسم المالك / العميل (اختياري)</label>
                    <input type="text" id="modalClientName" placeholder="مثال: بو فهد المطيري" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 font-bold">
                </div>

                <div>
                    <label class="block text-xs font-bold text-amber-300 mb-1"><i class="fa-solid fa-user-shield"></i> تحديد المهندس المشرف المسؤول عن القسيمة *</label>
                    <select id="modalSupervisorSelect" required class="w-full bg-slate-900 border border-amber-500/40 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-bold">
                        <!-- Options loaded dynamically -->
                    </select>
                    <span class="text-[10px] text-amber-400/80 font-bold block mt-1">ملاحظة: ستظهر القسيمة للمشرف المختار كـ "بانتظار الموافقة والاعتماد".</span>
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-200 mb-1">تاريخ البدء *</label>
                        <input type="date" id="modalStartDate" required class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-bold text-right">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-200 mb-1">المدة المتوقعة (بالأيام)</label>
                        <input type="number" id="modalDuration" value="30" min="1" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 font-bold text-right">
                    </div>
                </div>

                <div class="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                    <button type="button" onclick="closeNewSiteModal()" class="px-5 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 transition">إلغاء</button>
                    <button type="submit" class="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-navy-950 font-black text-xs hover:brightness-110 shadow-lg shadow-amber-500/20 transition">إضافة القسيمة وإرسال التكليف</button>
                </div>
            </form>
        </div>
    </div>

    <!-- MODAL: Assign/Change Supervisor -->
    <div id="assignModal" class="fixed inset-0 bg-navy-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 hidden">
        <div class="glass-panel bg-navy-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-navy-950">
                <h3 class="text-base font-black text-amber-400 flex items-center gap-2">
                    <i class="fa-solid fa-user-gear"></i> إسناد/تعديل المهندس المشرف
                </h3>
                <button onclick="closeAssignModal()" class="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition">
                    <i class="fa-solid fa-xmark text-base"></i>
                </button>
            </div>

            <form onsubmit="saveAssignSupervisor(event)" class="p-6 space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-200 mb-2">اختر المشرف الهندسي الجديد للقسيمة:</label>
                    <select id="assignSupervisorSelect" required class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 font-bold">
                        <!-- Loaded dynamically -->
                    </select>
                </div>

                <div class="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                    <button type="button" onclick="closeAssignModal()" class="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold">إلغاء</button>
                    <button type="submit" class="px-6 py-2.5 rounded-xl bg-amber-500 text-navy-950 font-black text-xs hover:bg-amber-400 transition">تأكيد التكليف والإرسال</button>
                </div>
            </form>
        </div>
    </div>

    <!-- MODAL: Add Worker -->
    <div id="workerModal" class="fixed inset-0 bg-navy-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 hidden">
        <div class="glass-panel bg-navy-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-navy-950">
                <h3 class="text-base font-black text-amber-400 flex items-center gap-2">
                    <i class="fa-solid fa-user-plus"></i> تسجيل يومية عامل بالقسيمة
                </h3>
                <button onclick="closeWorkerModal()" class="text-slate-400 hover:text-white p-1.5 rounded-xl"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <form onsubmit="saveWorker(event)" class="p-6 space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-200 mb-1">اسم العامل / المقاول *</label>
                    <input type="text" id="workerName" required placeholder="مثال: كومار، أبو علي الحلاق..." class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 font-bold">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-200 mb-1">طبيعة الشغل والمهمة *</label>
                    <input type="text" id="workType" required placeholder="مثال: صب خرسانة، نجارة مسلحة..." class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 font-bold">
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-200 mb-1">اليومية (د.ك) *</label>
                        <input type="number" step="any" id="dailyRate" required placeholder="15" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-bold">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-200 mb-1">عدد الأيام / الطريحة</label>
                        <input type="number" step="any" id="daysCount" value="1" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-bold">
                    </div>
                </div>
                <div class="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                    <button type="button" onclick="closeWorkerModal()" class="px-4 py-2 bg-slate-800 text-xs text-slate-300 font-bold rounded-xl">إلغاء</button>
                    <button type="submit" class="px-6 py-2 bg-amber-500 text-navy-950 font-black text-xs rounded-xl hover:bg-amber-400 transition">حفظ يومية العامل</button>
                </div>
            </form>
        </div>
    </div>

    <!-- MODAL: Add Expense -->
    <div id="expenseModal" class="fixed inset-0 bg-navy-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 hidden">
        <div class="glass-panel bg-navy-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
            <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-navy-950">
                <h3 class="text-base font-black text-rose-400 flex items-center gap-2">
                    <i class="fa-solid fa-receipt"></i> إضافة مصاريف أو مواد
                </h3>
                <button onclick="closeExpenseModal()" class="text-slate-400 hover:text-white p-1.5 rounded-xl"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <form onsubmit="saveExpense(event)" class="p-6 space-y-4">
                <div>
                    <label class="block text-xs font-bold text-slate-200 mb-1">بيان المادة / التكلفة *</label>
                    <input type="text" id="expenseTitle" required placeholder="مثال: شراء خشب، حديد تسليح، ديزل..." class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 font-bold">
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div>
                        <label class="block text-xs font-bold text-slate-200 mb-1">المبلغ (د.ك) *</label>
                        <input type="number" step="any" id="expenseAmount" required placeholder="50" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white font-bold">
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-200 mb-1">التاريخ</label>
                        <input type="date" id="expenseDate" required class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-bold">
                    </div>
                </div>
                <div class="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                    <button type="button" onclick="closeExpenseModal()" class="px-4 py-2 bg-slate-800 text-xs text-slate-300 font-bold rounded-xl">إلغاء</button>
                    <button type="submit" class="px-6 py-2 bg-rose-600 text-white font-black text-xs rounded-xl hover:bg-rose-500 transition">إضافة التكلفة</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Printable Invoice Section -->
    <section id="printableInvoice" class="hidden print-only bg-white text-slate-900 p-8 rounded-xl"></section>

    <!-- Toast Notification -->
    <div id="toast" class="fixed bottom-6 left-6 z-50 transform translate-y-20 opacity-0 transition-all duration-300 glass-panel border border-amber-500/50 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-bold pointer-events-none">
        <i class="fa-solid fa-circle-check text-amber-400 text-lg"></i>
        <span id="toastMsg">تم التحديث بنجاح</span>
    </div>

    <!-- JavaScript Logic -->
    <script>
        const STORAGE_KEY = 'alrai_eng_system_v32_approved';
        
        let defaultUsers = [
            { name: "المدير العام", role: "إدارة شاملة ومتابعة", type: "admin" },
            { name: "المبرمج", role: "دعم تقني وصلاحيات كاملة", type: "admin" },
            { name: "م/أمير", role: "مهندس موقع / مشرف ميداني", type: "field" },
            { name: "ابوسعد", role: "مشرف تنفيذ", type: "field" },
            { name: "ايمن", role: "مشرف حركة ومشاريع", type: "field" }
        ];

        let appData = { users: [], sites: [] };
        let currentUser = null;
        let activeSiteName = null;
        let currentFilterTab = 'all';

        window.onload = function() {
            loadData();
            renderUserLoginList();
            
            const savedUser = localStorage.getItem('alrai_current_user');
            if (savedUser) {
                currentUser = savedUser;
                document.getElementById('loginScreen').classList.add('hidden');
                checkProgrammerPrivileges();
                initAppAfterLogin();
            }
        };

        function loadData() {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try { appData = JSON.parse(stored); } catch(e) {}
            }

            if (!appData.users || appData.users.length === 0) {
                appData.users = defaultUsers;
            }

            if (!appData.sites || appData.sites.length === 0) {
                appData.sites = [
                    {
                        id: 'site_demo_1',
                        name: 'قسيمة 14 - قطعة 2، الجابريّة',
                        owner: 'م/أمير',
                        supervisor: 'ابوسعد',
                        status: 'pending_approval', // pending_approval | approved
                        client: 'السيد/ عبد الله العتيبي',
                        startDate: '2026-03-01',
                        duration: 45,
                        workers: [
                            { id: 'w1', name: 'كومار', workType: 'نجارة مسلحة للقواعد', dailyRate: 15, daysCount: 3 }
                        ],
                        expenses: [
                            { id: 'ex1', title: 'توريد خشب جديد', amount: 120, date: '2026-03-02' }
                        ],
                        logs: [
                            { date: new Date().toLocaleString('ar-KW'), author: 'م/أمير', text: 'أنشأ القسيمة وعيّن المشرف (ابوسعد) - بانتظار الاعتماد الرسمي' }
                        ]
                    },
                    {
                        id: 'site_demo_2',
                        name: 'قسيمة 88 - قطعة 5، المطلع',
                        owner: 'المدير العام',
                        supervisor: 'ايمن',
                        status: 'approved',
                        client: 'شركة الأفق للمقاولات',
                        startDate: '2026-02-15',
                        duration: 60,
                        approvedBy: 'ايمن',
                        approvedAt: '2026-02-16 10:30 ص',
                        workers: [],
                        expenses: [],
                        logs: [
                            { date: '2026-02-16 10:30 ص', author: 'ايمن', text: 'تم اعتماد الإشراف واستلام الموقع رسمياً بواسطة (ايمن)' }
                        ]
                    }
                ];
            }
            saveData();
        }

        function saveData() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
        }

        function renderUserLoginList() {
            const adminContainer = document.getElementById('adminUsersList');
            const fieldContainer = document.getElementById('fieldUsersList');
            
            adminContainer.innerHTML = '';
            fieldContainer.innerHTML = '';

            appData.users.forEach(user => {
                const btn = document.createElement('button');
                btn.type = "button";
                btn.className = "w-full bg-slate-900/80 hover:bg-amber-500/20 border border-slate-700/80 hover:border-amber-500/50 rounded-2xl p-3 flex items-center justify-between text-right transition group";
                btn.onclick = () => selectUserAndLogin(user.name);
                btn.innerHTML = `
                    <div class="flex items-center gap-3">
                        <div class="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center font-bold group-hover:bg-amber-500 group-hover:text-navy-950 transition">
                            <i class="fa-solid fa-user-tie"></i>
                        </div>
                        <div>
                            <div class="text-xs font-black text-white group-hover:text-amber-400 transition">${user.name}</div>
                            <div class="text-[10px] text-slate-400 font-bold">${user.role}</div>
                        </div>
                    </div>
                    <i class="fa-solid fa-chevron-left text-xs text-slate-400 group-hover:text-amber-400 transition"></i>
                `;

                if (user.type === 'admin') {
                    adminContainer.appendChild(btn);
                } else {
                    fieldContainer.appendChild(btn);
                }
            });
        }

        function selectUserAndLogin(userName) {
            currentUser = userName;
            localStorage.setItem('alrai_current_user', currentUser);
            document.getElementById('loginScreen').classList.add('hidden');
            checkProgrammerPrivileges();
            initAppAfterLogin();
        }

        function checkProgrammerPrivileges() {
            const btn = document.getElementById('programmerAddUserBtn');
            if (currentUser === 'المبرمج' || currentUser === 'المدير العام') {
                btn.classList.remove('hidden');
            } else {
                btn.classList.add('hidden');
            }
        }

        function logout() {
            localStorage.removeItem('alrai_current_user');
            location.reload();
        }

        function initAppAfterLogin() {
            document.getElementById('currentUserDisplay').innerHTML = `<i class="fa-solid fa-user-gear text-amber-400"></i> المستخدم الحالي: <strong class="text-white">${currentUser}</strong>`;
            
            const todayStr = new Date().toISOString().split('T')[0];
            document.getElementById('modalStartDate').value = todayStr;
            document.getElementById('expenseDate').value = todayStr;

            populateSupervisorDropdowns();
            renderSidebarAlerts();
            renderSidebarSites();

            const visibleSites = getFilteredSites();
            if (visibleSites.length > 0) {
                openSiteDetail(visibleSites[0].name);
            } else if (appData.sites.length > 0) {
                openSiteDetail(appData.sites[0].name);
            } else {
                activeSiteName = null;
                document.getElementById('currentSiteTitle').innerText = 'لا توجد قسايم مسجلة حالياً';
            }
        }

        function populateSupervisorDropdowns() {
            const modalSelect = document.getElementById('modalSupervisorSelect');
            const assignSelect = document.getElementById('assignSupervisorSelect');
            
            let html = '<option value="" disabled selected>-- اختر المشرف الهندسي --</option>';
            appData.users.forEach(u => {
                html += `<option value="${u.name}">${u.name} (${u.role})</option>`;
            });

            modalSelect.innerHTML = html;
            assignSelect.innerHTML = html;
        }

        // إضافة مستخدم جديد (صلاحيات المبرمج والمدير)
        function openAddUserModal() {
            document.getElementById('newUserNameInput').value = '';
            document.getElementById('newUserRoleInput').value = '';
            document.getElementById('addUserModal').classList.remove('hidden');
        }
        function closeAddUserModal() { document.getElementById('addUserModal').classList.add('hidden'); }

        function saveNewUser(e) {
            e.preventDefault();
            const name = document.getElementById('newUserNameInput').value.trim();
            const role = document.getElementById('newUserRoleInput').value.trim();
            const type = document.getElementById('newUserTypeSelect').value;

            if (!name || !role) return;

            if (appData.users.some(u => u.name === name)) {
                alert('هذا الاسم موجود مسبقاً!');
                return;
            }

            appData.users.push({ name, role, type });
            saveData();
            populateSupervisorDropdowns();
            renderUserLoginList();
            closeAddUserModal();
            showToast(`تمت إضافة المستخدم الجديد (${name}) بنجاح`);
        }

        function setFilterTab(tab) {
            currentFilterTab = tab;
            ['tabAll', 'tabCreated', 'tabAssigned', 'tabPending'].forEach(id => {
                const el = document.getElementById(id);
                el.classList.remove('border-amber-500', 'text-amber-400', 'bg-amber-500/5');
                el.classList.add('border-transparent');
            });

            const btnMap = {
                'all': 'tabAll',
                'my_created': 'tabCreated',
                'assigned': 'tabAssigned',
                'pending': 'tabPending'
            };

            document.getElementById(btnMap[tab]).classList.add('border-amber-500', 'text-amber-400', 'bg-amber-500/5');
            renderSidebarSites();
        }

        function getFilteredSites() {
            let list = appData.sites || [];

            if (currentUser !== 'المدير العام' && currentUser !== 'المبرمج') {
                list = list.filter(s => s.owner === currentUser || s.supervisor === currentUser);
            }

            if (currentFilterTab === 'my_created') {
                list = list.filter(s => s.owner === currentUser);
            } else if (currentFilterTab === 'assigned') {
                list = list.filter(s => s.supervisor === currentUser);
            } else if (currentFilterTab === 'pending') {
                list = list.filter(s => s.status === 'pending_approval');
            }

            return list;
        }

        // 1. RENDER TOP ANIMATED ALERT BANNER (قسم التنبيهات وإشعار الإسناد الثابت)
        function renderSidebarAlerts() {
            const container = document.getElementById('sidebarAlertSection');
            
            // البحث عن القسايم المُسندة للمستخدم الحالي وبانتظار الاعتماد
            const pendingForMe = appData.sites.filter(s => s.supervisor === currentUser && s.status === 'pending_approval');
            
            if (pendingForMe.length === 0) {
                container.innerHTML = `
                    <div class="bg-navy-900/60 border border-slate-800 rounded-2xl p-3 flex items-center justify-between">
                        <div class="flex items-center gap-2.5">
                            <div class="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                            <span class="text-xs font-bold text-slate-300">جميع القسايم المُسندة معتمدة وجارية</span>
                        </div>
                        <span class="text-[10px] text-slate-500 font-bold">لا توجد تنبيهات عاجلة</span>
                    </div>
                `;
                return;
            }

            // في حال وجود قسيمة أو أكثر تنتظر الاعتماد
            let html = `
                <div class="pulse-alert-box rounded-2xl p-3.5 space-y-2">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2 text-amber-400 font-black text-xs">
                            <i class="fa-solid fa-bell text-rose-500 animate-bounce"></i>
                            <span>تنبيه إسناد قسيمة جديدة (${pendingForMe.length})</span>
                        </div>
                        <span class="bg-rose-500/20 text-rose-300 text-[10px] px-2 py-0.5 rounded-md border border-rose-500/40 font-black">بانتظار الاعتماد</span>
                    </div>
            `;

            pendingForMe.forEach(site => {
                html += `
                    <div class="bg-navy-950/80 p-2.5 rounded-xl border border-amber-500/40 space-y-2">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="text-xs font-black text-white">${escapeHtml(site.name)}</h4>
                                <span class="text-[10px] text-slate-400 block font-bold mt-0.5">من قِبل: ${site.owner}</span>
                            </div>
                            <button onclick="openSiteDetail('${site.name}')" class="text-[10px] text-amber-400 underline font-bold">عرض التفاصيل</button>
                        </div>
                        <button onclick="approveSupervisorAction('${site.name}')" class="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-navy-950 font-black text-xs py-1.5 rounded-lg shadow-md hover:brightness-110 transition flex items-center justify-center gap-1.5">
                            <i class="fa-solid fa-circle-check"></i> اعتماد القسيمة وقبول الإشراف
                        </button>
                    </div>
                `;
            });

            html += `</div>`;
            container.innerHTML = html;
        }

        // 2. RENDER SIDEBAR SITES LIST (قسم القسايم والمشاريع)
        function renderSidebarSites() {
            const container = document.getElementById('sitesListContainer');
            const search = document.getElementById('siteSearchInput').value.trim().toLowerCase();
            container.innerHTML = '';

            const filtered = getFilteredSites().filter(s => 
                s.name.toLowerCase().includes(search) || 
                (s.client && s.client.toLowerCase().includes(search)) ||
                (s.supervisor && s.supervisor.toLowerCase().includes(search))
            );

            // تحديث الشارة في التبويب للموقع المعلقة
            const totalPending = appData.sites.filter(s => s.status === 'pending_approval').length;
            const pendingBadge = document.getElementById('pendingBadgeCount');
            if (totalPending > 0) {
                pendingBadge.innerText = totalPending;
                pendingBadge.classList.remove('hidden');
            } else {
                pendingBadge.classList.add('hidden');
            }

            if (filtered.length === 0) {
                container.innerHTML = `<p class="text-center text-xs text-slate-400 py-8 font-bold">لا توجد قسايم مطابقة للبحث</p>`;
                return;
            }

            filtered.forEach(site => {
                const isSelected = activeSiteName === site.name;
                const isPending = site.status === 'pending_approval';

                const card = document.createElement('div');
                card.className = `glass-card p-3.5 rounded-2xl flex items-center justify-between cursor-pointer border ${isSelected ? 'border-amber-400 ring-1 ring-amber-400/50 bg-amber-500/10' : 'border-slate-800'} ${isPending ? 'border-amber-500/50 bg-amber-500/5' : ''}`;
                card.onclick = () => openSiteDetail(site.name);
                
                card.innerHTML = `
                    <div class="space-y-1.5 w-full pl-2">
                        <div class="flex items-center justify-between">
                            <h3 class="text-xs font-black ${isSelected ? 'text-amber-400' : 'text-white'} flex items-center gap-1.5">
                                ${escapeHtml(site.name)}
                            </h3>
                            ${isPending ? 
                                `<span class="bg-amber-500/20 text-amber-400 text-[9px] px-2 py-0.5 rounded-md border border-amber-500/40 font-black flex items-center gap-1">
                                    <i class="fa-solid fa-hourglass-half text-[8px] animate-spin"></i> بانتظار الاعتماد
                                 </span>` : 
                                `<span class="bg-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded-md border border-emerald-500/40 font-black">
                                    🟢 معتمدة
                                 </span>`
                            }
                        </div>
                        <div class="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-slate-400 font-bold">
                            <span><i class="fa-solid fa-user-pen text-slate-500"></i> ${site.owner}</span>
                            <span><i class="fa-solid fa-user-shield text-amber-500"></i> المشرف: <strong class="text-amber-300">${site.supervisor || 'غير محدد'}</strong></span>
                        </div>
                    </div>
                    <button onclick="event.stopPropagation(); deleteSite('${site.id}')" class="text-slate-500 hover:text-rose-400 p-1.5 transition" title="حذف القسيمة"><i class="fa-solid fa-trash-can text-xs"></i></button>
                `;
                container.appendChild(card);
            });
        }

        function openSiteDetail(siteName) {
            activeSiteName = siteName;
            renderSidebarAlerts();
            renderSidebarSites();
            renderSiteWorkspace();
        }

        // إجراء الاعتماد الإجباري من قبل المشرف
        function approveSupervisorAction(targetSiteName) {
            const siteToApproveName = targetSiteName || activeSiteName;
            const site = appData.sites.find(s => s.name === siteToApproveName);
            
            if (!site) return;

            site.status = 'approved';
            site.approvedBy = currentUser;
            site.approvedAt = new Date().toLocaleString('ar-KW');

            if (!site.logs) site.logs = [];
            site.logs.push({
                date: new Date().toLocaleString('ar-KW'),
                author: currentUser,
                text: `✅ تم اعتماد الإشراف على القسيمة واستلامها رسمياً بواسطة المشرف (${currentUser})`
            });

            saveData();
            renderSidebarAlerts();
            renderSidebarSites();
            renderSiteWorkspace();
            showToast(`تم اعتماد إشراف القسيمة (${site.name}) وتحديث الحالة للجميع بنجاح`);
        }

        function renderSiteWorkspace() {
            const site = appData.sites.find(s => s.name === activeSiteName);
            if (!site) return;

            document.getElementById('currentSiteTitle').innerText = site.name;
            document.getElementById('siteOwnerBadge').innerText = `أنشأها: ${site.owner}`;
            document.getElementById('siteSupervisorBadge').innerHTML = `<i class="fa-solid fa-user-shield"></i> المشرف الميداني: <strong class="text-amber-400">${site.supervisor || 'لم يحدد بعد'}</strong>`;

            const statusBadge = document.getElementById('siteStatusBadge');
            const approveHeaderBtn = document.getElementById('approveSiteHeaderBtn');

            if (site.status === 'pending_approval') {
                statusBadge.className = "text-[11px] px-2.5 py-0.5 rounded-md font-black bg-amber-500/20 text-amber-300 border border-amber-500/40";
                statusBadge.innerText = "🟡 بانتظار موافقة واعتماد المشرف";

                if (site.supervisor === currentUser) {
                    approveHeaderBtn.classList.remove('hidden');
                } else {
                    approveHeaderBtn.classList.add('hidden');
                }
            } else {
                statusBadge.className = "text-[11px] px-2.5 py-0.5 rounded-md font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40";
                statusBadge.innerText = `🟢 معتمدة رسمياً (بواسطة ${site.approvedBy || site.supervisor})`;
                approveHeaderBtn.classList.add('hidden');
            }

            const workersContainer = document.getElementById('siteWorkersContainer');
            const expensesContainer = document.getElementById('expensesContainer');
            const emptyWorkersState = document.getElementById('emptyWorkersState');
            const logsContainer = document.getElementById('siteLogsContainer');
            
            workersContainer.innerHTML = '';
            expensesContainer.innerHTML = '';
            logsContainer.innerHTML = '';

            let totalWorkersAmount = 0;
            let totalExpensesAmount = 0;

            if (!site.workers || site.workers.length === 0) {
                emptyWorkersState.classList.remove('hidden');
            } else {
                emptyWorkersState.classList.add('hidden');
                site.workers.forEach(w => {
                    const total = (w.daysCount || 1) * (w.dailyRate || 0);
                    totalWorkersAmount += total;
                    workersContainer.innerHTML += `
                        <div class="glass-card rounded-2xl p-4 border border-slate-800 space-y-2 text-xs">
                            <div class="flex justify-between font-black text-white">
                                <span class="text-sm font-bold text-amber-300">${escapeHtml(w.name)}</span>
                                <span class="text-amber-400 font-extrabold text-sm">${total.toFixed(3)} د.ك</span>
                            </div>
                            <div class="text-slate-300 font-bold">
                                <i class="fa-solid fa-hammer ml-1 text-slate-400"></i> ${escapeHtml(w.workType)}
                            </div>
                            <div class="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800/80">
                                <span>اليومية: ${w.dailyRate} د.ك</span>
                                <span>الأيام: ${w.daysCount} يوم</span>
                            </div>
                        </div>`;
                });
            }

            if (site.expenses) {
                site.expenses.forEach(ex => {
                    totalExpensesAmount += (ex.amount || 0);
                    expensesContainer.innerHTML += `
                        <div class="glass-card p-3.5 rounded-2xl border border-slate-800 flex justify-between text-xs items-center">
                            <div>
                                <span class="font-black text-white block">${escapeHtml(ex.title)}</span>
                                <span class="text-[10px] text-slate-400 font-bold block mt-0.5">${ex.date}</span>
                            </div>
                            <span class="text-rose-400 font-black text-sm">${ex.amount.toFixed(3)} د.ك</span>
                        </div>`;
                });
            }

            if (site.logs) {
                site.logs.slice().reverse().forEach(log => {
                    logsContainer.innerHTML += `
                        <div class="flex items-start gap-2 border-b border-slate-800/60 pb-1.5">
                            <i class="fa-solid fa-circle-dot text-[10px] text-amber-400 mt-1"></i>
                            <div>
                                <span class="text-slate-200 font-bold">${escapeHtml(log.text)}</span>
                                <span class="text-[10px] text-slate-400 block">${log.author} • ${log.date}</span>
                            </div>
                        </div>`;
                });
            }

            document.getElementById('workersCountBadge').innerText = `${site.workers ? site.workers.length : 0} عمال`;
            document.getElementById('expensesCountBadge').innerText = `${site.expenses ? site.expenses.length : 0} سجلات`;

            document.getElementById('statTotalAmount').innerText = `${totalWorkersAmount.toFixed(3)} د.ك`;
            document.getElementById('statTotalExpenses').innerText = `${totalExpensesAmount.toFixed(3)} د.ك`;
            document.getElementById('statGrandTotal').innerText = `${(totalWorkersAmount + totalExpensesAmount).toFixed(3)} د.ك`;
        }

        // Modals Action Handlers
        function openNewSiteModal() {
            populateSupervisorDropdowns();
            document.getElementById('modalSiteName').value = '';
            document.getElementById('modalClientName').value = '';
            document.getElementById('newSiteModal').classList.remove('hidden');
        }
        function closeNewSiteModal() { document.getElementById('newSiteModal').classList.add('hidden'); }

        function openAssignModal() {
            if (!activeSiteName) { alert('اختر قسيمة أولاً'); return; }
            populateSupervisorDropdowns();
            document.getElementById('assignModal').classList.remove('hidden');
        }
        function closeAssignModal() { document.getElementById('assignModal').classList.add('hidden'); }

        function openWorkerModal() {
            if (!activeSiteName) { alert('اختر قسيمة أولاً'); return; }
            document.getElementById('workerName').value = '';
            document.getElementById('workType').value = '';
            document.getElementById('dailyRate').value = '';
            document.getElementById('daysCount').value = '1';
            document.getElementById('workerModal').classList.remove('hidden');
        }
        function closeWorkerModal() { document.getElementById('workerModal').classList.add('hidden'); }

        function openExpenseModal() {
            if (!activeSiteName) { alert('اختر قسيمة أولاً'); return; }
            document.getElementById('expenseTitle').value = '';
            document.getElementById('expenseAmount').value = '';
            document.getElementById('expenseModal').classList.remove('hidden');
        }
        function closeExpenseModal() { document.getElementById('expenseModal').classList.add('hidden'); }

        // Core Actions
        function createNewSiteAction(e) {
            e.preventDefault();
            const name = document.getElementById('modalSiteName').value.trim();
            const client = document.getElementById('modalClientName').value.trim();
            const supervisor = document.getElementById('modalSupervisorSelect').value;
            const startDate = document.getElementById('modalStartDate').value;
            const duration = parseInt(document.getElementById('modalDuration').value) || 30;

            if (!name || !supervisor) return;

            let existing = appData.sites.find(s => s.name.toLowerCase() === name.toLowerCase());
            if (existing) {
                alert('هذه القسيمة موجودة مسبقاً!');
                return;
            }

            const newSite = {
                id: 'site_' + Date.now(),
                name: name,
                owner: currentUser || "م/أمير",
                supervisor: supervisor,
                status: 'pending_approval', // تدخل مباشرة حالة بانتظار الاعتماد
                client: client,
                startDate: startDate,
                duration: duration,
                workers: [],
                expenses: [],
                logs: [
                    { date: new Date().toLocaleString('ar-KW'), author: currentUser || "م/أمير", text: `أنشأ القسيمة وعيّن المشرف (${supervisor}) - القسيمة بانتظار اعتماد المشرف` }
                ]
            };

            appData.sites.unshift(newSite);
            saveData();
            closeNewSiteModal();
            setFilterTab('all');
            openSiteDetail(name);
            showToast(`تم إنشاء القسيمة بنجاح وإرسال إشعار اعتماد للمشرف (${supervisor})`);
        }

        function saveAssignSupervisor(e) {
            e.preventDefault();
            const site = appData.sites.find(s => s.name === activeSiteName);
            if (!site) return;

            const newSupervisor = document.getElementById('assignSupervisorSelect').value;
            if (!newSupervisor) return;

            site.supervisor = newSupervisor;
            site.status = 'pending_approval'; // تعود لبانتظار الاعتماد للمشرف الجديد

            site.logs.push({
                date: new Date().toLocaleString('ar-KW'),
                author: currentUser,
                text: `قام بإعادة إسناد القسيمة إلى المشرف (${newSupervisor}) - وبانتظار اعتماده الرسمي`
            });

            saveData();
            closeAssignModal();
            renderSidebarAlerts();
            renderSidebarSites();
            renderSiteWorkspace();
            showToast(`تم تحديث التكليف وتنبيه المشرف (${newSupervisor}) بانتظار اعتماده`);
        }

        function saveWorker(e) {
            e.preventDefault();
            const site = appData.sites.find(s => s.name === activeSiteName);
            if (!site) return;

            const wName = document.getElementById('workerName').value.trim();
            const wType = document.getElementById('workType').value.trim();
            const rate = parseFloat(document.getElementById('dailyRate').value) || 0;
            const days = parseFloat(document.getElementById('daysCount').value) || 1;

            if(!site.workers) site.workers = [];

            site.workers.push({
                id: 'wrk_' + Date.now(),
                name: wName,
                workType: wType,
                dailyRate: rate,
                daysCount: days
            });

            site.logs.push({
                date: new Date().toLocaleString('ar-KW'),
                author: currentUser,
                text: `أضاف يومية جديد (${wName}) - بقيمة ${(rate * days).toFixed(3)} د.ك`
            });

            saveData();
            renderSiteWorkspace();
            closeWorkerModal();
            showToast('تم حفظ يومية العامل بنجاح');
        }

        function saveExpense(e) {
            e.preventDefault();
            const site = appData.sites.find(s => s.name === activeSiteName);
            if (!site) return;

            const title = document.getElementById('expenseTitle').value.trim();
            const amount = parseFloat(document.getElementById('expenseAmount').value) || 0;
            const date = document.getElementById('expenseDate').value;

            if(!site.expenses) site.expenses = [];

            site.expenses.push({
                id: 'ex_' + Date.now(),
                title: title,
                amount: amount,
                date: date
            });

            site.logs.push({
                date: new Date().toLocaleString('ar-KW'),
                author: currentUser,
                text: `سجل تكلفة جديدة (${title}) - بمبلغ ${amount.toFixed(3)} د.ك`
            });

            saveData();
            renderSiteWorkspace();
            closeExpenseModal();
            showToast('تم حفظ التكلفة بنجاح');
        }

        function deleteSite(siteId) {
            if (confirm('هل أنت متأكد من حذف هذه القسيمة بالكامل؟')) {
                appData.sites = appData.sites.filter(s => s.id !== siteId);
                saveData();
                renderSidebarAlerts();
                renderSidebarSites();
                const visible = getFilteredSites();
                if (visible.length > 0) openSiteDetail(visible[0].name);
                else {
                    activeSiteName = null;
                    document.getElementById('currentSiteTitle').innerText = 'لا توجد قسايم مسجلة';
                }
                showToast('تم حذف القسيمة');
            }
        }

        function exportBackup() {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appData));
            const dl = document.createElement('a');
            dl.setAttribute("href", dataStr);
            dl.setAttribute("download", `alrai_engineering_backup_${new Date().toISOString().split('T')[0]}.json`);
            dl.click();
        }

        function showToast(msg) {
            const t = document.getElementById('toast');
            document.getElementById('toastMsg').innerText = msg;
            t.classList.remove('translate-y-20', 'opacity-0');
            setTimeout(() => t.classList.add('translate-y-20', 'opacity-0'), 2800);
        }

        function escapeHtml(str) {
            if (!str) return '';
            return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }

        function shareSiteSummary() { 
            const site = appData.sites.find(s => s.name === activeSiteName);
            if (!site) return;

            let text = `*Al-Rai Engineering Company*\n`;
            text += `🏗️ *تحديث ميداني للقسيمة:* ${site.name}\n`;
            text += `👷‍♂️ *المشرف الميداني:* ${site.supervisor || 'غير محدد'}\n`;
            text += `📌 *حالة الإشراف:* ${site.status === 'approved' ? '🟢 معتمدة وجارية' : '🟡 بانتظار الاعتماد'}\n`;
            text += `📝 *بواسطة:* ${currentUser}\n`;
            text += `------------------------------------\n`;

            let wTotal = 0;
            if (site.workers && site.workers.length > 0) {
                text += `👷 *العمال واليوميات:*\n`;
                site.workers.forEach(w => {
                    const tot = w.daysCount * w.dailyRate;
                    wTotal += tot;
                    text += `• ${w.name} (${w.workType}): ${tot.toFixed(3)} د.ك\n`;
                });
            }

            let eTotal = 0;
            if (site.expenses && site.expenses.length > 0) {
                text += `\n📦 *المصاريف والمواد:*\n`;
                site.expenses.forEach(ex => {
                    eTotal += ex.amount;
                    text += `• ${ex.title}: ${ex.amount.toFixed(3)} د.ك\n`;
                });
            }

            text += `------------------------------------\n`;
            text += `💰 *إجمالي التكلفة الحالية:* ${(wTotal + eTotal).toFixed(3)} د.ك\n`;

            const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(url, '_blank');
        }

        function copySiteSummary() { 
            shareSiteSummary();
            showToast('تم التجهيز والنسخ للمشاركة'); 
        }

        function printSiteInvoice() { window.print(); }
    </script>
