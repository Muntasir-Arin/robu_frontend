import React from 'react';

interface VideoCardProps {
  title: string;
  description: string;
  videoUrl: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, description, videoUrl }) => (
  <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 mb-1 mx-2 sm:mx-4 md:mx-6">
    <h3 className="text-lg font-semibold mb-0.5 text-gray-900 dark:text-white">{title}</h3>
    {/*
    <div className="mb-0.5">
      <iframe
        width="100%"
        height="180"
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      ></iframe>
    </div>
    */}
    <p className="text-gray-700 dark:text-gray-300">{description}</p>
  </div>
);

export default VideoCard;
