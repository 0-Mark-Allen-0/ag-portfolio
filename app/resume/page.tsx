export default function ResumePage() {
    return (
        <div style={{ height: "100vh", margin: 0 }}>
            <iframe
                src="/resume.pdf"
                width="100%"
                height="100%"
                style={{ border: "none" }}
            />
        </div>
    );
}