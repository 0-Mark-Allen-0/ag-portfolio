import Link from "next/link";
import NotebookPage from "../components/NotebookPage";
import TimelineSection from "../components/timeline/TimelineSection";

export default function JournalPage() {
    return (
        <div className="min-h-screen bg-body-bg p-1 md:p-2 xl:p-4">
            <Link
                href="/desk"
                className="inline-block mb-4 md:mb-6 z-50 font-patrick text-base font-medium text-ink/70 hover:text-ink transition-colors border-b-2"
            >
                Go To Desk
            </Link>
            <NotebookPage
                title="Diary"
                className="max-w-[1400px] mx-auto min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)] rounded-xl overflow-hidden shadow-2xl relative"
            >
                <TimelineSection />
            </NotebookPage>
        </div>
    );
}