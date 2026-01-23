"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  RotateCcw,
  Play,
  Cpu,
  Layers,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Terminal,
  Activity,
  GitBranch,
  Lock,
  RefreshCw,
  GitCommit,
  CheckSquare,
  SlidersHorizontal,
  Server,
  Zap,
  HardDrive,
  Eye,
  Workflow
} from "lucide-react";

interface TaskRun {
  id: string;
  title: string;
  repo: string;
  status: "idle" | "running" | "crashed" | "recovering" | "completed";
  currentPhase: string;
  activeWorker: string;
  checkpointNumber: number;
  duplicateSideEffects: number;
}

export default function HaseenDashboard() {
  const [activeTab, setActiveTab] = useState<"mission" | "checkpoints" | "workspace" | "policy" | "analytics">("mission");
  const [selectedTask, setSelectedTask] = useState<string>("task-1");
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [taskState, setTaskState] = useState<TaskRun>({
    id: "run-4482-auth",
    title: "إصلاح تسريب الذاكرة وإعادة هيكلة جلسات التوثيق في بوابة الدفع",
    repo: "fintech/core-payment-gateway",
    status: "idle",
    currentPhase: "جاهز لبدء التنفيذ",
    activeWorker: "worker-prod-1 (Epoch #1)",
    checkpointNumber: 0,
    duplicateSideEffects: 0
  });

  const [logs, setLogs] = useState<string[]>([]);
  const [currentDiffIndex, setCurrentDiffIndex] = useState<number>(0);
  const [backendConnected, setBackendConnected] = useState<boolean>(false);
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  React.useEffect(() => {
    fetch(`${API_BASE}/api/health`)
      .then((res) => {
        if (res.ok) setBackendConnected(true);
      })
      .catch(() => setBackendConnected(false));
  }, [API_BASE]);

  // Checkpoints data
  const checkpointsList = [
    {
      step: 1,
      name: "استكشاف المستودع وتحديد النطاق (Scoped Context)",
      hash: "sha256:7f83b1657ff1...441a",
      worker: "worker-prod-1",
      duration: "1.2s",
      status: "verified"
    },
    {
      step: 2,
      name: "إعادة إنتاج العطل واختبار الفشل (Reproduction Test)",
      hash: "sha256:9c210d481b0f...87cd",
      worker: "worker-prod-1",
      duration: "3.4s",
      status: "verified"
    },
    {
      step: 3,
      name: "إنشاء مساحة العمل المعزولة (Shadow Workspace)",
      hash: "sha256:12eb4c901a18...00fd",
      worker: "worker-prod-1",
      duration: "0.8s",
      status: "verified"
    },
    {
      step: 4,
      name: "توليد رقعة التعديل البرمجية (Patch Candidate)",
      hash: "sha256:4a02d8e411c9...55b2",
      worker: "worker-prod-1",
      duration: "4.1s",
      status: "verified"
    },
    {
      step: 5,
      name: "فحص ومطابقة حزمة الاختبارات (Test Suite Gate)",
      hash: "sha256:bb192a832c01...776e",
      worker: "worker-prod-1",
      duration: "5.2s",
      status: "verified"
    },
    {
      step: 6,
      name: "التدقيق الأمني وحفظ نقطة الفحص (Pre-condition Audit)",
      hash: "sha256:e019f4d98bb2...992a",
      worker: "worker-prod-1",
      duration: "1.1s",
      status: "verified"
    },
    {
      step: 7,
      name: "الاستئناف الفوري بعد الانهيار (Crash Recovery Resumption)",
      hash: "sha256:55cd01a93ff4...112e",
      worker: "worker-prod-2 (New Lease)",
      duration: "0.9s",
      status: "verified"
    },
    {
      step: 8,
      name: "ترقية التعديل للسجل الدائم (Atomic Patch Promotion)",
      hash: "sha256:d8819ab3c004...334a",
      worker: "worker-prod-2",
      duration: "1.5s",
      status: "verified"
    }
  ];

  // Run End-to-End Autonomous Agent Execution with Checkpoints
  const handleStartTask = async () => {
    setIsSimulating(true);
    setLogs([]);
    setTaskState(prev => ({
      ...prev,
      status: "running",
      activeWorker: "worker-prod-1 (Epoch #1)",
      currentPhase: "المرحلة 1: استكشاف السياق وفحص المستودع",
      checkpointNumber: 1,
      duplicateSideEffects: 0
    }));

    const l: string[] = [];
    const pushLog = (msg: string) => {
      l.push(msg);
      setLogs([...l]);
    };

    try {
      const res = await fetch(`${API_BASE}/api/runs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          repo_path: ".",
          task: taskState.title,
          provider: "scripted",
          model: "demo-crash"
        })
      });
      if (res.ok) {
        const data = await res.json();
        setBackendConnected(true);
        pushLog(`🔗 [Haseen Engine API] تم إنشاء وتشغيل المهمة الحية عبر المحرك الخلفي (Run ID: ${data.id || taskState.id})`);
      }
    } catch {
      pushLog("⚡ [وضع المحاكاة التفاعلية] المحرك الخلفي غير متصل حالياً — تشغيل العرض التفاعلي المحلي...");
    }

    setTimeout(() => {
      pushLog("🛡️ [حَصِين الذكي] بدء تشغيل الوكيل البرمجي في بيئة محصنة ومتينة...");
      pushLog("📦 [سياق المستودع] فحص fintech/core-payment-gateway | عزل مساحة العمل بنجاح.");
      pushLog("🔒 [نقطة الفحص #1] حفظ وتشفير نقطة الفحص الأولى sha256:7f83b1657ff1...441a");
      setTaskState(prev => ({ ...prev, checkpointNumber: 2, currentPhase: "المرحلة 2: كتابة اختبار الفشل للتحقق" }));
    }, 400);

    setTimeout(() => {
      pushLog("🧪 [بيئة الاختبارات] تشغيل vitest run tests/auth_leak.spec.ts -> الفشل المؤكد للخلل.");
      pushLog("🔒 [نقطة الفحص #2] حفظ وتشفير نقطة الفحص الثانية sha256:9c210d481b0f...87cd");
      setTaskState(prev => ({ ...prev, checkpointNumber: 3, currentPhase: "المرحلة 3: فتح مساحة العمل المعزولة Shadow Workspace" }));
    }, 900);

    setTimeout(() => {
      pushLog("📁 [Shadow Workspace] استنساخ الشجرة الحية في مسار معزول بدون أي لمس للمستودع الرئيسي.");
      pushLog("🔒 [نقطة الفحص #3] حفظ وتشفير نقطة الفحص الثالثة sha256:12eb4c901a18...00fd");
      setTaskState(prev => ({ ...prev, checkpointNumber: 4, currentPhase: "المرحلة 4: صياغة التعديل البرمجي وإصلاح التسريب" }));
    }, 1400);

    setTimeout(() => {
      pushLog("💻 [النموذج اللغوي] اقتراح التعديل في `services/auth_session.py` وإغلاق تسريب الـ Redis connections.");
      pushLog("🔒 [نقطة الفحص #4] حفظ وتشفير نقطة الفحص الرابعة sha256:4a02d8e411c9...55b2");
      setTaskState(prev => ({ ...prev, checkpointNumber: 5, currentPhase: "المرحلة 5: تشغيل حزمة الاختبارات الشاملة (18/18)" }));
    }, 1900);

    setTimeout(() => {
      pushLog("✅ [بوابة الاختبارات] اجتياز 18 من أصل 18 اختباراً بنجاح كامل!");
      pushLog("🔒 [نقطة الفحص #5] حفظ وتشفير نقطة الفحص الخامسة sha256:bb192a832c01...776e");
      pushLog("🔒 [نقطة الفحص #6] التدقيق الأمني للسياسة (Deterministic Policy Gate: APPROVED).");
      setTaskState(prev => ({ ...prev, checkpointNumber: 6, currentPhase: "المرحلة 6: جاهز للترقية (بانتظار التأكيد أو الاستئناف)" }));
      setIsSimulating(false);
    }, 2500);
  };

  // Simulate Server / Worker SIGKILL Crash and Instant Zero-Loss Recovery
  const handleSimulateCrash = () => {
    setIsSimulating(true);
    setTaskState(prev => ({
      ...prev,
      status: "crashed",
      currentPhase: "⚠️ انهيار مفاجئ لمعالج الوكيل (Worker SIGKILL)!",
      activeWorker: "worker-prod-1 (انتهت الصلاحية DEAD)"
    }));

    const l = [...logs];
    l.push("💥 [تنبيه أمني عاجل] توقف معالج الوكيل (worker-prod-1) فجأة أثناء المعالجة (Signal 9 / SIGKILL)!");
    l.push("⏳ [انتهاء فترة الحجز Lease Expired] محرك حَصِين يرصد غياب النبضات الدورية للـ Worker.");
    setLogs([...l]);

    // Automatic Recovery Loop
    setTimeout(() => {
      l.push("🛡️ [بدء التعافي الذاتي الذكي] تخصيص معالج بديل: worker-prod-2 (Epoch #2)...");
      l.push("🔍 [التحقق من نقاط الفحص] قراءة سجل نقاط الفحص المشفرة: استرجاع Checkpoint #6 المعتمدة بنجاح.");
      l.push("✨ [صفر تكرار للأخطاء] لم يتم تكرار أي أمر كتابة؛ تم الحفاظ على مساحة العمل المعزولة بنسبة 100%.");
      setLogs([...l]);
      setTaskState(prev => ({
        ...prev,
        status: "recovering",
        activeWorker: "worker-prod-2 (Epoch #2)",
        currentPhase: "المرحلة 7: الاستئناف التلقائي من نقطة الفحص السادسة"
      }));
    }, 1200);

    setTimeout(() => {
      l.push("🚀 [استئناف التنفيذ] استكمال المرحلة السابعة وترقية التعديل (Atomic Patch Promotion) إلى الفرع الرئيسي.");
      l.push("🎉 [نجاح منيع ومكتمل] تم دمج التعديل بنجاح كامل بدون فقدان سطر كود واحد وبصفر أخطاء مكررة!");
      setLogs([...l]);
      setTaskState(prev => ({
        ...prev,
        status: "completed",
        checkpointNumber: 8,
        activeWorker: "worker-prod-2 (مكتمل بنجاح)",
        currentPhase: "تم الترقية والدمج في المستودع (Promoted Successfully)"
      }));
      setIsSimulating(false);
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex flex-col font-thmanyah selection:bg-emerald-600 selection:text-white">
      {/* Top Enterprise Navigation */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  حَصِين الذكي
                  <span className="text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
                    Haseen-AI v1.0
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                المنظومة المؤسسية المنيعة لتشغيل وكلاء البرمجيات ذاتيي التعافي والاستئناف الفوري
              </p>
            </div>
          </div>

          {/* Real-time System Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-800/80 text-emerald-400 text-xs">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>معدل التعافي الذاتي: <strong>100%</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-950/50 border border-indigo-800/80 text-indigo-400 text-xs">
              <RotateCcw className="w-3.5 h-3.5 text-indigo-400" />
              <span>الكتابة المزدوجة المكررة: <strong>0 أخطاء</strong></span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs">
              <Lock className="w-3.5 h-3.5 text-blue-400" />
              <span>سجل نقاط الفحص: <strong>SHA-256 Chained</strong></span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-4 pt-2 border-t border-slate-800/60 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab("mission")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === "mission"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Server className="w-4 h-4" />
            غرفة مراقبة الوكلاء والتعافي الحي
          </button>
          <button
            onClick={() => setActiveTab("checkpoints")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === "checkpoints"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <GitCommit className="w-4 h-4" />
            سجل نقاط الفحص المشفرة (Ledger)
          </button>
          <button
            onClick={() => setActiveTab("workspace")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === "workspace"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <GitBranch className="w-4 h-4" />
            بيئة العمل المعزولة وترقية التعديلات (Shadow Workspace)
          </button>
          <button
            onClick={() => setActiveTab("policy")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === "policy"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            بوابات الأمان والسياسات الصارمة
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === "analytics"
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
            }`}
          >
            <Activity className="w-4 h-4" />
            مؤشرات الاعتمادية والموثوقية
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">

        {/* TAB 1: MISSION CONTROL & CRASH RECOVERY */}
        {activeTab === "mission" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Task Configuration & Actions */}
              <div className="lg:col-span-1 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h2 className="font-bold text-base text-white flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
                    مهمة الوكيل البرمجي النشطة
                  </h2>
                  <span className="text-xs bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800/80 font-mono">
                    Durable Run
                  </span>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1.5 font-medium">المهمة المختارة:</label>
                  <div className="p-3 bg-slate-950 border border-slate-700/80 rounded-xl space-y-1">
                    <p className="text-xs font-bold text-white leading-relaxed">{taskState.title}</p>
                    <span className="text-[11px] text-slate-400 font-mono block">المستودع: {taskState.repo}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs space-y-2 font-mono">
                  <div className="flex justify-between text-slate-400">
                    <span>حالة التشغيل:</span>
                    <span className={`font-bold ${
                      taskState.status === "running" ? "text-indigo-400 animate-pulse" :
                      taskState.status === "crashed" ? "text-rose-400 animate-ping" :
                      taskState.status === "recovering" ? "text-amber-400" :
                      taskState.status === "completed" ? "text-emerald-400" : "text-slate-300"
                    }`}>
                      {taskState.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>المعالج النشط (Worker):</span>
                    <span className="text-slate-200">{taskState.activeWorker}</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>آخر نقطة فحص:</span>
                    <span className="text-emerald-400">Checkpoint #{taskState.checkpointNumber} / 8</span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>الكتابة المتكررة الخاطئة:</span>
                    <span className="text-emerald-400 font-bold">{taskState.duplicateSideEffects}</span>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={handleStartTask}
                    disabled={isSimulating || taskState.status === "running"}
                    className="w-full py-3 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    تشغيل الوكيل البرمجي الذاتي
                  </button>

                  <button
                    onClick={handleSimulateCrash}
                    disabled={taskState.status !== "running" && taskState.checkpointNumber < 6}
                    className="w-full py-2.5 px-3 rounded-xl text-xs font-bold bg-rose-950/50 hover:bg-rose-900/60 text-rose-400 border border-rose-800/80 flex items-center justify-center gap-2 transition-all disabled:opacity-30"
                  >
                    <Flame className="w-4 h-4 text-rose-400" />
                    محاكاة انهيار السيرفر فجأة (SIGKILL Crash)
                  </button>
                </div>
              </div>

              {/* Live Lifecycle & State Machine Graph */}
              <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                    <div>
                      <h3 className="font-bold text-white text-base">مخطط دورة الحياة وحالة الوكيل الدائمة</h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        آلة الحالة الحتمية (Deterministic State Machine) مع حماية المعالجات بـ Epoch Fencing
                      </p>
                    </div>
                    <span className="text-xs bg-indigo-950 text-indigo-400 border border-indigo-800 px-3 py-1 rounded-full font-mono">
                      State Ledger Active
                    </span>
                  </div>

                  {/* Flow Steps */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                    {[
                      { step: 1, name: "استكشاف الكود", sub: "Scoped Context" },
                      { step: 2, name: "إعادة إنتاج الخلل", sub: "Repro Test" },
                      { step: 3, name: "بيئة الظل المعزولة", sub: "Shadow Workspace" },
                      { step: 4, name: "توليد الرقعة", sub: "Patch Candidate" },
                      { step: 5, name: "فحص الاختبارات", sub: "18 Tests Gate" },
                      { step: 6, name: "تدقيق السياسات", sub: "Policy Gate" },
                      { step: 7, name: "التعافي الذاتي", sub: "Zero-Loss Resume" },
                      { step: 8, name: "ترقية التعديل", sub: "Atomic Commit" },
                    ].map((s) => (
                      <div
                        key={s.step}
                        className={`p-3 rounded-xl border text-center transition-all ${
                          taskState.checkpointNumber >= s.step
                            ? "bg-emerald-950/40 border-emerald-800/80 text-emerald-300"
                            : taskState.checkpointNumber === s.step - 1 && taskState.status === "running"
                            ? "bg-indigo-950 border-indigo-600 text-indigo-300 animate-pulse"
                            : "bg-slate-950/50 border-slate-800/80 text-slate-500"
                        }`}
                      >
                        <span className="text-[10px] font-mono block text-slate-400">نقطة #{s.step}</span>
                        <strong className="text-xs block mt-0.5">{s.name}</strong>
                        <span className="text-[10px] text-slate-500 font-mono">{s.sub}</span>
                      </div>
                    ))}
                  </div>

                  {/* Current Active Status Alert Box */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    taskState.status === "crashed"
                      ? "bg-rose-950/30 border-rose-800 text-rose-300"
                      : taskState.status === "recovering"
                      ? "bg-amber-950/30 border-amber-800 text-amber-300"
                      : taskState.status === "completed"
                      ? "bg-emerald-950/30 border-emerald-800 text-emerald-300"
                      : "bg-slate-950/70 border-slate-800 text-slate-300"
                  }`}>
                    <div className="flex items-center gap-3">
                      {taskState.status === "crashed" ? (
                        <Flame className="w-5 h-5 text-rose-400 shrink-0" />
                      ) : taskState.status === "completed" ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      ) : (
                        <Activity className="w-5 h-5 text-indigo-400 shrink-0" />
                      )}
                      <div>
                        <span className="text-xs font-bold block">المرحلة اللحظية:</span>
                        <p className="text-sm font-semibold">{taskState.currentPhase}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Lease Generation: Epoch #2</span>
                  <span>Isolation: Docker Non-Root Container</span>
                  <span>Database: Chained SQLite Ledger</span>
                </div>
              </div>

            </div>

            {/* Execution Trace Stream Terminal */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  سجل التتبع اللحظي لمحرك «حَصِين» (Durable Event Ledger Stream)
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Append-Only Journal</span>
              </div>
              <div className="mt-3 space-y-1.5 max-h-52 overflow-y-auto">
                {logs.length === 0 ? (
                  <p className="text-slate-600 italic">اضغط على &quot;تشغيل الوكيل البرمجي الذاتي&quot; لمتابعة مسار التنفيذ ونقاط الفحص الحية...</p>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className="text-slate-300 leading-relaxed">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CHECKPOINTS LEDGER */}
        {activeTab === "checkpoints" && (
          <div className="space-y-6">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="font-bold text-white text-base">سجل نقاط الفحص المشفرة المتسلسلة (Checkpoints Ledger)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    كل خطوة مشفرة بـ SHA-256 تمنع تكرار أي أمر كتابة أو إهدار التوكنز عند الاستئناف
                  </p>
                </div>
                <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-full font-mono">
                  8 / 8 Checkpoints Secured
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-right">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-mono">
                      <th className="py-3 px-4">رقم النقطة</th>
                      <th className="py-3 px-4">مرحلة الوكيل</th>
                      <th className="py-3 px-4">بصمة التشفير (SHA-256)</th>
                      <th className="py-3 px-4">المعالج الملتزم (Worker)</th>
                      <th className="py-3 px-4">الزمن</th>
                      <th className="py-3 px-4">حالة المطابقة</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                    {checkpointsList.map((cp) => (
                      <tr key={cp.step} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3 px-4 font-bold text-white">#{cp.step}</td>
                        <td className="py-3 px-4 text-slate-200 font-sans">{cp.name}</td>
                        <td className="py-3 px-4 text-emerald-400">{cp.hash}</td>
                        <td className="py-3 px-4 text-indigo-300">{cp.worker}</td>
                        <td className="py-3 px-4 text-slate-400">{cp.duration}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-950/70 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            متحقق ومقفل
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: SHADOW WORKSPACE & DIFF */}
        {activeTab === "workspace" && (
          <div className="space-y-6">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <h3 className="font-bold text-white text-base">رقعة التعديل البرمجية المقترحة (Shadow Patch Diff)</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    التعديل مطبق داخل مساحة عمل معزولة ولا يُدمج إلا بعد اجتياز جميع اختبارات الوحدة والسياسات
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-emerald-950 text-emerald-400 border border-emerald-800 px-3 py-1 rounded-lg font-mono">
                    18 / 18 Tests Passing
                  </span>
                  <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg font-mono">
                    services/auth_session.py
                  </span>
                </div>
              </div>

              {/* Code Diff Display */}
              <div className="bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto p-4 leading-relaxed">
                <div className="text-slate-500 mb-2">--- a/services/auth_session.py</div>
                <div className="text-slate-500 mb-3">+++ b/services/auth_session.py</div>
                
                <div className="text-slate-400">@@ -42,8 +42,14 @@ async def release_expired_tokens(pool):</div>
                <div className="text-rose-400 bg-rose-950/20 px-2 py-0.5 rounded">-    for conn in pool.active_connections:</div>
                <div className="text-rose-400 bg-rose-950/20 px-2 py-0.5 rounded">-        conn.close() # Potential memory leak on timeout</div>
                <div className="text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded">+    async with pool.acquire() as conn:</div>
                <div className="text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded">+        # Fix: Ensure graceful connection termination and flush buffer</div>
                <div className="text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded">+        await conn.execute(&quot;DISCARD ALL;&quot;)</div>
                <div className="text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded">+        await conn.close(timeout=2.0)</div>
                <div className="text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded">+    logger.info(&quot;Successfully reclaimed 42 expired connections.&quot;)</div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>تم التحقق من البصمة: <strong>sha256:4a02d8e411c9...55b2</strong></span>
                <span className="text-emerald-400 font-bold">جاهز للترقية الفورية (Atomic Promotion)</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: POLICY ENGINE */}
        {activeTab === "policy" && (
          <div className="space-y-6">
            <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold text-white text-base mb-2">بوابات الأمان الصارمة ومستويات الصلاحيات</h3>
              <p className="text-xs text-slate-400 mb-6">
                سياسة حتمية لا يستطيع النموذج اللغوي تجاوزها؛ تضمن عدم تشغيل أوامر خطيرة أو تسريب بيانات حساسة
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">READ_ONLY</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">عمليات القراءة والفحص</h4>
                  <p className="text-xs text-slate-400">مسموحة بالكامل للوكيل تلقائياً بدون انتظار موافقة بشرية (قراءة الأكواد، تحليل السجلات).</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-blue-400">CONTAINED_WRITE</span>
                    <ShieldCheck className="w-4 h-4 text-blue-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">الكتابة المعزولة</h4>
                  <p className="text-xs text-slate-400">مسموحة فقط داخل الـ Shadow Workspace؛ معزولة تماماً عن السيرفر الإنتاجي.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">APPROVAL_REQUIRED</span>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">العمليات الخطرة / الترقية</h4>
                  <p className="text-xs text-slate-400">تتطلب توقيع وموافقة صريحة من مهندس النظام قبل تطبيق التعديل على الفرع الرئيسي.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: RELIABILITY ANALYTICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs text-slate-400 block mb-1">نسبة التعافي من الانهيارات</span>
                <div className="text-2xl font-bold font-mono text-emerald-400">100%</div>
                <p className="text-[11px] text-emerald-300 mt-1">صفر مهام مفقودة</p>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs text-slate-400 block mb-1">أخطاء الكتابة المزدوجة</span>
                <div className="text-2xl font-bold font-mono text-white">0</div>
                <p className="text-[11px] text-slate-400 mt-1">Zero Duplicate Side Effects</p>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs text-slate-400 block mb-1">المهام البرمجية المنجزة</span>
                <div className="text-2xl font-bold font-mono text-indigo-400">2,480+</div>
                <p className="text-[11px] text-indigo-300 mt-1">عبر بيئات العمل المعزولة</p>
              </div>

              <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5">
                <span className="text-xs text-slate-400 block mb-1">الأتمتة الذاتية المستمرة</span>
                <div className="text-2xl font-bold font-mono text-blue-400">94.8%</div>
                <p className="text-[11px] text-blue-300 mt-1">بدون أي تدخل يدوي</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Enterprise Footer */}
      <footer className="border-t border-slate-800 py-6 px-6 bg-slate-950 text-center text-xs text-slate-500">
        <p>
          منظومة «حَصِين الذكي | Haseen-AI» — بيئة تشغيل منيعة ومحصنة لوكلاء البرمجيات الذاتية طويلي المدى
        </p>
        <p className="mt-1 text-slate-600 font-mono">
          هندسة وتطوير: محمد الحاج (Mohammed AL-Haj) © 2026 • مرخص تحت رخصة MIT
        </p>
      </footer>
    </div>
  );
}
