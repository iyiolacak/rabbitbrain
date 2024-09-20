const CVViewer = () => (
    <div>
      <h1>View My CV</h1>
      <iframe
        src="/CV_blanked.pdf"
        width="100%"
        height="800px"
        style={{ border: 'none' }}
        title="CV"
      />
    </div>
  );
  
  export default CVViewer;
  