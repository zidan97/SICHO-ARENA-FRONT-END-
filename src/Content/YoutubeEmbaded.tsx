const YoutubeEmbaded = () => {
  return (
     <div className="mt-8  w-1/2 mx-auto mb-8 ">
        <h1 className='mb-4 text-center text-5xl py-4 font-semibold '>Sicho Arena is Here
        </h1>
      <iframe
        width="800"
        height="300"
        src="https://www.youtube.com/embed/VH3-7gFSMFs"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YoutubeEmbaded;
