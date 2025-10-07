interface FacebookVideoProps {
  videoUrl: string
  width?: number
  height?: number
}

export default function FacebookVideo({
  videoUrl,
  width = 560,
  height = 314
}: FacebookVideoProps) {
  const encodedUrl = encodeURIComponent(videoUrl)
  const src = `https://www.facebook.com/plugins/video.php?height=${height}&href=${encodedUrl}&show_text=false&width=${width}&t=0`

  return (
    <div className="my-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="relative" style={{ paddingBottom: `${(height / width) * 100}%` }}>
          <iframe
            src={src}
            className="absolute top-0 left-0 w-full h-full rounded-lg"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          />
        </div>
      </div>
    </div>
  )
}
