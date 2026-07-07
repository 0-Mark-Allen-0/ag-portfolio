import NotebookPage from "../components/NotebookPage";
import TimelineSection from "../components/timeline/TimelineSection";

export default function JournalPage() {
    return (
        <div className="min-h-screen bg-body-bg p-4 md:p-8 xl:p-12">
            <NotebookPage
                title="Diary"
                dayName="Monday"
                dayNum={15}
                month="April"
                className="max-w-[1400px] mx-auto min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-4rem)] rounded-xl overflow-hidden shadow-2xl relative"
            >
                <TimelineSection />
            </NotebookPage>
        </div>
    );
}