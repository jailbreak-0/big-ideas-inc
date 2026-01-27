export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-6xl text-primary animate-spin">progress_activity</span>
                <p className="text-slate-600 dark:text-slate-400 font-medium">Loading product details...</p>
            </div>
        </div>
    );
}
